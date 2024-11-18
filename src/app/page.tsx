import React from "react";
import Navbar from "@/src/app/components/Navbar";
import HeroSection from "@/src/app/components/HeroSection";
import Categories from "@/src/app/components/Categories";
import ShopFeatures from "@/src/app/components/ShopFeatures";
import Footer from "@/src/app/components/Footer";

const HomePage: React.FC = () => (
  <div>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <Categories></Categories>
    <ShopFeatures></ShopFeatures>
    <Footer></Footer>
  </div>
);

export default HomePage;
