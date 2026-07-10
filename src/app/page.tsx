
import BambooHero from "./Components/Hero";
import BestSellers from "./Components/BestSeller";
import FeaturedProducts from "./Components/Product.";
import WhyChooseUs from "./Components/WhyChoose";
import BlogSection from "./Components/Blog";
import FAQSection from "./Components/Faq";
// import Footer from "./Components/Footer";

export default function Home() {
  return (
   <>
   <BambooHero/>
   <FeaturedProducts/>
   <BestSellers/>
   <WhyChooseUs/>
   <BlogSection/>
   <FAQSection/>
  
   </>
  );
}
