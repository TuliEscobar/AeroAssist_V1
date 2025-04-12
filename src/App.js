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
          {/* Columna Izquierda: Información y Guía */}
          <MDBCol lg="6" className="px-4">
            <div className="mb-3">
              <MDBTypography tag='h1' className='display-6 gradient-text mb-2'>
                <MDBIcon fas icon='plane-departure' className='me-2' />
                AeroAssist
              </MDBTypography>
              <p className="lead text-muted mb-3">
                Tu asistente virtual especializado en documentación y regulaciones aeronáuticas OACI
              </p>
            </div>

            <MDBCard className='mb-3'>
              <MDBCardBody className='p-3'>
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
            </MDBCard>

            <MDBCard className='mb-3'>
              <MDBCardBody className='p-3'>
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
            </MDBCard>
          </MDBCol>

          {/* Columna Derecha: Chat */}
          <MDBCol lg="6" className="px-4">
            <Chatbot />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Layout>
  );
};

export default App; 