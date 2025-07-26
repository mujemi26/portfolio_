"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
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
            <h1 className="text-xl font-bold">About Me</h1>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Muhammad Gamal</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <User className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-semibold">Professional Profile</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  As a proactive and solution-oriented Junior DevOps Engineer, I specialize in building and maintaining
                  robust CI/CD pipelines, implementing Infrastructure as Code, and leveraging cloud platforms like AWS
                  and Azure. My expertise spans across containerization technologies including Docker and Kubernetes,
                  automation tools like Ansible, and modern DevOps practices that ensure scalable, reliable, and
                  efficient systems.
                </p>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  I'm passionate about continuous learning and staying up-to-date with the latest technologies and best
                  practices in the DevOps ecosystem. My goal is to contribute to building systems that not only meet
                  current requirements but are also prepared for future scalability and growth.
                </p>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  My journey in technology began with a fascination for automation and system optimization. I believe
                  that the best DevOps practices not only improve technical efficiency but also enhance team
                  collaboration and product quality. I'm always eager to take on new challenges and contribute to
                  innovative projects that make a real impact.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
