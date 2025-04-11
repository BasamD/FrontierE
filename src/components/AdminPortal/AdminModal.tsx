import React from 'react';
import AdminLogin from './AdminLogin';

interface AdminModalProps {
  showAdminLogin: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({
  showAdminLogin,
  isAuthenticated,
  onClose,
  onLogin,
}) => {
  if (!showAdminLogin || isAuthenticated) return null;

  return <AdminLogin onClose={onClose} onLogin={onLogin} />;
};

export default AdminModal;