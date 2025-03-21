"use client";

import Logo from "@/components/logo/Logo";
import styles from "./page.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { useState } from "react";
import shortenedService from "@/services/ShortenedService";
import axios from "axios";
import { useFeedbackAlert } from "@/components/feedback-alert/useFeedbackAlert";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { useRouter } from "next/navigation";
import StatsIcon from "@/components/icons/StatsIcon";
import Link from "next/link";
import CutIcon from "@/components/icons/CutIcon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { feedback, showFeedback, hideFeedback } = useFeedbackAlert();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const url = formData.get("url") as string;
        const suffix = formData.get("suffix") as string;
        if (suffix == "stats" || suffix == "result") {
            showFeedback("El sufijo no puede ser 'stats' o 'result'", "error");
            return;
        }
        setIsLoading(true);
        hideFeedback();
        try {
            console.log("url", url);
            const response = await shortenedService.create(url, suffix);
            console.log("response", response);
            router.push(`/result/${response.data.suffix}`);
        } catch (error: unknown) {
            console.error("Error acortando la URL", error);
            let errorMessage = "Ocurrió un error desconocido";
            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.detail ||
                    "Ocurrió un error inesperado en la solicitud";
            }

            showFeedback(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.page}>
            <Logo />
            <form id="shorten" className={styles.form} onSubmit={handleSubmit}>
                <Input
                    name="url"
                    className={styles.input}
                    placeholder="Ingresa el enlace aquí *"
                    type="url"
                    required
                />
                <div className={styles["custom-suffix"]}>
                    <Input
                        name="suffix"
                        placeholder="sufijo"
                        prefix={SITE_URL + "/"}
                        type="text"
                    />
                    <span className={styles.info}>Déjalo en blanco para un sufijo aleatorio</span>
                </div>
            </form>
            <div className={styles.actions}>
                <Link href="/stats">
                    <Button styleType="secondary">
                        <span className={styles["icon-button"]}>
                            <StatsIcon className={styles.icon} />
                            Ver Estadísticas
                        </span>
                    </Button>
                </Link>
                <Button form="shorten" type="submit" isLoading={isLoading}>
                    <span className={styles["icon-button"]}>
                        <CutIcon
                            className={`${styles.icon} ${
                                isLoading ? styles.loading : ""
                            }`}
                        />
                        Acortar el enlace
                    </span>
                </Button>
            </div>
            {feedback && (
                <FeedbackAlert
                    message={feedback.message}
                    type={feedback.type}
                    onClose={hideFeedback}
                />
            )}
        </main>
    );
}
