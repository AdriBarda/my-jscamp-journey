import { JobModel } from '../models/job.js'

export class JobController {
  static async getAll(req, res) {
    const allowedQueryParams = ['text', 'experience', 'limit', 'technology', 'location', 'offset']
    const queryKeys = Object.keys(req.query)

    const hasInvalidQueryParams = queryKeys.some((key) => !allowedQueryParams.includes(key))

    if (hasInvalidQueryParams) {
      return res.status(400).json({ message: 'Invalid query params' })
    }

    const { text, experience, limit = 10, technology, location, offset = 0 } = req.query

    const { total, limitNumber, offsetNumber, results, data } = await JobModel.getAll({
      text,
      experience,
      limit,
      technology,
      location,
      offset
    })

    return res.status(200).json({
      total,
      limit: limitNumber,
      offset: offsetNumber,
      results: results,
      data
    })
  }

  static async getId(req, res) {
    const { id } = req.params

    const job = await JobModel.getById(id)

    if (!job) return res.status(404).json({ message: 'Job Not Found' })

    return res.status(200).json(job)
  }

  static async create(req, res) {
    const { title, company, location, description, data, content } = req.body

    const newJob = await JobModel.create({ title, company, location, description, data, content })

    return res.status(201).json(newJob)
  }

  static async update(req, res) {
    const { id } = req.params
    const { title, company, location, description, data, content } = req.body

    const updatedJob = await JobModel.update({
      id,
      title,
      company,
      location,
      description,
      data,
      content
    })

    if (!updatedJob) return res.status(404).json({ message: 'Job Not Found' })

    return res.status(200).json(updatedJob)
  }

  static async partialUpdate(req, res) {
    const { id } = req.params
    const updates = req.body

    const allowedFields = ['title', 'company', 'location', 'description', 'data', 'content']
    const updateKeys = Object.keys(updates)

    if (updateKeys.length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }

    const hasInvalidFields = updateKeys.some((key) => !allowedFields.includes(key))

    if (hasInvalidFields) {
      return res.status(400).json({ message: 'Invalid fields in update' })
    }

    const job = await JobModel.partialUpdate({ id, updates })

    if (!job) {
      return res.status(404).json({ message: 'Job Not Found' })
    }

    return res.status(200).json(job)
  }

  static async delete(req, res) {
    const { id } = req.params

    const deleteSuccess = await JobModel.delete(id)

    if (!deleteSuccess) return res.status(404).json({ message: 'Job Not Found' })

    return res.status(200).send()
  }
}
