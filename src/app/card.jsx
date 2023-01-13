import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
    const user = localStorage.getItem("userCard") ? JSON.parse(localStorage.getItem("userCard")) : undefined;

    return (
    <div className="card m-5" style={{width: "19rem"}}>
        <div className="card-body">
            <h5 className="card-title">Student card</h5>
            {user
            ? <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            :<p className="card-text">Empty</p>}
        </div>
        {user && <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="item__name">Name: </span>{user.name}</li>
            <li className="list-group-item"><span className="item__name">Surname: </span>{user.surname}</li>
            <li className="list-group-item"><span className="item__name">Birthyear: </span>{user.birthyear}</li>
            <li className="list-group-item"><span className="item__name">Portfolio: </span><a target="_blank" href={user.portfolio}>{user.portfolio}</a></li>
        </ul>}
        <div className="card-body">
           {user ? <Link className="card-link" to="/edit">Edit card</Link>
            : <Link className="card-link" to="/edit"><button type="button" class="btn btn-primary">Add information</button></Link>}
        </div>
    </div>);
};

export default Card;
