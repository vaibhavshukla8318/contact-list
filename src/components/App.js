import React from "react";
import ListItem from "./ListItem";
import AddContacts from "./AddContact";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  // This method is called when the component is mounted in the DOM.
  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log("current state", this.state);
  }

  // Delete a contact by sending a DELETE request to the API.
  handleDeleteContact = async (id) => {
    let { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    let updatedUsers = users.filter((user) => user.id !== id);

    this.setState({
      users: updatedUsers,
    });
  };

  // Update a contact by sending a PUT request to the API.
  handleUpdateContact = async (name, phone, id) => {
    const { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        phone,
        name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Data from updation of contact", json));

    let updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });

    this.setState({
      users: updatedUsers,
    });
  };

  // Add a new contact by sending a POST request to the API.
  handleAddContact = async (name, phone) => {
    let id = Date.now(); // generating a unique id using date
    const { users } = this.state;
    const url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("ADD CONTACT", json));

    let updatedUsers = [{ name, phone, id }].concat(users);

    this.setState({
      users: updatedUsers,
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <AddContacts addContact={this.handleAddContact} />
        <div id="contact-list-container">
          <header>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7945/7945054.png"
              alt="contact-icon"
            ></img>
            <h1>My Contacts List</h1>
          </header>

          <ul>
            {users.length === 0 ? (
              <h1>Loading....</h1>
            ) : (
              users.map((user) => {
                return (
                  <ListItem
                    name={user.name}
                    contact={user.phone}
                    key={user.id}
                    id={user.id}
                    handleDelete={this.handleDeleteContact}
                    handleUpdate={this.handleUpdateContact}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
