import { getAuth } from "firebase/auth";
import { ref, push, set } from "firebase/database";
import { database } from "@/firebaseConfig";

type CreateIssueParams = {
    category: string;
    description: string;
    imageUrl?: string;
    latitude: number;
    longitude: number;
};

export async function createIssue({
    category,
    description,
    imageUrl,
    latitude,
    longitude,
}: CreateIssueParams): Promise<string> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuário não autenticado");
    }

    const reportsRef = ref(database, "reports");
    const newReportRef = push(reportsRef);
    const reportId = newReportRef.key;

    if (!reportId) {
        throw new Error("Falha ao gerar ID do report");
    }

    const reportData = {
        uid: user.uid,
        category,
        description,
        photoUrl: imageUrl || "",
        location: {
            latitude,
            longitude,
        },
        status: "open",
        createdAt: Date.now(),
    };

    // Salvar o report
    await set(newReportRef, reportData);

    // Salvar em userReports
    const userReportRef = ref(database, `userReports/${user.uid}/${reportId}`);
    await set(userReportRef, {
        createdAt: reportData.createdAt,
        status: reportData.status,
    });

    // ✅ CRIAR ACTIVITY COM PHOTURL
    const activitiesRef = ref(database, "activities");
    const newActivityRef = push(activitiesRef);

    const activityData = {
        uid: user.uid,
        type: "report_created",
        reportId: reportId,
        title: category,
        description: description,
        createdAt: Date.now(),
        photoUrl: imageUrl || undefined, // ✅ Adiciona a foto aqui
    };

    await set(newActivityRef, activityData);

    console.log("✅ Activity criada com photoUrl:", imageUrl);

    return reportId;
}
