import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { TeamMember } from '../../types/database';
import { Star, Heart, Clock, Users, Target, Award } from 'lucide-react';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('name');
      
      if (data) {
        setTeamMembers(data);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About Frontier Estate Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-body">
              More than just a liquidation company – we're your trusted partners
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            At Frontier Estate Sales, we're more than just a liquidation company – we're your trusted partners in navigating the complex terrain of estate sales. Founded by two young entrepreneurs with a passion for preserving history and creating new opportunities, we bring a fresh perspective to the world of estate liquidation.
          </p>

          <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Story</h2>
          <p className="text-gray-600 mb-8">
            Born from a shared love of antiques, collectibles, and the thrill of the hunt, Frontier Estate Sales was established by two longtime friends who saw an opportunity to make a difference in our community. With years of experience running successful eBay businesses, we've honed our skills in appraising a wide range of items – from rare antiques to everyday household goods. Our background in customer service ensures that we approach every interaction with empathy, professionalism, and a commitment to excellence.
          </p>

          <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-8">
            At Frontier, we understand that estate sales often come during challenging times for families. Our mission is twofold: to relieve the stress of our clients during these difficult transitions and to help shoppers discover treasures that will be cherished for years to come. We believe in creating a win-win situation where sellers receive fair value for their possessions and buyers find items that speak to their hearts.
          </p>
        </div>

        {/* What Sets Us Apart */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <Star className="w-6 h-6 text-accent mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">
                    Expertise
                  </h3>
                  <p className="text-gray-600">
                    Our years of experience in online sales and appraisals allow us to accurately value a wide range of items, ensuring fair prices for both sellers and buyers.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <Heart className="w-6 h-6 text-accent mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">
                    Compassion
                  </h3>
                  <p className="text-gray-600">
                    We approach each estate with sensitivity and respect, understanding the emotional weight that often accompanies these sales.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <Target className="w-6 h-6 text-accent mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    By blending traditional estate sale methods with modern technology, we reach a broader audience and maximize value for our clients.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <Users className="w-6 h-6 text-accent mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">
                    Community Focus
                  </h3>
                  <p className="text-gray-600">
                    We're committed to strengthening our local community by facilitating the transfer of goods from one generation to the next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
            Our Promise
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-6">
              When you choose Frontier Estate Sales, you're not just hiring a service – you're partnering with a team that truly cares. We promise to:
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-accent mr-3" />
                Handle your estate with the utmost care and respect
              </li>
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-accent mr-3" />
                Provide honest, accurate appraisals
              </li>
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-accent mr-3" />
                Maximize the value of your items through strategic marketing and pricing
              </li>
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-accent mr-3" />
                Create a welcoming, organized shopping experience
              </li>
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-accent mr-3" />
                Offer support and guidance throughout the entire process
              </li>
            </ul>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 mb-8">
            Whether you're looking to liquidate an estate or searching for that perfect piece to add to your collection, Frontier Estate Sales is here to guide you through the journey. Let us help you blaze new trails in the world of estate sales – where every item has a story, and every sale opens a new chapter.
          </p>
          <p className="text-2xl font-display font-bold text-primary">
            Join us at Frontier Estate Sales, where we're pioneering the future of estate liquidation, one treasure at a time.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-display font-bold text-primary mb-6">
            Get in Touch
          </h2>
          <div className="space-y-2">
            <p className="text-xl text-gray-600">Phone: (910) 338-9258</p>
            <p className="text-xl text-gray-600">Email: frontierestateservices@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;