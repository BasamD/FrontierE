import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[80vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white leading-tight">
              Your Legacy,
              <br />
              Our Expertise
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-body leading-relaxed">
              North Carolina's Pioneer Estate Sale Company. Forging New Paths and Finding Great Value. Contact Us for Your Free Consultation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center bg-accent hover:bg-primary text-white font-body font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/sales"
                className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-body font-semibold px-8 py-4 rounded-lg transition-all backdrop-blur-sm"
              >
                Upcoming Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-primary mb-4">
              Why Choose Frontier?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bring old values and new solutions to every sale we handle. Whether you're preparing for a move, settling a loved one's estate or simply decluttering, Frontier Estate Services is your trusted partner in moving forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-8 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                Expert Valuation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We'll care for your belongings like they're our own, and during the appraisal process, our years of experience will ensure your antiques, collectibles, and household items bring you the most value.
              </p>
            </div>

            <div className="group p-8 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                Peace of Mind
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This process can be emotional and even overwhelming and we are sensitive to the toll it takes. Allow our team to handle the stress so you don't have to. With care and compassion we will help you through it.
              </p>
            </div>

            <div className="group p-8 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                Timely Execution
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient organization and execution of estate sales, respecting your
                timeline and requirements. We aim to please.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let us help you navigate the estate sale process with expertise and care.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white hover:bg-accent text-primary hover:text-white font-body font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;