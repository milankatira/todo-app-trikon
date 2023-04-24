import mongoose from "mongoose";
import { db } from "./db";

jest.mock("mongoose");

describe("db", () => {

  beforeEach(() => {

    process.env.MONGODB_URI = "mongodb://localhost:27017/todo-app";

  });

  afterEach(() => {

    jest.resetAllMocks();

  });

  it("should connect to the MongoDB database", async () => {

    (mongoose.connect as jest.Mock).mockResolvedValue(undefined);

    await db();

    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/todo-app",
    );

  });

  it("should log an error if the connection fails", async () => {

    const error = new Error("Connection failed");
    (mongoose.connect as jest.Mock).mockRejectedValue(error);

    const spy = jest.spyOn(console, "log");
    await db();

    expect(spy).toHaveBeenCalledWith("mongodb://localhost:27017/todo-app");
    expect(spy).toHaveBeenCalledWith("Database connection error: ", error);

  });

});