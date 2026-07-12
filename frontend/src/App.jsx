import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import OverviewDashboard from './pages/dashboard/Overview.jsx'
import Analytics from './pages/dashboard/Analytics.jsx'
import DepartmentRanking from './pages/dashboard/DepartmentRanking.jsx'
import ActivityFeed from './pages/dashboard/ActivityFeed.jsx'
import Notifications from './pages/dashboard/Notifications.jsx'
import EnvironmentalDashboard from './pages/environmental/Dashboard.jsx'
import CarbonTransactions from './pages/environmental/CarbonTransactions.jsx'
import EmissionFactors from './pages/environmental/EmissionFactors.jsx'
import EnvironmentalGoals from './pages/environmental/EnvironmentalGoals.jsx'
import ProductESG from './pages/environmental/ProductESG.jsx'
import CSRActivities from './pages/social/CSRActivities.jsx'
import EmployeeParticipation from './pages/social/EmployeeParticipation.jsx'
import DiversityMetrics from './pages/social/DiversityMetrics.jsx'
import Training from './pages/social/Training.jsx'
import Policies from './pages/governance/Policies.jsx'
import PolicyAcknowledgements from './pages/governance/PolicyAcknowledgements.jsx'
import Audits from './pages/governance/Audits.jsx'
import ComplianceIssues from './pages/governance/ComplianceIssues.jsx'
import Challenges from './pages/gamification/Challenges.jsx'
import ChallengeParticipation from './pages/gamification/ChallengeParticipation.jsx'
import Badges from './pages/gamification/Badges.jsx'
import Rewards from './pages/gamification/Rewards.jsx'
import Leaderboard from './pages/gamification/Leaderboard.jsx'
import EnvironmentalReport from './pages/reports/EnvironmentalReport.jsx'
import SocialReport from './pages/reports/SocialReport.jsx'
import GovernanceReport from './pages/reports/GovernanceReport.jsx'
import ESGSummary from './pages/reports/ESGSummary.jsx'
import CustomReportBuilder from './pages/reports/CustomReportBuilder.jsx'
import Users from './pages/administration/Users.jsx'
import Departments from './pages/administration/Departments.jsx'
import Categories from './pages/administration/Categories.jsx'
import ESGSettings from './pages/administration/ESGSettings.jsx'
import NotificationSettings from './pages/administration/NotificationSettings.jsx'
import FeatureToggles from './pages/administration/FeatureToggles.jsx'
import ProfileOverview from './pages/profile/Overview.jsx'
import Achievements from './pages/profile/Achievements.jsx'
import ProfileRewards from './pages/profile/Rewards.jsx'
import Security from './pages/profile/Security.jsx'
import Preferences from './pages/profile/Preferences.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard/overview" element={<ProtectedRoute><OverviewDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/dashboard/department-ranking" element={<ProtectedRoute><DepartmentRanking /></ProtectedRoute>} />
        <Route path="/dashboard/activity-feed" element={<ProtectedRoute><ActivityFeed /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/environmental/dashboard" element={<ProtectedRoute><EnvironmentalDashboard /></ProtectedRoute>} />
        <Route path="/environmental/carbon-transactions" element={<ProtectedRoute><CarbonTransactions /></ProtectedRoute>} />
        <Route path="/environmental/emission-factors" element={<ProtectedRoute><EmissionFactors /></ProtectedRoute>} />
        <Route path="/environmental/environmental-goals" element={<ProtectedRoute><EnvironmentalGoals /></ProtectedRoute>} />
        <Route path="/environmental/product-esg" element={<ProtectedRoute><ProductESG /></ProtectedRoute>} />
        <Route path="/social/csr-activities" element={<ProtectedRoute><CSRActivities /></ProtectedRoute>} />
        <Route path="/social/employee-participation" element={<ProtectedRoute><EmployeeParticipation /></ProtectedRoute>} />
        <Route path="/social/diversity-metrics" element={<ProtectedRoute><DiversityMetrics /></ProtectedRoute>} />
        <Route path="/social/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
        <Route path="/governance/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
        <Route path="/governance/policy-acknowledgements" element={<ProtectedRoute><PolicyAcknowledgements /></ProtectedRoute>} />
        <Route path="/governance/audits" element={<ProtectedRoute><Audits /></ProtectedRoute>} />
        <Route path="/governance/compliance-issues" element={<ProtectedRoute><ComplianceIssues /></ProtectedRoute>} />
        <Route path="/gamification/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
        <Route path="/gamification/challenge-participation" element={<ProtectedRoute><ChallengeParticipation /></ProtectedRoute>} />
        <Route path="/gamification/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />
        <Route path="/gamification/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/gamification/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/reports/environmental-report" element={<ProtectedRoute><EnvironmentalReport /></ProtectedRoute>} />
        <Route path="/reports/social-report" element={<ProtectedRoute><SocialReport /></ProtectedRoute>} />
        <Route path="/reports/governance-report" element={<ProtectedRoute><GovernanceReport /></ProtectedRoute>} />
        <Route path="/reports/esg-summary" element={<ProtectedRoute><ESGSummary /></ProtectedRoute>} />
        <Route path="/reports/custom-report-builder" element={<ProtectedRoute><CustomReportBuilder /></ProtectedRoute>} />
        <Route path="/administration/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/administration/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
        <Route path="/administration/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/administration/esg-settings" element={<ProtectedRoute><ESGSettings /></ProtectedRoute>} />
        <Route path="/administration/notification-settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
        <Route path="/administration/feature-toggles" element={<ProtectedRoute><FeatureToggles /></ProtectedRoute>} />
        <Route path="/profile/overview" element={<ProtectedRoute><ProfileOverview /></ProtectedRoute>} />
        <Route path="/profile/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path="/profile/rewards" element={<ProtectedRoute><ProfileRewards /></ProtectedRoute>} />
        <Route path="/profile/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
        <Route path="/profile/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
