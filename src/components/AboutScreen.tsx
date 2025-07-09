import React from 'react';
import { Heart, Code, Zap, Shield, Users, Star } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-lg">HG</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hello Guys</h2>
          <p className="text-gray-600">Version 1.0.0</p>
          <p className="text-sm text-gray-500 mt-1">Created with ❤️ by Kiran</p>
        </div>

        <div className="space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About Hello Guys</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              I'm Hello Guys, your friendly AI assistant, designed to help you with a wide variety of tasks. 
              From answering questions and providing explanations to having casual conversations 
              and sharing jokes, I'm here to make your day better and more productive.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Crafted by Kiran with modern web technologies and designed with user experience in mind, 
              I aim to provide helpful, accurate, and engaging interactions that feel natural and human-like.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Quick Responses</p>
                  <p className="text-sm text-gray-500">Fast and accurate answers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Friendly Tone</p>
                  <p className="text-sm text-gray-500">Warm and approachable</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Privacy Focused</p>
                  <p className="text-sm text-gray-500">Your data stays secure</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Conversational</p>
                  <p className="text-sm text-gray-500">Natural dialogue flow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Technical Details</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Framework:</span>
                <span className="font-medium text-gray-800">React + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Styling:</span>
                <span className="font-medium text-gray-800">Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Icons:</span>
                <span className="font-medium text-gray-800">Lucide React</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Build Tool:</span>
                <span className="font-medium text-gray-800">Vite</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
            </div>
            <p className="text-gray-600 mb-4">
              I'm constantly learning and improving. Your feedback helps me become a better assistant!
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
              Share Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};