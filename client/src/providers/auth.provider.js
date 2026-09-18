
import  {authApi} from "../features/auth/api/auth.api";

export const authProvider = {
  login: authApi.login,
  logout: authApi.logout,
  me: authApi.me,
  register:authApi.register,
  password:authApi.password,
  getPassword:authApi.getPassword,
  profile:authApi.profile,
  deleteAccount:authApi.deleteAccount
};