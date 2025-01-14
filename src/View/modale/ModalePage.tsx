import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import Video from '../../assets/1734583716986WIN_20231125_12_38_52_Pro.mp4'
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { API_URL } from '../../services/api.tsx';


interface Course {
    _id: string;
    cat_name: string;
    image_url: string | null;
    description: string;
    lesson: string;
    chapter: string;
    status: string;
    document: string;
    exam: string;
    course_type: string;
}

interface Modales {
    _id: string;
    mod_name: string;
    courses_id: Course;
    description: string;
    status: string;
}

interface SubModales {
    _id: string;
    sub_name: string;
    courses_id: Course;
    modales_id: Modales;
    user_at: string;
}

const ModalesDetails: React.FC = () => {
    const { course_id } = useParams<{ course_id: string }>();
    const [modalesList, setModalesList] = useState<Modales[]>([]);
    const [subModales, setSubModales] = useState<SubModales[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [UserLoginType, setUserLoginType] = useState<string | null>("user");


    useEffect(() => {
        const storedRol = localStorage.getItem("user_role");

        if (storedRol) {
            setUserLoginType(storedRol);
        }
    }, []);

    useEffect(() => {
        const fetchModales = async () => {
            try {
                const response = await axios.get<Modales[]>(`${API_URL}api/modales/${course_id}`);
                setModalesList(response.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to fetch modales');
                setLoading(false);
            }
        };

        if (course_id) {
            fetchModales();
        }
    }, [course_id]);

    useEffect(() => {
        const fetchSubModales = async () => {
            try {
                const response = await axios.get<SubModales[]>(`${API_URL}api/submodale`);
                setSubModales(response.data);
            } catch (err) {
                setError('Failed to fetch submodules');
            }
        };

        fetchSubModales();
    }, []);

    const toggleDropdown = (id: string) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const handlePremiumClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }



    const SkeletonLoader = () => (
        <div className="space-y-4 p-4 bg-white shadow rounded-lg border-2 border-blue-500/50">
            <div className="skeleton-loader h-8 bg-gray-300 w-1/3"></div>
            <div className="skeleton-loader h-16 bg-gray-300 rounded-md"></div>
            <div className="skeleton-loader h-8 bg-gray-300 w-1/4"></div>
            <br />
            <div className="skeleton-loader h-8 bg-gray-300 w-1/3"></div>
            <div className="skeleton-loader h-16 bg-gray-300 rounded-md"></div>
            <div className="skeleton-loader h-8 bg-gray-300 w-1/4"></div>
            <br />
            <div className="skeleton-loader h-8 bg-gray-300 w-1/3"></div>
            <div className="skeleton-loader h-16 bg-gray-300 rounded-md"></div>
            <div className="skeleton-loader h-8 bg-gray-300 w-1/4"></div>
            <br />
            <div className="skeleton-loader h-8 bg-gray-300 w-1/3"></div>
            <div className="skeleton-loader h-16 bg-gray-300 rounded-md"></div>
            <div className="skeleton-loader h-8 bg-gray-300 w-1/4"></div>
        </div>

    );

    const handleToggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className='mt-24'>
            <Navbar />
            <div className='max-w-screen-2xl mx-auto px-4'>


                {loading ? (
                    <>
                        <SkeletonLoader />
                    </>
                ) : (
                    <div>
                        <div>
                            {modalesList.slice(0, 1).map((course) => (
                                <div key={course._id}>
                                    <div className='text-blue-600 text-3xl font-NotoSansKhmer py-4'>
                                        <p>{course.courses_id.cat_name || 'No category available'}</p>
                                    </div>
                                    <div className="relative">
                                        <p className={`text-md text-gray-700 space-x-4 px-2 ${showFullDescription ? 'block' : 'line-clamp-4'}`}>
                                            <span>{course.courses_id.description}</span>
                                        </p>
                                        <button onClick={handleToggleDescription} className="mt-3 px-8 text-blue-600 hover:underline focus:outline-none">
                                            {showFullDescription ? "បន្ថយ" : "មើលបន្ថែម"}
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='flex py-4'>
                            <Link to={'/'} className='py-2 px-6 text-xs text-white bg-orange-500 rounded'>
                                បន្ដការរៀន
                            </Link>
                        </div>

                        <div className="space-y-4 p-4 bg-white shadow rounded-lg border-2 border-blue-500/50">
                            <h2 className='text-blue-600 text-3xl font-NotoSansKhmer'>Course</h2>
                            {modalesList.map((course, index) => (
                                <div key={course._id}>
                                    <button onClick={() => toggleDropdown(course._id)} className="flex w-full items-center text-left px-4 py-4 bg-blue-100 rounded">
                                        <p className="h-8 w-8 text-center text-white bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            {index + 1}
                                        </p>
                                        <div>
                                            <p className="w-full items-center text-left bg-blue-100 rounded">{course.mod_name}</p>
                                        </div>
                                    </button>
                                    {dropdownOpen === course._id && (
                                        <div className="border-x border-b border-blue-200 py-2 px-8">
                                            {subModales.filter(sub => sub.modales_id._id === course._id).map((lesson) => (
                                                <div key={lesson._id}>
                                                    {UserLoginType === "admin" || UserLoginType === "super_admin" ? (
                                                        <Link to={`/course/${course.courses_id._id}/modales/${lesson.modales_id._id}/lesson/${lesson._id}`}>
                                                            <div className="px-4 py-2 mt-2 bg-slate-100 rounded hover:scale-105 duration-700 border-2 hover:border-blue-400 delay-300">
                                                                <p className="font-semibold">{lesson.sub_name}</p>
                                                                <p className="flex space-x-2 text-sm text-gray-500 font-light">
                                                                    <FaLock /> <span>locked</span>
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ) : lesson.courses_id.course_type === "premium" ? (
                                                        <div onClick={handlePremiumClick} className="px-4 py-2 mt-2 bg-slate-100 rounded hover:scale-105 duration-700 border-2 hover:border-blue-400 delay-300 cursor-pointer">
                                                            <p className="font-semibold">{lesson.sub_name}</p>
                                                            <p className="flex space-x-2 text-sm text-gray-500 font-light">
                                                                <FaLock /> <span>locked</span>
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <Link to={`/course/${course.courses_id._id}/modales/${lesson.modales_id._id}/lesson/${lesson._id}`}>
                                                            <div className="px-4 py-2 mt-2 bg-slate-100 rounded hover:scale-105 duration-700 border-2 hover:border-blue-400 delay-300">
                                                                <p className="font-semibold">{lesson.sub_name}</p>
                                                                <p className="flex space-x-2 text-sm text-gray-500 font-light">
                                                                    <FaLock /> <span>locked</span>
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {showModal && (
                    <div
                        onClick={handleBackdropClick}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-lg p-4 m-2 w-full max-w-3xl shadow relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-bold mb-4 text-center">Premium Lesson</h2>
                            <div className="flex items-center justify-center">
                                <video
                                    className="w-full max-w-2xl lg:h-96 md:h-72 h-56 object-contain rounded-lg"
                                    controls
                                    autoPlay
                                >
                                    <source
                                        src={Video}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModalesDetails;
