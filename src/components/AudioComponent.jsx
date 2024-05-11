import { useState, useEffect,useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStatus } from '../context/StatusContext'; 
import '../styles/BetaAbout.scss';

const AudioComponent = ({ device_info }) => {
  const { currentAction, next_step, is_active_action ,status ,setStatus} = useStatus(); 

  
  const [canvas, setCanvas] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [bufferLength, setBufferLength] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [avg, setAvg] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [instructions, setInstructions] = useState("Press start when you are ready to begin. You'll do great!");
  const [threshold, setThreshold] = useState(30);
  const [intervalId, setIntervalId] = useState(null);

  const MAX_COUNT = 4;
  const MAX_AMPLITUDE = 255;
  const LOG_BASE = 10;

  useEffect(() => {

      if(intervalId){
        clearInterval(intervalId);
        setIntervalId(null);
        setIsCounting(false);
  }
}, [intervalId]);

  useEffect(() => {
    const logScale = (value) => {
      return Math.log(value + 1) / Math.log(LOG_BASE);
    };

    const getStream = async () => {

      let constraints = { audio: true };
      if (device_info?.deviceId) {
        constraints = { audio: { deviceId: { exact: device_info.deviceId } } };
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close();
      }
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const ana = ctx.createAnalyser();
      ana.fftSize = 2048;
      const buffer = ana.frequencyBinCount;
      const dataArray = new Uint8Array(buffer);
      source.connect(ana);

      setAudioCtx(ctx);
      setAnalyser(ana);
      setDataArray(dataArray);
      setBufferLength(buffer);
    
 }
 
    const drawMeter = () => {
      if (canvas && analyser) {
        const context = canvas.getContext('2d');
        if (context) {
          analyser.getByteFrequencyData(dataArray);
          context.clearRect(0, 0, canvas.width, canvas.height);
          let sum = dataArray.reduce((acc, val) => acc + val, 0);
          let average = sum / bufferLength;

          const scaledAverage = (logScale(average) / logScale(MAX_AMPLITUDE)) * canvas.width;
          setAvg(scaledAverage);

          context.shadowColor = '#396cd8';
          context.shadowBlur = 15;
          context.shadowOffsetX = 5;
          context.shadowOffsetY = -2;
          context.fillStyle = '#396cd8';
          context.fillRect(0, 0, scaledAverage, canvas.height + 10);
          requestAnimationFrame(drawMeter);
        }
      }
    };

 

    getStream().then(() => {
      drawMeter();
    });

    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [canvas, device_info?.deviceId,analyser, audioCtx, bufferLength, dataArray]);

  const nextStepCount = useCallback(() => {
    setCounter(0);
    next_step();
  }, [next_step]);

  const checkAndCount = useCallback(() => {
    // Define checkAndCount logic here
    if (isCounting) {
      const dynamicValue = avg;
      if (is_active_action()) {
        if (dynamicValue > threshold) {
          setCounter(counter + 1);
          setInstructions("Nice! you're doin' a great job. 👍");
        } else {
          setInstructions(`${currentAction?.toLowerCase()} with your mouth near the microphone`);
        }
      } else {
        if (dynamicValue < threshold) {
          setCounter(counter + 1);
          setInstructions(`Way to do that ${currentAction?.toLowerCase()}`);
        } else {
          setInstructions(`${currentAction?.toLowerCase()} and try not to make any noise`);
        }
      }
  
      if (counter >= MAX_COUNT) {
        nextStepCount();
      }
    }
  }, [isCounting, avg, threshold, is_active_action,currentAction, counter, setCounter, setInstructions, nextStepCount]);
  
  useEffect(() => {
    if (isCounting) {
      if (avg > threshold) {
        status === 'BREATHING';
      } else {
        status !=='BREATHING';
      }
    }
  }, [isCounting, avg, threshold,status,checkAndCount]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const startCounting = () => {
    setCounter(0);
    setIsCounting(true);
    setStatus('BREATHING');
    const newIntervalId = setInterval(checkAndCount, 1000);
    setIntervalId(newIntervalId);
    next_step();
  };
  

  

  const nextButton = ()=>{
    setStatus('READY');
    next_step();
  }
  return (
    <>
      <div>
        <canvas width="300" height="20" ref={setCanvas} className="meter" />
        <input type="range" name="threshold" id="threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} min={0} max={200} />
        <p className="note">
          Adjust the threshold to your mic level. Drag the slider to a level you can maintain while inhaling or exhaling 
        </p>
 
      </div>
      {(status === 'READY' || status === 'BREATHING') && (
        <>
        <p>{instructions}</p>
        <button 
          // disabled={status === 'BREATHING'} 
          className="start" 
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
          <button className="start" onClick={()=>nextButton()}>Next</button>
        )
      }
     
    </>
  );
};

AudioComponent.propTypes = {
    device_info: PropTypes.shape({
      deviceId: PropTypes.string.isRequired // Validate deviceId as a string and make it required
    })
  };
export default AudioComponent;
