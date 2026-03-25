import styles from './JobSection.module.css'

export function JobSection({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <article className="prose">
        <div className={styles.sectionContent}>{children}</div>
      </article>
    </section>
  )
}
