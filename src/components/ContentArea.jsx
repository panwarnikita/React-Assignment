import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import coursesData from '../data/courses.json'; 
import { CheckCircle, Circle, BookOpen } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ContentArea = () => {
  const { courseId, topicId, subId } = useParams();
  const [completed, setCompleted] = useState(false);

  const course = coursesData.courses[courseId];
  const topic = course?.topics.find(t => t.orderIndex == topicId);
  const subtopic = topic?.subtopics.find(s => s.orderIndex == subId);

  const storageKey = `completed-${courseId}-${topicId}-${subId}`;

  useEffect(() => {
    if (subId) {
      const isDone = localStorage.getItem(storageKey) === 'true';
      setCompleted(isDone);
    }
  }, [courseId, topicId, subId]);

  const toggleCompletion = () => {
    const newState = !completed;
    setCompleted(newState);
    localStorage.setItem(storageKey, newState);
  };

  if (!course || !topic || !subtopic) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <BookOpen size={64} className="mb-6 opacity-20" />
        <h2 className="text-2xl font-bold text-slate-600 mb-2">Select a Topic</h2>
        <p>Choose a lesson from the sidebar to start reading.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <nav className="text-sm font-medium text-slate-500 mb-6 flex flex-wrap gap-2 items-center px-2">
        <span className="hover:text-blue-600 cursor-pointer transition">{course.title}</span> 
        <span className="text-slate-300">/</span>
        <span className="hover:text-blue-600 cursor-pointer transition">{topic.title}</span> 
        <span className="text-slate-300">/</span>
        <span className="text-blue-600 font-bold">{subtopic.title}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50/50 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{subtopic.title}</h1>
             <p className="text-slate-500 mt-2 font-medium">Read carefully and mark as complete.</p>
          </div>
          
          <button
            onClick={toggleCompletion}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border shadow-sm transition-all font-bold whitespace-nowrap ${
              completed 
                ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" 
                : "bg-white border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
            }`}
          >
            {completed ? <CheckCircle size={22} className="text-green-600"/> : <Circle size={22} />}
            {completed ? "Completed" : "Mark Complete"}
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <article className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-bold prose-headings:text-slate-800 
            prose-p:leading-relaxed prose-li:marker:text-blue-500
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-pre:bg-[#282a36] prose-pre:shadow-xl prose-pre:rounded-2xl">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md font-bold text-[0.9em] border border-slate-200" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {subtopic.content}
            </ReactMarkdown>
          </article>
        </div>
      
      </div>
    </div>
  );
};

export default ContentArea;