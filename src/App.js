import React, { Component } from 'react';
import './App.css';
import random from 'random-name';

// first we will make a new context
const MyContext = React.createContext();

// App class is exported to index.js and holds all other classes inside it
//
class App extends Component {
  render() {
    return (
      <MyProvider>
        <div>
          <p>I am the app</p>
          <Family />
        </div>
      </MyProvider>
    );
  }
}

// MyProvider class called by App class and creates the Context for the app; all the children will be contained in MyProvider
// MyProvide provides context to children component via the value props
// Values provided to the children components as Context include the state as well as the growAYearOlder function
class MyProvider extends Component {
  state = {
    name: random(),
    age: 100,
    cool: true
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          growAYearOlder: () =>
            this.setState({
              age: this.state.age + 1,
              name: random()
            })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

// Family component is used by App alongside MyProvider and is rendered as a child of MyProvider
// This Family component is one consumer of the context created in MyProvider; namely, this consumes the age value from the state passed as Context
// The component is consumer here only to show the React Context can be consumer by multiple children; later on, Person component also consumes the same context value
const Family = props => (
  <div className="family">
    <MyContext.Consumer>
      {value => <h1>{value.state.age}</h1>}
    </MyContext.Consumer>
    <Person />
  </div>
);

// Person is rendered as child of the Family component
// This consumes the age value inside the context value props
// To do so, it first destructures the value props extracting the age value from the state passed to context value props
class Person extends Component {
  render() {
    return (
      <div className="person">
        <h1>Hermano!</h1>
        <MyContext.Consumer>
          {({ state: { age } }) => (
            <React.Fragment>
              <p>Age: {age}</p>
              <NameDisplay />
              <ButtonPress />
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

// Name Display is child of the Person component
// This consumes the name value from the context
// The overall value passed to the Context is destructred here; name is extracted from the value props as username
const NameDisplay = () => (
  <MyContext.Consumer>
    {({ state: { name: userName } }) => (
      <p className="paragraph">Name: {userName}</p>
    )}
  </MyContext.Consumer>
);

// ButtonPress is also a child of the Person component
// This component consumes the growAYearOlder passed as Context in the value props
const ButtonPress = () => (
  <MyContext.Consumer>
    {({ growAYearOlder }) => <button onClick={growAYearOlder}>🍰🍥🎂</button>}
  </MyContext.Consumer>
);

export default App;
