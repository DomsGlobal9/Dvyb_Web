import { Routes , Route} from "react-router-dom";

import TryYourOutfit from "../B2C/Pages/TryYourOutfit/2DTryOn/TryYourOutfit";
import UploadSelfie from "../B2C/Components/TryYourOutfit/UploadSelfie";
import TryOnCart from "../B2C/Pages/TryonCard/TryOnCart";
import TryOnPreview from "../B2C/Pages/TryOnPreview/TryOnPreview";

import HomePages from "../B2C/Pages/HomePages/HomePages";
import LoginPage from "../B2C/Pages/AuthPage/LoginPage";
import B2CProductsPage from "../B2C/Pages/Products/B2CProductsPage";
import ResetPasswordRequest from "../B2C/Pages/AuthPage/ResetPasswordRequest";
import ResetPasswordConfirm from "../B2C/Pages/AuthPage/ResetPasswordConfirm";





const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/b2b-login" element={<LoginPage/>} />
            <Route path="/reset-password" element={<ResetPasswordRequest />} />
            <Route path="/reset-password/confirm" element={<ResetPasswordConfirm />} />
            <Route path="/b2b-home" element={<HomePages/>} />
            <Route path="/" element = {<HomePages/>}/>
            <Route path="/TryOnCart" element = {<TryOnCart />}/>
            <Route path="/TryYourOutfit" element = {<TryYourOutfit />}/>
            <Route path="/upload-selfie" element = {<UploadSelfie/>}/>
            <Route path="/preview" element = {<TryOnPreview/>}/>

            <Route path="/upload-selfie" element = {<UploadSelfie/>}/>
            <Route path="/preview" element = {<TryOnPreview/>}/>
            <Route path="/products" element = {<B2CProductsPage/>}/>

    
          {/* <Route path="/orders" element={<Orders />} /> */}
            

            

       

        </Routes>
    )
}

// FASHN_API_KEY=fa-jCmx621bg3ye-0kZFcMHh0PgG3YWC38Pl2zbl   


export default WebRoutes;