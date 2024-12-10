import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/home/home";
import Cursos from "./pages/administrador/administrador";
import Curso from "./pages/superadmin/superadmin";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Registersuper from "./pages/registeradmin/register";
import Formulario from "./pages/formulario/formulario";
import Reporte from "./pages/reporte/reporte";
import EPS from "./pages/EPS/eps";
import Conductor from "./pages/conductor/conductor";
import BienvenidoConductor from "./pages/homeconductor/homeconductor"; // Para el conductor
import VistaParamedico from "./pages/homeparamedico/homeparamedico"; // Nueva ruta para el paramédico
import VistaEnfermero from "./pages/enfermero/enfermero";  // Nueva ruta para el enfermero
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superadmin" element={<Curso />} />
          <Route path="/administrador" element={<Cursos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registeradmin" element={<Registersuper />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/reporte" element={<Reporte />} />
          <Route path="/eps" element={<EPS />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/homeconductor" element={<BienvenidoConductor />} />
          <Route path="/homeparamedico" element={<VistaParamedico />} /> {/* Nueva ruta para paramédico */}
          <Route path="/enfermero" element={<VistaEnfermero />} /> {/* Nueva ruta para enfermero */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
