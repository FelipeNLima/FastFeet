import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function RecipientInput({ name, ...rest }) {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);

  const recipientRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    async function loadData() {
      setPage(1);
      const response = await api.get('/recipients', {
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
  }, []);

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
      name: fieldName,
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
      placeholder="Destinatário exemplo "
      ref={recipientRef}
      classNamePrefix="react-select"
      noOptionsMessage={() => 'Nenhum cliente encontrado'}
      {...rest}
    />
  );
}

RecipientInput.propTypes = {
  name: PropTypes.string.isRequired,
};
