import React from "react";
import { Link } from "react-router-dom"; // Importa Link para manejar rutas en React

import ambu from "../../assets/images/ambu.png"; // Importa la imagen de la ambulancia
import go from "../../assets/images/go.png"; // Importa la imagen del logo con animación
import alarma from "../../assets/images/alarma.png"; // Importa la imagen de la alarma
import "./home.css";

const Home = () => {
    return (
        <div>

            {/* Sección azul */}
            <div className="rectangulo-azul">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1>AMBUSOS La mejor elección para tus emergencias</h1>
                            <p>AMBUSOS se encarga de llegar al lugar ideal en el momento indicado</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                En AMBUSOS, nos comprometemos a responder a tus emergencias con la
                                mayor prontitud posible. Confía en nosotros para brindarte soluciones
                                eficientes en cualquier situación. AMBUSOS, tu aliado de confianza en
                                momentos críticos.
                            </p>
                        </div>
                        <div className="col-md-12 text-center">
                            <img className="img-fluid go-animation" src={ambu} alt="Ambulancia" width="300px" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección blanca */}
            <div className="rectangulo-blanco">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1>EN AMBUSOS trabajamos para la mejor entidad médica del país</h1>
                            <p>AMBUSOS sabe lo que es mejor para ti</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                En AMBUSOS, nuestro compromiso es garantizarte un traslado rápido y
                                seguro al mejor centro médico disponible en tu área. Confía en nuestra
                                experiencia y dedicación para brindarte la atención médica que necesitas
                                en situaciones de emergencia.
                            </p>
                                <button type="submit" className="button">
                                    <Link to="/eps" className="eps-button">
                                    ¿Para quien trabajamos?
                                    Ambusos!
                                </Link>
                                </button>

                        </div>
                        <div className="col-md-12 text-center">
                            <img className="img-fluid go-animation" src={go} alt="Logo" width="300px" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección azul final */}
            <div className="rectangulo-azul">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1>¿¡Tienes una emergencia!? </h1>
                            <p>No des más vueltas, contáctanos</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                En Ambusos siempre buscamos lo mejor para ti. Si te encuentras en una
                                emergencia, no dudes en presionar este botón para recibir la atención que
                                necesitas de manera rápida y efectiva.
                            </p>
                            <button type="submit" className="button">
                                    <Link to="/conductor" className="eps-button">
                                    Ambusos al rescate
                                    Ambusos!
                                </Link>
                                </button>

                        </div>
                        <div className="col-md-12 text-center">
                            <img className="img-fluid go-animation" src={alarma} alt="Alarma" width="300px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
