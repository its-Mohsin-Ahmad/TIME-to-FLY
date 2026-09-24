import { useEffect, useState } from 'react'
import { Bell, ChevronDown, CircleHelp, Globe2, Menu, Plane, Search, UserRound, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Brand from './Brand'
import { notifications } from '../data/catalog'
import { useTravel } from '../context/TravelContext'

const primary = [
  ['Destinations', '/destinations'], ['Flights', '/flights'], ['Hotels', '/hotels'],
  ['Experiences', '/experiences'], ['Trips', '/trips'],
]
const more = [
  ['Transport', '/transport'], ['Travel guide', '/guide'], ['Deals', '/deals'],
  ['About us', '/about'], ['Stories', '/blog'],
]

function UtilityMenu({ label, items }) {
  const [open, setOpen] = useState(false)
  return <div className="utility-menu">
    <button className="utility-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>{label}<ChevronDown size={13} /></button>
    {open && <div className="utility-popover">{items.map(([text, value]) => <button key={text} onClick={() => { window.dispatchEvent(new CustomEvent('ttf-preference', { detail: `${label}: ${text}` })); setOpen(false) }}>{text}<span>{value}</span></button>)}</div>}
  </div>
}

export default function Header() {
  const [mobile, setMobile] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const { setSearchOpen } = useTravel()
  const overlay = location.pathname === '/' || location.pathname === '/destinations'

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') { setMobile(false); setNotificationsOpen(false) }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return <header className={`site-header ${overlay ? 'site-header--overlay' : 'site-header--solid'}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="header-inner container-wide">
      <Brand light={overlay} />
      <nav className="main-nav" aria-label="Main navigation">
        {primary.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}
        <div className="nav-more"><button>Discover <ChevronDown size={13} /></button><div className="nav-more__menu">{more.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div></div>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search TIME TO FLY"><Search size={18} /></button>
        <div className="utility-menu desktop-only"><UtilityMenu label="EN" items={['English', 'Français', 'Español', 'Türkçe']} /></div>
        <div className="utility-menu desktop-only"><UtilityMenu label="USD" items={['US Dollar', 'Euro', 'British Pound', 'AED']} /></div>
        <div className="notification-wrap">
          <button className="icon-button has-dot" onClick={() => setNotificationsOpen((value) => !value)} aria-label="Open notifications" aria-expanded={notificationsOpen}><Bell size={18} /></button>
          {notificationsOpen && <div className="notification-popover"><div className="popover-head"><strong>Notifications</strong><button onClick={() => setNotificationsOpen(false)}>Mark all read</button></div>{notifications.map((item) => <div className="notification-item" key={item.title}><span><Plane size={16} /></span><div><strong>{item.title}</strong><p>{item.text}</p><small>{item.time} ago</small></div>{item.unread && <i />}</div>)}<Link to="/dashboard">View notification center <ChevronDown size={14} /></Link></div>}
        </div>
        <Link className="login-link desktop-only" to="/login"><UserRound size={16} /> Sign in</Link>
        <Link className="btn btn--aqua header-cta" to="/trips">Plan your trip <Plane size={15} /></Link>
        <button className="mobile-menu-button" onClick={() => setMobile(true)} aria-label="Open menu"><Menu size={22} /></button>
      </div>
    </div>
    {mobile && <div className="mobile-drawer-wrap"><button className="drawer-overlay" onClick={() => setMobile(false)} aria-label="Close menu" /><aside className="mobile-drawer"><div className="drawer-head"><Brand light /><button className="icon-button" onClick={() => setMobile(false)} aria-label="Close menu"><X /></button></div><nav>{[...primary, ...more].map(([label, to]) => <NavLink key={to} to={to} onClick={() => setMobile(false)}>{label}<span>→</span></NavLink>)}</nav><div className="drawer-utilities"><UtilityMenu label="Language: English" items={['English', 'Français', 'Español']} /><UtilityMenu label="Currency: USD" items={['US Dollar', 'Euro', 'AED']} /></div><div className="drawer-actions"><Link className="btn btn--outline-light" to="/login" onClick={() => setMobile(false)}>Login</Link><Link className="btn btn--aqua" to="/signup" onClick={() => setMobile(false)}>Create account</Link></div><Link className="support-link" to="/support"><CircleHelp size={16} /> Help & support</Link><div className="drawer-meta"><Globe2 size={14} /> One journey. Every detail.</div></aside></div>}
  </header>
}
