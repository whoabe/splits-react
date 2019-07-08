import React from 'react';
import './App.css';

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

const numberStyle = {
  fontSize: 25,
  // fontWeight: 'bold',
}
// const panelStyle = {
//   width: 300,
//   borderRadius: '25px',
//   marginRight: '15px',
//   border: '2px solid black',
//   paddingLeft: '15px',
//   paddingRight: '15px',
// }

var items = [];
items.push({itemId: 1, price: 15.09, quantity: 1, description: 'Chic Teri Omu RC'});
items.push({itemId: 2, price: 1.13, quantity: 5, description: 'Green Tea'});
items.push({itemId: 3, price: 17.92, quantity: 1, description: 'Htt Spicy Pasta'});
items.push({itemId: 4, price: 16.04, quantity: 1, description: 'Sirloin S Pasta'});
items.push({itemId: 5, price: 10.38, quantity: 1, description: 'Kino Cream Pasta'});
items.push({itemId: 6, price: 16.98, quantity: 1, description: 'Sal Cream Pasta'});

// instead of using itemId, what if we used index?

let personId = 0

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      items: items,
      persons: [],
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

// have the delete person in the person's table
  handleDeletePerson = personId => {
    const persons = this.state.persons.filter(p => p.personId !== personId)
    this.setState({ persons: persons })
    // need to figure out what to splice/filter

  }
  // removeItem(itemIndex) {
  //   todoItems.splice(itemIndex, 1);
  //   this.setState({ todoItems: todoItems });
  // }

  // handleAddCount = (personId, itemId) => {
  //   console.log('Add count - itemId: ${foodId}, personId: $personId}')

  //   const persons = {...this.state.persons}
  //   const personIndex = persons.findIndex(person => person.personId == personId)

  //   persons[personIndex] = {...persons[personIndex]}
  //   const foodIndex = persons[personIndex].foods.findIndex(item => item.itemId == itemId)

  //   // if (this.state.remainingFood[foodIndex].quantity == 0) { return }

  //   persons[personIndex].foods[foodIndex] = {...persons[personIndex].items[itemIndex]}
  //   persons[personIndex].items[itemIndex].quantity++

  //   this.setState({ persons })
  //   // this.refreshRemainder()
  // }



  // componentDidMount() {
  //   this.setState ({
  //     items:items
  //   }
  //   )
  // }
  // if app mounted, then set the state of items to be items
  // will later need to get the data from an axios get from the flask server

  render() {

    // var peep = this.state.people.map((pee, personId) => {
    //   return (
    //     React.createElement(PersonTable, { key: personId, peep:peep})
    //   );
    // })

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

        {/* <PersonTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        /> */}

        { this.state.persons.map(person => 
            <PersonPanel 
              person={person} 
              onDeletePerson={this.handleDeletePerson} 
              onAddCount={this.handleAddCount}
              onReduceCount={this.handleReduceCount}
              /> ) }

        <UserTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        />

        
        {/* passing items to the following components as props */}
        

      </div>
    );
  }
}

