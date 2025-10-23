import mongoose from "mongoose"
const { Schema, model } = mongoose

const speedSchema = new Schema({
  timestamp: Date,
  speed: Number,
  density: Number
})

const Speed = model('Speed', speedSchema, 'speed')
export default Speed