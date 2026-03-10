import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Bookings({ bookings }: any) {
  const { data, setData, put, delete: destroy, reset, processing, errors } = useForm({
    user_id: '',
    email: '',
    location: '',
    number: '',
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (b: any) => {
    setEditingId(b.id);
    setData({
      user_id: b.user_id || 'Guest',
      email: b.email || '',
      location: b.location || '',
      number: b.number || '',
    });
  };

  const saveEdit = (id: number) => {
    put(`/admin/bookings/${id}`, {
      onSuccess: () => {
        setEditingId(null);
        reset();
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Number</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b.id}>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={data.user_id}
                    readOnly
                    className="w-full border rounded p-1"
                  />
                ) : (
                  b.user_id || 'Guest'
                )}
              </td>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  b.email
                )}
              </td>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  b.location
                )}
              </td>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={data.number}
                    onChange={(e) => setData('number', e.target.value)}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  b.number
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editingId === b.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(b.id)}
                      disabled={processing}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        reset();
                      }}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(b)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => destroy(`/admin/bookings/${b.id}`)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}