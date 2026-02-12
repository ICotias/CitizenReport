import { useState, useEffect } from "react";
import { database } from "@/firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";

interface SurveyResults {
    [optionId: string]: number;
}

export function useSurveyResults(surveyId: string) {
    const [results, setResults] = useState<SurveyResults>({});
    const [totalVotes, setTotalVotes] = useState(0);
    const [userVoted, setUserVoted] = useState(false);
    const [userVotedOption, setUserVotedOption] = useState<string | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user?.uid;

        const resultsRef = ref(database, `surveyResults/${surveyId}`);
        const resultsListener = onValue(resultsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setResults(data);

                const total = Object.values(data).reduce(
                    (sum: number, count) => sum + (count as number),
                    0,
                );
                setTotalVotes(total);
            } else {
                setResults({});
                setTotalVotes(0);
            }
            setLoading(false);
        });

        let userVoteListener: (() => void) | null = null;

        if (uid) {
            const userVoteRef = ref(database, `surveyUserVotes/${surveyId}/${uid}`);
            userVoteListener = onValue(userVoteRef, (snapshot) => {
                if (snapshot.exists()) {
                    const votedOptionId = snapshot.val();
                    setUserVoted(true);
                    setUserVotedOption(votedOptionId);
                } else {
                    setUserVoted(false);
                    setUserVotedOption(undefined);
                }
            });
        } else {
            setUserVoted(false);
            setUserVotedOption(undefined);
            setLoading(false);
        }

        return () => {
            off(resultsRef, "value", resultsListener);
            if (userVoteListener && uid) {
                const userVoteRef = ref(database, `surveyUserVotes/${surveyId}/${uid}`);
                off(userVoteRef, "value", userVoteListener);
            }
        };
    }, [surveyId]);

    return {
        results,
        totalVotes,
        userVoted,
        userVotedOption,
        loading,
    };
}
