import { describe, expect, test } from "vitest"

describe("Login", () => {
  describe("User logs in successfully", () => {
    test("should give a response with a status code 200 an a body with the user and its token", async () => {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "12345678",
        }),
      })

      expect(response.status).toBe(200)

      const data = await response.json()

      expect(data).to.contains("token", "user")
      expect(data.user).to.contains(["email", "id", "name"])
      expect(data.user.email).to.be("john.doe@example.com")
    })
  })
})
