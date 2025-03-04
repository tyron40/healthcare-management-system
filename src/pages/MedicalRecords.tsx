import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  Download, 
  Upload, 
  Filter, 
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus
} from 'lucide-react';

// Mock data for medical records
const initialRecords = [
  { id: '1', patientId: '1', patientName: 'Emma Wilson', type: 'Lab Results', date: '2025-04-10', doctor: 'Dr. John Smith', description: 'Complete Blood Count', status: 'Completed', file: 'cbc_results.pdf' },
  { id: '2', patientId: '1', patientName: 'Emma Wilson', type: 'Imaging', date: '2025-04-05', doctor: 'Dr. Sarah Johnson', description: 'Chest X-Ray', status: 'Completed', file: 'chest_xray.pdf' },
  { id: '3', patientId: '2', patientName: 'James Brown', type: 'Lab Results', date: '2025-04-08', doctor: 'Dr. John Smith', description: 'Lipid Panel', status: 'Completed', file: 'lipid_panel.pdf' },
  { id: '4', patientId: '2', patientName: 'James Brown', type: 'Prescription', date: '2025-04-08', doctor: 'Dr. John Smith', description: 'Metformin Prescription', status: 'Active', file: 'metformin_rx.pdf' },
  { id: '5', patientId: '3', patientName: 'Olivia Martinez', type: 'Imaging', date: '2025-04-12', doctor: 'Dr. Michael Brown', description: 'Ultrasound', status: 'Completed', file: 'ultrasound.pdf' },
  { id: '6', patientId: '4', patientName: 'William Johnson', type: 'ECG', date: '2025-04-01', doctor: 'Dr. Sarah Johnson', description: 'Electrocardiogram', status: 'Completed', file: 'ecg_results.pdf' },
  { id: '7', patientId: '5', patientName: 'Sophia Lee', type: 'Pulmonary Function', date: '2025-04-08', doctor: 'Dr. Michael Brown', description: 'Spirometry Test', status: 'Completed', file: 'spirometry.pdf' },
  { id: '8', patientId: '6', patientName: 'Michael Davis', type: 'Imaging', date: '2025-04-03', doctor: 'Dr. Sarah Johnson', description: 'X-Ray of Knee', status: 'Completed', file: 'knee_xray.pdf' },
  { id: '9', patientId: '7', patientName: 'Isabella Garcia', type: 'Lab Results', date: '2025-04-11', doctor: 'Dr. John Smith', description: 'Allergy Panel', status: 'Completed', file: 'allergy_panel.pdf' },
  { id: '10', patientId: '8', patientName: 'Robert Taylor', type: 'Imaging', date: '2025-04-02', doctor: 'Dr. Michael Brown', description: 'CT Scan of Chest', status: 'Completed', file: 'chest_ct.pdf' },
];

// Record types
const recordTypes = [
  'Lab Results',
  'Imaging',
  'Prescription',
  'ECG',
  'Pulmonary Function',
  'Surgical Report',
  'Discharge Summary',
  'Consultation Note',
  'Progress Note',
  'Vaccination Record'
];

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortField, setSortField] = useState<string | null>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    patientName: '',
    type: 'Lab Results',
    description: '',
    doctor: 'Dr. John Smith',
    file: null as File | null
  });
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Handle new record form change
  const handleNewRecordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };
  
  // Handle upload form submit
  const handleUploadRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would upload the file to a server
    // For this demo, we'll just add a new record to the list
    
    const id = (records.length + 1).toString();
    const today = new Date().toISOString().split('T')[0];
    
    const record = {
      id,
      patientId: '1', // Hardcoded for demo
      patientName: 'Emma Wilson', // Hardcoded for demo
      type: newRecord.type,
      date: today,
      doctor: newRecord.doctor,
      description: newRecord.description,
      status: 'Completed',
      file: newRecord.file ? newRecord.file.name : 'document.pdf'
    };
    
    setRecords([record, ...records]);
    setNewRecord({
      patientId: '',
      patientName: '',
      type: 'Lab Results',
      description: '',
      doctor: 'Dr. John Smith',
      file: null
    });
    setShowUploadModal(false);
  };
  
  // Filter records based on search term and type
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType 
      ? record.type === filterType
      : true;
    
    return matchesSearch && matchesType;
  });
  
  // Sort records
  const sortedRecords = sortField
    ? [...filteredRecords].sort((a, b) => {
        const aValue = a[sortField as keyof typeof a];
        const bValue = b[sortField as keyof typeof b];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      })
    : filteredRecords;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Medical Records</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Record
        </button>
      </div>
      
      <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div className="relative rounded-md shadow-sm max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search records..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="mt-3 sm:mt-0 flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Record Types</option>
              {recordTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('patientName')}
                >
                  <div className="flex items-center">
                    Patient
                    {sortField === 'patientName' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    Record Type
                    {sortField === 'type' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('description')}
                >
                  <div className="flex items-center">
                    Description
                    {sortField === 'description' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('doctor')}
                >
                  <div className="flex items-center">
                    Doctor
                    {sortField === 'doctor' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/patients/${record.patientId}`} className="hover:text-blue-600">
                            {record.patientName}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-500">ID: {record.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{record.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-500">{record.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-3">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
        </div>
      </div>
      
      {/* Upload Record Modal */}
      {showUploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUploadRecord}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Upload Medical Record
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Record Type
                          </label>
                          <div className="mt-1">
                            <select
                              id="type"
                              name="type"
                              required
                              value={newRecord.type}
                              onChange={handleNewRecordChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              {recordTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-6">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="description"
                              id="description"
                              required
                              value={newRecord.description}
                              onChange={handleNewRecordChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div className="sm:col-span-6">
                          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                            Doctor
                          </label>
                          <div className="mt-1">
                            <select
                              id="doctor"
                              name="doctor"
                              required
                              value={newRecord.doctor}
                              onChange={handleNewRecordChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="Dr. John Smith">Dr. John Smith</option>
                              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                              <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-6">
                          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            File
                          </label>
                          <div className="mt-1">
                            <input
                              type="file"
                              name="file"
                              id="file"
                              onChange={handleFileChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Upload a PDF, JPEG, or PNG file.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;