import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Activity, 
  Pill, 
  Edit, 
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Mock patient data
const patientData = {
  id: '1',
  name: 'Emma Wilson',
  age: 34,
  gender: 'Female',
  phone: '(555) 123-4567',
  email: 'emma.wilson@example.com',
  address: '123 Main St, Anytown',
  bloodType: 'A+',
  height: '5\'6"',
  weight: '145 lbs',
  allergies: ['Penicillin', 'Peanuts'],
  emergencyContact: {
    name: 'John Wilson',
    relation: 'Husband',
    phone: '(555) 987-6543'
  },
  medicalHistory: [
    { date: '2024-12-15', diagnosis: 'Hypertension', doctor: 'Dr. Smith', notes: 'Prescribed lisinopril 10mg daily' },
    { date: '2023-08-22', diagnosis: 'Migraine', doctor: 'Dr. Johnson', notes: 'Prescribed sumatriptan as needed' },
    { date: '2022-03-10', diagnosis: 'Appendicitis', doctor: 'Dr. Garcia', notes: 'Appendectomy performed' }
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-12-15' },
    { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed for migraine', startDate: '2023-08-22' }
  ],
  appointments: [
    { date: '2025-04-20', time: '10:00 AM', type: 'Follow-up', doctor: 'Dr. Smith', status: 'Scheduled' },
    { date: '2025-03-15', time: '2:30 PM', type: 'Blood Pressure Check', doctor: 'Dr. Smith', status: 'Completed' },
    { date: '2025-02-10', time: '11:15 AM', type: 'Annual Physical', doctor: 'Dr. Johnson', status: 'Completed' }
  ],
  vitalSigns: [
    { date: '2025-03-15', bloodPressure: '130/85', heartRate: 72, temperature: '98.6°F', respiratoryRate: 16 },
    { date: '2025-02-10', bloodPressure: '135/88', heartRate: 75, temperature: '98.4°F', respiratoryRate: 18 },
    { date: '2024-12-15', bloodPressure: '142/92', heartRate: 78, temperature: '98.7°F', respiratoryRate: 17 }
  ],
  labResults: [
    { date: '2025-02-10', test: 'Complete Blood Count', result: 'Normal', notes: 'All values within normal range' },
    { date: '2025-02-10', test: 'Lipid Panel', result: 'Abnormal', notes: 'LDL cholesterol elevated at 145 mg/dL' },
    { date: '2024-12-15', test: 'Comprehensive Metabolic Panel', result: 'Normal', notes: 'All values within normal range' }
  ]
};

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  
  // In a real app, we would fetch the patient data based on the ID
  // For this demo, we'll use the mock data
  const patient = patientData;
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the note to the database
    setShowAddNoteModal(false);
    setNewNote({ title: '', content: '' });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{patient.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Patient ID: {patient.id} • {patient.age} years • {patient.gender}
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Patient
          </button>
          <button
            type="button"
            onClick={() => setShowAddNoteModal(true)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </button>
        </div>
      </div>
      
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } mx-6`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('medical-history')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'medical-history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } mx-6`}
            >
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('medications')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'medications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } mx-6`}
            >
              Medications
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } mx-6`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('lab-results')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lab-results'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } mx-6`}
            >
              Lab Results
            </button>
          </nav>
        </div>
        
        {activeTab === 'overview' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{patient.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="ml-2 text-sm text-gray-900">{patient.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="ml-2 text-sm text-gray-900">{patient.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Address:</span>
                    <span className="ml-2 text-sm text-gray-900">{patient.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="text-sm font-medium text-gray-900">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-sm font-medium text-gray-900">{patient.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-sm font-medium text-gray-900">{patient.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Allergies</p>
                    <p className="text-sm font-medium text-gray-900">{patient.allergies.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="text-sm font-medium text-gray-900">{patient.emergencyContact.relation}</p>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{patient.emergencyContact.phone}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
                <div className="space-y-4">
                  {patient.vitalSigns.slice(0, 1).map((vital, index) => (
                    <div key={index} className="border-b pb-2">
                      <p className="text-sm text-gray-500">Date: {vital.date}</p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">Blood Pressure</p>
                          <p className="text-sm font-medium text-gray-900">{vital.bloodPressure}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Heart Rate</p>
                          <p className="text-sm font-medium text-gray-900">{vital.heartRate} bpm</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Temperature</p>
                          <p className="text-sm font-medium text-gray-900">{vital.temperature}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Respiratory Rate</p>
                          <p className="text-sm font-medium text-gray-900">{vital.respiratoryRate} breaths/min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
                    View all vital signs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'medical-history' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Entry
              </button>
            </div>
            
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Diagnosis</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {patient.medicalHistory.map((entry, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{entry.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.diagnosis}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.doctor}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{entry.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'medications' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {patient.medications.map((medication, index) => (
                <div key={index} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Pill className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{medication.name}</p>
                    <p className="text-sm text-gray-500 truncate">{medication.dosage} - {medication.frequency}</p>
                    <p className="text-xs text-gray-400">Started: {medication.startDate}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Schedule Appointment
              </button>
            </div>
            
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date & Time</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {patient.appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {appointment.date} <br />
                        <span className="text-gray-500">{appointment.time}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.doctor}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          {appointment.status === 'Scheduled' ? 'Reschedule' : 'View'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'lab-results' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Laboratory Results</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Results
              </button>
            </div>
            
            <div className="space-y-4">
              {patient.labResults.map((result, index) => (
                <div key={index} className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{result.test}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{result.date}</p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${result.result === 'Normal' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {result.result}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Notes</dt>
                        <dd className="mt-1 text-sm text-gray-900">{result.notes}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddNote}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add Note to Patient Record
                      </h3>
                      <div className="mt-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Note Content
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="content"
                            name="content"
                            rows={4}
                            required
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
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
                    Add Note
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddNoteModal(false)}
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

export default PatientDetails;