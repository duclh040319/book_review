import { Router } from 'express'
const router = Router()
import profileController from '../controllers/profileController.js'
router.get('/profile', profileController.profile)

export default router