import React from 'react';
import Guy from '../../assets/imgs/acquario-drinking-guy.png';
import TwitterLogo from '@material-ui/icons/Twitter';
import { useHistory } from 'react-router';

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-page">
      <div className="home-page__banner-container">
        <img src={Guy} alt="Jovem bebendo água" />
        <p className="home-page__banner-container__intro-text">
          Tá com sede mas não sabe se dá para beber essa água? Nós estamos aqui para ajudar!
          Através do reconhecimento de imagem e o preenchimento de um questionário nós te ajudamos a descobrir se pode ou não beber.
          E se a gente falar que a água não é própria para o consumo, nós também ajudamos você a denunciar para a CEDAE, os vereadores da cidade e a Comissão de Saneamento Ambiental.
        </p>
      </div>
      <button
        className="home-page__test-button"
        type="button"
        onClick={() => history.push('/formular')}
      >
        TESTE SUA ÁGUA AGORA
      </button>

      <a 
        href="https://twitter.com/AcquaRioApp" 
        target="_blank" 
        rel="noreferrer"
        style={{
          textDecoration: 'none',
          color: '#4051b5',
        }}
      >
        <div className="home-page__contact">
          <div className="home-page__contact__col1"><TwitterLogo style={{ color: "#4051B5", fontSize: '40' }} /></div>
          <div className="home-page__contact__col2"></div>
          <div className="home-page__contact__col3">Siga a gente no Twitter e acompanhe nossos últimos relatórios sobre sua região.</div>
        </div>
      </a>
    </div>
  )
}

export default Home;