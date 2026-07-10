import * as documentService from "../services/document.service.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments(req.params.userId);

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createDocument = async (req, res) => {
  try {
    const document = await documentService.createDocument(req.body);

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const document = await documentService.updateDocument(
      req.params.id,
      req.body
    );

    if (!document) {
      return res.status(404).json({
        message: "Doküman bulunamadı",
      });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await documentService.deleteDocument(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Doküman bulunamadı",
      });
    }

    res.status(200).json({
      message: "Doküman silindi",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};