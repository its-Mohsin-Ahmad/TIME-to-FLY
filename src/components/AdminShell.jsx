import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, Building2, CalendarDays, Car, ChevronLeft, ChevronRight, CircleDollarSign, CreditCard, FileText, Gift, Globe2, LayoutDashboard, Map, Menu, Percent, Plane, Search, Settings, Star, Ticket, UserRound, Users, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Brand from './Brand'
import { useAdmin } from '../context/AdminContext'
import { useTravel } from '../context/TravelContext'

const adminNav = [
  ['Overview', LayoutDashboard, '/admin/dashboard'], ['Users', Users, '/admin/users'], ['Flights', Plane, '/admin/flights'], ['Airlines', Globe2, '/admin/airlines'], ['Airports', Map, '/admin/airports'], ['Hotels', Building2, '/admin/hotels'], ['Rooms', CalendarDays, '/admin/rooms'], ['Bookings', Ticket, '/admin/bookings'], ['Tickets', FileText, '/admin/tickets'], ['Destinations', Map, '/admin/destinations'], ['Packages', Gift, '/admin/packages'], ['Experiences', Star, '/admin/experiences'], ['Cars', Car, '/admin/cars'], ['Transfers', Car, '/admin/transfers'], ['Payments', CreditCard, '/admin/payments'], ['Coupons', Percent, '/admin/coupons'], ['Reviews', Star, '/admin/reviews'], ['Notifications', Bell, '/admin/notifications'], ['Reports', CircleDollarSign, '/admin/reports'], ['Settings', Settings, '/admin/settings'],
]
const searchCollections = [['Flights', 'flights', '/admin/flights'], ['Hotels', 'hotels', '/admin/hotels'], ['Bookings', 'bookings', '/admin/bookings'], ['Users', 'users', '/admin/users'], ['Destinations', 'destinations', '/admin/destinations']]

export default function AdminShell({ children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('ttf-admin-collapsed') === 'true')
  const [mobile, setMobile] = useState(false)
  const [systemOpen, setSystemOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { notify } = useTravel()
  const { state, markNotification, markAllNotifications, deleteNotification } = useAdmin()
  const unread = state.notifications.filter((item) => !item.read).length
  useEffect(() => localStorage.setItem('ttf-admin-collapsed', collapsed), [collapsed])
  useEffect(() => { const onKey = (event) => { if (event.key === 'Escape') { setMobile(false); setSystemOpen(false); setProfileOpen(false); setNotificationsOpen(false) } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus() } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
  const searchResults = useMemo(() => { const term = search.trim().toLowerCase(); if (!term) return []; return searchCollections.flatMap(([label, collection, to]) => (state[collection] || []).filter((item) => Object.values(item).join(' ').toLowerCase().includes(term)).map((item) => ({ label, title: item.name || item.flightNumber || item.id, text: item.email || item.item || item.location || item.customer || item.id, to }))).slice(0, 8) }, [search, state])
  const logout = () => { localStorage.removeItem('ttf-admin-state'); notify('You have been logged out'); navigate('/login') }

  return <div className={`admin-shell ${collapsed ? 'is-collapsed' : ''} ${mobile ? 'drawer-open' : ''}`}>
    <button className="dashboard-overlay" onClick={() => setMobile(false)} aria-label="Close admin menu" />
    <aside className="admin-sidebar"><div className="dashboard-brand"><Brand light compact /><div><strong>TIME TO FLY</strong><small>Operations center</small></div><button className="icon-button" onClick={() => setMobile(false)} aria-label="Close admin menu"><X /></button></div><nav aria-label="Admin navigation">{adminNav.map(([label, Icon, to]) => <NavLink key={label} to={to} className={({ isActive }) => isActive ? 'is-active' : ''} data-label={label} onClick={() => setMobile(false)}><Icon /><span>{label}</span>{['Bookings', 'Notifications'].includes(label) && <b>{label === 'Bookings' ? state.bookings.length : unread}</b>}</NavLink>)}</nav><div className="admin-sidebar__footer"><button className="admin-system" onClick={() => { setSystemOpen((value) => !value); setProfileOpen(false) }}><i /><div><strong>All systems operational</strong><small>Last checked just now</small></div><ChevronRight /></button><button className="dashboard-user" onClick={() => { setProfileOpen((value) => !value); setSystemOpen(false) }}><span>AM</span><div><strong>Alex Morgan</strong><small>Administrator</small></div><ChevronRight /></button></div></aside>
    <div className="admin-main"><header className="dashboard-topbar"><button className="dashboard-menu" onClick={() => setMobile(true)} aria-label="Open admin menu"><Menu size={20} /></button><button className="dashboard-collapse" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}><ChevronLeft /></button><div className="admin-search"><Search /><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bookings, users, flights…" aria-label="Global dashboard search" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}<kbd>⌘ K</kbd>{search && <div className="admin-search-results">{searchResults.length ? searchResults.map((result) => <button key={`${result.label}-${result.title}`} onClick={() => { navigate(result.to); setSearch('') }}><strong>{result.title}</strong><small>{result.label} · {result.text}</small></button>) : <p>No dashboard matches</p>}</div>}</div><div className="admin-topbar-actions"><button className="icon-button" onClick={() => { setNotificationsOpen((value) => !value); setProfileOpen(false) }} aria-label="Open admin notifications"><Bell />{unread > 0 && <i />}</button><button className="avatar-link" onClick={() => { setProfileOpen((value) => !value); setSystemOpen(false) }} aria-label="Open profile menu">AM</button></div><Link className="btn btn--outline" to="/dashboard">Traveler view</Link></header>
      {notificationsOpen && <div className="admin-popover admin-notifications"><div className="popover-head"><strong>Notifications</strong><button onClick={markAllNotifications}>Mark all read</button></div>{state.notifications.map((item) => <div className={`admin-notification ${item.read ? 'is-read' : ''}`} key={item.id}><button onClick={() => markNotification(item.id)}><strong>{item.title}</strong><p>{item.text}</p><small>{item.time}</small></button><button onClick={() => deleteNotification(item.id)} aria-label={`Delete ${item.title}`}><X size={14} /></button></div>)}</div>}
      {profileOpen && <div className="admin-popover admin-profile-menu"><button onClick={() => { setProfileOpen(false); navigate('/admin/profile') }}><UserRound />Profile</button><button onClick={() => { setProfileOpen(false); navigate('/admin/settings') }}><Settings />Account settings</button><button onClick={() => { setProfileOpen(false); navigate('/admin/notifications') }}><Bell />Notifications</button><button onClick={() => { setProfileOpen(false); navigate('/admin/settings?tab=security') }}><Settings />Security</button><button className="is-danger" onClick={logout}><X />Logout</button></div>}
      {systemOpen && <div className="admin-popover admin-status-panel"><div className="popover-head"><strong>System status</strong><button onClick={() => setSystemOpen(false)} aria-label="Close system status"><X size={14} /></button></div>{state.services.map((service) => <div className="status-row" key={service.name}><span><i />{service.name}</span><b>{service.status}</b></div>)}</div>}
      {children}
    </div>
  </div>
}

