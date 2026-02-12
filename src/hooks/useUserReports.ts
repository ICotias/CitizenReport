import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { database } from "@/firebaseConfig";
import {
    ref,
    query,
    orderByChild,
    equalTo,
    onValue,
    off,
} from "firebase/database";

export type Report = {
    id: string;
    uid: string;
    category: string;
    description: string;
    photoUrl: string;
    status: "open" | "in_progress" | "resolved";
    createdAt: number;
    location: {
        latitude: number;
        longitude: number;
    };
};

export function useUserReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const user = getAuth().currentUser;

        if (!user) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }



        const reportsRef = ref(database, "reports");
        const userReportsQuery = query(
            reportsRef,
            orderByChild("uid"),
            equalTo(user.uid),
        );

        const unsubscribe = onValue(
            userReportsQuery,
            (snapshot) => {


                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const reportsArray: Report[] = Object.entries(data).map(
                        ([key, value]: [string, any]) => ({
                            id: key,
                            ...value,
                        }),
                    );

                    reportsArray.sort((a, b) => b.createdAt - a.createdAt);


                    setReports(reportsArray);
                } else {

                    setReports([]);
                }

                setLoading(false);
                setError(null);
            },
            (err) => {

                setError(err.message);
                setLoading(false);
            },
        );

        // Cleanup: remove o listener quando o componente desmontar
        return () => {
            off(userReportsQuery);
            unsubscribe();
        };
    }, []);

    return { reports, loading, error };
}
