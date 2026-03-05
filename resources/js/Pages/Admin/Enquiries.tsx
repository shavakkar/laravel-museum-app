import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';


type Enquiry = {
  id: number;
  message: string;
  user: { id: number; name: string; email: string };
};

type EnquiriesPageProps = PageProps & { enquiries: Enquiry[]; };

const Enquiries: React.FC = () => {
  const { enquiries } = usePage<EnquiriesPageProps>().props;

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await axios.delete(`/admin/enquiries/${id}`);
      window.location.reload();
    } catch {
      alert('Failed to delete enquiry.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">All Enquiries</h1>
      <ul>
        {enquiries.map((enquiry) => (
          <li key={enquiry.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {enquiry.user.name} ({enquiry.user.email})
              </p>
              <p>{enquiry.message}</p>
            </div>
            <button
              onClick={() => handleDelete(enquiry.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enquiries;
