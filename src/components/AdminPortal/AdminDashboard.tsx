import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BusinessInfo, SocialLinks, ContactMessage, Sale, TeamMember } from '../../types/database';
import { LogOut, Mail, Check, Trash2, Plus, Edit2, X, Image as ImageIcon, Calendar, MapPin, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [saleFormData, setSaleFormData] = useState({
    title: '',
    dates: '',
    location: '',
    description: '',
    image_url: '',
    status: 'upcoming' as const
  });
  const [teamMemberFormData, setTeamMemberFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image_url: ''
  });

  const MESSAGES_PER_PAGE = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [businessInfoResult, socialLinksResult, messagesResult, salesResult, teamMembersResult] = await Promise.all([
        supabase
          .from('business_info')
          .select('*')
          .eq('is_active', true)
          .maybeSingle(),
        supabase
          .from('social_links')
          .select('*')
          .eq('is_active', true)
          .maybeSingle(),
        supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('sales')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('team_members')
          .select('*')
          .order('name', { ascending: true })
      ]);

      if (businessInfoResult.data) setBusinessInfo(businessInfoResult.data);
      if (socialLinksResult.data) setSocialLinks(socialLinksResult.data);
      if (messagesResult.data) setContactMessages(messagesResult.data);
      if (salesResult.data) setSales(salesResult.data);
      if (teamMembersResult.data) setTeamMembers(teamMembersResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ text: 'Error loading data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const updateBusinessInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (businessInfo?.id) {
        await supabase
          .from('business_info')
          .update({ is_active: false })
          .eq('id', businessInfo.id);
      }

      const { error } = await supabase
        .from('business_info')
        .insert({
          address: formData.get('address'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          is_active: true
        });

      if (error) throw error;
      
      setMessage({ text: 'Business information updated successfully', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error updating business info:', error);
      setMessage({ text: 'Error updating business information', type: 'error' });
    }
  };

  const updateSocialLinks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (socialLinks?.id) {
        await supabase
          .from('social_links')
          .update({ is_active: false })
          .eq('id', socialLinks.id);
      }

      const { error } = await supabase
        .from('social_links')
        .insert({
          facebook: formData.get('facebook'),
          instagram: formData.get('instagram'),
          linkedin: formData.get('linkedin'),
          is_active: true
        });

      if (error) throw error;
      
      setMessage({ text: 'Social links updated successfully', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error updating social links:', error);
      setMessage({ text: 'Error updating social links', type: 'error' });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessage({ text: 'Message deleted successfully', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error deleting message:', error);
      setMessage({ text: 'Error deleting message', type: 'error' });
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      
      fetchData();
    } catch (error) {
      console.error('Error marking message as read:', error);
      setMessage({ text: 'Error updating message status', type: 'error' });
    }
  };

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSale) {
        const { error } = await supabase
          .from('sales')
          .update(saleFormData)
          .eq('id', editingSale.id);
        
        if (error) throw error;
        setMessage({ text: 'Sale updated successfully', type: 'success' });
      } else {
        const { error } = await supabase
          .from('sales')
          .insert([saleFormData]);
        
        if (error) throw error;
        setMessage({ text: 'Sale created successfully', type: 'success' });
      }
      
      setShowSaleForm(false);
      setEditingSale(null);
      setSaleFormData({
        title: '',
        dates: '',
        location: '',
        description: '',
        image_url: '',
        status: 'upcoming'
      });
      fetchData();
    } catch (error) {
      console.error('Error saving sale:', error);
      setMessage({ text: 'Error saving sale', type: 'error' });
    }
  };

  const handleEditSale = (sale: Sale) => {
    setEditingSale(sale);
    setSaleFormData({
      title: sale.title,
      dates: sale.dates,
      location: sale.location,
      description: sale.description,
      image_url: sale.image_url || '',
      status: sale.status
    });
    setShowSaleForm(true);
  };

  const handleDeleteSale = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessage({ text: 'Sale deleted successfully', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error deleting sale:', error);
      setMessage({ text: 'Error deleting sale', type: 'error' });
    }
  };

  const handleTeamMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeamMember) {
        const { error } = await supabase
          .from('team_members')
          .update(teamMemberFormData)
          .eq('id', editingTeamMember.id);
        
        if (error) throw error;
        setMessage({ text: 'Team member updated successfully', type: 'success' });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([teamMemberFormData]);
        
        if (error) throw error;
        setMessage({ text: 'Team member added successfully', type: 'success' });
      }
      
      setShowTeamMemberForm(false);
      setEditingTeamMember(null);
      setTeamMemberFormData({
        name: '',
        role: '',
        bio: '',
        image_url: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving team member:', error);
      setMessage({ text: 'Error saving team member', type: 'error' });
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setTeamMemberFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image_url || ''
    });
    setShowTeamMemberForm(true);
  };

  const handleDeleteTeamMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessage({ text: 'Team member deleted successfully', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage({ text: 'Error deleting team member', type: 'error' });
    }
  };

  const totalPages = Math.ceil(contactMessages.length / MESSAGES_PER_PAGE);
  const paginatedMessages = contactMessages.slice(
    (currentPage - 1) * MESSAGES_PER_PAGE,
    currentPage * MESSAGES_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-body text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Estate Sales Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-primary">
                Estate Sales Management
              </h2>
              <button
                onClick={() => {
                  setShowSaleForm(true);
                  setEditingSale(null);
                  setSaleFormData({
                    title: '',
                    dates: '',
                    location: '',
                    description: '',
                    image_url: '',
                    status: 'upcoming'
                  });
                }}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Sale
              </button>
            </div>

            {showSaleForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-display font-semibold text-primary">
                      {editingSale ? 'Edit Sale' : 'Add New Sale'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowSaleForm(false);
                        setEditingSale(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSaleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={saleFormData.title}
                        onChange={(e) => setSaleFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dates</label>
                      <input
                        type="text"
                        value={saleFormData.dates}
                        onChange={(e) => setSaleFormData(prev => ({ ...prev, dates: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={saleFormData.location}
                        onChange={(e) => setSaleFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={saleFormData.description}
                        onChange={(e) => setSaleFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="url"
                          value={saleFormData.image_url}
                          onChange={(e) => setSaleFormData(prev => ({ ...prev, image_url: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (saleFormData.image_url) {
                              window.open(saleFormData.image_url, '_blank');
                            }
                          }}
                          disabled={!saleFormData.image_url}
                          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:text-primary disabled:opacity-50"
                        >
                          <ImageIcon className="h-5 w-5" />
                        </button>
                      </div>
                      {saleFormData.image_url && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-2">Preview:</p>
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={saleFormData.image_url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={saleFormData.status}
                        onChange={(e) => setSaleFormData(prev => ({ 
                          ...prev, 
                          status: e.target.value as 'upcoming' | 'active' | 'completed'
                        }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {editingSale ? 'Update Sale' : 'Create Sale'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  className="border rounded-lg overflow-hidden hover:border-primary/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 relative flex-shrink-0">
                      <img
                        src={sale.image_url || 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80'}
                        alt={sale.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{sale.title}</h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              <span>{sale.dates}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-primary" />
                              <span>{sale.location}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-700">{sale.description}</p>
                          <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                            sale.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            sale.status === 'active' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditSale(sale)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Edit sale"
                          >
                            <Edit2 className="w-4 h-4 text-primary" />
                          </button>
                          <button
                            onClick={() => handleDeleteSale(sale.id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Delete sale"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {sales.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No estate sales have been created yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Team Members Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-primary">
                Team Members
              </h2>
              <button
                onClick={() => {
                  setShowTeamMemberForm(true);
                  setEditingTeamMember(null);
                  setTeamMemberFormData({
                    name: '',
                    role: '',
                    bio: '',
                    image_url: ''
                  });
                }}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </button>
            </div>

            {showTeamMemberForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-display font-semibold text-primary">
                      {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowTeamMemberForm(false);
                        setEditingTeamMember(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleTeamMemberSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={teamMemberFormData.name}
                        onChange={(e) => setTeamMemberFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <input
                        type="text"
                        value={teamMemberFormData.role}
                        onChange={(e) => setTeamMemberFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        value={teamMemberFormData.bio}
                        onChange={(e) => setTeamMemberFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="url"
                          value={teamMemberFormData.image_url}
                          onChange={(e) => setTeamMemberFormData(prev => ({ ...prev, image_url: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (teamMemberFormData.image_url) {
                              window.open(teamMemberFormData.image_url, '_blank');
                            }
                          }}
                          disabled={!teamMemberFormData.image_url}
                          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:text-primary disabled:opacity-50"
                        >
                          <ImageIcon className="h-5 w-5" />
                        </button>
                      </div>
                      {teamMemberFormData.image_url && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-2">Preview:</p>
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={teamMemberFormData.image_url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {editingTeamMember ? 'Update Team Member' : 'Add Team Member'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="border rounded-lg overflow-hidden hover:border-primary/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 relative flex-shrink-0">
                      <img
                        src={member.image_url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80'}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                          <p className="text-accent font-medium">{member.role}</p>
                          <p className="mt-2 text-gray-700">{member.bio}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTeamMember(member)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Edit team member"
                          >
                            <Edit2 className="w-4 h-4 text-primary" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Delete team member"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No team members have been added yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Messages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold text-primary">
                Contact Messages
              </h2>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">
                  {contactMessages.filter(m => !m.read).length} unread
                </span>
              </div>
            </div>
            
            {paginatedMessages.length > 0 ? (
              <div className="space-y-6">
                {paginatedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg border ${
                      msg.read ? 'bg-gray-50' : 'bg-white border-primary/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-1">
                          {!msg.read && (
                            <button
                              onClick={() => markMessageAsRead(msg.id)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-primary" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">Email: {msg.email}</p>
                      <p className="text-gray-600">Phone: {msg.phone}</p>
                      <p className="mt-2 text-gray-700">{msg.message}</p>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-4">
                No messages received yet
              </p>
            )}
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Business Information
            </h2>
            <form onSubmit={updateBusinessInfo} className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={businessInfo?.address}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={businessInfo?.phone}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={businessInfo?.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Update Business Information
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Social Links
            </h2>
            <form onSubmit={updateSocialLinks} className="space-y-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  defaultValue={socialLinks?.facebook || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  defaultValue={socialLinks?.instagram || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  defaultValue={socialLinks?.linkedin || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Update Social Links
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;