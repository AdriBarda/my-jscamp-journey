import snarkdown from 'snarkdown'
import styles from './JobSection.module.css'

export function JobSection({ title, content }) {
  const html = snarkdown(content)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <article className="prose">
        <div
          className={styles.sectionContent}
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
      </article>
    </section>
  )
}
