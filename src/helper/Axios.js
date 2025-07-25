
// import axios from "axios";


// export const httpAxios = axios.create({
//     baseUrl: process.env.BASE_URL,

// })

// helper/Axios.js
import axios from "axios";

export const httpAxios = axios.create({
  // baseURL: process.env.BASE_URL, // Corrected from baseUrl
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000", // Use NEXT_PUBLIC_ for client-side access
});

