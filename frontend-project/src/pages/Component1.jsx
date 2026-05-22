import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Component1() {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Doctors
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">
                            Total registered doctors in the system.
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold mt-4 text-blue-600">
                            25
                        </h1>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Active Staff
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">
                            Staff members currently active.
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold mt-4 text-green-600">
                            18
                        </h1>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60 sm:col-span-2 lg:col-span-1">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Departments
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">
                            Available hospital departments.
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold mt-4 text-purple-600">
                            10
                        </h1>
                    </div>
                </div>

                {/* Data Table Container */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200/60 mt-6">
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
                        Doctor Information
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-400 font-medium">
                                    <th className="pb-3 font-semibold">Name</th>
                                    <th className="pb-3 font-semibold">Speciality</th>
                                    <th className="pb-3 font-semibold">Phone</th>
                                    <th className="pb-3 font-semibold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700 divide-y divide-slate-100">
                                <tr>
                                    <td className="py-3.5 font-medium text-slate-900">Dr John</td>
                                    <td className="py-3.5">Cardiology</td>
                                    <td className="py-3.5">0780000000</td>
                                    <td className="py-3.5 text-right">
                                        <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 font-medium text-slate-900">Dr Emma</td>
                                    <td className="py-3.5">Neurology</td>
                                    <td className="py-3.5">0781111111</td>
                                    <td className="py-3.5 text-right">
                                        <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Component1;