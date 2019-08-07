import React from 'react'
import { Table, InputGroup, InputGroupAddon } from 'reactstrap'

export default class ProductTable extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         taxRate: 6,
    //     };
    // }
    round5= (x) => {
        return Math.ceil(x/5)*5;
    }

    // taxChange = (e) => {
    //     const taxRate = this.props.taxRate; 
    //     if (isNaN(e.target.value)){
    //         this.setState({taxRate: 0})
    //     }
    //     else{
    //         // this.setState({taxRate: e.target.value})
    //     }
    // }

    render () {

    const productSubtotal = parseFloat(((this.props.items.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
    const productTax = parseFloat((productSubtotal * this.props.taxRate/100).toFixed(2));
    const productTotal = parseFloat((productTax + productSubtotal).toFixed(2));
    // const productRounding = this.props.rounding
    // const productRounding = parseFloat((this.round5(productTotal)-productTotal).toFixed(2));
    // const productAfterRounding = parseFloat((productTotal + productRounding).toFixed(2))

    const {filterText, addRow, items, handleInput, handleTaxRate} = this.props;
    return ( 
        <Table size="sm">
        <thead>
            <tr>
            <th>Item</th>
            <th>Qty</th>
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
                        <td className="money">{subtotal}</td>
                    </tr>
                );

            })}
            <tr>
                <td className = "addItemCol">
                    {/* <Button type='button' className='btn-success' onClick={addRow}>Add Item</Button> */}
                    <button type="button" className="btn btn-success"onClick={addRow}>Add Item</button>
                    {/* <button onClick={addRow} class="addItemButton">Add Item</button> */}
                </td>
                <td></td>
            {/* this should be total quanity - sum(other people's quantities) */}
                <td>Subtotal</td>
                <td className="money">{productSubtotal}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                {/* this should be total quanity - sum(other people's quantities) */}
                <td>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Tax</InputGroupAddon>
                        <input 
                            name="tax" 
                            value={this.props.taxRate} 
                            onChange={(evt) => handleTaxRate(evt.target.value)}/>
                        <InputGroupAddon addonType="append">%</InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="money">{productTax}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                {/* this should be total quanity - sum(other people's quantities) */}
                <td>Total</td>
                <td className="money">{productTotal}</td>
            </tr>   
            {/* <tr>
                <td></td>
                <td></td>
                this should be total quanity - sum(other people's quantities)
                <td>Rounding</td>
                <td>{productRounding}</td>
            </tr>
                <tr>
                <td></td>
                <td></td>
                this should be total quanity - sum(other people's quantities)
                <td>Total after Rounding</td>
                <td>{productAfterRounding}</td>
            </tr> */}
        </tbody>
        </Table>
    );
    }
}