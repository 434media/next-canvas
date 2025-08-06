"use client"

import React from "react"
import Link from "next/link"

export default function GreenBoxPage() {
  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Green Box Content</h1>
        <p className="text-white text-lg mb-8 max-w-md">
          This is the content for the Green box. You can add any information, features, or functionality here.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Return to Main Page
        </Link>
      </div>
    </div>
  )
} 