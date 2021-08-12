import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Dropdown,
  Form,
  TextInput
} from 'carbon-components-react'
import axios from 'axios';

const Step2 = () => {
  const history = useHistory();
  const waterClass = localStorage.getItem('acquario@waterClass')
  const yesOrNo = [{ id: 1, value: true, label: 'Sim' }, { id: 2, value: false, label: 'Não' }];
  const [formData, setFormData] = useState({
    isThereColor: '',
    isCloudy: '',
    hasOdor: '',
    hasFlavor: '',
    haveParticles: '',
    zipcode: '',
  })

  const handleDropdown = (e, name, setFormData) => {
    const { selectedItem } = e || { selectedItem: null };
    setFormData((prevState) => {
      const obj = { ...prevState };
      obj[name] = selectedItem;
      return obj;
    });
  }

  const handleTextInputs = (e, setFormData) => {
    const { value, name } = e.target || { value: null, name: null };
    if (value && name) {
      setFormData((prevState) => {
        const obj = { ...prevState };
        obj[name] = (value);
        return obj;
      });
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    if (
        (formData.isThereColor 
        || formData.isCloudy 
        || formData.hasFlavor 
        || formData.hasOdor 
        || formData.haveParticles)
        && waterClass === "agua_contaminada") {
          localStorage.setItem('acquario@contamination', 'contaminada')
          axios.post('/api/v1/twitter/post', formData);
        } else if (
          (!formData.isThereColor.value 
          || !formData.isCloudy.value
          || !formData.hasFlavor.value
          || !formData.hasOdor.value
          || !formData.haveParticles.value)
          && (waterClass === "nao_agua")) {
            console.log('ou será que aqui...')
            localStorage.setItem('acquario@contamination', 'talvez')
          } else if (
            (!formData.isThereColor.value 
            || !formData.isCloudy.value
            || !formData.hasFlavor.value 
            || !formData.hasOdor.value 
            || !formData.haveParticles.value)
            && (waterClass === "agua_potavel")) {
              localStorage.setItem('acquario@contamination', 'potavel')
            } else if (
          (formData.isThereColor.value 
          || formData.isCloudy.value 
          || formData.hasFlavor.value
          || formData.hasOdor.value
          || formData.haveParticles.value)
          && (waterClass === "agua_potavel" || waterClass === "nao_agua")) {
            console.log(formData)
            console.log(waterClass)
            console.log('entrei aqui')
            localStorage.setItem('acquario@contamination', 'talvez')
          }
          history.push('/formular/step2/message')
  };

  return (
    <div className="step2">
      <Form onSubmit={sendData}>
      <TextInput
            id="zipcode"
            name="zipcode"
            invalidText="Digite um CEP válido"
            onChange={(e) => handleTextInputs(e, setFormData)}
            labelText="Digite seu CEP"
            placeholder="XXXXXXXX"
            minLength={8}
            maxLength={8}
          />
        <Dropdown
          id="isThereColor"
          titleText="A água tem alguma coloração?"
          label="Escolha uma das opções"
          items={yesOrNo}
          itemToString={(item) => (item ? item.label : '')}
          onChange={(e) => handleDropdown(e, 'isThereColor', setFormData)}
        />
        <Dropdown
          id="isCloudy"
          titleText="A água está turva?"
          label="Escolha uma das opções"
          items={yesOrNo}
          itemToString={(item) => (item ? item.label : '')}
          onChange={(e) => handleDropdown(e, 'isCloudy', setFormData)}
        />
        <Dropdown
          id="hasOdor"
          titleText="Tem odor?"
          label="Escolha uma das opções"
          items={yesOrNo}
          itemToString={(item) => (item ? item.label : '')}
          onChange={(e) => handleDropdown(e, 'hasOdor', setFormData)}
        />
        <Dropdown
          id="hasFlavor"
          titleText="Em algum momento você ao consumir a água, sentiu algum sabor?"
          label="Escolha uma das opções"
          items={yesOrNo}
          itemToString={(item) => (item ? item.label : '')}
          onChange={(e) => handleDropdown(e, 'hasFlavor', setFormData)}
        />
        <Dropdown
          id="haveParticles"
          titleText="Consegue observar se existem partículas na agua?"
          label="Escolha uma das opções"
          items={yesOrNo}
          itemToString={(item) => (item ? item.label : '')}
          onChange={(e) => handleDropdown(e, 'haveParticles', setFormData)}
        />

        <button className="step2__button" type="submit">Enviar</button>
      </Form>
    </div>
  )
}

export default Step2;
