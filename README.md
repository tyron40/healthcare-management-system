# Healthcare Management System

A comprehensive healthcare platform for patient management, scheduling, and electronic health records built with React, TypeScript, and Tailwind CSS.

![screencapture-relaxed-twilight-8f2d0b-netlify-app-2025-03-27-17_13_41](https://github.com/user-attachments/assets/b20005f6-1386-4c85-973a-3720d1904322)

![Healthcare Management System Dashboard](https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000)

## Features

### 🏥 Patient Management
- Complete patient profiles with medical history
- Search and filter patient records
- Add and manage patient information
- Track vital signs and medical conditions

### 📅 Appointment Scheduling
- Interactive calendar view
- Schedule and manage appointments
- Patient appointment history
- Automated scheduling conflict prevention

### 📋 Electronic Health Records (EHR)
- Secure medical records management
- Document upload and download
- Organized patient history
- Lab results tracking

### 📊 Dashboard Analytics
- Key performance metrics
- Patient statistics
- Hospital occupancy rates
- Staff management overview

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Date Handling**: date-fns
- **Form Components**: React DatePicker

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-management-system.git
cd healthcare-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Accounts

The system comes with pre-configured demo accounts for testing:

| Role    | Email               | Password |
|---------|---------------------|----------|
| Doctor  | doctor@example.com  | password |
| Nurse   | nurse@example.com   | password |
| Admin   | admin@example.com   | password |

## Key Features Breakdown

### Patient Management
- Comprehensive patient profiles
- Medical history tracking
- Vital signs monitoring
- Emergency contact information
- Allergy and medication tracking

### Appointment System
- Real-time scheduling
- Appointment type categorization
- Duration management
- Conflict detection
- Patient reminder system

### Medical Records
- Secure document storage
- Multiple file format support
- Categorized record management
- Lab results integration
- Document version control

### Administrative Features
- User role management
- Department organization
- Staff scheduling
- Resource allocation
- Performance metrics

## Security Features

- Role-based access control
- Secure authentication system
- Protected patient information
- HIPAA compliance considerations
- Audit trail for sensitive operations

## Project Structure

```
healthcare-management-system/
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/           # React context providers
│   ├── pages/             # Main application pages
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Medical icons and illustrations from Lucide React
- UI components styled with Tailwind CSS
- Date handling powered by date-fns
- Calendar functionality using React DatePicker

## Support

For support, please email support@healthcarems.com or open an issue in the repository.

## Roadmap

- [ ] Integration with external medical devices
- [ ] Mobile application development
- [ ] AI-powered diagnosis assistance
- [ ] Telemedicine features
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode implementation
- [ ] Enhanced reporting features
