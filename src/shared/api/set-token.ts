export const setToken = async (accessToken: string) => {
  try {
    await fetch("/api/set-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: accessToken }),
    })
    localStorage.setItem("accessToken", accessToken)
  } catch (err) {
    console.error("SignIn or token set failed:", err)
  }
}
