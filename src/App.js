import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PassDetails from './components/PassDetails';
import PassEditor from './components/PassEditor';
import PassesOverview from './components/PassesOverview';
import Profile from './components/Profile';
import UsageDetails from './components/UsageDetails';
import UsageEditor from './components/UsageEditor';

function App() {
    return (
        <div className="App">
            <header className="App-header z-50 bg-white">
                <Navbar />
            </header>
            <main>
                <ToastContainer />
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/passes/new'} element={<PassEditor newPass={true} />} />
                    <Route path={'/passes/:passId'} element={<PassDetails />} />
                    <Route path={'/passes/user/:userId'} element={<PassesOverview />} />
                    <Route path={'/passes/edit/:passId'} element={<PassEditor newPass={false} />} />
                    <Route path={'/usages/new/:passId'} element={<UsageEditor newUsage={true} />} />
                    <Route path={'/usages/:passId'} element={<UsageDetails />} />
                    <Route path={'/usages/user/:userId'} element={<UsageDetails />} />
                    <Route path={'/usages/edit/:usageId'} element={<UsageEditor newUsage={false} />} />
                </Routes>

            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
