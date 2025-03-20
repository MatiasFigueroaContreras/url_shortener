import LinkIcon from "../icons/LinkIcon";
import styles from "./logo.module.css";

export default function Logo() {
    return (
        <div className={styles.logo}>
            <section className={styles.top}>
                <LinkIcon className={styles.icon} preserveAspectRatio="none" />
                <h3>URL</h3>
            </section>
            <h1>Shortener</h1>
        </div>
    );
}
