import fs from 'fs'
import path from 'path'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
  image: string
  slug: string
}

// Function to calculate read time based on content length
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Function to extract frontmatter from markdown content
export function parseMarkdownFrontmatter(content: string): {
  frontmatter: Record<string, any>
  content: string
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      frontmatter: {},
      content: content
    }
  }
  
  const frontmatterStr = match[1]
  const contentStr = match[2]
  
  const frontmatter: Record<string, any> = {}
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      // Handle different data types
      if (value.startsWith('[') && value.endsWith(']')) {
        // Array
        frontmatter[key.trim()] = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
      } else if (value === 'true' || value === 'false') {
        // Boolean
        frontmatter[key.trim()] = value === 'true'
      } else if (!isNaN(Number(value))) {
        // Number
        frontmatter[key.trim()] = Number(value)
      } else {
        // String
        frontmatter[key.trim()] = value.replace(/"/g, '')
      }
    }
  })
  
  return {
    frontmatter,
    content: contentStr
  }
}

// Function to convert markdown content to HTML-like structure for rendering
export function processMarkdownContent(content: string): string {
  // This function processes markdown content for the blog renderer
  // You can extend this to handle more markdown features
  return content
}

// Function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  // For now, we'll keep the existing structure but make it more maintainable
  return [
    {
      id: "1",
      title: "Getting Started with Kubernetes: A DevOps Engineer's Guide",
      excerpt:
        "Learn the fundamentals of Kubernetes orchestration, from basic concepts to advanced deployment strategies. This comprehensive guide covers everything you need to know to start your Kubernetes journey.",
      content: `# Getting Started with Kubernetes: A DevOps Engineer's Guide

In today's cloud-native landscape, Kubernetes has emerged as the de facto standard for container orchestration. Whether you're a seasoned DevOps engineer or just beginning your journey into containerized applications, understanding Kubernetes is essential for modern infrastructure management.

## The Kubernetes Revolution

Imagine managing hundreds of containers across multiple servers manually—sounds like a nightmare, right? That's exactly the problem Kubernetes solves. Originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF), Kubernetes has revolutionized how we deploy, scale, and manage containerized applications.

## Why Kubernetes Matters

Before diving into the technical details, let's understand why Kubernetes has become so crucial:

- **Scalability**: Automatically scale your applications based on demand
- **Reliability**: Self-healing capabilities ensure your applications stay running
- **Portability**: Run the same application across different cloud providers
- **Resource Efficiency**: Optimize resource utilization across your infrastructure

## Understanding the Kubernetes Architecture

Think of Kubernetes as an orchestra conductor. Just as a conductor manages multiple musicians to create beautiful music, Kubernetes coordinates multiple containers to create a robust application.

### The Control Plane: Your Command Center

The control plane is the brain of your Kubernetes cluster, consisting of several key components:

- **API Server**: The front door to your cluster, handling all requests
- **etcd**: The cluster's memory, storing all configuration data
- **Scheduler**: The smart planner that decides where to run your containers
- **Controller Manager**: The automation engine that keeps everything in sync

### Worker Nodes: Where the Magic Happens

Worker nodes are where your applications actually run. Each node contains:

- **Kubelet**: The agent that manages containers on the node
- **Container Runtime**: The engine that runs your containers (like Docker)
- **Kube-proxy**: The network wizard that handles communication

## Your First Kubernetes Deployment

Let's start with a practical example. We'll deploy a simple web application to understand the basics.

### Step 1: Create Your First Pod

A Pod is the smallest deployable unit in Kubernetes. Think of it as a wrapper around one or more containers:

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-first-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
\`\`\`

### Step 2: Scale with Deployments

While Pods are great for learning, Deployments are what you'll use in production. They provide automatic scaling, rolling updates, and self-healing:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
\`\`\`

This deployment creates three nginx pods running in your cluster, automatically distributed across available nodes.

## Making Your Application Accessible

### Services: The Network Layer

Services provide stable networking for your applications. They act as load balancers and service discovery mechanisms:

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
\`\`\`

## Advanced Concepts

### ConfigMaps and Secrets

Manage configuration and sensitive data separately from your application code:

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost:5432/myapp"
  api_key: "your-api-key"
\`\`\`

### Persistent Volumes

Ensure your data survives pod restarts:

\`\`\`yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
\`\`\`

## Best Practices for Production

1. **Resource Limits**: Always set CPU and memory limits
2. **Health Checks**: Implement liveness and readiness probes
3. **Security**: Use RBAC and network policies
4. **Monitoring**: Set up proper logging and metrics collection
5. **Backup**: Implement regular backup strategies

## Conclusion

Kubernetes might seem complex at first, but with practice, it becomes an invaluable tool in your DevOps toolkit. Start with simple deployments and gradually explore more advanced features as your needs grow.

Remember, the Kubernetes community is vast and supportive. Don't hesitate to explore the official documentation and join community forums for help and guidance.`,
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
    {
      id: "7",
      title: "Introduction to Docker Containers",
      excerpt: "Learn the fundamentals of Docker containers and how they revolutionize application deployment and development workflows.",
      content: `# Introduction to Docker Containers

Docker has revolutionized the way we develop, ship, and run applications. In this comprehensive guide, we'll explore the fundamentals of Docker containers and how they can transform your development workflow.

## What are Docker Containers?

Docker containers are lightweight, standalone packages that include everything needed to run an application: code, runtime, system tools, libraries, and settings. Think of them as standardized units of software that can run anywhere Docker is installed.

### Key Benefits of Docker

- **Consistency**: "Works on my machine" becomes a thing of the past
- **Isolation**: Applications run in isolated environments
- **Portability**: Run the same container on any Docker-enabled system
- **Efficiency**: Lightweight compared to virtual machines
- **Version Control**: Easy to version and rollback applications

## Getting Started with Docker

### Installing Docker

First, let's install Docker on your system:

\`\`\`bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io

# For macOS
brew install docker

# For Windows
# Download Docker Desktop from docker.com
\`\`\`

### Your First Container

Let's start with a simple example - running a web server:

\`\`\`bash
# Pull and run an nginx container
docker run -d -p 8080:80 --name my-nginx nginx
\`\`\`

This command:
- \`-d\`: Runs the container in detached mode (background)
- \`-p 8080:80\`: Maps port 8080 on your host to port 80 in the container
- \`--name my-nginx\`: Gives the container a friendly name
- \`nginx\`: The image to run

### Creating Your First Dockerfile

A Dockerfile is a script that contains instructions to build a Docker image:

\`\`\`dockerfile
# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
\`\`\`

## Docker Compose for Multi-Container Applications

For applications with multiple services, Docker Compose is your friend:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Best Practices for Production

### 1. Use Multi-Stage Builds

Optimize your images with multi-stage builds:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 2. Security Considerations

Always run containers as non-root users:

\`\`\`dockerfile
# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Switch to non-root user
USER nextjs
\`\`\`

### 3. Resource Limits

Set resource limits to prevent containers from consuming too much:

\`\`\`yaml
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
\`\`\`

## Monitoring and Debugging

### Viewing Container Logs

\`\`\`bash
# View logs for a running container
docker logs my-nginx

# Follow logs in real-time
docker logs -f my-nginx
\`\`\`

### Inspecting Containers

\`\`\`bash
# Get detailed information about a container
docker inspect my-nginx

# Execute commands in a running container
docker exec -it my-nginx bash
\`\`\`

## Advanced Topics

### Docker Networks

Create custom networks for container communication:

\`\`\`bash
# Create a custom network
docker network create my-network

# Run containers on the network
docker run --network my-network --name app1 myapp
docker run --network my-network --name app2 myapp
\`\`\`

### Docker Volumes

Persist data across container restarts:

\`\`\`bash
# Create a named volume
docker volume create my-data

# Use the volume in a container
docker run -v my-data:/app/data myapp
\`\`\`

## Conclusion

Docker containers provide a powerful way to package and deploy applications. By following best practices and understanding the fundamentals, you can create reliable, scalable, and portable applications.

### Next Steps

1. **Practice**: Build and run your own containers
2. **Explore**: Learn about Docker Swarm and Kubernetes
3. **Optimize**: Focus on security and performance
4. **Automate**: Integrate Docker into your CI/CD pipeline

Remember, the best way to learn Docker is by doing. Start with simple containers and gradually work your way up to complex multi-service applications.

---

**Happy containerizing! 🐳**`,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-25",
      readTime: "4 min read",
      tags: ["Docker", "Containers", "DevOps", "Development"],
      image: "/images/docker.jpg",
      slug: "introduction-to-docker-containers",
    },
    {
      id: "8",
      title: "The Modern Guide to Ingress in Kubernetes",
      excerpt: "How traffic really enters your cluster, what breaks without it, and how to fix it fast.",
      content: `🚀  The Modern Guide to Ingress in Kubernetes  
How traffic really enters your cluster, what breaks without it, and how to fix it fast.

---

🔍  What is Ingress (and why should I care)?

*Ingress* is a Kubernetes object that **manages external access** to Services inside your cluster, typically HTTP(S).  
Think of it as a **Layer-7 router** that lives inside your cluster:

- Reads the Host header & URL path  
- Routes traffic to the right Service/Port  
- Optionally terminates TLS, rewrites URLs, adds headers, etc.

Without Ingress you have only **Services of type LoadBalancer or NodePort**, which are **layer-4** (TCP/UDP). That means:

- One external IP per Service → 💸 cloud provider charges sky-rocket  
- No path-based routing → \`example.com/app1\` and \`example.com/app2\` must be separate Services  
- No TLS termination → you roll your own certificates  
- No canary, blue/green, or A/B traffic splitting  
- No WAF, rate-limiting, or global rules in one place  

In short, **Ingress gives you a single, smart front door** for every workload in the cluster. 🚪✨

---

⚠️  Top Pain Points BEFORE you adopt Ingress

| Problem | Symptom | Impact |
|---|---|---|
| **IP sprawl** | 50 Services = 50 cloud load-balancers | \\\$100–\\\$300 / month each |
| **DNS hell** | Every Service needs its own DNS entry | Ops burnout |
| **No path routing** | \`example.com:30001\`, \`example.com:30002\` | Users hate you |
| **DIY TLS** | Secrets mounted by hand or cert-manager chaos | Expiry outages |
| **Zero observability** | Logs/metrics only at Service level | Hard to debug 502s |

---

🎉  Life AFTER Ingress (NGINX, Traefik, HAProxy, AWS ALB, GKE, Istio Gateway, etc.)

| Benefit | How it helps |
|---|---|
| **Single IP / DNS** | One \`A\` record for \`*.example.com\` |
| **Path & host routing** | \`example.com/api → api-svc\`, \`example.com/web → web-svc\` |
| **Automatic TLS** | cert-manager + Let's Encrypt = 🔐 auto-renewal |
| **Global rate-limits** | One ConfigMap, all workloads protected |
| **Canary / A/B** | Ingress-NGINX \`canary-weight: 20\` |
| **Cost savings** | 1 cloud LB instead of 50 → \\\$10,000+/yr saved |

---

🛠️  Quick-Start YAML (NGINX example)

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts: [demo.example.com]
    secretName: demo-tls
  rules:
  - host: demo.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-svc
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-svc
            port:
              number: 80
\`\`\`

Apply with \`kubectl apply -f demo-ingress.yaml\`, point DNS at the Ingress controller's external IP, and you're live. 🎊

---

🔎  Troubleshooting Playbook (the 80 % fixes)

| Symptom | Likely Cause | One-liner Fix |
|---|---|---|
| **404 from Ingress** | Wrong path/host | \`kubectl get ing -o yaml\` → check \`rules\` |
| **Certificate stuck** | cert-manager can't solve ACME | \`kubectl describe cert demo-tls\` → fix DNS-01 or HTTP-01 |
| **502 Bad Gateway** | Service selector mismatch | \`kubectl get endpoints api-svc\` → should list Pods |
| **Infinite redirect (http→https)** | \`ssl-redirect: "true"\` loop | Add \`nginx.ingress.kubernetes.io/ssl-redirect: "false"\` for health checks |
| **502 after scaling** | Pod readinessProbe fails | \`kubectl describe pod\` → fix readiness or startupProbe |
| **High 5xx rate** | Upstream timeout | \`nginx.ingress.kubernetes.io/proxy-read-timeout: "120"\` |
| **Wrong IngressClass** | Multiple controllers | Set \`spec.ingressClassName\` or annotation \`kubernetes.io/ingress.class\` |
| **CORS blocked** | Browser preflight fails | Add \`nginx.ingress.kubernetes.io/cors-allow-origin: "*"\` |

Pro-tip: \`kubectl plugin view-utilization\` + \`k9s\` or \`Lens\` gives you real-time metrics and logs.

---

🧪  Advanced Patterns (once you're comfortable)

- **Multiple controllers**: public vs. private, or split by team namespaces  
- **Istio Gateway + Ingress**: use Ingress for edge TLS, Istio for mesh routing  
- **External-DNS**: auto-create DNS records from Ingress resources  
- **OPA Gatekeeper**: policy to block Ingresses without TLS or correct labels  
- **Blue/Green via Argo Rollouts**: \`canary: stableService, canaryService\`

---

📝  TL;DR Cheat-Sheet

1. No Ingress → many IPs, no L7, DIY TLS → pain.  
2. Add Ingress controller + Ingress objects → one IP, L7 routing, auto-TLS → 💰 saved.  
3. 90 % of outages are: wrong Service selector, missing DNS, cert issuer broken.  
4. Use \`kubectl describe\`, logs, and metrics; fix annotations → problem solved.  

Happy routing!`,
      author: "Muhammad Gamal",
      publishedAt: "2025-01-25",
      readTime: "4 min read",
      tags: ["Ingress", "Nginx", "Kubernetes", "DevOps", "Development"],
      image: "/images/ingress.jpeg",
      slug: "the-modern-guide-to-ingress-in-kubernetes",
    },
  ]
}

// Function to get a specific blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

// Function to add a new blog post from markdown content
export function addBlogPostFromMarkdown(markdownContent: string, slug: string): BlogPost {
  const { frontmatter, content } = parseMarkdownFrontmatter(markdownContent)
  
  const blogPost: BlogPost = {
    id: frontmatter.id || Date.now().toString(),
    title: frontmatter.title || "Untitled Article",
    excerpt: frontmatter.excerpt || content.substring(0, 150) + "...",
    content: processMarkdownContent(content),
    author: frontmatter.author || "Muhammad Gamal",
    publishedAt: frontmatter.publishedAt || new Date().toISOString().split('T')[0],
    readTime: frontmatter.readTime || calculateReadTime(content),
    tags: frontmatter.tags || [],
    image: frontmatter.image || "/images/placeholder.jpg",
    slug: slug,
  }
  
  return blogPost
} 