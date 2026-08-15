import Notes from "../models/notes.model.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Notlar alınırken hata oluştu.",
      error: error.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      category,
      subCategory,
      sections,
    } = req.body;

    const note = await Notes.create({
      id,
      title,
      description,
      category,
      subCategory,
      sections,
    });

    return res.status(201).json({
      success: true,
      message: "Not başarıyla oluşturuldu.",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};