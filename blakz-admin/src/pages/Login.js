import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("/api/login", { correo, contraseña })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error en el login", error);
      });
  };

  return (
    <Container>
      <h1>Iniciar sesión</h1>
      <TextField
        label="Correo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Iniciar sesión
      </Button>
    </Container>
  );
};

export default Login;
    