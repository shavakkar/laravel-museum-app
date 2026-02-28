import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Enquiry = {
  id: number;
  message: string;
  user: { id: number; name: string; email: string };
};

const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    axios.get('/admin/enquiries').then((res) => setEnquiries(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">All Enquiries</h1>
      <ul>
        {enquiries.map((enquiry) => (
          <li key={enquiry.id} className="border-b py-2">
            <p className="font-semibold">{enquiry.user.name} ({enquiry.user.email})</p>
            <p>{enquiry.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enquiries;
