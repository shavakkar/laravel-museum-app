import { router  } from '@inertiajs/react';
import { useState } from 'react';

export default function Bookings({ bookings }: any) {
//   const { data, setData, post, put, reset } = useForm({ user_id: '', email: '', location: '', number: ''});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ user_id: '', email: '', location: '', number: ''});

//   const handleSubmit = (e : any) => {
//     e.preventDefault();
//     post('/admin/bookings', {
//       onSuccess: () => reset(),
//     });
//   };

    const startEdit = (b : any) => {
    setEditingId(b.id);
    setEditValues({ user_id: b.user_id || 'Guest', email: b.email || '', location: b.location || '', number: b.number || ''});
  };

  const saveEdit = (id: number) => {
    router.put(`/admin/bookings/${id}`, editValues, {
      onSuccess: () => {
      setEditingId(null);
      setEditValues({ user_id: '', email: '', location: '', number: '' });
    }
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      {/* <form 
        onSubmit={handleSubmit} 
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={data.user_id}
          onChange={(e) => setData('user_id', e.target.value)}
          placeholder="User ID"
          className="flex-1 border rounded p-2"
        />
        <input
          type="text"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          placeholder="Email"
          className="w-32 border rounded p-2"
        />
        <input
          type="text"
          value={data.location}
          onChange={(e) => setData('location', e.target.value)}
          placeholder="Location"
          className="w-32 border rounded p-2"
        />
        <input
          type="text"
          value={data.number}
          onChange={(e) => setData('number', e.target.value)}
          placeholder="Number"
          className="w-32 border rounded p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form> */}

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
          {bookings.map((b : any) => (
            <tr key={b.id}>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={editValues.user_id}
                    className="w-full border rounded p-1"
                    readOnly
                  />
                ) : (
                  b.user_id ? b.user_id : "Guest"
                )}
              </td>
              <td className="border p-2">
                {editingId === b.id ? (
                  <input
                    type="text"
                    value={editValues.email}
                    onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
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
                    value={editValues.location}
                    onChange={(e) => setEditValues({ ...editValues, location: e.target.value })}
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
                    value={editValues.number}
                    onChange={(e) => setEditValues({ ...editValues, number: e.target.value })}
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
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
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
                      onClick={() => router.delete(`/admin/bookings/${b.id}`)}
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
