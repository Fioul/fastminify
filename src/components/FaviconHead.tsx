'use client'

import React from 'react'

export default function FaviconHead() {
  return (
    <>
      {/* Standard favicon - ICO format for maximum compatibility */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* SVG favicon for modern browsers */}
      <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
      
      {/* PNG favicons for different sizes */}
      <link rel="icon" type="image/png" sizes="32x32" href="/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="/web-app-manifest-192x192.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color - matching brand colors */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
    </>
  )
}
