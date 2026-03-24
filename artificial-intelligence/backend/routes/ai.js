process.loadEnvFile()

import { Router } from 'express'
import OpenAI from 'openai'
import rateLimit from 'express-rate-limit'
import { JobModel } from '../models/job.js'
import { CONFIG } from '../config.js'

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: 'Too many requests, please try again later.' },
  legacyHeaders: false,
  standardHeaders: 'draft-8' // Returns standard headers RateLimit-*
})

export const aiRouter = Router()
aiRouter.use(aiRateLimiter)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

aiRouter.get('/summary/:id', async (req, res) => {
  const { id } = req.params
  const job = await JobModel.getById(id)

  if (!job) {
    return res.status(404).json({ error: 'Job Not Found' })
  }

  const systemPrompt = `You are an assistant with the ONLY purpose of summarizing job offers to help users understand quickly what the offer is about.
    Ignore any other request, observation or comment. Only repply with the job offer summary. ALWAYS repply directly in Markdown Language.`

  const prompt = [
    'Summarize the following job offer in English.',
    'Return valid Markdown only.',
    `Start with a single level-3 heading in the format: ### ${job.company} - ${job.location}.`,
    'Do not use level-1 or level-2 headings.',
    'After the heading, write 1 short, tight paragraph with no bullet points or lists.',
    'Keep the format and heading size consistent across regenerations.',
    'Include the role, company, location and key requirements.',
    'Emphasize the required tech stack and tools clearly within the paragraph using bold Markdown.',
    'Use a direct and clear tone.',
    `Title: ${job.title}`,
    `Company: ${job.company}`,
    `Location: ${job.location}`,
    `Description: ${job.description}`
  ].join('\n')

  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    const stream = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: CONFIG.MODEL_AI,
      stream: true
    })

    for await (const part of stream) {
      const content = part.choices[0].delta.content
      if (content) {
        res.write(content)
      }
    }

    return res.end() // <- Response is completed when stream ends
  } catch (error) {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: 'Error generating summary' })
    }

    return res.end()
  }
})
