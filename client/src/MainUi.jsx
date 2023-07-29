import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import NavBar from './pages/pod-nav-bar.jsx';
import PodSearch from './pages/pod-search.jsx';
import AllPods from './pages/all-pods.jsx';
import OnePod from './pages/one-pod.jsx';
import OneEpi from './pages/one-epi.jsx';
import AllEpis from './pages/all-epis.jsx';
import { apiCall } from './functions/api-call.jsx';
import { UpdatePod, DeletePod, DeleteEpi, ImportedPod, Welcome } from './pages/interstitials.jsx';
import './App.css';

function MainUi(props) {
  const [display, setDisplay] = useState('welcome');
  const [podId, setPodId] = useState('');
  const [epiId, setEpiId] = useState('');
  const [render, setRender] = useState(<Welcome />)
  const [userId, setUserId] = useState('');
  const cookie = new Cookies();

  async function getUserId() {
    if ((cookie.get('userId') === "") || (!cookie.get('userId'))) {
        let res = await axios.get(
            `${apiCall}/api/user-data`
        );
        cookie.set('userId', res.data.user_id);
    }
    setUserId(cookie.get('userId'));
  }

  useEffect(() => {
    getUserId();
  });

    //logic for re-rendering the current display
    useEffect(() => {
            switch (display) {
                case 'allPods':
                    setRender(<AllPods setPodId={setPodId} userId={userId} setDisplay={setDisplay} />);
                    break;
                case 'onePod':
                    setRender(<OnePod userId={userId} podId={podId} setPodId={setPodId} setDisplay={setDisplay} />);
                    break;
                case 'oneEpi':
                    setRender(<OneEpi setPodId={setPodId} userId={userId} podId={podId} epiId={epiId} />);
                    break;
                case 'allEpis':
                    setRender(<AllEpis userId={userId} setPodId={setPodId} setEpiId={setEpiId}/>);
                    break;
                case 'searchPods':
                    setRender(<PodSearch userId={userId} setPodId={setPodId} setDisplay={setDisplay} />);
                    break;
                case 'updatePod':
                    setRender(<UpdatePod />);
                    break;
                case 'deletePod':
                    setRender(<DeletePod />);
                    break;
                case 'deleteEpi':
                    setRender(<DeleteEpi />);
                    break;
                case 'submitPod':
                    setRender(<ImportedPod />);
                    break;
                case 'welcome':
                    setRender(<Welcome />);
                    break;
                default:
                    setRender(<Welcome userId={userId} />)
        }

  }, [display, epiId, podId, userId, props]);

  // logic for telling the app to re-render the display
  const handleClick = (e) => {
      if (e.target.id) {
          if (e.target.id === '-1') {
              setDisplay('allPods');
          } else if (e.target.id === '-2') {
              setDisplay('allEpis');
          } else if (e.target.id === '-3') {
              setDisplay('searchPods');
          } else if (e.target.id === '-4') {
              setDisplay('submitPod');
          } else if ((e.target.id === '-6')) {
              setDisplay('deletePod');
          } else if (e.target.id === '-7') {
              setDisplay('deleteEpi');
          } else if (e.target.id === '-8') {
              setDisplay('updatePod');
          } else if ((display === 'allPods')) {
              setPodId(e.target.id);
              setDisplay('onePod');
          } else if (display === 'onePod') {
              setEpiId(e.target.id);
              setDisplay('oneEpi');
          } else if (display === 'allEpis') {
              setEpiId(e.target.id);
              setPodId(e.target.value);
              setDisplay('oneEpi');
          } else if (display === 'oneEpi') {
              setEpiId(0);
              setPodId(e.target.id);
              setDisplay('onePod');
          }
      }
  };


  return (
    <>
      <div onClick={handleClick}>
        <NavBar />
        {render}
      </div>
    </>
  );
}

export default MainUi;
