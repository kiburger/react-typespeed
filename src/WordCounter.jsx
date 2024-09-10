import React, { useState, useEffect, useRef } from 'react';

const TypingTest = () => {
  const [text, setText] = useState(''); // To store the text input
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [isEditable, setIsEditable] = useState(true); // To control if textarea is editable
  const [duration, setDuration] = useState(30); // Duration selected by the user
  const timerRef = useRef(null); // To keep track of the countdown timer

  const handleInputChange = (e) => {
    if (!timerRef.current) {
      // Start the timer when the user begins typing
      startTimer();
    }
    setText(e.target.value); // Update the text input state
  };

  const handleDurationChange = (e) => {
    clearInterval(timerRef.current); 
    setText('');
    const selectedDuration = parseInt(e.target.value);
    setDuration(selectedDuration); // Update duration
    setTimeLeft(selectedDuration); // Set the timer to the selected duration
    setIsEditable(true);
    timerRef.current = null;
    //handleRestart(); // Restart the test with new duration
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsEditable(false); // Make the textarea uneditable when time is up
          timerRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleRestart = () => {
    clearInterval(timerRef.current); // Clear the timer
    setText(''); // Reset the text
    //setTimeLeft(30); // Reset the timer to 30 seconds
    setTimeLeft(duration); // Reset the timer to the selected duration
    setIsEditable(true); // Make textarea editable again
    timerRef.current = null; // Reset the timer reference
  };

  // Clean up the timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <select 
        onChange={handleDurationChange} 
        value={duration} 
      >
        <option value={15}>15 seconds</option>
        <option value={30}>30 seconds</option>
        <option value={60}>60 seconds</option>
      </select>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={handleInputChange}
        disabled={!isEditable}
        placeholder="Start typing..."
      ></textarea>
      <p>Time left: {timeLeft} seconds</p>
      <p>Total characters typed: {text.length}</p>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default TypingTest;
