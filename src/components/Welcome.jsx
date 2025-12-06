import React from 'react';
import { BookOpen, Video, ArrowRight, Zap, CheckCircle2, Clock, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import coursesData from '../data/courses.json';
import { getCourseProgress } from '../utils/progress';

import fullStackImg from '../assets/fullstack.png'; 
import dsaImg from '../assets/dsa.png';
import mlImg from '../assets/ml.png';

const Welcome = () => {

  const getCourseImage = (title) => {
    if (title.includes("Full Stack")) return fullStackImg;
    if (title.includes("Data Structures")) return dsaImg;
    if (title.includes("Machine Learning")) return mlImg;
    return fullStackImg;
  };

  const totalCourses = coursesData.courses.length;
  const totalLessons = coursesData.courses.reduce((acc, c) => acc + c.topics.reduce((tAcc, t) => tAcc + t.subtopics.length, 0), 0);

  return (
    <div className="max-w-6xl mx-auto font-sans">
      
      {/* HERO SECTION */}
      <div className="mb-16 mt-4">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-2">Dashboard</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Welcome, Nikita! 👋
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          You have access to <span className="font-semibold text-slate-800">{totalCourses} courses</span> and <span className="font-semibold text-slate-800">{totalLessons} lessons</span>. 
          Pick up where you left off or start something new.
        </p>

        {/* Quick Stats Row */}
        <div className="flex gap-6 mt-8">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <CheckCircle2 size={18} className="text-green-500" /> Track Progress
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
         <div>
           <h2 className="text-2xl font-bold text-slate-900">Your Courses</h2>
           <p className="text-slate-500 text-sm mt-1">Start learning by selecting a card below.</p>
         </div>
      </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {coursesData.courses.map((course, index) => {
          const topicCount = course.topics.length;
          const lessonCount = course.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
          const progress = getCourseProgress(course, index);

          return (
            <Link 
              key={index}
              to={`/course/${index}/topic/1/sub/1`}
              className="group flex flex-col bg-white rounded-xl border border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden relative bg-gray-200">
                <img 
                  src={getCourseImage(course.title)} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  onError={(e) => {e.target.src = 'https://placehold.co/600x400/f1f5f9/94a3b8?text=Course'}} 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 shadow-sm border border-gray-100">
                    {course.difficulty}
                  </span>
                </div>
              </div>

              {/* Progress Line - GREEN & THICKER */}
              <div className="w-full bg-gray-200 h-1.5">
                <div 
                  className="bg-green-500 h-1.5 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                  {course.description}
                </p>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5"><BookOpen size={14}/> {topicCount} Modules</span>
                  </div>
                  
                  {progress > 0 ? (
                    <span className="text-sm font-extrabold text-green-700 bg-green-100 px-3 py-1 rounded-md border border-green-200 shadow-sm">
                      {progress}% Done
                    </span>
                  ) : (
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* FEATURE CARDS*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:border-blue-300 transition-colors group">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Clock size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Self-Paced</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Learn at your own convenience without strict deadlines.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:border-orange-300 transition-colors group">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Target size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Track Goals</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Visualize your daily progress and stay consistent.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:border-green-300 transition-colors group">
          <div className="p-4 bg-green-50 text-green-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Award size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Certificates</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Earn badges and certificates upon course completion.</p>
        </div>
      </div>

    </div>
  );
};

export default Welcome;