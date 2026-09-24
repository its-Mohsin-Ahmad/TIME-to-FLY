import AdminShell from '../components/AdminShell'
import AdminStats from '../components/AdminStats'
import AdminCharts from '../components/AdminCharts'
import AdminTables from '../components/AdminTables'
import AdminResourcePage from '../components/AdminResourcePage'
import AdminUtilityPage from '../components/AdminUtilityPage'
import { useLocation } from 'react-router-dom'

const resourceRoutes = new Set(['users', 'flights', 'airlines', 'airports', 'hotels', 'rooms', 'bookings', 'tickets', 'destinations', 'packages', 'experiences', 'cars', 'transfers', 'payments', 'coupons', 'reviews'])
const utilityRoutes = new Set(['profile', 'settings', 'notifications', 'reports'])

export default function AdminPage() {
  const resource = useLocation().pathname.split('/')[2] || 'dashboard'
  return <AdminShell>{resourceRoutes.has(resource) ? <AdminResourcePage resource={resource} /> : utilityRoutes.has(resource) ? <AdminUtilityPage resource={resource} /> : <div className="admin-content"><AdminStats /><AdminCharts /><AdminTables /></div>}</AdminShell>
}
