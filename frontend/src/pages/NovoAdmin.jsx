import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { api } from "../service/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function NovoAdmin() {
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
          try {
            await api.post("usuario/novo", body);
            alert('Conta criada com sucesso!')
            history.replace('/')
          } catch (e) {
            setError(e.response.data);
          }
          setLoad(false)
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control name="nome" type="name" placeholder="Nome" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control name="senha" type="password" placeholder="Senha" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmação da senha</Form.Label>
          <Form.Control
            name="senhaConfirmacao"
            type="password"
            placeholder="Senha"
          />
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
