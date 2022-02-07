import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
export default function Read() {

    const [ APIData, setAPIData] = useState([]);

    const setData = (data) => {
        let {id, firstName, lastName, checkbox} = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
    }

    useEffect(() => {
        axios.get('https://62008469fdf50900172494da.mockapi.io/fakeData')
        .then((response) => {
            setAPIData(response.data);
        })
    }, [])

    const onDelete = (id) => {
        axios.delete(`https://62008469fdf50900172494da.mockapi.io/fakeData/${id}`)
            .then(() => {
                getData()
            })
    }

    const getData = () => {
        axios.get(`https://62008469fdf50900172494da.mockapi.io/fakeData`)
            .then((getData) => {
                setAPIData(getData.data)
            })
    }

    return (
        <div>
            <div>
                <Link to="/create">
                   <button>Add New</button>
                </Link>
            </div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>    
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                    <Link to="/update">
                                            <Button onClick={() => setData(data)}>Update</Button>
                                    </Link >
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}