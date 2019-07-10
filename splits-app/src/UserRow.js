import React from 'react';

export default class UserRow extends React.Component {
    render() {
        const remainingItem = this.props.remainingItem;
        // const name = item.stocked ?
        // // if item stocked is not true, then color the name red
        //   item.description :
        //   <span style={{color: 'red'}}>
        //     {item.description}
        //   </span>;

        const UserQuantity = remainingItem.quantity
        // UserQuantity = total item quantity - other people's quantity
        const UserSubtotal = parseFloat((remainingItem.price * remainingItem.quantity).toFixed(2))

        return (
            <tr>
                <td>{remainingItem.description}</td>
                <td>{UserQuantity}</td>
                {/* this should be total quanity - sum(other people's quantities) */}
                <td>{remainingItem.price}</td>
                <td>{UserSubtotal}</td>
            </tr>
        );
    }
}