"use client";
import React, { useEffect, useState } from "react";
import ChatBot from "./_chatbot/page";
import Navbar from "@/ui/components/ui/navbar";
import {
  ArrowRight,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user";
import Loader from "./loading";
import { User } from "../../gql/graphql";
function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {user,isLoading}=useCurrentUser();
   if(isLoading) return <Loader></Loader>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar user={user as User}></Navbar>

      <div className="flex items-center justify-center h-screen">
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Connect. Share. <span className="text-indigo-400">Thrive.</span>
              </h1>
              <p
                className={`text-xl max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Join millions of people who use ConnectHub to share ideas,
                discover new connections, and build meaningful relationships.
              </p>
              <div
                className={`transition-all duration-1000 delay-500 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center group"
                onClick={() => {
                  if(user){
                    window.location.href="/dashboard";
                  }else{
                    window.location.href="/auth";
                  }
                }}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
  );
}

export default App;
