import './App.css'
import LandingPage from './pages/landingPage'
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div>
        <LandingPage/>
      </div>
    </RecoilRoot>
  );
}

export default App
