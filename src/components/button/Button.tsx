import styles from "./button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
    isLoading?: boolean;
}

export default function Button({
    children,
    className,
    isLoading,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${className} ${styles.button} ${isLoading ? styles.loading : ""}`}
            {...props}
        >
            {children}
            {isLoading && (
                <div className={styles["loading-container"]}>
                    <div className={styles.circle} />
                </div>
            )}
        </button>
    );
}
