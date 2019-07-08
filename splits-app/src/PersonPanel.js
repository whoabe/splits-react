import React from 'react';
import ItemRow from './ItemRow'

export default class PersonPanel extends React.Component {
    render() {
        const { person } = this.props
        // let totalPrice = 0
        // person.items.forEach(function(item){ totalPrice += (item.price*item.quantity) })

        const rows = [];
        let lastItem = null;
        this.props.person.items.forEach((item) => {
            // if (item.description.indexOf(filterText) === -1) {
            //   return;
            // }

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
            <div>
                <h3>{person.name} ID: {person.personId}</h3>
                {/* make this editable */}

                <button onClick={() => this.props.onDeletePerson(person.personId)}>Delete person</button>
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
                    </tbody>
                </table>
            </div>
        )
    }
}