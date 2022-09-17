import { useEffect } from "react";
import { api } from "../service/api";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { cartState } from "../store/cart";
export function Produto() {
  const cartSnap = useSnapshot(cartState);
  const [p, setP] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const loading = async () => {
      setLoading(true);
      const res = await api.get(`produtos/${id}`);
      setP(res.data);
      setLoading(false);
    };
    loading();
  }, [id]);

  return (
    <Container fluid={"md"} className="mt-4">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {!!p && (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco}</td>
              <td>{p.estoque}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {!!p && (
        <ButtonGroup className="mb-3">
          <Button
            onClick={() => setQuantidade((prev) => prev - 1)}
            disabled={quantidade <= 1}
            variant="primary"
          >
            {"-"}
          </Button>
          <Button disabled variant="light">
            {quantidade}
          </Button>
          <Button
            onClick={() => setQuantidade((prev) => prev + 1)}
            disabled={quantidade >= p.estoque}
            variant="primary"
          >
            {"+"}
          </Button>
        </ButtonGroup>
      )}
      <br></br>
      {cartSnap.produtos.some((i) => i.id === id) ? (
        <Button
          onClick={() => {
            const cartCopy = [...cartSnap.produtos];
            const index = cartCopy.findIndex((i) => i.id === id);
            if (index !== -1) {
              cartCopy.splice(index, 1);
              cartState.produtos = [...cartCopy];
            }
          }}
          variant="danger"
        >
          {"Remover do carrinho"}
        </Button>
      ) : (
        <Button
          onClick={() => {
            cartState.produtos = [...cartSnap.produtos, { ...p, quantidade }];
            history.push("/cart");
          }}
          variant="primary"
        >
          {"Adicionar no carrinho"}
        </Button>
      )}
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
