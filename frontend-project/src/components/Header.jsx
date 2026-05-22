import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

function Header({ onMenuToggle }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    const titles = {
        "/dashboard": "Dashboard",
        "/component1": "Component 1",
        "/component2": "Component 2",
        "/component3": "Component 3",
        "/report": "Analytical Reports"
    };

    const pageTitle = titles[location.pathname] || "Dashboard";

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 px-4 py-4 md:px-6 md:py-5 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                
                {/* LEFT INFO: TITLE & MOBILE TRIGGER TOGGLE */}
                <div className="flex items-center gap-3 justify-between sm:justify-start">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onMenuToggle}
                            className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition shrink-0"
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{pageTitle}</h1>
                            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">{currentDate}</p>
                        </div>
                    </div>

                    {/* Minimal Welcome Text on Small Screens instead of a duplicate bar */}
                    <div className="sm:hidden text-right">
                        <p className="text-xs text-slate-500">Hi, <span className="font-semibold text-slate-700">{user?.name?.split(' ')[0] || "Admin"}</span></p>
                    </div>
                </div>

                {/* RIGHT ACTIONS: SEARCH & USER BAR */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    
                    {/* SEARCH INPUT BAR */}
                    <div className="flex items-center bg-slate-100 px-3 py-2 rounded-xl flex-1 sm:w-60 md:w-72 max-w-md">
                        <Search size={18} className="text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none ml-2 w-full text-sm text-slate-700 placeholder-slate-400"
                        />
                    </div>

                    {/* NOTIFICATIONS BUTTON */}
                    <button className="relative bg-slate-100 p-2.5 rounded-xl hover:bg-slate-200 transition text-slate-600 shrink-0">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* DESKTOP USER AVATAR BADGE */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 pl-2 pr-3 py-1.5 rounded-xl shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="text-left">
                            <h3 className="text-xs font-semibold text-slate-800 leading-tight">{user?.name || "User"}</h3>
                            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Admin</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;