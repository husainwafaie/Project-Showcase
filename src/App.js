import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import './App.css';

const createMarkup = (htmlString) => ({ __html: htmlString });

const ProjectCard = ({ title, description, technologies, completed, image, githubLink, projectLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const descriptionRef = useRef(null);

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
    if (isHovered && descriptionRef.current) {
      const originalText = description;
      descriptionRef.current.textContent = '';
      typeEffect(descriptionRef.current, originalText, 50);
    }
  }, [isHovered, description, typeEffect]);

  const techString = technologies.map(tech => `<span class="string">"${tech}"</span>`).join(', ');

  return (
    <div 
      className="project-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-card-front">
        <img src={image} alt={title} />
        <h3>{title}</h3>
      </div>
      <div className={`project-card-back ${isHovered ? 'show' : ''}`}>
        <div className="project-info">
          <h3>{title}</h3>
          <p className="code-line"><span className="comment" ref={descriptionRef}>// {description}</span></p>
          <p className="code-line"><span className="keyword">const</span> project = {'{'}</p>
          <p className="code-line">&nbsp;&nbsp;name: <span className="string">"{title}"</span>,</p>
          <p className="code-line">&nbsp;&nbsp;tech: [<span dangerouslySetInnerHTML={createMarkup(techString)} />],</p>
          <p className="code-line">&nbsp;&nbsp;completed: <span className="keyword">{completed}</span></p>
          <p className="code-line">{'}'};</p>
        </div>
        {(githubLink || projectLink) && (
          <div className="project-links">
            {githubLink && (
              <a href={githubLink} className="project-button github-button" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            )}
            {projectLink && (
              <a href={projectLink} className="project-button link-button" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Project
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [displayText, setDisplayText] = useState('');
  const typingRef = useRef({ timer: null, currentIndex: 0, currentLanguageIndex: 0 });

  const languages = useMemo(() => [
    { name: 'JavaScript', code: 'console.log("Full-Stack Software Engineer");' },
    { name: 'Python', code: 'print("Full-Stack Software Engineer")' },
    { name: 'Java', code: 'System.out.println("Full-Stack Software Engineer");' },
    { name: 'C++', code: 'std::cout << "Full-Stack Software Engineer" << std::endl;' }
  ], []);

  const typeEffect = useCallback((text, onComplete) => {
    clearInterval(typingRef.current.timer);
    typingRef.current.currentIndex = 0;
    setDisplayText('');

    typingRef.current.timer = setInterval(() => {
      if (typingRef.current.currentIndex < text.length) {
        setDisplayText(text.slice(0, typingRef.current.currentIndex + 1));
        typingRef.current.currentIndex++;
      } else {
        clearInterval(typingRef.current.timer);
        if (onComplete) onComplete();
      }
    }, 50);
  }, []);

  const rotateLanguages = useCallback(() => {
    const currentLanguage = languages[typingRef.current.currentLanguageIndex];
    typeEffect(currentLanguage.code, () => {
      setTimeout(() => {
        typingRef.current.currentLanguageIndex = (typingRef.current.currentLanguageIndex + 1) % languages.length;
        rotateLanguages();
      }, 5000);
    });
  }, [languages, typeEffect]);

  useEffect(() => {
    rotateLanguages();
    return () => clearInterval(typingRef.current.timer);
  }, [rotateLanguages]);

  return (
    <div className="App">
      <header>
        <nav>
          <h1 style={{ color: '#569cd6' , fontSize: '25px' }}>Husain Wafaie</h1>
          <ul>
            <li><a href="https://www.github.com/husainwafaie/" target="_blank">github()</a></li>
            <li><a href="https://www.linkedin.com/in/husain-wafaie/" target="_blank">linkedin()</a></li>
            <li><a href="mailto:husainwafaie@gmail.com" target="_blank">contact()</a></li>
          </ul>
        </nav>
      </header>
      
      <section className="hero">
        <img src={`${process.env.PUBLIC_URL}/husain_pic.jpg`} alt="Husain Wafaie" />
        <h1>Husain Wafaie</h1>
        <div className="hero-title-container">
          <p className="code-line">{displayText}</p>
        </div>
      </section>
      
      <section id="projects" className="projects">
        <ProjectCard 
          title="CanSat"
          description="#Satellite software system"
          technologies={["Python", "C", "Linux", "PyQt5"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/cansat.jpeg`}
          projectLink="https://ucicansat.github.io/web/"
        />
        <ProjectCard 
          title="JobHunter"
          description="#Web App for finding jobs near you"
          technologies={["Python", "Django", "React", "REST APIs", "GCP"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/jobhunter.jpg`}
          githubLink="https://github.com/husainwafaie/jobhunter"
        />
        <ProjectCard 
          title="NewU"
          description="#Crypto Trading Platform"
          technologies={["React", "Node.js", "WebSockets", "Firebase", "AWS"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/new2.jpg`}
          githubLink="https://github.com/InscribeX/NewU"
        />
        <ProjectCard 
          title="SpotAI"
          description="#Mix and explore music with AI"
          technologies={["Python", "Spotify API", "Django", "JavaScript", "AWS"]}
          completed="false"
          image={`${process.env.PUBLIC_URL}/music.jpg`}
          githubLink="https://github.com/husainwafaie/Music-Recommender"
        />
        <ProjectCard 
          title="AI Resume Analyzer"
          description="#Analyzes your resume and provides feedback based on the job you are applying to"
          technologies={["Python FastAPI", "NLP", "NLTK", "Scikit-learn", "React"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/analyzer.jpg`}
          githubLink="https://github.com/husainwafaie/Resume-Analyzer"
        />
        <ProjectCard 
          title="Personal Website"
          description="#A summary of me"
          technologies={["React", "Node.js", "WebSockets", "Firebase", "AWS"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/Husain-pic.jpg`}
          githubLink="https://github.com/husainwafaie/Personal-Website"
          projectLink="http://husainwafaie.com/"
        />
        <ProjectCard 
          title="Crab Adventure Game"
          description="#Seaside side scroller game"
          technologies={["JavaScript", "HTML5", "CSS3", "Firebase", "AWS"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/crab.jpg`}
          githubLink="https://github.com/husainwafaie/Crab-Game"
          projectLink="https://husainwafaie.github.io/Crab-Game/"
        />
        <ProjectCard 
          title="PathFinder"
          description="#Visualizing Breadth-first search"
          technologies={["HTML5", "JavaScript", "CSS"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/pathfinder.jpg`}
          githubLink="https://github.com/husainwafaie/Pathfinder"
          projectLink="https://husainwafaie.github.io/Pathfinder/"
        />
        <ProjectCard 
          title="Predator Simulation"
          description="#Interactive game of hunters and preys using Tkinter"
          technologies={["Python", "Tkinter", "Object Oriented Programming", "Classes and Inheritance"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/simulation.jpg`}
          githubLink="https://github.com/husainwafaie/Predator-Simulation"
        />
        <ProjectCard 
          title="Project Showcase"
          description="#Showcase of my projects"
          technologies={["React", "Next.js", "Tailwind CSS"]}
          completed="true"
          image={`${process.env.PUBLIC_URL}/showcase.jpg`}
          githubLink="https://github.com/husainwafaie/Project-Showcase"
          projectLink="https://husainwafaie.github.io/Project-Showcase/"
        />
      </section>
    </div>
  );
}

export default App;