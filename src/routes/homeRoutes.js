import { Router } from 'express'
const router = Router()
import homeController from '../controllers/homeController.js'
router.get('/', homeController.home)

export default router