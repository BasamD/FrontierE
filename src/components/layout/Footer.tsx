import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BusinessInfo, SocialLinks } from '../../types/database';

interface FooterProps {
  businessInfo: BusinessInfo | null;
  socialLinks: SocialLinks | null;
  adminLink: string;
}

const Footer: React.FC<FooterProps> = ({ businessInfo, socialLinks, adminLink }) => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary font-display text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <div className="space-y-2 font-body text-gray-700">
              <p>Wilmington, NC</p>
              <p>(910) 338-9258</p>
              <p>frontierestateservices@gmail.com</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-display text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/" className="text-gray-700 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sales" className="text-gray-700 hover:text-primary">
                  Upcoming Sales
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary font-display text-lg font-semibold mb-4">
              Follow Us
            </h3>
            {socialLinks && (
              <div className="flex space-x-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-center text-gray-500 font-body">
              © {new Date().getFullYear()} Frontier Estate Services. All rights reserved.
            </p>
            <Link 
              to={adminLink}
              className="text-gray-400 hover:text-primary text-sm font-body transition-colors"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;