import { BarChart3, Bell, Building2, CalendarDays, Car, ChevronLeft, ChevronRight, CircleDollarSign, CreditCard, FileText, Gift, Globe2, LayoutDashboard, Map, MessageSquare, Percent, Plane, Search, Settings, Star, Ticket, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { useTravel } from '../context/TravelContext'

const adminNav = [['Overview', LayoutDashboard], ['Users', Users], ['Flights', Plane], ['Airlines', Globe2], ['Airports', Map], ['Hotels', Building2], ['Rooms', CalendarDays], ['Bookings', Ticket], ['Tickets', FileText], ['Destinations', Map], ['Packages', Gift], ['Experiences', Star], ['Cars', Car], ['Transfers', Car], ['Payments', CreditCard], ['Coupons', Percent], ['Reviews', Star], ['Notifications', Bell], ['Reports', BarChart3], ['Settings', Settings]]

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { notify } = useTravel()
  return <div className={`admin-shell ${collapsed ? 'is-collapsed' : ''} ${mobile ? 'drawer-open' : ''}`}><button className="dashboard-overlay" onClick={() => setMobile(false)} aria-label="Close admin menu" /><aside className="admin-sidebar"><div className="dashboard-brand"><Brand light compact /><div><strong>TIME TO FLY</strong><small>Operations center</small></div><button className="icon-button" onClick={() => setMobile(false)}><X /></button></div><nav>{adminNav.map(([label, Icon], index) => <Link to={index === 0 ? '/admin' : '#'} className={index === 0 ? 'is-active' : ''} onClick={() => setMobile(false)} key={label}><Icon /><span>{label}</span>{['Bookings', 'Notifications'].includes(label) && <b>{label === 'Bookings' ? '14' : '6'}</b>}</Link>)}</nav><div className="admin-system"><i /><div><strong>All systems operational</strong><small>Last checked just now</small></div></div><div className="dashboard-user"><span>AM</span><div><strong>Alex Morgan</strong><small>Administrator</small></div><ChevronRight /></div></aside><div className="admin-main"><header className="dashboard-topbar"><button className="dashboard-menu" onClick={() => setMobile(true)}><span /><span /><span /></button><button className="dashboard-collapse" onClick={() => setCollapsed(!collapsed)}><ChevronLeft /></button><div className="admin-search"><Search /><span>Search bookings, users, flights…</span><kbd>⌘ K</kbd></div><button className="icon-button" onClick={() => notify('You have 6 unread notifications')}><Bell /><i /></button><Link className="btn btn--outline" to="/dashboard">Traveler view</Link><Link className="avatar-link" to="/">AM</Link></header>{children}</div></div>
}
