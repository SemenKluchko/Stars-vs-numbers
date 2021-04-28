import Button from 'react-bootstrap/Button';
import './Header.css';

export default function Header(props) {
    return (
        <div className="help centered">
            <h1 className="greeting">Stars vs Numbers</h1>
            <p className="rules">You'll need to pick 1 or more numbers that sum to the number of stars</p>
            <Button 
                variant="success" 
                size="lg" 
                className="create-button" 
                onClick={props.onClickStartGame}
            >New Game</Button>
        </div>
    );
  }
