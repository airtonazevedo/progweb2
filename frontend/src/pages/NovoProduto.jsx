import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { api } from "../service/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function NovoProduto() {
  const history = useHistory()
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  return (
    <Container fluid={"md"} className="mt-4">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoad(true)
          const formData = new FormData(e.target);
          const body = {};
          formData.forEach((value, key) => (body[key] = value));
          console.log(body)
          try {
            await api.post("produto/novo", body);
            alert('Produto adicionado!')
            history.replace('/')
          } catch (e) {
            setError(e.response.data);
          }
          setLoad(false)
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control name="nome" type="name" placeholder="nome" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control step="any" name="preco" type="number" placeholder="preço" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estoque</Form.Label>
          <Form.Control name="estoque" type="number" placeholder="estoque" />
        </Form.Group>

        <Button disabled={load} variant="primary" type="submit" className="mb-3">
          Salvar 
        </Button> {load && <Spinner animation="border" />}
        {!!error && (
          <Alert variant={"danger"} dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
}
