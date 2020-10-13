import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "http://120.25.229.211:3000/",
    timeout: 10000,
  })

  instance.interceptors.request.use(
    (config) => {
      return config //拦截得还回去
    },
    (err) => {
      console.log(err)
    }
  )

  return instance(config) //直接返回
}
