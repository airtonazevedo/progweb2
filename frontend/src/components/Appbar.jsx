import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useSnapshot } from "valtio";
import { api } from "../service/api";
import { authState } from "../store/auth";
import { cartState } from "../store/cart";
export function Appbar() {
  const authSnap = useSnapshot(authState);
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>PW2</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/sobre">
              <Nav.Link>Sobre</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Meu Carrinho</Nav.Link>
            </LinkContainer>
            {authSnap.logged && authSnap.type === 2 && (
              <LinkContainer to="/produto/novo">
                <Nav.Link>Novo produto</Nav.Link>
              </LinkContainer>
            )}
            {authSnap.logged && authSnap.type === 2 && (
              <LinkContainer to="/admin/novo">
                <Nav.Link>Novo admin</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav>
            {authSnap.logged ? (
              <Nav.Link
                onClick={async () => {
                  await api.post("auth/logout");
                  authState.logged = false;
                  authState.type = 0;
                  cartState.produtos = [];
                  history.replace("/");
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
