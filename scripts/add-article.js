#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Simple function to check for existing slugs
function checkForExistingSlug(slug) {
  const blogUtilsPath = path.join(__dirname, '../lib/blog-utils.ts')
  const content = fs.readFileSync(blogUtilsPath, 'utf8')
  
  // Count how many times this slug appears in the file
  const slugRegex = new RegExp(`slug: "${slug}"`, 'g')
  const matches = content.match(slugRegex)
  
  return matches ? matches.length : 0
}

// Function to read markdown file and extract frontmatter
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  
  // More flexible regex to handle different line endings and spacing
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    // Try alternative regex patterns
    const altRegex1 = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const altRegex2 = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
    
    const match1 = content.match(altRegex1)
    const match2 = content.match(altRegex2)
    
    if (!match1 && !match2) {
      console.error('Content preview:')
      console.error(content.substring(0, 200) + '...')
      throw new Error('Invalid markdown file format. Must include frontmatter between --- markers.')
    }
    
    const finalMatch = match1 || match2
    const frontmatterStr = finalMatch[1]
    const contentStr = finalMatch[2]
    
    const frontmatter = {}
    frontmatterStr.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const colonIndex = trimmedLine.indexOf(':')
        if (colonIndex > 0) {
          const key = trimmedLine.substring(0, colonIndex).trim()
          const value = trimmedLine.substring(colonIndex + 1).trim()
          
          // Handle different data types
          if (value.startsWith('[') && value.endsWith(']')) {
            // Array
            frontmatter[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
          } else if (value === 'true' || value === 'false') {
            // Boolean
            frontmatter[key] = value === 'true'
          } else if (!isNaN(Number(value))) {
            // Number
            frontmatter[key] = Number(value)
          } else {
            // String - remove quotes if present
            frontmatter[key] = value.replace(/^["']|["']$/g, '')
          }
        }
      }
    })
    
    return {
      frontmatter,
      content: contentStr
    }
  }
  
  const frontmatterStr = match[1]
  const contentStr = match[2]
  
  const frontmatter = {}
  frontmatterStr.split('\n').forEach(line => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const colonIndex = trimmedLine.indexOf(':')
      if (colonIndex > 0) {
        const key = trimmedLine.substring(0, colonIndex).trim()
        const value = trimmedLine.substring(colonIndex + 1).trim()
        
        // Handle different data types
        if (value.startsWith('[') && value.endsWith(']')) {
          // Array
          frontmatter[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
        } else if (value === 'true' || value === 'false') {
          // Boolean
          frontmatter[key] = value === 'true'
        } else if (!isNaN(Number(value))) {
          // Number
          frontmatter[key] = Number(value)
        } else {
          // String - remove quotes if present
          frontmatter[key] = value.replace(/^["']|["']$/g, '')
        }
      }
    }
  })
  
  return {
    frontmatter,
    content: contentStr
  }
}

// Function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

