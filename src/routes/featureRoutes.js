import { Router } from "express";
const router = Router()

router.get('/', (req, res) => res.render('comming-soon', {layout: 'main'}))

export default router