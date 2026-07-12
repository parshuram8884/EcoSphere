import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard/overview" element={<OverviewDashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/department-ranking" element={<DepartmentRanking />} />
        <Route path="/dashboard/activity-feed" element={<ActivityFeed />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/environmental/dashboard" element={<EnvironmentalDashboard />} />
        <Route path="/environmental/carbon-transactions" element={<CarbonTransactions />} />
        <Route path="/environmental/emission-factors" element={<EmissionFactors />} />
        <Route path="/environmental/environmental-goals" element={<EnvironmentalGoals />} />
        <Route path="/environmental/product-esg" element={<ProductESG />} />
        <Route path="/social/csr-activities" element={<CSRActivities />} />
        <Route path="/social/employee-participation" element={<EmployeeParticipation />} />
        <Route path="/social/diversity-metrics" element={<DiversityMetrics />} />
        <Route path="/social/training" element={<Training />} />
        <Route path="/governance/policies" element={<Policies />} />
        <Route path="/governance/policy-acknowledgements" element={<PolicyAcknowledgements />} />
        <Route path="/governance/audits" element={<Audits />} />
        <Route path="/governance/compliance-issues" element={<ComplianceIssues />} />
        <Route path="/gamification/challenges" element={<Challenges />} />
        <Route path="/gamification/challenge-participation" element={<ChallengeParticipation />} />
        <Route path="/gamification/badges" element={<Badges />} />
        <Route path="/gamification/rewards" element={<Rewards />} />
        <Route path="/gamification/leaderboard" element={<Leaderboard />} />
        <Route path="/reports/environmental-report" element={<EnvironmentalReport />} />
        <Route path="/reports/social-report" element={<SocialReport />} />
        <Route path="/reports/governance-report" element={<GovernanceReport />} />
        <Route path="/reports/esg-summary" element={<ESGSummary />} />
        <Route path="/reports/custom-report-builder" element={<CustomReportBuilder />} />
        <Route path="/administration/users" element={<Users />} />
        <Route path="/administration/departments" element={<Departments />} />
        <Route path="/administration/categories" element={<Categories />} />
        <Route path="/administration/esg-settings" element={<ESGSettings />} />
        <Route path="/administration/notification-settings" element={<NotificationSettings />} />
        <Route path="/administration/feature-toggles" element={<FeatureToggles />} />
        <Route path="/profile/overview" element={<ProfileOverview />} />
        <Route path="/profile/achievements" element={<Achievements />} />
        <Route path="/profile/rewards" element={<ProfileRewards />} />
        <Route path="/profile/security" element={<Security />} />
        <Route path="/profile/preferences" element={<Preferences />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
