import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';



export default function Update() {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState('a');
    const [lastName, setLastName] = useState('a');
    const [checkbox, setCheckbox] = useState(false);

    const [id, setID] = useState('a');

    useEffect(() => {
        setID(localStorage.getItem("ID"))
        setFirstName(localStorage.getItem('First Name'))
        setLastName(localStorage.getItem('Last Name'))
        setCheckbox(localStorage.getItem('checkbox Value'))
    }, [])

    const updateAPIData = () => {
        axios.put(`https://62008469fdf50900172494da.mockapi.io/fakeData/${id}`, {
            firstName,
            lastName,
            checkbox
        }).then(() => {
            navigate('/read')
        })
    }

    return (
        <div>
            <Form className='create-form'>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        placeholder='First Name...'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        placeholder='Last Name...'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='I agree to the Terms and Conditions'
                        checked={checkbox}
                        onChange={(e) => setCheckbox(!checkbox)}
                    />
                </Form.Field>
                <Button type="submit" onClick={updateAPIData}> Update</Button>
            </Form>
        </div>
    );
}

