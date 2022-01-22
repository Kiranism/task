import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input } from "reactstrap";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data);
    if (data.status === "ok") {
      navigate("/");
    } else {
      alert("check credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <Link to="/signup" className="btn btn-link">
          Create an account
        </Link>
        <br />
        <Input type="submit" value="Login" className="btn btn-success ml-2" />
      </Form>
    </div>
  );
};

export default Login;
