import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const { setUsername: setLoggedInUser, setId } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const endpoint = mode === 'register' ? 'register' : 'login';
    const response = await axios.post(endpoint, { username, password });
    setLoggedInUser(username);
    setId(response.data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input 
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text" 
          placeholder="Username" 
          className="block w-full rounded-sm p-2 mb-2 border" 
        />
        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password" 
          placeholder="Password" 
          className="block w-full rounded-sm p-2 mb-2 border" 
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {mode === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {mode === 'register' ? (
            <div>
              Already a member?
              <button className="ml-1" onClick={() => setMode('login')}>Login here</button>
            </div>
          ) : (
            <div>
              Don't have an account?
              <button className="ml-1" onClick={() => setMode('register')}>Register</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
