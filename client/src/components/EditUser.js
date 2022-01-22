import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const EditUser = (props) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/${props.user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          //   value={getUser.name}
          onChange={handleChange}
          name="name"
          placeholder="Enter user"
          required
        ></Input>
      </FormGroup>
      <Button type="submit" style={{ marginRight: "2px" }}>
        Edit
      </Button>
      <Button type="submit" style={{ marginRight: "2px" }}>
        Delete
      </Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  );
};

export default EditUser;
