import * as yup from "yup";

import React, { useState } from "react";

import schema from "../schema";
import { useHistory } from "react-router-dom";

export default function PizzaMaker() {
    const initialState = {
        name: "",
        size: "",
        instructions: "",
        pepperoni: "",
        italianSausage: "",
        blackOlives: "",
        pineapple: "",
        specialInstructions: "",
    };

    const errorState = {
        name: "",
        instructions: "",
    }

    const [state, setState] = useState(initialState);
    const [formErrors, setFormErrors] = useState(errorState)

    const onChange = (evt) => {
        const {name, value, checked} = evt.target

        if(name !== "pineapple" && name !== "pepperoni" && name !== "black olives" && name !== "italian sausage" && name!== "specialInstructions") {
            yup.reach(schema, name)
            .validate(value)
            .then(() => {
            setFormErrors({ ...formErrors, [name]: "" });
            })
            .catch((err) => {
            setFormErrors({
                ...formErrors,
                [name]: err.errors[0],
            });
            });
        }

        let valueOf = "";   

        if(checked) {
          valueOf = !state.name.value 
        } else {
            valueOf = value;
        }

        // line 29-47 is for checking errors

        setState({
            ...state,
            [name]: valueOf }) //[name] = computed property
        };

    let history = useHistory();

    const onSubmit = (evt) => {
        evt.preventDefault();
        history.push({pathname: "/confirmation", state })
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    name
                    <input type="text" name="name" value={state.name} onChange={onChange} />
                </label>
                {/* {formErrors.name} */}
                <select
                    name="size"
                    onChange={onChange}
                    defaultValue="choose one"
                >
                    <option value="choose one" disabled>choose one</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
                <label>
                    pepperoni
                    <input type="checkbox" name="pepperoni" value={state.pepperoni} onChange={onChange} />
                </label>
                <label>
                    italian sausage
                    <input type="checkbox" name="italian sausage" value={state.italianSausage} onChange={onChange} />
                </label>
                <label>
                    black olives
                    <input type="checkbox" name="black olives" value={state.blackOlives} onChange={onChange} />
                </label>
                <label>
                    pineapple
                     <input type="checkbox" name="pineapple" value={state.pineapple} onChange={onChange} />
                </label>
                <textarea type="text" name="specialInstructions" value={state.specialInstructions} onChange={onChange} />                                   
                <button>Enter Order Name</button>
            </form>
        </div> 
    )


}