import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
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
    const [modalesList, setModalesList] = useState<Modales[]>([]);
    const [subModales, setSubModales] = useState<SubModales[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId, modaleId, submodaleId } = useParams<{ courseId: string; modaleId: string; submodaleId: string }>();

    useEffect(() => {
        const fetchModales = async () => {
            try {
                const response = await axios.get<Modales[]>(`${API_URL}api/modales/${courseId}`);
                setModalesList(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch modales');
                setLoading(false);
            }
        };

        if (courseId) {
            fetchModales();
        }
    }, [courseId]);

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

    useEffect(() => {
        if (modaleId) {
            setDropdownOpen(modaleId);
        }
    }, [modaleId]);

  

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='mt-24'>
            <div className='max-w-screen-2xl mx-auto md:px-4 px-1 h-screen overflow-y-auto scrollbar-hidden'>
                {loading ? (
                    <div className="h-screen flex justify-center items-center">
                       <p></p>
                    </div>
                ) : (
                    <div className="space-y-4 md:p-4 p-1 bg-white">
                        <h2 className='text-blue-600 text-xl font-NotoSansKhmer'>Course</h2>
                        {modalesList.map((course, index) => (
                            <div key={course._id}>

                                <button
                                    onClick={() => setDropdownOpen(prev => (prev === course._id ? null : course._id))}
                                    className={`flex w-full items-center text-left md:px-4 px-1 overflow-hidden py-4 rounded-t ${dropdownOpen === course._id ? 'bg-blue-400' : 'bg-blue-100'}`}
                                >
                                    <p className="h-8 w-8 p-3 text-center text-white bg-slate-700 rounded-full flex items-center justify-center md:mr-4 mr-2">
                                        {index + 1}
                                    </p>
                                    <div>
                                        <p className="w-full items-center text-left text-gray-500 rounded">{course.mod_name}</p>
                                    </div>
                                </button>

                                {dropdownOpen === course._id && (
                                    <div className="border-x border-b border-blue-200 py-2 md:px-4 px-2">
                                        {subModales.filter(sub => sub.modales_id._id === course._id).map((lesson) => (
                                            <div key={lesson._id}>
                                                <Link
                                                    to={`/course/${course.courses_id._id}/modales/${lesson.modales_id._id}/lesson/${lesson._id}`}
                                                    onClick={() => setDropdownOpen(lesson.modales_id._id)}
                                                >
                                                    <div
                                                        className={`md:px-4 px-1 py-2 mt-2 overflow-hidden rounded hover:scale-110 duration-700 border-2 delay-300 ${lesson._id === submodaleId ? 'bg-blue-400 text-white' : 'bg-slate-100 hover:border-blue-700'
                                                            }`}
                                                    >
                                                        <p className="font-semibold space-x-2 md:text-sm text-gray-500 capitalize ">{lesson.sub_name}</p>
                                                        <p className="flex space-x-2 md:text-sm text-xs text-gray-500 font-light">
                                                            <FaLock /> <span>locked</span>
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalesDetails;
