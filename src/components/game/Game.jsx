import Button from 'react-bootstrap/Button';
import { useState, useEffect, useCallback } from 'react';
import PlayNumber from '../play-number/PlayNumber';
import StarsDisplay from '../stars-display/StarsDisplay';
import './Game.css';


function Game(props) {

  const colors =  {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  
  // Math science
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1,9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(1);

  const handleAddTime = useCallback(() => {
      props.updatesData(props.id, props.name, props.position, secondsLeft);
  }, [props, secondsLeft]);

  

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft + 1);
      }, 1000)
      return () => clearTimeout(timerId);
    }
  });

  const candidateAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 
    ? 'won' 
    : secondsLeft === 20 ? 'lost' : 'active';

    const changeGameVisibility = useCallback(() => {
      props.updatesGameVisibility(gameStatus);
    }, [props, gameStatus]);


  const numberStatus = (number) => {
    if(!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidateAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if(gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }
    const newCandidateNums = 
      currentStatus === 'available' 
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }


    return(
      <div className="game centered">
          <div className="body">
            <div className="left">
              {gameStatus !== 'active' ? (
                <Button variant="primary" className="game-done " onClick={() => {
                  handleAddTime();
                  changeGameVisibility();
                }}>Finish</Button>
              ) : (
                utils.range(1, stars).map(starId => 
                <StarsDisplay key={starId}  />
                )
              )}
            </div>
            <div className="right">
              {utils.range(1, 9).map(number => 
                <PlayNumber 
                key={number}
                status={numberStatus(number)}
                colors={colors}
                number={number}
                onClick={onNumberClick}
                />
                )}
            </div>
          </div>
          <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  )
}

export default Game;
