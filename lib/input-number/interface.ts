import { ChangeValueProps } from "@/types";

export interface InputNumberProps extends ChangeValueProps<number> {
    /**
     * 小数点位精确度
     * @default 0
     */
    decimalPlaces?: number;
    /**
     * 单位
     */
    unit?: string;
    /**
     * 步进
     * @default 1
     */
    step?: number;
    /**
     * 最小值
     * @default -Infinity
     */
    min?: number;
    /**
     * 最大值
     * @default Infinity
     */
    max?: number;
    /**
     * 是否启动鼠标滚动自增自减
     * @default true
     */
    enabledWheel?: boolean;
    /**
     * 是否循环，自增达到max之后，再次自增变为min
     * @default false
     */
    loop?: boolean;
}