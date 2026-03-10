import Navbar from '../_components/Navbar'
import BookingSection from '../_components/BookingSection'

export default function BookingPage() {
  return (
    <main className="bg-champagne min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <BookingSection />
      </div>
    </main>
  )
}
