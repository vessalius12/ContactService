import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contact, setContact] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchContact, setSearchContact] = useState("");

  useEffect(() => {
    retrieveContact();
  }, []);

  const onChangeSearchContact = e => {
    const searchContact = e.target.value;
    setSearchContact(searchContact);
  };

  const retrieveContact = () => {
    ContactDataService.getAll()
      .then(response => {
        setContact(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveContact();
    setCurrentContact(null);
    setCurrentIndex(-1);
  };

  const setActiveContact = (contact, index) => {
    setCurrentTutorial(contact);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByContact = () => {
    ContactDataService.findByContact(searchContact)
      .then(response => {
        setContact(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by contact"
            value={searchContact}
            onChange={onChangeSearchContact}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByContact}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Contact List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((contact, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveContact(contact, index)}
                key={index}
              >
                {contact.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllContact}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Contact</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentContact.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/contact/" + currentContact.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contact...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;