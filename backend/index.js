import { connect } from 'mqtt'
import Express from 'express'
import DataRouter from './server/route/data.js'
import * as DB from './server/controllers/mongoDBController.js'
import cors from 'cors'
import dotenv from 'dotenv'

// Read .env file
dotenv.config()

// Backend Initialization
const app = new Express()
app.use(cors())

// MQTT Initialization
const MQTT_URL = process.env.MQTT_URL ?? "mqtt://10.62.137.210"
const MQTT_TOPIC = process.env.MQTT_TOPIC ?? 'smartonic'
const client = connect(MQTT_URL)

client.on('connect', (connack) => {
  console.log('Connected')
  // Subscribe to a topic named testtopic with QoS 0
  client.subscribe(MQTT_TOPIC, { qos: 0 }, function (error, granted) {
    if (error) {
      console.log(error)
    } else {
      console.log(`${granted[0].topic} was subscribed`)
    }
  })
})

client.on('message', async (topic, payload, packet) => {
  // Payload is Buffer
  const json = JSON.parse(payload)
  console.log(`Topic: ${topic}, Message: ${json}, QoS: ${packet.qos}`)
  console.log(`Message: ${json.speed}, ${json.density}, ${json.bump}`)

  // Insertion
  await DB.insertSpeed(json)
})

// Attach router
app.use('/', DataRouter)

// Start the server
app.listen(3000, '0.0.0.0',() => {
  console.log('Server is running on port 3000')
})