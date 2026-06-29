function RegisterSkeleton ()  {
  return (
   <>
    <div className="flex flex-col bg-black items-center min-h-screen justify-center px-4 py-8 ">
      {/* Profile Image Skeleton */}
      <div className="relative mb-8 animate-pulse">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#1f1f1f] border border-white/10"></div>

        <div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#2b2b2b]"></div>
      </div>

      {/* Form Skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-8 sm:px-8 w-full max-w-md animate-pulse">
        {/* Heading */}
        <div className="h-8 w-36 bg-[#2b2b2b] rounded mx-auto mb-8 "></div>

        {/* Full Name */}
        <div className="mb-4">
          <div className="h-4 w-24 bg-[#2b2b2b] rounded mb-2"></div>
          <div className="h-12 w-full rounded-xl bg-[#1f1f1f]"></div>
        </div>

        {/* DOB */}
        <div className="mb-4">
          <div className="h-4 w-28 bg-[#2b2b2b] rounded mb-2"></div>
          <div className="h-12 w-full rounded-xl bg-[#1f1f1f]"></div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <div className="h-4 w-24 bg-[#2b2b2b] rounded mb-2"></div>
          <div className="h-12 w-full rounded-xl bg-[#1f1f1f]"></div>
        </div>

        {/* Username */}
        <div className="mb-6">
          <div className="h-4 w-24 bg-[#2b2b2b] rounded mb-2"></div>
          <div className="h-12 w-full rounded-xl bg-[#1f1f1f]"></div>
        </div>

        {/* Button */}
        <div className="h-12 w-full rounded-xl bg-[#2b2b2b]"></div>
      </div>
    </div></>
  );
};

export default RegisterSkeleton;