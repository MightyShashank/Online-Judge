import './App.css'
import LandingPage from './pages/landingPage'
import { RecoilRoot } from 'recoil';
import CandidateHomePage from './pages/CandidatePages/CandidateHomePage';

function App() {
  return (
    <RecoilRoot>
      <div>
        <CandidateHomePage/>
      </div>
    </RecoilRoot>
  );
}

export default App
