// @ts-check
import { test, expect } from '@playwright/test'

test('find jobs and apply to an offer', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Search' }).click()

  const jobCards = page.getByRole('article')

  await expect(jobCards.first()).toBeVisible()

  const firstJobTitle = jobCards.first().locator('h3')

  await expect(firstJobTitle).toHaveText('Full Stack Developer')

  await page.getByRole('button', { name: 'Sign In' }).click()

  const applyButton = page.getByRole('button', { name: 'Apply' }).first()

  await applyButton.click()

  page.getByRole('button', { name: 'Applied!' })
})
