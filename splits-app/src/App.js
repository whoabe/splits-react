import React from 'react';
import './App.css';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import PersonPanel from './PersonPanel';
import EmailModal from './EmailModal';

// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   TelegramShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
// } from 'react-share';
// react-share is for sharing url, to be added in if there is time
// https://github.com/nygardk/react-share

/*
Structure

App
  -Search
  -Product Table
    -Product Row
    -*Manual add
  -PersonPanel
    -Item Row
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
      rounding: 0,
      emailModal: false,
      subtotal: 0,
      data: [],
      user: [],
      // set remainingItems to the items list
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  // round5= (x) => {
  //   return Math.ceil(x/5)*5;
  //   }

  roundingFunction = () => {
    let rounding2 = this.state.rounding
    let subtotal2 = this.state.subtotal
    let subtotTotal = 0

    for (let i = 0; i < this.state.items.length; i++) {
      
      subtotal2 = (parseFloat((this.state.items[i].quantity).toFixed(2))) * (parseFloat((this.state.items[i].price).toFixed(2)));
      // parseFloat(string) returns an float
      subtotTotal += subtotal2

    }
    console.log('subtotal ' + subtotal2)
    let tax = parseFloat((subtotTotal*0.06).toFixed(2));

    console.log('tax ' + tax)
    let total = tax + subtotTotal;
    console.log('total ' + total)
    let roundedTotal = Math.ceil(total/5)*5;
  
    rounding2 = parseFloat((roundedTotal-total).toFixed(2));
    this.setState({
      rounding: rounding2, subtotal: subtotal2
    
    })
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
      persons: [...this.state.persons, newPerson],
      data: [...this.state.data, newPerson]
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

    const user = {...this.state.user}

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
    
    
    this.setState({remainingItems}, () => {
      this.round()
      user.items = [...this.state.remainingItems]
      this.setState({ user })
    });
// want this.state.user.items to be equal to remainingItems
    
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

  toggleEmailModal = () => {
    this.setState(prevState => ({
      emailModal: !prevState.emailModal
    })); 
  }

  round = () => {
    this.roundingFunction()
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
    this.setState({items : items}, ()=>this.refreshRemainder())
  }

  componentDidMount() {

    this.round()
    const user = {
      name: 'You/User',
      userId: 0,
      items: [...items]
    }
    // add user into user state here
    this.setState({
      user: user,
      data: [...this.state.data, user]
    //   persons is a list with the previous persons and the new person
    })
  }
  componentDidUpdate() {
    // console.log("data "+JSON.stringify(this.state.data))
    // console.log("persons "+JSON.stringify(this.state.persons))
    // console.log("user.items " +JSON.stringify(this.state.user.items))
   
  }

  render() {

    // can add const { items, person, etc} = this.state 
    // and then remove this.state for the things in the return function

    return (
      <>
        {/* <button onClick={this.round}>Round</button> */}
        <SearchBar 
        filterText = {this.state.filterText}
        onFilterTextChange={this.handleFilterTextChange}/>

        <ProductTable 
        items={this.state.items} 
        filterText ={this.state.filterText}
        handleInput = {this.handleInput}
        rounding = {this.state.rounding}/>

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
              rounding={this.state.rounding}
              /> ) }

        <UserTable 
          handleInput = {this.handleInput}
          remainingItems={this.state.remainingItems} 
          filterText ={this.state.filterText}
          rounding={this.state.rounding}
        />

        
        {/* passing items to the following components as props */}
        
        <button onClick = {this.toggleEmailModal}>Send Email</button>
        <EmailModal 
          emailModal={this.state.emailModal} 
          toggleEmailModal={this.toggleEmailModal} 
          data = {this.state.data}
        />
      </>
    );
  }
}






export default App;
