import { router, useForm } from '@inertiajs/react';

export default function Locations({ locations }: any) {
  const { data, setData, post, reset } = useForm({ name: '', locality: '', district: '', city: '', state: '' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post('/admin/locations', {
      onSuccess: () => reset(),
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
          {locations.map((c: any) => (
            <tr key={c.id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.locality}</td>
              <td className="border p-2">{c.district}</td>
              <td className="border p-2">{c.city}</td>
              <td className="border p-2">{c.state}</td>
              <td className="border p-2">
                <button
                  onClick={() => router.delete(`/admin/locations/${c.id}`)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
