import api from "./api"

export const getAdminToken = (credentials) => {
  return api.post("/auth/token", credentials)
}

export const adminTokenLogin = (data) => {
  return api.post("/auth/login", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    data,
  })
}
