import { useEffect } from 'react';
import Header from '../../components/header/Header.jsx'
import Content from './content/Content';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  window.addEventListener('popstate', function(event) {
    event.preventDefault();
    if (event.state === 'back') {
      navigate('/home')
    }
  });
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

export default Home