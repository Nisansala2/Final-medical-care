// src/components/admin/BulkOperations.tsx
import { useState } from 'react';

interface BulkOperationsProps {
  onSeedDatabase: () => void;
  onClearDatabase: () => void;
  onExportData: () => void;
}

export default function BulkOperations({ onSeedDatabase, onClearDatabase, onExportData }: BulkOperationsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    if (!window.confirm('This will add sample data to your database. Continue?')) {
      return;
    }
    
    setLoading('seeding');
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('Database seeded successfully!');
        onSeedDatabase();
      } else {
        alert('Failed to seed database');
      }
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Error seeding database');
    } finally {
      setLoading(null);
    }
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('WARNING: This will delete ALL medicines from your database. This action cannot be undone. Are you absolutely sure?')) {
      return;
    }
    
    if (!window.confirm('Last chance! This will permanently delete all medicines. Continue?')) {
      return;
    }
    
    setLoading('clearing');
    try {
      const response = await fetch('/api/medicines/bulk', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Database cleared successfully!');
        onClearDatabase();
      } else {
        alert('Failed to clear database');
      }
    } catch (error) {
      console.error('Error clearing database:', error);
      alert('Error clearing database');
    } finally {
      setLoading(null);
    }
  };

  const handleExportData = async () => {
    setLoading('exporting');
    try {
      const response = await fetch('/api/medicines');
      if (response.ok) {
        const medicines = await response.json();
        const dataStr = JSON.stringify(medicines, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `medicines_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        onExportData();
      } else {
        alert('Failed to export data');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Operations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleSeedDatabase}
          disabled={loading === 'seeding'}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {loading === 'seeding' ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Seeding...
            </>
          ) : (
            'Seed Sample Data'
          )}
        </button>
        
        <button
          onClick={handleExportData}
          disabled={loading === 'exporting'}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {loading === 'exporting' ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Exporting...
            </>
          ) : (
            'Export Data'
          )}
        </button>
        
        <button
          onClick={handleClearDatabase}
          disabled={loading === 'clearing'}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {loading === 'clearing' ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Clearing...
            </>
          ) : (
            'Clear All Data'
          )}
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Seed Sample Data:</strong> Adds sample medicines to test the system</p>
        <p><strong>Export Data:</strong> Download all medicines as JSON file</p>
        <p><strong>Clear All Data:</strong> Permanently delete all medicines (cannot be undone)</p>
      </div>
    </div>
  );
}