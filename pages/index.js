// app/page.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Steps from '../components/landing/Steps';
import CallToAction from '../components/landing/CallToAction';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}