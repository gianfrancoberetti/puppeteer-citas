const puppeteer = require('puppeteer');
const cron = require('node-cron');
const config = require('./config');

(async () => {
  const browser = await puppeteer.launch({
  headless: false // Desactivar el modo headless
  });
  const page = await browser.newPage();
  await page.goto('https://prenotami.esteri.it/Home?ReturnUrl=%2fServices', {timeout: 1000000});
  await page.type('#login-email', config.email1);
  await page.type('#login-password', config.pass1);
  const boton = await page.$('.g-recaptcha');
  const page2 = await browser.newPage();
  await page2.goto('https://prenotami.esteri.it/Home?ReturnUrl=%2fServices', {timeout: 1000000});
  await page2.type('#login-email', config.email2);
  await page2.type('#login-password', config.pass2);
  const boton2 = await page2.$('.g-recaptcha');
  boton.click();
  boton2.click();

  cron.schedule('00 19 * * *', async () => {
    // Vuelvo a interactuar con la aplicación.
    page.goto('https://prenotami.esteri.it/Services/Booking/224');
    page2.goto('https://prenotami.esteri.it/Services/Booking/224');
  });
  await new Promise(resolve => browser.on('disconnected', resolve))

  })();

  