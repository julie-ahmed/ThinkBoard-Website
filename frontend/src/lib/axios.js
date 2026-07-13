{/*because in each component we need to import axios the same url so to eaase this we made that file */}

import axios from "axios";


const api = axios.create({
baseURL: "http://localhost:5001/api"
})

{/*can also be called axiosinstance */}




export default api;