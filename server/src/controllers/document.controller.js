import Document from "../models/document.model.js";
export const getDocuments = async (req, res) => {
  try {
    let documents;

    if (req.user.role === "admin") {
      documents = await Document.find();
    } else {
      documents = await Document.find({
        user: req.user._id,
      });
    }

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Documents alınırken hata oluştu.",
      error: error.message,
    });
  }
};
export const createDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF dosyası gereklidir.",
      });
    }

    const document = await Document.create({
      id: req.body.id,

      user: req.user._id,

      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      date: req.body.date,
      icon: req.body.icon,
      color: req.body.color,

      favorite: req.body.favorite === "true",


      shared:
        req.user.role === "admin"
          ? req.body.shared === "true"
          : false,

      pdf: `/uploads/${req.file.filename}`,
    });

    return res.status(201).json({
      success: true,
      message: "Document başarıyla oluşturuldu.",
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Document oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};
export const deletedDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : {
            _id: id,
            user: req.user._id,
          };

    const document = await Document.findOneAndDelete(filter);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document bulunamadı veya silme yetkiniz yok.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document başarıyla silindi.",
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Document silinirken hata oluştu.",
      error: error.message,
    });
  }
};