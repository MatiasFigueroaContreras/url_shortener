import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix?: string;
}

export default function Input({ className, prefix, ...props }: InputProps) {
    if (!prefix) {
        return <input className={`${className} ${styles.input}`} {...props} />;
    }

    return (
        <div className={`${className} ${styles.container}`}>
            <span className={styles.prefix}>{prefix}</span>
            <input className={styles["input-suffix"]} {...props} />
        </div>
    );
}
