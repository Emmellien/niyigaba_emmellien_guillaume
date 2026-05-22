import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Report() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-slate-100 min-h-screen antialiased">
            {/* Sidebar with state controls */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main content wrapper */}
            <div className="flex-1 min-w-0 md:ml-72 p-4 md:p-6 transition-all duration-300 space-y-6">
                {/* Header with trigger callback */}
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                {/* TITLE CONTAINER */}
                <div className="mt-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                        Reports Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Summary of system performance and appointments
                    </p>
                </div>

                {/* KPI CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Appointments</p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">120</h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completed</p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 text-green-600">96</h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pending</p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 text-yellow-500">18</h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Cancelled</p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 text-red-500">6</h2>
                    </div>
                </div>

                {/* MAIN REPORT CONTENT */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* UPCOMING APPOINTMENTS */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Upcoming Appointments
                        </h2>

                        <div className="space-y-3">
                            <div className="border border-slate-100 bg-slate-50/40 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                                <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                                    Dr John & Patient Alice
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                                    Monday • 09:00 AM
                                </p>
                            </div>

                            <div className="border border-slate-100 bg-slate-50/40 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                                <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                                    Dr Emma & Patient David
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                                    Tuesday • 11:30 AM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STATUS REPORT */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Appointment Status
                        </h2>

                        <div className="space-y-5">
                            {/* Completed */}
                            <div>
                                <div className="flex justify-between text-sm mb-1.5 text-slate-600 font-medium">
                                    <span>Completed</span>
                                    <span className="text-slate-900">80%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-3 rounded-full w-[80%]" />
                                </div>
                            </div>

                            {/* Pending */}
                            <div>
                                <div className="flex justify-between text-sm mb-1.5 text-slate-600 font-medium">
                                    <span>Pending</span>
                                    <span className="text-slate-900">15%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="bg-yellow-500 h-3 rounded-full w-[15%]" />
                                </div>
                            </div>

                            {/* Cancelled */}
                            <div>
                                <div className="flex justify-between text-sm mb-1.5 text-slate-600 font-medium">
                                    <span>Cancelled</span>
                                    <span className="text-slate-900">5%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-3 rounded-full w-[5%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Report;