import React from 'react';

export default function Enquiries({ enquiries } : any) {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">All Enquiries</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Linked User</th>
            <th className="border p-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry : any) => (
            <tr key={enquiry.id}>
              <td className="border p-2">{enquiry.id}</td>
              <td className="border p-2">{enquiry.email}</td>
              <td className="border p-2">{enquiry.message}</td>
              <td className="border p-2">
                {enquiry.user ? enquiry.user.name : 'Guest'}
              </td>
              <td className="border p-2">
                {new Date(enquiry.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
