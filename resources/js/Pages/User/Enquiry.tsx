import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const Enquiry: React.FC = () => {
  const { props } = usePage();
  const user = props.auth?.user;

  const { data, setData, post, reset, processing, errors } = useForm({
    email: user ? user.email : '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/enquiry', {
      onSuccess: () => reset('message', 'email'),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Submit Enquiry</h1>
      <form onSubmit={handleSubmit}>
        {!user && (
          <input
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
        )}
        {user && (
          <input
            type="email"
            value={data.email}
            disabled
            className="w-full border rounded p-2 mb-4 bg-gray-100"
          />
        )}

        {errors.email && <p className="text-red-600">{errors.email}</p>}

        <textarea
          value={data.message}
          onChange={(e) => setData('message', e.target.value)}
          className="w-full border rounded p-2 mb-4"
          rows={5}
          placeholder="Enter your enquiry..."
        />
        {errors.message && <p className="text-red-600">{errors.message}</p>}

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Enquiry;
