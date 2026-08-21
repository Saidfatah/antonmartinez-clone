import styles from "./info.items.module.scss";

type Props = {
    infoItems: {
        title: string;
        infosItems: string[];
    }[];
    className?: string;
};

function InfoItems({ infoItems, className }: Props) {
    return (
        <div className={`${styles.root} ${className || ""}`}>
            {infoItems.map((item, index) => (
                <div className={styles.infoItem} key={index}>
                    <span className={styles.infoItemTitle}>
                        {item.title}
                    </span>

                    <div>
                        {item.infosItems.map((info, index) => (
                            <p key={index}>{info}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InfoItems;