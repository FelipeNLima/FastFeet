import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function DeliverymanInput({ ...rest }) {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);

  const recipientRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField('deliveryman');

  useEffect(() => {
    async function loadData() {
      setPage(1);
      const response = await api.get('/deliveryman', {
        params: {
          q: '',
          page,
        },
      });

      const data = response.data.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }
    loadData();
  }, [page]);

  const filterColors = inputValue => {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: 'deliveryman_id',
      ref: recipientRef.current,
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
      defaultOptions={recipients}
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      placeholder="Entregador exemplo "
      ref={recipientRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

DeliverymanInput.propTypes = {
  name: PropTypes.string.isRequired,
};
