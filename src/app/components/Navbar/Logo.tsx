import styles from './navbar.module.scss';

function Logo() {
    return (<a href="/" className={styles.logo}>
        <h1 className={styles.normal}>
            Anto
            <span className={styles.right}>
                grama<small>®</small>
            </span>
        </h1>

        <h1 className={styles.hover}>
            <span className={styles.left}>Anto</span>
            <span className={styles.right}>n Martinez</span>
        </h1>
    </a>);
}

export default Logo;