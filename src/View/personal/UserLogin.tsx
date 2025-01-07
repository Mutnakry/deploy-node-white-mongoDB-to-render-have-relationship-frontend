import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';

function UserLogin() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [last_name, setLast_name] = useState<string | null>(null);
    const [first_name, setFirst_name] = useState<string | null>(null);
    const [user_age, setUser_age] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [UserID, setUser_ID] = useState<string | null>(null);

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
        const storedID = localStorage.getItem("_id");

        if (storedEmail) {
            setUserEmail(storedEmail);
            setLast_name(storedLastName);
            setFirst_name(storedFirstName);
            setGender(storedGender);
            setUser_age(storedAge);
            setUser_ID(storedID);
        }
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-screen-lg mx-auto mt-20 p-4 border-2 border-blue-600'>
                <div className='space-y-2'>
                    <p className='space-x-2'><span className='text-yellow-700'>const</span><span className='text-blue-600'>( )</span> <span className='text-gray-600'>= </span> </p>
                    <div className='space-y-4 px-8'>
                    <h2 className='space-x-4 '><span className='text-blue-600'> Let = </span><span className='text-pink-600'>id  </span>: <span className='text-gray-600'> <span className='text-purple-600'></span> {UserID}</span></h2>
                        <h2 className='space-x-4 '><span className='text-blue-600'> Let = </span><span className='text-orange-600'>ឈ្មោះ  </span>: <span className='text-gray-600'> <span className='text-blue-600'>{last_name}</span> {first_name}</span></h2>
                        <h2 className='space-x-4 '><span className='text-blue-600'> Let = </span><span className='text-red-600'>ភេទ  </span>: <span className='text-purple-600'> {gender}</span></h2>
                        <h2 className='space-x-4 '><span className='text-blue-600'> Let = </span><span className=' text-green-600'>អាយុ  </span>: <span className='text-amber-500'> {user_age}</span></h2>

                        <h2 className='space-x-4 '><span className='text-blue-600'> Let = </span><span className='text-orange-600'>អ៊ីម៉ែល​  </span>: <span className='text-green-600'> {userEmail}</span></h2>

                    </div>
                    <p className='space-x-2'><span className='text-blue-600'>;</span> </p>

                </div>
                <div className='justify-end flex '>
                    <button onClick={handleLogout} className="text-blue-800 px-8 p-2 bg-gray-400">
                        ចាកចេញ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserLogin