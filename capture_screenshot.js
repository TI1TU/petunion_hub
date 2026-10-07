const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
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
  close() {
    if (this.ws) this.ws.close();
  }
}

async function capture() {
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1024',
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
    await cdp.send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(4800); // Wait for preloader to dismiss and hero stagger to complete

    // 1. Hero Screenshot
    const heroShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('c:\\Users\\Asus\\Documents\\GitHub\\petunion_hub\\screenshot_hero.png', Buffer.from(heroShot.data, 'base64'));
    console.log('Saved screenshot_hero.png');

    // 2. Scroll to editorial stories and capture
    await cdp.send('Runtime.evaluate', {
      expression: `document.getElementById('editorial-stories').scrollIntoView({ behavior: 'instant' });`
    });
    await sleep(1200);

    const storyShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('c:\\Users\\Asus\\Documents\\GitHub\\petunion_hub\\screenshot_story.png', Buffer.from(storyShot.data, 'base64'));
    console.log('Saved screenshot_story.png');

    // 3. Scroll to collection and capture
    await cdp.send('Runtime.evaluate', {
      expression: `document.getElementById('collection-section').scrollIntoView({ behavior: 'instant' });`
    });
    await sleep(1200);

    const collectionShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('c:\\Users\\Asus\\Documents\\GitHub\\petunion_hub\\screenshot_collection.png', Buffer.from(collectionShot.data, 'base64'));
    console.log('Saved screenshot_collection.png');

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Capture error:', err);
  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill();
  }
}

capture();
