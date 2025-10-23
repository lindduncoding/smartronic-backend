import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Speed from '../model/Speed.js'

// Read .env file
dotenv.config()

// Retrieve from .env file
const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME ?? process.env.DB_USER ??  'username'
const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD ?? process.env.DB_PASS ?? 'password'
const DB_URL = process.env.MONGO_INITDB_DATABASE ?? process.env.DB_URL ?? 'user.mongodb.net'

// Cloud deployment
// const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/?retryWrites=true&w=majority&appName=speed`

// Local/docker deployment
const uri = `mongodb://${DB_USER}:${DB_PASS}@mongo:27017/${DB_URL}?authSource=admin`

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err))

// Insertion
export async function insertSpeed(message) {
  try {
    await Speed.create({
      timestamp: message.timestamp,
      speed: message.speed,
      density: message.density
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