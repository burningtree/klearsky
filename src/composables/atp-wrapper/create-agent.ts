import type { AtpSessionData, AtpSessionEvent } from "@atproto/api"
import { BskyAgent } from "@atproto/api"

export default function (this: TIAtpWrapper, service: string): boolean {
  this.agent = new BskyAgent({
    service,
    persistSession: (event: AtpSessionEvent, session?: AtpSessionData) => {
      switch (event) {
        case "create":
        case "update": {
          console.log("[klearsky/persistSession]", event)
          if (session?.did == null) {
            console.warn("[klearsky/persistSession]", "session?.did == null")
            break
          }
          this.data.did = session.did
          this.data.sessions[this.data.did] = session as TTSession
          this.data.sessions[this.data.did].__service = service
          this.session = session
          this.lastFetchNotificationsDate = undefined
          break
        }
        case "create-failed":
        case "expired":
        default: {
          console.warn("[klearsky/persistSession]", event)
          break
        }
      }
    },
  })
  return this.agent != null
}
