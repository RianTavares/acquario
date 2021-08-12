import React from 'react';
import Warning from '@material-ui/icons/Warning';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

const Message = () => {
  const waterClass = localStorage.getItem('acquario@contamination');

  if (waterClass === "contaminada") {
    return (
      <div className="message">
        <div className="water-info">
          <Warning style={{ color: '#E3CC1C', fontSize: '40' }} />
          <p className="water-info__polluted">
            Infelizmente sua água aparenta estar contaminada. Vamos salvar a sua informação e enviar uma reclamação para os responsáveis.
            Não deixe de acompanhar nossos alertas também em nossa página do Twitter.
          </p>
        </div>
      </div>
    )
  }
  if (waterClass === "potavel") {
    return (
      <div className="message">
        <div className="water-info">
          <VerifiedUser style={{ color: '#10C317', fontSize: '40' }} />
          <p className="water-info__potable">
            Oba, parece que a sua água está própria para o consumo!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="water-info">
      <p className="water-info__potable">
        Desculpe o transtorno, porém não foi possível precisar a qualidade da sua água. Tente novamente mais tarde. 
        Caso persista o problema entre em contato conosco em nosso Twitter, pois um de nossos especialista poderá ajudar. 
      </p>
    </div>
  )
}

export default Message;