import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdVisibility,
} from 'react-icons/md';

import { Container } from './styles';

// import Badge from '~/components/Badge';
import Menu from '~/components/Menu';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';
import { showOrderRequest } from '~/store/modules/order/actions';

export default function Orders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveryman() {
      setPage(1);
      const response = await api.get('/orders', {
        params: {
          q: name,
          page,
        },
      });
      setOrders(response.data);
    }
    loadDeliveryman();
  }, [name, page]);


  return (
    <Container>
      <Header>
        <h2>Gerenciando encomendas</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Buscar por encomendas"
            />
          </div>
          <button onClick={() => history.push('/orders/add')} type="button">
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </Header>

      <table>
        <thead>
          <tr>
            <th>
              <strong>ID</strong>
            </th>
            <th>Produto</th>
            <th>
              <strong>Detinatário</strong>
            </th>
            <th>
              <strong>Entregador</strong>
            </th>
            <th>
              <strong>Cidade</strong>
            </th>
            <th>
              <strong>Estado</strong>
            </th>
            <th>
              <strong>Status</strong>
            </th>
            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>
                <span>#{order.id}</span>
              </td>
              <td>
                <span>{order.product}</span>
              </td>
              <td>
                <span>{order.recipient.name}</span>
              </td>
              <td>
                <main>
                  <img
                    src={
                      order.deliveryman.avatar
                        ? order.deliveryman.avatar.url
                        : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt={order.deliveryman.name}
                  />
                  <span>{order.deliveryman.name}</span>
                </main>
              </td>
              <td>
                <span>{order.recipient.city}</span>
              </td>
              <td>
                <span>{order.recipient.state}</span>
              </td>
              {/* <td>
                <Badge status={order.status} />
              </td> */}
              <td>
                <div>
                  <Menu>
                    <li>
                      <button type="button">
                        <MdVisibility size={20} color="#7d40e7" />
                        Visualizar
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => dispatch(showOrderRequest(order.id))}
                      >
                        <MdEdit size={20} color="#4D85EE" />
                        Editar
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <MdDeleteForever size={20} color="#DE3B3B" />
                        Excluir
                      </button>
                    </li>
                  </Menu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
