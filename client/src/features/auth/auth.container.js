import { authProvider } from "@/providers/auth.provider";

import {
  login,
  register,
  forgot,
  profile
} from "./repositories/auth.repository";

export const authContainer = {
  login: login(authProvider),
  register: register(authProvider),
  password: forgot(authProvider),
  profile:profile(authProvider)
};