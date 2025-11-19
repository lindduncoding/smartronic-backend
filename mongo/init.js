db = db.getSiblingDB('speed_prod');

db.createCollection("measurements", {
  timeseries: {
    timeField: "timestamp",
    granularity: "seconds"
  }
})

print("Time series collection created in DB")
