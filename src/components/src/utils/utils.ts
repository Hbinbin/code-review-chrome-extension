import { Vector4 } from '@lt/math';

export interface RgbColor {
    r: number;
    g: number;
    b: number;
}

export interface RgbaColor extends RgbColor {
    a: number;
}
export type TColorType = 'rgb' | 'hex';
export type TColorValue = string | RgbaColor;

const COLOR_MAX = 255;

/**
 * 转换 Vector3 的颜色为 16 进制值。
 * @param color 描述 rgb 颜色， x,y,z ∈ [0, 1]
 * @returns
 */
export function vector4ColorToRGBA(color: Vector4) {
    const { x, y, z } = color;
    const r = x * COLOR_MAX;
    const g = y * COLOR_MAX;
    const b = z * COLOR_MAX;
    return { r, g, b, a: color.w };
}

export function rgbaToVector4(rgba: RgbaColor) {
    const { r, g, b, a } = rgba;
    const x = r / COLOR_MAX;
    const y = g / COLOR_MAX;
    const z = b / COLOR_MAX;
    const w = a;

    return new Vector4(x, y, z, w);
}

export const hexToRgba = (hex: string): RgbaColor => {
    if (hex[0] === '#') hex = hex.slice(1);

    if (hex.length < 6) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a: 1,
        };
    }

    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1,
    };
};

export const hexToRgbaNew = (hex: string): RgbaColor => {
    if (hex[0] === '#') hex = hex.slice(1);

    if (hex.length === 3) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a: 1,
        };
    }

    let alpha: unknown = hex.slice(6);
    if (alpha) {
        alpha = Number((parseInt(alpha as string, 16) / 255).toFixed(2));
    }

    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: (alpha as number) || 1,
    };
};

export function rgbaToHex({ r, g, b, a }: RgbaColor) {
    let red = r.toString(16);
    let green = g.toString(16);
    let blue = b.toString(16);
    let alpha = Math.round(a * 255).toString(16);

    if (red.length === 1) red = '0' + red;
    if (green.length === 1) green = '0' + green;
    if (blue.length === 1) blue = '0' + blue;
    if (alpha.length === 1) alpha = '0' + alpha;

    return '#' + red + green + blue + alpha;
}

const format = (number: number) => {
    const hex = Number(number.toFixed()).toString(16);
    return hex.length < 2 ? '0' + hex : hex;
};

export const rgbToHex = ({ r, g, b }: RgbColor): string => {
    return '#' + format(r) + format(g) + format(b);
};

/** 获取颜色的类型 */
export const getColorType = (color: string) => {
    console.log('getColorType: ', color);
    color = color?.toLocaleLowerCase();
    const isHex = color?.startsWith('#');
    const isRgba = color?.startsWith('rgba');
    const isRgb = !isRgba && color?.startsWith('rgb');
    return {
        isHex,
        isRgba,
        isRgb,
    };
};
export const toRgbaString = (rgba: RgbaColor) => {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a ?? 1})`;
};
export type TFormatColor = { hex: string; rgba: RgbaColor; rgbaString: string };
/**
 * 格式化颜色
 * @desc hex/rgb/rgba转为hex和rgba以及rgba的字符串
 * @returns {TFormatColor}
 */
export const formatColor = (color: string | RgbaColor): Partial<TFormatColor> => {
    color = typeof color === 'object' ? toRgbaString(color) : color;
    const { isHex, isRgba, isRgb } = getColorType(color);
    console.log('isHex, isRgba, isRgb:formatColor ', isHex, isRgba, isRgb);
    let rgba, rgbaString, hex;
    if (isHex) {
        hex = color;
        rgba = hexToRgbaNew(color);
        rgbaString = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a ?? 1})`;
    } else if (isRgba || isRgb) {
        color = color?.toLocaleLowerCase();
        const reg = isRgba ? /(?:\(|\)|rgba)*/g : /(?:\(|\)|rgb)*/g;
        // 将rgba/rgb颜色字符串分解成数字数组
        let [r, g, b, a] = color
            .replace(reg, '')
            .split(',')
            .map((value) => Number(value));
        // 合成rgba字符串
        rgbaString = `rgba(${r},${g},${b},${a ?? 1})`;
        // rgba对象
        rgba = {
            r,
            g,
            b,
            a,
        };
        // hex颜色字符串
        hex = isRgba ? rgbaToHex({ r, g, b, a }) : rgbToHex({ r, g, b });
    }
    hex = hex?.toUpperCase();
    return {
        hex,
        rgba,
        rgbaString,
    };
};

export function getPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
}

export function getGlobalPrefixCls() {
    return `tool-components`;
}
