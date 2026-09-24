import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const TravelContext = createContext(null)

const initialSaved = JSON.parse(localStorage.getItem('ttf-saved') || '[]')
const initialBookings = JSON.parse(localStorage.getItem('ttf-bookings') || '[]')

export function TravelProvider({ children }) {
  const [saved, setSaved] = useState(initialSaved)
  const [bookings, setBookings] = useState(initialBookings)
  const [toast, setToast] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => localStorage.setItem('ttf-saved', JSON.stringify(saved)), [saved])
  useEffect(() => localStorage.setItem('ttf-bookings', JSON.stringify(bookings)), [bookings])

  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const toggleSave = useCallback((id) => {
    setSaved((items) => {
      const exists = items.includes(id)
      notify(exists ? 'Removed from your travel list' : 'Saved to your travel list')
      return exists ? items.filter((item) => item !== id) : [...items, id]
    })
  }, [notify])

  const addBooking = useCallback((booking) => {
    const item = { id: `TTF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, createdAt: new Date().toISOString(), ...booking }
    setBookings((items) => [item, ...items])
    notify('Booking confirmed and added to My Trips')
    return item
  }, [notify])

  const value = useMemo(() => ({
    saved, bookings, toast, searchOpen, assistantOpen,
    setSearchOpen, setAssistantOpen, toggleSave, addBooking, notify,
  }), [saved, bookings, toast, searchOpen, assistantOpen, toggleSave, addBooking, notify])

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>
}

export function useTravel() {
  const context = useContext(TravelContext)
  if (!context) throw new Error('useTravel must be used within TravelProvider')
  return context
}
