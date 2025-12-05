// src/utils/progress.js

// Ye function batata hai ki ek course kitne % complete hua hai
export const getCourseProgress = (course, courseIndex) => {
    let totalSubtopics = 0;
    let completedSubtopics = 0;
  
    course.topics.forEach((topic) => {
      topic.subtopics.forEach((sub) => {
        totalSubtopics++;
        // Check karo agar ye subtopic localStorage mein saved hai
        const storageKey = `completed-${courseIndex}-${topic.orderIndex}-${sub.orderIndex}`;
        if (localStorage.getItem(storageKey) === 'true') {
          completedSubtopics++;
        }
      });
    });
  
    if (totalSubtopics === 0) return 0;
    return Math.round((completedSubtopics / totalSubtopics) * 100);
  };
  
  // Ye function sara data reset kar dega (Bonus Feature)
  export const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };




  