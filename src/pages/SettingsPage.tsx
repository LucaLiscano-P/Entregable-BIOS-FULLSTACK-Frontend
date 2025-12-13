import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { SettingsSidebar } from "../components/SettingsSidebar"
import { ProfilePanel } from "../components/ProfilePanel"
import { SecurityPanel } from "../components/SecurityPanel"

export function SettingsPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-screen bg-[#1e1e1e]">
      <SettingsSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onGoBack={handleGoBack}
      />
      <main className="flex-1 overflow-auto bg-[#252526]">
        {activeTab === "profile" && <ProfilePanel />}
        {activeTab === "security" && <SecurityPanel />}
      </main>
    </div>
  )
}

export default SettingsPage