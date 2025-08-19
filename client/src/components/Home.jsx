
import Hero from "./Hero";
import FloatingIcon from "./FloatingIcon";




export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-dark">
      {/* Floating & clickable icons */}
        <FloatingIcon/>

      {/* Hero content */}
      <Hero/>


      
    </div>
  );
}
