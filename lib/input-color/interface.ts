import { COLOR_FORMAT } from '@/config';
import type { ChangeValueProps, SingleColor } from '@/types';
import type { CSSProperties, ReactNode } from 'react';

export interface InputColorProps extends ChangeValueProps<SingleColor> {
    className?: string;
    style?: CSSProperties;
    defaultFormat?: COLOR_FORMAT;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    select?: boolean | ((props: ChangeValueProps<COLOR_FORMAT>) => ReactNode);
}
