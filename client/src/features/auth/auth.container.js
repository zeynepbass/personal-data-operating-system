import { authProvider } from "@/providers/auth.provider";

import {
  login,
  register,
} from "./repositories/auth.repository";

export const authContainer = {
  login: login(authProvider),
  register: register(authProvider),
};