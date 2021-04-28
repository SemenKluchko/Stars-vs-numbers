import './ListOfUsers.css';

export default function ListOfUsers(props) {
    return (
        
            <tr class="table-row">
                <td>{props.name}</td>
                <td>{props.position}</td>
                <td>{props.secondsLeft}sec</td>
            </tr>
    );
  }