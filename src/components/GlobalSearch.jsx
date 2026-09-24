import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Map, Plane, Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { destinations, flights, hotels } from '../data/travel'
import { blogPosts, experiences, vehicles } from '../data/catalog'
import { useTravel } from '../context/TravelContext'

const searchIndex = [
  ...destinations.map((x) => ({ type: 'Destination', title: x.name, text: `${x.country} · from $${x.price}`, to: `/destinations/${x.id}`, image: x.image })),
  ...hotels.map((x) => ({ type: 'Hotel', title: x.name, text: `${x.location} · $${x.price}/night`, to: `/hotels/${x.id}`, image: x.image })),
  ...flights.map((x) => ({ type: 'Flight', title: `${x.from} to ${x.to}`, text: `${x.airline} · ${x.id}`, to: '/flights', image: destinations[3].image })),
  ...experiences.map((x) => ({ type: 'Experience', title: x.title, text: `${x.location} · $${x.price}`, to: '/experiences', image: x.image })),
  ...vehicles.map((x) => ({ type: 'Transport', title: x.name, text: `${x.category} · $${x.price}/day`, to: '/transport', image: x.image })),
  ...blogPosts.map((x) => ({ type: 'Guide', title: x.title, text: `${x.category} · ${x.read}`, to: '/guide', image: x.image })),
]

export default function GlobalSearch() {
  const { searchOpen, setSearchOpen } = useTravel()
  const [query, setQuery] = useState('')
  const input = useRef(null)
  const navigate = useNavigate()
  const results = useMemo(() => searchIndex.filter((item) => `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query])
  const closeSearch = useCallback(() => { setQuery(''); setSearchOpen(false) }, [setSearchOpen])
  useEffect(() => {
    if (!searchOpen) return undefined
    const timer = setTimeout(() => input.current?.focus(), 50)
    const key = (event) => event.key === 'Escape' && closeSearch()
    window.addEventListener('keydown', key)
    return () => { clearTimeout(timer); window.removeEventListener('keydown', key) }
  }, [searchOpen, closeSearch])
  if (!searchOpen) return null
  return <div className="global-search" role="dialog" aria-modal="true" aria-label="Search all travel options"><button className="global-search__backdrop" onClick={closeSearch} aria-label="Close search" /><div className="global-search__panel"><div className="search-input"><Search size={21} /><input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations, flights, hotels, experiences…" aria-label="Search" /><kbd>ESC</kbd><button className="icon-button" onClick={closeSearch} aria-label="Close search"><X size={19} /></button></div>{query ? <div className="search-results"><span className="micro-label">{results.length} smart matches</span>{results.length ? results.map((item, index) => <button key={`${item.type}-${index}`} onClick={() => { closeSearch(); navigate(item.to) }}><img src={item.image} alt="" /><span><small>{item.type}</small><strong>{item.title}</strong><em>{item.text}</em></span><ArrowRight size={17} /></button>) : <div className="empty-state"><Search size={30} /><h3>No exact matches</h3><p>Try Bali, flights, Paris, or hotel.</p></div>}</div> : <div className="search-suggestions"><div><span>Popular right now</span>{['Bali', 'Maldives', 'Dubai', 'Tokyo'].map((x) => <button key={x} onClick={() => setQuery(x)}><Map size={14} />{x}</button>)}</div><div><span>Browse by</span><Link to="/flights" onClick={closeSearch}><Plane size={16} />Flights</Link><Link to="/hotels" onClick={closeSearch}><Map size={16} />Stays</Link></div></div>}</div></div>
}
