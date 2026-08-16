import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password })
      localStorage.setItem('admin_token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!')
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 font-sans">

      <div className="w-full max-w-sm bg-[#121215] p-7 rounded-xl border border-zinc-800 shadow-xl">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Admin POS
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Masuk untuk mengelola stok & laporan</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg mb-5 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
              Email
            </label>
            <input
              type="email" required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition"
              placeholder="admin@gmail.com"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
              Password
            </label>
            <input
              type="password" required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-2.5 rounded-lg transition text-xs mt-2"
          >
            {isLoading ? 'Memeriksa...' : 'Masuk Gudang'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500">
            Terproteksi Token Laravel Sanctum
          </p>
        </div>

      </div>

    </div>
  );
}
