import Features from "../components/Wordpress/Features";
import Footer from "../components/Wordpress/Footer";
import Hero from "../components/Wordpress/Hero";
import Method from "../components/Wordpress/Method";
import Navbar from "../components/Wordpress/Navbar";
import Pricing from "../components/Wordpress/Pricing";
import Sponsors from "../components/Wordpress/Sponsors";
import Testimonial from "../components/Wordpress/Testimonial";

function Wordpress() {
  return (
    <div id="top">
      <Navbar />
      <Hero />
      <Features />
      <Method />
      <Testimonial />
      <Pricing />
      <Sponsors />
      <Footer />
    </div>
  );
}

export default Wordpress;
