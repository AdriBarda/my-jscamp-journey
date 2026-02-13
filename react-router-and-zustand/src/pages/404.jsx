import { useNavigate } from 'react-router'
import { PageTitle } from '../components/PageTitle'
import styles from './404.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <main>
      <PageTitle title="MyDevJobs - 404" />
      <section className={styles.sectionNotFound}>
        <h1>404 - Not Found</h1>
        <p>We can't find the page you are looking for.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </section>
    </main>
  )
}
