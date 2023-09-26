import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false, // Initially, editMode is set to false
      editedName: "",  // Initialize editedName state
      editedPhone: "", // Initialize editedPhone state
    };
  }

  // Function to handle entering edit mode
  handleEdit = () => {
    this.setState({
      editMode: true,
    });
  };

  // Function to handle changes in the edited name input field
  handleNameChange = (e) => {
    // console.log(e.target.value); // Uncomment for debugging
    this.setState({
      editedName: e.target.value,
    });
  };

  // Function to handle changes in the edited phone input field
  handlePhoneChange = (e) => {
    // console.log(e.target.value); // Uncomment for debugging
    this.setState({
      editedPhone: e.target.value,
    });
  };

  // Function to handle updating the contact information
  handleUpdateContact = async () => {
    const { editedName, editedPhone } = this.state;
    const { handleUpdate, id } = this.props;
    if (editedName && editedPhone) {
      await handleUpdate(editedName, editedPhone, id);
      this.setState({
        editMode: false, // Exit edit mode after updating
      });
    }
  };

  render() {
    const { name, contact, handleDelete, id } = this.props;
    const { editMode } = this.state;
    return (
      <li>
        <p className="name-container">
          {editMode ? (
            <input
              type="text"  // Input type is text for name
              placeholder="Name..."
              onChange={this.handleNameChange}
              required
            />
          ) : (
            name  // Display the name as text
          )}
        </p>
        <p className="phone-container">
          {editMode ? (
            <input
              type="number"  // Input type is number for phone
              placeholder="Phone..."
              onChange={this.handlePhoneChange}
              required
            />
          ) : (
            contact  // Display the contact as text
          )}
        </p>
        <p className="btns-container">
          {editMode ? (
            <img
              className="list-btn"
              onClick={this.handleUpdateContact}
              src="https://cdn-icons-png.flaticon.com/512/1688/1688988.png"
              alt="submit-edit"
            />
          ) : (
            <img
              className="list-btn"
              onClick={this.handleEdit}
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              alt="edit-btn"
            />
          )}
          <img
            className="list-btn"
            onClick={() => handleDelete(id)}
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt="delete-btn"
          />
        </p>
      </li>
    );
  }
}

export default ListItem;
