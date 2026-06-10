import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } })
await page.goto('http://localhost:3004/realisations', { waitUntil: 'networkidle' })
const heading = await page.getByText('Avant / Après').first()
await heading.scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await page.screenshot({ path: 'avant-apres.png' })
await browser.close()
