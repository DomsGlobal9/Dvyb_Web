
import VideoSection from "../../B2CComponents/LandingPageComponents/Sec01vedio"
import FashionTryOnSection from "../../B2CComponents/LandingPageComponents/Sec02FashionTryOn"
import PrecisionTryOnSection from "../../B2CComponents/LandingPageComponents/Sec03PrecisionTryOnWorks"
import TechnologySection04 from "../../B2CComponents/LandingPageComponents/Sec04Technology"
import PremiumSection05 from "../../B2CComponents/LandingPageComponents/Sec05Premium"
import ClientTestimonials from "../../B2CComponents/LandingPageComponents/Sec09ClientTestimonials"
import FashionBrandsSection from "../../B2CComponents/LandingPageComponents/Sec10FashionBrands"
import CuratedCollectionSection6 from "../../B2CComponents/LandingPageComponents/Sec6CuratedCollection"
import YourPersonlizedSection7 from "../../B2CComponents/LandingPageComponents/Sec7YourPersonlized"
import VirtualTryonSection8 from "../../B2CComponents/LandingPageComponents/Sec8VirtualTryon"






const B2cLandingPage = () => {
  return (
    <>
      <VideoSection />
      {/* <FashionTryOnSection/> */}
      
      {/* <TechnologySection04 /> */}
      <PremiumSection05 />
      <CuratedCollectionSection6 />
      <PrecisionTryOnSection/>
      {/* <YourPersonlizedSection7 /> */}
      <VirtualTryonSection8 />
      <ClientTestimonials />
      {/* <FashionBrandsSection /> */}

    </>
  )
}

export default B2cLandingPage