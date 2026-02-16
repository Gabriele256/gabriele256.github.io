"use client";

export default function BackgroundBlobs() {
    return (
        <>
            <style jsx global>{`
                @keyframes blob-bounce {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(100px, 50px) scale(1.1); }
                    50% { transform: translate(-10px, 190px) scale(0.9); }
                    75% { transform: translate(-180px, -50px) scale(1.55); }
                }

                @keyframes blob-float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -100px) scale(1.2); }
                    66% { transform: translate(-20px, 50px) scale(0.8); }
                }

                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-150px, 80px) scale(1.1) rotate(10deg); }
                }

                .animate-blob-1 {
                    animation: blob-bounce 23s infinite ease-in-out alternate;
                }
                .animate-blob-2 {
                    animation: blob-float 29s infinite ease-in-out reverse;
                }
                .animate-blob-3 {
                    animation: blob-drift 31s infinite ease-in-out;
                }
            `}</style>

            <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none bg-gray-950">
                <div className="absolute inset-0 filter blur-[80px] opacity-60">
                    
                    <div
                        className="animate-blob-1 absolute top-0 left-0 w-125 h-125 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                    />

                    <div
                        className="animate-blob-1 absolute top-0 right-0 w-125 h-125 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                    />

                    <div
                        className="animate-blob-1 absolute -bottom-32 left-20 w-125 h-125 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                    />
                </div>
            </div>
        </>
    );
}