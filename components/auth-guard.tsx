"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/supabase/auth-context"

type AuthGuardProps = {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, profile, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Skip check if still loading
    if (isLoading) return

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/register", "/forgot-password"]
    if (publicRoutes.includes(pathname)) {
      setIsAuthorized(true)
      return
    }

    // Not authenticated, redirect to login
    if (!user) {
      router.push("/login")
      return
    }

    // Check if profile exists
    if (!profile) {
      router.push("/register")
      return
    }

    // Check role-based access if roles are specified
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(profile.profile_type)) {
        // Redirect to appropriate dashboard based on role
        router.push(`/dashboard/${profile.profile_type}`)
        return
      }
    }

    // All checks passed
    setIsAuthorized(true)
  }, [user, profile, isLoading, pathname, router, allowedRoles])

  // Show loading or nothing while checking authorization
  if (isLoading || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
