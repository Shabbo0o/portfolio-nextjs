import { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [techSkills, setTechSkills] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedProjects = localStorage.getItem("projects");
        const storedSkills = localStorage.getItem("techSkills");
        const storedTheme = localStorage.getItem("darkMode");
        if (storedProjects) setProjects(JSON.parse(storedProjects));
        if (storedSkills) setTechSkills(JSON.parse(storedSkills));
        if (storedTheme) setDarkMode(JSON.parse(storedTheme));
    }, []);

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("techSkills", JSON.stringify(techSkills));
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [projects, techSkills, darkMode]);

    const addProject = (newProject) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects, newProject];
            localStorage.setItem("projects", JSON.stringify(updatedProjects));
            return updatedProjects;
        });
    };

    const deleteProject = (index) => {
        setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
    };
    
    const deleteSkill = (index) => {
        setTechSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
    };

    return (
        <PortfolioContext.Provider value={{ projects, addProject, deleteProject, techSkills, setTechSkills, deleteSkill, darkMode, setDarkMode }}>
        {children}
        </PortfolioContext.Provider>
    );
};



export const usePortfolio = () => useContext(PortfolioContext);
