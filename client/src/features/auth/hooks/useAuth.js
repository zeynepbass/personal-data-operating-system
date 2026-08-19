import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { authContainer } from "../auth.container";
import { useAuthStore } from "../../../shared/store/auth.store";

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
             response?.data?.message || "Giriş yapılmadı."

        );
        return;
      }

      setLogin(response.data);

      toast.success(
        response.data?.message ||
          "Giriş başarılı"
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
             response?.data?.message ||      "Kayıt oluşturulamadı."

        );
        return;
      }

      toast.success(
        response.data?.message ||
       "Hesabınız başarıyla oluşturuldu."
      );

    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hata oluştu."
      );
    },
  });

  const handleLogout = () => {
    setLogout();

    toast.success("Çıkış yapıldı.");
  };

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,

    logout: handleLogout,
    initializeAuth,

    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};