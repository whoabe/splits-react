import React from 'react';
import './App.css';
import UserTable from './UserTable'
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'
import PersonPanel from './PersonPanel'
/*
Structure

App
  -Search
  -Product Table
    -Product Row
    -*Manual add
  -Person Table
    -Person Row
  -User Table
    -User Row
*/

// const numberStyle = {
//   fontSize: 25,
//   // fontWeight: 'bold',
// }
// const panelStyle = {
//   width: 300,
//   borderRadius: '25px',
//   marginRight: '15px',
//   border: '2px solid black',
//   paddingLeft: '15px',
//   paddingRight: '15px',
// }

var items = [];
// items is a list of item objects
items.push({itemId: 1, price: 15.09, quantity: 1, description: 'Chic Teri Omu RC'});
items.push({itemId: 2, price: 1.13, quantity: 5, description: 'Green Tea'});
items.push({itemId: 3, price: 17.92, quantity: 1, description: 'Htt Spicy Pasta'});
items.push({itemId: 4, price: 16.04, quantity: 1, description: 'Sirloin S Pasta'});
items.push({itemId: 5, price: 10.38, quantity: 1, description: 'Kino Cream Pasta'});
items.push({itemId: 6, price: 16.98, quantity: 1, description: 'Sal Cream Pasta'});
items.push({itemId: 7, price: 2.83, quantity: 1, description: 'SD-Cream Soup'});

let personId = 0

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      items: [...items],
      persons: [],
      remainingItems: [...items],
      // set remainingItems to the items list
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleAddPersonClick= () => {
    const newPerson = {
      name: 'New Person',
      personId: personId++,
      items: []
    }
    // newPerson is an object with name: New Person, personId=personID++, and empty item list

    for (let index in this.state.items) {
        // this.state.items is referencing the items states list, not the items list
      newPerson.items.push({ 
        //   push adds an item into the array
        // add the food item as an array from state into the local items list for newPerson
        itemId: this.state.items[index].itemId, 
        quantity: 0,
        // everytime a new person is added, need to have all the items passed to them, but with 0 quantity
        description: this.state.items[index].description,
        price: this.state.items[index].price
      })
    }

    this.setState({
      persons: [...this.state.persons, newPerson]
    //   persons is a list with the previous persons and the new person
    })

  }

  handleDeletePerson = personId => { 

    var personsCopy = [...this.state.persons]; 
    var index = personsCopy.findIndex(personsCopy => personsCopy.personId === personId)
    if (index !== -1) {
      personsCopy.splice(index, 1);
      this.setState({persons: personsCopy}, () => {
        this.refreshRemainder()
      });
      // personId--;
    }

  }
  

  refreshRemainder = () => {
    // remainingItems is an array of the length of items, in this case, remainingItems = array[6]
    let remainingItems = [...this.state.remainingItems]

    for (let i = 0; i < remainingItems.length; i++) {

      let count = this.state.items[i].quantity

      for (let j = 0; j < this.state.persons.length; j++) {
        count -= this.state.persons[j].items[i].quantity

      }
      
      remainingItems[i] = { 
        itemId: this.state.items[i].itemId,
        description: this.state.items[i].description,
        price: this.state.items[i].price,
        quantity: count 
      }
    }

    this.setState({remainingItems})

  }

  handleAddCount = (personId, itemId) => {
    console.log(`Add count - itemId: ${itemId}, personId: ${personId}`)

    const persons = [...this.state.persons]
    // persons = a duplicate object of this.state.persons
  
    const personIndex = persons.findIndex(persons => persons.personId === personId)

    // find the person's index in persons array
    // array.findIndex(callback(element[, index[, array]])[, thisArg])

    persons[personIndex] = {...persons[personIndex]}

    const itemIndex = persons[personIndex].items.findIndex(item => item.itemId === itemId)


    if (this.state.remainingItems[itemIndex].quantity === 0) { return }

    persons[personIndex].items[itemIndex] = {...persons[personIndex].items[itemIndex]}

    persons[personIndex].items[itemIndex].quantity++

    this.setState({ persons })
    this.refreshRemainder()
  }


  handleReduceCount = (personId, itemId) => {
    console.log(`Reduce count - itemId: ${itemId}, personId: ${personId}`)

    const persons = [...this.state.persons]
    const personIndex = persons.findIndex(person => person.personId === personId)

    persons[personIndex] = {...persons[personIndex]}

    const itemIndex = persons[personIndex].items.findIndex(item => item.itemId === itemId)
    //Cannot read property 'findIndex' of undefined

    if (persons[personIndex].items[itemIndex].quantity === 0) { return }

    persons[personIndex].items[itemIndex] = {...persons[personIndex].items[itemIndex]}
    persons[personIndex].items[itemIndex].quantity--

    this.setState({ persons })
    this.refreshRemainder()
  }


  componentDidMount() {

  //   this.setState ({
  //     items:items
  //   }
  //   )
  }
  // if app mounted, then set the state of items to be items
  // will later need to get the data from an axios get from the flask server
  

  handleInput = (valueType, newValue, targetId) => {
    // items = JSON.parse(JSON.stringify(this.state.items))
    // var itemToChange = items.findIndex(p => p.itemId == targetId)
    // if (valueType === "description"){
    //   items[itemToChange].description = newValue
    // }]
    const items = this.state.items.map(item => ({
      ...item,
      [valueType]: item.itemId === targetId ? newValue : item[valueType]
    }))
    this.setState({items : items})
  }

  render() {

    // can add const { items, person, etc} = this.state 
    // and then remove this.state for the things in the return function

    return (
      <div>
        <SearchBar 
        filterText = {this.state.filterText}
        onFilterTextChange={this.handleFilterTextChange}/>

        <ProductTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        handleInput = {this.handleInput}/>

        <button onClick={this.handleAddPersonClick}>
          Add Person
        </button>

        {/* <PersonTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        /> */}

        {/* creates the PersonPanel for each person */}
        { this.state.persons.map((person, index) => 
            <PersonPanel 
              key = {index}
              person={person} 
              onDeletePerson={this.handleDeletePerson} 
              onAddCount={this.handleAddCount}
              onReduceCount={this.handleReduceCount}
              /> ) }

        <UserTable 
        handleInput = {this.handleInput}
        remainingItems={this.state.remainingItems} 
        filterText ={this.state.filterText}
        />

        
        {/* passing items to the following components as props */}
        

      </div>
    );
  }
}

