import React from 'react';
import './App.css';

const items = [
  {price: 15.09, quantity: 1, name: 'Chic Teri Omu RC'},
  {price: 1.13, quantity: 5, name: 'Green Tea'},
  {price: 17.92, quantity: 1, name: 'Htt Spicy Pasta'},
  {price: 16.04, quantity: 1, name: 'Sirloin S Pasta'},
  {price: 10.38, quantity: 1, name: 'Kino Cream Pasta'},
  {price: 16.98, quantity: 1, name: 'Sal Cream Pasta'}
];

class UserRow extends React.Component {
  render() {
    const item = this.props.item;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.name :
    //   <span style={{color: 'red'}}>
    //     {item.name}
    //   </span>;

    const UserQuantity = item.quantity
    // UserQuantity = total item quantity - other people's quantity
    const UserSubtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        <td>{item.name}</td>
        <td>{UserQuantity}</td>
        {/* this should be total quanity - sum(other people's quantities) */}
        <td>{item.price}</td>
        <td>{UserSubtotal}</td>
      </tr>
    );
  }
}


class UserTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
     

    const rows = [];
    let lastItem = null;
    
    this.props.items.forEach((item) => {
      if (item.name.indexOf(filterText) === -1) {
        return;
      }

      if (item.name !== lastItem) {
        rows.push(
          <UserRow
          item={item}
          key={item.name} />
        );
        lastItem = item.name
      }
    });

    return (
      <table>
        <thead>
        <h3>User/You</h3>
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
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------
class PersonRow extends React.Component {
  render() {
    const item = this.props.item;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.name :
    //   <span style={{color: 'red'}}>
    //     {item.name}
    //   </span>;

    const subtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        <td>{item.name}</td>
        <td>
          <button>
            +
          </button>
          <button>
            -
          </button>
        </td>
        <td>{item.price}</td>
        <td>{subtotal}</td>
      </tr>
    );
  }
}


class PersonTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];
    let lastItem = null;
    
    this.props.items.forEach((item) => {
      if (item.name.indexOf(filterText) === -1) {
        return;
      }

      if (item.name !== lastItem) {
        rows.push(
          <PersonRow
          item={item}
          key={item.name} />
        );
        lastItem = item.name
      }
    });

    return (
      <table>
        <thead>
        <h3>Person 1</h3>
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
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------


class ProductRow extends React.Component {
  render() {
    const item = this.props.item;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.name :
    //   <span style={{color: 'red'}}>
    //     {item.name}
    //   </span>;

    const subtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{subtotal}</td>
      </tr>
    );
  }
}


class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];
    let lastItem = null;
    
    this.props.items.forEach((item) => {
      if (item.name.indexOf(filterText) === -1) {
        return;
      }

      if (item.name !== lastItem) {
        rows.push(
          <ProductRow
          item={item}
          key={item.name} />
        );
        lastItem = item.name
      }
      // rows.push(
      //   <ProductRow
      //     item={item}
      //     key={item.name} />
      // );
      // lastItem = item.name;
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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input 
        type="text" 
        placeholder="Search..." 
        value = {this.props.filterText}
        onChange = {this.handleFilterTextChange}/>
        {/* <p>
          <input type="checkbox" />
          {' '}
          Only show items in stock
        </p> */}
      </form>
    );
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      items: [],
      people: 0,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleAddPersonClick= () => {
    this.setState({
      people: this.state.people + 1
    })
  }

  componentDidMount() {
    this.setState ({
      items:items
    }
    )
  }
  // if app mounted, then set the state of items to be items
  // will later need to get the data from an axios get from the flask server

  render() {
    return (
      <div>
        <SearchBar 
        filterText = {this.state.filterText}
        onFilterTextChange={this.handleFilterTextChange}/>

        <ProductTable 
        items={this.state.items} 
        filterText ={this.state.filterText}/>

        <button onClick={this.handleAddPersonClick}>
          Add Person
        </button>

        <PersonTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        />

        <UserTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        />

        
        {/* passing items to the following components as props */}
        

      </div>
    );
  }
}


export default App;
