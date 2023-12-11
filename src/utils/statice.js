import { Notify } from "quasar"

// quasar的消息通知封装
export const showNotify = (message, type = "positive", position = "top") => {
  return Notify.create({
    message,
    type,
    position,
  })
}
