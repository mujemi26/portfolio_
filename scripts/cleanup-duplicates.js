#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function cleanupDuplicates() {
  const blogUtilsPath = path.join(__dirname, '../lib/blog-utils.ts')
  let content = fs.readFileSync(blogUtilsPath, 'utf8')
  
  // Find all slugs in the file
  const slugRegex = /slug: "([^"]+)"/g
  const slugs = []
  let match
  
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push({
      slug: match[1],
      index: match.index
    })
  }
  
  // Find duplicates
  const slugCounts = {}
  slugs.forEach(item => {
    slugCounts[item.slug] = (slugCounts[item.slug] || 0) + 1
  })
  
  const duplicates = Object.keys(slugCounts).filter(slug => slugCounts[slug] > 1)
  
  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!')
    return
  }
  
  console.log('🔍 Found duplicate slugs:')
  duplicates.forEach(slug => {
    console.log(`   - "${slug}" (${slugCounts[slug]} times)`)
  })
  
  // For each duplicate, keep only the first occurrence
  duplicates.forEach(slug => {
    const slugMatches = slugs.filter(item => item.slug === slug)
    
    // Keep the first one, remove the rest
    for (let i = 1; i < slugMatches.length; i++) {
      const duplicateIndex = slugMatches[i].index
      
      // Find the start of this article object
      let startIndex = duplicateIndex
      let braceCount = 0
      let inString = false
      let escapeNext = false
      
      // Go backwards to find the start of the object
      for (let j = duplicateIndex; j >= 0; j--) {
        const char = content[j]
        
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
          if (char === '}') {
            braceCount++
          } else if (char === '{') {
            braceCount--
            if (braceCount === 0) {
              startIndex = j
              break
            }
          }
        }
      }
      
      // Find the end of this article object
      let endIndex = startIndex
      braceCount = 0
      inString = false
      escapeNext = false
      
      for (let j = startIndex; j < content.length; j++) {
        const char = content[j]
        
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
          if (char === '{') {
            braceCount++
          } else if (char === '}') {
            braceCount--
            if (braceCount === 0) {
              endIndex = j + 1
              break
            }
          }
        }
      }
      
      // Remove the duplicate article
      const before = content.substring(0, startIndex)
      const after = content.substring(endIndex)
      
      // Remove trailing comma if it exists
      const beforeTrimmed = before.replace(/,\s*$/, '')
      const afterTrimmed = after.replace(/^\s*,/, '')
      
      content = beforeTrimmed + afterTrimmed
    }
  })
  
  // Write the cleaned content back
  fs.writeFileSync(blogUtilsPath, content)
  console.log('✅ Duplicates removed successfully!')
}

cleanupDuplicates() 