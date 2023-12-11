import { createFetch } from "@vueuse/core"
import { showNotify } from "../utils/statice"
const useMyFetch = createFetch({
  baseUrl: "/api",
  options: {
    refetch: true,
    updateDataOnError: true,

    // 发送请求之前拦截请求
    beforeFetch(ctx) {
      // const myToken = await getMyToken()
      // ctx.options.headers.Authorization = `Bearer ${myToken}`
      ctx.options.headers["Content-Type"] = "application/json"

      return ctx
    },

    // 更新响应数据之前截获响应数据
    afterFetch(ctx) {
      return ctx
    },

    onFetchError(ctx) {
      // ctx.data can be null when 5xx response
      // if (ctx.data === null) ctx.data = { title: "Hunter x Hunter" } // Modifies the response data
      console.log(ctx)
      showNotify(`There was a problem with the fetch operation:${ctx.error}`, "negative")
      return ctx
    },
  },
  fetchOptions: {
    mode: "cors",
  },
})
export const GET = (url, params) => {
  if (params) {
    let queryParams = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&")
    url = `${url}?${queryParams}`
  }
  return useMyFetch(url)
    .get()
    .json()
    .then(({ data }) => data.value)
}
export const POST = (url, params) => {
  if (!params) params = {}
  let configure = {}
  configure.body = JSON.stringify(params)

  return useMyFetch(url, configure)
    .post()
    .json()
    .then(({ data }) => data.value)
}
