import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Calculations from './pages/Calculations'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hizmetler" element={<Services />} />
        <Route path="kurumsal" element={<About />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="hesaplamalar" element={<Calculations />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
