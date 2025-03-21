"use client";

import Logo from "@/components/logo/Logo";
import styles from "./stats-page.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import StatsIcon from "@/components/icons/StatsIcon";
import Link from "next/link";
import CutIcon from "@/components/icons/CutIcon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";

export default function Stats() {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const suffix = formData.get("suffix") as string;
        router.push(`/stats/${suffix}`);
    };

    return (
        <main className={styles.page}>
            <Logo />
            <form id="stats" className={styles.form} onSubmit={handleSubmit}>
                <Input
                    name="suffix"
                    className={styles.input}
                    placeholder="alias"
                    type="text"
                    prefix={`${SITE_URL}/`}
                    required
                />
            </form>
            <div className={styles.actions}>
                <Button form="stats" type="submit" styleType="secondary">
                    <span className={styles["icon-button"]}>
                        <StatsIcon className={styles.icon} />
                        Ver Estadísticas
                    </span>
                </Button>
                <Link href="/">
                    <Button type="button">
                        <span className={styles["icon-button"]}>
                            <CutIcon className={styles.icon} />
                            Acortar un enlace
                        </span>
                    </Button>
                </Link>
            </div>
        </main>
    );
}
