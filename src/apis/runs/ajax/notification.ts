/* eslint-disable camelcase */
import type AjaxNotificationParser from "src/apis/parser/ajax/notification"
import Worker from "src/apis/workers/ajax/notification?worker"
import { PostWorker } from "src/apis/wrap-worker"
import { get } from "src/logic/http"
import { useAuthStore } from "stores/auth"

export async function AjaxNotification() {
  const { token_name, token_value } = useAuthStore()

  if (!token_name || !token_value)

    throw new Error("TOKEN_REQUIRED_FOR_NOTIFICATION")

  const { data: json } = await get("/ajax/notification?notif=true", {
    cookie: `${token_name}=${token_value}`,
  })

  const data = JSON.parse(json)


  // if (data.status === 0) throw new Error("REQUIRED_LOGIN")

  return {
    items: await PostWorker<typeof AjaxNotificationParser>(Worker, data.html),
    max: parseInt(data.total),
  }
}
