import Express from 'express'
import * as DB from '../controllers/mongoDBController.js'

const router = new Express.Router()

router.get('/speed', async(req, res) => {
  // Get speed data
  const speed = await DB.getSpeed()
  if (speed){
    res.json(speed)
  } else {
    res.status(404).json({
      status: false,
      message: 'No speed detected, not good!'
    })
  }
})

export default router