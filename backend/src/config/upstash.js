import{Ratelimit} from"@upstash/ratelimit"
import{Redis}from"@upstash/redis"
//to be able to access env variables that is needed to be accessed in redis.fromenv(). so import it and call config() 
import dotenv from "dotenv"
dotenv.config()
//createa ratelimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 s")
})

export default ratelimit;

