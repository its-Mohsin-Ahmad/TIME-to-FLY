import { useLocation } from 'react-router-dom'
import TravellerShell from '../components/TravellerShell'
import DashboardOverview from '../components/DashboardOverview'
import TravellerSectionPage from '../components/TravellerSectionPage'

export default function DashboardPage() {
  const path = useLocation().pathname
  const section = path.split('/')[2]
  return <TravellerShell>{section ? <TravellerSectionPage section={section} /> : <DashboardOverview />}</TravellerShell>
}