import { Calendar, ArrowRight, Heart, Target, HandHelping } from 'lucide-react';
import NavBar from '../Components/NavBar';


function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
          <NavBar />
        <div className="relative z-10 container mx-auto px-6 h-[calc(100%-88px)] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Connect. Contribute. Create Change.
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Join our community of passionate volunteers and organizations making a difference. 
              Find meaningful opportunities that match your skills and interests.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100">
                Browse Opportunities
              </button>
            </div>
          </div>
        </div>
      </div> 

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RecruitCrew?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing how volunteers and organizations connect, making it easier than ever to create meaningful impact in your community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
              <p className="text-gray-600">
                Our intelligent system matches volunteers with opportunities based on skills, interests, and availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
              <p className="text-gray-600">
                Flexible scheduling tools make it simple to manage your volunteer commitments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHelping className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Effortless Volunteer Selection</h3>
              <p className="text-gray-600">
                Organizations can easily choose volunteers through our platform, as we handle the screening and grading process for them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Hours Contributed</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100">
              Join as Volunteer
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-800">
              Register Organization
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-6 w-6" />
                <span className="text-lg font-bold">RecruitCrew</span>
              </div>
              <p className="text-sm">
                Connecting passionate volunteers with meaningful opportunities to create positive change in communities.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Find Opportunities</a></li>
                <li><a href="#" className="hover:text-white">For Organizations</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2025 RecruitCrew. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;