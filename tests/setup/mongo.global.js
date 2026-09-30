import { MongoMemoryServer } from "mongodb-memory-server";

/** @param {import("vitest/node").TestProject} project */
export default async function setup(project) {
  const mongo = await MongoMemoryServer.create();
  project.provide("mongoUri", mongo.getUri("pdos-test"));

  return async () => {
    await mongo.stop();
  };
}
