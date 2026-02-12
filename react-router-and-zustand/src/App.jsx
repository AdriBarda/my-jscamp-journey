import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { NotFoundPage } from './pages/404.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { ContactPage } from './pages/Contact.jsx'
import { JobDetails } from './pages/JobDetails.jsx'

import { Routes, Route } from 'react-router'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
