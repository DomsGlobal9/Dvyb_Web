import { Routes , Route} from "react-router-dom";

import TryYourOutfit from "../B2C/Pages/TryYourOutfit/2DTryOn/TryYourOutfit";
import UploadSelfie from "../B2C/Components/TryYourOutfit/UploadSelfie";
import TryOnCart from "../B2C/Pages/TryonCard/TryOnCart";
import TryOnPreview from "../B2C/Pages/TryOnPreview/TryOnPreview";
<<<<<<< HEAD
=======
import HomePages from "../B2C/Pages/HomePages/HomePages";
import LoginPage from "../B2C/Pages/AuthPage/LoginPage";
import B2CSignUpPage from "../B2C/Pages/AuthPage/SignUpForm";
>>>>>>> be66b88 (added)




const WebRoutes = () => {
    return (
        <Routes>


            <Route path="/login" element={<LoginPage/>} />
            <Route path="/SignUp-form" element={<B2CSignUpPage/>} />
            <Route path="/home" element={<HomePages/>} />
            <Route path="/" element = {<TryOnCart />}/>
            <Route path="/TryOnCart" element = {<TryOnCart />}/>
            <Route path="/TryYourOutfit" element = {<TryYourOutfit />}/>
            <Route path="/upload-selfie" element = {<UploadSelfie/>}/>
            <Route path="/preview" element = {<TryOnPreview/>}/>
       

        </Routes>
    )
}

// FASHN_API_KEY=fa-jCmx621bg3ye-0kZFcMHh0PgG3YWC38Pl2zbl   


export default WebRoutes;