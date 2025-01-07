import { useEffect, useState, useRef } from "react";
import { FaSearch, FaBars, FaTimes, FaLaptopCode } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBack } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import { Link } from "react-router-dom";
import { API_URL } from '../services/api'


interface Course {
  cous_id: number;
  cat_name: string;
  description: string;
  lesson: string;
  chapter: string;
  status: 'off' | 'no';
  document: string;
  exam: string;
  course_type: 'free' | 'premium';
}


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [last_name, setLast_name] = useState<string | null>(null);
  const [first_name, setFirst_name] = useState<string | null>(null);
  const [user_rol, setUser_rol] = useState<string | null>(null);
  const [user_age, setUser_age] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [UserID, setUser_ID] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);




  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user_role");
    localStorage.removeItem("email");
    localStorage.removeItem("lastName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("age");
    localStorage.removeItem("gender");
    localStorage.removeItem("_id");
    setUserEmail(null);
    window.location.href = "/"; 
  };
  

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedLastName = localStorage.getItem("lastName");
    const storedFirstName = localStorage.getItem("firstName");
    const storedGender = localStorage.getItem("gender");
    const storedAge = localStorage.getItem("age");
    const storedRol = localStorage.getItem("user_role");
    const storedID = localStorage.getItem("_id");

    if (storedEmail) {
      setUserEmail(storedEmail);
      setLast_name(storedLastName);
      setFirst_name(storedFirstName);
      setGender(storedGender);
      setUser_age(storedAge);
      setUser_rol(storedRol);
      setUser_ID(storedID);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}api/courses`);
        setCourses(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        // setError('Failed to fetch courses. Please try again later.');
      } finally {

      }
    };

    fetchCourses();
  }, []);


  const filteredProducts = courses.filter((item) =>
    item.cat_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <div className="bg-blue-700 dark:bg-gray-900 w-full shadow fixed top-0 z-20">
        <nav className="max-w-screen-xl md:mx-auto mx-4 py-1 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center md:space-x-3 text-center">
            <h3 className=" py-2 text-sm lg:text-gray-300 text-white flex items-center lg:text-xl">
              <IoChevronBack className="text-xl text-blue-500" />
              <span>តោះរៀនCODE</span>
              <FaLaptopCode className="text-4xl lg:text-gray-300 text-white" />
              <GrFormNext className="text-5xl text-blue-500" />
            </h3>
            <img
              className="h-6 hidden md:block"
              src="https://www.khmer24.com/icon/km-40x40.png"
              alt="Khmer Icon"
            />
          </a>



          {/* Search Bar and User Options */}
          <div className="hidden md:flex items-center flex-1 px-4 space-x-8">
            <div className="relative flex-1">
              <input
                type="text"
                className="border px-4 py-2 w-full outline-none text-gray-300 bg-blue-700/50 focus:border-blue-500"
                placeholder="តើអ្នកកំពុងស្វែរកថ្នាក់រៀនអ្វី?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
              {searchTerm && (
                <div className="absolute z-10 mt-2 w-full bg-gray-100 border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    <ul className="py-2 text-sm text-gray-700">
                      {filteredProducts.map((item) => (
                        item.status === "off" ? (
                          <div key={item.cous_id} className="pointer-events-none cursor-none opacity-50 ">
                            <Link
                              to={`/modales/${item.cous_id}/course`}
                              className="hover:bg-gray-200 px-4 flex py-2 cursor-pointer text-blue-800"
                            >
                              {item.cat_name}
                            </Link>
                          </div>
                        ) : (
                          <div key={item.cous_id} className="rounded-lg">
                            <Link
                              to={`/modales/${item.cous_id}/course`}
                              className="hover:bg-gray-200 px-4 flex py-2 cursor-pointer text-blue-800"
                            >
                              {item.cat_name}
                            </Link>
                          </div>
                        )
                      ))}


                    </ul>
                  ) : (
                    <div className="py-2 px-4 text-gray-500 text-sm">
                      មិនមានថ្នាក់រៀនទេ!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center lg:space-x-4 space-x-1">
            {userEmail ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  <FaRegUserCircle className="text-3xl text-white lg:text-gray-300 cursor-pointer" onClick={toggleDropdown} />

                  {dropdownOpen && (
                    <div className="absolute z-10 p-4 mt-2 w-[200px] -translate-x-24 bg-white border rounded-lg shadow-lg">
                      <ul className="py-2 text-sm text-gray-700">
                        <p>{UserID}</p>
                        <p>{user_age}</p>
                        <p>{user_rol}</p>
                        <p>{last_name} {first_name}</p>
                        <p>{gender}</p>
                        <p>{userEmail}</p>
                        <br />
                        <div className="flex gap-1">
                          <a href="/userLogin" className="text-blue-800 w-full p-2 bg-gray-400">ព័ត្នមានខ្លួន</a>
                          <button onClick={handleLogout} className="text-blue-800 w-full p-2 bg-gray-400">
                            ចាកចេញ
                          </button>
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a href={'/login'} className="text-gray-300 text-sm md:text-lg">
                  ចូលគណនី
                </a>
                <span className="text-gray-400">ឬ</span>
                <a href={'/register'} className="text-gray-300 text-sm md:text-lg">
                  ចុះឈ្មោះ
                </a>
              </>
            )}
          </div>
          

          {/* Hamburger Menu (Mobile) */}
          <button className="md:hidden text-2xl text-white" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            <ul className="space-y-2 p-4">
              <li>
                <a href="/Courses" className="block px-4 py-2 text-blue-800">
                  Courses
                </a>
              </li>
              <li>
                <a href="/Careers" className="block px-4 py-2 text-blue-800">
                  Careers
                </a>
              </li>
              <li>
                <a href="/register" className="block px-4 py-2 text-blue-800">
                  ចុះឈ្មោះ
                </a>
              </li>
              <div className="flex items-center space-x-4">
                {userEmail ? (
                  <>
                    <span className="text-blue-800">{userEmail}</span>
                    <button onClick={handleLogout} className="text-blue-800">
                      ចាកចេញ
                    </button>
                  </>
                ) : (
                  <>
                    <a href={'/login'} className="text-blue-800">
                      ចូលគណនី
                    </a>
                    <span className="text-gray-400">ឬ</span>
                    <a href={'/register'} className="text-blue-800">
                      ចុះឈ្មោះ
                    </a>
                  </>
                )}
              </div>

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;


