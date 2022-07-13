import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import PassDetails from './components/PassDetails.jsx';
import PassEditor from './components/PassEditor.jsx';
import PassesOverview from './components/PassesOverview.jsx';
import Profile from './components/Profile.jsx';
import UsageDetails from './components/UsageDetails.jsx';
import UsageEditor from './components/UsageEditor.jsx';
import UsagesOverview from './components/UsagesOverview';

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
                    <Route path={'/usages'} element={<UsagesOverview />} />
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
