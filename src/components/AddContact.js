import React, { Component } from "react";

class AddContacts extends Component {
  constructor() {
    super();
    // Initialize the component's state with empty name and phone values
    this.state = {
      name: "",
      phone: "",
    };
  }

  // Handle changes in the input fields and update the corresponding state
  handleChange = (inputType, e) => {
    if (inputType === "name") {
      this.setState({
        name: e.target.value,
      });
      return;
    }
    this.setState({
      phone: e.target.value,
    });
  };

  // Handle the form submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { addContact } = this.props;

    // Check if both name and phone are provided before calling the addContact function
    if (name && phone) {
      addContact(name, phone);

      // Reset the input fields to empty after submitting
      this.setState({
        name: "",
        phone: "",
      });
    }
  };

  render() {
    const { name, phone } = this.state;
    return (
      <div id="add-contacts-container">
        <h1>Add Contact</h1>
        <form>
          {/* Input field for entering the contact's name */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => this.handleChange("name", e)}
          />
          {/* Input field for entering the contact's phone number */}
          <input
            type="number"
            placeholder="Enter Phone"
            value={phone}
            required
            onChange={(e) => this.handleChange("phone", e)}
          />
          <br />
          {/* Button to submit the form */}
          <button onClick={this.handleSubmit}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1057/1057240.png"
              alt="add-button"
            />
          </button>
        </form>
      </div>
    );
  }
}

export default AddContacts;
