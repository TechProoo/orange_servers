import "./App.css";
import Features from "./components/landing/Features";
import Hero from "./components/landing/Hero";
import Method from "./components/landing/Method";
import Pricing from "./components/landing/Pricing";
import Sponsors from "./components/landing/Sponsors";
import Testimonial from "./components/landing/Testimonial";
import Footer from "./components/landing/Footer";
import Navbar from "./components/landing/Navbar";

function App() {
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

export default App;
