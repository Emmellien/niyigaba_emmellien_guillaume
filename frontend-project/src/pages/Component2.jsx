import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Component2() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-slate-100 min-h-screen antialiased">
            {/* Sidebar with state controls */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main content wrapper */}
            <div className="flex-1 min-w-0 md:ml-72 p-4 md:p-6 transition-all duration-300">
                {/* Header with trigger callback */}
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Patients</p>
                        <h1 className="text-3xl font-bold mt-2 text-slate-900">100</h1>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Recovered</p>
                        <h1 className="text-3xl font-bold mt-2 text-green-600">76</h1>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Admitted</p>
                        <h1 className="text-3xl font-bold mt-2 text-yellow-600">20</h1>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Critical</p>
                        <h1 className="text-3xl font-bold mt-2 text-red-500">4</h1>
                    </div>
                </div>

                {/* Recent Patients List */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60 mt-6">
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
                        Recent Patients
                    </h2>

                    <div className="space-y-3">
                        {/* Patient Row 1 */}
                        <div className="flex items-center justify-between border border-slate-100 bg-slate-50/40 rounded-xl p-4 gap-4">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-sm md:text-base text-slate-800 truncate">Alice Johnson</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Female • 25 Years
                                </p>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium shrink-0">
                                Checked
                            </span>
                        </div>

                        {/* Patient Row 2 */}
                        <div className="flex items-center justify-between border border-slate-100 bg-slate-50/40 rounded-xl p-4 gap-4">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-sm md:text-base text-slate-800 truncate">Michael Smith</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Male • 31 Years
                                </p>
                            </div>
                            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium shrink-0">
                                Recovered
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Component2;