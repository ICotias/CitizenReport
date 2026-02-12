import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
import { storage, database, auth } from "@/firebaseConfig";

async function uriToBlob(uri: string) {
    const res = await fetch(uri);
    return await res.blob();
}

export async function createReport({
    category,
    description,
    photoUri,
    location,
}: {
    category: string;
    description: string;
    photoUri: string;
    location: { latitude: number; longitude: number };
}) {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Usuário não autenticado");

    // upload da imagem
    const blob = await uriToBlob(photoUri);
    const imageRef = sRef(storage, `reports/${uid}/${Date.now()}.jpg`);
    await uploadBytes(imageRef, blob);
    const photoUrl = await getDownloadURL(imageRef);

    // cria registro no realtime db
    const newReportRef = push(dbRef(database, "reports"));
    await set(newReportRef, {
        uid,
        category,
        description,
        photoUrl,
        location,
        status: "open",
        createdAt: Date.now(),
    });

    return newReportRef.key; // protocolo
}
