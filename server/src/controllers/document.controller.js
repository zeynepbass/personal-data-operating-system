
import {getDocument} from "../services/document.services.js";
export const getDocuments = async (req, res) => {
  try {
    const documents = await getDocument();

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

