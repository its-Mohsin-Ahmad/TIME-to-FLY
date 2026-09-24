import { ArrowRight, Check, ChevronDown, Luggage, Plane, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FlightResult({ flight, onSelect }) {
  return <article className="flight-result"><div className="flight-result__main"><div className="airline-cell"><span className="airline-code" style={{ '--accent': flight.accent }}>{flight.code}</span><div><strong>{flight.airline}</strong><small>{flight.id} · Boeing 787-9</small></div></div><div className="result-route"><div><strong>{flight.depart}</strong><span>{flight.from}</span><small>New York</small></div><div className="route-line"><span>{flight.duration}</span><i /><small>{flight.stops ? `${flight.stops} stop · Singapore` : 'Nonstop'}</small></div><div><strong>{flight.arrive} <sup>{flight.nextDay}</sup></strong><span>{flight.to}</span><small>Bali</small></div></div><div className="result-price"><span>Round trip / person</span><strong>${flight.price}</strong><small>${Math.round(flight.price * 1.15)} total</small><button className="btn btn--aqua" onClick={onSelect}>Select flight</button></div></div><div className="flight-result__details"><span><Luggage size={14} />1 carry-on</span><span><Check size={14} />{flight.baggage} checked</span><span><Plane size={14} />Seat selection available</span><button>Flight details <ChevronDown size={13} /></button></div></article>
}

export function FlightInsight() {
  return <aside className="trip-insights"><div><Sparkles size={19} /><strong>FlyMate’s pick</strong></div><p>Book 21 days before departure for the best chance of a lower fare. This route is 8% cheaper than usual.</p><span>Estimated savings <b>$94</b></span><Link to="/flights">Track prices <ArrowRight size={14} /></Link></aside>
}
