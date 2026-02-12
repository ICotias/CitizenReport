import { useEffect, useState } from "react";
import { database } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";

export type Activity = {
    id: string;
    uid: string;
    type: "report_created" | "report_updated" | "report_nearby";
    reportId: string;
    title: string;
    description?: string;
    createdAt: number;
    photoUrl?: string;
};

export function useRecentActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setActivities([]);
            setLoading(false);
            return;
        }

        const activitiesRef = ref(database, "activities");

        const unsub = onValue(
            activitiesRef,
            (snapshot) => {
                if (!snapshot.exists()) {
                    setActivities([]);
                    setLoading(false);
                    return;
                }

                const data = snapshot.val() as Record<string, any>;
                const rawData = Object.entries(data)
                    .map(([id, value]) => ({
                        id,
                        ...value,
                    }))
                    .filter((a) => a.uid === user.uid)
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 5);

                const mappedActivities: Activity[] = rawData.map((activity) => ({
                    id: activity.id,
                    uid: activity.uid,
                    type: activity.type,
                    reportId: activity.reportId,
                    title: activity.title,
                    description: activity.description,
                    createdAt: activity.createdAt,
                    photoUrl: activity.photoUrl || undefined,
                }));

                console.log("✅ Activities carregadas:", mappedActivities);
                setActivities(mappedActivities);
                setLoading(false);
            },
            (error) => {
                console.log("❌ Erro ao buscar activities:", error);
                setActivities([]);
                setLoading(false);
            },
        );

        return () => unsub();
    }, []);

    return { activities, loading };
}
