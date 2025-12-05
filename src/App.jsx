import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import Admin from './components/Admin';
import Welcome from './components/Welcome';
import coursesData from './data/courses.json'; 
import { UserCog, Menu, X, BookOpen, RotateCcw } from 'lucide-react';
import { resetAllProgress } from './utils/progress';
import profileImg from './assets/profile.jpg'; 

const MainLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      <header className="h-20 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 fixed top-0 w-full z-30 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          {!isAdmin && (
            <button 
              className="md:hidden text-slate-500 hover:bg-slate-200 p-2 rounded-xl transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <BookOpen size={26} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-800">
              Learn<span className="text-blue-600">Dev</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Reset Button */}
          <button 
            onClick={resetAllProgress}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-orange-700 bg-orange-50 border border-orange-100 hover:bg-orange-100 hover:shadow-md transition-all"
            title="Reset all course progress"
          >
            <RotateCcw size={18} /> <span>Reset Progress</span>
          </button>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          {/* Admin Button */}
          <Link 
            to="/admin" 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border
              ${isAdmin 
                ? "bg-blue-600 text-white border-blue-600 shadow-blue-200" 
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
              }`}
          >
            <UserCog size={18} />
            <span>Admin Panel</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 cursor-pointer border-l border-slate-200 ml-2">
             <div className="hidden md:block text-right leading-tight">
               <p className="text-base font-bold text-slate-800">Nikita</p>
               <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Student</p>
            </div>

            <div className="h-11 w-11 rounded-full bg-white p-1 shadow-md border border-slate-100 overflow-hidden">
               <img 
                 src={profileImg} 
                 alt="Profile" 
                 className="h-full w-full rounded-full object-cover"
                 onError={(e) => {e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikita'}} 
               />
            </div>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <div className="pt-20 flex relative">
        {!isAdmin && (
          <aside className={`
            fixed md:fixed top-20 bottom-0 left-0 w-72 bg-[#0f172a] border-r border-slate-800 z-20 
            transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}>
            <Sidebar courses={coursesData.courses} onCloseMobile={() => setIsSidebarOpen(false)} />
          </aside>
        )}
        
        <main className={`flex-1 w-full p-6 md:p-10 ${!isAdmin ? 'md:ml-72' : ''} min-h-[calc(100vh-5rem)]`}>
           <Routes>
             <Route path="/" element={<Welcome />} />
             <Route path="/course/:courseId/topic/:topicId/sub/:subId" element={<ContentArea />} />
             <Route path="/admin" element={<Admin />} />
           </Routes>
        </main>
      </div>
      
      {isSidebarOpen && !isAdmin && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;