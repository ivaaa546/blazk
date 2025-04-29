import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    axios.get("/api/articulos")
      .then((res) => {
        setArticulos(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Artículos</h1>
      <Button variant="contained" color="primary" component={Link} to="/articulos/crear">
        Crear Artículo
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articulos.map((articulo) => (
              <TableRow key={articulo.id}>
                <TableCell>{articulo.titulo}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">Editar</Button>
                  <Button variant="contained" color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Articulos;
