import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroBanner from "../components/HeroBanner"
import NewBannerProducts from "../components/NewBannerProducts"

function HomePage() {
  return (
    <div>
        <Header/>
        <HeroBanner />
        <NewBannerProducts/>
        <Footer/>
    </div>
  )
}

export default HomePage