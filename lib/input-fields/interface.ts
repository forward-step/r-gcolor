import type { ChangeValueProps, SingleColor } from '@/types';
import { CSSProperties } from 'react';

export interface InputFieldsProps extends ChangeValueProps<SingleColor> {
    className?: string;
    style?: CSSProperties;
}
