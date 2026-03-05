import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default function Welcome({ auth } : any) {
  const { data, setData, post, processing, errors } = useForm({
    colour: '',
    number: '',
    email: auth.user ? auth.user.email : '',
    otp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/app'); 
  };

  return (
    <>
      <Head title="App" />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow rounded p-6">
          <h1 className="text-xl font-bold mb-4 text-center">Welcome Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Colour input */}
            <div>
              <label className="block text-sm font-medium mb-1">Colour</label>
              <input
                type="text"
                value={data.colour}
                onChange={(e) => setData('colour', e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Type a colour..."
              />
              {errors.colour && <p className="text-red-600">{errors.colour}</p>}
            </div>

            {/* Number input */}
            <div>
              <label className="block text-sm font-medium mb-1">Number</label>
              <input
                type="number"
                value={data.number}
                onChange={(e) => setData('number', e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter a number..."
              />
              {errors.number && <p className="text-red-600">{errors.number}</p>}
            </div>

            {/* Email + OTP */}
            {auth.user ? (
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  disabled
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Enter your email..."
                  />
                  {errors.email && <p className="text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">OTP</label>
                  <input
                    type="text"
                    value={data.otp}
                    onChange={(e) => setData('otp', e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Enter OTP..."
                  />
                  {errors.otp && <p className="text-red-600">{errors.otp}</p>}
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
