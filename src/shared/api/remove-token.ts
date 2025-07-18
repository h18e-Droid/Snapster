export const removeToken = async () => {
  try {
    await fetch("api/remove-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
    localStorage.removeItem("accessToken")
  } catch (err) {
    console.error("SignOut or remove token failed:", err)
  }
}
