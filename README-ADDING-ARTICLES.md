# Adding New Articles to Your Blog

This guide explains how to add new articles to your blog using the new markdown-based system with automatic duplicate detection.

## 📝 How to Add a New Article

### Method 1: Using the Automated Script (Recommended)

1. **Create your markdown file** with the proper frontmatter format
2. **Run the script** to automatically add it to your blog
3. **The script will check for duplicates** and prevent conflicts
4. **Your article is ready!**

### Method 2: Manual Addition

1. **Create your markdown file** with frontmatter
2. **Add the article data** to `lib/blog-utils.ts`
3. **Test your article**

## 📋 Step-by-Step Guide

### Step 1: Create Your Markdown File

Create a new `.md` file in the `content/` directory (or anywhere you prefer). Use this template:

```markdown
---
title: "Your Article Title Here"
excerpt: "A brief description of your article that will appear in the blog listing and social media shares."
author: "Muhammad Gamal"
publishedAt: "2024-01-25"
tags: ["DevOps", "Cloud", "Technology"]
image: "/images/your-image.jpg"
---

# Your Article Title Here

Your article content starts here. You can use standard markdown formatting:

## Headers

You can use different levels of headers with `#`, `##`, `###`, etc.

## Lists

### Unordered Lists
- Item 1
- Item 2
- Item 3

### Ordered Lists
1. First step
2. Second step
3. Third step

## Code Blocks

You can include code blocks with syntax highlighting:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
```

```bash
kubectl apply -f pod.yaml
```

## Links and Images

You can include [links](https://example.com) and images:

![Alt text](/images/example.png)

## Emphasis

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- `Inline code` for technical terms

## Blockquotes

> This is a blockquote. Use it for important notes or quotes.

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

## Conclusion

End your article with a conclusion that summarizes the key points and provides next steps for readers.
```

### Step 2: Add Your Article

#### Option A: Using the Automated Script

1. **Run the script** with your markdown file:

```bash
node scripts/add-article.js content/your-article.md
```

2. **The script will automatically**:
   - Parse your markdown file
   - Extract frontmatter and content
   - Calculate read time
   - Generate a slug (if not provided)
   - **Check for existing duplicates** (prevents conflicts)
   - Add the article to `lib/blog-utils.ts`
   - Show you the article details

3. **Your article is now live!** Visit `/blog/your-article-slug` to see it.

**Note**: If you try to add an article with a slug that already exists, the script will show an error and prevent the duplicate from being added.

#### Option B: Manual Addition

1. **Copy your article data** and add it to the `getAllBlogPosts()` function in `lib/blog-utils.ts`

2. **Follow this format**:

```typescript
{
  id: "unique-id",
  title: "Your Article Title",
  excerpt: "Your article excerpt",
  content: `Your full article content here...`,
  author: "Muhammad Gamal",
  publishedAt: "2024-01-25",
  readTime: "5 min read",
  tags: ["DevOps", "Cloud"],
  image: "/images/your-image.jpg",
  slug: "your-article-slug",
},
```

## 📋 Frontmatter Options

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Article title | `"Getting Started with Kubernetes"` |
| `excerpt` | ❌ | Brief description | `"Learn Kubernetes basics..."` |
| `author` | ❌ | Author name (defaults to "Muhammad Gamal") | `"Muhammad Gamal"` |
| `publishedAt` | ❌ | Publication date (defaults to today, supports future dates) | `"2025-01-25"` |
| `tags` | ❌ | Array of tags | `["DevOps", "Kubernetes"]` |
| `image` | ❌ | Featured image path | `"/images/kubernetes.png"` |
| `slug` | ❌ | URL slug (auto-generated from title) | `"getting-started-kubernetes"` |

## 🎨 Supported Markdown Features

### Text Formatting
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- `Inline code` with backticks
- [Links](url) with `[text](url)`

### Headers
- `# H1 Header`
- `## H2 Header`
- `### H3 Header`
- `#### H4 Header`

