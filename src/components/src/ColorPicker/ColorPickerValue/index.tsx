import { computed } from 'vue';
import { Select, InputNumber, Input } from 'line-style';
import { useDefineComponent, useState } from '@lt/vue-hooks';
import { RgbaColor, TColorType, TColorValue } from '../../utils';
import './index.scss';

type TRgbaType = keyof RgbaColor;
// interface
interface IProps {
    /** 颜色值 */
    color?: TColorValue;
    /** 颜色类型 */
    colorType?: TColorType;
    /** 颜色值改变触发 */
    onColorChange?: (color: TColorValue) => void;
    /** 颜色类型改变触发 */
    onColorTypeChange?: (type: TColorType) => void;
}
const selectOptions = [
    {
        value: 'rgb',
        label: 'RGB',
    },
    {
        value: 'hex',
        label: 'HEX',
    },
];

const prefixClass = 'color-picker-value';
const ColorPickerValue = useDefineComponent<IProps>({
    props: ['color', 'colorType', 'onColorChange', 'onColorTypeChange'],
    setup(props) {
        const [inputHexValue, setInputHexValue] = useState('');

        const computedColor = computed(() => {
            let hex, rgba;
            if (props.colorType === 'rgb') {
                rgba = (props.color || {}) as RgbaColor;
            } else {
                hex = ((props.color || '') as string)?.toUpperCase();
                setInputHexValue(hex);
            }
            return {
                hex,
                rgba,
            };
        });
        // 处理颜色类型改变
        const handleColorTypeChange = (type: TColorType) => {
            props.onColorTypeChange?.(type);
        };
        // 处理rgba颜色改变
        const handleRgbaChange = (type: TRgbaType, value: number) => {
            console.log('handleRgbaChange: ', type, value);
            const { hex, rgba } = computedColor.value;
            const newColor = props.colorType === 'hex' ? hex : { ...rgba, [type]: value };

            props.onColorChange?.(newColor as TColorValue);
        };
        // 处理hex颜色改变
        const handleHexChange = (hex: string) => {
            setInputHexValue(hex);
            // 输入正确的hex颜色值才触发
            if (hex.length === 6) {
                hex = hex.toUpperCase();
                props.onColorChange?.(`#${hex}`);
            }
        };
        return () => {
            let { rgba } = computedColor.value;
            const hex = inputHexValue.value?.replace('#', '');
            return (
                <div class={prefixClass}>
                    <Select
                        defaultValue="hex"
                        options={selectOptions}
                        dropdownClassName={`${prefixClass}-dropdown`}
                        onChange={handleColorTypeChange}
                    ></Select>
                    {props.colorType === 'rgb' ? (
                        <>
                            <InputNumber
                                value={rgba!.r}
                                max={255}
                                min={0}
                                onChange={(value) => handleRgbaChange('r', value)}
                            />
                            <InputNumber
                                value={rgba!.g}
                                max={255}
                                min={0}
                                onChange={(value) => handleRgbaChange('g', value)}
                            />
                            <InputNumber
                                value={rgba!.b}
                                max={255}
                                min={0}
                                onChange={(value) => handleRgbaChange('b', value)}
                            />
                            <InputNumber
                                class={`${prefixClass}-alpha`}
                                defaultValue={1}
                                max={1}
                                min={0}
                                value={rgba!.a ?? 1}
                                onChange={(value) => handleRgbaChange('a', value)}
                            />
                        </>
                    ) : (
                        <Input
                            class={`${prefixClass}-hex`}
                            type="text"
                            maxlength={6}
                            value={hex}
                            onChange={(e) => handleHexChange(e.target.value)}
                        />
                    )}
                </div>
            );
        };
    },
});

export default ColorPickerValue;
