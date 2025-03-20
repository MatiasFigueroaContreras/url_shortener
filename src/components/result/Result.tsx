"use client";

import { useRef } from "react";
import Button from "../button/Button";
import CopyIcon from "../icons/CopyIcon";
import styles from "./result.module.css";

export default function Result({
    prefix,
    suffix,
}: {
    prefix: string;
    suffix: string;
}) {
    const copyMessage = useRef<HTMLSpanElement>(null);

    function handleCopy() {
        navigator.clipboard.writeText(`${prefix}${suffix}`);
        
        if (copyMessage.current) {
            copyMessage.current.style.opacity = "1";
            setTimeout(() => {
                if (copyMessage.current) {
                    copyMessage.current.style.opacity = "0";
                }
            }, 1000);
        }
    }

    return (
        <div className={styles.result}>
            <span className={styles.text}>
                {prefix}
                <b className={styles.suffix}>{suffix}</b>
            </span>
            <section className={styles["copy-container"]}>
                <Button
                    className={styles["icon-container"]}
                    onClick={handleCopy}
                >
                    <CopyIcon className={styles.icon} />
                </Button>
                <span ref={copyMessage} className={styles["copy-message"]}>
                    ¡Copiado!
                </span>
            </section>
        </div>
    );
}
