"use client";

import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";

export default function Notfound() {
    const router = useRouter();

    return (
        <main className={styles["not-found"]}>
            <h1>
                Error <b>404</b>
            </h1>
            <h3>Pagina no encontrada</h3>
            <div className={styles.text}>
                <p>Lo sentimos, la pagina que buscas no</p>
                <p>existe o no esta disponible</p>
            </div>
            <section className={styles.actions}>
                <Button
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Inicio
                </Button>
            </section>
        </main>
    );
}
