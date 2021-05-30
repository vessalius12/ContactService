
import React, { useState } from "react";
import ContactService from "../services/ContactService";

const AddContact = () => {
  const initialContactState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [Contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setContact({ ...Contact, [name]: value });
  };

  const saveContact = () => {
    var data = {
      title: Contact.title,
      description: Contact.description
    };

    ContactDataService.create(data)
      .then(response => {
        setContact({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newContact = () => {
    setContact(initialContactState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newContact}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Contact</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Contact.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Contact.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveContact} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContact;