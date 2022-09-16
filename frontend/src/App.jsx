import { useState } from 'react';
import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { api } from './service/api';
import { authState } from './store/auth';

function App() {
  const [loading, setLoad] = useState(true)
  useEffect(() => {
    const load = async () => {
      setLoad(true)
      try {
        await api.post('auth/validate')
        authState.logged = true
      } catch {
        authState.logged = false
      }
      setLoad(false)
    }
    load()
  }, [])
  if (loading) return <></>
  return (
    <AppRoutes/>
  );
}

export default App;
