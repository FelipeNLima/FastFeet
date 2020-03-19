import React, { useEffect, useState } from 'react';

import { MdAdd, MdSearch, MdEdit, MdDeleteForever } from 'react-icons/md';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Container } from './styles';

import Menu from '~/components/Menu';
import Header from '~/components/Header';

import { showDeliverymanRequest } from '~/store/modules/deliveryman/actions';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveryman() {
  const [page, setPage] = useState(1);
  const [deliveryman, setDeliveryman] = useState([]);
  const [name, setName] = useState('');
  const dispatch = useDispatch();


  async function loadDeliveryman() {
    setPage(1);
    const response = await api.get('/deliveryman', {
      params: {
        q: name,
        page,
      },
    });
    setDeliveryman(response.data);
  }

  useEffect(() => {
    loadDeliveryman();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm('Tem certeza de que deseja excluir este entregador ?');
    try {
      if (confirm) {
        await api.delete(`/deliveryman/${id}`);
        toast.success('Entregador excluído com sucesso!');
        loadDeliveryman();
      }
      loadDeliveryman();
    } catch (err) {
      toast.error('Entregador não deletado!');
    }
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando entregadores</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por entregadores"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button type="button" onClick={() => history.push('/deliveryman/Add')}>
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
            <th>
              <strong>Foto</strong>
            </th>
            <th>
              <strong>Nome</strong>
            </th>
            <th>
              <strong>E-mail</strong>
            </th>

            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {deliveryman.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>
                <span>#{deliveryman.id}</span>
              </td>
              <td>
                <img
                  src={
                    deliveryman.avatar
                      ? deliveryman.avatar.url
                      : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                  }
                  alt={deliveryman.name}
                />
              </td>
              <td>
                <span>{deliveryman.name}</span>
              </td>
              <td>
                <span>{deliveryman.email}</span>
              </td>

              <td>
                <div>
                  <Menu>
                    <li>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(showDeliverymanRequest(deliveryman.id))
                        }
                      >
                        <MdEdit size={20} color="#4D85EE" />
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleDelete(deliveryman.id)}
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
    </Container>
  );
}
