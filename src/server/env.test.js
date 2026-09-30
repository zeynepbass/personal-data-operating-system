import { describe, expect, it } from "vitest";

import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("applies defaults for optional variables", () => {
    const env = parseEnv({ MONGODB_URI: "mongodb://localhost:27017/pdos" });

    expect(env).toEqual({
      NODE_ENV: "development",
      MONGODB_URI: "mongodb://localhost:27017/pdos",
      LOG_LEVEL: "info",
    });
  });

  it("accepts mongodb+srv connection strings", () => {
    expect(() => parseEnv({ MONGODB_URI: "mongodb+srv://user:pw@cluster.example.net/pdos" })).not.toThrow();
  });

  it("names the missing variable", () => {
    expect(() => parseEnv({})).toThrow(/MONGODB_URI: is required/);
  });

  it("rejects a non-mongodb connection string", () => {
    expect(() => parseEnv({ MONGODB_URI: "postgres://localhost/pdos" })).toThrow(/MONGODB_URI/);
  });

  it("reports every invalid variable at once", () => {
    let message = "";
    try {
      parseEnv({ NODE_ENV: "staging", LOG_LEVEL: "loud" });
    } catch (error) {
      message = error.message;
    }

    expect(message).toMatch(/NODE_ENV/);
    expect(message).toMatch(/MONGODB_URI/);
    expect(message).toMatch(/LOG_LEVEL/);
  });

  it("still applies defaults when required variables are skipped", () => {
    expect(parseEnv({}, { skipRequired: true })).toEqual({
      NODE_ENV: "development",
      LOG_LEVEL: "info",
    });
  });

  it("still validates provided values when required variables are skipped", () => {
    expect(() => parseEnv({ LOG_LEVEL: "loud" }, { skipRequired: true })).toThrow(/LOG_LEVEL/);
  });
});
