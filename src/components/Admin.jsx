import React, { useState } from 'react';
import usersData from '../data/users.json';
import { Mail, Shield, User, GraduationCap, Search, FileText, Download, Upload, Database } from 'lucide-react';
import { exportUserData, importUserData } from '../utils/progress';

const Admin = () => {
  const usersList = usersData.users || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = usersList.filter(u => u.role === 'student').length;
  const totalTeachers = usersList.filter(u => u.role === 'teacher').length;

  return (
    <div className="max-w-6xl mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage users and system data.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm w-full sm:w-72 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Management (Import/Export) */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 mb-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Database size={24} className="text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Backup & Restore</h3>
            <p className="text-slate-300 text-xs mt-1">Export your progress or restore from a backup file.</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* EXPORT BUTTON */}
          <button 
            onClick={exportUserData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <Download size={16} /> Export JSON
          </button>

          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer border border-white/10 active:scale-95">
            <Upload size={16} /> Import JSON
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={importUserData} 
            />
          </label>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><User size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">{usersList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><GraduationCap size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Students</p>
            <p className="text-2xl font-bold text-slate-900">{totalStudents}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Shield size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instructors</p>
            <p className="text-2xl font-bold text-slate-900">{totalTeachers}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled Courses</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full border border-gray-200 object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Mail size={12} /> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${user.role === 'teacher' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        {user.role === 'teacher' ? <Shield size={12} className="fill-purple-200"/> : <User size={12} className="fill-blue-200"/>}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.role === 'teacher' ? (
                        <span className="text-xs text-slate-400 italic">Instructor Account</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {user.enrolledCourses && user.enrolledCourses.length > 0 ? user.enrolledCourses.map(cId => (
                                <span key={cId} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-200 flex items-center gap-1"><FileText size={10} /> ID: {cId}</span>
                              )) : <span className="text-slate-400 text-xs">No active courses</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'teacher' || (user.enrolledCourses && user.enrolledCourses.length > 0) ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Active</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>Inactive</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-500 text-sm">No users found matching "{searchTerm}"</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;






