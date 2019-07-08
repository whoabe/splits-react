import React from 'react'

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
                    <button onClick={() => this.props.onAddCount(personId, item.itemId)}>+</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => this.props.onReduceCount(personId, item.itemId)}>-</button>
                </td>

                {/* price */}
                <td>{item.price}</td>

                {/* subtotal */}
                <td>{itemSubtotal}</td>
            </tr>
        )
    }

}