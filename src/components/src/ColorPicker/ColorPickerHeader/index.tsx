import { VNode } from 'vue';
import { useDefineComponent } from '@lt/vue-hooks';
import './index.scss';

// interface
interface IProps {
    title?: string | VNode;
    color?: string;
}
const prefixClass = 'color-picker-header';
const ColorPickerHeader = useDefineComponent<IProps>({
    props: ['title', 'color'],
    setup(props) {
        return () => {
            return (
                <div class={prefixClass}>
                    <span class={`${prefixClass}-title`}>{props.title || '颜色'}</span>
                    <div class={`${prefixClass}-color-wrapper`}>
                        <span style={{ background: props.color }} />
                        {props.color}
                    </div>
                </div>
            );
        };
    },
});

export default ColorPickerHeader;
