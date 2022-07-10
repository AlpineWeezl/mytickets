import { Card, CardContent, CardHeader, Container, Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PassCard = ({ pass }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/passes/${pass._id}`);
    }

    return (
            <div onClick={clickHandler} className={'bg-white my-auto'}>
                <CardHeader title={pass.title} />
                <Divider />
                <CardContent>
                    <h3>{pass.description ? pass.description : 'Keine Beschreibung vorhanden.'}</h3>
                    <Divider />
                    <Container sx={{ display: 'flex' }}>
                        <Container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }} >
                            <h4 className='my-0'>Kaufpreis:</h4>
                            <p>{pass.price} €</p>
                            <h4>Benutzt:</h4>
                            <p>{pass.price} €</p>
                        </Container>
                        <Container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        </Container>
                    </Container>
                </CardContent>
            </div>
    )
}

export default PassCard