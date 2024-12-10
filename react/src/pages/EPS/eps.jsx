import React from "react";
import "./eps.css"; // Asegúrate de tener los estilos importados en el archivo correcto
import compensarImg from '../../assets/images/Compensar.png'; // Importa las imágenes
import suraImg from '../../assets/images/sura.png'; // Importa las imágenes
import cafamImg from '../../assets/images/Cafam.png'; // Importa las imágenes

const Home = () => {
  return (
    <div>
      {/* Sección Compensar */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Compensar EPS</h1>
              <p>Compensar uno de nuestros aliados</p>
              <p>
                Compensar, una entidad de salud líder en el mercado, se distingue como una de las EPS aliadas de
                confianza que ofrece una amplia gama de servicios y beneficios para el cuidado integral de la salud
                y el bienestar de sus afiliados.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={compensarImg} alt="Compensar EPS" className="img-fluid" width="400" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sura */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Sura EPS</h1>
              <p>Sura una de las mejores EPS del país</p>
              <p>
                SURA, una entidad destacada en el ámbito de la salud, se posiciona como una de las EPS colaboradoras
                más reconocidas. Renombrada por su calidad en la atención médica y su amplia cobertura nacional.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={suraImg} alt="Sura EPS" className="img-fluid" width="400" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cafam */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Cafam EPS</h1>
              <p>Cafam uno de nuestros mejores aliados</p>
              <p>
                Cafam, una institución de renombre en el sector de la salud, se destaca como una de las EPS aliadas
                más reconocidas. Conocida por su excelencia en la atención médica y su amplia cobertura a nivel
                nacional.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={cafamImg} alt="Cafam EPS" className="img-fluid" width="400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
