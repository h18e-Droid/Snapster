import fixErrorTest from "../fixErrorTest"

describe("Fix error", () => {
  it("should be 2", () => {
    expect(fixErrorTest(5, 3)).toBe(2)
  })
})
