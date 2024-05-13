import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStatus } from '../context/StatusContext'; 
import '../styles/BetaAbout.scss';

const AudioComponent = ({ deviceInfo }) => {

  const MAX_AMPLITUDE = 255;
  const LOG_BASE = 10;

  const { currentAction, nextStep, status, setStatus} = useStatus();
  const [error, setError] = useState(null);
  const [threshold, setThreshold] = useState(30);
  const [counter, setCounter] = useState(4);
  const [isCounting, setIsCounting] = useState(false);
  const [instructions, setInstructions] = useState("Press start when you are ready to begin. You'll do great!");


  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const avgRef = useRef(0);

  const logScale = value => {
    return Math.log(value + 1) / Math.log(LOG_BASE);
  };

  useEffect(() => {
    let stream;
    
    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: deviceInfo.deviceId }
        });
        audioCtxRef.current = new AudioContext();
        const source = audioCtxRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        source.connect(analyserRef.current);
        drawMeter();
      } catch (error) {
        console.error('Error accessing user media:', setError(error));
      }
    };
    init();

    const drawMeter = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          context.clearRect(0, 0, canvas.width, canvas.height);
          const sum = dataArrayRef.current.reduce((acc, val) => acc + val, 0);
          const average = sum / dataArrayRef.current.length;
          const scaledAverage = (logScale(average) / logScale(MAX_AMPLITUDE)) * canvas.width;

          avgRef.current = scaledAverage;
          context.shadowColor = '#64637E';
          context.shadowBlur = 15;
          context.shadowOffsetX = 5;
          context.shadowOffsetY = -2;
          context.fillStyle = '#64637E';
          context.fillRect(0, 0, scaledAverage, canvas.height + 10);
          requestAnimationFrame(drawMeter);
        }
      }
    };
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [deviceInfo]);

 
  
  const startCounting = () => {
    setIsCounting(true);
    setStatus('BREATHING');
    nextStep(currentAction); 
  };


  useEffect(() => {
    const checkAndCount = () => {
      if (isCounting && counter > 0) {
        const dynamicValue = avgRef.current;
        const currentActionCopy = currentAction; // Capture currentAction value
    
        if (currentActionCopy === null || currentActionCopy === 'INHALE' || currentActionCopy === 'EXHALE') {
          if (dynamicValue > threshold) {
            setCounter(prevCounter => prevCounter - 1);
            setInstructions("Nice! You're doing a great job. 👍");
            setStatus('BREATHING');
          } else {
            setInstructions(`${currentActionCopy} with your mouth near the microphone`);
            setStatus('FOLLOW INSTRUCTION');
          }
        } else if (currentActionCopy === 'HOLD' || currentActionCopy === 'WAIT') {
          if (dynamicValue < threshold) {
            setCounter(prevCounter => prevCounter - 1);
            setInstructions(`Way to do that ${currentActionCopy}`);
            setStatus('BREATHING');
          } else {
            setInstructions(`${currentActionCopy} and try not to make any noise`);
            setStatus('FOLLOW INSTRUCTION');
          }
        }       
      }
      else if (counter === 0 ) {
        setCounter(4); // Reset counter to 4
        nextStep(currentAction); // Trigger next step
      }
    };
  

      const intervalRef = setInterval(checkAndCount, 1000);
    
      return () => clearInterval(intervalRef);
  
   
  }, [isCounting, counter, currentAction, threshold,nextStep,setStatus]);

  return (
    <div className='audioContainer'>
     {error ? (
        <p>Audio Failed to load</p>
      ) : (
        <div>
        <canvas width="300" height="20" ref={canvasRef} className="meter" />
        <input type="range" name="threshold" id="threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} min={0} max={200} />
        <p className="feeling-label">
          Adjust the threshold to your mic level. Drag the slider to a level you can maintain while inhaling or exhaling 
        </p>
 
      </div>
      )}
      
      {status === 'AUDIO_DETECTED' && (
        <button className="next-button" onClick={() => {setStatus('READY')}}>Next</button>
      )}

      {status === 'READY' && (
        <>
        <p className="feeling-instruction">{instructions}</p>
        <button className="next-button" onClick={startCounting}>
          Start
        </button>
        </>
      )}

      {status === 'BREATHING' && (
        <>
        <p className="feeling-instruction">{instructions}</p>
        <button 
          disabled
          className="next-button" 
        >
              <span>{currentAction}</span>
              <br />
              {counter}
        </button>
        </>
      )}
      {status === 'FOLLOW INSTRUCTION' && (
        <>
        <p className="feeling-instruction">{instructions}</p>
        <button 
          disabled
          className="next-button" 
        >
             FOLLOW INSTRUCTION
        </button>
        </>
      )}

    </div>
  );
};

AudioComponent.propTypes = {
    deviceInfo: PropTypes.string.isRequired
};
export default AudioComponent;
