import WatchIntro from "@/Component/Features/WatchIntro";
import {AppIntro}  from "@/Component/Features/AppIntro";
import ShoppingList from "@/Component/Features/ShoppingList";
import Footer from "@/Component/Footer";

const Product = () => {
    console.log("Product page loaded");
    return (
        <div className="h-auto w-screen flex flex-col bg-var(--secondary)">
            <WatchIntro/>
            <AppIntro/>
            <ShoppingList/>
            <Footer/>
        </div>
    );
};

export default Product;