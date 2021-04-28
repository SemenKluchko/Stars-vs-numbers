import Table from 'react-bootstrap/Table';
import { useState, useCallback } from 'react';
import Header from '../header/Header';
import UserForm from '../user-form/UserForm';
import ListOfUsers from '../list-of-users/ListOfUsers';
import Game from '../game/Game';
import './StarMatch.css';

function StarMatch() {
    const [gameId, setGameId] = useState(1);

    function generateId() {
        return `user=${Math.random().toString(36).substr(2,9)}`
      }
      const [isGameVisible, changeGameVisibility] = useState(false);
      const [isFormVisible, changeFormVisibility] = useState(false);
      const [isHeaderVisible, changeHeaderVisibility] = useState(true);
      const [isTableVisible, changeTableVisibility] = useState(false);
      const [list, changeList] = useState([]);
    
    
      const handleStartGame = useCallback(() => {
        changeFormVisibility(true);
        changeHeaderVisibility(false);
        changeTableVisibility(false);
      }, []);
    
      const createNewUser = useCallback((name, position) => {
        changeList((prevState) => {
          const newState = prevState.concat([{ id: generateId(), name, position, secondsLeft: 0, } ]);
          return newState;
        })
        changeFormVisibility(false);
        changeGameVisibility(true);
      }, []);

    const addTime = useCallback((updatesId, updatesName, updatesPosition, updatesSecondsLeft) => {
        console.log(updatesName, updatesPosition, updatesSecondsLeft);
        changeList((prevState) => {
            const newState = prevState.map((user) => {
                      if (user.name === updatesName) {
                        return {
                          id: user.id,
                          key: user.id,
                          name: updatesName,
                          position: updatesPosition,
                          secondsLeft: updatesSecondsLeft,
                        }
                      } else {
                        return {
                          id: user.id,
                          key: user.id,
                          name: user.name,
                          position: user.position,
                          secondsLeft: updatesSecondsLeft,
                        }
                      }
               });
               return newState;
            })
        }, []);

    const gameVisibility = useCallback(() => {
            changeGameVisibility(false);
            changeHeaderVisibility(true);
            changeTableVisibility(true);
    });

    return( 
    <div>
      {isHeaderVisible ? (<Header onClickStartGame={handleStartGame} />) : null}
      {isFormVisible ? (<UserForm onSave={createNewUser}/>) : null }
      {isGameVisible ? (<Game updatesData={addTime} updatesGameVisibility={gameVisibility} key={gameId} startNewGame={() => setGameId(gameId + 1)} />   ) : 
       null }
      {isTableVisible ? (<section className="user-form">
         <Table striped bordered hover>
          <thead>
              <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Time</th>
              </tr>
          </thead>
          <tbody>
          {list.map((user) => {
            return (
                <ListOfUsers 
                 key={user.id} 
                 id={user.id}
                 name={user.name} 
                 position={user.position} 
                 secondsLeft={user.secondsLeft}
                />
         
               )
          })}
          </tbody>
          </Table>
       </section>) : null }
    </div>
    )}

export default StarMatch;
