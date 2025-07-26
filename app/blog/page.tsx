"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import { BlogCard } from "@/components/BlogCard"
import { useState, useMemo } from "react"
import { MobileOptimized } from "@/components/MobileOptimized"

const blogPosts = [
  {
    id: "1",
    title: "Getting Started with Kubernetes: A DevOps Engineer's Guide",
    excerpt:
      "Learn the fundamentals of Kubernetes orchestration, from basic concepts to advanced deployment strategies. This comprehensive guide covers everything you need to know to start your Kubernetes journey.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2024-01-20",
    readTime: "8 min read",
    tags: ["Kubernetes", "DevOps", "Containers", "Orchestration"],
    image: "/images/devops-start.png",
    slug: "getting-started-with-kubernetes",
  },
  {
    id: "2",
    title: "CI/CD Pipeline Best Practices with GitHub Actions",
    excerpt:
      "Discover how to build robust CI/CD pipelines using GitHub Actions. From basic workflows to advanced deployment strategies, learn how to automate your development process effectively.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2024-01-15",
    readTime: "6 min read",
    tags: ["CI/CD", "GitHub Actions", "Automation", "DevOps"],
    image: "/images/pipeline.png",
    slug: "cicd-pipeline-github-actions",
  },
  {
    id: "3",
    title: "Infrastructure as Code with Terraform: Complete Tutorial",
    excerpt:
      "Master Infrastructure as Code using Terraform. Learn how to provision and manage cloud resources declaratively across multiple cloud providers with practical examples.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["Terraform", "IaC", "AWS", "Cloud", "Infrastructure"],
    image: "/images/terraform.jpeg",
    slug: "infrastructure-as-code-terraform",
  },
  {
    id: "4",
    title: "Monitoring and Observability with Prometheus and Grafana",
    excerpt:
      "Build comprehensive monitoring solutions using Prometheus and Grafana. Learn how to collect metrics, create dashboards, and set up alerting for your applications.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    tags: ["Monitoring", "Prometheus", "Grafana", "Observability"],
    image: "/images/Grafana.png",
    slug: "monitoring-prometheus-grafana",
  },
  {
    id: "5",
    title: "Docker Best Practices for Production Environments",
    excerpt:
      "Learn essential Docker best practices for production deployments. From security considerations to performance optimization, ensure your containers are production-ready.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2024-01-01",
    readTime: "7 min read",
    tags: ["Docker", "Containers", "Production", "Security"],
    image: "/images/docker.jpg",
    slug: "docker-best-practices-production",
  },
  {
    id: "6",
    title: "GitOps with ArgoCD: Declarative Deployment Strategies",
    excerpt:
      "Implement GitOps workflows using ArgoCD for Kubernetes deployments. Learn how to achieve continuous delivery with declarative, version-controlled deployments.",
    content: "Full blog content here...",
    author: "Muhammad Gamal",
    publishedAt: "2023-12-28",
    readTime: "9 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "Deployment"],
    image: "/images/argocd.png",
    slug: "gitops-argocd-deployment",
  },
]

const categories = ["All", "Kubernetes", "CI/CD", "Terraform", "Monitoring", "Docker", "GitOps"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.tags.includes(selectedCategory)
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  return (
    <MobileOptimized className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold">DevOps Blog</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                DevOps Insights
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sharing knowledge, best practices, and real-world experiences in DevOps, cloud infrastructure, and
              automation
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  } transition-colors duration-200`}
                >
                  <Filter className="mr-1 h-3 w-3" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No articles found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Get the latest DevOps insights and tutorials delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MobileOptimized>
  )
}
