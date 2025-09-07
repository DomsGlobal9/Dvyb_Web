import HeroComponent from "../../Components/LandingComponents/Sec01HeroComponent"
import NewCollectionPage from "../../Components/LandingComponents/Sec02NewCollection"
import FashionCategories from "../../Components/LandingComponents/sec03CategoriesSection"
import TopPicks from "../../Components/LandingComponents/sec04TopPicks"
import OffersZone from "../../Components/LandingComponents/sec06OfferSection"



const LandingPage = () => {
    return (
        <>
        <HeroComponent/>
        <NewCollectionPage/>
        <FashionCategories/>
        <TopPicks/>
        <OffersZone/>
        
        </>
    )
}

export default LandingPage