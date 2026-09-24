import { NavLink } from 'react-router-dom'

export function TravellerNavItem({ item, onNavigate, onTooltip }) {
  const Icon = item.icon
  return <NavLink
    to={item.to}
    end={item.end}
    className={({ isActive }) => `traveller-nav-item${isActive ? ' is-active' : ''}`}
    onClick={onNavigate}
    onMouseEnter={(event) => onTooltip(event, item.label)}
    onMouseLeave={() => onTooltip(null)}
    onFocus={(event) => onTooltip(event, item.label)}
    onBlur={() => onTooltip(null)}
    aria-label={item.label}
  >
    <span className="traveller-nav-item__icon"><Icon size={23} strokeWidth={1.8} />{item.badge && <b className="traveller-nav-item__badge">{item.badge}</b>}</span>
    <span className="traveller-nav-item__label">{item.label}</span>
  </NavLink>
}

export function TravellerProfile({ onOpen }) {
  return <button className="traveller-profile" onClick={onOpen} aria-label="Open traveller profile menu"><span>AM</span><div><strong>Alex Morgan</strong><small>Traveller</small></div><ChevronRightIcon /></button>
}

function ChevronRightIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
}