// Function to update the blog-utils.ts file
function updateBlogUtils(newPost) {
  const blogUtilsPath = path.join(__dirname, '../lib/blog-utils.ts')
  let content = fs.readFileSync(blogUtilsPath, 'utf8')
  
  // Find the getAllBlogPosts function and the return statement
  const functionStart = content.indexOf('export function getAllBlogPosts(): BlogPost[] {')
  if (functionStart === -1) {
    throw new Error('Could not find getAllBlogPosts function in blog-utils.ts')
  }
  
  // Find the return statement
  const returnStart = content.indexOf('return [', functionStart)
  if (returnStart === -1) {
    throw new Error('Could not find return statement in getAllBlogPosts function')
  }
  
  // Find the end of the array (the closing bracket)
  let bracketCount = 0
  let arrayEnd = returnStart + 8 // Skip "return ["
  let inString = false
  let escapeNext = false
  
  for (let i = returnStart + 8; i < content.length; i++) {
    const char = content[i]
    
    if (escapeNext) {
      escapeNext = false
      continue
    }
    
    if (char === '\\') {
      escapeNext = true
      continue
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString
      continue
    }
    
    if (!inString) {
      if (char === '[') {
        bracketCount++
      } else if (char === ']') {
        bracketCount--
        if (bracketCount === 0) {
          arrayEnd = i
          break
        }
      }
    }
  }
  
  // Extract the existing posts array content
  const existingPostsContent = content.substring(returnStart + 8, arrayEnd)
  
  // Create new post object
  const escapedContent = newPost.content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
  
  const newPostStr = `    {
      id: "${newPost.id}",
      title: "${newPost.title}",
      excerpt: "${newPost.excerpt}",
      content: \`${escapedContent}\`,
      author: "${newPost.author}",
      publishedAt: "${newPost.publishedAt}",
      readTime: "${newPost.readTime}",
      tags: ${JSON.stringify(newPost.tags)},
      image: "${newPost.image}",
      slug: "${newPost.slug}",
    },`
  
  // Insert new post at the beginning of the array
  const updatedPostsContent = newPostStr + '\n' + existingPostsContent
  
  // Replace the posts array
  const updatedContent = content.substring(0, returnStart + 8) + updatedPostsContent + content.substring(arrayEnd)
  
  fs.writeFileSync(blogUtilsPath, updatedContent)
  console.log('✅ Updated lib/blog-utils.ts with new article')
}

// Main function
function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: node add-article.js <path-to-markdown-file>')
    console.log('Example: node add-article.js content/my-new-article.md')
    process.exit(1)
  }
  
  const markdownPath = args[0]
  
  if (!fs.existsSync(markdownPath)) {
    console.error(`❌ File not found: ${markdownPath}`)
    process.exit(1)
  }
  
  try {
    console.log(`📖 Reading markdown file: ${markdownPath}`)
    const { frontmatter, content } = parseMarkdownFile(markdownPath)
    
    // Validate required fields
    if (!frontmatter.title) {
      throw new Error('Title is required in frontmatter')
    }
    
    // Generate slug if not provided
    const slug = frontmatter.slug || generateSlug(frontmatter.title)
    
    // Check for existing article with same slug
    const existingCount = checkForExistingSlug(slug)
    
    if (existingCount > 0) {
      console.log(`⚠️  Article with slug "${slug}" already exists!`)
      console.log(`   Found ${existingCount} existing article(s) with this slug.`)
      console.log(`   Please use a different slug or update the existing article manually.`)
      throw new Error(`Article with slug "${slug}" already exists. Use a different slug or update the existing article manually.`)
    }
    
    // Create blog post object
    const blogPost = {
      id: frontmatter.id || Date.now().toString(),
      title: frontmatter.title,
      excerpt: frontmatter.excerpt || content.substring(0, 150) + "...",
      content: content,
      author: frontmatter.author || "Muhammad Gamal",
      publishedAt: frontmatter.publishedAt || new Date().toISOString().split('T')[0],
      readTime: frontmatter.readTime || calculateReadTime(content),
      tags: frontmatter.tags || [],
      image: frontmatter.image || "/images/placeholder.jpg",
      slug: slug,
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(blogPost.publishedAt)) {
      throw new Error('Published date must be in YYYY-MM-DD format (e.g., "2025-01-25")')
    }
    
    console.log('📝 Article details:')
    console.log(`  Title: ${blogPost.title}`)
    console.log(`  Slug: ${blogPost.slug}`)
    console.log(`  Author: ${blogPost.author}`)
    console.log(`  Published: ${blogPost.publishedAt}`)
    console.log(`  Read time: ${blogPost.readTime}`)
    console.log(`  Tags: ${blogPost.tags.join(', ')}`)
    
    // Update the blog-utils.ts file
    updateBlogUtils(blogPost)
    
    console.log('🎉 Article added successfully!')
    console.log(`📄 You can now view your article at: /blog/${blogPost.slug}`)
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    process.exit(1)
  }
}

main() 