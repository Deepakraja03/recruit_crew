import GoogleLoginButton from "./Google/GoogleLoginButton"

const NavBar = () => {
  return (
    <div>
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-white text-xl font-bold">RecruitCrew</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-blue-200">About</a>
              <a href="#" className="text-white hover:text-blue-200">Opportunities</a>
              <a href="/organization" className="text-white hover:text-blue-200">Organizations</a>
              <a href="#" className="text-white hover:text-blue-200">Contact</a>
            </div>
            <div className="space-x-4">
              <GoogleLoginButton />
            </div>
          </div>
        </nav>
    </div>
  )
}

export default NavBar