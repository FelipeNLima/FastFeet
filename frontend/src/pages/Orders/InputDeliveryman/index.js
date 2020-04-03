import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function DeliverymanInput({ name, ...rest }) {
  const [deliveryman, setDeliveryman] = useState([]);
  const [page, setPage] = useState(1);

  const deliverymanRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    async function loadData() {
      setPage(1);
      const response = await api.get('/deliveryman', {
        params: {
          q: '',
          page,
        },
      });

      const data = response.data.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      setDeliveryman(data);
    }
    loadData();
  }, []);

  const filterColors = inputValue => {
    return deliveryman.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: deliverymanRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        } else {
          if (!ref.select.state.value) {
            return '';
          }
          return ref.select.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={deliveryman}
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      placeholder="Entregador exemplo "
      ref={deliverymanRef}
      classNamePrefix="react-select"
      noOptionsMessage={() => 'Nenhum entregador encontrado'}
      {...rest}
    />
  );
}

DeliverymanInput.propTypes = {
  name: PropTypes.string.isRequired,
};
