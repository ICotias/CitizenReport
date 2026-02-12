import { database } from "@/firebaseConfig";
import { ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export type ActivityType =
    | "report_created"
    | "report_updated"
    | "report_nearby";

type CreateActivityDTO = {
    type: ActivityType;
    reportId: string;
    title: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    uid?: string;
};

export async function createActivity(data: CreateActivityDTO) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user && !data.uid) throw new Error("Usuário não autenticado");

    const uid = data.uid ?? user!.uid;
    const activityRef = push(ref(database, "activities"));

    await set(activityRef, {
        uid,
        type: data.type,
        reportId: data.reportId,
        title: data.title,
        description: data.description ?? "",
        createdAt: Date.now(),
        location:
            data.latitude !== undefined && data.longitude !== undefined
                ? {
                    latitude: data.latitude,
                    longitude: data.longitude,
                }
                : null,
    });

    return activityRef.key;
}
