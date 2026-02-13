import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'

import { FallbackLoadingComponent } from './components/FallbackLoadingComponent.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const JobDetails = lazy(() => import('./pages/JobDetails.jsx'))
const ContactPage = lazy(() => import('./pages/Contact.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<FallbackLoadingComponent />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
