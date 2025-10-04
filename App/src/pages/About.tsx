import React from "react";
import image from "../assets/image/artem.webp";

const AboutPage: React.FC = () => {
  return (
    <>
      <main className="bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-8 text-center min-h-[50vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CryptoSocket
            </span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Your go-to platform for real-time cryptocurrency tracking.
          </p>
        </div>
      </main>

      <section
        id="story"
        className="py-16 bg-gray-800 border-t border-gray-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quibusdam reiciendis perspiciatis dolor! Dolorum tempora dicta
                quidem et quo iste iure non quia cum repudiandae debitis numquam
                magnam cumque aut, quis itaque repellat iusto consequuntur! Quae
                quis aliquam iste ratione obcaecati necessitatibus?
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quibusdam reiciendis perspiciatis dolor! Dolorum tempora dicta
                quidem et quo iste iure non quia cum repudiandae debitis numquam
                magnam cumque aut, quis itaque repellat iusto consequuntur! Quae
                quis aliquam iste ratione obcaecati necessitatibus?
              </p>
              <div className="text-center md:text-left">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-black px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                  Read Our Full Story
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/800x400/cccccc/969696.png"
                alt="Our Story"
                className="rounded-lg shadow-xl w-full h-64 object-cover md:h-auto border border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Mission
              </h3>
              <p className="text-gray-300">
                To deliver accurate, real-time cryptocurrency data and tools
                that simplify market tracking and empower informed
                decision-making for all users.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
              <div className="text-5xl mb-4">🔮</div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Vision
              </h3>
              <p className="text-gray-300">
                To be the definitive hub for crypto intelligence, fostering a
                transparent and accessible digital asset ecosystem for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-green-500/20 transition-shadow duration-300">
              <img
                src={image}
                alt="CEO"
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-2 border-green-500"
              />
              <h3 className="text-xl font-semibold mb-2 text-green-400">
                Artem
              </h3>
              <p className="text-emerald-400 mb-4">CEO & Founder</p>
              <p className="text-gray-300 text-sm">---</p>
            </div>
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
              <img
                src="https://placehold.co/400x400/cccccc/969696.png"
                alt="CTO"
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-2 border-purple-500"
              />
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                John Smith
              </h3>
              <p className="text-violet-400 mb-4">CTO</p>
              <p className="text-gray-300 text-sm">Mock.</p>
            </div>
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
              <img
                src="https://placehold.co/400x400/cccccc/969696.png"
                alt="CMO"
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-2 border-cyan-500"
              />
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                Alice Johnson
              </h3>
              <p className="text-cyan-400 mb-4">CMO</p>
              <p className="text-gray-300 text-sm">Mock.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
