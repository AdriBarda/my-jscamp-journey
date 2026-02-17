import { useAuthStore } from '../store/auth'
import { useFavoriteStore } from '../store/favoritesStore'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { signOut } = useAuthStore()
  const { clearFavorites } = useFavoriteStore()

  const handleSignOut = () => {
    clearFavorites()
    signOut()
  }

  return (
    <main className={styles.profilePage}>
      <section className={styles.profileHero}>
        <div className={styles.profileAvatar} aria-hidden="true">
          <span>J</span>
        </div>
        <h1>John Doe</h1>
        <p>john.doe@example.com</p>
      </section>

      <hr className={styles.divider} />

      <section className={styles.profilePersonalInfo}>
        <h2>Personal Information</h2>
        <div className={styles.personalInfoGrid}>
          <article>
            <h3>Full name</h3>
            <p>John Doe</p>
          </article>
          <article>
            <h3>Email</h3>
            <p>john.doe@example.com</p>
          </article>
          <article>
            <h3>Phone</h3>
            <p>+1 212 555 0198</p>
          </article>
          <article>
            <h3>Location</h3>
            <p>San Francisco, USA</p>
          </article>
        </div>
      </section>

      <section className={styles.profileExperience}>
        <h2>Experience</h2>

        <article className={styles.experienceItem}>
          <h3>Frontend Developer</h3>
          <p>Company XYZ · 2021 - Present</p>
          <p>Building web applications with React, TypeScript, and Next.js</p>
        </article>

        <hr className={styles.divider} />

        <article className={styles.experienceItem}>
          <h3>Junior Developer</h3>
          <p>Startup ABC · 2019 - 2021</p>
          <p>Maintained and developed new features in legacy applications</p>
        </article>
      </section>

      <section className={styles.profileSkills}>
        <h2>Skills</h2>
        <ul className={styles.skillsList}>
          <li>React</li>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>CSS</li>
          <li>Git</li>
          <li>Next.js</li>
          <li>REST APIs</li>
          <li>SQL</li>
        </ul>
      </section>
      <hr className={styles.divider} />
      <section className={styles.profileActions}>
        <div className={styles.actionsRow}>
          <button>Edit Profile</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </section>
    </main>
  )
}
