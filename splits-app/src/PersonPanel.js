import React from 'react';
import ItemRow from './ItemRow'
// import { Button } from 'reactstrap'


export default class PersonPanel extends React.Component {
    render() {

        const taxRate = this.props.taxRate;
        const personSubtotal = parseFloat(((this.props.person.items.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
        const personTax = parseFloat((personSubtotal * taxRate/100).toFixed(2));
        const personTotal = (personTax + personSubtotal).toFixed(2)

        
        const { person } = this.props
        // let totalPrice = 0
        // person.items.forEach(function(item){ totalPrice += (item.price*item.quantity) })
        
        const filterText = this.props.filterText;

        const rows = [];
        let lastItem = null;

        this.props.person.items.forEach((item) => {
            if (item.description.indexOf(filterText) === -1) {
                return;
                }
            // this filter isnt working

            if (item.description !== lastItem) {
                rows.push(
                    <ItemRow
                        personId={person.personId}
                        item={item}
                        key={item.itemId}
                        onAddCount={this.props.onAddCount}
                        onReduceCount={this.props.onReduceCount}
                    />
                );
                lastItem = item.description
            }
        });

        return (
            <div className="personPanel">
                <h5>{person.name} ID: {person.personId}</h5>
                {/* make this editable */}
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
                            <td className="money">{personSubtotal}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            {/* this should be total quanity - sum(other people's quantities) */}
                            <td>Tax ({taxRate}%)</td>
                            <td className="money">{personTax}</td>
                        </tr>
                      
                        <tr>
                            <td></td>
                            <td></td>
                            {/* this should be total quanity - sum(other people's quantities) */}
                            <td>Total</td>
                            <td className="money">{personTotal}</td>
                        </tr>
                        
                        {/* <tr>
                            <td></td>
                            <td></td>

                            <td>Rounding</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>

                            <td>Total after Rounding</td>
                            <td></td>
                        </tr> */}
                        
                    </tbody>
                </table>
                <div className="personButtons">
                    <button className = "delete-btn" onClick={() => this.props.onDeletePerson(person.personId)}>Delete person</button>
                    {/* <div className="divider"/> */}
                    {/* <button className = "email-btn" onClick={() => this.props.onSendPersonEmail(person)}>Send Email</button> */}
                </div>
            </div>
        )
    }
}