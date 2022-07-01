import { watch, VNode, computed } from 'vue';
import { ColorPicker as Vue3ColorPicker } from 'vue3-colorpicker';
import { debounce } from 'lodash-es';
import { useDefineComponent, useState } from '@lt/vue-hooks';
import ColorPickerHeader from './ColorPickerHeader';
import ColorPickerValue from './ColorPickerValue';
import ColorPickerHistory from './ColorPickerHistory';
import { TColorType, TColorValue, formatColor, RgbaColor, toRgbaString } from '../utils';
import './index.scss';

// interface
interface IProps {
    /** 颜色可以是hex/rgba/rgb */
    color?: string;
    /** 是否显式标题头 */
    showHeader?: boolean;
    /** 标题 */
    title?: string | VNode;
    /** color是hex/rgba */
    onChange?: (color?: TColorValue) => void;
    /** 颜色拖动结束触发 */
    onChangeEnd?: (color?: TColorValue) => void;
}
const prefixClass = 'color-picker';
const ColorPicker = useDefineComponent<IProps>({
    props: ['color', 'showHeader', 'title', 'onChange', 'onChangeEnd'],
    setup(props) {
        const { hex } = formatColor(props.color || '');
        const [hexColor, setHexColor] = useState(hex || ''); // hex格式颜色
        const [colorValue, setColorValue] = useState<TColorValue | undefined>(''); // 颜色值
        const [colorType, setColorType] = useState<TColorType>('hex'); // 颜色类型
        const [colorHistory, setColorHistory] = useState<string[]>([]); // 颜色历史记录
        const [pureColor, setPureColor] = useState('');

        // 对props的color做监听
        watch(
            () => props.color,
            (color) => {
                const { hex, rgba } = formatColor(color || '');
                console.log('hex:watchEffect ', hex);
                setHexColor(hex || '');
                setColorValue(colorType.value === 'rgb' ? rgba : hex);
            },
        );

        // 处理颜色变化
        const handleColorChange = (color: string | RgbaColor) => {
            console.log('handleColorChange:color ', color);
            const { hex, rgba } = formatColor(color);
            const newColor = colorType.value === 'rgb' ? rgba : hex;
            const newPureColor =
                colorType.value === 'rgb' ? `rgba(${rgba!.r},${rgba!.g},${rgba!.b},${rgba!.a ?? 1})` : hex;
            console.log('newPureColor: ', newPureColor);
            setPureColor(newPureColor || '');
            setHexColor(hex || '');
            setColorValue(newColor);
            props.onChange?.(newColor);
            onColorChangeEnd(newColor); // 300ms后模拟触发 change end
        };
        // 处理颜色类型变化
        const handleColorTypeChange = (colorType: TColorType) => {
            console.log('handColorTypeChange:colorType ', colorType);
            setColorType(colorType);
            const { hex, rgba } = formatColor(colorValue.value || '');

            const newColor = colorType === 'rgb' ? rgba : hex;
            setHexColor(hex || '');
            setColorValue(newColor);
            props.onChange?.(newColor);
            onColorChangeEnd(newColor);
        };
        // 用debounce模拟change end
        const onColorChangeEnd = debounce((color?: TColorValue) => {
            // 记录颜色历史
            const newHistory = [...new Set([hexColor.value, ...colorHistory.value])].filter(Boolean) as string[];
            // 最多存储12个
            if (newHistory.length > 12) {
                newHistory.pop();
            }
            setColorHistory(newHistory);

            props.onChangeEnd?.(color);
        }, 300);
        // const handleClilck = () => {
        //     setPureColor('rgba(2,2,3,0.6)');
        // };

        return () => {
            const { showHeader = true } = props;
            const color = colorType.value === 'hex' ? colorValue.value : toRgbaString(colorValue.value);
            console.log('color:1111 ', color);
            return (
                <div class={prefixClass}>
                    {/* <button onClick={handleClilck}>123</button> */}
                    {showHeader ? <ColorPickerHeader title={props.title} color={hexColor.value} /> : null}
                    <Vue3ColorPicker
                        isWidget
                        pickerType="chrome"
                        format={colorType.value}
                        pureColor={color}
                        disableHistory
                        disableAlpha={colorType.value === 'hex'}
                        onPureColorChange={handleColorChange}
                    />
                    <ColorPickerValue
                        color={colorValue.value}
                        colorType={colorType.value}
                        onColorChange={handleColorChange}
                        onColorTypeChange={handleColorTypeChange}
                    />
                    <ColorPickerHistory colors={colorHistory.value} />
                </div>
            );
        };
    },
});

export default ColorPicker;
