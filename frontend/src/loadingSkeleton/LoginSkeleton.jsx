function LoginSkeleton() {

    return (
        <>
            <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center">
                <div className="mt-6 flex justify-center items-center px-4 w-full">
                    <div className="animate-pulse flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-blue-500/10 w-full max-w-md mx-auto px-6 sm:px-8 md:px-12 py-8">

                        {/* Logo Skeleton */}
                        <div className="h-20 w-20 rounded-full bg-gray-700"></div>

                        {/* Heading Skeleton */}
                        <div className="h-6 w-40 rounded bg-gray-700"></div>

                        {/* Sign Up Text Skeleton */}
                        <div className="h-4 w-56 rounded bg-gray-700"></div>

                        {/* Input Skeleton */}
                        <div className="flex items-center gap-3 w-full rounded-xl px-4 py-3 border border-gray-700 bg-white/5">
                            <div className="h-5 w-5 rounded bg-gray-700"></div>
                            <div className="h-5 flex-1 rounded bg-gray-700"></div>
                        </div>

                        {/* Buttons Skeleton */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
                            <div className="h-10 w-full sm:w-32 rounded-xl bg-gray-700"></div>
                            <div className="h-10 w-full sm:w-32 rounded-xl bg-gray-700"></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSkeleton;