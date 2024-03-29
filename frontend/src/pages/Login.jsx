import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { api } from "../service/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authState } from "../store/auth";

export function Login() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  return (
    <Container fluid={"md"} className="mt-4">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoad(true);
          const formData = new FormData(e.target);
          const body = {};
          formData.forEach((value, key) => (body[key] = value));
          try {
            const res = await api.post("auth/signin", body);
           authState.logged = true;
            authState.type = res.data.type
          } catch (e) {
            setError(e.response.data);
          }
          setLoad(false);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control name="senha" type="password" placeholder="Senha" />
        </Form.Group>
        <Button
          disabled={load}
          variant="primary"
          type="submit"
          className="mb-3"
        >
          Entrar
        </Button>{" "}
        {load && <Spinner animation="border" />}
        {!!error && (
          <Alert variant={"danger"} dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
}
