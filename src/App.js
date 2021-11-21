import './App.css';
import { Router,} from 'react-router';
import history from './history';
import MainRouter from './MainRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router history={history}>
        <MainRouter />
        <ToastContainer />
    </Router>
  );
}

export default App;
