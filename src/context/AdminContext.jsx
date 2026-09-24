import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { adminSeed } from '../data/adminData'
import { useTravel } from './TravelContext'

const AdminContext = createContext(null)
const STORAGE_KEY = 'ttf-admin-state'

function readAdminState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return saved ? { ...adminSeed, ...saved } : adminSeed
  } catch {
    return adminSeed
  }
}

export function AdminProvider({ children }) {
  const [state, setState] = useState(readAdminState)
  const { notify } = useTravel()
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state])

  const updateCollection = useCallback((collection, updater) => {
    setState((current) => ({ ...current, [collection]: typeof updater === 'function' ? updater(current[collection] || []) : updater }))
  }, [])

  const addRecord = useCallback((collection, record) => {
    const item = { ...record, id: record.id || `${collection.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}` }
    updateCollection(collection, (items) => [item, ...items])
    notify(`${item.name || item.flightNumber || item.title || 'Record'} added successfully`)
    return item
  }, [notify, updateCollection])

  const updateRecord = useCallback((collection, id, changes) => {
    updateCollection(collection, (items) => items.map((item) => item.id === id ? { ...item, ...changes } : item))
    notify('Changes saved successfully')
  }, [notify, updateCollection])

  const deleteRecord = useCallback((collection, id) => {
    updateCollection(collection, (items) => items.filter((item) => item.id !== id))
    notify('Record deleted successfully')
  }, [notify, updateCollection])

  const markNotification = useCallback((id) => updateCollection('notifications', (items) => items.map((item) => item.id === id ? { ...item, read: true } : item)), [updateCollection])
  const markAllNotifications = useCallback(() => updateCollection('notifications', (items) => items.map((item) => ({ ...item, read: true }))), [updateCollection])
  const deleteNotification = useCallback((id) => updateCollection('notifications', (items) => items.filter((item) => item.id !== id)), [updateCollection])
  const value = useMemo(() => ({ state, addRecord, updateRecord, deleteRecord, markNotification, markAllNotifications, deleteNotification }), [state, addRecord, updateRecord, deleteRecord, markNotification, markAllNotifications, deleteNotification])
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
