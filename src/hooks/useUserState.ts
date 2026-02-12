import { useMemo } from "react";
import { getAuth } from "firebase/auth";
import { useCurrentUser } from "@/src/contexts/currentUser";
import { useAllReports } from "@/src/hooks/useAllReports";

export type UserStats = {
    totalReports: number;
    resolvedReports: number;
    accountAgeMonths: number;
    loading: boolean;
};

export function useUserStats(): UserStats {
    const { currentUser } = useCurrentUser();
    const { reports, loading } = useAllReports();

    const stats = useMemo(() => {
        if (!currentUser) {
            return {
                totalReports: 0,
                resolvedReports: 0,
                accountAgeMonths: 0,
                loading: false,
            };
        }

        // Pegar o user do Firebase Auth (tem metadata)
        const auth = getAuth();
        const firebaseUser = auth.currentUser;

        // Filtrar apenas os reports do usuário atual
        const userReports = reports.filter(
            (report) => report.uid === currentUser.uid,
        );

        // Contar total de reports
        const totalReports = userReports.length;

        // Contar resolvidos (status === "resolved")
        const resolvedReports = userReports.filter(
            (report) => report.status === "resolved",
        ).length;

        // Calcular idade da conta em meses
        const creationTime = firebaseUser?.metadata?.creationTime;
        const accountAgeMonths = creationTime
            ? Math.floor(
                (Date.now() - new Date(creationTime).getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            )
            : 0;

        return {
            totalReports,
            resolvedReports,
            accountAgeMonths,
            loading: false,
        };
    }, [currentUser, reports]);

    return {
        ...stats,
        loading,
    };
}
