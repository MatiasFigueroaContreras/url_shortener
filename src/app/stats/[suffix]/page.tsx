import Logo from "@/components/logo/Logo";
import styles from "./stats-suffix-page.module.css";
import shortenedService from "@/services/ShortenedService";
import BasicStats from "@/components/basic-stats/BasicStatsContainer";
import BasicStat from "@/components/basic-stats/BasicStat";
import Link from "next/link";
import StatsIcon from "@/components/icons/StatsIcon";
import WorldIcon from "@/components/icons/WorldIcon";
import ClicksTable, {
    ClickTableItem,
} from "@/components/clicks-table/ClicksTable";
import CutIcon from "@/components/icons/CutIcon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";

export default async function StatsSuffix({
    params,
}: {
    params: Promise<{ suffix: string }>;
}) {
    const { suffix } = await params;
    const shortenedResponse = await shortenedService.get(suffix);
    const shortened = shortenedResponse.data;
    const statsResponse = await shortenedService.getStats(suffix);
    const stats = statsResponse.data;

    const calculateExpirationTime = (expirationTime: number) => {
        const units = [
            { name: "año", seconds: 31536000 },
            { name: "mes", seconds: 2592000 },
            { name: "día", seconds: 86400 },
            { name: "hora", seconds: 3600 },
            { name: "minuto", seconds: 60 },
            { name: "segundo", seconds: 1 },
        ];

        const result = [];

        for (const { name, seconds } of units) {
            const value = Math.floor(expirationTime / seconds);
            if (value > 0) {
                result.push(`${value} ${name}${value > 1 ? "s" : ""}`);
                expirationTime %= seconds;
            }
            if (result.length === 2) break;
        }

        return result.length ? result.join(" ") : "0 segundos";
    };

    const isExpired = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const createdAtTimestamp = Math.floor(
            new Date(shortened.created_at).getTime() / 1000
        );
        const expirationTimestamp =
            createdAtTimestamp + shortened.expiration_time;
        return expirationTimestamp < currentTime;
    };

    const getDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-CL");
    };

    const dictToItemList = (data: Record<string, number>): ClickTableItem[] => {
        return Object.entries(data).map(
            ([name, clicks]) => ({ name, clicks } as ClickTableItem)
        );
    };

    return (
        <main className={styles.page}>
            <Logo />
            <div className={styles.content}>
                <section className={styles.top}>
                    <section className={styles.title}>
                        <StatsIcon className={styles.icon} />
                        <h1>Estadísticas</h1>
                    </section>
                    <section className={styles.actions}>
                        <Link className={styles["icon-link"]} href="/stats">
                            <StatsIcon className={styles.icon} />
                        </Link>
                        <Link className={styles["icon-link"]} href="/">
                            <CutIcon className={styles.icon} />
                        </Link>
                    </section>
                </section>
                <section className={styles.info}>
                    <Link
                        className={styles.link}
                        href="/[suffix]"
                        as={`/${suffix}`}
                    >
                        <WorldIcon className={styles.icon} />
                        {SITE_URL}/{suffix}
                    </Link>
                    <hr className={styles.divisor} />
                    <div
                        className={`${styles.status} ${
                            isExpired() ? styles.expired : styles.active
                        }`}
                    >
                        <div className={styles.point}></div>
                        <p>{isExpired() ? "Expirado" : "Activo"}</p>
                    </div>
                </section>
                <section className={styles.stats}>
                    <BasicStats>
                        <BasicStat name="N° Clicks" value={stats.hits} />
                        <BasicStat
                            name="N° Clicks Únicos"
                            value={stats.unique_hits}
                        />
                        <BasicStat
                            name="Tiempo de expiración"
                            value={calculateExpirationTime(
                                shortened.expiration_time
                            )}
                        />
                        <BasicStat
                            name="Fecha de Creación"
                            value={getDate(shortened.created_at)}
                        />
                    </BasicStats>
                    <section className={styles.tables}>
                        <ClicksTable
                            name="Países"
                            items={dictToItemList(stats.countries_hits)}
                            totalClicks={stats.hits}
                        />
                        <ClicksTable
                            name="Navegadores"
                            items={dictToItemList(stats.browsers_hits)}
                            totalClicks={stats.hits}
                        />
                        <ClicksTable
                            name="Plataformas"
                            items={dictToItemList(stats.platforms_hits)}
                            totalClicks={stats.hits}
                        />
                        <ClicksTable
                            name="Dispositivos"
                            items={dictToItemList(stats.devices_hits)}
                            totalClicks={stats.hits}
                        />
                    </section>
                </section>
            </div>
        </main>
    );
}
