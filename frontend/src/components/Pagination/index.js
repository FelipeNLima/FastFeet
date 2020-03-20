import React, { useState } from 'react';

import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container, Button, Page } from './styles';

export default function Pagination({ loadItems, itemsLenght }) {
  const [page, setPage] = useState(1);

  function prevPage() {
    if (page === 1) {
      return;
    }

    const pageNumber = page - 1;
    setPage(pageNumber);
    loadItems(pageNumber);
  }

  function nextPage() {
    if (itemsLenght < 5) {
      return;
    }

    const pageNumber = page + 1;

    setPage(pageNumber);
    loadItems(pageNumber);
  }

  return (
    <Container>
      <Button disabled={page === 1} onClick={prevPage}>
        <MdArrowBack color="#fff" size={20} />
      </Button>
      <Page>{page}</Page>
      <Button disabled={itemsLenght < 5} onClick={nextPage}>
        <MdArrowForward color="#fff" size={20} />
      </Button>
    </Container>
  );
}

Pagination.propTypes = {
  loadItems: PropTypes.func.isRequired,
  itemsLenght: PropTypes.number.isRequired,
};
