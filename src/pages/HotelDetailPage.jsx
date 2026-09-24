import { useState } from 'react'
import { ArrowRight, BedDouble, Check, ChevronLeft, ChevronRight, Heart, Map, MapPin, ShieldCheck, Star, Users, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { hotels } from '../data/travel'
import { useTravel } from '../context/TravelContext'
import { EmptyState } from '../components/PageChrome'
import HotelDetails from '../components/HotelDetails'

const rooms = [
  { name: 'Caldera King Room', bed: '1 king bed', guests: 2, size: '32 m²', breakfast: true, cancellation: 'Free cancellation until Oct 9', price: 420, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Sea View Suite', bed: '1 king bed', guests: 3, size: '48 m²', breakfast: true, cancellation: 'Free cancellation until Oct 9', price: 680, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Private Horizon Villa', bed: '1 king + sofa bed', guests: 4, size: '76 m²', breakfast: true, cancellation: 'Non-refundable · save 12%', price: 1040, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85' },
]

export default function HotelDetailPage() {
  const { id } = useParams()
  const hotel = hotels.find((item) => item.id === +id) || hotels[0]
  const { saved, toggleSave, addBooking, notify } = useTravel()
  const [gallery, setGallery] = useState(false)
  const [room, setRoom] = useState(rooms[0])
  const [booked, setBooked] = useState(false)
  const reserve = () => { addBooking({ type: 'Hotel', title: room.name, detail: hotel.name, date: 'Oct 12–19, 2026', status: 'Confirmed', total: room.price * 7 }); setBooked(true); notify('Your stay is confirmed') }
  return <main id="main-content"><HotelHeader hotel={hotel} saved={saved.includes(hotel.id)} toggleSave={toggleSave} openGallery={() => setGallery(true)} /><section className="hotel-detail-layout container"><HotelDetails hotel={hotel} room={room} setRoom={setRoom} /><aside className="hotel-booking-card"><div className="hotel-booking-card__rating"><span>Exceptional</span><strong><Star fill="currentColor" /> {hotel.rating}</strong><small>1,284 verified reviews</small></div><div className="hotel-price"><span>7 nights, 2 guests</span><p><strong>${(room.price * 7).toLocaleString()}</strong> <small>${room.price} / night</small></p></div><div className="hotel-date-fields"><label>Check-in<input type="date" defaultValue="2026-10-12" /></label><label>Check-out<input type="date" defaultValue="2026-10-19" /></label></div><button className="btn btn--aqua" onClick={reserve}>{booked ? 'Reservation added ✓' : 'Reserve this room'} <ArrowRight size={16} /></button><p className="no-charge"><ShieldCheck />You won’t be charged yet</p><div className="booking-perks"><p><Check /><span><strong>Free cancellation</strong><small>Until October 9</small></span></p><p><Check /><span><strong>Breakfast included</strong><small>For all guests</small></span></p><p><Check /><span><strong>Pay at property</strong><small>Secure payment options</small></span></p></div><hr /><p className="booking-help">Questions? <Link to="/support">Talk to our travel team</Link></p></aside></section>{gallery && <GalleryModal hotel={hotel} close={() => setGallery(false)} />}</main>
}

function HotelHeader({ hotel, saved, toggleSave, openGallery }) {
  return <><section className="hotel-gallery"><div className="hotel-gallery__main"><img src={hotel.image} alt={hotel.name} /></div><div><img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85" alt={`${hotel.name} room`} /><img src="https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85" alt={`${hotel.name} pool`} /><button onClick={openGallery}>View all photos <ChevronRight size={16} /></button></div></section><section className="hotel-title-bar container"><div><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/hotels">Hotels</Link><span>/</span><b>{hotel.name}</b></div><h1>{hotel.name}</h1><p><MapPin size={15} />{hotel.location} · Excellent location</p></div><div><span className="rating-badge"><Star size={13} fill="currentColor" />{hotel.rating} <small>1,284 reviews</small></span><button className={`btn btn--outline ${saved ? 'is-saved' : ''}`} onClick={() => toggleSave(hotel.id)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} />Save</button></div></section></>
}

function GalleryModal({ hotel, close }) { return <div className="gallery-modal" role="dialog" aria-modal="true"><button className="icon-button" onClick={close} aria-label="Close gallery"><X /></button><button className="gallery-arrow gallery-arrow--left" aria-label="Previous image"><ChevronLeft /></button><img src={hotel.image} alt={`${hotel.name} gallery`} /><button className="gallery-arrow gallery-arrow--right" aria-label="Next image"><ChevronRight /></button><span>1 / 24</span></div> }
