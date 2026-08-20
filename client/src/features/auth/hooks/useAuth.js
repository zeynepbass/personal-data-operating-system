import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { authContainer } from "../auth.container";
import { useAuthStore } from "../../../shared/store/auth.store";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isInitialized,
    login: setLogin,
    logout: setLogout,
    initializeAuth,
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data) => authContainer.login(data),
  
    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(
          response?.data.message || "Giriş yapılmadı."
        );
        return;
      }
  
      setLogin(response.data);
  
      toast.success(
        response?.data.message || "Giriş başarılı"
      );
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hata oluştu."
      );
    },
  });
  
  const registerMutation = useMutation({
    mutationFn: (data) => authContainer.register(data),
  
    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(
          response?.data.message || "Kayıt oluşturulamadı."
        );
        return;
      }
  
      toast.success(
        response?.data.message || "Hesabınız başarıyla oluşturuldu."
      );
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hata oluştu."
      );
    },
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => authContainer.password(data),
  
    onSuccess: (response) => {
      if (!response?.success) {
        toast.error(
          response?.message || "Şifre güncellenemedi."
        );
        return;
      }
  
      toast.success(response?.message);
 router.push("/login")
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Şifre güncellenirken hata oluştu."
      );
    },
  });
const router=useRouter();
  const handleLogout = () => {
    setLogout();

    toast.success("Çıkış yapıldı.");
    router.push("/login")
  };

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    password:forgotPasswordMutation.mutateAsync,
    logout: handleLogout,
    initializeAuth,

    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};