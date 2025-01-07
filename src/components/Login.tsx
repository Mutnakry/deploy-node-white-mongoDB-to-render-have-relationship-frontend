import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { API_URL } from '../services/api'

const HomePage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setError(""); // Reset error message
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}api/users/login`, {
        email: email,
        password: password,
      });
      console.log('gmail:', email)
      console.log('pass:', password)

      console.log("Login successful", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("_id", response.data._id);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("age", response.data.age);
      localStorage.setItem("gender", response.data.gender);



      window.location.href = "/";
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid email or password");
    }
    finally {
      setIsSubmitting(false);
    }
  };



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
                  disabled={isSubmitting}
                  className={`button_only_submit rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed rounded' : ''}`}
                >
                  {isSubmitting ? 'កំពុងចូលគណនី....' : 'ចូលគណនី'}
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
