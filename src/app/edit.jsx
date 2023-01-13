import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as yup from 'yup';



const Edit = () => {
    const user = localStorage.getItem("userCard") ? JSON.parse(localStorage.getItem("userCard")) : { name: "", surname: "", birthyear: 1900, portfolio: ""};
    const [data, setData] = useState({ name: user.name, surname: user.surname, birthyear: user.birthyear, portfolio: user.portfolio});
    const [errors, setErrors] = useState({})
    const [displayModal, setDisplayModal] = useState("none")

    const isValid = Object.keys(errors).length === 0
    let history = useHistory();

    const geBlur = () => {
        return "card m-5" + (displayModal === "block" ? " blur" : "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();

        if (isValid){
        const {name, surname, birthyear, portfolio} = e.target

        const userCard = {
          name: name.value,
          surname: surname.value,
          birthyear: birthyear.value,
          portfolio: portfolio.value
        }

        localStorage.setItem("userCard", JSON.stringify(userCard))
        }
        setDisplayModal("block")
    }

    const handleChange = (e) => {
        setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    let schema = yup.object().shape({
        portfolio: yup.string().required("This field is required.").url("This is not a valid URL."),
        birthyear: yup.number().required("This field is required.").positive().integer().max(2022).min(1900),
        surname: yup.string().required("This field is required."),
        name: yup.string().required("This field is required.")
    });

    const validate = () => {
        schema
        .validate(data)
        .then(() => setErrors({}))
        .catch((err) => setErrors({[err.path]: err.message}));
        return Object.keys(errors).length === 0;
    };

    const getInputClasses = (error) => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div>
            <div className={geBlur()} style={{width: "25rem"}}>
                <div className="card-body">
                    {user.name ? <h5 className="card-title">Edit</h5> : <h5 className="card-title">Create</h5>}
                    {user.name ? <p className="create__card-text">Consectetur reiciendis aspernatur, consequuntur.</p> : <p className="card-text">Consectetur beatae error cumque earum perspiciatis a!</p>}
                </div>
                <form className="m-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} value={data.name} type="text" className={getInputClasses(errors.name)} name="name" id="name" placeholder="Name..."/>
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="surname">Surname</label>
                        <input onChange={handleChange} value={data.surname} type="text" className={getInputClasses(errors.surname)} name="surname" id="surname" placeholder="Surname..." required/>
                        <div className="invalid-feedback">{errors.surname}</div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="birthyear">Birthyear</label>
                        <input onChange={handleChange} value={data.birthyear} type="number" className={getInputClasses(errors.birthyear)} name="birthyear" id="birthyear" placeholder="Birthyear..." required/>
                        <div className="invalid-feedback">{errors.birthyear}</div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="portfolio">Portfolio site</label>
                        <input onChange={handleChange} value={data.portfolio} type="text" className={getInputClasses(errors.portfolio)} name="portfolio" id="portfolio" placeholder="Portfolio site..." required/>
                        <div className="invalid-feedback">{errors.portfolio}</div>
                    </div>

                    {user.name ?
                    <div className="mt-4">
                        <Link className="card-link" to="/"><button type="button" className="btn btn-secondary">Back</button></Link>
                        <button disabled={!isValid} type="submit" className="btn btn-primary mx-2">Save</button>
                    </div>
                    :
                    <div className="mt-4">
                        <button disabled={!isValid} type="submit" className="btn btn-primary">Create</button>
                    </div>}
                </form>
            </div>
            <div className="modal" style={{display: displayModal}}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p>All changes saved!</p>
                            <Link to="/">Close</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        );
};

export default Edit;
