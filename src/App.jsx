import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Pitchd from '@/pages/Pitchd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pitchd />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
