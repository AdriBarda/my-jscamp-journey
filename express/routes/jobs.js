import { Router } from 'express'
import { JobController } from '../controllers/jobs.js'

import { validateJob, validatePartialJob } from '../schemas/jobs.js'

export const jobsRouter = Router()

function validateCreate(req, res, next) {
  const reuslt = validateJob(req.body)
  if (reuslt.success) {
    req.body = reuslt.data
    return next()
  }

  return res
    .status(400)
    .json({ error: 'Invalid request', details: JSON.parse(reuslt.error.message) })
}

function validateUpdate(req, res, next) {
  const reuslt = validatePartialJob(req.body)
  if (reuslt.success) {
    req.body = reuslt.data
    return next()
  }

  return res
    .status(400)
    .json({ error: 'Invalid request', details: JSON.parse(reuslt.error.message) })
}

// CRUD: Create, Read, Update, Delete
jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
jobsRouter.post('/', validateCreate, JobController.create)
jobsRouter.patch('/:id', validateUpdate, JobController.partialUpdate)
jobsRouter.put('/:id', JobController.update)
jobsRouter.delete('/:id', JobController.delete)
