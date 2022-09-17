import { useEffect } from "react";
import { api } from "../service/api";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
export function Home() {
  const [produtos, setProdutos] = useState({
    count: 0,
    rows: [],
  });
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loading = async () => {
      setLoading(true);
      const res = await api.get("produtos", { params: { offset, search } });
      setProdutos(res.data);
      setLoading(false);
    };
    loading();
  }, [offset, search]);

  const totalPages = Math.ceil(produtos.count / 10)
  const currentPage = Math.ceil((offset + 1) / 10)

  return (
    <Container fluid={"md"} className="mt-4">
      <h1>Produtos</h1>
      <Form.Control
        type="search"
        value={search}
        placeholder="Pesquisar"
        a
        className={"mb-3"}
        onChange={(e) => {
          setSearch(e.target.value);
          setOffset(0);
        }}
      />
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
          {produtos.rows.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco}</td>
              <td>{p.estoque}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup >
        <Button onClick={() => setOffset(prev => prev - 10)} disabled={currentPage <= 1} variant="primary">{'<'}</Button>
        <Button disabled variant="light">{`Pagina ${currentPage} de ${totalPages}`}</Button>
        <Button onClick={() => setOffset(prev => prev + 10)} disabled={currentPage >= totalPages} variant="primary">{'>'}</Button>
      </ButtonGroup>
      {loading && <Spinner animation="border" />}
    </Container>
  );
}
