import CommissionController from '../controllers/CommissionController.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'

const loadFileRoutes = function (app) {
  app.route('/commissions')
    .get(
      isLoggedIn,
      hasRole('owner'),
      CommissionController.index)
}

export default loadFileRoutes
