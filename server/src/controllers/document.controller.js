import Document from "../models/document.model.js";


export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("GET DOCUMENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Documents alınırken hata oluştu.",
      error: error.message,
    });
  }
};


export const createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);

    res.status(201).json({
      success: true,
      message: "Document başarıyla oluşturuldu.",
      data: document,
    });
  } catch (error) {
    console.error("CREATE DOCUMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Document oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};