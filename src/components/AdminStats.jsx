import { CalendarDays, CircleDollarSign, Plane, Plus, Ticket, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { useTravel } from '../context/TravelContext'

const stats = [
  ['Total users', 'users', Users, '/admin/users'], ['Total flights', 'flights', Plane, '/admin/flights'], ['Hotels', 'hotels', CalendarDays, '/admin/hotels'], ['Bookings', 'bookings', Ticket, '/admin/bookings'], ['Revenue', 'revenue', CircleDollarSign, '/admin/reports'], ['Platform growth', 'growth', TrendingUp, '/admin/reports'],
]
const display = { users: '48,294', flights: '1,284', hotels: '856', bookings: '12,842', revenue: '$6.24M', growth: '+16.8%' }

export default function AdminStats() {
  const { state } = useAdmin()
  const { notify } = useTravel()
  const [date, setDate] = useState('2026-09-23')
  return <><div className="admin-welcome"><div><span>Operations overview · {new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><h1>Good morning, Alex.</h1><p>Here’s what’s happening across TIME TO FLY today.</p></div><div><input className="admin-date" type="date" value={date} onChange={(event) => { setDate(event.target.value); notify(`Dashboard date changed to ${event.target.value}`) }} aria-label="Dashboard date" /><Link className="btn btn--dark" to="/admin/bookings"><Plus />New booking</Link></div></div><div className="admin-stats">{stats.map(([label, key, Icon, to], index) => { const value = key === 'users' ? state.users.length.toLocaleString() : key === 'flights' ? state.flights.length.toLocaleString() : key === 'hotels' ? state.hotels.length.toLocaleString() : key === 'bookings' ? state.bookings.length.toLocaleString() : display[key]; return <Link className="admin-stat-link" to={to} key={label}><article><div><span><Icon /></span><small>{label}</small></div><strong>{value}</strong><p><b>{index < 4 ? '+' : ''}{index < 4 ? `${index + 8}.${index + 2}%` : display.growth}</b> vs last month</p><div className={`sparkline sparkline-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article></Link> })}</div></>
}
