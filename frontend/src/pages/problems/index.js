import React, { useState, useEffect } from 'react';

import { Container, ProblemTitle, ProblemMenu } from './styles';
import Modal from 'react-bootstrap/Modal';
// import Pagination from 'react-bootstrap/Pagination';
import api from '~/services/api';
import {
  MdVisibility,
  MdCancel,
  MdSearch,
} from 'react-icons/md';

import Header from '~/components/Header';
import Pagination from '~/components/Pagination';
import { toast } from 'react-toastify';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setproblems] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function loadproblems(page) {
    const response = await api.get('/problems', {
      params: {
        q: name,
        page,
      },
    });
    setPage(response.data.length);
    setproblems(response.data);
  }

  useEffect(() => {
    loadproblems();
  }, [name, page]);

  async function handleShowProblem(id) {
    const response = await api.get(`/problems/${id}`);
    setDescription(response.data);
    handleShow();
  }

  async function handleCancelationProblem(id) {
    const confirm = window.confirm('Tem certeza de que deseja cancelar essa encomenda ?');
    try {
      if (confirm) {
        await api.delete(`/problems/${id}/cancel-delivery`);
        toast.success('Encomenda Cancelada com sucesso!');
        loadproblems();
      }
    } catch (err) {
      toast.error('Encomenda não foi cancelada!');
      loadproblems();
    }
  }

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
                        onClick={() => handleShowProblem(problem.id)}
                      >
                        <MdVisibility size={20} color="#4D85EE" />
                        Visualizar
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => handleCancelationProblem(problem.id)}>
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
      <Pagination loadItems={loadproblems} itemsLenght={page} />

      {/* modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>VISUALIZAR PROBLEMA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description.description}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
