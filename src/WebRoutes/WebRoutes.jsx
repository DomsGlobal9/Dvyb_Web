import { Routes , Route} from "react-router-dom";

import TryOnCart from "../B2BBulkOrders/Pages/TryonCard/TryOnCart";
import TryOnPreview from "../B2BBulkOrders/Pages/TryOnPreview/TryOnPreview";
import HomePages from "../B2BBulkOrders/Pages/HomePages/HomePages";
import LoginPage from "../B2BBulkOrders/Pages/AuthPage/LoginPage";
import ResetPasswordRequest from "../B2BBulkOrders/Pages/AuthPage/ResetPasswordRequest";
import ResetPasswordConfirm from "../B2BBulkOrders/Pages/AuthPage/ResetPasswordConfirm";
import TryYourOutfit from "../B2BBulkOrders/Pages/TryYourOutfit/2DTryOn/TryYourOutfit";
import UploadSelfie from "../B2BBulkOrders/Components/TryYourOutfit/UploadSelfie";
import B2BBulkOdersProductsPage from "../B2BBulkOrders/Pages/Products/B2BBulkOrdersProductsPage";
import AboutPage from "../../CommonPages/AboutPage";
import FAQPage from "../../CommonPages/FAQPage";





const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/B2BBulkOrders-login" element={<LoginPage/>} />
            <Route path="/reset-password" element={<ResetPasswordRequest />} />
            <Route path="/reset-password/confirm" element={<ResetPasswordConfirm />} />
            <Route path="/B2BBulkOrders-home" element={<HomePages/>} />
            <Route path="/" element = {<HomePages/>}/>
            <Route path="/TryOnCart" element = {<TryOnCart />}/>
            <Route path="/TryYourOutfit" element = {<TryYourOutfit />}/>
            <Route path="/upload-selfie" element = {<UploadSelfie />}/>
            <Route path="/preview" element = {<TryOnPreview/>}/>

            <Route path="/upload-selfie" element = {<UploadSelfie/>}/>
            <Route path="/preview" element = {<TryOnPreview/>}/>
            <Route path="/products" element = {<B2BBulkOdersProductsPage/>}/>

            {/* common pagges */}
            <Route path="/aboutUs" element = {<AboutPage/>}/>
            <Route path="/faq" element = {<FAQPage/>}/>
    
          {/* <Route path="/orders" element={<Orders />} /> */}
            

            

       

        </Routes>
    )
}

// FASHN_API_KEY=fa-jCmx621bg3ye-0kZFcMHh0PgG3YWC38Pl2zbl   


export default WebRoutes;