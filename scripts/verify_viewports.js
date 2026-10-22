const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9223;
const ARTIFACT_DIR = 'C:\\Users\\Asus\\.gemini\\antigravity-ide\\brain\\e029c9d5-2059-4aac-a2d3-7230b9c9f956';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) cb.reject(data.error);
          else cb.resolve(data.result);
        }
      };
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    if (this.ws) this.ws.close();
  }
}

async function runViewportAudits() {
  console.log('Launching headless Chrome for viewport visual audits...');
  const tempProfile = path.join(ARTIFACT_DIR, 'chrome_tmp_profile');
  if (!fs.existsSync(tempProfile)) fs.mkdirSync(tempProfile, { recursive: true });

  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tempProfile}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--remote-allow-origins=*',
    'about:blank',
  ]);

  chromeProcess.stderr.on('data', (d) => {
    // console.log('[Chrome]', d.toString());
  });

  let cdp = null;
  try {
    await sleep(2000);
    const targets = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find((t) => t.type === 'page');
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');

    const viewports = [
      { name: 'desktop_1920', width: 1920, height: 1080, mobile: false, scale: 1 },
      { name: 'laptop_1366', width: 1366, height: 768, mobile: false, scale: 1 },
      { name: 'tablet_768', width: 768, height: 1024, mobile: true, scale: 2 },
      { name: 'mobile_390', width: 390, height: 844, mobile: true, scale: 3 },
    ];

    for (const vp of viewports) {
      console.log(`Auditing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.scale,
        mobile: vp.mobile,
      });

      // 1. Home page
      await cdp.send('Page.navigate', { url: 'http://localhost:3000' });
      await sleep(2500);

      // Check for horizontal overflow
      const overflowResult = await cdp.send('Runtime.evaluate', {
        expression: `({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          title: document.title
        })`,
        returnByValue: true,
      });

      console.log(`  [Home ${vp.name}] title="${overflowResult.value.title}", hasOverflow=${overflowResult.value.hasOverflow}`);

      const homeShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const homePath = path.join(ARTIFACT_DIR, `screenshot_${vp.name}_home.png`);
      fs.writeFileSync(homePath, Buffer.from(homeShot.data, 'base64'));
      console.log(`  Saved: ${homePath}`);

      // 2. Product Detail Page
      await cdp.send('Page.navigate', { url: 'http://localhost:3000/products/heavyweight-acid-wash-oversized-tee' });
      await sleep(2000);

      const pdpOverflow = await cdp.send('Runtime.evaluate', {
        expression: `({
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          title: document.title
        })`,
        returnByValue: true,
      });
      console.log(`  [PDP ${vp.name}] title="${pdpOverflow.value.title}", hasOverflow=${pdpOverflow.value.hasOverflow}`);

      const pdpShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const pdpPath = path.join(ARTIFACT_DIR, `screenshot_${vp.name}_pdp.png`);
      fs.writeFileSync(pdpPath, Buffer.from(pdpShot.data, 'base64'));

      // 3. Checkout Page
      if (vp.name === 'desktop_1920' || vp.name === 'mobile_390') {
        await cdp.send('Page.navigate', { url: 'http://localhost:3000/checkout' });
        await sleep(2000);
        const checkoutShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
        const checkoutPath = path.join(ARTIFACT_DIR, `screenshot_${vp.name}_checkout.png`);
        fs.writeFileSync(checkoutPath, Buffer.from(checkoutShot.data, 'base64'));
        console.log(`  Saved checkout shot: ${checkoutPath}`);
      }

      // 4. Admin Login Page
      if (vp.name === 'desktop_1920' || vp.name === 'mobile_390') {
        await cdp.send('Page.navigate', { url: 'http://localhost:3000/admin/login' });
        await sleep(2000);
        const adminShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
        const adminPath = path.join(ARTIFACT_DIR, `screenshot_${vp.name}_admin.png`);
        fs.writeFileSync(adminPath, Buffer.from(adminShot.data, 'base64'));
        console.log(`  Saved admin shot: ${adminPath}`);
      }
    }

    console.log('All responsive viewport screenshots and layout audits completed successfully!');
  } catch (err) {
    console.error('Viewport audit failure:', err);
  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill();
  }
}

runViewportAudits();
