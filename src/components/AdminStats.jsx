import { CalendarDays, CircleDollarSign, Plane, Plus, Ticket, TrendingUp, Users } from 'lucide-react'
import { dashboardStats } from '../data/catalog'
import { useTravel } from '../context/TravelContext'

const icons = { users: Users, ticket: Ticket, plane: Plane, hotel: CalendarDays, package: CircleDollarSign, wallet: TrendingUp }

export default function AdminStats() {
  const { notify } = useTravel()
  return <><div className="admin-welcome"><div><span>Operations overview</span><h1>Good morning, Alex.</h1><p>Here’s what’s happening across TIME TO FLY today.</p></div><div><button className="btn btn--outline"><CalendarDays />Sep 23, 2026</button><button className="btn btn--dark" onClick={() => notify('New booking flow opened')}><Plus />New booking</button></div></div><div className="admin-stats">{dashboardStats.map((item, index) => { const Icon = icons[item.icon]; return <article key={item.label}><div><span><Icon /></span><small>{item.label}</small></div><strong>{item.value}</strong><p><b>{item.change}</b> vs last month</p><div className={`sparkline sparkline-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article> })}</div></>
}
