import React, { Component } from 'react';
import './App.css';
// import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asd1', name: 'Max', age: 28 },
      { id: 'asd2', name: 'Manu', age: 29 },
      { id: 'asd3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // create a copy of object to not overwrite the original.
    // const person = Object.assign({}, this.state.persons[personIndex]);
    const person = {
      ...this.state.persons[personIndex]
    };

    // update the name of person with the content of input
    person.name = event.target.value;

    // update the array in the current position
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  deletePersonHandler = (personIndex) => {
    // copy whole person to manupulate and keep the old version
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    // / !doesShow works like toggle, makke the oposit of current set. If is false make true...
    this.setState({showPersons: !doesShow});
  }

  render() {
    // **** here is no jsx is normal javascript ***

    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: 'none',
      padding: '1rem 4rem',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold'
      // ':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        // use jsx format here
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    // add and assign classes dinamically
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }


    return (
      // <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggler Persons</button>
          {persons}
        </div>
      // </StyleRoot>
    );
  };
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
};

// export default Radium(App);
export default App;