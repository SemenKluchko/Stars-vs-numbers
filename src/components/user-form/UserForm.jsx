import Button from 'react-bootstrap/Button';
import { useState, useCallback } from 'react';
import './UserForm.css';

export default function UserForm(props) {
    const [name, setName] = useState(props.name || '');
    const [position, setPosition] = useState(props.position || 'visitor');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (props.id) {
            props.onUpdate(props.id, name, position)
        } else {
            props.onSave(name, position)
        }
    }, [props, name, position]);

    return (
        <form className="user-item-form centered">
        <div className='form-item'>
            <label className="form-label" htmlFor="position">Your are:</label>
            <select 
                className="form-control" 
                name="position" 
                id="position"
                value={position}
                onChange={(event) => setPosition(event.target.value)}>

                <option value="student">student</option>
                <option value="mentor">mentor</option>
                <option value="visitor">visitor</option>
            </select>
        </div>
        <div className="form-item">
        <label className="form-label" htmlFor="name">Name:</label>
        <input 
            className="form-control" 
            type="text" 
            name="name" 
            placeholder="Type your name or nickname"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}/>
        </div>
        <Button variant="success"onClick={handleSubmit}>Lets go!</Button>
    </form>
    );
  }
