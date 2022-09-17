import { useEffect } from "react";
import { api } from "../service/api";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useHistory } from "react-router-dom";
import { cartState } from "../store/cart";
import { authState } from "../store/auth";
export function Carrinho() {
  const authSnap = useSnapshot(authState);
  const cartSnap = useSnapshot(cartState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  return (
    <Container fluid={"md"} className="mt-4">
      <h1>Carrinho</h1>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Quantidade</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {cartSnap.produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco}</td>
              <td>{p.estoque}</td>
              <td>{p.quantidade}</td>
              <td>
                <Button
                  onClick={() => {
                    const cartCopy = [...cartSnap.produtos];
                    const index = cartCopy.findIndex((i) => i.id === p.id);
                    if (index !== -1) {
                      cartCopy.splice(index, 1);
                      cartState.produtos = [...cartCopy];
                    }
                  }}
                  variant="light"
                >{`Remover`}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Total:
        {cartSnap.produtos.reduce((ac, p) => ac + p.preco * p.quantidade, 0)}
      </p>
      <Button
        onClick={async () => {
          if (!authSnap.logged) {
            history.push("/login");
          } else {
            setLoading(true);
            try {
              await api.post("compra/novo", {carrinho: cartSnap.produtos});
              alert("Compra finalizada!");
              history.push("/");
              cartState.produtos = [];
            } catch (e) {
              alert("algo deu errado");
            }
            setLoading(false);
          }
        }}
        variant="primary"
      >{`Comprar`}</Button>
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
