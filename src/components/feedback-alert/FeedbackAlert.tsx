import { useEffect } from "react";
import styles from "./feedback-alert.module.css";

interface FeedbackAlertProps {
    message: string;
    type?: "info" | "error" | "success";
    onClose: () => void;
}

export default function FeedbackAlert({
    message,
    type = "info",
    onClose,
}: FeedbackAlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${styles[type]} ${styles.alert}`}>
            <p>{message}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                className={styles.close}
                onClick={onClose}
            >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
        </div>
    );
}
