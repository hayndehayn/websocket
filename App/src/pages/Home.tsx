import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <main className="bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-8 text-center min-h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold mb-6">
            Track Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Crypto
            </span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Stay updated with real-time cryptocurrency prices, market trends,
            and personalized insights on CryptoSocket. Monitor, analyze, and
            optimize your investments effortlessly.
          </p>
          <div className="space-x-4 flex justify-center flex-wrap gap-4">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </main>

      <section
        id="features"
        className="py-16 bg-gray-800 border-t border-gray-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Why Choose CryptoSocket?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-green-500/20 transition-shadow duration-300">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Secure Data
              </h3>
              <p className="text-gray-300">
                Enterprise-grade encryption to safeguard your portfolio and
                personal information.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Real-Time Updates
              </h3>
              <p className="text-gray-300">
                Live price feeds and alerts for thousands of cryptocurrencies
                across major exchanges.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Advanced Analytics
              </h3>
              <p className="text-gray-300">
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
