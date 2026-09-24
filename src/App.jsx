import { lazy, Suspense, useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalSearch from './components/GlobalSearch'
import FlyMate from './components/FlyMate'
import Toast from './components/Toast'
import { useTravel } from './context/TravelContext'

const Home = lazy(() => import('./pages/Home'))
const FlightsPage = lazy(() => import('./pages/FlightsPage'))
const HotelsPage = lazy(() => import('./pages/HotelsPage'))
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'))
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetailPage'))
const HotelDetailPage = lazy(() => import('./pages/HotelDetailPage'))
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'))
const PackagesPage = lazy(() => import('./pages/PackagesPage'))
const TransportPage = lazy(() => import('./pages/TransportPage'))
const TripsPage = lazy(() => import('./pages/TripsPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const TicketPage = lazy(() => import('./pages/TicketPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const GuidePage = lazy(() => import('./components/GuidePage'))
const SupportPage = lazy(() => import('./components/SupportPage'))
const BlogPage = lazy(() => import('./components/ContentPages').then((module) => ({ default: module.BlogPage })))
const AboutPage = lazy(() => import('./components/ContentPages').then((module) => ({ default: module.AboutPage })))
const LegalPage = lazy(() => import('./components/LegalPage').then((module) => ({ default: module.LegalPage })))

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [pathname])
  return null
}

function SiteLayout({ children, chrome = true }) {
  const location = useLocation()
  const { setSearchOpen, setAssistantOpen, notify } = useTravel()
  useEffect(() => {
    const key = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) } }
    const flymate = () => setAssistantOpen(true)
    const preference = (event) => notify(event.detail)
    window.addEventListener('keydown', key); window.addEventListener('ttf-open-flymate', flymate); window.addEventListener('ttf-preference', preference)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('ttf-open-flymate', flymate); window.removeEventListener('ttf-preference', preference) }
  }, [setSearchOpen, setAssistantOpen, notify])
  const immersive = ['/dashboard', '/admin', '/login', '/signup', '/ticket'].some((path) => location.pathname.startsWith(path))
  return <>{!immersive && <Header />}{children}{chrome && !immersive && <Footer />}<GlobalSearch /><FlyMate /><Toast /></>
}

function LoadingScreen() {
  return <div className="route-loader"><span className="brand-loader"><PlaneMark /></span><p>Preparing the journey…</p></div>
}

function PlaneMark() { return <svg viewBox="0 0 48 48"><path d="M5 34 19 7l5 16L43 11 26 40l-5-15L5 34Z" fill="currentColor" /></svg> }
function NotFound() { return <main id="main-content" className="not-found"><span>404</span><h1>This path flew off the map.</h1><p>Let’s get you back somewhere wonderful.</p><Link className="btn btn--dark" to="/">Return home</Link></main> }

export default function App() {
  return <SiteLayout><ScrollManager /><Suspense fallback={<LoadingScreen />}><Routes><Route path="/" element={<Home />} /><Route path="/flights" element={<FlightsPage />} /><Route path="/hotels" element={<HotelsPage />} /><Route path="/hotels/:id" element={<HotelDetailPage />} /><Route path="/destinations" element={<DestinationsPage />} /><Route path="/destinations/:id" element={<DestinationDetailPage />} /><Route path="/experiences" element={<ExperiencesPage />} /><Route path="/deals" element={<PackagesPage />} /><Route path="/transport" element={<TransportPage />} /><Route path="/trips" element={<TripsPage />} /><Route path="/dashboard" element={<DashboardPage />} /><Route path="/admin/*" element={<AdminPage />} /><Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} /><Route path="/ticket/:id" element={<TicketPage chrome="false" />} /><Route path="/checkout" element={<PaymentPage />} /><Route path="/login" element={<AuthPage mode="login" chrome="false" />} /><Route path="/signup" element={<AuthPage mode="signup" chrome="false" />} /><Route path="/guide" element={<GuidePage />} /><Route path="/blog" element={<BlogPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/support" element={<SupportPage />} /><Route path="/legal" element={<LegalPage />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></SiteLayout>
}
