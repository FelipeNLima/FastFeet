import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdVisibility,
  MdFilterList,
} from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';
import Menu from '~/components/Menu';
import Header from '~/components/Header';
import Badge from '~/components/Badge';

import { showOrderRequest } from '~/store/modules/order/actions';

import loading from '~/assets/loading.png';

export default function Orders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  async function loadOrders() {
    setPage(1);
    const response = await api.get('/orders', {
      params: {
        q: name,
        page,
      },
    });
    setOrders(response.data);
  }

  useEffect(() => {
    loadOrders();
  }, [name, page]);

  async function handleshow(id) {
    const response = await api.get(`/orders/${id}`);

    const order = {
      ...response.data,
      formatedStartDate: response.data.start_date
        ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', {
          locale: ptBR,
        })
        : null,
      formatedEndDate: response.data.end_date
        ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
          locale: ptBR,
        })
        : null,
    };

    console.log(setDescription(order));
  }

  async function handlefilterproblems() { }

  async function handleDelete(id) {
    const confirm = window.confirm(
      'Tem certeza de que deseja excluir esta encomenda ?'
    );
    try {
      if (confirm) {
        await api.delete(`/orders/${id}`);
        toast.success('Encomenda excluído com sucesso!');
        loadOrders();
      }
      loadOrders();
    } catch (err) {
      toast.error('Encomenda não deletado!');
    }
  }

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
          <button onClick={() => handlefilterproblems} type="button">
            <MdFilterList size={22} color="#fff" /> FILTRAR PROBLEMAS
          </button>
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
                  <span>{order.deliveryman.name}</span>
                </main>
              </td>
              <td>
                <span>{order.recipient.city}</span>
              </td>
              <td>
                <span>{order.recipient.state}</span>
              </td>
              <td>
                <Badge status={order.status} />
              </td>
              <td>
                <div>
                  <Menu>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleshow(order.id)}
                      >
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
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                      >
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

      {/* modal */}
      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header closeButton>
          <strong>Informações da encomenda</strong>
          <p>{description.recipient.street}, {description.recipient.number}</p>
          <p>{description.recipient.city} - {description.recipient.state}</p>
          <p>{description.recipient.postalcode}</p>
        </Modal.Header>
        <Modal.Body>
          <strong>Dados</strong>
          {/* <p>Retirada: {order.formatedStartDate ? order.formatedStartDate : '--/--/----'}</p>
          <p>Entrega: {order.formatedEndDate ? order.formatedEndDate : '--/--/----'}</p> */}
        {/* </Modal.Body>
        <Modal.Footer>
          <strong>Assinatura do destinatario</strong>
          <img
            src={
              description.signature
                ? description.signature.url
                : loading
            }
            alt={description.name}
          />
        </Modal.Footer> */}{' '}
        */}
      </Modal>
    </Container>
  );
}
