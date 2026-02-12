import { database } from "@/firebaseConfig";
import { ref, set, runTransaction, get } from "firebase/database";
import { getAuth } from "firebase/auth";

interface SubmitVoteParams {
    surveyId: string;
    optionId: string;
}

export async function submitVote({ surveyId, optionId }: SubmitVoteParams) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Você precisa estar autenticado para votar");
    }

    const uid = user.uid;

    const userVoteRef = ref(database, `surveyUserVotes/${surveyId}/${uid}`);
    const resultRef = ref(database, `surveyResults/${surveyId}/${optionId}`);

    const existingVote = await get(userVoteRef);
    if (existingVote.exists()) {
        throw new Error("Você já votou nesta enquete");
    }

    await set(userVoteRef, optionId);

    await runTransaction(resultRef, (currentValue) => {
        return (currentValue || 0) + 1;
    });

    return { success: true };
}
