import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStatus } from '../context/StatusContext'; 
import '../styles/BetaAbout.scss';

const AudioComponent = ({ deviceInfo }) => {


  const MAX_COUNT = 4;
  const MAX_AMPLITUDE = 255; // Adjust this based on the maximum amplitude you're receiving
	const LOG_BASE = 10; // Adjust this for the desired logarithmic scaling

  const { currentAction, next_step, is_active_action ,status ,setStatus} = useStatus(); 
  const [error,setError] = useState(null);
  
  const [threshold, setThreshold] = useState(30);
  const [counter, setCounter] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [instructions, setInstructions] = useState("Press start when you are ready to begin. You'll do great!");

  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const avgRef = useRef(0);

  useEffect(() => {
    return () => {
      stopCounting();
    };
  }, []);

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
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      stopCounting();
    };
  }, [deviceInfo]);

  useEffect(() => {
    if (isCounting) {
      if (avgRef.current > threshold) {
        setStatus('BREATHING');
      } else {
        setStatus('READY');
      }
    }
  }, [isCounting, threshold,setStatus]);

	


  const checkAndCount = () => {
    if (isCounting) {
      const dynamicValue = avgRef.current;
      if (is_active_action()) {
        if (dynamicValue > threshold) {
          setCounter(prevCounter => prevCounter + 1);
          setInstructions("Nice! You're doin' a great job. 👍");
        } else {
          setInstructions(`${currentAction} with your mouth near the microphone`);
        }
      } else {
        if (dynamicValue < threshold) {
          setCounter(prevCounter => prevCounter + 1);
          setInstructions(`Way to do that ${currentAction}`);
        } else {
          setInstructions(`${currentAction} and try not to make any noise`);
        }
      }

      if (counter >= MAX_COUNT) {
        setCounter(0);
        next_step();
      }
    }
  };

  const startCounting = () => {
    setCounter(0);
    setIsCounting(true);
    setStatus('BREATHING');
    next_step();
    intervalRef.current = setInterval(()=>{checkAndCount()}, 1000);
  };

  

  const stopCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextButton = ()=>{
    setStatus('READY');
    next_step();
  }

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
      
      {(status === 'READY' || status === 'BREATHING') && (
        <>
        <p className="feeling-label">{instructions}</p>
        <button 
          // disabled={status === 'BREATHING'} 
          className="next-button" 
          onClick={startCounting}
        >
          {status === 'BREATHING' ? (
            <>
              <span>{currentAction}</span>
              <br />
              {counter}
            </>
          ) : (
            'Start'
          )}
        </button>
        </>
      )}

      {status === 'AUDIO_DETECTED' &&(
          <button className="next-button" onClick={()=>nextButton()}>Next</button>
        )
      }
     
    </div>
  );
};

AudioComponent.propTypes = {
    deviceInfo: PropTypes.string.isRequired
};
export default AudioComponent;
