import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function DeliverymanInput({ ...rest }) {
  const [page, setPage] = useState(1);
  const [deliverymen, setDeliverymen] = useState([]);
  const [inputValue, setinputValue] = useState('');

  async function loadDeliverymenOptions(inputValue) {
    setPage(1);
    const response = await api.get('/deliveryman', {
      params: {
        q: inputValue,
        page,
      },
    });
    const data = response.data.map(deliveryman => ({
			value: deliveryman.id,
			label: deliveryman.name,
    }));
    setinputValue(data);
  }

  // useEffect(() => {
  //   loadDeliverymenOptions();
  // }, [inputValue, page]);

  return (
    <AsyncSelect
      type="text"
      label="Entregador"
      name="deliveryman_id"
      placeholder="Entregadores"
      noOptionsMessage={() => 'Nenhum entregador encontrado'}
      loadOptions={loadDeliverymenOptions}
    />
  );
}

DeliverymanInput.propTypes = {
  name: PropTypes.string.isRequired,
};
