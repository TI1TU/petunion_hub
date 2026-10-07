const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
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

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression: `(() => { ${expression} })()`,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function captureNewEditorial() {
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let cdp = null;

  try {
    await sleep(1500);
    const targets = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page');
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Page.navigate', { url: 'http://localhost:3000' });

    await sleep(3500);

    // Scroll directly to the editorial stories container
    await cdp.eval(`
      const el = document.getElementById('editorial-stories');
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `);

    await sleep(1000);

    // Capture Chapter 1
    const screenshot1 = await cdp.send('Page.captureScreenshot', {
      format: 'png'
    });
    fs.writeFileSync('chapter1_new.png', Buffer.from(screenshot1.data, 'base64'));
    console.log('Chapter 1 screenshot saved to chapter1_new.png');

    // Scroll to Chapter 2
    await cdp.eval(`
      const el2 = document.querySelector('.story-chapter-light');
      el2.scrollIntoView({ behavior: 'instant', block: 'start' });
    `);
    await sleep(800);

    // Capture Chapter 2
    const screenshot2 = await cdp.send('Page.captureScreenshot', {
      format: 'png'
    });
    fs.writeFileSync('chapter2_new.png', Buffer.from(screenshot2.data, 'base64'));
    console.log('Chapter 2 screenshot saved to chapter2_new.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill();
  }
}

captureNewEditorial();
