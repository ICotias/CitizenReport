/**
 * Tipos relacionados a Reports/Problemas
 */

export type ReportStatus = "open" | "in_progress" | "resolved";

export type ReportCategory =
    | "Iluminação"
    | "Lixo"
    | "Vias"
    | "Segurança"
    | "Saúde"
    | "Outro";

/**
 * Estrutura do Report no Firebase Realtime Database
 */
export interface FirebaseReport {
    uid: string;
    category: string;
    description: string;
    photoUrl: string;
    status: ReportStatus;
    createdAt: number;
    location: {
        latitude: number;
        longitude: number;
    };
}

/**
 * Tipo de filterType usado nos ícones do mapa
 */
export type FilterType =
    | "lighting"
    | "garbage"
    | "roads"
    | "security"
    | "health"
    | "other";

/**
 * Report formatado para uso nos componentes
 */
export interface Report {
    id: string;
    uid: string;
    category: string;
    filterType: FilterType;
    description: string;
    photoUrl: string;
    status: ReportStatus;
    createdAt: number;
    latitude: number;
    longitude: number;
    // Campos opcionais
    title?: string;
    address?: string;
    progress?: string;
}

/**
 * Mapeia categoria para filterType
 */
export function categoryToFilterType(category: string): FilterType {
    const normalized = category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (normalized.includes("iluminacao") || normalized.includes("iluminação")) {
        return "lighting";
    }
    if (normalized.includes("lixo")) {
        return "garbage";
    }
    if (
        normalized.includes("via") ||
        normalized.includes("buraco") ||
        normalized.includes("rua")
    ) {
        return "roads";
    }
    if (normalized.includes("seguranca") || normalized.includes("segurança")) {
        return "security";
    }
    if (normalized.includes("saude") || normalized.includes("saúde")) {
        return "health";
    }

    return "other";
}

/**
 * Mapeia status para texto em português
 */
export function statusToPortuguese(status: ReportStatus): string {
    switch (status) {
        case "open":
            return "Pendente";
        case "in_progress":
            return "Em progresso";
        case "resolved":
            return "Resolvido";
        default:
            return "Desconhecido";
    }
}

/**
 * Gera um título baseado na categoria
 */
export function generateTitle(category: string): string {
    const normalized = category.toLowerCase();

    if (normalized.includes("iluminação")) {
        return "Problema de iluminação";
    }
    if (normalized.includes("lixo")) {
        return "Acúmulo de lixo";
    }
    if (normalized.includes("via") || normalized.includes("buraco")) {
        return "Buraco na via";
    }
    if (normalized.includes("segurança")) {
        return "Problema de segurança";
    }
    if (normalized.includes("saúde")) {
        return "Problema de saúde";
    }

    return "Outro problema";
}
