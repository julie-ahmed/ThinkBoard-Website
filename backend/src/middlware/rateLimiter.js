import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next)=>{
//do some checks then call next() if everything is fine

try{
const{success} = await ratelimit.limit("my-limit-key") //can be per each user id or ip address//this key is used to identify the user and limit the requests for that user. it can be any string but it should be unique for each user. we can use the user id or email or any other unique identifier for the user. here we are using a static string for simplicity but in real world we should use a unique identifier for each user.

if(!success) {
    return res.status(429).json({message:"Too many requests, please try again later."})
}
 next() //this will pass the request to the next middleware or route handler if the user is allowed to make the request. if the user is not allowed to make the request, we will send a response with status code 429 and a message "Too many requests, please try again later."

}catch(error){  //to handle any other error in this part
console.log("rate limit error",error)
next(error) //this will pass the error to the error handling middleware if there is an error in the rate limiter.
}


}

export default rateLimiter;