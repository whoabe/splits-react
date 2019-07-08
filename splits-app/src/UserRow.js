import React from 'react';

export default class UserRow extends React.Component {
    render() {
        const item = this.props.item;
        // const name = item.stocked ?
        // // if item stocked is not true, then color the name red
        //   item.description :
        //   <span style={{color: 'red'}}>
        //     {item.description}
        //   </span>;

        const UserQuantity = item.quantity
        // UserQuantity = total item quantity - other people's quantity
        const UserSubtotal = parseFloat((item.price * item.quantity).toFixed(2))

        return (
            <tr>
                <td>{item.description}</td>
                <td>{UserQuantity}</td>
                {/* this should be total quanity - sum(other people's quantities) */}
                <td>{item.price}</td>
                <td>{UserSubtotal}</td>
            </tr>
        );
    }
}