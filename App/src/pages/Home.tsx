import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Track Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Crypto
            </span>
          </h1>
          <p className="hero-subtitle">
            Stay updated with real-time cryptocurrency prices, market trends,
            and personalized insights on CryptoSocket. Monitor, analyze, and
            optimize your investments effortlessly.
          </p>
          <div className="space-x-4 flex justify-center flex-wrap gap-4">
            <button onClick={() => navigate("/auth")} className="btn-learn">
              Get Started
            </button>
            <button
              onClick={() => navigate("/about")}
              className="btn-secondary"
            >
              Learn More
            </button>
          </div>
        </div>
      </main>

      <section id="features" className="section-wrapper">
        <div className="container mx-auto px-4">
          <h2 className="features-title">Why Choose CryptoSocket?</h2>
          <div className="grid-3">
            <div className="feature-card">
              <div className="icon-large">🔒</div>
              <h3 className="feature-title">Secure Data</h3>
              <p className="feature-text">
                Enterprise-grade encryption to safeguard your portfolio and
                personal information.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-large">📈</div>
              <h3 className="feature-title">Real-Time Updates</h3>
              <p className="feature-text">
                Live price feeds and alerts for thousands of cryptocurrencies
                across major exchanges.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-large">📊</div>
              <h3 className="feature-title">Advanced Analytics</h3>
              <p className="feature-text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam fugit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
