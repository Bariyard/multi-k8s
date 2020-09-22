const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

// subscription for new message on redis
const sub = redisClient.duplicate();

// calculate fibonacci value
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// subscription of event
sub.on("message", (channel, message) => {
  console.log("fib calculate =====>", message);
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
