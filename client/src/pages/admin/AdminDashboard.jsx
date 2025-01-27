import Title from "../../components/Title"
import SidebarMenu from "./SidebarMenu"

const AdminDashboard = () => {
  return (
    <div className="flex lg:justify-center">
      {/* sidebar - menu */}
      <SidebarMenu />
      <div className="md:py-8 md:px-12 lg:w-[1400px] ">
      <div className="ml-6">
      <Title text1={"Admin"} text2={"Dashboard"}/>
      </div>
        {/* Your admin dashboard content goes here */}
        <div className="text-4xl">
          This is the admin dashboard content
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
