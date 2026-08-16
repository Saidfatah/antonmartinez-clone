import styles from './navbar.module.scss';

type Props = {
    href: string,
    label: string,
    count?: number | null
}

function NavbarLink({ href, label, count }: Props) {
    return (<a
        href={href}
        className={styles.item}
        style={{ 
            translate: "none", 
            rotate: "none", 
            scale: "none", 
            transform: "translate(0px, 0px)", 
            opacity: 1 
        }}
    >
        <span>{label} {count && <small>{count}</small>} </span>
    </a>

    );
}

export default NavbarLink;