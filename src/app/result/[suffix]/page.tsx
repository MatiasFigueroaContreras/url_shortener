import Logo from "@/components/logo/Logo";
import styles from "./result-page.module.css";
import Button from "@/components/button/Button";
import Link from "next/link";
import Result from "@/components/result/Result";
import { notFound } from "next/navigation";
import shortenedService from "@/services/ShortenedService";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function SuffixResult({
    params,
}: {
    params: Promise<{
        suffix: string;
    }>;
}) {
    const { suffix } = await params;
    const response = await shortenedService.exists(suffix);
    const exists = response.data
    if (!exists) {
        notFound();
    }

    return (
        <main className={styles.page}>
            <Logo />
            <section className={styles.content}>
                <Result prefix={`${SITE_URL}/`} suffix={suffix} />
                <Link href="/">
                    <Button>Acortar otro!</Button>
                </Link>
            </section>
        </main>
    );
}
