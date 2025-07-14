# 🚗 Smart Vehicle Mileage & Fuel Tracker

A responsive web application for tracking vehicle mileage and fuel consumption in real-time. Perfect for organizations or individuals who need to monitor their fleet usage, fuel efficiency, and generate detailed reports.

## ✨ Features

### 🎯 Core Features
- **Real-time Entry Form** - Add vehicle trips with comprehensive data tracking
- **Live Dashboard** - View analytics, trends, and insights about vehicle usage
- **History Management** - Browse, search, edit, and delete historical entries
- **PDF Export** - Generate professional reports for individual trips or complete history
- **Share Functionality** - Share trip details via native sharing or clipboard
- **Real-time Sync** - All data syncs instantly across devices using Firestore

### 📋 Form Fields
The entry form captures the following data:
- **Date & Time** - When the trip occurred
- **Driver Name** - Who was driving
- **Trip Destination** - Where the vehicle went
- **Vehicle Information** - Type and plate number
- **Mileage Tracking** - Start and end odometer readings
- **Fuel Levels** - Before and after trip fuel gauge readings
- **Auto-calculated Total** - Automatically computes trip mileage

### 📊 Dashboard Analytics
- Total entries and mileage statistics
- Monthly mileage trends
- Vehicle usage distribution charts
- Recent mileage patterns
- Top destinations analysis
- Fuel efficiency insights

### 🔐 Authentication & Security
- Email/password authentication
- Google Sign-In integration
- Secure user data isolation
- Firebase Authentication

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Firebase Firestore (real-time)
- **Authentication**: Firebase Auth
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React Context + React Query

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for production deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-mileage-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase (Optional for demo)**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database and Authentication
   - Update `src/lib/firebase.ts` with your Firebase configuration
   - For demo purposes, the app uses placeholder config

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage Guide

### 1. Authentication
- Create an account with email/password or sign in with Google
- The demo app works without real Firebase credentials for testing

### 2. Adding Entries
- Click "New Entry" in the sidebar
- Fill in all required fields (marked with *)
- Mileage total is automatically calculated
- Click "Submit Entry" to save

### 3. Viewing Dashboard
- Click "Dashboard" to see analytics and insights
- View charts for monthly trends, vehicle usage, and more
- Track key metrics like total mileage and average per trip

### 4. Managing History
- Click "History" to view all entries
- Search by driver, destination, vehicle type, or plate number
- Actions available per entry:
  - **Share**: Copy details or use native sharing
  - **Download PDF**: Generate individual trip report
  - **Delete**: Remove entry (with confirmation)
- Download complete history as PDF

### 5. PDF Reports
- Individual trip reports include all details
- Full history reports include summary tables
- Professional formatting with timestamps

## 🔧 Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── VehicleEntryForm.tsx
│   ├── VehicleHistory.tsx
│   ├── VehicleDashboard.tsx
│   ├── AuthForm.tsx
│   └── Layout.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── lib/                 # Utilities and services
│   ├── firebase.ts
│   ├── vehicleService.ts
│   └── utils.ts
├── pages/               # Main pages
│   └── VehicleTracker.tsx
├── types/               # TypeScript definitions
│   └── vehicle.ts
└── App.tsx             # Main app component
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

#### VehicleEntryForm
- Comprehensive form with validation
- Auto-calculating total mileage
- Date/time picker integration
- Fuel level dropdowns

#### VehicleHistory
- Real-time data table
- Search and filter functionality
- Mobile-responsive design
- PDF export per entry

#### VehicleDashboard
- Statistics cards
- Interactive charts
- Monthly analysis
- Top destinations

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables for Firebase
3. Deploy automatically on push

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize hosting: `firebase init hosting`
3. Build and deploy: `npm run build && firebase deploy`

### Other Platforms
The app can be deployed to any static hosting service (Netlify, AWS S3, etc.)

## 📊 Firebase Configuration

For production deployment, update `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /vehicleEntries/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🎨 Customization

### Styling
- Built with Tailwind CSS for easy customization
- shadcn/ui components for consistent design
- Responsive design works on all devices

### Adding Features
The modular structure makes it easy to add new features:
- Additional form fields
- New chart types
- Enhanced analytics
- Custom export formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Errors**
- Check your Firebase configuration
- Ensure Firestore and Auth are enabled
- Verify security rules

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

**PDF Generation Issues**
- Ensure jsPDF is properly installed
- Check browser popup settings for downloads

## 📞 Support

For questions, issues, or feature requests:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the documentation

---

Built with ❤️ using React, TypeScript, and Firebase
