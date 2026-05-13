
import React from 'react';
import { ClientManager } from '../ClientManager';

interface ClientesTabProps {
  onBack: () => void;
}

export const ClientesTab: React.FC<ClientesTabProps> = ({ onBack }) => {
  return (
    <div className="bg-transparent">
      <ClientManager onBack={onBack} />
    </div>
  );
};
