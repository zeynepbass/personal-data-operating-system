import Document from "../models/document.model.js";


export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {


    res.status(500).json({
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
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      date: req.body.date,
      icon: req.body.icon,
      color: req.body.color,
      favorite: req.body.favorite === "true",
      shared: req.body.shared === "true",


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
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document bulunamadı.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document başarıyla silindi.",
      data: document,
    });
  } catch (error) {


    res.status(500).json({
      success: false,
      message: "Document silinirken hata oluştu.",
      error: error.message,
    });
  }
};