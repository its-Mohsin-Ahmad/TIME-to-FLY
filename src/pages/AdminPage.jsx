import AdminLayout from '../components/AdminLayout'
import AdminStats from '../components/AdminStats'
import AdminCharts from '../components/AdminCharts'
import AdminTables from '../components/AdminTables'
export default function AdminPage() { return <AdminLayout><div className="admin-content"><AdminStats /><AdminCharts /><AdminTables /></div></AdminLayout> }
