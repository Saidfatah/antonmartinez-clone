import styles from './masked.text.module.scss';

function MaskedText({ text, show }: { text: string; show?: boolean }) {
    return (
        <div className={[
            styles.root,
        
        ].filter(Boolean).join(' ')}>
            <span className={show ? styles.show : ''}>{text}</span>
        </div>
    );
}

export default MaskedText;