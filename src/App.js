import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import NavBar from './Components/Templates/NavBar/NavBar';
import { Container } from 'react-bootstrap';
import PageStyle from './Components/Templates/PageStyle/PageStyle';
function App() {
  let router = useRoutes(routes)
  return (
    <Container>
      <NavBar />
      <PageStyle />
      {router}
    </Container>
  );
}

export default App;
