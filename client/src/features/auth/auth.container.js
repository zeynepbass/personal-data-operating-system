
import { authProvider } from "@/providers/auth.provider";
import * as authRepository from "./repositories/auth.repository";

export const authContainer = {
    login: authRepository.login(authProvider),
    register: authRepository.register(authProvider),
    password: authRepository.forgot(authProvider),
    profile: authRepository.profile(authProvider),
    getPassword: authRepository.password(authProvider),
    deleteAccount: authRepository.deleteAccount(authProvider),
};
