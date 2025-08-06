"use client"

import React from "react"
import Link from "next/link"

export default function YellowBoxPage() {
  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Yellow Box Content</h1>
        <p className="text-gray-800 text-lg mb-8 max-w-md">
          This is the content for the Yellow box. You can add any information, features, or functionality here.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Return to Main Page
        </Link>
      </div>
    </div>
  )
} 