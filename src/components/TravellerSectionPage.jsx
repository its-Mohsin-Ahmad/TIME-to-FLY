import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, CreditCard, Download, FileText, Plane, Plus, Settings, ShieldCheck, Ticket, Wallet, X } from 'lucide-react'
import { useTravel } from '../context/TravelContext'

const meta = {
  bookings: ['Your travel history', 'Bookings', 'Every reservation, ticket and payment in one calm view.'],
  wallet: ['Travel wallet', 'Your wallet', 'Track points, credits and payments across your journeys.'],
  notifications: ['Stay in the loop', 'Notifications', 'Flight updates, booking confirmations and trip reminders.'],
  documents: ['Travel ready', 'Travel documents', 'Keep your tickets and essential travel details together.'],
  settings: ['Your preferences', 'Settings', 'Control your traveller profile, alerts and account preferences.'],
}

export default function TravellerSectionPage({ section }) {
  if (section === 'wallet') return <WalletPage />
  if (section === 'notifications') return <NotificationsPage />
  if (section === 'documents') return <DocumentsPage />
  if (section === 'settings') return <SettingsPage />
  return <BookingsPage />
}

function Head({ section, action }) {
  const [eyebrow, title, text] = meta[section] || meta.bookings
  return <div className="traveller-page-head"><div><span className="eyebrow"><i />{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{action}</div>
}

function BookingsPage() {
  const { bookings } = useTravel()
  const items = bookings.length ? bookings : [{ id: 'TTF-8K2LP', type: 'Flight', title: 'JFK → DPS', date: 'Oct 12, 2026', total: 1428, status: 'Confirmed' }, { id: 'TTF-3M7QA', type: 'Hotel', title: 'Solei Resort, Bali', date: 'Oct 12–19, 2026', total: 1560, status: 'Confirmed' }]
  return <div className="traveller-page"><Head section="bookings" action={<Link className="btn btn--dark" to="/trips"><Plus />Plan a trip</Link>} /><div className="traveller-booking-grid">{items.map((item) => <article className="traveller-section-card" key={item.id}><span className="traveller-card-icon">{item.type === 'Flight' ? <Plane /> : <FileText />}</span><div><small>{item.type} · {item.id}</small><h2>{item.title}</h2><p>{item.date}</p></div><strong>${(item.total || 820).toLocaleString()}</strong><span className="status-chip">{item.status || 'Confirmed'}</span><div className="traveller-card-actions"><Link to={item.type === 'Flight' ? `/ticket/${item.id}` : '/trips'}><Ticket />View</Link><button onClick={() => window.print()}><Download />Download</button></div></article>)}</div></div>
}


function WalletPage() {
  const { notify } = useTravel()
  const [coupon, setCoupon] = useState('')
  return <div className="traveller-page"><Head section="wallet" action={<button className="btn btn--outline" onClick={() => notify('Wallet statement prepared')}><Download />Statement</button>} /><div className="traveller-wallet-grid"><article className="traveller-balance-card"><span>Available travel credit</span><strong>$420.00</strong><small>Next statement · Oct 31, 2026</small><button className="btn btn--aqua" onClick={() => notify('Add funds flow opened')}>Add funds</button></article><article className="traveller-section-card"><Wallet /><div><small>Reward points</small><h2>2,480 points</h2><p>320 points until your next reward</p></div></article><article className="traveller-section-card"><CreditCard /><div><small>Payment method</small><h2>•••• 4242</h2><p>Expires 10/29</p></div></article></div><div className="traveller-coupon"><div><span className="micro-label">Have a promo code?</span><h2>Make the next journey better.</h2></div><div><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Enter code" /><button onClick={() => notify(coupon ? `${coupon.toUpperCase()} is ready to apply` : 'Enter a promo code first')}>Apply code</button></div></div></div>
}

function NotificationsPage() {
  const [items, setItems] = useState([['Your Bali check-in is open', '12 min ago'], ['Solei Resort booking confirmed', '2 hr ago'], ['Your Tokyo trip starts in 18 days', '1 day ago']])
  return <div className="traveller-page"><Head section="notifications" action={<button className="btn btn--outline" onClick={() => setItems([])}><Check />Mark all read</button>} /><div className="traveller-notification-list">{items.length ? items.map(([title, time]) => <article key={title}><span><Bell /></span><div><strong>{title}</strong><small>{time}</small></div><button onClick={() => setItems((all) => all.filter(([item]) => item !== title))} aria-label={`Dismiss ${title}`}><X /></button></article>) : <div className="traveller-empty"><Bell /><h2>You’re all caught up.</h2><p>New travel updates will appear here.</p></div>}</div></div>
}

function DocumentsPage() {
  const { notify } = useTravel()
  const documents = [['Flight ticket', 'TTF-8K2LP · JFK → DPS', 'Boarding pass · Oct 12, 2026', <Ticket />], ['Travel insurance', 'Global Voyager policy', 'Valid through Dec 31, 2026', <ShieldCheck />], ['Passport copy', 'Alex Morgan', 'Expires Aug 14, 2031', <Plane />]]
  return <div className="traveller-page"><Head section="documents" action={<button className="btn btn--dark" onClick={() => notify('Document upload opened')}><Plus />Add document</button>} /><div className="traveller-document-grid">{documents.map(([label, title, text, icon]) => <article key={label}>{icon}<div><small>{label}</small><strong>{title}</strong><span>{text}</span></div><button onClick={() => notify(`${label} opened`)}><FileText /></button></article>)}</div></div>
}

function SettingsPage() {
  const { notify } = useTravel()
  const [settings, setSettings] = useState({ alerts: true, digest: true, compact: false })
  const toggle = (key) => setSettings((current) => ({ ...current, [key]: !current[key] }))
  return <div className="traveller-page"><Head section="settings" action={<button className="btn btn--dark" onClick={() => notify('Traveller settings saved')}><Settings />Save settings</button>} /><div className="traveller-settings-grid"><section className="traveller-section-card"><h2>Travel preferences</h2>{[['alerts', 'Travel alerts', 'Receive flight and hotel updates.'], ['digest', 'Weekly digest', 'A summary of your journeys every Monday.'], ['compact', 'Compact lists', 'Fit more bookings into list views.']].map(([key, title, text]) => <label className="traveller-setting-row" key={key}><span><strong>{title}</strong><small>{text}</small></span><input type="checkbox" checked={settings[key]} onChange={() => toggle(key)} /><i /></label>)}</section><section className="traveller-section-card"><Settings /><h2>Account support</h2><p>Our travel support team is available around the clock.</p><Link className="btn btn--outline" to="/support">Contact support</Link></section></div></div>
}
