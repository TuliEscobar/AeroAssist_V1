import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography
} from 'mdb-react-ui-kit';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <Layout>
      <MDBContainer fluid className="py-3">
        <MDBRow>
          {/* Columna Derecha: Chat - Aparecerá primero en móviles */}
          <MDBCol lg="8" className="px-4 order-lg-2 order-1 mb-3 mb-lg-0">
            <Chatbot />
          </MDBCol>

          {/* Columna Izquierda: Información y Guía - Aparecerá segunda en móviles */}
          <MDBCol lg="4" className="px-4 order-lg-1 order-2">
            <div className="mb-3">
              <MDBTypography tag='h1' className='display-6 gradient-text mb-2'>
                <MDBIcon fas icon='plane-departure' className='me-2' />
                AeroAssist
              </MDBTypography>
              <p className="lead text-muted mb-3 small">
                Tu asistente virtual especializado en documentación y regulaciones aeronáuticas OACI
              </p>
            </div>

            <div className="mb-3">
              <MDBCardBody className='p-0'>
                <h6 className='mb-2 gradient-text'>
                  <MDBIcon fas icon='info-circle' className='me-2' />
                  Cómo Usar el Chat
                </h6>
                <ul className="guide-list small">
                  <li className="py-1">
                    <MDBIcon fas icon='check' className='me-2 text-success' />
                    Haz preguntas específicas para obtener respuestas precisas
                  </li>
                  <li className="py-1">
                    <MDBIcon fas icon='check' className='me-2 text-success' />
                    Menciona el país o región sobre la que necesitas información
                  </li>
                  <li className="py-1">
                    <MDBIcon fas icon='check' className='me-2 text-success' />
                    Puedes usar el micrófono para dictar tus preguntas
                  </li>
                </ul>
              </MDBCardBody>
            </div>

            <div>
              <MDBCardBody className='p-0'>
                <h6 className='mb-2 gradient-text'>
                  <MDBIcon fas icon='question-circle' className='me-2' />
                  Preguntas Sugeridas
                </h6>
                <ul className="suggestion-list small">
                  <li className="py-2">¿Cuáles son los requisitos para obtener una licencia de piloto privado?</li>
                  <li className="py-2">¿Qué documentación necesito para un vuelo internacional?</li>
                  <li className="py-2">Explícame las regulaciones sobre tiempo de vuelo y descanso</li>
                </ul>
              </MDBCardBody>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Layout>
  );
};

export default App; 