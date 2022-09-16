import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from '../service/api';

export function Home() {
  useEffect(() => {
    const load = async () => {
      // setLoad(true)
      try {
        await api.post('auth/validate')
        // authState.logged = true
      } catch {
        // authState.logged = false
      }
      // setLoad(false)
    }
    load()
  }, [])
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control name='name' type="name" placeholder="Nome" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" placeholder="Senha" />
      </Form.Group>
      
      <Button onClick={e => {
        e.preventDefault()
        console.log(e.target)
      }} variant="primary" type="submit">
        Confirmar
      </Button>
    </Form>
  );
}
