import React, { useState, useEffect } from 'react';

import { Container, ProblemTitle, ProblemMenu, View } from './styles';

import api from '~/services/api';
import {
  MdVisibility,
  MdCancel,
  MdClearAll,
  MdSearch,
} from 'react-icons/md';

import Header from '~/components/Header';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setproblems] = useState([]);
  const [name, setName] = useState('');

  // const dispatch = useDispatch();

  useEffect(() => {
    async function loadproblems() {
      setPage(1);
      const response = await api.get('/problems', {
        params: {
          q: name,
          page,
        },
      });
      setproblems(response.data);
    }
    loadproblems();
  }, [name, page]);

  return (
    <Container>
      <Header>
        <h2>Problemas na entrega</h2>
        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Buscar por encomendas"
            />
          </div>
        </div>
      </Header>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Encomenda</strong>
            </th>
            <th>
              <strong>Problema</strong>
            </th>

            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>
                <span>#{problem.delivery_id}</span>
              </td>

              <td>
                <ProblemTitle>{problem.description}</ProblemTitle>
              </td>

              <td>
                <div>
                  <ProblemMenu>
                    <li>
                      <button
                        type="button"
                      // onClick={() => handleShowProblem(problem.id)}
                      >
                        <MdVisibility size={20} color="#4D85EE" />
                        Visualizar
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <MdCancel size={20} color="#DE3B3B" />
                        Cancelar encomenda
                      </button>
                    </li>
                  </ProblemMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
