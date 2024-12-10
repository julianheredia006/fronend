import React from 'react';
import './conductor.css';

const App = () => {
  return (
    <div>
      {/* Sección principal */}
      <div className="rectangulo">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h1>Aquí puedes ver las mejores rutas para tu recorrido</h1>
            </div>
            <div className="col-md-12 my-3">
              <div className="button-container">
                <form action="formulario_ambulancia.html">
                  <button type="submit" className="button">
                    <span className="text">Miremos donde estás</span><span>¡Ingresar!</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-12">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d418.0174119485972!2d-74.15325216541729!3d4.616513281226549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1715128014951!5m2!1ses-419!2sco"
                  style={{ border: 0, width: '100%', height: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
              </div>
            </div>

            {/* Botones en fila */}
            <div className="col-md-12 button-container">
              <form action="apartados_ambu.html">
                <button type="submit" className="button">
                  <span className="text">Hospitales más cercanos</span><span>¡Ingresar!</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default App;
