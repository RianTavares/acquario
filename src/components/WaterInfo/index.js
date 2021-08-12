import React from 'react';
import { useHistory } from 'react-router';
import Warning from '@material-ui/icons/Warning';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import NotInterested from '@material-ui/icons/NotInterested';

const WaterInfo = (props) => {
  const history = useHistory();
  const { data } = props;
  const waterClass = data?.data?.images[0]?.classifiers[1]?.classes.length !== 0
    ? data?.data?.images[0]?.classifiers[1]?.classes[0]?.class
    : 'nao_agua';

  if (waterClass === "agua_contaminada") {
    return (
      <div className="water-info">
        <Warning style={{ color: '#E3CC1C', fontSize: '40' }}/>
        <p className="water-info__polluted">
          Ops, sua água parece estar contaminada. Responda o questionário para ter certeza.
        </p>
        <button onClick={() => history.push('/formular/step2')} className="water-info__button">Complete o Formulário</button>
      </div>
    )
  } else if (waterClass === "agua_potavel") {
    return (
      <div className="water-info">
        <VerifiedUser style={{ color: '#10C317', fontSize: '40' }} />
        <p className="water-info__potable">
        Oba, parece que a sua água está própria para o consumo! Responda o questionário para ter certeza.
        </p>
        <button onClick={() => history.push('/formular/step2')} className="water-info__button">Complete o Formulário</button>
      </div>

    )
  } else if (waterClass === "nao_agua") {
    return (
      <div className="water-info">
        <NotInterested style={{ color: '#C31E10', fontSize: '40' }}/>
        <p className="water-info__not-water">
          Ops, parece que a imagem que você enviou não é água.
          Tente novamente com uma imagem da água que você gostaria de testar.
          Caso seja a imagem correta, tente enviar uma foto com mais luminosidade e melhor resolução.
        </p>
      </div>

    )
  }

  return (<></>)
}
export default WaterInfo;