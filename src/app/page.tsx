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

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { feedback, showFeedback, hideFeedback } = useFeedbackAlert();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const url = formData.get("url") as string;

        setIsLoading(true);
        hideFeedback();

        try {
            const shortenedUrl = await shortenedService.create(url);
            router.push(`/result/${shortenedUrl.data.suffix}`);
        } catch (error: unknown) {
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
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    name="url"
                    className={styles.input}
                    placeholder="Ingresa el enlace aquí"
                    type="url"
                    required
                />
                <Button isLoading={isLoading}>Acortar!</Button>
            </form>
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
