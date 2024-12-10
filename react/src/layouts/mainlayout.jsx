import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer"; // Asegúrate de que la ruta sea correcta

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer /> {/* Footer agregado aquí */}
    </div>
  );
};

export default MainLayout;
