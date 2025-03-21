import styles from "./button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
    isLoading?: boolean;
    styleType?: "primary" | "secondary";
}

export default function Button({
    children,
    className,
    isLoading,
    styleType = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${className} ${styles.button} ${styles[styleType]} ${isLoading ? styles.loading : ""}`}
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
