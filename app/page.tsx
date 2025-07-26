"use client"

import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Moon,
  Sun,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Server,
  Cloud,
  Database,
  GitBranch,
  Container,
  Settings,
  User,
  ChevronRight,
  X,
  HardDrive,
  Activity,
  BarChart3,
  Zap,
  Calendar,
} from "lucide-react"
import { LazyImage } from "@/components/LazyImage"
import { OptimizedSection } from "@/components/OptimizedSection"
import { MobileOptimized } from "@/components/MobileOptimized"

// Lazy load heavy components

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const terminalLines = useRef([
    "$ kubectl get pods",
    "$ docker-compose up -d",
    "$ terraform apply",
    "$ git push origin main",
    "$ aws ec2 describe-instances",
  ])
  const [activeLine, setActiveLine] = useState(0)

  // Memoized data to prevent unnecessary re-renders
  const skills = useMemo(
    () => ({
      "Cloud Platforms": [
        { name: "AWS", icon: Cloud },
        { name: "Azure", icon: Cloud },
        { name: "Google Cloud", icon: Cloud },
      ],
      "DevOps Tools": [
        { name: "Docker", icon: Container },
        { name: "Kubernetes", icon: Server },
        { name: "Jenkins", icon: Settings },
        { name: "ArgoCD", icon: GitBranch },
      ],
      Infrastructure: [
        { name: "Terraform", icon: Code },
        { name: "Ansible", icon: Settings },
        { name: "Linux", icon: Server },
        { name: "VMware", icon: Database },
      ],
      "Version Control": [
        { name: "Git", icon: GitBranch },
        { name: "GitHub", icon: Github },
        { name: "GitHub Actions", icon: Settings },
      ],
    }),
    [],
  )

  const projects = useMemo(
    () => [
      {
        title: "Cloud DevOps Accelerator",
        description:
          "Full-stack cloud infrastructure project with automated CI/CD pipelines, containerization, and monitoring solutions.",
        tech: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        github: "https://github.com/mujemi26/CloudDevOpsProject",
        image: "/images/design-diagram.png",
      },
      {
        title: "Board Game Review App",
        description:
          "Modern web application for board game reviews with user authentication, ratings, and community features.",
        tech: ["React", "Node.js", "MongoDB", "Docker"],
        github: "https://github.com/mujemi26/BoardGame-review",
        image: "/images/project-diagram.png",
      },
      {
        title: "Literary Lens Book Review",
        description:
          "Book review platform with advanced search, recommendations, and social features for book enthusiasts.",
        tech: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
        github: "https://github.com/mujemi26/LiteraryLens",
        image: "/images/literarylens-diagram.png",
      },
    ],
    [],
  )

  const experience = useMemo(
    () => [
      {
        company: "StarCom",
        position: "DevOps Engineer",
        period: "Current",
        description: [
          "Built and deployed a Kubernetes cluster from scratch on-premises, managing control plane, worker nodes, and networking using best practices.",
          "Implemented ArgoCD to manage application delivery using GitOps, ensuring consistent, auditable, and version-controlled deployments.",
          "Designed and maintained GitHub Actions workflows to automate CI/CD pipelines for microservices, improving deployment speed and developer efficiency.",
        ],
      },
      {
        company: "iVolve Technologies",
        position: "DevOps Engineer Intern",
        period: "May 2024 - Jul 2024",
        description: [
          "Implemented automated deployment pipelines using Jenkins and Ansible, accelerating deployment processes by 30%.",
          "Acquired hands-on expertise in designing containerized applications with Kubernetes and Docker, enhancing scalability and operational efficiency.",
        ],
      },
      {
        company: "Giza Food",
        position: "IT Helpdesk",
        period: "Dec 2024 - Dec 2024",
        description: [
          "Orchestrated the installation and configuration of Windows drivers and printers to achieve 100% system readiness.",
          "Troubleshot and resolved user issues, attaining an 85% first-call resolution rate that significantly reduced downtime.",
          "Administered user account management, streamlining processes to bolster security and enhance accessibility for employees.",
        ],
      },
    ],
    [],
  )

  const certifications = useMemo(
    () => [
      {
        name: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        url: "https://www.credly.com/badges/ee4ec1d1-bce0-48bc-a044-fe8df55ab759",
        icon: "aws",
        color: "from-orange-400 to-yellow-500",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        verified: true,
        date: "2024",
      },
      {
        name: "Azure AZ-900",
        issuer: "Microsoft",
        url: "https://learn.kodekloud.com/certificate/65866445-6adb-4a29-95c9-13f9bc8cad31",
        icon: "azure",
        color: "from-blue-400 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        verified: true,
        date: "2024",
      },
      {
        name: "Red Hat System Administration",
        issuer: "Red Hat",
        url: "https://drive.google.com/file/d/1Teu8BzgnxmINpNnLz29K1bhoH6OVRf8h/view",
        icon: "redhat",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        verified: true,
        date: "2024",
      },
      {
        name: "DevOps Pre-Requisite Course",
        issuer: "KodeKloud",
        url: "https://learn.kodekloud.com/certificate/2b9cdf3f-0927-4bf0-a049-2a8aa7dd498b",
        icon: "kodekloud",
        color: "from-cyan-400 to-blue-500",
        bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
        verified: true,
        date: "2024",
      },
    ],
    [],
  )

  const navLinks = useMemo(
    () => [
      { name: "About", href: "#about" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
      { name: "Skills", href: "#skills" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "#contact" },
    ],
    [],
  )

  // Optimized event handlers
  const handleDarkModeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % terminalLines.current.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion])

  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    }),
    [],
  )

  // Don't render theme-dependent content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <MobileOptimized className={`min-h-screen transition-colors duration-300`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MG
                  </span>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Loading Portfolio...
              </p>
            </div>
          </div>
        </div>
      </MobileOptimized>
    )
  }

  return (
    <MobileOptimized className={`min-h-screen transition-colors duration-300`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MG
                  </span>
                </div>
              </motion.div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-lg font-medium text-gray-600 dark:text-gray-400"
              >
                Loading Portfolio...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Custom Cursor Effect */}
        {!shouldReduceMotion && (
          <motion.div
            className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
            animate={{
              x: mousePosition.x - 15,
              y: mousePosition.y - 15,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{ willChange: "transform" }}
          />
        )}

        {/* Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <nav
          className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
              >
                <div className="relative">
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? {}
                        : {
                            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg"
                    style={{ willChange: shouldReduceMotion ? "auto" : "transform" }}
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                      <motion.span
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                color: ["#2563eb", "#9333ea", "#06b6d4", "#2563eb"],
                              }
                        }
                        transition={shouldReduceMotion ? {} : { duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="font-bold text-sm sm:text-lg md:text-xl"
                      >
                        MG
                      </motion.span>
                    </div>
                  </motion.div>
                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-lg -z-10"
                      style={{ willChange: "transform" }}
                    />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden xs:block"
                >
                  <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                    Muhammad Gamal
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">DevOps Engineer</p>
                </motion.div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    <span className="relative z-10 font-medium">{link.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      layoutId="navbar-hover"
                    />
                    <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDarkModeToggle}
                    className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 w-9 h-9 sm:w-10 sm:h-10"
                    aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <motion.div animate={{ rotate: theme === 'dark' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      {theme === 'dark' ? (
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Fixed Hamburger Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 w-9 h-9 sm:w-10 sm:h-10"
                  onClick={handleMobileMenuToggle}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: mobileMenuOpen ? 45 : 0,
                        y: mobileMenuOpen ? 0 : -4,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute w-4 h-0.5 bg-current"
                    />
                    <motion.div
                      animate={{
                        opacity: mobileMenuOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute w-4 h-0.5 bg-current"
                    />
                    <motion.div
                      animate={{
                        rotate: mobileMenuOpen ? -45 : 0,
                        y: mobileMenuOpen ? 0 : 4,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute w-4 h-0.5 bg-current"
                    />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={handleMobileMenuToggle}
                aria-hidden="true"
              />

              {/* Mobile Menu */}
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700 z-50 lg:hidden overflow-y-auto shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
              >
                <div className="p-6">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MG
                          </span>
                        </div>
                      </div>
                      <div>
                        <h2 id="mobile-menu-title" className="font-bold text-lg">
                          Muhammad Gamal
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">DevOps Engineer</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMobileMenuToggle}
                      className="h-10 w-10"
                      aria-label="Close navigation menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Navigation Links */}
                  <nav aria-label="Mobile navigation">
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      className="space-y-2"
                    >
                      {navLinks.map((link, index) => (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          variants={{
                            hidden: { opacity: 0, x: 20 },
                            show: { opacity: 1, x: 0 },
                          }}
                          onClick={handleMobileMenuToggle}
                          className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 border-l-4 border-transparent hover:border-blue-600 dark:hover:border-blue-400 group"
                          whileHover={shouldReduceMotion ? {} : { x: 5 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          role="menuitem"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          <span className="font-medium text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {link.name}
                          </span>
                        </motion.a>
                      ))}
                    </motion.div>
                  </nav>

                  {/* Social Links in Mobile Menu */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Connect with me</p>
                    <div className="flex space-x-3">
                      <motion.a
                        href="https://linkedin.com/in/mgghatory"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                        aria-label="Visit LinkedIn profile"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </motion.a>
                      <motion.a
                        href="https://github.com/mujemi26"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                        aria-label="Visit GitHub profile"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      </motion.a>
                      <motion.a
                        href="mailto:mgghatory@gmail.com"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                        aria-label="Send email"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 z-50 origin-left"
          style={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background Elements - Optimized */}
        {!shouldReduceMotion && (
          <>
            {/* DevOps-Themed Cloud Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute left-[10%] top-[15%] opacity-20 dark:opacity-10">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="relative"
                  style={{ willChange: "transform" }}
                >
                  <Cloud size={60} strokeWidth={1} className="text-blue-500" />
                </motion.div>
              </div>
              <div className="absolute right-[15%] top-[25%] opacity-20 dark:opacity-10">
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="relative"
                  style={{ willChange: "transform" }}
                >
                  <Server size={50} strokeWidth={1} className="text-purple-500" />
                </motion.div>
              </div>
              <div className="absolute left-[20%] top-[60%] opacity-20 dark:opacity-10">
                <motion.div
                  animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="relative"
                  style={{ willChange: "transform" }}
                >
                  <Container size={45} strokeWidth={1} className="text-cyan-500" />
                </motion.div>
              </div>
              <div className="absolute right-[25%] top-[80%] opacity-20 dark:opacity-10">
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="relative"
                  style={{ willChange: "transform" }}
                >
                  <GitBranch size={55} strokeWidth={1} className="text-green-500" />
                </motion.div>
              </div>
            </div>

            {/* Interactive Background Pattern */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <motion.path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-blue-500/10 dark:text-blue-400/10"
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Floating Particles Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, Math.random() * 0.5 + 0.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    willChange: "transform",
                  }}
                />
              ))}
            </div>
          </>
        )}

        <main id="main-content" role="main">
          {/* Hero Section */}
          <OptimizedSection id="hero" className="pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6 sm:space-y-8 text-center lg:text-left"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 dark:text-blue-400"
                    >
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm sm:text-base">Giza, Egypt</span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                    >
                      <motion.span
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent"
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                              }
                        }
                        transition={
                          shouldReduceMotion
                            ? {}
                            : {
                                duration: 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }
                        }
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      >
                        Muhammad Gamal
                      </motion.span>
                    </motion.h1>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
                    >
                      DevOps Engineer
                    </motion.h2>

                    {/* DevOps Terminal Animation - Mobile Optimized */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 mb-6 bg-gray-900 dark:bg-black rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-1 sm:mr-2"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 mr-1 sm:mr-2"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-gray-400 text-xs">terminal</span>
                      </div>
                      <div className="text-green-400 font-mono text-xs sm:text-sm">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeLine}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-start"
                          >
                            <span className="text-blue-400 mr-2 flex-shrink-0">~$</span>
                            <span className="break-all">{terminalLines.current[activeLine]}</span>
                            <motion.span
                              animate={{ opacity: [0, 1] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 0.8,
                                repeatType: "reverse",
                              }}
                              className="inline-block w-1 sm:w-2 h-3 sm:h-4 bg-green-400 ml-1 flex-shrink-0"
                            ></motion.span>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    >
                      Proactive and solution-oriented Junior DevOps Engineer skilled in CI/CD, Infrastructure as Code,
                      cloud platforms (AWS, Azure), and automation tools (Ansible, Kubernetes, Docker). Passionate about
                      building scalable, reliable systems that drive business success.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                  >
                    <motion.a
                      href="https://drive.google.com/file/d/1o0tRC80uiLI__B44aVHTit47TvDMnd6h/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-h-[48px] touch-manipulation"
                      aria-label="Download Muhammad Gamal's CV"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <Download className="h-5 w-5" />
                      <span>Download CV</span>
                    </motion.a>
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-h-[48px] touch-manipulation"
                      aria-label="View technical projects"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View Projects</span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center lg:justify-start space-x-4"
                  >
                    <a href="https://linkedin.com/in/mgghatory" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 touch-manipulation"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="https://github.com/mujemi26" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 touch-manipulation"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="mailto:mgghatory@gmail.com">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 touch-manipulation"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative order-first lg:order-last"
                >
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                    {/* Profile image with mobile-optimized effects */}
                    <div className="relative">
                      {!shouldReduceMotion && (
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 1, -1, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full blur-2xl opacity-30"
                          style={{ willChange: "transform" }}
                        />
                      )}
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative"
                      >
                        <LazyImage
                          src="/profile.jpg"
                          alt="Muhammad Gamal"
                          width={400}
                          height={400}
                          className="relative rounded-full w-full h-auto object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                          priority
                        />
                        {!shouldReduceMotion && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </OptimizedSection>

          {/* DevOps Workflow Diagram Section */}
          <OptimizedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">DevOps Lifecycle</h2>
                <p className="text-gray-600 dark:text-gray-400">My continuous integration and delivery workflow</p>
              </motion.div>

              <div className="mt-12 relative">
                {/* DevOps Infinite Loop Diagram */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
                  <motion.div
                    className="relative z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 w-24 h-24 flex items-center justify-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Code size={40} className="text-blue-600" />
                    <span className="absolute -bottom-8 text-sm font-medium">Code</span>
                  </motion.div>

                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-0 md:w-16 h-2 bg-gradient-to-r from-blue-600 to-purple-600 hidden md:block"
                    />
                  )}

                  <motion.div
                    className="relative z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 w-24 h-24 flex items-center justify-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GitBranch size={40} className="text-purple-600" />
                    <span className="absolute -bottom-8 text-sm font-medium">Build</span>
                  </motion.div>

                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                      className="w-0 md:w-16 h-2 bg-gradient-to-r from-purple-600 to-cyan-500 hidden md:block"
                    />
                  )}

                  <motion.div
                    className="relative z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 w-24 h-24 flex items-center justify-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Container size={40} className="text-cyan-500" />
                    <span className="absolute -bottom-8 text-sm font-medium">Test</span>
                  </motion.div>

                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
                      className="w-0 md:w-16 h-2 bg-gradient-to-r from-cyan-500 to-green-500 hidden md:block"
                    />
                  )}

                  <motion.div
                    className="relative z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 w-24 h-24 flex items-center justify-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Server size={40} className="text-green-500" />
                    <span className="absolute -bottom-8 text-sm font-medium">Deploy</span>
                  </motion.div>

                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.2 }}
                      className="w-0 md:w-16 h-2 bg-gradient-to-r from-green-500 to-yellow-500 hidden md:block"
                    />
                  )}

                  <motion.div
                    className="relative z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 w-24 h-24 flex items-center justify-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Settings size={40} className="text-yellow-500" />
                    <span className="absolute -bottom-8 text-sm font-medium">Monitor</span>
                  </motion.div>
                </div>

                {/* Loop back arrow for infinite DevOps cycle - visible only on larger screens */}
                {!shouldReduceMotion && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 h-16"
                  >
                    <svg viewBox="0 0 500 40" className="w-full h-full">
                      <path
                        d="M 10,20 Q 250,60 490,20"
                        stroke="url(#loopGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                      />
                      <defs>
                        <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </div>
            </div>
          </OptimizedSection>

          {/* ArgoCD GitOps Section */}
          <OptimizedSection className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <GitBranch className="mr-3 h-8 w-8 text-blue-600" />
                    GitOps with ArgoCD
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    I implement GitOps practices using ArgoCD for declarative, version-controlled deployments. This
                    approach ensures consistency, auditability, and automated synchronization between Git repositories
                    and Kubernetes clusters.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-5 w-5 text-blue-600" />
                      <span>Declarative application deployment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      <span>Automated sync and rollback capabilities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <span>Multi-cluster management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <span>Real-time application health monitoring</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-lg p-6 shadow-xl text-gray-300 font-mono text-sm overflow-hidden"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-400 text-xs">application.yaml</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-blue-400">
                      apiVersion: <span className="text-yellow-300">argoproj.io/v1alpha1</span>
                    </div>
                    <div className="text-blue-400">
                      kind: <span className="text-yellow-300">Application</span>
                    </div>
                    <div className="text-blue-400">metadata:</div>
                    <div className="ml-4 text-green-400">
                      name: <span className="text-purple-300">my-app</span>
                    </div>
                    <div className="ml-4 text-green-400">
                      namespace: <span className="text-purple-300">argocd</span>
                    </div>
                    <div className="text-blue-400">spec:</div>
                    <div className="ml-4 text-green-400">project: default</div>
                    <div className="ml-4 text-green-400">source:</div>
                    <div className="ml-8 text-green-400">
                      repoURL: <span className="text-purple-300">https://github.com/user/app</span>
                    </div>
                    <div className="ml-8 text-green-400">
                      targetRevision: <span className="text-purple-300">HEAD</span>
                    </div>
                    <div className="ml-8 text-green-400">
                      path: <span className="text-purple-300">k8s</span>
                    </div>
                    <div className="ml-4 text-green-400">destination:</div>
                    <div className="ml-8 text-green-400">
                      server: <span className="text-purple-300">https://kubernetes.default.svc</span>
                    </div>
                    <div className="ml-8 text-green-400">
                      namespace: <span className="text-purple-300">production</span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    viewport={{ once: true }}
                    className="h-px bg-green-500 my-4"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-gray-400"># ArgoCD Status</div>
                    <div className="text-green-400 mt-2">$ argocd app get my-app</div>
                    <div className="text-white mt-1">Name: my-app</div>
                    <div className="text-white mt-1">Project: default</div>
                    <div className="text-green-500 mt-1">Sync Status: Synced</div>
                    <div className="text-green-500">Health Status: Healthy</div>
                    <div className="text-blue-400 mt-2">Last Sync: 2024-01-25 10:30:15 UTC</div>
                    <div className="text-yellow-300 mt-1">Auto-sync: Enabled</div>
                    <div className="text-green-400 mt-2">✓ Deployment successfully synced</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </OptimizedSection>

          {/* Monitoring & Observability Section */}
          <OptimizedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-lg p-6 shadow-xl text-gray-300 font-mono text-sm overflow-hidden order-2 md:order-1"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-400 text-xs">prometheus.yml</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-blue-400">global:</div>
                    <div className="ml-4 text-green-400">
                      scrape_interval: <span className="text-purple-300">15s</span>
                    </div>
                    <div className="ml-4 text-green-400">
                      evaluation_interval: <span className="text-purple-300">15s</span>
                    </div>
                    <div className="text-blue-400 mt-2">scrape_configs:</div>
                    <div className="ml-4 text-green-400">
                      - job_name: <span className="text-purple-300">'kubernetes-pods'</span>
                    </div>
                    <div className="ml-6 text-green-400">kubernetes_sd_configs:</div>
                    <div className="ml-8 text-green-400">
                      - role: <span className="text-purple-300">pod</span>
                    </div>
                    <div className="ml-6 text-green-400">relabel_configs:</div>
                    <div className="ml-8 text-green-400">
                      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
                    </div>
                    <div className="ml-10 text-green-400">
                      action: <span className="text-purple-300">keep</span>
                    </div>
                    <div className="ml-10 text-green-400">
                      regex: <span className="text-purple-300">true</span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    viewport={{ once: true }}
                    className="h-px bg-orange-500 my-4"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-gray-400"># Grafana Dashboard Query</div>
                    <div className="text-orange-400 mt-2">rate(http_requests_total[5m])</div>
                    <div className="text-white mt-1">CPU Usage: 45.2%</div>
                    <div className="text-white mt-1">Memory Usage: 1.2GB / 2GB</div>
                    <div className="text-green-500 mt-1">Response Time: 120ms avg</div>
                    <div className="text-blue-400 mt-2">Active Alerts: 0</div>
                    <div className="text-green-400 mt-1">✓ All services healthy</div>
                    <div className="text-yellow-300 mt-1">📊 Collecting 15k metrics/min</div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="order-1 md:order-2"
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <BarChart3 className="mr-3 h-8 w-8 text-orange-600" />
                    Monitoring & Observability
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    I implement comprehensive monitoring solutions using Prometheus and Grafana to ensure system
                    reliability, performance optimization, and proactive issue detection across distributed
                    environments.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      <span>Real-time metrics collection and alerting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-orange-600" />
                      <span>Custom dashboards and visualizations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      <span>Automated incident response workflows</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-orange-600" />
                      <span>Log aggregation and analysis</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </OptimizedSection>

          {/* Creative Section Divider */}
          <div className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {!shouldReduceMotion && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-32 h-32 border-2 border-dashed border-blue-500/20 rounded-full"
                    style={{ willChange: "transform" }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute w-24 h-24 border-2 border-dotted border-purple-500/20 rounded-full"
                    style={{ willChange: "transform" }}
                  />
                </>
              )}
            </div>
          </div>

          {/* About Section */}
          <OptimizedSection id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <Card className="p-8">
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <User className="h-8 w-8 text-blue-600" />
                      <h3 className="text-2xl font-semibold">Professional Profile</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      As a proactive and solution-oriented Junior DevOps Engineer, I specialize in building and
                      maintaining robust CI/CD pipelines, implementing Infrastructure as Code, and leveraging cloud
                      platforms like AWS and Azure. My expertise spans across containerization technologies including
                      Docker and Kubernetes, automation tools like Ansible, and modern DevOps practices that ensure
                      scalable, reliable, and efficient systems.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      I'm passionate about continuous learning and staying up-to-date with the latest technologies and
                      best practices in the DevOps ecosystem. My goal is to contribute to building systems that not only
                      meet current requirements but are also prepared for future scalability and growth.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </OptimizedSection>

          {/* Infrastructure as Code Animation */}
          <OptimizedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6">Infrastructure as Code</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    I specialize in creating reproducible, version-controlled infrastructure using modern IaC tools and
                    practices. This approach enables consistent deployments, simplified scaling, and rapid disaster
                    recovery.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      <span>Terraform for multi-cloud provisioning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <span>Ansible for configuration management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-5 w-5 text-blue-600" />
                      <span>AWS CloudFormation for AWS resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cloud className="h-5 w-5 text-blue-600" />
                      <span>ARM templates for Azure deployments</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-lg p-6 shadow-xl text-gray-300 font-mono text-sm overflow-hidden"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-400 text-xs">terraform.tf</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-blue-400">
                      provider <span className="text-yellow-300">"aws"</span> {"{"}
                    </div>
                    <div className="ml-4 text-green-400">
                      region = <span className="text-purple-300">"us-west-2"</span>
                    </div>
                    <div>{"}"}</div>
                    <div className="mt-2 text-blue-400">
                      resource <span className="text-yellow-300">"aws_instance"</span>{" "}
                      <span className="text-yellow-300">"web"</span> {"{"}
                    </div>
                    <div className="ml-4 text-green-400">
                      ami = <span className="text-purple-300">"ami-0c55b159cbfafe1f0"</span>
                    </div>
                    <div className="ml-4 text-green-400">
                      instance_type = <span className="text-purple-300">"t2.micro"</span>
                    </div>
                    <div className="ml-4 text-green-400">tags = {"{"}</div>
                    <div className="ml-8 text-green-400">
                      Name = <span className="text-purple-300">"WebServer"</span>
                    </div>
                    <div className="ml-4">{"}"}</div>
                    <div>{"}"}</div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    viewport={{ once: true }}
                    className="h-px bg-green-500 my-4"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-gray-400"># Terminal output</div>
                    <div className="text-green-400 mt-2">$ terraform apply</div>
                    <div className="text-white mt-1">Terraform will perform the following actions:</div>
                    <div className="text-white mt-1"> # aws_instance.web will be created</div>
                    <div className="text-green-500 mt-1">Plan: 1 to add, 0 to change, 0 to destroy.</div>
                    <div className="text-yellow-300 mt-2">Do you want to perform these actions? [y/n]</div>
                    <div className="text-white">y</div>
                    <div className="text-green-400 mt-2">aws_instance.web: Creating...</div>
                    <div className="text-green-400">aws_instance.web: Creation complete after 30s</div>
                    <div className="text-green-500 mt-1">
                      Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </OptimizedSection>

          {/* Experience Section */}
          <OptimizedSection id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Experience</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </motion.div>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {exp.position}
                            </CardTitle>
                            <CardDescription className="text-lg font-semibold">{exp.company}</CardDescription>
                          </div>
                          <Badge variant="secondary">{exp.period}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <ChevronRight className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </OptimizedSection>

          {/* Projects Section */}
          <OptimizedSection id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Technical Projects</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -10,
                              rotateX: 5,
                              rotateY: 5,
                              scale: 1.02,
                              transition: { type: "spring", stiffness: 300 }
                            }
                      }
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="group perspective-1000"
                    >
                      <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent group-hover:border-blue-500/50 flex flex-col">
                        {/* Animated background gradient */}
                        {!shouldReduceMotion && (
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{
                              background: [
                                "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
                                "linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(6, 182, 212, 0.05))",
                                "linear-gradient(225deg, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))",
                              ],
                            }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}

                        <div className="relative overflow-hidden">
                          <motion.div
                            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <LazyImage
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={400}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                          </motion.div>

                          {/* Overlay effect */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white/90 dark:bg-gray-900/90 rounded-full p-3"
                            >
                              <ExternalLink className="h-6 w-6 text-blue-600" />
                            </motion.div>
                          </motion.div>
                        </div>

                        <CardHeader className="relative z-10">
                          <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 relative z-10 flex flex-col">
                          <div className="flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.map((tech, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* GitHub button - Always at bottom */}
                          <div className="mt-auto">
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              whileHover={shouldReduceMotion ? {} : { x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Github className="mr-2 h-4 w-4" />
                              View on GitHub
                            </motion.a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Suspense>
              </div>
            </div>
          </OptimizedSection>

          {/* Skills Section */}
          <OptimizedSection id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Skills & Tools</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1.05,
                            rotateY: 5,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                          }
                    }
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300">
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            background: [
                              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                              "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))",
                              "linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                      <CardHeader className="relative z-10">
                        <CardTitle className="text-lg text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="space-y-4">
                          {skillList.map((skill, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center space-x-3 group/item"
                              whileHover={shouldReduceMotion ? {} : { x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <motion.div
                                whileHover={shouldReduceMotion ? {} : { rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                              >
                                <skill.icon className="h-6 w-6 text-blue-600 group-hover/item:text-purple-600 transition-colors" />
                              </motion.div>
                              <span className="font-medium group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                {skill.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </OptimizedSection>

          {/* Certifications Section */}
          <OptimizedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Certifications & Achievements</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Professional certifications that validate my expertise in cloud platforms, DevOps practices, and
                  system administration
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1.05,
                            rotateY: 5,
                            rotateX: 5,
                            z: 50,
                            transition: { type: "spring", stiffness: 300 }
                          }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="group perspective-1000"
                  >
                    <Card
                      className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-gradient-to-r ${cert.bgColor} group-hover:shadow-lg group-hover:shadow-current/20 h-full flex flex-col`}
                    >
                      {/* Animated background gradient */}
                      {!shouldReduceMotion && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                          animate={{
                            background: [
                              `linear-gradient(45deg, ${cert.color.split(" ")[1]}, ${cert.color.split(" ")[3]})`,
                              `linear-gradient(135deg, ${cert.color.split(" ")[3]}, ${cert.color.split(" ")[1]})`,
                              `linear-gradient(225deg, ${cert.color.split(" ")[1]}, ${cert.color.split(" ")[3]})`,
                            ],
                          }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}

                      {/* Verification Badge */}
                      {cert.verified && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
                          className="absolute top-3 right-3 z-20"
                        >
                          <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                            <motion.div
                              animate={shouldReduceMotion ? {} : { rotate: 360 }}
                              transition={
                                shouldReduceMotion
                                  ? {}
                                  : { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                              }
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      <CardContent className="p-6 text-center relative z-10 flex flex-col h-full">
                        {/* Certificate Icon/Logo */}
                        <motion.div
                          className="mb-6 relative"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotateY: 180 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div
                            className={`w-20 h-20 mx-auto rounded-2xl ${cert.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                          >
                            {cert.icon === "aws" && (
                              <motion.div
                                animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
                                transition={shouldReduceMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                className="relative"
                              >
                                 <img
                                  src="/images/aws.svg"
                                  alt="AWS"
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-lg object-contain"
                                />
                                <motion.div
                                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                                  transition={
                                    shouldReduceMotion ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }
                                  }
                                  className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"
                                />
                              </motion.div>
                            )}

                            {cert.icon === "azure" && (
                              <motion.div
                                animate={shouldReduceMotion ? {} : { rotate: [0, -5, 5, 0] }}
                                transition={shouldReduceMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                className="relative"
                              >
                                <img
                                  src="/images/azure.svg"
                                  alt="Azure"
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-lg object-contain"
                                />
                                <motion.div
                                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                                  transition={
                                    shouldReduceMotion
                                      ? {}
                                      : { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }
                                  }
                                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                                />
                              </motion.div>
                            )}

                            {cert.icon === "redhat" && (
                              <motion.div
                                animate={shouldReduceMotion ? {} : { rotate: [0, -3, 3, 0] }}
                                transition={shouldReduceMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                className="relative"
                              >
                                <img
                                  src="/images/redhat.svg"
                                  alt="Red Hat"
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-lg object-contain"
                                />
                                <motion.div
                                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                                  transition={
                                    shouldReduceMotion
                                      ? {}
                                      : { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }
                                  }
                                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
                                />
                              </motion.div>
                            )}

                            {cert.icon === "kodekloud" && (
                              <motion.div
                                animate={shouldReduceMotion ? {} : { rotate: [0, -3, 3, 0] }}
                                transition={shouldReduceMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                className="relative"
                              >
                                <LazyImage
                                  src="/images/kodekloud-logo.jpeg"
                                  alt="KodeKloud"
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-lg object-contain"
                                />
                                <motion.div
                                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                                  transition={
                                    shouldReduceMotion
                                      ? {}
                                      : { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }
                                  }
                                  className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                                />
                              </motion.div>
                            )}
                          </div>

                          {/* Floating particles around icon */}
                          {!shouldReduceMotion && (
                            <>
                              <motion.div
                                animate={{
                                  y: [-5, 5, -5],
                                  x: [-3, 3, -3],
                                  opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: index * 0.2,
                                }}
                                className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full opacity-30"
                              />
                              <motion.div
                                animate={{
                                  y: [5, -5, 5],
                                  x: [3, -3, 3],
                                  opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: index * 0.2 + 1,
                                }}
                                className="absolute -bottom-2 -right-2 w-2 h-2 bg-purple-400 rounded-full opacity-30"
                              />
                            </>
                          )}
                        </motion.div>

                        {/* Certificate Info - Flexible content area */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex-grow flex flex-col justify-between"
                        >
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {cert.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">{cert.issuer}</p>

                            {/* Date Badge */}
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 mb-4">
                              <Calendar className="w-3 h-3 mr-1" />
                              {cert.date}
                            </div>
                          </div>

                          {/* View Certificate Button - Always at bottom */}
                          <div className="mt-auto">
                            <motion.a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r ${cert.color} text-white font-medium text-sm hover:shadow-lg transition-all duration-300 group/btn`}
                              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                            >
                              <motion.div
                                animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
                                transition={shouldReduceMotion ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="mr-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.div>
                              <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                                View Certificate
                              </span>
                            </motion.a>
                          </div>
                        </motion.div>

                        {/* Progress Bar Animation */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          viewport={{ once: true }}
                          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${cert.color} opacity-60`}
                        />
                      </CardContent>

                      {/* Hover Glow Effect */}
                      {!shouldReduceMotion && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Achievement Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                  </motion.div>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md"
                  >
                    <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Verified</div>
                  </motion.div>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md"
                  >
                    <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cloud Platforms</div>
                  </motion.div>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md"
                  >
                    <div className="text-2xl font-bold text-orange-600 mb-1">2024</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Latest Year</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </OptimizedSection>

          {/* Education Section */}
          <OptimizedSection className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Education</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <Card className="p-8">
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <User className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="text-2xl font-semibold">Bachelor of Management Information Systems</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Major: Business Information Systems</p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                      Sadat Academy for Management and Sciences
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </OptimizedSection>

          {/* Contact Section */}
          <OptimizedSection id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                  DevOps and technology.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <Card className="p-6">
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Mail className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <a href="mailto:mgghatory@gmail.com" className="text-blue-600 hover:text-blue-800">
                            mgghatory@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <MapPin className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Location</h3>
                          <p className="text-gray-600 dark:text-gray-400">Giza, Egypt</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-4">
                    <a href="https://linkedin.com/in/mgghatory" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Linkedin className="mr-2 h-5 w-5" />
                        LinkedIn
                      </Button>
                    </a>
                    <a href="https://github.com/mujemi26" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg">
                        <Github className="mr-2 h-5 w-5" />
                        GitHub
                      </Button>
                    </a>
                    <a href="mailto:mgghatory@gmail.com">
                      <Button variant="outline" size="lg">
                        <Mail className="mr-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and I'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="Subject"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <textarea
                          placeholder="Your Message"
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </OptimizedSection>

          {/* Footer */}
          <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Muhammad Gamal. All rights reserved.
              </p>
            </div>
          </footer>
        </main>

        {/* Floating Action Button - Mobile Optimized */}
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
        >
          <motion.button
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.1,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 30px rgba(147, 51, 234, 0.4)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }
            }
            onClick={handleScrollToTop}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
            aria-label="Scroll to top"
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            {!shouldReduceMotion ? (
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="text-lg sm:text-xl"
              >
                ↑
              </motion.div>
            ) : (
              <span className="text-lg sm:text-xl">↑</span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </MobileOptimized>
  )
}
