import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleSubmit = () => {
        const role = login(email, password);
        if(role === "admin") navigate("/admin/dashboard");
        if(role === "customer") navigate("/customer/dashboard");
    };

  return (
    <div style={{padding: "40px"}}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button onClick={handleSubmit}>Login</button>
    </div>
    );
};

export default Login;