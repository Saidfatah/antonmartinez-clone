import Logo from "./Logo";
import styles from "./navbar.module.scss";
import NavbarLink from "./NavbarLink";

const menuItems = [
    { href: "/", label: "About", count: null },
    { href: "/work/", label: "Works", count: 8 },
    { href: "/almost/", label: "Almost", count: 15 },
];

function Navbar() {
    return (<div className={styles.root}>
        <div className="row">
            <div className="column-8">
                <div className={styles.menuItems}>
                    {menuItems.map((item) => (
                        <NavbarLink key={item.href} href={item.href} label={item.label} count={item.count} />
                    ))}
                </div>
            </div>

            <div className="column-4">
                <Logo />
            </div>
        </div>
    </div>);
}

export default Navbar;