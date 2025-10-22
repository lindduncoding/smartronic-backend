import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Speed from '../model/Speed.js'

// Read .env file
dotenv.config()

// Retrieve from .env file
const DB_USER = process.env.DB_USER ?? 'username'
const DB_PASS = process.env.DB_PASS ?? 'password'
const DB_URL = process.env.DB_URL ?? 'user.mongodb.net'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/?retryWrites=true&w=majority&appName=speed`

mongoose.connect(uri)


// Insertion
export async function insertSpeed(message) {
  try {
    await Speed.create({
      timestamp: message.timestamp,
      speed: message.speed
    })
  } catch (err) {
    console.error('Error at: ', err)
  }
}

// Get summarized weather data
export async function getSpeed () {
  try {
    const latest = await Speed.find().sort({ timestamp: -1 });
    return latest
  } catch (err) {
    console.error('Error at: ', err)
  }
}