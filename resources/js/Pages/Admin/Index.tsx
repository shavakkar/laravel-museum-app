import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Index({ subAdmins } : any) {
  const { data, setData, post, delete: destroy } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e : any) => {
    e.preventDefault();
    post('/admin');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Sub-Admins</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
        />
        <button type="submit">Create Sub-Admin</button>
      </form>

      <h2>Existing Sub-Admins</h2>
      <ul>
        {subAdmins.map((admin : any) => (
          <li key={admin.id}>
            {admin.name} ({admin.email})
            <button onClick={() => destroy(`/admin/${admin.id}`)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
