import { useState } from 'react'
import { Bell, Check, Download, LockKeyhole, Save, ShieldCheck, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { useTravel } from '../context/TravelContext'

export default function AdminUtilityPage({ resource }) {
  if (resource === 'notifications') return <Notifications />
  if (resource === 'settings') return <Settings />
  if (resource === 'profile') return <Profile />
  return <Reports />
}

function PageTitle({ eyebrow, title, text, action }) { return <div className="admin-page-head"><div><span className="eyebrow"><i />{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{action}</div> }

function Notifications() {
  const { state, markNotification, markAllNotifications, deleteNotification } = useAdmin()
  return <div className="admin-content admin-utility-page"><PageTitle eyebrow="Live operations" title="Notifications" text="Review operational events and keep your team in the loop." action={<button className="btn btn--outline" onClick={markAllNotifications}><Check />Mark all read</button>} /><div className="admin-card admin-notification-list">{state.notifications.length ? state.notifications.map((item) => <div className={`admin-notification-row ${item.read ? 'is-read' : ''}`} key={item.id}><span className="admin-notification-dot" /><div><strong>{item.title}</strong><p>{item.text}</p><small>{item.time} · {item.type}</small></div><div className="admin-row-actions"><button onClick={() => markNotification(item.id)} aria-label={`Mark ${item.title} read`}><Check size={15} /></button><button className="is-danger" onClick={() => deleteNotification(item.id)} aria-label={`Delete ${item.title}`}><X size={15} /></button></div></div>) : <div className="admin-empty"><Bell size={28} /><h2>No notifications are waiting.</h2><p>New operational events will appear here.</p></div>}</div></div>}

function Settings() {
  const { notify } = useTravel()
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({ alerts: true, digest: true, twoFactor: true, compact: false })
  const toggle = (key) => { setSaved(false); setSettings((current) => ({ ...current, [key]: !current[key] })) }
  const save = () => { setSaved(true); notify('Admin settings saved successfully') }
  const rows = [['alerts', 'Operational alerts', 'Receive alerts for delays, incidents, and service changes.'], ['digest', 'Daily digest', 'Receive a morning summary of your operations.'], ['twoFactor', 'Security prompts', 'Ask for confirmation before sensitive account actions.'], ['compact', 'Compact tables', 'Show more rows in management tables.']]
  return <div className="admin-content admin-utility-page"><PageTitle eyebrow="Workspace controls" title="Settings" text="Configure your operations workspace and notification preferences." action={<button className="btn btn--dark" onClick={save}><Save size={15} />{saved ? 'Saved' : 'Save settings'}</button>} /><div className="admin-settings-grid"><section className="admin-card admin-settings-card"><h2>Workspace preferences</h2><p>These settings apply to your administrator workspace.</p>{rows.map(([key, title, text]) => <label className="admin-setting-row" key={key}><span><strong>{title}</strong><small>{text}</small></span><input type="checkbox" checked={settings[key]} onChange={() => toggle(key)} /><i /></label>)}</section><section className="admin-card admin-settings-card"><h2>Security</h2><p>Protect access to TIME TO FLY operations.</p><div className="admin-security-card"><ShieldCheck /><div><strong>Two-factor authentication</strong><p>{settings.twoFactor ? 'Enabled for this administrator account.' : 'Not enabled for this account.'}</p></div><button className="btn btn--outline" onClick={() => toggle('twoFactor')}>{settings.twoFactor ? 'Disable' : 'Enable'}</button></div><div className="admin-security-card"><LockKeyhole /><div><strong>Password & sessions</strong><p>Last password change was 34 days ago.</p></div><button className="btn btn--outline" onClick={() => notify('Password reset link sent to your admin email')}>Reset password</button></div></section></div></div>
}

function Profile() {
  const { notify } = useTravel()
  const [form, setForm] = useState({ name: 'Alex Morgan', email: 'alex.morgan@time-to-fly.com', role: 'Administrator' })
  const save = (event) => { event.preventDefault(); notify('Profile changes saved successfully') }
  return <div className="admin-content admin-utility-page"><PageTitle eyebrow="Administrator account" title="Profile" text="Keep your operator identity and contact details current." /><form className="admin-card admin-profile-form" onSubmit={save}><div className="admin-profile-avatar">AM</div><div className="admin-form-grid"><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label>Role<input value={form.role} readOnly /></label></div><div className="admin-modal__foot"><Link className="btn btn--outline" to="/admin/dashboard">Back to overview</Link><button className="btn btn--dark" type="submit"><Save size={15} />Save profile</button></div></form></div>
}

function Reports() {
  const { state } = useAdmin()
  const { notify } = useTravel()
  const download = (name, data) => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${name}.json`; link.click(); URL.revokeObjectURL(url); notify(`${name} report downloaded`) }
  const reports = [['Operations snapshot', { users: state.users.length, flights: state.flights.length, bookings: state.bookings.length, hotels: state.hotels.length }], ['Revenue summary', { period: 'Last 30 days', revenue: 6240000, change: 16.8 }], ['Service health', state.services]]
  return <div className="admin-content admin-utility-page"><PageTitle eyebrow="Insights" title="Reports" text="Download the latest operational summaries for your team." /><div className="admin-report-grid">{reports.map(([name, data]) => <article className="admin-card" key={name}><span className="micro-label">TIME TO FLY / {name}</span><h2>{name}</h2><p>Generated from the current operations workspace.</p><button className="btn btn--outline" onClick={() => download(name.toLowerCase().replaceAll(' ', '-'), data)}><Download size={15} />Download JSON</button></article>)}</div></div>
}

