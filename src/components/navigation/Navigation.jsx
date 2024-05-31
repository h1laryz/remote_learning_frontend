import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useTranslation } from 'react-i18next';
import { useJwt } from "react-jwt";
import './Navigation.css'; // Подключаем файл стилей

const Navigation = ({ jwtToken }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const { decodedToken, isExpired } = useJwt(jwtToken);
  let role;
  if (decodedToken) {
    role = decodedToken.role;
  }

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand className="ms-3">{t('nameOfProject')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          { role && (role === 'teacher' || role === 'student') && <Nav.Link as={Link} to="/">{t('chat')}</Nav.Link> }
          { role && role === 'admin' && <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link> }
          { role && role === 'student' && <Nav.Link as={Link} to="/diary">{t('diary')}</Nav.Link> }
          { role && (role === 'teacher' || role === 'student') && <Nav.Link as={Link} to="/assignments">{t('assignments')}</Nav.Link> }
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown title={<i className="bi bi-globe"></i>} id="language-nav-dropdown" className="dropdown-menu-left">
            <NavDropdown.Item onClick={() => handleLanguageChange('en')}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLanguageChange('uk')}>Українська</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={<i className="bi bi-person-circle"></i>} id="basic-nav-dropdown" className="dropdown-menu-left">
            {!jwtToken && <NavDropdown.Item as={Link} to="/login">{t('login')}</NavDropdown.Item>}
            {!jwtToken && <NavDropdown.Item as={Link} to="/signup">{t('signUp')}</NavDropdown.Item>}
            {jwtToken && <NavDropdown.Item onClick={handleLogout}>{t('logout')}</NavDropdown.Item>}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
