import Document from "../models/document.model.js";

const notFound = (res) =>
  res.status(404).json({ success: false, message: "Dosya bulunamadı." });

export const authorizeUpload = async (req, res, next) => {
  try {
    const requestedPath = `/uploads${req.path}`;

    if (req.user.role === "admin") return next();

    if (requestedPath.startsWith("/uploads/profiles/")) {
      return req.user.profileImage === requestedPath ? next() : notFound(res);
    }

    const document = await Document.exists({
      pdf: requestedPath,
      $or: [{ user: req.user._id }, { shared: true }],
    });

    return document ? next() : notFound(res);
  } catch (error) {
    console.error(error);
    return notFound(res);
  }
};
