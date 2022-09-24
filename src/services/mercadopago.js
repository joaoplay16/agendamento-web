import api from "./api"

export const payNow = (data) => {
  return api.post('/process_payment', data)
}
