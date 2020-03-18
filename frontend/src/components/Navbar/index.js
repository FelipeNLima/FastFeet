import React from 'react';

import { Container, Content, Nav } from './styles';
import { useDispatch } from 'react-redux';
import logo from '~/assets/fastfeet-logo.png';

import { singOut } from '~/store/modules/auth/actions';
export default function NavBar() {
  const dispatch = useDispatch();

  function handleSingOut() {
    dispatch(singOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="" />
          <ul>
            <li>
              <Nav to="/orders">Encomendas</Nav>
            </li>
            <li>
              <Nav to="/deliveryman">Entregadores</Nav>
            </li>
            <li>
              <Nav to="/recipients">Destinários</Nav>
            </li>
            <li>
              <Nav to="/problems">Problemas</Nav>
            </li>
          </ul>
        </nav>
        <aside>
          <div>
            <strong>Admin FastFeet</strong>
            <button type="button" onClick={handleSingOut}>Sair do sistema</button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
