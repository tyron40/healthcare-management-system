import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Activity, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [displayName, setDisplayName] = useState('');
  
  useEffect(() => {
    const guestMode = sessionStorage.getItem('guestMode');
    if (guestMode === 'true') {
      setIsGuest(true);
      setDisplayName('Guest User');
    } else if (user) {
      setDisplayName(user.name);
    }
  }, [user]);
  
  // Mock data for dashboard
  const stats = [
    { name: 'Total Patients', value: '1,284', icon: Users, color: 'bg-blue-500' },
    { name: 'Appointments Today', value: '42', icon: Calendar, color: 'bg-green-500' },
    { name: 'Pending Appointments', value: '18', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Critical Patients', value: '6', icon: AlertCircle, color: 'bg-red-500' },
  ];

  const recentPatients = [
    { id: '1', name: 'Emma Wilson', age: 34, status: 'Scheduled', date: '2025-04-15', condition: 'Routine Checkup' },
    { id: '2', name: 'James Brown', age: 56, status: 'In Treatment', date: '2025-04-14', condition: 'Hypertension' },
    { id: '3', name: 'Olivia Martinez', age: 28, status: 'Waiting', date: '2025-04-14', condition: 'Pregnancy' },
    { id: '4', name: 'William Johnson', age: 67, status: 'Critical', date: '2025-04-13', condition: 'Cardiac Arrest' },
    { id: '5', name: 'Sophia Lee', age: 42, status: 'Recovering', date: '2025-04-12', condition: 'Post-Surgery' },
  ];

  const upcomingAppointments = [
    { id: '1', patient: 'Emma Wilson', time: '09:00 AM', type: 'Checkup', doctor: 'Dr. John Smith' },
    { id: '2', patient: 'Michael Davis', time: '10:30 AM', type: 'Follow-up', doctor: 'Dr. John Smith' },
    { id: '3', patient: 'Sophia Lee', time: '11:45 AM', type: 'Consultation', doctor: 'Dr. John Smith' },
    { id: '4', patient: 'Robert Taylor', time: '02:15 PM', type: 'Vaccination', doctor: 'Dr. John Smith' },
    { id: '5', patient: 'Olivia Martinez', time: '03:30 PM', type: 'Prenatal', doctor: 'Dr. John Smith' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="py-4">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome back, {displayName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  Recent Patients
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">{patient.age} years</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.condition}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${patient.status === 'Critical' ? 'bg-red-100 text-red-800' : 
                              patient.status === 'In Treatment' ? 'bg-blue-100 text-blue-800' :
                              patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                              patient.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Today's Appointments
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.doctor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Hospital Statistics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Bed Occupancy</h4>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">78%</p>
                  <p className="mt-1 text-sm text-gray-600">156 of 200 beds occupied</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Average Stay</h4>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">4.2</p>
                  <p className="mt-1 text-sm text-gray-600">Days per admission</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Staff on Duty</h4>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">42</p>
                  <p className="mt-1 text-sm text-gray-600">Doctors and nurses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;