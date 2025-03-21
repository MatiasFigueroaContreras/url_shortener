import styles from "./basic-stats.module.css";

export default function BasicStat({
    name,
    value,
}: {
    name: string;
    value: string | number;
}) {
    return (
        <article className={styles.stat}>
            <h4>{name}</h4>
            <h2>{value}</h2>
        </article>
    );
}
