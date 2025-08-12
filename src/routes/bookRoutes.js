import { Router } from 'express'
const router = Router()
import bookController from '../controllers/bookController.js'
router.post('/detail/:id/add-review', bookController.addReview)
router.get('/index', bookController.index)
router.get('/detail/:id', bookController.detail)

export default router