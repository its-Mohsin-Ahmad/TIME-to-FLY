import { Bell, ChevronLeft, LogOut, Menu, ShieldCheck, UserRound, X, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Brand from './Brand'
import { useTravel } from '../context/TravelContext'
import { travellerNav } from '../data/travellerNav'
import { TravellerNavItem, TravellerProfile } from './TravellerNavItem'

export default function TravellerShell({ children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('ttf-dashboard-collapsed') === 'true')
  const [mobile, setMobile] = useState(false)
  const [systemOpen, setSystemOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [unread, setUnread] = useState(3)
  const [tooltip, setTooltip] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { notify, setSearchOpen } = useTravel()
  useEffect(() => {
    const activeItem = navRef.current?.querySelector('.traveller-nav-item.is-active')
    activeItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [location.pathname])
  useEffect(() => { localStorage.setItem('ttf-dashboard-collapsed', collapsed) }, [collapsed])
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { setMobile(false); setSystemOpen(false); setNotificationsOpen(false); setProfileOpen(false); setTooltip(null) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const showTooltip = (event, label) => {
    if (!collapsed || !label) { setTooltip(null); return }
    const bounds = event.currentTarget.getBoundingClientRect()
    setTooltip({ label, top: bounds.top + bounds.height / 2 })
  }
  const openProfile = () => { setProfileOpen((value) => !value); setSystemOpen(false); setNotificationsOpen(false) }
  const logout = () => { localStorage.removeItem('ttf-traveler-session'); notify('You have been logged out'); navigate('/login') }
  return <div className={`dashboard-shell traveller-shell ${collapsed ? 'is-collapsed' : ''} ${mobile ? 'drawer-open' : ''}`}>
    <button className="dashboard-overlay" onClick={() => setMobile(false)} aria-label="Close traveller menu" />
    <aside className="traveller-sidebar" aria-label="Traveller sidebar">
      <div className="traveller-sidebar__header dashboard-brand"><Brand light compact /><div><strong>TIME TO FLY</strong><small>Traveller Portal</small></div><button className="icon-button traveller-sidebar__close" onClick={() => setMobile(false)} aria-label="Close traveller menu"><X size={18} /></button></div>
      <nav ref={navRef} className="traveller-sidebar__nav" aria-label="Traveller navigation"><div className="traveller-sidebar__nav-intro" aria-hidden="true"><span>Workspace</span><small>Scroll to explore</small></div>{travellerNav.map((item) => <TravellerNavItem key={item.label} item={item} onNavigate={() => { setMobile(false); setTooltip(null) }} onTooltip={showTooltip} />)}<div className="traveller-sidebar__scroll-end" aria-hidden="true"><span>More journeys await</span><i>↓</i></div></nav>
      <div className="traveller-sidebar__footer"><button className="traveller-system" onClick={() => { setSystemOpen((value) => !value); setProfileOpen(false); setNotificationsOpen(false) }}><i /><div><strong>All systems operational</strong><small>Last checked just now</small></div><span>›</span></button><TravellerProfile onOpen={openProfile} /></div>
    </aside>
    {tooltip && <div className="traveller-nav-tooltip" role="tooltip" style={{ '--tooltip-top': `${tooltip.top}px` }}>{tooltip.label}</div>}
    <div className="dashboard-main">
      <header className="dashboard-topbar traveller-topbar"><button className="dashboard-menu traveller-menu" onClick={() => setMobile(true)} aria-label="Open traveller menu"><Menu size={20} /></button><button className="dashboard-collapse traveller-collapse" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}><ChevronLeft size={18} /></button><button className="traveller-search" onClick={() => setSearchOpen(true)}><span>Search your trips, bookings, tickets…</span><kbd>⌘ K</kbd></button><div className="dashboard-topbar-actions"><button className="icon-button traveller-bell" onClick={() => { setNotificationsOpen((value) => !value); setProfileOpen(false); setSystemOpen(false) }} aria-label="Open traveller notifications"><Bell size={18} />{unread > 0 && <i />}</button><button className="traveller-avatar" onClick={openProfile} aria-label="Open traveller profile">AM</button></div><Link className="btn btn--outline traveller-admin-link" to="/admin/dashboard">Admin view</Link></header>
      {notificationsOpen && <div className="dashboard-popover traveller-popover traveller-notifications"><div className="popover-head"><strong>Notifications</strong><button onClick={() => { setUnread(0); notify('All traveller notifications marked read') }}>Mark all read</button></div>{['Your Bali check-in is open', 'Solei Resort booking confirmed', 'Your Tokyo trip starts in 18 days'].slice(0, unread ? 3 : 0).map((item) => <button key={item} onClick={() => setUnread((value) => Math.max(0, value - 1))}><Check size={15} /><span><strong>{item}</strong><small>Travel update</small></span></button>)}</div>}
      {profileOpen && <div className="dashboard-popover traveller-popover traveller-profile-menu"><button onClick={() => { setProfileOpen(false); navigate('/dashboard') }}><UserRound size={15} />Profile</button><button onClick={() => { setProfileOpen(false); navigate('/dashboard/settings') }}><ShieldCheck size={15} />Account settings</button><button onClick={() => { setProfileOpen(false); navigate('/dashboard/notifications') }}><Bell size={15} />Notifications</button><button className="is-danger" onClick={logout}><LogOut size={15} />Logout</button></div>}
      {systemOpen && <div className="dashboard-popover traveller-popover traveller-system-panel"><div className="popover-head"><strong>System status</strong><button onClick={() => setSystemOpen(false)} aria-label="Close system status"><X size={14} /></button></div>{['API', 'Database', 'Flight service', 'Hotel service', 'Payments'].map((service) => <p key={service}><span><Check size={12} />{service}</span><b>Operational</b></p>)}</div>}
      {children}
    </div>
  </div>
}
