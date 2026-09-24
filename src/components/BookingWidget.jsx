import { useState } from 'react'
import { ArrowRight, CalendarDays, Car, ChevronDown, CircleUserRound, MapPin, Plane, Search, Sparkles, Star, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'

const tabs = [
  ['Flights', Plane], ['Hotels', MapPin], ['Packages', Sparkles],
  ['Cars', Car], ['Transfers', Users],
]
const today = new Date().toISOString().split('T')[0]

function Field({ icon: Icon, label, children, className = '' }) {
  return <label className={`search-field ${className}`}><span>{label}</span><div>{Icon && <Icon size={16} />}{children}</div></label>
}

export default function BookingWidget() {
  const [tab, setTab] = useState('Flights')
  const [tripType, setTripType] = useState('Round trip')
  const [form, setForm] = useState({ from: 'New York (JFK)', to: 'Bali (DPS)', depart: '', return: '', travelers: '2', cabin: 'Economy', destination: '', checkin: '', checkout: '', guests: '2', rooms: '1' })
  const navigate = useNavigate()
  const { notify } = useTravel()
  const update = (key) => (event) => setForm((values) => ({ ...values, [key]: event.target.value }))
  const search = (event) => {
    event.preventDefault()
    if (tab === 'Flights' && (!form.from || !form.to || !form.depart)) return notify('Choose your origin, destination, and departure date', 'error')
    const paths = { Flights: 'flights', Hotels: 'hotels', Packages: 'deals', Cars: 'transport', Transfers: 'transport' }
    const params = new URLSearchParams(tab === 'Flights' ? { from: form.from, to: form.to, depart: form.depart, return: form.return, trip: tripType, travelers: form.travelers, cabin: form.cabin } : { destination: form.destination, checkin: form.checkin, checkout: form.checkout, guests: form.guests, rooms: form.rooms, mode: tab === 'Transfers' ? 'Transfer' : tab === 'Cars' ? 'Rental' : '' })
    notify(`${tab} search ready — showing the best matches`)
    navigate(`/${paths[tab]}?${params}`)
  }
  return <div className="booking-widget">
    <div className="booking-tabs" role="tablist" aria-label="Booking type">{tabs.map(([name, Icon]) => <button key={name} className={tab === name ? 'is-active' : ''} onClick={() => setTab(name)} role="tab" aria-selected={tab === name}><Icon size={15} />{name}</button>)}</div>
    {tab === 'Flights' && <form onSubmit={search}>
      <div className="trip-switcher">{['One way', 'Round trip', 'Multi city'].map((item) => <button type="button" className={tripType === item ? 'is-active' : ''} onClick={() => setTripType(item)} key={item}>{item}</button>)}</div>
      <div className="flight-fields">
        <Field icon={Plane} label="From"><input value={form.from} onChange={update('from')} aria-label="Origin" /></Field>
        <button className="swap-button" type="button" onClick={() => setForm((v) => ({ ...v, from: v.to, to: v.from }))} aria-label="Swap origin and destination"><ArrowRight size={15} /></button>
        <Field icon={MapPin} label="To"><input value={form.to} onChange={update('to')} aria-label="Destination" /></Field>
        <Field icon={CalendarDays} label="Departure"><input type="date" min={today} value={form.depart} onChange={update('depart')} aria-label="Departure date" /></Field>
        {tripType !== 'One way' && <Field icon={CalendarDays} label="Return"><input type="date" min={form.depart || today} value={form.return} onChange={update('return')} aria-label="Return date" /></Field>}
        <Field icon={CircleUserRound} label="Travelers"><select value={form.travelers} onChange={update('travelers')}><option>1 traveler</option><option>2 travelers</option><option>3 travelers</option><option>4 travelers</option></select><ChevronDown size={13} /></Field>
        <Field icon={Star} label="Cabin class"><select value={form.cabin} onChange={update('cabin')}><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select><ChevronDown size={13} /></Field>
      </div>
      <div className="booking-submit"><span><i />Live fares from 500+ trusted airlines</span><button className="btn btn--aqua btn--search" type="submit"><Search size={17} />Search flights</button></div>
    </form>}
    {tab !== 'Flights' && <form className="simple-booking" onSubmit={search}>
      <Field icon={MapPin} label={tab === 'Cars' || tab === 'Transfers' ? 'Pick-up location' : tab === 'Packages' ? 'Where to?' : 'Destination'}><input value={form.destination} onChange={update('destination')} placeholder={tab === 'Cars' ? 'Airport, city, or hotel' : 'Search the world'} /></Field>
      {['Hotels', 'Packages'].includes(tab) && <><Field icon={CalendarDays} label="Check-in"><input type="date" min={today} value={form.checkin} onChange={update('checkin')} /></Field><Field icon={CalendarDays} label="Check-out"><input type="date" min={form.checkin || today} value={form.checkout} onChange={update('checkout')} /></Field></>}
      <Field icon={Users} label="Guests"><select value={form.guests} onChange={update('guests')}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></Field><Field icon={Users} label="Rooms"><select value={form.rooms} onChange={update('rooms')}><option value="1">1 room</option><option value="2">2 rooms</option><option value="3">3 rooms</option></select></Field>
      <div className="booking-submit"><span>Free cancellation options available</span><button className="btn btn--aqua btn--search" type="submit"><Search size={17} />Search {tab.toLowerCase()}</button></div>
    </form>}
  </div>
}
