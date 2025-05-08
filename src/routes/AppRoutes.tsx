import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import Compras from '../pages/Buy/Buy';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
