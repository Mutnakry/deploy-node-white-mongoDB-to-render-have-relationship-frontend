import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setError(""); // Reset error message
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        user_email: email,
        user_password: password,
      });
      console.log("Login successful", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("user_role", response.data.user_role);
      localStorage.setItem("user_email", response.data.user_email);
      localStorage.setItem("last_name", response.data.last_name);
      localStorage.setItem("first_name", response.data.first_name);
      localStorage.setItem("user_age", response.data.user_age);
      localStorage.setItem("gender", response.data.gender);


      window.location.href = "/";
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid email or password");
    }
  };

  const product = [
    {
      id: 1,
      names: `<form onSubmit={handleSubmit}>
     <div className="mb-4 space-y-2">
       <label htmlFor="email" className="block text-sm font-medium text-gray-700">
         អ៊ីមែល
       </label>
       <input
         type="email"
         id="email"
         name="email"
         className="p-2 placeholder:font-NotoSansKhmer w-full border-2 outline-none bg-gray-50/20 focus:border-blue-500"
         value={email}
         onChange={handleChange}
         required
       />
     </div>
     <div className="mb-4 space-y-2 relative">
       <label htmlFor="password" className="block text-sm font-medium text-gray-700">
         លេខសម្ថាត់
       </label>
     </div>
     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
     <div className="flex justify-end">
       <button
         type="submit"
         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
       >
         ចូលគណនី
       </button>
     </div>
   </form>
      `
    }
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      <Navbar />
      <div className="flex mt-16 h-screen items-center justify-center bg-gradient-to-r from-gray-700 via-blue-200 to-gray-100 bg-opacity-50">
        <div className=" mt-36 lg:mt-2 flex items-center p-2 justify-center ">
          <div className="bg-white p-6 md:w-[390px] w-[340px] mg:bg-opacity-60">
            <div className="flex justify-center items-center mb-8">
              <h2 className="text-2xl font-bold">ចូលគណនី</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  អ៊ីមែល
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 placeholder:font-NotoSansKhmer w-full border-2 outline-none bg-gray-50/20 focus:border-blue-500"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 space-y-2 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  លេខសម្ថាត់
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="p-2 placeholder:font-NotoSansKhmer w-full border-2 outline-none bg-gray-50/20 focus:border-blue-500"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ចូលគណនី
                </button>
              </div>
              <div className='flex space-x-3'>
                <p>មិនទាន់មានគណ?</p>
                <a href="/register" className='text-blue-500'>ចុះឈ្មោះ</a>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
