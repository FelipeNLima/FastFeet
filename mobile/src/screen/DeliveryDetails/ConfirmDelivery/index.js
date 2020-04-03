import React, { useState } from 'react';
import { StatusBar, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import imagem from '~/assets/encomendas.jpg';

import api from '~/services/api';

import {
  Container,
  Color,
  Content,
  Card,
  SubmitButton,
  Picture,
} from './styles';

export default function ConfirmDelivery({ route }) {
  const { delivery_id: idDelivery } = route.params;
  const deliveryman_id = useSelector((state) => state.auth.id);
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [Upload, setUpload] = useState();

  function handleSelectImage() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
        takePhotoButtonTitle: 'Acessar Camera',
        chooseFromLibraryButtonTitle: 'Acessar galeria do celular',
        cancelButtonTitle: 'Cancelar',
      },
      (upload) => {
        if (upload.error) {
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('Used canceled');
        } else {
          const source = {
            uri: `data:image/jpge;base64,${upload.data}`,
          };
          setUpload(upload);
          setFile(source);
        }
      }
    );
  }

  async function handleConfirmDelivery() {
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpg',
        uri: Upload.uri,
        name: 'signature.jpg',
      });

      const response = await api.post('files', data);

      const { id } = response.data;

      await api.put(`/deliveryman/${deliveryman_id}/deliveries/${idDelivery}`, {
        signature_id: id,
      });

      Alert.alert('Sucesso!', 'Encomenda entregada com sucesso');
      navigation.navigate('Entregas');
    } catch (err) {
      console.tron.log(err);
      Alert.alert('Erro!', 'Erro ao confirmar a entrega da encomenda');
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Color />
      <Content>
        <Card>
          {file ? (
            <Image
              source={{ uri: file.uri }}
              style={{ height: '100%', width: '100%' }}
            />
          ) : (
            <Image source={imagem} style={{ height: '100%', width: '100%' }} />
          )}
          <Picture onPress={handleSelectImage}>
            <Icon name="photo-camera" color="#fff" size={30} />
          </Picture>
        </Card>
        <SubmitButton onPress={handleConfirmDelivery}>Enviar</SubmitButton>
      </Content>
    </Container>
  );
}

ConfirmDelivery.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
