import React, { useState, useEffect } from 'react';
import NavBar from './pages/pod-nav-bar.jsx';
import PodSearch from './pages/pod-search.jsx';
import AllPods from './pages/all-pods.jsx';
import OnePod from './pages/one-pod.jsx';
import OneEpi from './pages/one-epi.jsx';
import AllEpis from './pages/all-epis.jsx';
import { UpdatePod, DeletePod, DeleteEpi, ImportedPod } from './pages/interstitials.jsx';
import './App.css';

function MainUi() {
  const [display, setDisplay] = useState('allPods');
  const [podId, setPodId] = useState('');
  const [epiId, setEpiId] = useState('');
  const [render, setRender] = useState(<AllPods />)
    //logic for re-rendering the current display
    useEffect(() => {

      switch (display) {
          case 'allPods':
              setRender(<AllPods />);
              break;
          case 'onePod':
              setRender(<OnePod podId={podId} />);
              break;
          case 'oneEpi':
              setRender(<OneEpi podId={podId} epiId={epiId} />);
              break;
          case 'allEpis':
              setRender(<AllEpis />);
              break;
          case 'searchPods':
              setRender(<PodSearch />);
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
          default:
              setRender(<AllPods />)
      };
  }, [display, epiId, podId]);

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
          };
      };
  };

  return (
    <>
      <div onClick={handleClick}>
        <NavBar />
        {render}
      </div>
    </>
  )
};

export default MainUi;
