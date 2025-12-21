// spacing.ts

export type SpacingKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Spacing = Record<SpacingKeys, number>;

export const spacing: Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export type SpacingKey = keyof typeof spacing;