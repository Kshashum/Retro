import { Typography } from '@material-ui/core'
import React from 'react'
import {useParams} from 'react-router-dom'
const Order = () => {
    const orderid = useParams()
    return (
        <div style={{display:'flex',margin:"5% 15% 5% 15%",alignItems:'center'}}>
            <Typography variant='h4'>Thank you!!, your order {orderid.orderid} has been placed</Typography>
        </div>
    )
}

export default Order
