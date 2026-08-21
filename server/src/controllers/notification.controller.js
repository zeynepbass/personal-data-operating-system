import Notification from "../models/notification.model.js";
export const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });
  
      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Bildirimler alınırken hata oluştu.",
        error: error.message,
      });
    }
  };