import { ArrowUpRight, Clock3, MoreHorizontal } from 'lucide-react'
import { useTravel } from '../context/TravelContext'
import { flights } from '../data/travel'

const recentBookings = [
  { id: 'TTF-8K2LP', customer: 'Olivia Martin', item: 'JFK → DPS', type: 'Flight', amount: '$1,428', status: 'Confirmed', time: '4 min ago' },
  { id: 'TTF-3M7QA', customer: 'Noah Wilson', item: 'Solei Resort, Bali', type: 'Hotel', amount: '$1,560', status: 'Pending', time: '18 min ago' },
  { id: 'TTF-9P4XD', customer: 'Mia Anderson', item: 'Swiss Adventure', type: 'Package', amount: '$2,190', status: 'Confirmed', time: '31 min ago' },
  { id: 'TTF-6T1RV', customer: 'Ethan Clark', item: 'JFK → NRT', type: 'Flight', amount: '$980', status: 'Review', time: '46 min ago' },
  { id: 'TTF-2H8BW', customer: 'Amelia Hall', item: 'Aegean Catamaran', type: 'Experience', amount: '$224', status: 'Confirmed', time: '1 hr ago' },
]

export default function AdminTables() {
  const { bookings } = useTravel()
  const rows = [...recentBookings, ...bookings.slice(0, 2).map((item) => ({ ...item, customer: 'Alex Morgan', amount: `$${item.total}`, type: item.type, time: 'Just now' }))].slice(0, 6)
  return <><section className="admin-card recent-admin-bookings"><div className="card-head"><div><span className="micro-label">Live operations</span><h2>Recent bookings</h2></div><button className="btn btn--outline">View all bookings <ArrowUpRight /></button></div><div className="admin-table"><div className="admin-table__head"><span>Booking</span><span>Customer</span><span>Type</span><span>Amount</span><span>Status</span><span>Time</span><span /></div>{rows.map((item) => <div className="admin-table__row" key={item.id}><strong>{item.id}</strong><span>{item.customer}</span><span>{item.item}</span><b>{item.amount}</b><span className={`status-chip status-${item.status.toLowerCase()}`}>{item.status}</span><span>{item.time}</span><button aria-label={`Actions for ${item.id}`}><MoreHorizontal /></button></div>)}</div></section><section className="admin-card flight-operations"><div className="card-head"><div><span className="micro-label">Live inventory</span><h2>Flight schedule</h2></div><button className="btn btn--outline">Manage schedules</button></div>{flights.map((flight) => <div key={flight.id}><span className="airline-code" style={{ '--accent': flight.accent }}>{flight.code}</span><p><strong>{flight.id} · {flight.from} → {flight.to}</strong><small>{flight.airline} · Boeing 787-9</small></p><span><Clock3 />{flight.depart}</span><span>Gate B14</span><i className="status-dot" />Scheduled<button aria-label={`Actions for ${flight.id}`}><MoreHorizontal /></button></div>)}</section></>
}
