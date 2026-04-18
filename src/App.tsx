import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import BuyNFT from './pages/BuyNFT'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import NFTDetail from './pages/NFTDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="buy" element={<BuyNFT />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="nft/:id" element={<NFTDetail />} />
      </Route>
    </Routes>
  )
}
