const keys = require("./keys");

// express app setup
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// postgress client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.phPort,
});

pgClient.on("error", () => console.log(" Lost PG Connection"));
pgClient.on("connect", () => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log(err));
});

// redis client setup
const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

//express route handler

app.get("/", (req, res) => {
  res.send("HI");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");
  console.log(values.rows);
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("index too hight");
  }

  redisClient.hset("values", index, "Nothing Yet");
  redisPublisher.publish("insert", index);

  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("server -- listening on port 5000");
});
