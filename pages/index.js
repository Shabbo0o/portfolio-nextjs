import { usePortfolio } from "../contexts/PortfolioContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const { projects, techSkills, darkMode, setDarkMode } = usePortfolio();

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      
      <button className={darkMode ? "p-2 m-4 bg-gray-100 text-gray-900 rounded" : "p-2 m-4 bg-gray-800 text-white rounded"} 
          onClick={() => setDarkMode(!darkMode)}
      >
          <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>

      <section className="hero text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg mt-2">A showcase of my projects and skills</p>
      </section>

      <section className="skills p-4">
        <h2 className="text-2xl font-semibold">Tech Skills</h2>
        <ul className="flex flex-wrap gap-2 mt-2">{techSkills.map((skill, index) => (
          <li key={index} className={darkMode ? "px-4 py-2 bg-gray-200 text-gray-800 rounded" : "px-4 py-2 bg-gray-200 rounded"}>{skill}</li>
        ))}</ul>
      </section>

      <section className="projects p-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {projects.map((project, index) => (
            <div key={index} className={darkMode ? "px-4 py-2 bg-gray-200 text-gray-800 rounded" : "px-4 py-2 bg-gray-200 rounded"}> 
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tech Used: {project.tech}</p>
              {project.link && <a href={project.link} target="_blank" className="text-blue-500 hover:underline">Live Demo</a>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}


