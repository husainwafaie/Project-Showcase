import React, { useEffect, useCallback } from 'react';
import './App.css';

const ProjectCard = ({ title, description, technologies }) => {
  const typeEffect = useCallback((element, text, speed) => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, []);

  useEffect(() => {
    const descriptionElement = document.querySelector(`#${title} .comment`);
    if (descriptionElement) {
      const originalText = descriptionElement.textContent;
      descriptionElement.textContent = '';
      typeEffect(descriptionElement, originalText, 50);
    }
  }, [title, typeEffect]);

  return (
    <div className="project-card" id={title}>
      <div className="project-info">
        <h3>{title}</h3>
        <p className="code-line"><span className="comment">// {description}</span></p>
        <p className="code-line"><span className="keyword">const</span> project = {'{'}</p>
        <p className="code-line">&nbsp;&nbsp;name: <span className="string">"{title}"</span>,</p>
        <p className="code-line">&nbsp;&nbsp;tech: [{technologies.map(tech => `<span className="string">"${tech}"</span>`).join(', ')}],</p>
        <p className="code-line">&nbsp;&nbsp;completed: <span className="keyword">true</span></p>
        <p className="code-line">{'}'};</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <h1 style={{ color: '#569cd6' }}>Husain Wafaie</h1>
          <ul>
            <li><a href="#about">projects()</a></li>
            <li><a href="#projects">linkedin()</a></li>
            <li><a href="#contact">github()</a></li>
          </ul>
        </nav>
      </header>
      
      <section className="hero">
        <img src="/husain_pic.jpg" alt="Husain Wafaie" />
        <h1>Husain Wafaie</h1>
        <p>console.log("Full-Stack Software Engineer");</p>
      </section>
      
      <section id="projects" className="projects">
        <ProjectCard 
          title="Project_1"
          description="Description of the project"
          technologies={["HTML", "CSS", "JavaScript"]}
        />
        <ProjectCard 
          title="Project_2"
          description="Description of the project"
          technologies={["React", "Node.js"]}
        />
      </section>
    </div>
  );
}

export default App;