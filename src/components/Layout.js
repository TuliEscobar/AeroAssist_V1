import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
  MDBBtn,
  MDBFooter
} from 'mdb-react-ui-kit';

const Layout = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`min-h-screen d-flex flex-column ${darkMode ? 'dark-mode' : ''}`}>
      <MDBNavbar expand='lg' className='modern-navbar sticky-top'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#' className='gradient-text fw-bold'>
            <MDBIcon fas icon='plane-departure' className='me-2' /> AeroAssist
          </MDBNavbarBrand>
          
          <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavBar(!showNavBar)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showNavBar}>
            <MDBNavbarNav right fullWidth={false}>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Inicio</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Características</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Documentación</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Contacto</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn 
                  color={darkMode ? 'light' : 'dark'} 
                  className='ms-2' 
                  size='sm'
                  onClick={toggleDarkMode}
                >
                  <MDBIcon fas icon={darkMode ? 'sun' : 'moon'} />
                </MDBBtn>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <main className='py-4 flex-grow-1'>
        {children}
      </main>

      <MDBFooter className='text-center text-lg-start bg-white text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Conéctate conmigo en las redes sociales:</span>
          </div>

          <div>
            <a 
              href='https://linkedin.com/in/hector-escobar11' 
              className='me-4 text-reset'
              target='_blank'
              rel='noopener noreferrer'
            >
              <MDBIcon fab icon='linkedin' size='lg' />
            </a>
            <a 
              href='https://github.com/TuliEscobar' 
              className='me-4 text-reset'
              target='_blank'
              rel='noopener noreferrer'
            >
              <MDBIcon fab icon='github' size='lg' />
            </a>
            <a 
              href='https://twitter.com/hector-escobar' 
              className='me-4 text-reset'
              target='_blank'
              rel='noopener noreferrer'
            >
              <MDBIcon fab icon='twitter' size='lg' />
            </a>
          </div>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon fas icon='plane-departure' className='me-2' />
                  AeroAssist
                </h6>
                <p>
                  Tu asistente virtual para regulaciones aeronáuticas, desarrollado con pasión y experiencia.
                </p>
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Desarrollador</h6>
                <p>
                  <MDBIcon fas icon='user' className='me-2' />
                  Héctor Escobar
                </p>
                <p>
                  <MDBIcon fas icon='envelope' className='me-2' />
                  tuliescobarr@gmail.com
                </p>
                <p>
                  <MDBIcon fas icon='globe' className='me-2' />
                  <a 
                    href='https://linkedin.com/in/hector-escobar11'
                    className='text-reset'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © {new Date().getFullYear()} Desarrollado con{' '}
          <MDBIcon fas icon='heart' className='text-danger' /> por{' '}
          <a 
            href='https://linkedin.com/in/hector-escobar'
            className='text-reset fw-bold'
            target='_blank'
            rel='noopener noreferrer'
          >
            Héctor Escobar
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Layout; 