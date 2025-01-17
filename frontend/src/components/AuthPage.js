import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const url = isLogin ? '/api/v1/users/login' : '/api/v1/users/signup';
    try {
      const response = await axios.post(url, { email, password });
      alert('Success!');
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center mt-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-64 p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-64 p-2 mb-4"
        />
        <button
          onClick={handleAuth}
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-400"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-gray-600 cursor-pointer"
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default AuthPage;

