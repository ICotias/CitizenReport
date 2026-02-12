import { auth } from "@/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
} from "firebase/auth";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrors";

export const authService = {
    async signUp(email: string, password: string, name: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            // Atualiza o displayName do usuário após criar a conta
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            return {
                success: true,
                user: {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    displayName: userCredential.user.displayName,
                },
            };
        } catch (error: any) {
            console.error("❌ [AUTH] Erro no signUp:", error.code, error.message);
            return { success: false, error: getFirebaseErrorMessage(error.code) };
        }
    },

    async signIn(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            return {
                success: true,
                user: {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    displayName: userCredential.user.displayName,
                },
            };
        } catch (error: any) {
            return { success: false, error: getFirebaseErrorMessage(error.code) };
        }
    },

    async signOut() {
        try {
            await firebaseSignOut(auth);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: getFirebaseErrorMessage(error.code) };
        }
    },
};
