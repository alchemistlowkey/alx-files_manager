import { createClient } from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.connected = true;

    // Redis errors logged to the console
    this.client.on("error", (error) => {
      console.error("Redis unable to connect:", error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getKey = promisify(this.client.get).bind(this.client);
    return getKey(key);
  }

  async set(key, value, durationInSeconds) {
    const setKey = promisify(this.client.set).bind(this.client);
    await setKey(key, value, "EX", durationInSeconds);
  }

  async del(key) {
    const delKey = promisify(this.client.del).bind(this.client);
    await delKey(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
