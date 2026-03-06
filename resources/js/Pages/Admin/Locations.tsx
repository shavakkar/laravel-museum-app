import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Locations({ locations }: any) {
  const { data, setData, post, put, reset } = useForm({ name: '', locality: '', district: '', city: '', state: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ name: '', locality: '', district: '', city: '', state: '' });

  const handleSubmit = (e : any) => {
    e.preventDefault();
    post('/admin/locations', {
      onSuccess: () => reset(),
    });
  };

    const startEdit = (c : any) => {
    setEditingId(c.id);
    setEditValues({ name: c.name, locality: c.locality || '', district: c.district || '', city: c.city || '', state: c.state || '' });
  };

  const saveEdit = (id: number) => {
    router.put(`/admin/locations/${id}`, editValues, {
      onSuccess: () => setEditingId(null),
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Manage Locations</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Location name"
          className="flex-1 border rounded p-2"
        />
        <input
          type="text"
          value={data.locality}
          onChange={(e) => setData('locality', e.target.value)}
          placeholder="Locality"
          className="w-32 border rounded p-2"
        />
        <input
          type="text"
          value={data.district}
          onChange={(e) => setData('district', e.target.value)}
          placeholder="District"
          className="w-32 border rounded p-2"
        />
        <input
          type="text"
          value={data.city}
          onChange={(e) => setData('city', e.target.value)}
          placeholder="City"
          className="w-32 border rounded p-2"
        />
        <input
          type="text"
          value={data.state}
          onChange={(e) => setData('state', e.target.value)}
          placeholder="State"
          className="w-32 border rounded p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Locality</th>
            <th className="border p-2">District</th>
            <th className="border p-2">City</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((c : any) => (
            <tr key={c.id}>
              <td className="border p-2">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td className="border p-2">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editValues.locality}
                    onChange={(e) => setEditValues({ ...editValues, locality: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  c.locality
                )}
              </td>
              <td className="border p-2">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editValues.district}
                    onChange={(e) => setEditValues({ ...editValues, district: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  c.district
                )}
              </td>
              <td className="border p-2">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editValues.city}
                    onChange={(e) => setEditValues({ ...editValues, city: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  c.city
                )}
              </td>
              <td className="border p-2">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editValues.state}
                    onChange={(e) => setEditValues({ ...editValues, state: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  c.state
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(c.id)}
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
                      onClick={() => startEdit(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => router.delete(`/admin/locations/${c.id}`)}
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
