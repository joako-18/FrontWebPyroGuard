import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import TechStack from './components/TechStack'
import Users from './components/Users'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import './index.css'
import DeleteData from './components/DeleteData'

function Home() {
  return (
    <div className="app">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Users />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/eliminar-datos" element={<DeleteData />} />
      </Routes>
    </BrowserRouter>
  )
}