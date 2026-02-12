import { database } from "@/firebaseConfig";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export interface UserIssue {
    id: string;
    category: string;
    description: string;
    imageUrl?: string;
    latitude: number;
    longitude: number;
    status: "pending" | "in_progress" | "resolved";
    createdAt: number;
    userId: string;
}

export async function getUserIssues(): Promise<UserIssue[]> {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Usuário não autenticado");
    }

    const issuesRef = ref(database, "issues");
    const userIssuesQuery = query(
        issuesRef,
        orderByChild("userId"),
        equalTo(userId),
    );

    const snapshot = await get(userIssuesQuery);

    if (!snapshot.exists()) {
        return [];
    }

    const issues: UserIssue[] = [];
    snapshot.forEach((childSnapshot) => {
        issues.push({
            id: childSnapshot.key!,
            ...childSnapshot.val(),
        });
    });

    // Ordenar por data (mais recente primeiro)
    return issues.sort((a, b) => b.createdAt - a.createdAt);
}
