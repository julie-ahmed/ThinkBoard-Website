{/*because in each component we need to import axios the same url so to eaase this we made that file */}

import axios from "axios";
  

//make url dynamic incase of develpment the url is local and eq to this but if its else it willl equal whatever link render will give us but after it add/api 
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL
})

{/*can also be called axiosinstance */}




export default api;