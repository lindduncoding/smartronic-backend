db = db.getSiblingDB('speed');

db.createCollection("measurements", {
  timeseries: {
    timeField: "timestamp",
    granularity: "seconds"
  }
})

print("Time series collection created in DB")
