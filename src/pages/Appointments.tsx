import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// Mock data for appointments
const initialAppointments = [
  { id: '1', patientId: '1', patientName: 'Emma Wilson', date: '2025-04-15', time: '09:00 AM', duration: 30, type: 'Follow-up', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Blood pressure check' },
  { id: '2', patientId: '3', patientName: 'Olivia Martinez', date: '2025-04-15', time: '10:30 AM', duration: 60, type: 'Prenatal', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Routine prenatal visit' },
  { id: '3', patientId: '5', patientName: 'Sophia Lee', date: '2025-04-15', time: '01:00 PM', duration: 30, type: 'Consultation', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Asthma management' },
  { id: '4', patientId: '2', patientName: 'James Brown', date: '2025-04-16', time: '11:00 AM', duration: 45, type: 'Follow-up', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Diabetes management' },
  { id: '5', patientId: '4', patientName: 'William Johnson', date: '2025-04-16', time: '02:30 PM', duration: 30, type: 'Cardiology', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Heart condition follow-up' },
  { id: '6', patientId: '6', patientName: 'Michael Davis', date: '2025-04-17', time: '09:30 AM', duration: 30, type: 'Follow-up', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Arthritis management' },
  { id: '7', patientId: '7', patientName: 'Isabella Garcia', date: '2025-04-17', time: '11:30 AM', duration: 30, type: 'Allergy', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Seasonal allergies' },
  { id: '8', patientId: '8', patientName: 'Robert Taylor', date: '2025-04-18', time: '10:00 AM', duration: 45, type: 'Pulmonology', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'COPD management' },
  { id: '9', patientId: '9', patientName: 'Ava Anderson', date: '2025-04-18', time: '01:30 PM', duration: 30, type: 'Neurology', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Migraine follow-up' },
  { id: '10', patientId: '10', patientName: 'David Wilson', date: '2025-04-19', time: '11:00 AM', duration: 45, type: 'Psychiatry', doctor: 'Dr. John Smith', status: 'Scheduled', notes: 'Depression follow-up' },
];

// Mock data for patients
const patients = [
  { id: '1', name: 'Emma Wilson' },
  { id: '2', name: 'James Brown' },
  { id: '3', name: 'Olivia Martinez' },
  { id: '4', name: 'William Johnson' },
  { id: '5', name: 'Sophia Lee' },
  { id: '6', name: 'Michael Davis' },
  { id: '7', name: 'Isabella Garcia' },
  { id: '8', name: 'Robert Taylor' },
  { id: '9', name: 'Ava Anderson' },
  { id: '10', name: 'David Wilson' },
];

// Appointment types
const appointmentTypes = [
  'Follow-up',
  'Consultation',
  'Checkup',
  'Prenatal',
  'Cardiology',
  'Neurology',
  'Pulmonology',
  'Psychiatry',
  'Allergy',
  'Vaccination'
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState('');
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: new Date(),
    time: '09:00',
    duration: '30',
    type: 'Follow-up',
    doctor: 'Dr. John Smith',
    notes: ''
  });
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle new appointment form change
  const handleNewAppointmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle date change
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setNewAppointment(prev => ({ ...prev, date }));
    }
  };
  
  // Handle add appointment form submit
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = (appointments.length + 1).toString();
    const selectedPatient = patients.find(p => p.id === newAppointment.patientId);
    
    if (!selectedPatient) return;
    
    const appointment = {
      id,
      patientId: newAppointment.patientId,
      patientName: selectedPatient.name,
      date: format(newAppointment.date, 'yyyy-MM-dd'),
      time: newAppointment.time.includes('AM') || newAppointment.time.includes('PM') 
        ? newAppointment.time 
        : `${newAppointment.time} ${parseInt(newAppointment.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}`,
      duration: parseInt(newAppointment.duration),
      type: newAppointment.type,
      doctor: newAppointment.doctor,
      status: 'Scheduled',
      notes: newAppointment.notes
    };
    
    setAppointments([appointment, ...appointments]);
    setNewAppointment({
      patientId: '',
      date: new Date(),
      time: '09:00',
      duration: '30',
      type: 'Follow-up',
      doctor: 'Dr. John Smith',
      notes: ''
    });
    setShowAddAppointmentModal(false);
  };
  
  // Filter appointments based on search term, date, and type
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = filterDate 
      ? appointment.date === format(filterDate, 'yyyy-MM-dd')
      : true;
    
    const matchesType = filterType 
      ? appointment.type === filterType
      : true;
    
    return matchesSearch && matchesDate && matchesType;
  });
  
  // Group appointments by date
  const appointmentsByDate = filteredAppointments.reduce((acc, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {} as Record<string, typeof filteredAppointments>);
  
  // Sort dates
  const sortedDates = Object.keys(appointmentsByDate).sort();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowAddAppointmentModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
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
              placeholder="Search appointments..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <DatePicker
                selected={filterDate}
                onChange={(date) => setFilterDate(date)}
                placeholderText="Filter by date"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </div>
            
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {sortedDates.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddAppointmentModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Schedule New Appointment
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map(date => (
                <div key={date} className="bg-white overflow-hidden">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                      {date}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doctor
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Notes
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointmentsByDate[date]
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map(appointment => (
                          <tr key={appointment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                                  <div className="text-xs text-gray-500">{appointment.duration} min</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    <Link to={`/patients/${appointment.patientId}`} className="hover:text-blue-600">
                                      {appointment.patientName}
                                    </Link>
                                  </div>
                                  <div className="text-xs text-gray-500">ID: {appointment.patientId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {appointment.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.doctor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                  appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.notes}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                                Edit
                              </a>
                              <a href="#" className="text-red-600 hover:text-red-900">
                                Cancel
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add Appointment Modal */}
      {showAddAppointmentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddAppointment}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Schedule New Appointment
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                            Patient
                          </label>
                          <div className="mt-1">
                            <select
                              id="patientId"
                              name="patientId"
                              required
                              value={newAppointment.patientId}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="">Select Patient</option>
                              {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>{patient.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <div className="mt-1">
                            <DatePicker
                              selected={newAppointment.date}
                              onChange={handleDateChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              dateFormat="yyyy-MM-dd"
                              minDate={new Date()}
                            />
                          </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Time
                          </label>
                          <div className="mt-1">
                            <select
                              id="time"
                              name="time"
                              required
                              value={newAppointment.time}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="09:00">09:00 AM</option>
                              <option value="09:30">09:30 AM</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="10:30">10:30 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="11:30">11:30 AM</option>
                              <option value="13:00">01:00 PM</option>
                              <option value="13:30">01:30 PM</option>
                              <option value="14:00">02:00 PM</option>
                              <option value="14:30">02:30 PM</option>
                              <option value="15:00">03:00 PM</option>
                              <option value="15:30">03:30 PM</option>
                              <option value="16:00">04:00 PM</option>
                              <option value="16:30">04:30 PM</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration (minutes)
                          </label>
                          <div className="mt-1">
                            <select
                              id="duration"
                              name="duration"
                              required
                              value={newAppointment.duration}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="15">15 min</option>
                              <option value="30">30 min</option>
                              <option value="45">45 min</option>
                              <option value="60">60 min</option>
                              <option value="90">90 min</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Appointment Type
                          </label>
                          <div className="mt-1">
                            <select
                              id="type"
                              name="type"
                              required
                              value={newAppointment.type}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              {appointmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
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
                              value={newAppointment.doctor}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="Dr. John Smith">Dr. John Smith</option>
                              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                              <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="sm:col-span-6">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="notes"
                              name="notes"
                              rows={3}
                              value={newAppointment.notes}
                              onChange={handleNewAppointmentChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
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
                    Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAppointmentModal(false)}
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

export default Appointments;