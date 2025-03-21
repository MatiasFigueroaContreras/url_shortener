import styles from "./basic-stats.module.css"

export default function BasicStats({children}: {children: React.ReactNode}) {
  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}
