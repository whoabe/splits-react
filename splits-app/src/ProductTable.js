import React from 'react'

export default class ProductTable extends React.Component {
    round5= (x) => {
        return Math.ceil(x/5)*5;
    }

    handleChange = (e) => {
        this.props.handleInput(e.target.name, e.target.value, e.target.id);
    }

    render() {

    const productSubtotal = parseFloat(((this.props.items.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
    const productTax = parseFloat((productSubtotal * 0.06).toFixed(2));
    const productTotal = parseFloat((productTax + productSubtotal).toFixed(2));
    const productRounding = parseFloat((this.round5(productTotal)-productTotal).toFixed(2));
    const productAfterRounding = parseFloat((productTotal + productRounding).toFixed(2))

    const {filterText, addRow, items, handleInput} = this.props;
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
            {items.map((item, index) => {
                const subtotal = parseFloat((item.price * item.quantity).toFixed(2))
                
                return item.description.indexOf(filterText) === -1 
                ? null 
                : (
                    <tr key={index}>
                        <td>
                            <input 
                                name = 'description'
                                value={item.description}
                                onChange={(e) => handleInput(e.target.name, e.target.value, item.itemId)}/>
                        </td>
                        <td>
                            <input
                                name = 'quantity'
                                size="2rem"
                                value={item.quantity}
                                onChange={(e) => handleInput(e.target.name, e.target.value, item.itemId)}/>
                        </td>
                        <td>
                            <input 
                                name='price'
                                size="2rem"
                                value = {item.price}
                                onChange={(e) => handleInput(e.target.name, e.target.value, item.itemId)}/>
                        </td>
                        <td>{subtotal}</td>
                    </tr>
                );

            })}
            <tr>
                <td>
                    <button type='button' onClick={addRow}>Add Item</button>
                </td>
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