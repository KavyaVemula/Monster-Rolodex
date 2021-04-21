import logo from './logo.svg';
import './App.css';
import React from 'react';
import {CardList} from './Components/Cards/card-list.component';
import {SearchBox} from './Components/Search/search-box.component';

class App extends React.Component {
  constructor() {
    // Calling "Component" that we extended so we can use it's attributes/functions
    super();

    this.state = {
      monsters:[],
      SearchField: ""
    };

    // Below line is used to bind "this" context to the function. After this line, function will have access to Class's context
    // But, writing this for each function can be tedious, hence, arrow functions automatically do that.
    // If you write handleChangeFunction as given in line 34, we don't have to explicitly bind the context -> Lexical Scoping.
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(res => this.setState({ monsters: res }));
  }

  /** If you write a function like this without using arrow function, you will have to bind the context explicitly 
  handleChange(e) {
    this.setState({SearchField: e.target.value});
  } */

  handleChange = (e) => {
    this.setState({SearchField: e.target.value});
  }

  render() {
    // const {monsters,searchField} = this.state; - This is a way to store state object into constants
    const filteredState = this.state.monsters.filter(monster => monster.name.toLowerCase().includes(this.state.SearchField.toLowerCase()));
    return(
      
      <div className = "App">
        
        <SearchBox placeholder = "Search For Monsters" handleChange = {this.handleChange}>
        {/* handleChange = {
          e => {
            this.setState({SearchField: e.target.value}, () => {
              console.log(this.state)
            }); */}
        </SearchBox>
        <CardList key={this.state.monsters.id} monsters={filteredState}></CardList>
        
      </div>
    )
    
  }
}

export default App;