class UserRow extends React.Component {
  render() {
    const item = this.props.item;
    // const name = item.stocked ?
    // // if item stocked is not true, then color the name red
    //   item.description :
    //   <span style={{color: 'red'}}>
    //     {item.description}
    //   </span>;

    const UserQuantity = item.quantity
    // UserQuantity = total item quantity - other people's quantity
    const UserSubtotal = parseFloat((item.price * item.quantity).toFixed(2))

    return (
      <tr>
        <td>{item.description}</td>
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
      if (item.description.indexOf(filterText) === -1) {
        return;
      }

      if (item.description !== lastItem) {
        rows.push(
          <UserRow
          item={item}
          key={item.description} />
        );
        lastItem = item.description
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
// class PersonRow extends React.Component {
//   render() {
//     const item = this.props.item;
//     // const name = item.stocked ?
//     // // if item stocked is not true, then color the name red
//     //   item.description :
//     //   <span style={{color: 'red'}}>
//     //     {item.description}
//     //   </span>;

//     const subtotal = parseFloat((item.price * item.quantity).toFixed(2))

//     return (
//       <tr>
//         <td>{item.description}</td>
//         <td>
//           <button>
//             +
//           </button>
//           <span style={numberStyle}>{item.quantity}</span>
//           <button>
//             -
//           </button>
//         </td>
//         <td>{item.price}</td>
//         <td>{subtotal}</td>
//       </tr>
//     );
//   }
// }


// class PersonTable extends React.Component {
//   render() {
//     const filterText = this.props.filterText;
    
//     const rows = [];
//     let lastItem = null;

//     // const { person } = this.props
//     // the array: person is passed in as a this.props.person
//     // let subTotal = 0
//     // // initialize subTotal
//     // person.items.forEach(function(item){ subTotal += (item.price*item.quantity) })
//     // // the subtotal is equal to the sum of each product of price*quantity
    
//     this.props.items.forEach((item) => {
//       if (item.description.indexOf(filterText) === -1) {
//         return;
//       }

//       if (item.description !== lastItem) {
//         rows.push(
//           <PersonRow
//           item={item}
//           key={item.description} />
//         );
//         lastItem = item.description
//       }
//     });

//     return (

//       // do an array.map for the people in people
//       // NameArray.map((item, key)

//       <table>
//         <thead>
//         {/* <p>ID: {person.personId}</p> */}
//         {/* <button onClick={() => this.props.onDeletePerson(person.personId)}>Delete person</button> */}
//           <tr>
//             <th>Item</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Subtotal</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }

class PersonPanel extends React.Component {
  render() {
    // const { person } = this.props
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
      </tbody>
    </table>
    
    
    // <div style={panelStyle}>
    // <div>
    //   <p>ID: {person.personId}</p>
    //   <p>{person.name}</p>
    //   <button onClick={() => this.props.onDeletePerson(person.personId)}>Delete person</button>
    //   { person.items.map(item => 
    //       <ItemRow 
    //         personId={person.personId} 
    //         item={item} 
    //         onAddCount={this.props.onAddCount}
    //         onReduceCount={this.props.onReduceCount}
    //       />)}
    //   <h5>Total Price: {totalPrice}</h5>
    // </div>
    
// <div>
//   <p>ID: {person.personId}</p>
//   <p>{person.name}</p>
//   <button onClick={() => this.props.onDeletePerson(person.personId)}>Delete person</button>


//   { person.items.map(item => 
//       <ItemRow 
//         personId={person.personId} 
//         item={item} 
//         onAddCount={this.props.onAddCount}
//         onReduceCount={this.props.onReduceCount}
//       />)}

//   <h5>Total Price: {totalPrice}</h5>

// </div>
    )
      
  }
}

class ItemRow extends React.Component {

  render() {
    const { item, personId } = this.props

    return (
      <tr>
        <td>{item.description}</td>
        <td>
          <button>+</button>
          <span>{item.quanity}</span>
          <button>-</button>
        </td>
        <td>{item.price}</td>
        {/* <td>{subtotal}</td> */}
      </tr>


      // <React.Fragment>

      //   <p>{item.description} - Unit price {item.price}</p>

      //   <button onClick={() => this.props.onReduceCount(personId, item.itemId)}>-</button>

      //   <span style={numberStyle}>{item.quantity}</span>

      //   <button onClick={() => this.props.onAddCount(personId, item.itemId)}>+</button>

      //   <span> Total price </span> <span style={numberStyle}> {item.price * item.quantity}</span>

      // </React.Fragment>
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
          key={item.description} />
        );
        lastItem = item.description
      }
      // rows.push(
      //   <ProductRow
      //     item={item}
      //     key={item.description} />
      // );
      // lastItem = item.description;
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






export default App;
