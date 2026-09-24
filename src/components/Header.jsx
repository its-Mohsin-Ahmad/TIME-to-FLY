import { useEffect, useState } from 'react'
import { Bell, ChevronDown, CircleHelp, Globe2, Menu, Plane, Search, UserRound, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Brand from './Brand'
import { notifications } from '../data/catalog'
import { useTravel } from '../context/TravelContext'

const primary = [
  ['Home', '/'], ['Flights', '/flights'], ['Hotels', '/hotels'], ['Trips', '/trips'],
  ['Destinations', '/destinations'], ['Experiences', '/experiences'],
]
const more = [
  ['Car rental & transfers', '/transport'], ['Travel guide', '/guide'], ['Deals', '/deals'],
  ['About us', '/about'], ['Stories', '/blog'],
]

function UtilityMenu({ label, items }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(items[0][0])
  return <div className="utility-menu">
    <button className="utility-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>{selected || label}<ChevronDown size={13} /></button>
    {open && <div className="utility-popover">{items.map(([text, value]) => <button key={text} className={selected === text ? 'is-selected' : ''} onClick={() => { setSelected(text); window.dispatchEvent(new CustomEvent('ttf-preference', { detail: `${label}: ${text}` })); setOpen(false) }}>{text}<span>{value}</span></button>)}</div>}
  </div>
}

function Header() {
  const [mobile, setMobile] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { setSearchOpen } = useTravel()
  const overlay = location.pathname === '/' || location.pathname === '/destinations'

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') { setMobile(false); setNotificationsOpen(false) }
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('keydown', close)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('scroll', onScroll) }
  }, [])

  return <header className={`site-header ${overlay ? 'site-header--overlay' : 'site-header--solid'} ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner container-wide">
      <button className="mobile-menu-button mobile-menu-trigger" onClick={() => setMobile(true)} aria-label="Open navigation menu" aria-expanded={mobile} aria-controls="site-navigation-drawer"><Menu size={22} /></button>
      <Brand light={overlay} />
      <nav className="main-nav" aria-label="Main navigation">
        {primary.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
        <div className={`nav-more ${moreOpen ? 'is-open' : ''}`}><button onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen}>More <ChevronDown size={13} /></button><div className="nav-more__menu">{more.map(([label, to]) => <Link key={to} to={to} onClick={() => setMoreOpen(false)}>{label}</Link>)}</div></div>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search TIME TO FLY"><Search size={18} /></button>
        <div className="utility-menu desktop-only"><UtilityMenu label="EN" items={['English', 'Français', 'Español', 'Türkçe']} /></div>
        <div className="utility-menu desktop-only"><UtilityMenu label="USD" items={['US Dollar', 'Euro', 'British Pound', 'AED']} /></div>
        <div className="notification-wrap">
          <button className={`icon-button ${notificationsRead ? '' : 'has-dot'}`} onClick={() => setNotificationsOpen((value) => !value)} aria-label="Open notifications" aria-expanded={notificationsOpen}><Bell size={18} /></button>
          {notificationsOpen && <div className="notification-popover"><div className="popover-head"><strong>Notifications</strong><button onClick={() => setNotificationsRead(true)}>Mark all read</button></div>{notifications.map((item) => <div className="notification-item" key={item.title}><span><Plane size={16} /></span><div><strong>{item.title}</strong><p>{item.text}</p><small>{item.time} ago</small></div>{item.unread && !notificationsRead && <i />}</div>)}<Link to="/dashboard">View notification center <ChevronDown size={14} /></Link></div>}
        </div>
        <Link className="login-link desktop-only" to="/login"><UserRound size={16} /> Profile</Link>
        <Link className="btn btn--aqua header-cta" to="/trips">Plan your trip <Plane size={15} /></Link>

      </div>
    </div>
    {mobile && <div className="mobile-drawer-wrap"><button className="drawer-overlay" onClick={() => setMobile(false)} aria-label="Close menu" /><aside className="mobile-drawer" id="site-navigation-drawer" aria-label="Site navigation"><div className="drawer-head"><Brand light /><button className="icon-button" onClick={() => setMobile(false)} aria-label="Close menu"><X /></button></div><nav>{[...primary, ...more, ['Profile', '/login']].map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobile(false)}>{label}<span>→</span></NavLink>)}</nav><div className="drawer-utilities"><UtilityMenu label="Language: English" items={['English', 'Français', 'Español']} /><UtilityMenu label="Currency: USD" items={['US Dollar', 'Euro', 'AED']} /></div><div className="drawer-actions"><Link className="btn btn--outline-light" to="/login" onClick={() => setMobile(false)}>Login</Link><Link className="btn btn--aqua" to="/signup" onClick={() => setMobile(false)}>Create account</Link></div><Link className="support-link" to="/support"><CircleHelp size={16} /> Help & support</Link><div className="drawer-meta"><Globe2 size={14} /> One journey. Every detail.</div></aside></div>}
  </header>
}
export default Header
