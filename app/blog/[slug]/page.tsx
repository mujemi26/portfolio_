"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react"
import Link from "next/link"
import { LazyImage } from "@/components/LazyImage"
import { MobileOptimized } from "@/components/MobileOptimized"
import { SharePopup } from "@/components/SharePopup"
import { useState } from "react"
import { getBlogPostBySlug } from "@/lib/blog-utils"

// This would typically come from a CMS or API
const getBlogPost = (slug: string) => {
  return getBlogPostBySlug(slug)
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isShareOpen, setIsShareOpen] = useState(false)
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <MobileOptimized className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Blog</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsShareOpen(true)}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Share</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pt-20">
        <header className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <Badge key={i} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>DevOps Guide</span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <LazyImage
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</div>

              {/* Render content from post.content */}
              <div className="space-y-6">
                {(() => {
                  const content = post.content;
                  const lines = content.split('\n');
                  const elements = [];
                  let inCodeBlock = false;
                  let codeBlockContent = [];
                  let codeBlockLanguage = '';
                  
                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    
                    // Handle code blocks
                    if (line.startsWith('```')) {
                      if (!inCodeBlock) {
                        // Start of code block
                        inCodeBlock = true;
                        codeBlockLanguage = line.slice(3).trim();
                        codeBlockContent = [];
                      } else {
                        // End of code block
                        inCodeBlock = false;
                        elements.push(
                          <pre key={`code-${i}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code className={`language-${codeBlockLanguage}`}>
                              {codeBlockContent.join('\n')}
                            </code>
                          </pre>
                        );
                      }
                    } else if (inCodeBlock) {
                      codeBlockContent.push(line);
                    } else {
                      // Handle regular markdown
                      if (line.startsWith('# ')) {
                        elements.push(
                          <h1 key={`h1-${i}`} className="text-3xl font-bold mb-4 mt-8">
                            {line.slice(2)}
                          </h1>
                        );
                      } else if (line.startsWith('## ')) {
                        elements.push(
                          <h2 key={`h2-${i}`} className="text-2xl font-bold mb-3 mt-6">
                            {line.slice(3)}
                          </h2>
                        );
                      } else if (line.startsWith('### ')) {
                        elements.push(
                          <h3 key={`h3-${i}`} className="text-xl font-bold mb-2 mt-4">
                            {line.slice(4)}
                          </h3>
                        );
                      } else if (line.startsWith('#### ')) {
                        elements.push(
                          <h4 key={`h4-${i}`} className="text-lg font-bold mb-2 mt-4">
                            {line.slice(5)}
                          </h4>
                        );
                      } else if (line.startsWith('- ') || line.startsWith('* ')) {
                        elements.push(
                          <li key={`li-${i}`} className="ml-6 mb-1">
                            {line.slice(2)}
                          </li>
                        );
                      } else if (line.match(/^\d+\. /)) {
                        elements.push(
                          <li key={`li-${i}`} className="ml-6 mb-1">
                            {line.replace(/^\d+\. /, '')}
                          </li>
                        );
                      } else if (line.trim() === '') {
                        elements.push(<br key={`br-${i}`} />);
                      } else {
                        elements.push(
                          <p key={`p-${i}`} className="mb-4 leading-relaxed">
                            {line}
                          </p>
                        );
                      }
                    }
                  }
                  
                  return elements;
                })()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/cicd-pipeline-github-actions">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <h4 className="font-semibold mb-2">CI/CD Pipeline Best Practices with GitHub Actions</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">6 min read</p>
                </motion.div>
              </Link>
              <Link href="/blog/infrastructure-as-code-terraform">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <h4 className="font-semibold mb-2">Infrastructure as Code with Terraform</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">12 min read</p>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>
      </article>
      
      {/* Share Popup */}
      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={post.title}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        excerpt={post.excerpt}
      />
    </MobileOptimized>
  )
} 