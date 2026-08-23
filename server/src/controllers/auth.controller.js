import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      passwordAgain,
    } = req.body;


    if (
      !fullName ||
      !email ||
      !password ||
      !passwordAgain
    ) {
      return res.status(400).json({
        success: false,
        message: "Tüm alanları doldurunuz.",
      });
    }


    if (password !== passwordAgain) {
      return res.status(400).json({
        success: false,
        message: "Şifreler eşleşmiyor.",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Şifre en az 6 karakter olmalıdır.",
      });
    }


    const normalizedEmail = email
      .toLowerCase()
      .trim();


    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Bu email adresi zaten kayıtlı.",
      });
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,


      role: "user",
    });


    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu.",
      data: {
        token,

        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Kayıt sırasında hata oluştu.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email ve şifre gereklidir.",
      });
    }


    const normalizedEmail = email
      .toLowerCase()
      .trim();


    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email veya şifre hatalı.",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email veya şifre hatalı.",
      });
    }


    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Giriş başarılı.",
      data: {
        token,

        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Giriş yapılırken hata oluştu.",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const {
      email,
      password,
      passwordAgain,
    } = req.body;


    if (
      !email ||
      !password ||
      !passwordAgain
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email, yeni şifre ve şifre tekrar alanları gereklidir.",
      });
    }


    if (password !== passwordAgain) {
      return res.status(400).json({
        success: false,
        message: "Şifreler eşleşmiyor.",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Şifre en az 6 karakter olmalıdır.",
      });
    }


    const normalizedEmail = email
      .toLowerCase()
      .trim();


    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Bu email ile kayıtlı kullanıcı bulunamadı.",
      });
    }


    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Şifreniz başarıyla güncellendi.",
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Şifre güncellenirken hata oluştu.",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fullName,
      email,
      about,
    } = req.body || {};

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    if (fullName !== undefined) {
      user.fullName = fullName;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (about !== undefined) {
      user.about = about;
    }

    if (req.file) {
      user.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profil başarıyla güncellendi.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        about: user.about,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Bu email adresi zaten kullanılıyor.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Profil güncellenirken bir hata oluştu.",
    });
  }
};