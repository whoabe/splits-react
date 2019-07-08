import React from 'react'
import ProductRow from './ProductRow.js'

export default class ProductTable extends React.Component {
    render() {
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
                        key={item.description}
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
                <tbody>{rows}</tbody>
            </table>
        );
    }
}