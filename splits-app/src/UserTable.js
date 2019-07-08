import React from 'react'
import UserRow from './UserRow'

export default class UserTable extends React.Component {
    render() {
        const filterText = this.props.filterText;

        const rows = [];
        let lastItem = null;

        this.props.remainingItems.forEach((remainingItem) => {
            if (remainingItem.description.indexOf(filterText) === -1) {
                return;
            }

            if (remainingItem.description !== lastItem) {
                rows.push(
                    <UserRow
                        handleInput = {this.props.handleInput}
                        item={remainingItem}
                        key={remainingItem.itemId} />
                );
                lastItem = remainingItem.description
            }
        });

        return (
            <div>
                <h3>User/You</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}