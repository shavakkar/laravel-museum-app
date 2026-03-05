import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

export default function Welcome({ auth } : any) {
  const { data, setData, post, processing, errors } = useForm({
    location: '',
    number: '',
    email: auth.user ? auth.user.email : '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {
    try {
      await axios.post('/app/send-otp', { email: data.email });
      setOtpSent(true);
    } catch {
      alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('/app/verify-otp', { otp: data.otp });
      setOtpVerified(true);
    } catch {
      alert('Invalid OTP');
    }
  };

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
            {/* location input */}
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Type a location..."
            />

            {/* Number input */}
            <input
              type="number"
              value={data.number}
              onChange={(e) => setData('number', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter a number..."
            />

            {/* Email + OTP */}
            {auth.user ? (
              <input
                type="email"
                value={data.email}
                disabled
                className="w-full border rounded p-2 bg-gray-100"
              />
            ) : (
              <>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter your email..."
                />
                {!otpSent && (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Send OTP
                  </button>
                )}
                {otpSent && !otpVerified && (
                  <>
                    <input
                      type="text"
                      value={data.otp}
                      onChange={(e) => setData('otp', e.target.value)}
                      className="w-full border rounded p-2 mt-2"
                      placeholder="Enter OTP..."
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={processing || (!auth.user && !otpVerified)}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {processing ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