class UserRow extends React.Component {
  render() {
    const remainingItem = this.props.remainingItem;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.description :
    //   <span style={{color: 'red'}}>
    //     {item.description}
    //   </span>;

    const UserQuantity = remainingItem.quantity
    // UserQuantity = total item quantity - other people's quantity
    const UserItemSubtotal = parseFloat((remainingItem.price * remainingItem.quantity).toFixed(2))

    return (
      <tr>
        <td>{remainingItem.description}</td>
        <td>{UserQuantity}</td>
        {/* this should be total quanity - sum(other people's quantities) */}
        <td>{remainingItem.price}</td>
        <td>{UserItemSubtotal}</td>
      </tr>
    );
  }
}


class UserTable extends React.Component {
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
          remainingItem={remainingItem}
          key={remainingItem.description} />
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
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------

class PersonPanel extends React.Component {
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
            key={item.description} 
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

class ItemRow extends React.Component {

  render() {
    const { item, personId } = this.props
    const itemSubtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        {/* Description */}
        <td>{item.description}</td>

        {/* Quantity +/- buttons */}
        <td>
          <button onClick={() => this.props.onAddCount(personId, item.itemId)}>+</button>

          <span>{item.quantity}</span>

          <button onClick={() => this.props.onReduceCount(personId, item.itemId)}>-</button>
        </td>

        {/* price */}
        <td>{item.price}</td>

        {/* subtotal */}
        <td>{itemSubtotal}</td>
      </tr>
    )
  }

}
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------
// ------------------------------------ ------------------------------------ ------------------------------------ ------------------------------------


class ProductRow extends React.Component {

  render() {
    const item = this.props.item;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.description :
    //   <span style={{color: 'red'}}>
    //     {item.description}
    //   </span>;

    const subtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{subtotal}</td>
      </tr>
    );
  }
}


class ProductTable extends React.Component {

  round5= (x) => {
    return Math.ceil(x/5)*5;
  }

  render() {

    const productSubtotal = parseFloat(((this.props.items.map(item => item.quantity * item.price)).reduce((a, b) => a + b, 0)).toFixed(2));
    const productTax = parseFloat((productSubtotal * 0.06).toFixed(2));
    const productTotal = parseFloat((productTax + productSubtotal).toFixed(2));
    const productRounding = parseFloat((this.round5(productTotal)-productTotal).toFixed(2));
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
          key={item.description} />
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
      </form>
    );
  }
}






export default App;
