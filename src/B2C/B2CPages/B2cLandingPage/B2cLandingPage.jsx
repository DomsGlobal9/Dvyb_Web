
import HeroComponent from "../../../common/LandingComponents/Sec01HeroComponent"
import NewCollectionPage from "../../../common/LandingComponents/Sec02NewCollection"
import FashionCategories from "../../../common/LandingComponents/sec03CategoriesSection"
import TopPicks from "../../../common/LandingComponents/sec04TopPicks"
import OffersZone from "../../../common/LandingComponents/sec05OfferSection"
import ImpactStories from "../../../common/LandingComponents/sec06ImpactStories"
import FAQSection from "../../B2CComponents/FAQSection"




const B2cLandingPage = () => {
    return (
        <>
        <HeroComponent/>
        <NewCollectionPage/>
        <FashionCategories/>
        <TopPicks/>
        <OffersZone/>
        <FAQSection />
        <ImpactStories/>
        
        </>
    )
}

export default B2cLandingPage