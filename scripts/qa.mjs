// Browser checks of the built page: screenshots at four widths, horizontal overflow,
// console errors, failed requests, in-page links, and the interactive parts.
// Usage: node scripts/qa.mjs [baseUrl] (default http://localhost:4173), with `vite preview` running.
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base = process.argv[2] ?? 'http://localhost:4173'
const out = 'screenshots'
await mkdir(out, { recursive: true })

const widths = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
]

const failures = []
const fail = (msg) => {
  failures.push(msg)
  console.error('FAIL', msg)
}
const ok = (msg) => console.log('ok  ', msg)

const browser = await chromium.launch()

for (const vp of widths) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  const consoleErrors = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push(String(e)))
  const badRequests = []
  page.on('requestfailed', (r) => badRequests.push(`${r.url()} ${r.failure()?.errorText}`))
  page.on('response', (r) => r.status() >= 400 && badRequests.push(`${r.url()} ${r.status()}`))

  await page.goto(base, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // Horizontal overflow
  const overflow = await page.evaluate(() => {
    const w = document.documentElement.clientWidth
    const wide = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && (r.right > w + 1 || r.left < -1)) {
        // ignore content inside an element that scrolls or clips horizontally
        let p = el.parentElement, clipped = false
        while (p && p !== document.body) {
          const s = getComputedStyle(p)
          if (['auto', 'scroll', 'hidden', 'clip'].includes(s.overflowX)) { clipped = true; break }
          p = p.parentElement
        }
        if (!clipped) wide.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`)
      }
    }
    return { scroll: document.documentElement.scrollWidth, w, wide: wide.slice(0, 8) }
  })
  if (overflow.scroll > overflow.w || overflow.wide.length) fail(`${vp.name}: horizontal overflow ${overflow.scroll}>${overflow.w} ${overflow.wide.join(' | ')}`)
  else ok(`${vp.name}: no horizontal overflow`)

  // Links: no "#" placeholders, every in-page anchor has a target
  const links = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 40) })),
  )
  for (const l of links) {
    if (l.href === '#' || l.href === '') fail(`${vp.name}: placeholder link "${l.text}"`)
    else if (l.href.startsWith('#')) {
      const exists = await page.evaluate((id) => !!document.getElementById(id), l.href.slice(1))
      if (!exists) fail(`${vp.name}: link "${l.text}" points to missing ${l.href}`)
    }
  }
  ok(`${vp.name}: ${links.length} links checked`)

  await page.screenshot({ path: `${out}/${vp.name}-full.png`, fullPage: true })
  await page.screenshot({ path: `${out}/${vp.name}-fold.png` })

  // Navigation
  if (vp.width >= 1024) {
    const btn = page.getByRole('button', { name: 'Product' })
    await btn.click()
    if (!(await page.locator('#product-menu').isVisible())) fail(`${vp.name}: product menu did not open`)
    await page.waitForTimeout(250)
    await page.screenshot({ path: `${out}/${vp.name}-product-menu.png` })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(250)
    if (await page.locator('#product-menu').isVisible()) fail(`${vp.name}: Escape did not close the product menu`)
    else ok(`${vp.name}: product menu opens and closes`)
    await btn.click()
    await page.locator('#product-menu a', { hasText: 'Accounting and tax' }).click()
    await page.waitForTimeout(400)
    const top = await page.evaluate(() => document.getElementById('accounting').getBoundingClientRect().top)
    if (top < 0 || top > 120) fail(`${vp.name}: menu link did not scroll to #accounting (top ${top})`)
    else ok(`${vp.name}: menu link scrolls to its section`)
  } else {
    await page.evaluate(() => window.scrollTo(0, 0))
    const btn = page.getByRole('button', { name: 'Open menu' })
    await btn.click()
    if (!(await page.locator('#mobile-menu').isVisible())) fail(`${vp.name}: mobile menu did not open`)
    await page.screenshot({ path: `${out}/${vp.name}-mobile-menu.png` })
    await page.locator('#mobile-menu a', { hasText: 'FAQ' }).click()
    await page.waitForTimeout(400)
    if (await page.locator('#mobile-menu').isVisible()) fail(`${vp.name}: mobile menu stayed open after choosing a link`)
    else ok(`${vp.name}: mobile menu opens and closes on a link`)
  }

  // Charge trace tabs
  await page.locator('#connected').scrollIntoViewIfNeeded()
  await page.getByRole('tab', { name: /Written to the ledger/ }).click()
  if (!(await page.locator('#trace-panel').textContent()).includes('Guest ledger')) fail(`${vp.name}: trace step 3 did not show the journal`)
  await page.locator('#connected').screenshot({ path: `${out}/${vp.name}-trace-journal.png` })
  await page.keyboard.press('ArrowDown')
  if (!(await page.locator('#trace-panel').textContent()).includes('VAT return')) fail(`${vp.name}: arrow key did not move to the next trace step`)
  else ok(`${vp.name}: charge trace tabs work with mouse and keys`)

  // Audience tabs
  await page.getByRole('tab', { name: 'Groups with several hotels' }).click()
  if (!(await page.locator('#who-panel').textContent()).includes('Shared guest profiles')) fail(`${vp.name}: audience tab did not switch`)
  else ok(`${vp.name}: audience tabs switch`)

  // FAQ
  const first = page.locator('#faq details').first()
  await first.locator('summary').click()
  if (!(await first.evaluate((d) => d.open))) fail(`${vp.name}: FAQ item did not open`)
  else ok(`${vp.name}: FAQ opens`)

  // Demo form validation
  const form = page.locator('[data-test="demo-form"]')
  if (await form.count()) {
    await form.locator('button[type="submit"]').click()
    if (!(await form.textContent()).includes('Enter your name.')) fail(`${vp.name}: demo form did not validate`)
    else ok(`${vp.name}: demo form validates`)
    await page.locator('#demo').screenshot({ path: `${out}/${vp.name}-demo-errors.png` })
  }

  if (consoleErrors.length) fail(`${vp.name}: console errors: ${consoleErrors.join(' | ')}`)
  else ok(`${vp.name}: no console errors`)
  if (badRequests.length) fail(`${vp.name}: failed requests: ${badRequests.join(' | ')}`)
  else ok(`${vp.name}: no failed requests`)

  await ctx.close()
}

// Motion: the page still renders without reduced motion
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${out}/desktop-1440-motion-settled.png` })
  await ctx.close()
}

await browser.close()
await writeFile(`${out}/result.txt`, failures.length ? failures.join('\n') + '\n' : 'all checks passed\n')
if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`)
  process.exit(1)
}
console.log('\nall checks passed')
