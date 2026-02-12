import { useState, useEffect } from "react";
import { database } from "@/firebaseConfig";
import {
    ref,
    query,
    orderByChild,
    equalTo,
    onValue,
    off,
} from "firebase/database";

export type Survey = {
    id: string;
    title: string;
    type: string;
    description: string;
    options: Record<string, string>;
    status: "active" | "closed";
    createdAt: number;
    endsAt: number;
};

export type SurveyWithResults = Survey & {
    results: Record<string, number>;
    totalVotes: number;
    userVoted: boolean;
    userVotedOption?: string;
};

export function useSurveys() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const surveysRef = ref(database, "surveys");
        const activeSurveysQuery = query(
            surveysRef,
            orderByChild("status"),
            equalTo("active"),
        );

        const unsubscribe = onValue(
            activeSurveysQuery,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const surveysArray: Survey[] = Object.entries(data).map(
                        ([key, value]: [string, any]) => ({
                            id: key,
                            ...value,
                        }),
                    );

                    // Ordena por data de encerramento (mais próximas primeiro)
                    surveysArray.sort((a, b) => a.endsAt - b.endsAt);

                    setSurveys(surveysArray);
                } else {
                    setSurveys([]);
                }

                setLoading(false);
                setError(null);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            },
        );

        return () => {
            off(activeSurveysQuery);
            unsubscribe();
        };
    }, []);

    return { surveys, loading, error };
}
