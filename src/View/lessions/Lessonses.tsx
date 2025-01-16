import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdMenuBook, MdQuestionAnswer } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { API_URL } from '../../services/api.tsx';

import html2canvas from 'html2canvas';
import { FaRegCopy, FaFileDownload } from "react-icons/fa";

// Define the interface for the lessons
interface LessonesID {
    _id: number;
    les_name: string;
    modale_id: number;
    courses_id: number;
    submodale_id: number;
    title: string;
    coursecode: string;
    video_url: string;
    image_url: string;
    description: string;
}

function CourseModale() {
    const [lessonesID, setLessonesID] = useState<LessonesID[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const codeBlockRef = useRef<HTMLDivElement>(null);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const { courseId, modaleId, submodaleId } = useParams<{ courseId: string; modaleId: string; submodaleId: string }>();
  


    useEffect(() => {
        fetchLessonesID();
    }, [modaleId, courseId, submodaleId]);

    const fetchLessonesID = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await axios.get<LessonesID[]>(`${API_URL}/api/lessions/${courseId}/${modaleId}/${submodaleId}`);
                setLessonesID(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching lessons:', err);
                setError('សូមព្យាយាមម្ដងទៀត​!');
            } finally {
                setLoading(false);
            }
        }, 1500);
    };


    const downloadAsImage = async () => {
        if (codeBlockRef.current) {
            const canvas = await html2canvas(codeBlockRef.current);
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'handwritten-code.png';
            link.click();
        }
    };

    const copyToClipboard = (coursecode: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(coursecode)
                .then(() => {
                    setCopySuccess('Copied');
                    setTimeout(() => setCopySuccess(null), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy code:', err);
                });
        } else {
            // Fallback to older execCommand method
            const textArea = document.createElement('textarea');
            textArea.value = coursecode;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopySuccess('Copied');
                setTimeout(() => setCopySuccess(null), 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    };


    const handleToggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className='pt-24 '>
            <div className='max-w-screen-2xl mx-auto   h-screen overflow-y-auto scrollbar-hidden'>
                {loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <DotLottieReact
                            src="https://lottie.host/81f92f1b-f4f2-4022-bc46-489ce70373c0/W2ixVM5et2.lottie"
                            speed={1}
                            style={{ width: '300px', height: '300px' }}
                            loop
                            autoplay
                        />
                    </div>

                ) : error ? (
                    <div className='text-center text-red-500 py-8  '>
                        <p>{error}</p>
                        <div className="h-screen flex justify-center items-center">
                            <DotLottieReact
                                src="https://lottie.host/81f92f1b-f4f2-4022-bc46-489ce70373c0/W2ixVM5et2.lottie"
                                speed={1}
                                style={{ width: '300px', height: '300px' }}
                                loop
                                autoplay
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        {lessonesID.map((lesson) => (
                            <div key={lesson._id} className='mb-8 border-l-2 md:px-4 px-2'>
                                <h2 className='text-2xl font-bold mb-4 flex space-x-4 text-blue-600'><span> <MdMenuBook className='text-4xl' /> </span><span>{lesson.les_name}</span></h2>
                                <h2 className='text-xl font-bold mb-4 flex space-x-4 px-8 text-purple-600'><span><MdQuestionAnswer className='text-xl' /></span><span>{lesson.title}</span></h2>
                                <div className="relative">
                                    <p
                                        className={`text-md text-gray-700 space-x-4 px-8 ${showFullDescription ? 'block' : 'line-clamp-4'}`}
                                    >
                                        <span>{lesson.description}</span>
                                    </p>
                                    <button
                                        onClick={handleToggleDescription}
                                        className="mt-3 px-8 text-blue-600 hover:underline focus:outline-none"
                                    >
                                        {showFullDescription ? "បន្ថយ" : "មើលបន្ថែម"}
                                    </button>
                                </div>

                                <div className="flex justify-center items-center">
                                    {lesson.image_url ? (
                                        <div className="flex justify-center items-center py-2">
                                            <img
                                                src={`${API_URL}${lesson.image_url}`}
                                                alt="Lesson Image"
                                                className="w-full lg:h-96 md:h-72 h-56 object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>

                                <div className="flex justify-center items-center rounded">
                                    {lesson.video_url ? (
                                        <div className="flex justify-center items-center py-2  bg-slate-200 shadow-sm md:p-4">
                                            <video className="rounded" controls>
                                                <source
                                                    src={`${API_URL}${lesson.video_url}`}
                                                    className='rounded'
                                                />
                                            </video>
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>

                                <div className='relative'>
                                    <div ref={codeBlockRef} className='relative bg-gray-100 rounded-lg shadow-lg text-sm'>
                                        <SyntaxHighlighter language="dart" style={atomDark}>
                                            {lesson.coursecode}
                                        </SyntaxHighlighter>
                                    </div>

                                    <div className='flex absolute space-x-3 right-2 top-2'>
                                        <div className="relative group">
                                            <button
                                                onClick={() => copyToClipboard(lesson.coursecode)}
                                                className="bg-slate-600 text-white px-2 py-2 rounded hover:bg-slate-800 opacity-50"
                                            >
                                                <FaRegCopy />
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                Copy
                                            </span>
                                            {copySuccess && (
                                                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-green-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                    ✔ Copied
                                                </span>
                                            )}
                                        </div>

                                        <div className="relative group">
                                            <button
                                                onClick={downloadAsImage}
                                                className='bg-slate-600 text-white px-2 py-2 rounded hover:bg-slate-800 opacity-50'
                                            >
                                                <FaFileDownload />
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                Save Image
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
                <hr />
            </div>
        </div>
    );
}

export default CourseModale;







