/**
 * Converte uma imagem local (URI do ImagePicker) para Base64
 * e retorna a string pronta para salvar no Realtime Database.
 *
 * ✅ Não usa Firebase Storage — funciona no plano gratuito
 * ⚠️  Limite recomendado: imagens até ~500KB após compressão
 *
 * @param uri - URI local da imagem (ex: "file:///data/...")
 * @returns string Base64 com prefixo data URI (ex: "data:image/jpeg;base64,...")
 */
export async function uploadImageToStorage(uri: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
}
