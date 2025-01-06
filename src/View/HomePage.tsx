import React, { useEffect, useState } from 'react';
import { FaBookReader, FaBusinessTime, FaArchive, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api.tsx';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

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

function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedCourses, setShowFullDescription] = useState<{ [key: number]: boolean }>({});
  const [searchLoading, setSearchLoading] = useState<boolean>(false); // State for search loading

  const [user_rol, setUser_rol] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, []);


  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    const storedRol = localStorage.getItem("user_role");

    if (storedEmail) {
      setUserEmail(storedEmail);
      setUser_rol(storedRol);
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
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setTimeout(() => {
          setLoading(false); // After 3 seconds, stop loading
        }, 1000);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchLoading(true);
    clearTimeout((window as any).searchTimeout);

    // Add debounce
    (window as any).searchTimeout = setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };



  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.cat_name && course.cat_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? course.course_type === filter : true;
    return matchesSearch && matchesFilter;
  });

  const handleToggleDescription = (courseId: number) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  // Define a helper function for the skeleton loader
  const renderSkeletonLoader = () => {
    const skeletonItems = Array.from({ length: 6 }); // Adjust the length based on how many skeletons you want
    return skeletonItems.map((_, index) => (
      <div key={index} className="relative animate-pulse">
        <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        <div className="mt-4 h-6 bg-gray-200 rounded-full w-1/3"></div>
      </div>
    ));
  };


  return (
    <div className='pt-24'>
      <Navbar />
      <div className='max-w-screen-2xl mx-auto px-4'>
        {loading ? (
          <div className='flex gap-4 py-2'>
            {/* Skeleton for Search Bar */}
            <div className='w-full h-10 bg-gray-300 rounded animate-pulse'></div>
            <div className='w-[170px] h-10 bg-gray-300 rounded animate-pulse'></div>
          </div>
        ) : (
          <div className='mb-6 flex gap-4'>
            <input
              type='text'
              placeholder='ស្វែងរកវគ្គសិក្សា ...'
              className='border p-2 rounded w-full'
              value={searchTerm}
              onChange={handleSearch} // Use the handleSearch function
            />
            <select
              className="border p-2 rounded w-[170px]"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="">ទាំងអស់</option>
              <option value="free">ឥតគិតថ្លៃ</option>
              <option value="premium">គិតថ្លៃ</option>
            </select>
          </div>
        )}

        {/* Loading state for search */}
        {searchLoading && (
          <div className="w-full text-center my-12">
            <div className="inline-block w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <div className="text-gray-500">Searching...</div>
          </div>

        )}

        {error && <p className='text-red-500'>{error}</p>}

        {/* Loading state */}
        {loading ? (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
            {renderSkeletonLoader()}
          </div>
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>

            {filteredCourses.map(course => (
              <div key={course.cous_id} className={`relative`}>
                {course.status === "off" ? (

                  <div className="pointer-events-none relative cursor-none opacity-50 shadow-lg rounded-lg border hover:border-b-orange-500 hover:border-x-orange-500">

                    <Link
                      to={`/modales/${course.cous_id}/course`}
                      className=''
                    >
                      <div className='bg-blue-800/50 text-sm justify-between flex px-2 py-1 rounded-t-lg'>
                        <h2 className='px-3 py-1 text-white'>
                          {course.course_type} <span>Course</span>
                        </h2>
                        {course.course_type === 'premium' ? (
                          <p className='px-3 py-1 rounded opacity-70 text-white bg-purple-700 uppercase'>
                            {course.course_type}
                          </p>
                        ) : (
                          <p className='px-3 py-1 rounded opacity-70 text-white bg-green-500 uppercase'>
                            {course.course_type}
                          </p>
                        )}
                      </div>
                      <div className='px-4 py-6'>
                        <h2 className='text-blue-500 text-xl pb-2'>{course.cat_name}</h2>
                        <div className="relative">
                          <p
                            className={`text-md text-gray-700 space-x-4 ${expandedCourses[course.cous_id] ? 'block' : 'line-clamp-4'}`}
                          >
                            <span>{course.description}</span>
                          </p>
                        </div>
                        <div className='grid grid-cols-2 py-4 gap-4'>
                          <div className='text-gray-500 text-sm space-y-2'>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaBookReader />
                              </strong>
                              <span>{course.lesson} មេរៀន</span>
                            </p>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaBusinessTime />
                              </strong>
                              <span>{course.chapter} ជុំពូក</span>
                            </p>
                          </div>
                          <div className='text-gray-500 text-sm space-y-2'>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaArchive />
                              </strong>
                              <span>{course.exam} ចំនួន</span>
                            </p>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaFile />
                              </strong>
                              <span>{course.document} ឯកសារ</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className='w-full bg-blue-500/80 hover:bg-blue-500 text-center py-2 rounded-b text-white'>
                      <Link to={'sta'}>រៀនបន្ដរ</Link>
                    </div>
                    <div className='absolute bottom-12 transform'>
                      <button
                        onClick={() => handleToggleDescription(course.cous_id)} // Pass the course ID
                        className="mt-3 px-8 text-blue-600 hover:underline focus:outline-none"
                      >
                        {expandedCourses[course.cous_id] ? "បន្ថយ" : "មើលបន្ថែម"}
                      </button>
                    </div>

                  </div>

                ) : (

                  <div className="shadow-lg relative rounded-lg border hover:border-b-blue-500 hover:border-x-blue-500">

                    <Link to={isLoggedIn ? `/modales/${course.cous_id}/course` : "/login"} className=''>
                      <div className='bg-blue-800/90 text-sm justify-between flex px-2 py-1 rounded-t-lg'>
                        <h2 className='px-3 py-1 text-white'>
                          {course.course_type} <span>Course</span>
                        </h2>
                        {course.course_type === 'premium' ? (
                          <p className='px-3 py-1 rounded opacity-70 text-white bg-purple-700 uppercase'>
                            {course.course_type}
                          </p>
                        ) : (
                          <p className='px-3 py-1 rounded text-white bg-green-600 uppercase'>
                            {course.course_type}
                          </p>
                        )}
                      </div>
                      <div className='px-4 py-6'>
                        <h2 className='text-blue-500 text-xl pb-2'>{course.cat_name}</h2>
                        <div className="relative">
                          <p
                            className={`text-md text-gray-700 space-x-4 ${expandedCourses[course.cous_id] ? 'block' : 'line-clamp-4'}`}
                          >
                            <span>{course.description}</span>
                          </p>
                        </div>
                        <div className='grid grid-cols-2 pt-12 gap-4'>
                          <div className='text-gray-500 text-sm space-y-2'>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaBookReader />
                              </strong>
                              <span>{course.lesson} មេរៀន</span>
                            </p>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaBusinessTime />
                              </strong>
                              <span>{course.chapter} ជុំពូក</span>
                            </p>
                          </div>
                          <div className='text-gray-500 text-sm space-y-2'>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaArchive />
                              </strong>
                              <span>{course.exam} ចំនួន</span>
                            </p>
                            <p className='flex space-x-2'>
                              <strong>
                                <FaFile />
                              </strong>
                              <span>{course.document} ឯកសារ</span>
                            </p>
                          </div>
                        </div>
                      </div>

                    </Link>

                    <div className='w-full  bg-blue-500/80 hover:bg-blue-500 text-center py-2 rounded-b text-white'>
                      <Link to={'sta'}>រៀនបន្ដរ</Link>
                    </div>

                    <div className='absolute bottom-32 transform'>
                      <button
                        onClick={() => handleToggleDescription(course.cous_id)} // Pass the course ID
                        className="mt-3 px-8 text-blue-600 hover:underline focus:outline-none"
                      >
                        {expandedCourses[course.cous_id] ? "បន្ថយ" : "មើលបន្ថែម"}
                      </button>
                    </div>
                  </div>

                )}
              </div>
            ))}

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
