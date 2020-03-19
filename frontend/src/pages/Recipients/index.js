import React, { useState, useEffect } from 'react';

import { MdSearch, MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Container } from './styles';

import Header from '~/components/Header';
import Menu from '~/components/Menu';

import api from '~/services/api';
import history from '~/services/history';

import { showRecipientRequest } from '~/store/modules/recipient/actions';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [recipients, setRecipients] = useState([]);
  const dispatch = useDispatch();

  async function loadRecipients() {
    setPage(1);
    const response = await api.get('/recipients', {
      params: {
        q: name,
        page,
      },
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients()
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm('Tem certeza de que deseja excluir este destinatário?');
    try {
      if (confirm) {
        await api.delete(`/recipients/${id}`);
        toast.success('Destinatário excluído com sucesso!');
        loadRecipients();
      }
      loadRecipients();
    } catch (err) {
      toast.error('Destinatário não deletado');
    }
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando destinatários</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por destinatários"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button onClick={() => history.push('/recipients/add')} type="button">
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
              <strong>Nome</strong>
            </th>
            <th>
              <strong>Endereço</strong>
            </th>

            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>
                <span>#{recipient.id}</span>
              </td>

              <td>
                <span>{recipient.name}</span>
              </td>
              <td>
                <span>
                  {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                  {recipient.state}{' '}
                </span>
              </td>

              <td>
                <div>
                  <Menu>
                    <li>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(showRecipientRequest(recipient.id))
                        }
                      >
                        <MdEdit size={20} color="#4D85EE" />
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(recipient.id)}
                        type="button"
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
