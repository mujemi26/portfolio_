"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Cloud DevOps Accelerator",
      description:
        "Full-stack cloud infrastructure project with automated CI/CD pipelines, containerization, and monitoring solutions. Built with modern DevOps practices including Infrastructure as Code, automated testing, and continuous deployment.",
      tech: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible"],
      github: "https://github.com/mujemi26/CloudDevOpsProject",
      image: "/placeholder.svg?height=200&width=400",
      features: [
        "Automated CI/CD pipeline with Jenkins",
        "Kubernetes cluster deployment",
        "Infrastructure as Code with Terraform",
        "Monitoring with Prometheus and Grafana",
        "Security scanning and compliance checks",
      ],
    },
    {
      title: "Board Game Review App",
      description:
        "Modern web application for board game reviews with user authentication, ratings, and community features. Containerized application with automated deployment pipeline.",
      tech: ["React", "Node.js", "MongoDB", "Docker", "GitHub Actions"],
      github: "https://github.com/mujemi26/BoardGame-review",
      image: "/placeholder.svg?height=200&width=400",
      features: [
        "User authentication and authorization",
        "Real-time reviews and ratings",
        "Responsive design for all devices",
        "Automated testing and deployment",
        "Database optimization and caching",
      ],
    },
    {
      title: "Literary Lens Book Review",
      description:
        "Book review platform with advanced search, recommendations, and social features for book enthusiasts. Built with modern web technologies and deployed using DevOps best practices.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS", "Vercel"],
      github: "https://github.com/mujemi26/LiteraryLens",
      image: "/placeholder.svg?height=200&width=400",
      features: [
        "Advanced search and filtering",
        "Personalized book recommendations",
        "Social features and user profiles",
        "Performance optimization",
        "SEO-friendly architecture",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Projects</h1>
          </div>
        </div>
      </nav>

      {/* Projects Content */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Technical Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my DevOps and development projects, demonstrating expertise in cloud infrastructure,
              automation, and modern development practices.
            </p>
          </motion.div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="p-8">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-base">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 space-y-6">
                        <div>
                          <h4 className="font-semibold mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {project.features.map((feature, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <Badge key={i} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <Github className="mr-2 h-4 w-4" />
                              View Code
                            </Button>
                          </a>
                          <Button variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
