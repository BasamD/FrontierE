import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Sale } from '../../types/database';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sales:', error);
      } else {
        setSales(data || []);
      }
      setLoading(false);
    };

    fetchSales();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-body text-gray-700">Loading sales...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-primary mb-8">
          Estate Sales
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                {sale.image_url ? (
                  <img
                    src={sale.image_url}
                    alt={sale.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80';
                    }}
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
                    alt="Default estate sale"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(sale.status)}`}>
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                  {sale.title}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-accent" />
                    <span>{sale.dates}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-accent" />
                    <span>{sale.location}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Tag className="w-5 h-5 mr-3 mt-1 text-accent flex-shrink-0" />
                    <p className="line-clamp-3">{sale.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sales.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <p className="text-xl text-gray-600 font-body">
              No estate sales are currently scheduled. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;