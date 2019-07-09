import React from 'react'
import ProductRow from './ProductRow.js'

export default class ProductTable extends React.Component {
round5= (x) => {
    return Math.ceil(x/5)*5;
    }

    render() {

    const productSubtotal = parseFloat(((this.props.items.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
    const productTax = parseFloat((productSubtotal * 0.06).toFixed(2));
    const productTotal = parseFloat((productTax + productSubtotal).toFixed(2));
    const productRounding = this.props.rounding
    // const productRounding = parseFloat((this.round5(productTotal)-productTotal).toFixed(2));
    const productAfterRounding = parseFloat((productTotal + productRounding).toFixed(2))

    const filterText = this.props.filterText;

    const rows = [];
    let lastItem = null;
    
    this.props.items.forEach((item) => {
        if (item.description.indexOf(filterText) === -1) {
        return;
        }

        if (item.description !== lastItem) {
        rows.push(
            <ProductRow
            item={item}
            key={item.itemId}
            handleInput={this.props.handleInput} />
        );
        lastItem = item.description
        }

    });

    return ( 
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
            <td>{productSubtotal}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            {/* this should be total quanity - sum(other people's quantities) */}
            <td>Tax (6%)</td>
            <td>{productTax}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            {/* this should be total quanity - sum(other people's quantities) */}
            <td>Total</td>
            <td>{productTotal}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            {/* this should be total quanity - sum(other people's quantities) */}
            <td>Rounding</td>
            <td>{productRounding}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            {/* this should be total quanity - sum(other people's quantities) */}
            <td>Total after Rounding</td>
            <td>{productAfterRounding}</td>
            </tr>
        </tbody>
        </table>
    );
    }
}