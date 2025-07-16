import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Movimientos } from "@/pages/Movimientos";
import { Cuentas } from "@/pages/Cuentas";
import { Transferencias } from "@/pages/Transferencias";
import { Menu } from "@/components/Menu/Menu";
import { Header } from '@/components/Header/Header';
import { Layout } from '@/components/Layout/Layout';

export const AppRouter = () => {
  return (

    <Router>
        <Header />
        <Menu/>
            <Layout>
                <Routes>
                    <Route path="/movimientos" element={<Movimientos />} />
                    <Route path="/cuentas" element={<Cuentas />} />
                    <Route path="/transferencias" element={<Transferencias />} />
                </Routes>
            </Layout>
      </Router>
  );
};
