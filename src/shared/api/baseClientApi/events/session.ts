import { createAction } from "@reduxjs/toolkit"

export const sessionTokenReceived = createAction<{ accessToken: string }>("session/tokenReceived")
export const sessionTokenCleared = createAction("session/tokenCleared")
