import React from 'react'
import UserRow from './UserRow'

export default class UserTable extends React.Component {
    render() {
        const userSubtotal = parseFloat(((this.props.remainingItems.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
        const userTax = parseFloat((userSubtotal * 0.06).toFixed(2));
        const userTotal = (userTax + userSubtotal).toFixed(2)

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
          <tbody>
            {rows}
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Subtotal</td>
              <td>{userSubtotal}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Tax (6%)</td>
              <td>{userTax}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Rounding</td>
              <td>WIP</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Total</td>
              <td>{userTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}