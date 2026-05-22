import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 flex flex-col justify-between px-4 py-8 text-center antialiased">
      {/* Decorative ambient glow element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Empty spacer to push content to the center vertically */}
      <div className="hidden sm:block" />

      {/* Main Hero Content Container */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center my-auto">
        {/* Badge Location Tag */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-blue-400 border border-slate-700 mb-6 tracking-wide uppercase">
          📍  District
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          Management
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg max-w-md mb-8 leading-relaxed">
          An elegant, responsive database wrapper constructed to handle active inventory components and live analytical reports.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 text-center active:scale-[0.98]"
          >
            Login Portal
          </Link>
          
          <Link 
            to="/register" 
            className="bg-slate-800 text-slate-200 border border-slate-700/60 px-8 py-3.5 rounded-xl font-medium hover:bg-slate-700/80 transition-all duration-200 text-center active:scale-[0.98]"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Simple, Minimal Contact Footer */}
      <div className="relative border-t border-slate-800/60 pt-6 max-w-md w-full mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm text-slate-500">
          <p className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Email:</span> info@management.com
          </p>
          <span className="hidden sm:inline text-slate-700">•</span>
          <p className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Tel:</span> +250 780 000 000
          </p>
        </div>
      </div>
    </div>
  );
}