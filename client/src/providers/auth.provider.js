
import  {authApi} from "../features/auth/api/auth.api";

export const authProvider = {
  login: authApi.login,
  register:authApi.register,
  password:authApi.password,
  getPassword:authApi.getPassword,
  profile:authApi.profile,
  deleteAccount:authApi.deleteAccount
};