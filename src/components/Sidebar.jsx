import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen, Search, Circle } from 'lucide-react';


const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-500/40 text-yellow-200 px-0.5 rounded border border-yellow-500/50 font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const Sidebar = ({ courses = [], onCloseMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({});

  const safeCourses = Array.isArray(courses) ? courses : [];
  const search = searchTerm.toLowerCase();

  const filteredCourses = safeCourses.filter(course => {
    if (!search) return true;
    if (course.title.toLowerCase().includes(search)) return true;
    return course.topics.some(topic => {
      if (topic.title.toLowerCase().includes(search)) return true;
      return topic.subtopics.some(sub => sub.title.toLowerCase().includes(search));
    });
  });

  const toggleTopic = (key) => {
    setExpandedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-64 bg-[#0f172a] text-slate-100 border-r border-slate-800 h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-7 flex items-center gap-3 font-bold text-xl border-b border-slate-800/50">
        <BookOpen className="text-[#2563eb]" size={24} />
        <span className="tracking-wide">Course Explorer</span>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search specific topic..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563eb] text-slate-100 placeholder-slate-400 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {filteredCourses.length === 0 ? (
          <p className="text-slate-400 text-sm text-center mt-4">No results found.</p>
        ) : (
          filteredCourses.map((course, index) => {
            const courseIndex = safeCourses.findIndex(c => c.title === course.title);
            
            const isCourseExpanded = search.length > 0 || expandedTopics[course.title];
            const isCourseMatch = course.title.toLowerCase().includes(search);

            return (
              <div key={courseIndex} className="mb-3">
                {/* Course Title */}
                <button
                  onClick={() => toggleTopic(course.title)}
                  className="w-full flex items-center justify-between px-3 py-3 text-[15px] font-semibold text-slate-200 hover:bg-[#1e293b] hover:text-white rounded-lg transition-colors"
                >
                  <span className="truncate pr-2">
                    <HighlightText text={course.title} highlight={searchTerm} />
                  </span>
                  {isCourseExpanded ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
                </button>
                
                {/* Topics List */}
                {isCourseExpanded && (
                  <div className="mt-1 ml-1 space-y-1">
                    {course.topics
                      .filter(topic => {
                        if (!search) return true;
                        if (isCourseMatch) return true;
                        return topic.title.toLowerCase().includes(search) || 
                               topic.subtopics.some(sub => sub.title.toLowerCase().includes(search));
                      })
                      .map((topic) => {
                        
                        const isTopicExpanded = search.length > 0 || expandedTopics[course.title + topic.title];
                        const isTopicMatch = topic.title.toLowerCase().includes(search);

                        return (
                        <div key={topic.orderIndex}>
                          <button
                            onClick={() => toggleTopic(course.title + topic.title)}
                            className="w-full flex items-center justify-between pl-4 pr-3 py-2 text-[14px] font-medium text-slate-400 hover:text-blue-400 hover:bg-[#1e293b]/50 rounded-md transition-colors"
                          >
                            <span className="truncate">
                               <HighlightText text={topic.title} highlight={searchTerm} />
                            </span>
                            {isTopicExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>

                          {/* Subtopics List */}
                          {isTopicExpanded && (
                            <div className="ml-4 border-l border-slate-700 pl-2 mt-1 space-y-0.5">
                              {topic.subtopics
                                .filter(sub => {
                                  if (!search) return true;
                                  if (isCourseMatch || isTopicMatch) return true;
                                  return sub.title.toLowerCase().includes(search);
                                })
                                .map((sub) => (
                                  <NavLink
                                    key={sub.orderIndex}
                                    to={`/course/${courseIndex}/topic/${topic.orderIndex}/sub/${sub.orderIndex}`}
                                    onClick={onCloseMobile}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 text-[13px] py-2 px-3 rounded-md transition-all truncate ${
                                        isActive 
                                          ? "bg-[#2563eb] text-white font-medium shadow-md" 
                                          : "text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]" 
                                      }`
                                    }
                                  >
                                    {({ isActive }) => (
                                      <>
                                        <Circle size={6} fill="currentColor" className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                                        <span className="truncate">
                                           <HighlightText text={sub.title} highlight={searchTerm} />
                                        </span>
                                      </>
                                    )}
                                  </NavLink>
                                ))
                              }
                            </div>
                          )}
                        </div>
                      )})}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;