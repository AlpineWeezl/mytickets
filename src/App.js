import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Passes from './components/Passes';
import Profile from './components/Profile';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
            <main>
                <ToastContainer />
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/passes'} element={<Passes />} />
                </Routes>

            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
