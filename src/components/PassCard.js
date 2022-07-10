import { Card, CardContent, CardHeader, Container } from '@mui/material'
import React from 'react'

const PassCard = ({ pass }) => {
    return (
        <Container sx={{ my: 3 }}>
            <Card>
                <CardHeader title={pass.title} />
                <CardContent>

                </CardContent>
            </Card>
        </Container>
    )
}

export default PassCard