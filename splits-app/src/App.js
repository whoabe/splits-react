import React from 'react';
import './App.css';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import PersonPanel from './PersonPanel';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
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

// var items = [];
// // items is a list of item objects
// items.push({itemId: 1, price: 15.09, quantity: 1, description: 'Chic Teri Omu RC'});
// items.push({itemId: 2, price: 1.13, quantity: 5, description: 'Green Tea'});
// items.push({itemId: 3, price: 17.92, quantity: 1, description: 'Htt Spicy Pasta'});
// items.push({itemId: 4, price: 16.04, quantity: 1, description: 'Sirloin S Pasta'});
// items.push({itemId: 5, price: 10.38, quantity: 1, description: 'Kino Cream Pasta'});
// items.push({itemId: 6, price: 16.98, quantity: 1, description: 'Sal Cream Pasta'});
// items.push({itemId: 7, price: 2.83, quantity: 1, description: 'SD-Cream Soup'});

let personId = 0
// itemId will have to be changed after the hardcoded values above are removed.
let itemId = 1

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      items: [],
      persons: [],
      remainingItems: [],
      selectedFile: null,
      imageWidth: 0,
      imageHeight: 0,
      displayWidth: 0,
      displayHeight: 0,
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

  addRow = () => {
    const newItem = {
      itemId : itemId++,
      price: "",
      quantity: 0,
      description: ""
    }
    const tempItems = [...this.state.items, newItem]
    const tempRemainder = [...this.state.remainingItems, newItem]
    this.setState({
      items: tempItems,
      remainingItems: tempRemainder})
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
    const items = this.state.items.map(item => ({
      ...item,
      [valueType]: item.itemId === targetId ? newValue : item[valueType]
    }))



    this.setState({items : items}, ()=>this.refreshRemainder())
  }

  onChangeHandler = e => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('user_file', this.state.selectedFile)
    console.log(data)
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/detect/upload',
      data: data,
      headers: { 
        'content-type': 'multipart/form-data',
      }
    })
    .then((response) => {
      this.setState({imageUrl : response.data.url, imageWidth: parseInt(response.data.width), imageHeight: parseInt(response.data.height), receiptId: response.data.receiptId})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  imageCoordFinder = (e) => {
    var xCoordinate = parseInt(e.nativeEvent.offsetX);
    var yCoordinate = parseInt(e.nativeEvent.offsetY);
    const {imageWidth, imageHeight, displayHeight, displayWidth} = this.state
    xCoordinate = parseInt(xCoordinate*imageWidth/displayWidth)
    yCoordinate = parseInt(yCoordinate*imageHeight/displayHeight)
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/detect/${this.state.receiptId}`,
      data: `${xCoordinate}, ${yCoordinate}`,
      headers: { 
        'content-type': 'text/plain',
      }
    })
    .then((response) => {
      console.log(response)
      if (response.data!=='not found'){
        const newItem = {itemId : itemId++, price: response.data.unit_price, quantity: response.data.quantity, description: response.data.description}
        this.setState({items:[...this.state.items, newItem]})
        this.refreshRemainder()
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  onImgLoad = ({target:img}) => {
    this.setState({displayHeight:img.offsetHeight,
    displayWidth:img.offsetWidth});
  }

  render() {
    // can add const { items, person, etc} = this.state 
    // and then remove this.state for the things in the return function
    return (
      <div>
        <Row>
          <Col md="6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" name="file" onChange={this.onChangeHandler}/>
              <button type="button" onClick={this.onClickHandler}>Upload</button> 
            </div>
            {this.state.imageUrl !== "" ? <img src={this.state.imageUrl} id="pic" onLoad={this.onImgLoad} onClick={this.imageCoordFinder} alt="" style={{width:"100%"}}/> : null}
          </Col>
          <Col md="6">
            <SearchBar 
            filterText = {this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}/>

            <ProductTable 
              items={this.state.items} 
              filterText ={this.state.filterText}
              handleInput = {this.handleInput}
              addRow = {this.addRow}/>

            <button onClick={this.handleAddPersonClick}>
              Add Person
            </button>

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
          </Col>
        </Row>
          {/* passing items to the following components as props */}
          

      </div>
    );
  }
}






export default App;
