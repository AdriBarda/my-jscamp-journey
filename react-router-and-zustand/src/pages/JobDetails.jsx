import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from '../components/Link'
import snarkdown from 'snarkdown'
import styles from './JobDetails.module.css'
import { FallbackLoadingComponent } from '../components/FallbackLoadingComponent'

import { AddToFavoritesButton } from '../components/Buttons/AddToFavoritesButton.jsx'
import { ApplyButton } from '../components/Buttons/ApplyButton.jsx'

function JobSection({ title, content }) {
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

export default function JobDetails() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        setLoading(true)
        if (!response.ok) {
          navigate('/not-found')
          throw new Error('Job Not Found')
        }
        return response.json()
      })
      .then((json) => setJob(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [jobId, navigate])

  if (loading) {
    return <FallbackLoadingComponent />
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Job not Found</h2>

          <button className={styles.errorButton} onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/search" className={styles.breadcrumbLink}>
            Jobs
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{job.titulo}</h1>
          <div className={styles.meta}>
            <p className={styles.company}>
              {job.empresa} - {job.ubicacion}
            </p>
          </div>
        </div>
      </header>
      <div className={styles.actions} style={{ marginBlock: '3rem' }}>
        <ApplyButton jobId={job.id} />
        <AddToFavoritesButton jobId={job.id} />
      </div>
      <JobSection title="Job description" content={job.content.description} />
      <JobSection title="Responsibilities" content={job.content.responsibilities} />
      <JobSection title="Job Requirements" content={job.content.requirements} />
      <JobSection title="About" content={job.content.about} />
    </div>
  )
}
