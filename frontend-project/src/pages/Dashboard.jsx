import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-slate-100 min-h-screen antialiased">
            {/* SIDEBAR NAVIGATION PANEL */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* MAIN MAIN VIEWPORT SECTION */}
            <div className="flex-1 min-w-0 md:ml-72 p-4 md:p-6 transition-all duration-300">
                
                {/* RESPONSIVE HEADER BAR */}
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                {/* DASHBOARD GRID WIDGETS STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* STAT CARD 1 */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total P</p>
                        <h1 className="text-3xl font-bold mt-2 text-blue-600">25</h1>
                        <p className="text-green-500 text-xs mt-2 font-medium">+12% this month</p>
                    </div>

                    {/* STAT CARD 2 */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Patients</p>
                        <h1 className="text-3xl font-bold mt-2 text-green-600">100</h1>
                        <p className="text-green-500 text-xs mt-2 font-medium">+8% this week</p>
                    </div>

                    {/* STAT CARD 3 */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Appointments</p>
                        <h1 className="text-3xl font-bold mt-2 text-purple-600">50</h1>
                        <p className="text-yellow-600 text-xs mt-2 font-medium">5 pending today</p>
                    </div>

                    {/* STAT CARD 4 */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Revenue</p>
                        <h1 className="text-3xl font-bold mt-2 text-red-500">Rwf12K</h1>
                        <p className="text-green-500 text-xs mt-2 font-medium">+15% this month</p>
                    </div>
                </div>

                {/* MAIN CONTENT DATA TABLES */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* RECENT PATIENTS DATA TABLE */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
                            <button className="text-blue-600 text-xs font-semibold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-400 font-medium">
                                        <th className="pb-3 font-semibold">Patient</th>
                                        <th className="pb-3 font-semibold">Age</th>
                                        <th className="pb-3 font-semibold">Disease</th>
                                        <th className="pb-3 font-semibold text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700 divide-y divide-slate-100">
                                    <tr>
                                        <td className="py-3.5 font-medium text-slate-900">Alice Johnson</td>
                                        <td className="py-3.5">25</td>
                                        <td className="py-3.5">Malaria</td>
                                        <td className="py-3.5 text-right">
                                            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">Recovered</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3.5 font-medium text-slate-900">David Smith</td>
                                        <td className="py-3.5">30</td>
                                        <td className="py-3.5">Typhoid</td>
                                        <td className="py-3.5 text-right">
                                            <span className="bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-medium">Admitted</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3.5 font-medium text-slate-900">Emma Brown</td>
                                        <td className="py-3.5">19</td>
                                        <td className="py-3.5">Flu</td>
                                        <td className="py-3.5 text-right">
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Checking</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT SIDE PANEL CARDS */}
                    <div className="space-y-6">
                        {/* APPOINTMENTS PANEL */}
                        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Today's Appointments</h2>
                            <div className="space-y-3">
                                <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-3.5">
                                    <h3 className="font-semibold text-sm text-slate-800">Dr John - Alice</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">09:00 AM</p>
                                </div>
                                <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-3.5">
                                    <h3 className="font-semibold text-sm text-slate-800">Dr Emma - David</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">11:30 AM</p>
                                </div>
                            </div>
                        </div>

                        {/* RECENT ACTIVITY LOG PANEL */}
                        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                                    <div>
                                        <p className="font-medium text-slate-800">New patient registered</p>
                                        <p className="text-xs text-slate-400 mt-0.5">10 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                                    <div>
                                        <p className="font-medium text-slate-800">Appointment completed</p>
                                        <p className="text-xs text-slate-400 mt-0.5">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;