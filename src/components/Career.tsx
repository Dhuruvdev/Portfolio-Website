import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Student Developer</h4>
                <h5>Self-Learning Journey</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Started my coding journey learning Python fundamentals and basic web development. Built first personal projects including command-line utilities and static websites to understand core programming concepts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Independent Projects</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Advanced to JavaScript and React, developed multiple responsive web applications. Started game development with C# and Unity, created Discord bots for community management using Python. Mastered modern web development tools and frameworks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Multi-Disciplinary Creator</h4>
                <h5>Game Design & Web Development</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently balancing commerce studies with active development. Creating sophisticated web applications with React and modern JavaScript, developing game prototypes with engaging mechanics, and building Discord communities with custom bots. Continuously learning and expanding skill set.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
