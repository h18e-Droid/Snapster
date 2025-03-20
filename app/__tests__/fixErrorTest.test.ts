import fixErrorTest from "@/app/__tests__/fixErrorTest"

describe("Fix error", () => {
  it("should be 2", () => {
    expect(fixErrorTest(1, 1)).toBe(2)
  })
})