import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const ok = await login({ user, password })
    if (!ok) {
      setError('Credenciales invalidas')
      return
    }
    navigate("/")
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        type="text"
        placeholder="ingresa tu user"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="ingresa tu pass" />

      <button type="submit">Ingresar</button>
      {error ? <p>{error}</p> : null}
    </form>
  );
};