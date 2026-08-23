import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { authContainer } from "../auth.container";
import { useAuthStore } from "../../../shared/store/auth.store";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isInitialized,
    login: setLogin,
    logout: setLogout,
    initializeAuth,
  } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const query = useQuery({
    queryKey: ["password", user?.id],
    queryFn: () => authContainer.getPassword(user.id),
  });

  const loginMutation = useMutation({
    mutationFn: (data) => authContainer.login(data),

    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(response?.data.message || "Giriş yapılmadı.");
        return;
      }

      setLogin(response.data);

      toast.success(response?.data.message || "Giriş başarılı");
      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Hata oluştu.");
    },
  });
  const deleteAccountMutation = useMutation({
    mutationFn: () => {
      return authContainer.deleteAccount(user?.id);
    },

    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(response?.message || "Hesap silinemedi.");
        return;
      }



      toast.success(response?.message || "Hesabınız başarıyla silindi.");

      setLogout();
    },

    onError: (error) => {
      toast.error(
        error?.response?.message || "Hesap silinirken bir hata oluştu."
      );
    },
  });
  const registerMutation = useMutation({
    mutationFn: (data) => authContainer.register(data),

    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(response?.message || "Kayıt oluşturulamadı.");
        return;
      }

      setLogin(response.data);

      toast.success(response?.message || "Hesabınız başarıyla oluşturuldu.");

      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Hata oluştu.");
    },
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => authContainer.password(data),

    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(response?.message || "Şifre güncellenemedi.");
        return;
      }
      localStorage.clear();
      toast.success(response?.message);
      router.push("/login");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Şifre güncellenirken hata oluştu."
      );
    },
  });
  const profileMutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("about", data.about);

      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }
 console.log(formData)
      return authContainer.profile(user.id, formData);
    },

    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(response?.message || "Profil güncellenemedi.");
        return;
      }

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

      const updatedUser = {
        ...currentUser,
        ...response.user,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(response.message || "Profil başarıyla güncellendi.");
    },

    onError: (error) => {
      console.error("PROFILE ERROR:", error);
      console.error("BACKEND ERROR:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
          "Profil güncellenirken bir hata oluştu."
      );
    },
  });
  const handleLogout = () => {
    setLogout();

    toast.success("Çıkış yapıldı.");
    router.push("/login");
  };

  return {
    ...query,
    user,
    router,
    token,
    isAuthenticated,
    isInitialized,
    fullName,
    setFullName,
    about,
    setAbout,
    email,
    setEmail,
    deleteAccount: deleteAccountMutation.mutate,
    profile: profileMutation.mutateAsync,
    profileLoading: profileMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    password: forgotPasswordMutation.mutateAsync,
    logout: handleLogout,
    initializeAuth,
  };
};
