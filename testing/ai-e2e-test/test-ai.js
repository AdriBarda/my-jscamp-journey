process.loadEnvFile()

import { test } from 'node:test'
import assert from 'node:assert'

import { Stagehand } from '@browserbasehq/stagehand'

test('A user can enter myDevJobs and add a vuejs job offer to favourites', async () => {
  const stagehand = new Stagehand({
    env: 'LOCAL',
    model: 'openai/gpt-5-mini'
  })

  await stagehand.init()

  const [page] = stagehand.context.pages()

  await page.goto('http://localhost:5173')

  await stagehand.act('Click on the "SignIn" button')
  await stagehand.act('Go to Job Offers')
  await stagehand.act('Search a vue job')
  await stagehand.act('Look for a job match and add it to favourites')

  const { extraction } = await stagehand.extract('Obtain the number of favourites')

  console.log('number of favourites:', extraction)

  assert.strictEqual(extraction, '1')

  await stagehand.close()
})
