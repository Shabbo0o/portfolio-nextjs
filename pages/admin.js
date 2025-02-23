import { useState } from "react";
import { usePortfolio } from "../contexts/PortfolioContext";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");

    const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", link: "" });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
};

    const { projects, addProject, deleteProject, techSkills, setTechSkills, deleteSkill, darkMode, setDarkMode } = usePortfolio();

    function handleLogin() {
        if (username === "admin" && password === "123") {
        setLoggedIn(true);
        } else {
        alert("Invalid login");
        }
    }

    return (
        <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
        {!loggedIn ? (
            <div className="p-4 text-center">
            <input className={darkMode ? "p-2 m-2 border rounded text-black" : "p-2 m-2 border rounded"} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className={darkMode ? "p-2 m-2 border rounded text-black" : "p-2 m-2 border rounded"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="p-2 m-2 bg-blue-500 text-white rounded" onClick={handleLogin}>Login</button>
            </div>
        ) : (
            <div className="p-4">
                <button className={darkMode ? "p-2 m-4 bg-gray-100 text-gray-900 rounded" : "p-2 m-4 bg-gray-800 text-white rounded"} 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>

                <h2 className="text-2xl font-semibold">Admin Panel</h2>
                <div className="p-4">
                    <h3 className="text-xl font-bold">Add New Project</h3>
                    <input className="p-2 m-2 border rounded" type="text" name="title" value={newProject.title} onChange={handleInputChange} placeholder="Title" />
                    <input className="p-2 m-2 border rounded" type="text" name="description" value={newProject.description} onChange={handleInputChange} placeholder="Description" />
                    <input className="p-2 m-2 border rounded" type="text" name="tech" value={newProject.tech} onChange={handleInputChange} placeholder="Tech Used" />
                    <input className="p-2 m-2 border rounded" type="text" name="link" value={newProject.link} onChange={handleInputChange} placeholder="Live Demo Link" />
                    <button className="p-2 m-2 bg-green-500 text-white rounded" onClick={() => { 
                        addProject(newProject); 
                        setNewProject({ title: "", description: "", tech: "", link: "" }); 
                    }}>
                        Add Project
                    </button>
                </div>
                
                {projects.map((project, index) => (
                <div key={index} className="p-4 mt-2 border rounded bg-gray-100 dark:bg-gray-800">
                    <h3 className={darkMode ? "text-gray-900 text-xl font-bold " : " text-xl font-bold"}>{project.title}</h3>
                    <p className={darkMode ? "text-gray-900 mt-2 " : " mt-2"}>{project.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tech Used: {project.tech}</p>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Live Demo
                        </a>
                    )}
                    <button className="p-2 mt-2 bg-red-500 text-white rounded" onClick={() => deleteProject(index)}>
                        Delete
                    </button>
                </div>
                ))}

                <h2 className="text-2xl font-semibold mt-4">Manage Tech Skills</h2>
                <input className={ darkMode ? "p-2 border rounded text-gray-900" : "p-2 border rounded"} type="text" onKeyDown={(e) => e.key === "Enter" && setTechSkills([...techSkills, e.target.value])} placeholder="Add skill" />

                <ul className="mt-2">
                    {techSkills.map((skill, index) => (
                        <li key={index} className={darkMode ? "px-2 py-2 bg-gray-200 text-gray-900 rounded" : "px-2 py-2 bg-gray-200 rounded"}>
                            <button 
                                className="mx-2 p-1 bg-red-500 text-white rounded" 
                                onClick={() => deleteSkill(index)}
                            >
                                Delete
                            </button>
                            {skill}
                        </li>
                    ))}
                </ul>

            </div>
        )}
        </div>
    );
}

