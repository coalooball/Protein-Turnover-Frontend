import { useCookies } from "@vueuse/integrations/useCookies"
const cookies = useCookies(["locale"])

const tokenKey = "adminToken"

export const getToken = (arg = tokenKey) => {
  return cookies.get(arg)
}

export const setToken = (token, arg = tokenKey) => {
  return cookies.set(arg, token)
}

export const removeToken = (arg = tokenKey) => {
  return cookies.remove(arg)
}
