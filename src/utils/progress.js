export const getCourseProgress = (course, courseIndex) => {
    let totalSubtopics = 0;
    let completedSubtopics = 0;
  
    course.topics.forEach((topic) => {
      topic.subtopics.forEach((sub) => {
        totalSubtopics++;
        const storageKey = `completed-${courseIndex}-${topic.orderIndex}-${sub.orderIndex}`;
        if (localStorage.getItem(storageKey) === 'true') {
          completedSubtopics++;
        }
      });
    });
  
    if (totalSubtopics === 0) return 0;
    return Math.round((completedSubtopics / totalSubtopics) * 100);
  };
  export const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };


  export const exportUserData = () => {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "learndev-backup.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  export const importUserData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        localStorage.clear();
        
        Object.keys(data).forEach((key) => {
          localStorage.setItem(key, data[key]);
        });
  
        alert("Data imported successfully!");
        window.location.reload(); 
      } catch (error) {
        alert("Invalid file! Please upload a valid JSON backup.");
      }
    };
    
    reader.readAsText(file);
  };



