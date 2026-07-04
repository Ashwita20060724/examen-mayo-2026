import { Restaurant, Order, Commission } from '../models/models.js'
import { Op } from 'sequelize'

const checkRestaurantOwnership = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}
const restaurantHasNoOrders = async (req, res, next) => {
  try {
    const numberOfRestaurantOrders = await Order.count({
      where: { restaurantId: req.params.restaurantId }
    })
    if (numberOfRestaurantOrders === 0) {
      return next()
    }
    return res.status(409).send('Some orders belong to this restaurant.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const isFreeCommission = async (commissionId) => {
  const commission = await Commission.findByPk(commissionId)
  return commission && commission.percentage === 0
}

const checkFreeCommissionLimitDuringCreation = async (req, res, next) => {
  try {
    if (await isFreeCommission(req.body.commissionId)) {
      const existingFree = await Restaurant.count({
        where: {
          userId: req.user.id,
          commissionId: req.body.commissionId
        }
      })
      if (existingFree > 0) {
        return res.status(409).send('Un propietario solo puede tener un restaurante con comisión gratuita.')
      }
    }
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkFreeCommissionLimitDuringUpdate = async (req, res, next) => {
  try {
    if (await isFreeCommission(req.body.commissionId)) {
      const existingFree = await Restaurant.count({
        where: {
          userId: req.user.id,
          commissionId: req.body.commissionId,
          id: { [Op.ne]: req.params.restaurantId }
        }
      })
      if (existingFree > 0) {
        return res.status(409).send('Un propietario solo puede tener un restaurante con comisión gratuita.')
      }
    }
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkNoOrdersWhenSwitchingToFree = async (req, res, next) => {
  try {
    if (await isFreeCommission(req.body.commissionId)) {
      const restaurant = await Restaurant.findByPk(req.params.restaurantId)
      if (!await isFreeCommission(restaurant.commissionId)) {
        const orderCount = await Order.count({ where: { restaurantId: req.params.restaurantId } })
        if (orderCount > 0) {
          return res.status(409).send('No se puede cambiar a la comisión gratuita si el restaurante ya tiene pedidos y pertenecía a un plan de pago.')
        }
      }
    }
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export { checkRestaurantOwnership, restaurantHasNoOrders, checkFreeCommissionLimitDuringCreation, checkFreeCommissionLimitDuringUpdate, checkNoOrdersWhenSwitchingToFree }
