import React from 'react';
import './App.css';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import PersonPanel from './PersonPanel';
import axios from 'axios';
import { Col, Row, Container } from 'reactstrap';
import loading from './loadingcolorbar.gif';
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
      remainingItems: [...items],
      rounding: 0,
      emailModal: false,
      data: [],
      user: [],
      selectedPerson: {},
      subtotal: 0,
      tax: 0,
      total: 0,
      selectedFile: null,
      imageWidth: 0,
      imageHeight: 0,
      displayWidth: 0,
      displayHeight: 0,
      loaded: 0,
      // set remainingItems to the items list
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  // round5= (x) => {
  //   return Math.ceil(x/5)*5;
  //   }

  // roundingFunction = () => {
  //   let rounding2 = this.state.rounding
  //   let subtotal2 = this.state.subtotal
  //   let subtotTotal = 0

  //   for (let i = 0; i < this.state.items.length; i++) {
      
  //     subtotal2 = (parseFloat((this.state.items[i].quantity).toFixed(2))) * (parseFloat((this.state.items[i].price).toFixed(2)));
  //     // parseFloat(string) returns an float
  //     subtotTotal += subtotal2

  //   }
  //   // console.log('subtotal ' + subtotal2)
  //   let tax = parseFloat((subtotTotal*0.06).toFixed(2));

  //   // console.log('tax ' + tax)
  //   let total = tax + subtotTotal;
  //   // console.log('total ' + total)
  //   let roundedTotal = Math.ceil(total/5)*5;
  
  //   rounding2 = parseFloat((roundedTotal-total).toFixed(2));
  //   this.setState({
  //     rounding: rounding2, subtotal: subtotal2
    
  //   })
  // }
  

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleAddPersonClick= () => {
    const newPerson = {
      name: 'New Person',
      personId: personId++,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
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


  // handleSendPersonEmail
  handleSendPersonEmail = (person) => {
    
    // want to pass the person's id to EmailModal
    // var personsCopy = [...this.state.persons];
    // var index = personsCopy.findIndex(personsCopy => personsCopy.personId === personId)
    // const personIndex = persons.findIndex(persons => persons.personId === personId)
    this.setState(prevState => ({
      emailModal: !prevState.emailModal,
      selectedPerson: person
    })); 
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
      // this.round()
      user.items = [...this.state.remainingItems]
      this.setState({ user })
    });

// want this.state.user.items to be equal to remainingItems
    
  }

  subtotalFunction = (personId) => {

    let subtotal = this.state.subtotal
    let tax = this.state.tax
    let total = this.state.total
    const persons = [...this.state.persons]

    let personIndex = persons.findIndex(persons => persons.personId === personId)
    
    // pass personid to find the correct person, 
    persons[personIndex] = {...persons[personIndex]}
    // persons[personIndex] is the person you are changing
    // persons[personIndex] is a duplicate of the person you are changing

    // let personItems = persons[personIndex].items

    // run the calcs to find the subtotal, tax, total
      

    for (let i = 0; i < persons[personIndex].items.length; i++) { 
      if (persons[personIndex].items[i].quantity > 0) {
        subtotal += parseFloat((persons[personIndex].items[i].quantity * persons[personIndex].items[i].price).toFixed(2))
      }
    }
    tax = parseFloat((subtotal * 0.06).toFixed(2))
    total = parseFloat((subtotal + tax).toFixed(2))

    persons[personIndex].subtotal = subtotal
    persons[personIndex].tax = tax
    persons[personIndex].total = total

    // setstate on the subtotal, tax, total, and persons
    this.setState({ persons })
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

    this.setState({ persons }, () => this.subtotalFunction(personId))
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

    this.setState({ persons }, () => this.subtotalFunction(personId))
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



  // round = () => {
  //   this.roundingFunction()
  // }
  // if app mounted, then set the state of items to be items
  // will later need to get the data from an axios get from the flask server
  

  handleInput = (valueType, newValue, targetId) => {
    const items = this.state.items.map(item => ({
      ...item,
      [valueType]: item.itemId === targetId ? newValue : item[valueType]
    }))



    this.setState({items : items}, ()=>this.refreshRemainder())
  }

  componentDidMount() {

    // this.round()
    let user = {
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
  onChangeHandler = e => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('user_file', this.state.selectedFile)
    //to make loading screen appear lol
    this.setState({loaded:0.1})
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/detect/upload',
      data: data,
      headers: { 
        'content-type': 'multipart/form-data',
      }
    })
    .then((response) => {
      this.setState({imageUrl : response.data.url, imageWidth: parseInt(response.data.width), imageHeight: parseInt(response.data.height), receiptId: response.data.receiptId, loaded: 1})
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
    const { items, imageUrl, loaded, filterText, persons, remainingItems } = this.state
    const { onChangeHandler, onClickHandler, onImgLoad, imageCoordFinder, addRow, handleFilterTextChange, handleInput, handleAddPersonClick, handleDeletePerson, handleAddCount,
      handleReduceCount } = this
    return (
      <div>
        <Row>
          <Col md="6" style={{'height': '100vh'}} className="d-flex justify-content-center align-items-center">
            {
              !imageUrl && loaded === 0
            ? 
              <Container>
                <div className="form-group files d-flex flex-column justify-context-center">
                  <label>Upload Your File </label>
                  <input type="file" name="file" onChange={onChangeHandler}/>
                  <button type="button" className="btn btn-success justify-self-between" onClick={onClickHandler}>Upload</button> 
                </div>
              </Container>
            :
              <div>
                {loaded !== 1
                ? 
                  <Container className="d-flex justify-content-center align-items-center"> 
                    <img src={loading} alt=""/>
                  </Container>
                : 
                  <div style={{overflowY: 'auto'}}>
                    <img src={imageUrl} id="pic" onLoad={onImgLoad} onClick={imageCoordFinder} alt="" style={{width:"100%"}}/>
                  </div>
                }
              </div>
            }
          </Col>
          <Col md="6">
            <SearchBar 
            filterText = {filterText}
            onFilterTextChange={handleFilterTextChange}/>

            <ProductTable 
              items={items} 
              filterText ={filterText}
              handleInput = {handleInput}
              addRow = {addRow}/>

            <button onClick={handleAddPersonClick}>
              Add Person
            </button>

            {/* creates the PersonPanel for each person */}
            { persons.map((person, index) => 
                <PersonPanel 
                  key = {index}
                  person={person} 
                  onDeletePerson={handleDeletePerson} 
                  onAddCount={handleAddCount}
                  onReduceCount={handleReduceCount}
                  /> ) }

            <UserTable 
              handleInput = {handleInput}
              remainingItems={remainingItems} 
              filterText ={filterText}
            />
          </Col>
        </Row>
          {/* passing items to the following components as props */}
        <EmailModal 
          emailModal={this.state.emailModal} 
          toggleEmailModal={this.handleSendPersonEmail} 
          selectedPerson = {this.state.selectedPerson}
        />

      </div>
    );
  }
}






export default App;
