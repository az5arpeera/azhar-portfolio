import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("next-auth", () => ({
  default: () => ({ handlers: {}, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }),
}));
vi.mock("next-auth/providers/google", () => ({ default: () => ({}) }));

const { isAdmin } = await import("./auth");

describe("isAdmin", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAIL = "azharmpeera@gmail.com";
  });

  it("accepts the allowlisted address", () => {
    expect(isAdmin("azharmpeera@gmail.com")).toBe(true);
  });

  it("ignores case", () => {
    expect(isAdmin("AzharMPeera@Gmail.com")).toBe(true);
  });

  it("rejects a lookalike address", () => {
    expect(isAdmin("azharpeera@gmail.com")).toBe(false);
  });

  it("rejects null and empty emails", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
    expect(isAdmin("")).toBe(false);
  });

  it("rejects everything when no allowlist is configured", () => {
    delete process.env.ADMIN_EMAIL;
    expect(isAdmin("azharmpeera@gmail.com")).toBe(false);
  });
});