### Lists
- Unordered: `- Item` or `* Item`
- Ordered: `1. Item`

### Code Blocks
- Fenced code blocks with language specification:
  ````markdown
  ```yaml
  apiVersion: v1
  kind: Pod
  ```
  ````

### Images
- `![Alt text](/path/to/image.jpg)`

### Blockquotes
- `> Quote text`

## 🚀 Quick Start Example

1. **Create your article file**:

```bash
# Create the content directory if it doesn't exist
mkdir -p content

# Create your article
touch content/my-new-article.md
```

2. **Add your content** to `content/my-new-article.md` using the template above

3. **Run the script**:

```bash
node scripts/add-article.js content/my-new-article.md
```

4. **The script will**:
   - Show article details
   - Check for duplicates
   - Add the article if unique
   - Display success message

5. **View your article** at `http://localhost:3000/blog/your-article-slug`

**Example output**:
```
📖 Reading markdown file: content/my-new-article.md
📝 Article details:
  Title: My New Article
  Slug: my-new-article
  Author: Muhammad Gamal
  Published: 2025-01-25
  Read time: 5 min read
  Tags: DevOps, Cloud
✅ Updated lib/blog-utils.ts with new article
🎉 Article added successfully!
📄 You can now view your article at: /blog/my-new-article
```

## 🔧 Troubleshooting

### Common Issues

1. **"File not found" error**
   - Make sure your markdown file exists and the path is correct

2. **"Title is required" error**
   - Ensure your markdown file has frontmatter with a `title` field

3. **Article not showing up**
   - Check that the script ran successfully
   - Verify the article was added to `lib/blog-utils.ts`
   - Restart your development server

4. **"Article with slug already exists" error**
   - The script detected a duplicate slug
   - Either use a different title (which generates a different slug)
   - Or add a custom `slug` in your frontmatter to avoid conflicts
   - Example: `slug: "my-custom-unique-slug"`

5. **Date format issues**
   - Ensure dates are in `YYYY-MM-DD` format (e.g., `"2025-01-25"`)
   - Future dates are supported

### Manual Slug Generation

If you want to specify a custom slug, add it to your frontmatter:

```markdown
---
title: "My Article Title"
slug: "my-custom-slug"
---
```

## 📁 File Structure

```
your-blog/
├── content/                    # Your markdown files
│   ├── article-1.md
│   ├── article-2.md
│   └── ...
├── lib/
│   └── blog-utils.ts          # Blog data management
├── scripts/
│   └── add-article.js         # Automated article addition
└── app/blog/
    ├── page.tsx               # Blog listing page
    └── [slug]/
        └── page.tsx           # Individual article page
```

## 🎯 Best Practices

1. **Use descriptive titles** that clearly indicate the article content
2. **Write compelling excerpts** that encourage readers to click
3. **Add relevant tags** to help with categorization and search
4. **Include a featured image** for better visual appeal
5. **Use proper markdown formatting** for better readability
6. **Test your article** before publishing

## 🔄 Updating Existing Articles

To update an existing article:

1. **Edit the content** in `lib/blog-utils.ts`
2. **Or** update your markdown file and re-run the script
3. **Restart your development server** to see changes

**Note**: If you want to replace an existing article, you'll need to manually remove the old one from `lib/blog-utils.ts` first, or use a different slug for the new version.

## 📊 Article Management

The system automatically:
- ✅ Calculates read time based on content length
- ✅ Generates SEO-friendly slugs from titles
- ✅ **Prevents duplicate articles** with automatic conflict detection
- ✅ Supports future publication dates
- ✅ Provides share functionality
- ✅ Supports dark mode
- ✅ Is mobile-responsive
- ✅ Includes social media sharing

Your articles will appear in:
- Blog listing page (`/blog`)
- Individual article pages (`/blog/[slug]`)
- Search results
- Category filters
- Related articles section

---

**Happy blogging! 🚀** 