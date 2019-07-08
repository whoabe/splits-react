import React from 'react';

export default class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    handleChange = (e) => {
        this.props.handleInput(e.target.name, e.target.value, this.props.item.itemId);
    }

    render() {
        const {item} = this.props;
        // const name = item.stocked ?
        // // if item stocked is not true, then color the name red
        //   item.description :
        //   <span style={{color: 'red'}}>
        //     {item.description}
        //   </span>;

        const subtotal = parseFloat((item.price * item.quantity).toFixed(2))

        return (
        <tr>
            <td>
                <input 
                    name = 'description'
                    value={item.description}
                    onChange={this.handleChange}/>
            </td>
            <td>
                <input
                    name = 'quantity'
                    size="2rem"
                    value={item.quantity}
                    onChange={this.handleChange}/>
            </td>
            <td>
                <input 
                    name='price'
                    size="2rem"
                    value = {item.price}
                    onChange={this.handleChange}/>
            </td>
            <td>{subtotal}</td>
        </tr>
        );
    }
}