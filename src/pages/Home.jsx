import ServiceStrip from '../components/ServiceStrip'
import HomePage from './HomePage'
import CommerceSections from './CommerceSections'
import PlannerPromo from './PlannerPromo'
import EditorialSections from './EditorialSections'

export default function Home() {
  return <main id="main-content"><HomePage /><ServiceStrip /><CommerceSections /><PlannerPromo /><EditorialSections /></main>
}
