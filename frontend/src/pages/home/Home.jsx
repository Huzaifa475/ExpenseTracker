import { useEffect } from 'react';
import Header from '../../components/header/Header.jsx'
import Content from './content/Content';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handlePopState = () => {
      navigate('/home');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate])
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

export default Home