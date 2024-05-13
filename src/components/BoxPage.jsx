import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStatus } from '../context/StatusContext'; 
import { useRounds } from '../context/RoundsContext';
import Rounds from './Rounds'; 
import AudioComponent from './AudioComponent';
import '../styles/BetaAbout.scss';

const buttonMap = [
    {id:2, name:'Slight Stress',color:'green'},
    {id:3, name:'Normal Stress',color:'orange'},
    {id:4, name:'Extreme Stress',color:'red' }
]
const BoxPage = () => {
  const [audioInputs, setAudioInputs] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const { status, setStatus } = useStatus();
  const { rounds,roundsActive,setRoundsActive } = useRounds();

 

  const handleAudioSelect = (id) => {
    setSelectedAudio(audioInputs.find((device) => device.deviceId === id));
  };

  useEffect(() => {

    const loadDevicesProperties = {
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          sampleRate: 44100
        }
      };
    const dealWithError = (e, statusToggle = null) => {
        console.error(e);
        if (statusToggle !== 'NO_STATUS') setStatus('ERROR');
      };
    const refreshDevices = async () => {
        setStatus('LOADING');
        try {
          await navigator.mediaDevices.getUserMedia(loadDevicesProperties);
          const result = await navigator.mediaDevices.enumerateDevices();
    
          setAudioInputs(result.filter(({ kind, deviceId }) => deviceId !== 'default' && kind === 'audioinput'));
          setStatus('AUDIO_DETECTED');
        } catch (e) {
          dealWithError(e);
        }
      };
      const refreshPermissions = async () => {
        try {
          await navigator.permissions.query({ name: 'microphone' });
        } catch (e) {
          dealWithError(e, 'NO_STATUS');
        }
      };
    const fetchData = async () => {
      await refreshPermissions();
      await refreshDevices();
    };
    fetchData();
  }, [setStatus]);

 const settingRound = (id) =>{
    rounds[1]=id;
    setRoundsActive(true);
}
  return (
    <div className='boxPage-container'>
     

      
      {status === 'SUCCESS' ? (
        <>
        <h1 className='success_heading'>Congratulations ! <br/>You have now reduced your stress by 25%</h1>
  
    <dotlottie-player src="https://lottie.host/87039642-73bc-489b-ad1c-4d5548031077/CVrTtIp4IZ.json" background="transparent" speed="0.5" style={{width: "300px", height: "300px"}} loop autoplay/>
    
    <Link to='/'>
    <button className="next-button"> Back to Home </button>
    </Link>
        </>
        
      ) : (
        <>
        
          {roundsActive ? (
            <>
            <p className='status-heading'>STATUS:  {status}</p>
              {['READY', 'BREATHING'].includes(status) ? (
                <Rounds/>
              ) : (
                <div className="audio-inputs">
                  <h1 className='feeling_heading'>Select Microphone</h1>

                  <div className='audio-selection'>
                  <label className='feeling-label'>
                    Mic Inputs
                    <br/>
                    <select onChange={(e) => handleAudioSelect(e.target.value)}>
                      <option value={null}>None</option>
                      {audioInputs.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  </div>
                 
                </div>
              )}
              {selectedAudio && <AudioComponent deviceInfo={selectedAudio.deviceId} />}
            </>
          ) : (
            <div>

              <h1 className='feeling_heading'>How are you feeling right now?</h1>

              <div className='feeling-button-container'>
              {buttonMap.map((item)=>{
                const buttonClassName = `feeling-button ${item.color}-color`;

                return(

                  <span className='feeling-button-span' key={item.id}>
                     <button className={buttonClassName} onClick={()=>settingRound(item.id)}>{item.name}</button>
                  </span>
                
                )
                
               
              })}
                
                
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BoxPage;