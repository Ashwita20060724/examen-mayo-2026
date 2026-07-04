import { Commission } from '../models/models.js'

const index = async function (req, res) {
  try {
    const commissions = await Commission.findAll()
    res.json(commissions)
  } catch (err) {
    res.status(500).send(err)
  }
}

const CommissionController = {
  index
}

export default CommissionController
