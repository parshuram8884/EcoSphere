import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import EnvironmentalLayout from './pages/environmental/EnvironmentalLayout.jsx'
import SocialLayout from './pages/social/SocialLayout.jsx'
import GovernanceLayout from './pages/governance/GovernanceLayout.jsx'
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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<OverviewDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="department-ranking" element={<DepartmentRanking />} />
          <Route path="activity-feed" element={<ActivityFeed />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/environmental" element={<EnvironmentalLayout />}>
          <Route path="dashboard" element={<EnvironmentalDashboard />} />
          <Route path="carbon-transactions" element={<CarbonTransactions />} />
          <Route path="emission-factors" element={<EmissionFactors />} />
          <Route path="environmental-goals" element={<EnvironmentalGoals />} />
          <Route path="product-esg" element={<ProductESG />} />
        </Route>
        <Route path="/social" element={<SocialLayout />}>
          <Route path="csr-activities" element={<CSRActivities />} />
          <Route path="employee-participation" element={<EmployeeParticipation />} />
          <Route path="diversity-metrics" element={<DiversityMetrics />} />
          <Route path="training" element={<Training />} />
        </Route>
        <Route path="/governance" element={<GovernanceLayout />}>
          <Route path="policies" element={<Policies />} />
          <Route path="policy-acknowledgements" element={<PolicyAcknowledgements />} />
          <Route path="audits" element={<Audits />} />
          <Route path="compliance-issues" element={<ComplianceIssues />} />
        </Route>
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
