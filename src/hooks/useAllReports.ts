import { useState, useEffect } from "react";
import { database } from "@/firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import type { FirebaseReport, Report } from "@/src/types/report";
import {
    categoryToFilterType,
    statusToPortuguese,
    generateTitle,
} from "@/src/types/report";

/**
 * Hook para buscar TODOS os reports do Firebase em tempo real
 *
 * @returns {Object} - { reports, loading, error }
 *
 * @example
 * const { reports, loading, error } = useAllReports();
 *
 * if (loading) return <Loading />;
 * if (error) return <Error message={error} />;
 *
 * return <Map problems={reports} />;
 */
export function useAllReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {


        const reportsRef = ref(database, "reports");

        // Listener em tempo real
        const unsubscribe = onValue(
            reportsRef,
            (snapshot) => {
                try {
                    if (!snapshot.exists()) {

                        setReports([]);
                        setLoading(false);
                        return;
                    }

                    const data = snapshot.val();
                    const reportsArray: Report[] = [];

                    // Transforma o objeto do Firebase em array
                    Object.entries(data).forEach(([id, value]) => {
                        const report = value as FirebaseReport;

                        // Formata o report para o formato esperado pelos componentes
                        const formattedReport: Report = {
                            id,
                            uid: report.uid,
                            category: report.category,
                            filterType: categoryToFilterType(report.category),
                            description: report.description,
                            photoUrl: report.photoUrl,
                            status: report.status,
                            createdAt: report.createdAt,
                            latitude: report.location.latitude,
                            longitude: report.location.longitude,
                            // Campos adicionais
                            title: generateTitle(report.category),
                            progress: statusToPortuguese(report.status),
                        };

                        reportsArray.push(formattedReport);
                    });

                    // Ordena por data de criação (mais recentes primeiro)
                    reportsArray.sort((a, b) => b.createdAt - a.createdAt);


                    setReports(reportsArray);
                    setError(null);
                } catch (err) {

                    setError("Erro ao carregar reports");
                } finally {
                    setLoading(false);
                }
            },
            (err) => {

                setError("Erro ao conectar com Firebase");
                setLoading(false);
            },
        );

        // Cleanup: remove o listener quando o componente desmonta
        return () => {

            off(reportsRef, "value", unsubscribe);
        };
    }, []);

    return { reports, loading, error };
}
