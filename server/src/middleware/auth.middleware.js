import crypto from "node:crypto";

import mongoose from "mongoose";

import User from "../models/user.model.js";

const SESSION_COOKIES = ["__Host-pdos_session", "pdos_session"];

const readSessionToken = (req) => {
  for (const name of SESSION_COOKIES) {
    if (req.cookies?.[name]) return req.cookies[name];
  }
  return null;
};

const unauthorized = (res) =>
  res.status(401).json({
    success: false,
    message: "Oturumunuz sona erdi. Lütfen tekrar giriş yapın.",
  });

export const protect = async (req, res, next) => {
  try {
    const token = readSessionToken(req);
    if (!token) return unauthorized(res);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const session = await mongoose.connection
      .collection("sessions")
      .findOne({ tokenHash, expiresAt: { $gt: new Date() } });

    if (!session) return unauthorized(res);

    const user = await User.findById(session.user).select("-password");
    if (!user) return unauthorized(res);

    if (user.passwordChangedAt && session.createdAt < user.passwordChangedAt) {
      return unauthorized(res);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return unauthorized(res);
  }
};
