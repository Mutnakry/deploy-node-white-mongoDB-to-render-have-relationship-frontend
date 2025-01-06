// import { FaTelegram, FaFacebook } from "react-icons/fa";
// import QR from '../assets/qrcode.png'
// function Footer() {
//     return (
//         <footer className="px-4 pt-4 bg-sky-700/50 w-full mt-4 overflow-hidden">
//             <div className="max-w-screen-2xl mx-auto px-4 ">
//                 <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
//                     {/* Follow Khmer 24 Section */}
//                     <div className="space-y-3">
//                         <p className="text-sm">អនុវត្តតាមសិស្ស</p>
//                         <div className="space-y-5">
//                             <a href="#" className="flex items-center space-x-4">
//                                 <FaFacebook className='text-4xl text-white' />
//                                 <span>Facebook</span>
//                             </a>
//                             <a href="#" className="flex items-center space-x-4">
//                                 <FaTelegram className='text-4xl text-white' />
//                                 <span>Telegram</span>
//                             </a>  
//                         </div>
//                     </div>

//                     {/* Customer Service Section */}
//                     <div className="text-center space-y-4">
//                         <p className="text-sm">សេវាកម្មអតិថិជន</p>

//                         <p>  096 575 2080</p>
//                         <p>   096 575 2080</p>
//                     </div>

//                     {/* Useful Information Section */}
//                     <div className="text-center space-y-4">
//                         <p className="text-sm">ព័ត៌មានដែលមានប្រយោជន៍</p>
//                         <a href="#top" className="text-sm hover:underline">
//                         គន្លឹះសុវត្តិភាព
//                         </a>
//                         <br />
//                         <a href="#top" className="text-sm">
//                         ច្បាប់នៃការផ្សព្វផ្សាយផលិតផល
//                         បញ្ចេញមតិ
//                         </a>
//                     </div>

//                     {/* App Download Section */}
//                     <div className="text-center">
//                         <p className="text-sm mb-4">ទាញយកកម្មវិធី ដោយឥតគិតថ្លៃ</p>
//                         <div className="flex flex-col md:flex-row items-center gap-4">
//                             <a href=""></a>
//                             <img
//                                 src={QR}
//                                 alt="QR Code"
//                                 className="h-32"
//                             />
                          
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer Image */}
//                 <img
//                     className="w-full max-w-screen-xl mx-auto mt-6 translate-y-8"
//                     src="https://www.khmer24.com/icon/khmer24_footer.png"
//                     alt="Footer"
//                 />
//             </div>
//         </footer>
//     );
// }

// export default Footer;


import { useState, useEffect } from 'react';

import { FaTelegram, FaFacebook } from "react-icons/fa";
import QR from '../assets/qrcode.png';

function Footer() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <footer className="px-4 pt-4 bg-sky-700/50 w-full mt-4 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 ">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {/* Follow Khmer 24 Section */}
                    <div className="space-y-3">
                        <p className="text-sm">អនុវត្តតាមសិស្ស</p>
                        <div className="space-y-5">
                            {loading ? (
                                <>
                                    <div className="flex items-center space-x-4 animate-pulse">
                                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                                    </div>
                                    <div className="flex items-center space-x-4 animate-pulse">
                                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a href="#" className="flex items-center space-x-4">
                                        <FaFacebook className='text-4xl text-white' />
                                        <span>Facebook</span>
                                    </a>
                                    <a href="#" className="flex items-center space-x-4">
                                        <FaTelegram className='text-4xl text-white' />
                                        <span>Telegram</span>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Customer Service Section */}
                    <div className="text-center space-y-4">
                        <p className="text-sm">សេវាកម្មអតិថិជន</p>
                        {loading ? (
                            <>
                                <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                            </>
                        ) : (
                            <>
                                <p>096 575 2080</p>
                                <p>096 575 2080</p>
                            </>
                        )}
                    </div>

                    {/* Useful Information Section */}
                    <div className="text-center space-y-4">
                        <p className="text-sm">ព័ត៌មានដែលមានប្រយោជន៍</p>
                        {loading ? (
                            <>
                                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                            </>
                        ) : (
                            <>
                                <a href="#top" className="text-sm hover:underline">
                                    គន្លឹះសុវត្តិភាព
                                </a>
                                <br />
                                <a href="#top" className="text-sm">
                                    ច្បាប់នៃការផ្សព្វផ្សាយផលិតផល
                                    បញ្ចេញមតិ
                                </a>
                            </>
                        )}
                    </div>

                    {/* App Download Section */}
                    <div className="text-center">
                        <p className="text-sm mb-4">ទាញយកកម្មវិធី ដោយឥតគិតថ្លៃ</p>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {loading ? (
                                <div className="h-32 w-32 bg-gray-300 rounded animate-pulse"></div>
                            ) : (
                                <img
                                    src={QR}
                                    alt="QR Code"
                                    className="h-32"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Image */}
                {loading ? (
                    <div className="h-24 bg-gray-100 rounded animate-pulse mt-6"></div>
                ) : (
                    <img
                        className="w-full max-w-screen-xl mx-auto mt-6 translate-y-8"
                        src="https://www.khmer24.com/icon/khmer24_footer.png"
                        alt="Footer"
                    />
                )}
            </div>
        </footer>
    );
}

export default Footer;
