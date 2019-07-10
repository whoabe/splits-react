import React from 'react'
import { Button } from 'reactstrap';

export default class ItemRow extends React.Component {

    render() {
        const { item, personId } = this.props
        const itemSubtotal = parseFloat((item.price * item.quantity).toFixed(2))

        return (
            <tr>
                {/* Description */}
                <td>{item.description}</td>

                {/* Quantity +/- buttons */}
                <td>
                    <Button className="spinnerButtons" onClick={() => this.props.onReduceCount(personId, item.itemId)}>-</Button>

                    <span className="px-1">{item.quantity}</span>

                    <Button className="spinnerButtons" onClick={() => this.props.onAddCount(personId, item.itemId)}>+</Button>
                </td>

                {/* price */}
                <td>{item.price}</td>

                {/* subtotal */}
                <td>{itemSubtotal}</td>
            </tr>
        )
    }

}