const { test, expect } = require('@playwright/test');

test('PWA manifest is linked and valid enough for installability checks', async ({ page, request }) => {
  await page.goto('./');
  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestHref).toBe('manifest.webmanifest');
  const response = await request.get(new URL(manifestHref, page.url()).toString());
  expect(response.ok()).toBeTruthy();
  const manifest = await response.json();
  expect(manifest.name).toContain('OREV');
  expect(manifest.start_url).toBe('./');
  expect(manifest.display).toBe('standalone');
  expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  expect(manifest.icons.some(i => i.sizes === '192x192')).toBeTruthy();
  expect(manifest.icons.some(i => i.sizes === '512x512')).toBeTruthy();
});

test('service worker asset exists and app still boots without JS runtime errors', async ({ page, request }) => {
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await page.goto('./');
  const swUrl = new URL('service-worker.js', page.url()).toString();
  const sw = await request.get(swUrl);
  expect(sw.ok()).toBeTruthy();
  await expect(page.locator('#boot-fallback')).toBeHidden();
  expect(runtimeErrors).toEqual([]);
});

test('basic accessibility smoke: critical controls have accessible names and focus', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#boot-fallback')).toBeHidden();
  const buttons = page.locator('button:visible');
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);
    const name = (await button.getAttribute('aria-label')) || (await button.innerText());
    expect((name || '').trim().length).toBeGreaterThan(0);
  }
  const first = buttons.first();
  await first.focus();
  await expect(first).toBeFocused();
});
