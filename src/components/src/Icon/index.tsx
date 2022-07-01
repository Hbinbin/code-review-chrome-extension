import { SVGAttributes, computed } from 'vue';
import { useDefineComponent } from '@lt/vue-hooks';
import './index.scss';

export interface IIconProps extends SVGAttributes {
    /** 图标名称 */
    symbol: string;
    /** 图标大小 */
    size?: number;
    /** 颜色 */
    color?: string;
    onClick?: (e: MouseEvent) => void;
}
const Icon = useDefineComponent<IIconProps>({
    props: ['symbol', 'size', 'color', 'onClick'],
    setup(props, { attrs }) {
        const style = computed(() => ({
            color: props.color,
            fontSize: `${props.size}px`,
        }));

        return () => (
            <svg {...attrs} class="tool-components-icon" style={style.value} aria-hidden="true" onClick={props.onClick}>
                <use xlinkHref={`#${props.symbol}`} />
            </svg>
        );
    },
});

export default Icon;
