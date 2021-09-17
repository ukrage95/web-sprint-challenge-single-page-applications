import React, {useState, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import schema from './Schema'


const initialValues = {
    name: '',
    size: '',
    sauce: '',
    pepperoni: '',
    ham: '',
    sausage: '',
    mushroom: '',
    pineapple: '',
    peppers: '',
    instructions: '',
  }

const initialErrors = {
    name: '',
    size: '',
    sauce: '',
  }

const initialDisabled = true;

export default function Form() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    const [pizzas, setPizzas] = useState([]);
}

/* checking disabled */
useEffect(()=>{
    schema.isValid(values).then(valid=>{
        setDisabled(!valid)
    });
},[values])

/* setting values onchange + updating errors */
const onChange = e => {
    const {name, value, check, type} = e.target;
    const newValue = type === 'checkbox' ? check : value;
    onChange(name, newValue);
}

const change = (name, value) => {
    if (name === 'name' || name === 'size' || name === 'sauce') {
        validate(name, value);
    }
    setValues({
        ...values,
        [name]: value
    })
}

const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(valid =>{
        setErrors({
            ...errors, [name]: ''
        })
    })
    .catch(err =>{
        setErrors({
            ...errors, [name]: err.errors[0]
        })
    })
}

/* submission */
const onSubmit = e => {
    e.preventDefault();
    onSubmit();
}

const submit = () => {
    const newPizza = {
        name: values.name.trim(),
        size: values.size.trim(),
        sauce: values.sauce.trim(),
        toppings: ['pepperoni', 'ham', 'sausage', 'mushroom', 'pineapple', 'peppers'].filter(topping =>
            values[topping]===true
        ) 
    }
    postPizza(newPizza);
}

const postPizza = newPizza => {
    axios
    .post('https://reqres.in/api/pizza', newPizza)
    .then(res=>{
        console.log(res)
        setPizzas([...pizzas, {...newPizza, id:res.data.id}]);
        setValues(initialValues);
    })
    .catch(err=>{
        console.log(err)
    })
}
return (
    <div>
        {pizzas.map(pizza=>{
            return (
                <div>
                    <h4>Order# {pizza.id}***</h4>
                    <h4>Order for: {pizza.name}</h4>
                    <h4>Size: {pizza.size}</h4>
                    <h4>Sauce: {pizza.sauce}</h4>
                    <h4>Toppings: {pizza.toppings.map(topping=>`${topping}`)}</h4>
                    <h4>Special Instructions: {pizza.instructions}</h4>
                    </div>
            )
        })}
        <h1>Order Form</h1>
        <form onSubmit = {onSubmit}>
            <label htmlFor='name'>Enter your name<br></br>
            <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text' /><br></br>
            </label>
            <p>{errors.name}</p>
            <label htmlFor='size'>
                Size?<br></br>
                <select
                onChange={onChange}
                value={values.size}
                name='size'>
                    <option value=''>Select a size</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                </select>
            </label>
            <p>{errors.size}</p>
            <p>Select a sauce</p>
            <label htmlFor='red'>Red
                <input type='radio'
                name='sauce'
                value='red'
                checked={values.sauce==='red'}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='white'>White
                <input type='radio'
                name='sauce'
                value='white'
                checked={values.sauce==='white'}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='bbq'> bbq
                <input type='radio'
                name='sauce'
                value='bbq'
                checked={values.sauce==='bbq'}
                onChange={onChange} /><br></br>
            </label>
            <p>{errors.sauce}</p>
            <p>Select toppings</p>
            <label htmlFor='pepperoni'>pepperoni
                <input
                type='checkbox'
                name='pepperoni'
                checked={values.pepperoni}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='ham'>ham
                <input
                type='checkbox'
                name='ham'
                checked={values.ham}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='sausage'>sausage
                <input
                type='checkbox'
                name='sausage'
                checked={values.sausage}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='mushroom'>mushroom
                <input 
                type='checkbox'
                name='mushroom'
                checked={values.mushroom}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='pineapple'>pineapple
                <input
                type='checkbox'
                name='pineapple'
                checked={values.pineapple}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='peppers'>peppers
                <input
                type='checkbox'
                name='peppers'
                checked={values.peppers}
                onChange={onChange} /><br></br>
            </label>
            <label htmlFor='instructions'>Special Instructions?<br></br>
                <input 
                type='text'
                name='instructions'
                value={values.instructions}
                onChange={onChange} />
            </label><br></br>
            <button disabled={disabled}>Order Now!</button>
        </form>
    </div>
)