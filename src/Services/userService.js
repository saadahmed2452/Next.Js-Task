// import { httpAxios } from "@/helper/Axios";

// export async function signUp(data) {
//   const result = await httpAxios
//     .post("/api/users", data)
//     .then((response) => response.data);
//   return result;
// }

// export async function Loginto(loginData) {
//   const result = await httpAxios
//     .post("/api/login", loginData)
//     .then((response) => response.data);
//   return result;
// }

// export async function CurrentUser() {
//   const result = await httpAxios
//     .get("/api/current")
//     .then((response) => response.data);
//   return result;
// }

// export async function LogOut() {
//   const result = await httpAxios
//     .post("/api/logout")
//     .then((response) => response.data);
//   return result;
// }


  // app/services/userService.js
import { httpAxios } from "@/helper/Axios";

export async function signUp(data) {
  const result = await httpAxios.post("/api/users", data);
  return result.data;
}

export async function Loginto(loginData) {
  const result = await httpAxios.post("/api/login", loginData);
  return result.data;
}

export async function CurrentUser() {
  const result = await httpAxios.get("/api/current");
  return result.data;
}

export async function LogOut() {
  const result = await httpAxios.post("/api/logout");
  return result.data;
}