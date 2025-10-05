import React from "react";
import image from "../assets/image/artem.webp";

const AboutPage: React.FC = () => {
  return (
    <>
      <main className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CryptoSocket
            </span>
          </h1>
          <p className="hero-subtitle">
            Your go-to platform for real-time cryptocurrency tracking.
          </p>
        </div>
      </main>

      <section id="story" className="section-wrapper">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Story</h2>
          <div className="grid-story">
            <div>
              <p className="text-lg feature-text mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quibusdam reiciendis perspiciatis dolor! Dolorum tempora dicta
                quidem et quo iste iure non quia cum repudiandae debitis numquam
                magnam cumque aut, quis itaque repellat iusto consequuntur! Quae
                quis aliquam iste ratione obcaecati necessitatibus?
              </p>
              <p className="text-lg feature-text mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quibusdam reiciendis perspiciatis dolor! Dolorum tempora dicta
                quidem et quo iste iure non quia cum repudiandae debitis numquam
                magnam cumque aut, quis itaque repellat iusto consequuntur! Quae
                quis aliquam iste ratione obcaecati necessitatibus?
              </p>
              <div className="text-center md:text-left">
                <button className="btn-primary">Read Our Full Story</button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/800x400/cccccc/969696.png"
                alt="Our Story"
                className="story-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper">
        <div className="container mx-auto px-4">
          <h2 className="mission-vision-title">Our Mission & Vision</h2>
          <div className="grid-2">
            <div className="mission-card">
              <div className="icon-target">🎯</div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Mission
              </h3>
              <p className="feature-text">
                To deliver accurate, real-time cryptocurrency data and tools
                that simplify market tracking and empower informed
                decision-making for all users.
              </p>
            </div>
            <div className="mission-card">
              <div className="icon-target">🔮</div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Vision
              </h3>
              <p className="feature-text">
                To be the definitive hub for crypto intelligence, fostering a
                transparent and accessible digital asset ecosystem for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section-wrapper">
        <div className="container mx-auto px-4">
          <h2 className="team-title">Meet Our Team</h2>
          <div className="grid-3">
            <div className="team-card">
              <img src={image} alt="CEO" className="team-img" />
              <h3 className="team-name">Artem</h3>
              <p className="team-role">CEO & Founder</p>
              <p className="team-desc">---</p>
            </div>
            <div className="team-card">
              <img
                src="https://placehold.co/400x400/cccccc/969696.png"
                alt="CTO"
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-2 border-purple-500"
              />
              <h3 className="team-name">John Smith</h3>
              <p className="text-gray-600 dark:text-violet-400 mb-4">CTO</p>
              <p className="team-desc">Mock.</p>
            </div>
            <div className="team-card">
              <img
                src="https://placehold.co/400x400/cccccc/969696.png"
                alt="CMO"
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-2 border-cyan-500"
              />
              <h3 className="team-name">Alice Johnson</h3>
              <p className="text-gray-600 dark:text-cyan-400 mb-4">CMO</p>
              <p className="team-desc">Mock.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
