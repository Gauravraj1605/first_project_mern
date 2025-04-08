import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, Settings, History, User } from "lucide-react"
import { Link } from "react-router-dom"

const user = {
  id: "67f57a59cf233b15a92ef5db",
  name: "Ujjwal Singh",
  email: "ujjwal@example.com",
  mobile: "9875642133",
  isAdmin: false,
  isVerified: false,
}

const Sidebar = () => {
  return (
    <aside className="bg-[#222222] text-white min-h-screen w-64 p-6 shadow-lg space-y-8">
      <div className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-2">
          <AvatarFallback className="bg-[#FF9A00] text-black font-bold text-xl">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      <Separator className="bg-gray-600" />

      <nav className="space-y-4">
        <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF9A00]/20">
          <User className="mr-2 h-4 w-4" /> Platform
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF9A00]/20">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF9A00]/20">
          <History className="mr-2 h-4 w-4" /> History
        </Button>
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF9A00]/20">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </nav>
    </aside>
  )
}

const ProfileDetails = () => {
  return (
    <div className="flex-1 p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#222222] mb-6">User Profile</h1>
      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4">
          <div>
            <span className="text-sm text-gray-500">Full Name</span>
            <p className="font-medium text-[#222222]">{user.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium text-[#222222]">{user.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Mobile</span>
            <p className="font-medium text-[#222222]">{user.mobile}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Admin Status</span>
            <p className="font-medium text-[#222222]">{user.isAdmin ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Verified</span>
            <p className="font-medium text-[#222222]">{user.isVerified ? "Verified" : "Not Verified"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Profile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ProfileDetails />
    </div>
  )
}

export default Profile
