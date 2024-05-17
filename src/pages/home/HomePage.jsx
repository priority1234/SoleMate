import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

const HomePage = () => {
    return (
        <Layout>
            <Category/>
            <HeroSection/>
            <ProductCard/>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;
