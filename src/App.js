import logo from './logo.svg';
import './App.css';
import Buttons from './components/crudButtons';
import EmpresaCard from './components/cards/empresa/empresaCard';
import ResponsaveisPage from './pages/admin/responsaveisPage';

function App() {
  const handleRead = () => alert('Visualizar item');
  return (
    <div className="App">
      <ResponsaveisPage />

    </div>
  );
}

export default App;
