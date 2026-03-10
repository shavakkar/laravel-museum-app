import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Welcome({ value, onChange, auth }: any) {
  const { data, setData, post, processing, errors } = useForm({
    location: '',
    number: '',
    email: auth.user ? auth.user.email : '',
    otp: '',
  });

  const [query, setQuery] = useState(value || '');
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 0) {
        axios
          .get('/locations/search', { params: { q: query } })
          .then((res) => {
            setResults(res.data);
            setShowDropdown(true);
          })
          .catch(() => {
            setResults([]);
            setShowDropdown(false);
          });
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (location: any) => {
    setQuery(location.name);
    setData('location', location.name);
    onChange(location.name);
    setShowDropdown(false);
  };

  // OTP placeholders (disabled for now)
  // const [otpSent, setOtpSent] = useState(false);
  // const [otpVerified, setOtpVerified] = useState(false);

  // const sendOtp = async () => {
  //   try {
  //     await axios.post('/app/send-otp', { email: data.email });
  //     setOtpSent(true);
  //   } catch {
  //     alert('Failed to send OTP');
  //   }
  // };

  // const verifyOtp = async () => {
  //   try {
  //     await axios.post('/app/verify-otp', { otp: data.otp });
  //     setOtpVerified(true);
  //   } catch {
  //     alert('Invalid OTP');
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/bookings');
  };

  return (
    <>
      <Head title="App" />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow rounded p-6">
          <h1 className="text-xl font-bold mb-4 text-center">Welcome Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Location input with dropdown */}
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onChange(e.target.value);
                }}
                className="w-full border rounded p-2"
                placeholder="Type a location..."
              />
              {showDropdown && results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
                  {results.map((c: any) => (
                    <li
                      key={c.id}
                      onClick={() => handleSelect(c)}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                    >
                      <span>{c.name}</span>
                      {c.locality && (
                        <span
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: c.locality }}
                        ></span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Number input */}
            <input
              type="number"
              value={data.number}
              onChange={(e) => setData('number', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter a number..."
            />

            {/* Email input (required) */}
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter your email..."
              required
            />

            {/* OTP section (disabled for now) */}
            {/* {!otpSent && (
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
            )} */}

            {/* Submit */}
            <button
              type="submit"
              disabled={processing}
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
