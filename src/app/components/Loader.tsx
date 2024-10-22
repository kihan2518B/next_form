// "use client"
// export default function Loader() {
//     return (
//         <div className="loader_body">
//             <main className='loader_main'>
//                 <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
//                     <defs>
//                         <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
//                             <stop offset="0%" stopColor="#5ebd3e" />
//                             <stop offset="33%" stopColor="#ffb900" />
//                             <stop offset="67%" stopColor="#f78200" />
//                             <stop offset="100%" stopColor="#e23838" />
//                         </linearGradient>
//                         <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
//                             <stop offset="0%" stopColor="#e23838" />
//                             <stop offset="33%" stopColor="#973999" />
//                             <stop offset="67%" stopColor="#009cdf" />
//                             <stop offset="100%" stopColor="#5ebd3e" />
//                         </linearGradient>
//                     </defs>
//                     <g fill="none" strokeLinecap="round" strokeWidth="16">
//                         <g className="ip__track" stroke="#ddd">
//                             <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
//                             <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
//                         </g>
//                         <g strokeDasharray="180 656">
//                             <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
//                             <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
//                         </g>
//                     </g>
//                 </svg>
//                 <div className="">Loading</div>
//             </main>
//         </div>
//     )
// }


import { useEffect, useState } from 'react';

export default function Loader() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader_body relative flex items-center justify-center min-h-[300px] w-full bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            <main className='loader_main relative flex flex-col items-center gap-8'>
                {/* Original SVG Loader */}
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>

                {/* Modern Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 animate-pulse">
                        Loading{dots}
                    </div>
                    {/* Progress rings */}
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping animation-delay-400"></div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    );
}