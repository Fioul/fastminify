'use client'

import React from 'react'

export default function FaviconHead() {
  return (
    <>
      {/* Standard favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      
      {/* Android Chrome Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
    </>
  )
}
