import { Bell, CalendarDays, CreditCard, FileText, Heart, LayoutDashboard, Luggage, MessageSquare, Plane, Settings, ShieldCheck, Ticket, Wallet } from 'lucide-react'

export const travellerNav = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'My trips', to: '/trips', icon: Luggage },
  { label: 'My flights', to: '/flights', icon: Plane, end: true },
  { label: 'My hotels', to: '/hotels', icon: CalendarDays, end: true },
  { label: 'My tickets', to: '/ticket/TTF-A1B2C3', icon: Ticket },
  { label: 'Bookings', to: '/dashboard/bookings', icon: FileText },
  { label: 'Wishlist', to: '/destinations', icon: Heart, end: true },
  { label: 'Travel wallet', to: '/dashboard/wallet', icon: Wallet },
  { label: 'Payments', to: '/checkout', icon: CreditCard, end: true },
  { label: 'Notifications', to: '/dashboard/notifications', icon: Bell, badge: 3 },
  { label: 'Messages', to: '/support', icon: MessageSquare, end: true },
  { label: 'Travel documents', to: '/dashboard/documents', icon: ShieldCheck },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
]
