import React from 'react';
import './App.css';

// const ITEMS = [
//   {unit_price:'15.09', quantity:'1', name:'Chic Teri Omu RC'},
//   {unit_price:'1.13', quantity:'5', name:'Green Tea'},
//   {unit_price:'17.92', quantity:'1', name:'Htt Spicy Pasta'},
//   {unit_price:'16.04', quantity:'1', name:'Sirloin S Pasta'},
//   {unit_price:'10.38', quantity:'1', name:'Kino Cream Pasta'},
//   {unit_price:'16.98', quantity:'1', name:'Sal Cream Pasta'},
// ];

// // have a bunch of items with itemname, unit price, 
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: ITEMS,
//     };
//   }
//   render() {
//     // render returns what you want to see on the screen
//     return (
//       <div>
//         {/* <SearchBar /> */}
//         <Tabulated items={this.props.items} />
//         {/* passing props with the value items to tabulated*/}
//       </div>
//     );
//   }
// }

// // -------------------------------------------------
// // -------------------------------------------------
// class Tabulated extends React.Component { 
//   render() {
//     const rows = [];
//     let lastItem = null;
    
    
//     this.props.items.forEach((item) => {
//       if (item.name !== lastItem) {
//         rows.push(
//           <TabulatedItemRow
//             name={item.name}
//             key={item.name} />
//         );
//         lastItem = item.name;
//       }
//       // rows.push(
//       //   <TabulatedItemRow
//       //     item={item}
//       //     key={item.name} />
//       // );
//       // lastItem = item.name;
//     });

//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }

// // class ProductCategoryRow extends React.Component {
// //   render() {
// //     const category = this.props.category;
// //     return (
// //       <tr>
// //         <th colSpan="2">
// //           {category}
// //         </th>
// //       </tr>
// //     );
// //   }
// // }

// class TabulatedItemRow extends React.Component {
//   render() {
//     const item = this.props.item;
//     const name = item.stocked ?
//       item.name :
//       <span style={{color: 'red'}}>
//         {item.name}
//       </span>;

//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{item.price}</td>
//       </tr>
//     );
//   }
// }
// -------------------------------------------------
// -------------------------------------------------

// class Person extends React.Component {
//   render() {
//     const rows = [];
//     let lastItem = null;
    
//     this.props.items.forEach((item) => {
//       if (item.category !== lastItem) {
//         rows.push(
//           <itemCategoryRow
//             category={item.category}
//             key={item.category} />
//         );
//       }
//       rows.push(
//         <itemRow
//           item={item}
//           key={item.name} />
//       );
//       lastItem = item.category;
//     });

//     return (
//       <table>
//         <thead>
//           <tr>
//             <td>{name}</td>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }

// class You extends React.Component {
//   // takes in item name, unit price from app
// }

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search" />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {PRODUCTS},
    };
  }
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


export default App;
