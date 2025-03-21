import styles from "./clicks-table.module.css";

export type ClickTableItem = {
    name: string;
    clicks: number;
};

export default function ClicksTable({
    name,
    items,
    totalClicks,
}: {
    name: string;
    items: ClickTableItem[];
    totalClicks: number;
}) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>{name}</th>
                        <th>N° Clicks</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={3}>No hay datos</td>
                        </tr>
                    )}
                    {items.map((item) => (
                        <tr className={styles.item} key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.clicks}</td>
                            <td>
                                {((item.clicks * 100) / totalClicks).toFixed(0)}
                                %
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
