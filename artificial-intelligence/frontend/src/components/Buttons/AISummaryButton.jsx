import styles from './ButtonBase.module.css'

export function AISummaryButton({ loading, hasSummary, onClick }) {
  return (
    <button className={styles.primaryButton} onClick={onClick} disabled={loading}>
      {loading
        ? 'Summarising...'
        : hasSummary
          ? '🤖 Regenerate AI Summary'
          : '🤖 Generate AI Summary'}
    </button>
  )
}
