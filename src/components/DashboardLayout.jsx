import { Bell, ChevronLeft, ChevronRight, CreditCard, FileText, Heart, LayoutDashboard, Luggage, MessageSquare, Plane, Settings, ShieldCheck, Ticket, Wallet, X, CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Brand from './Brand'

const nav = [['Dashboard', LayoutDashboard], ['My trips', Luggage], ['My flights', Plane], ['My hotels', CalendarDays], ['My tickets', Ticket], ['Bookings', FileText], ['Wishlist', Heart], ['Travel wallet', Wallet], ['Payments', CreditCard], ['Notifications', Bell], ['Messages', MessageSquare], ['Travel documents', ShieldCheck], ['Settings', Settings]]

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  return <div className={`dashboard-shell ${collapsed ? 'is-collapsed' : ''} ${mobile ? 'drawer-open' : ''}`}><button className="dashboard-overlay" onClick={() => setMobile(false)} aria-label="Close dashboard menu" /><aside className="dashboard-sidebar"><div className="dashboard-brand"><Brand light compact /><div><strong>TIME TO FLY</strong><small>Traveler portal</small></div><button className="icon-button" onClick={() => setMobile(false)}><X /></button></div><nav>{nav.map(([label, Icon], index) => <Link to={index === 0 ? '/dashboard' : '#'} className={index === 0 ? 'is-active' : ''} onClick={() => setMobile(false)} key={label}><Icon /><span>{label}</span>{label === 'Notifications' && <b>3</b>}</Link>)}</nav><div className="dashboard-user"><span>AM</span><div><strong>Alex Morgan</strong><small>Traveler plan</small></div><ChevronRight /></div></aside><div className="dashboard-main"><header className="dashboard-topbar"><button className="dashboard-menu" onClick={() => setMobile(true)}><span /><span /><span /></button><button className="dashboard-collapse" onClick={() => setCollapsed(!collapsed)}><ChevronLeft /></button><div className="dashboard-global-search"><span>Search your trips, bookings, tickets…</span></div><Link to="/admin" className="btn btn--outline">Admin view</Link><button className="icon-button"><Bell /><i /></button><Link to="/" className="avatar-link">AM</Link></header>{children}</div></div>
}
