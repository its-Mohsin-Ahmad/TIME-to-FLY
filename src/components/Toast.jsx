import { CheckCircle2 } from 'lucide-react'
import { useTravel } from '../context/TravelContext'

export default function Toast() {
  const { toast } = useTravel()
  if (!toast) return null
  return <div className={`toast toast--${toast.type}`} role="status"><CheckCircle2 size={19} /><span>{toast.message}</span></div>
}
