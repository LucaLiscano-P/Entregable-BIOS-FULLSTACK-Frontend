import { useState } from "react"
import { Sidebar } from "../components/SideBarAdmin"
import { CategoriesPanel } from "../components/CategoriesPanel"
import { PostsPanel } from "../components/PostPanel"
import { UsersPanel } from "../components/UsersPanel"



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex h-screen bg-[#1e1e1e]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto bg-[#252526]">
        {activeTab === "users" && <UsersPanel />}
        {activeTab === "categories" && <CategoriesPanel />}
        {activeTab === "posts" && <PostsPanel />}
      </main>
    </div>
  )
}