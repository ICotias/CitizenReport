export const getFirebaseErrorMessage = (errorCode: string): string => {
    const errors: Record<string, string> = {
        "auth/email-already-in-use": "Este email já está cadastrado",
        "auth/invalid-email": "Email inválido",
        "auth/weak-password": "A senha deve ter no mínimo 8 caracteres",
        "auth/user-not-found": "Usuário não encontrado",
        "auth/wrong-password": "Senha incorreta",
        "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde",
        "auth/network-request-failed": "Erro de conexão. Verifique sua internet",
    };

    return errors[errorCode] || "Erro desconhecido. Tente novamente";
};
