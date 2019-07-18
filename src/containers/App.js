import React, { Component } from 'react';
import classes from './App.module.css';
import Person from '../components/Persons/Person/Person';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

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

    let persons = null;
    let btnClass = null;

    if (this.state.showPersons) {
      persons = (
        // use jsx format here
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
              </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.Red
    }

    // add and assign classes dinamically
    const assClasses = [];
    if (this.state.persons.length <= 2) {
      assClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assClasses.push(classes.bold);
    }


    return (
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assClasses.join(' ')}>This is really working!</p>
          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
  };
};

export default App;