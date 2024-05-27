import { describe, expect, test } from "vitest"

describe("Login", () => {
  describe("User logs in successfully", () => {
    test("should give a response with a status code 200 and a body with the user and its token", async () => {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "12345678",
        }),
      })

      expect(response.status).to.be.equal(200)

      const data = await response.json()

      expect(data).to.contains("token", "user")
      expect(data.user).to.contains(["email", "id", "name"])
      expect(data.user.email).to.be("john.doe@example.com")
    })
  })
  describe("User logs in unsuccessfully", () => {
    describe("Client doesn't send required data in body", () => {
      test("should give a response with a status code 400 and a body with the error", async () => {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
        })

        expect(response.status).to.be.equal(400)

        const data = await response.json()

        expect(data).to.have.property("error")
        expect(data.error).to.be.equal("Missing email")
      })
    })
  })
})
