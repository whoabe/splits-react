import React from 'react'
import UserRow from './UserRow'

export default class UserTable extends React.Component {
    render() {
        // const userSubtotal = parseFloat(((this.props.remainingItems.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
        // const userTax = parseFloat((userSubtotal * 0.06).toFixed(2));
        // const userTotal = (userTax + userSubtotal).toFixed(2)
        const userSubtotal = this.props.subtotal;
        const userTax = this.props.tax;
        const taxRate = this.props.taxRate;
        const userTotal = this.props.total;

        const filterText = this.props.filterText;

        // const rounding = this.props.rounding;
        // passed from App

        // const afterRoundingTotal = parseFloat((parseFloat(rounding.toFixed(2)) + parseFloat(parseFloat(userTotal).toFixed(2))).toFixed(2))
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
                        remainingItem={remainingItem}
                        key={remainingItem.itemId} />
                );
                lastItem = remainingItem.description
            }
        });



        return (
      <div>
        <h5>Your Split</h5>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
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
              <td className="money">{userSubtotal}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Tax ({taxRate}%)</td>
              <td className="money">{userTax}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              {/* this should be total quanity - sum(other people's quantities) */}
              <td>Total</td>
              <td className="money">{userTotal}</td>
            </tr>
            {/* <tr>
              <td></td>
              <td></td>
              this should be total quanity - sum(other people's quantities)
              <td>Rounding</td>
              <td className="money">{rounding}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              this should be total quanity - sum(other people's quantities)
              <td>Total after Rounding</td>
              <td className="money">{afterRoundingTotal}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}