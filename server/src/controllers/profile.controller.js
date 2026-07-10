import * as profileService from "../services/profile.service.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfile(req.body);

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(
      req.params.id,
      req.body
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};