
import { TextStyle } from 'react-native';

export type TypographyKeys = 'h1' | 'h2' | 'subhead' | 'body' | 'caption';

export type Typography = Record<TypographyKeys, TextStyle>;

export const typography: Typography = {
    h1: {
        fontSize: 24,
    },
    h2: {
        fontSize: 20,
    },
    subhead: {
        fontSize: 14,
    },
    body: {
        fontSize: 16,
    },
    caption: {
        fontSize: 12,
    },
};