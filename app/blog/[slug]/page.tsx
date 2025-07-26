"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react"
import Link from "next/link"
import { LazyImage } from "@/components/LazyImage"
import { MobileOptimized } from "@/components/MobileOptimized"

// This would typically come from a CMS or API
const getBlogPost = (slug: string) => {
  const posts = {
    "getting-started-with-kubernetes": {
      id: "1",
      title: "Getting Started with Kubernetes: A DevOps Engineer's Guide",
      excerpt:
        "Learn the fundamentals of Kubernetes orchestration, from basic concepts to advanced deployment strategies.",
      content: `
# Getting Started with Kubernetes: A DevOps Engineer's Guide

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

Pods come and go, but your users need a stable way to access your application. That's where Services come in:

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
  type: ClusterIP
\`\`\`

### Ingress: The Gateway to Your Application

For external access, you'll want to set up an Ingress:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
\`\`\`

## Best Practices for Production

### 1. Resource Management: The Foundation of Stability

Always set resource requests and limits to prevent resource contention:

\`\`\`yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
\`\`\`

### 2. Health Checks: Your Application's Vital Signs

Implement liveness and readiness probes to ensure your application is truly healthy:

\`\`\`yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

### 3. Security: Protecting Your Applications

Use RBAC (Role-Based Access Control) to implement the principle of least privilege:

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
\`\`\`

### 4. Monitoring: Keeping Your Finger on the Pulse

Set up comprehensive monitoring and logging to understand your application's behavior:

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: monitoring-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
\`\`\`

## Advanced Concepts

### ConfigMaps and Secrets: Managing Configuration

Keep your configuration separate from your code:

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgresql://db:5432/myapp"
  LOG_LEVEL: "info"
\`\`\`

### Persistent Volumes: Data That Survives

For applications that need persistent storage:

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

## Troubleshooting Common Issues

### Pod Stuck in Pending State

This usually means the scheduler can't find a suitable node:

\`\`\`bash
# Check node resources
kubectl describe nodes

# Check pod events
kubectl describe pod <pod-name>
\`\`\`

### Application Not Responding

Verify your service configuration:

\`\`\`bash
# Check service endpoints
kubectl get endpoints <service-name>

# Test connectivity
kubectl run test-pod --image=busybox --rm -it -- wget -O- <service-name>
\`\`\`

## The Road Ahead

Kubernetes is a powerful tool that requires time and practice to master. Start with these fundamentals and gradually explore more advanced topics like:

- **Helm Charts**: Package and deploy complex applications
- **Operators**: Extend Kubernetes with custom controllers
- **Service Mesh**: Advanced networking and security
- **Multi-cluster Management**: Coordinating multiple Kubernetes clusters

## Conclusion

Kubernetes represents a paradigm shift in how we think about application deployment and management. While the learning curve can be steep, the benefits—scalability, reliability, and operational efficiency—make it worth the investment.

Remember, every expert was once a beginner. Start small, experiment often, and don't be afraid to make mistakes. The Kubernetes community is vast and supportive, with excellent documentation and resources available.

As you continue your Kubernetes journey, focus on understanding the "why" behind each concept, not just the "how." This deeper understanding will serve you well as you tackle more complex scenarios and help others on their own Kubernetes adventures.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-20",
      readTime: "8 min read",
      tags: ["Kubernetes", "DevOps", "Containers", "Orchestration"],
      image: "/placeholder.svg?height=400&width=800&text=Kubernetes+Guide",
      slug: "getting-started-with-kubernetes",
    },
    "cicd-pipeline-github-actions": {
      id: "2",
      title: "CI/CD Pipeline Best Practices with GitHub Actions",
      excerpt:
        "Discover how to build robust CI/CD pipelines using GitHub Actions. From basic workflows to advanced deployment strategies, learn how to automate your development process effectively.",
      content: `
# CI/CD Pipeline Best Practices with GitHub Actions

In the fast-paced world of software development, the ability to deliver code quickly and reliably is paramount. Continuous Integration and Continuous Deployment (CI/CD) have become the backbone of modern development practices, and GitHub Actions has emerged as a powerful platform to implement these workflows.

## The CI/CD Revolution

Gone are the days of manual deployments and "works on my machine" excuses. CI/CD has transformed how we build, test, and deploy software. GitHub Actions, with its seamless integration into the development workflow, has made implementing CI/CD more accessible than ever.

## Understanding CI/CD Fundamentals

Before we dive into the technical implementation, let's understand what CI/CD really means:

### Continuous Integration (CI)
Think of CI as your code's first line of defense. Every time you push code, it automatically gets built and tested. This catches issues early, before they become expensive problems.

### Continuous Deployment (CD)
CD takes the tested code and automatically deploys it to production. This reduces human error and enables rapid iteration.

## Why GitHub Actions?

GitHub Actions offers several compelling advantages that make it the go-to choice for many teams:

- **Native Integration**: Built directly into GitHub, eliminating the need for external tools
- **YAML-based Configuration**: Simple, declarative syntax that's easy to understand and version control
- **Extensive Marketplace**: Thousands of pre-built actions for common tasks
- **Cost-effective**: Free for public repositories and generous limits for private ones
- **Multi-platform Support**: Run workflows on Windows, macOS, and Linux

## Building Your First Workflow

Let's start with a practical example that demonstrates the power of GitHub Actions.

### Basic CI Workflow

Here's a comprehensive CI workflow for a Node.js application:

\`\`\`yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Run security audit
      run: npm audit --audit-level moderate
\`\`\`

This workflow automatically runs on every push to main/develop branches and every pull request, ensuring code quality across your entire development process.

## Advanced Workflow Features

### Caching Dependencies: Speed Up Your Builds

One of the biggest performance killers in CI is downloading dependencies repeatedly. GitHub Actions makes caching simple:

\`\`\`yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-
\`\`\`

### Environment-Specific Deployments

Different environments require different configurations. Here's how to handle this:

\`\`\`yaml
deploy:
  runs-on: ubuntu-latest
  needs: test
  if: github.ref == 'refs/heads/main'
  
  steps:
  - name: Deploy to production
    run: echo "Deploying to production"
    env:
      AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

## Security Best Practices

### 1. Secrets Management: Protecting Sensitive Data

Never hardcode sensitive information in your workflows:

\`\`\`yaml
- name: Deploy with secrets
  run: deploy.sh
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}
    API_KEY: \${{ secrets.API_KEY }}
\`\`\`

### 2. Branch Protection: Your Safety Net

Configure branch protection rules in GitHub:
- Require pull request reviews
- Require status checks to pass
- Restrict direct pushes to main branch

### 3. Minimal Permissions: The Principle of Least Privilege

Limit the permissions your workflow needs:

\`\`\`yaml
permissions:
  contents: read
  pull-requests: write
\`\`\`

## Performance Optimization Strategies

### 1. Parallel Jobs: Divide and Conquer

Run independent tasks in parallel to speed up your pipeline:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
  
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint
  
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - run: npm audit
\`\`\`

### 2. Conditional Steps: Smart Automation

Only run steps when necessary:

\`\`\`yaml
- name: Build Docker image
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: docker build -t myapp .
\`\`\`

## Monitoring and Debugging

### 1. Status Badges: Visual Feedback

Display workflow status in your README for immediate visibility:

\`\`\`markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
\`\`\`

### 2. Debug Actions: Troubleshooting Made Easy

Enable debug logging when things go wrong:

\`\`\`yaml
- name: Debug info
  run: |
    echo "Repository: \${{ github.repository }}"
    echo "Branch: \${{ github.ref }}"
    echo "Event: \${{ github.event_name }}"
\`\`\`

## Common Pitfalls and How to Avoid Them

### 1. The "Works on My Machine" Trap

**Problem**: Tests pass locally but fail in CI
**Solution**: Use the same environment in CI as production

\`\`\`yaml
- name: Use specific Node.js version
  uses: actions/setup-node@v4
  with:
    node-version: '18.17.0'  # Exact version
\`\`\`

### 2. Flaky Tests: The Silent Killer

**Problem**: Tests that pass sometimes and fail others
**Solution**: Implement retry logic and better test isolation

\`\`\`yaml
- name: Run tests with retry
  run: |
    for i in {1..3}; do
      npm test && break
      echo "Test attempt \$i failed, retrying..."
      sleep 5
    done
\`\`\`

### 3. Long Build Times: The Productivity Killer

**Problem**: Builds take too long, slowing down development
**Solution**: Optimize with caching and parallel jobs

## Advanced Deployment Strategies

### Blue-Green Deployments

Minimize downtime with blue-green deployments:

\`\`\`yaml
- name: Blue-green deployment
  run: |
    # Deploy to blue environment
    kubectl apply -f k8s/blue/
    
    # Run health checks
    ./health-check.sh blue
    
    # Switch traffic to blue
    kubectl apply -f k8s/switch-to-blue/
    
    # Clean up green environment
    kubectl delete -f k8s/green/
\`\`\`

### Canary Deployments

Gradually roll out changes to minimize risk:

\`\`\`yaml
- name: Canary deployment
  run: |
    # Deploy to 10% of traffic
    kubectl apply -f k8s/canary-10/
    
    # Monitor metrics
    sleep 300
    
    # If healthy, increase to 50%
    kubectl apply -f k8s/canary-50/
    
    # Monitor again
    sleep 300
    
    # Full rollout
    kubectl apply -f k8s/full-deployment/
\`\`\`

## Integration with External Tools

### Slack Notifications

Keep your team informed:

\`\`\`yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: \${{ job.status }}
    channel: '#deployments'
    webhook_url: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

### Jira Integration

Update tickets automatically:

\`\`\`yaml
- name: Update Jira
  run: |
    curl -X POST \\
      -H "Authorization: Bearer \${{ secrets.JIRA_TOKEN }}" \\
      -H "Content-Type: application/json" \\
      -d '{"fields":{"status":{"name":"In Progress"}}}' \\
      https://your-domain.atlassian.net/rest/api/2/issue/ISSUE-123
\`\`\`

## Conclusion

GitHub Actions has democratized CI/CD, making it accessible to teams of all sizes. By following these best practices and learning from common pitfalls, you can build robust, efficient, and secure deployment pipelines.

Remember, CI/CD is not just about automation—it's about creating a culture of continuous improvement. Start simple, iterate often, and always prioritize reliability over speed. The investment in proper CI/CD practices will pay dividends in reduced bugs, faster deployments, and happier developers.

As you continue your CI/CD journey, focus on metrics that matter: deployment frequency, lead time, mean time to recovery, and change failure rate. These will guide your improvements and help you build truly world-class deployment pipelines.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-15",
      readTime: "6 min read",
      tags: ["CI/CD", "GitHub Actions", "Automation", "DevOps"],
      image: "/images/pipeline.png",
      slug: "cicd-pipeline-github-actions",
    },
    "infrastructure-as-code-terraform": {
      id: "3",
      title: "Infrastructure as Code with Terraform: Complete Tutorial",
      excerpt:
        "Master Infrastructure as Code using Terraform. Learn how to provision and manage cloud resources declaratively across multiple cloud providers with practical examples.",
      content: `
# Infrastructure as Code with Terraform: Complete Tutorial

In the ever-evolving landscape of cloud computing, managing infrastructure has transformed from a manual, error-prone process into a sophisticated, automated discipline. Infrastructure as Code (IaC) represents this paradigm shift, and Terraform stands at the forefront of this revolution.

## The Infrastructure as Code Revolution

Remember the days when provisioning servers meant clicking through web consoles, manually configuring each component, and praying that your documentation was accurate? Those days are over. Infrastructure as Code has fundamentally changed how we think about infrastructure management.

Terraform, developed by HashiCorp, has become the gold standard for IaC, enabling teams to treat infrastructure like software—version-controlled, tested, and deployed with confidence.

## Why Infrastructure as Code Matters

Before diving into the technical implementation, let's understand the transformative impact of IaC:

### The Traditional Problem
- **Manual Configuration**: Error-prone and time-consuming
- **Inconsistent Environments**: "Works on my machine" becomes "works in my environment"
- **Poor Documentation**: Outdated runbooks and forgotten configurations
- **Slow Recovery**: Rebuilding infrastructure takes hours or days

### The IaC Solution
- **Automated Provisioning**: Infrastructure defined in code, deployed automatically
- **Consistent Environments**: Identical infrastructure across development, staging, and production
- **Version Control**: Every change tracked, reviewed, and auditable
- **Rapid Recovery**: Infrastructure rebuilt in minutes, not hours

## Why Choose Terraform?

Terraform offers several compelling advantages that make it the preferred choice for infrastructure automation:

- **Multi-Cloud Support**: Write once, deploy anywhere—AWS, Azure, GCP, and beyond
- **Declarative Syntax**: Define what you want, not how to get it
- **State Management**: Intelligent tracking of infrastructure state and changes
- **Version Control Integration**: Seamless integration with Git workflows
- **Extensive Provider Ecosystem**: Support for hundreds of cloud services and tools

## Getting Started with Terraform

### Installation: Your First Step

Getting Terraform up and running is straightforward. Here's how to install it on your system:

\`\`\`bash
# macOS (using Homebrew)
brew install terraform

# Ubuntu/Debian
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# Windows (using Chocolatey)
choco install terraform
\`\`\`

### Your First Terraform Configuration

Let's create your first Terraform configuration. This simple example will help you understand the basic concepts:

\`\`\`hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "WebServer"
    Environment = "development"
  }
}
\`\`\`

This configuration creates a simple EC2 instance in AWS. Let's break down what each section does:

- **terraform block**: Specifies the required providers and their versions
- **provider block**: Configures the AWS provider with your desired region
- **resource block**: Defines the infrastructure you want to create

## Core Terraform Concepts

### 1. Providers: Your Cloud Connectors

Providers are plugins that Terraform uses to interact with cloud providers, SaaS providers, and other APIs. Think of them as translators between Terraform and the services you want to manage.

\`\`\`hcl
# AWS Provider
provider "aws" {
  region = "us-west-2"
  profile = "production"
}

# Azure Provider
provider "azurerm" {
  features {}
}

# Google Cloud Provider
provider "google" {
  project = "my-project-id"
  region  = "us-central1"
}
\`\`\`

### 2. Resources: Your Infrastructure Building Blocks

Resources are the infrastructure objects you want to create and manage. Each resource has a type, name, and configuration.

\`\`\`hcl
# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main"
    Environment = "production"
  }
}

# Create a subnet within the VPC
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "public"
  }
}
\`\`\`

### 3. Data Sources: Leveraging Existing Resources

Data sources allow you to reference existing resources without managing them. This is perfect for using existing AMIs, VPCs, or other infrastructure.

\`\`\`hcl
# Get the latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  
  owners = ["099720109477"] # Canonical
}

# Use the AMI in your resource
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
}
\`\`\`

## Advanced Terraform Features

### 1. Variables: Making Your Code Reusable

Variables allow you to parameterize your configurations, making them more flexible and reusable across different environments.

\`\`\`hcl
# variables.tf
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# main.tf
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  
  tags = {
    Name        = "web-server"
    Environment = var.environment
  }
}
\`\`\`

### 2. Outputs: Exposing Important Information

Outputs allow you to expose specific values from your Terraform configuration, making them available for other tools or for reference.

\`\`\`hcl
# outputs.tf
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}

output "public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.web.public_ip
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}
\`\`\`

### 3. Modules: Reusable Infrastructure Components

Modules are reusable Terraform configurations that encapsulate common infrastructure patterns. They're like functions for your infrastructure code.

\`\`\`hcl
# modules/webserver/main.tf
variable "instance_type" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_id" {
  type = string
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public.id
  
  tags = {
    Name        = "web-server"
    Environment = var.environment
  }
}

# modules/webserver/outputs.tf
output "instance_id" {
  value = aws_instance.web.id
}

output "public_ip" {
  value = aws_instance.web.public_ip
}

# main.tf
module "webserver" {
  source = "./modules/webserver"
  
  instance_type = "t2.micro"
  environment   = "production"
  vpc_id        = aws_vpc.main.id
}
\`\`\`

## Best Practices for Production

### 1. State Management: The Foundation of Reliability

Remote state storage is crucial for team collaboration and disaster recovery. Never use local state in production.

\`\`\`hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt = true
  }
}
\`\`\`

### 2. Workspaces: Environment Separation

Use workspaces to manage multiple environments with the same configuration:

\`\`\`bash
# Create workspaces for different environments
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

# Switch between workspaces
terraform workspace select prod
\`\`\`

### 3. Security: Implementing Least Privilege

Always follow the principle of least privilege when configuring IAM roles and policies:

\`\`\`hcl
resource "aws_iam_role" "terraform" {
  name = "terraform-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "terraform" {
  name = "terraform-policy"
  role = aws_iam_role.terraform.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:*",
          "vpc:*",
          "iam:GetRole",
          "iam:GetRolePolicy"
        ]
        Resource = "*"
      }
    ]
  })
}
\`\`\`

## Essential Terraform Commands

Master these commands to become proficient with Terraform:

\`\`\`bash
# Initialize your Terraform configuration
terraform init

# Preview changes before applying
terraform plan

# Apply changes to create or modify infrastructure
terraform apply

# Destroy infrastructure (use with caution!)
terraform destroy

# Format your Terraform code
terraform fmt

# Validate your configuration
terraform validate

# Show current state
terraform show

# List workspaces
terraform workspace list
\`\`\`

## Troubleshooting Common Issues

### State Lock Issues

When multiple people run Terraform simultaneously:

\`\`\`bash
# Force unlock (use with extreme caution)
terraform force-unlock <lock-id>

# Check for locks
terraform plan
\`\`\`

### Provider Version Conflicts

Resolve version conflicts by updating your configuration:

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  required_version = ">= 1.0"
}
\`\`\`

## Conclusion

Terraform has revolutionized how we think about infrastructure management. By treating infrastructure as code, we gain the benefits of version control, testing, and automation that we've come to expect from software development.

The journey to mastering Terraform is ongoing. Start with simple configurations, gradually add complexity, and always test your changes in a development environment first. The investment in learning Terraform will pay dividends in reduced deployment times, improved reliability, and greater confidence in your infrastructure changes.

Remember, infrastructure as code isn't just about automation—it's about creating a culture of infrastructure excellence. With Terraform as your foundation, you're well on your way to building robust, scalable, and maintainable infrastructure.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-10",
      readTime: "12 min read",
      tags: ["Terraform", "IaC", "AWS", "Cloud", "Infrastructure"],
      image: "/images/terraform.jpeg",
      slug: "infrastructure-as-code-terraform",
    },
    "monitoring-prometheus-grafana": {
      id: "4",
      title: "Monitoring and Observability with Prometheus and Grafana",
      excerpt:
        "Build comprehensive monitoring solutions using Prometheus and Grafana. Learn how to collect metrics, create dashboards, and set up alerting for your applications.",
      content: `
# Monitoring and Observability with Prometheus and Grafana

In the digital age, where applications serve millions of users and generate terabytes of data, understanding what's happening in your systems is not just important—it's critical for survival. Monitoring and observability have evolved from simple uptime checks to sophisticated systems that provide deep insights into application behavior, performance, and user experience.

## The Observability Imperative

Imagine flying a plane without instruments. You might be able to keep it in the air, but you'd have no idea about fuel levels, engine performance, or weather conditions ahead. Modern applications are no different. Without proper monitoring and observability, you're flying blind in a complex, distributed environment.

Prometheus and Grafana have emerged as the dynamic duo of observability, providing the tools you need to understand your systems deeply and respond to issues before they become problems.

## Understanding Observability

Before diving into the technical implementation, let's understand what observability really means and why it matters.

### The Three Pillars of Observability

Observability consists of three fundamental pillars that work together to provide complete visibility into your systems:

#### 1. Metrics: The Numbers That Matter
Metrics are numerical data points that represent the state of your system over time. Think of them as the vital signs of your application—heart rate, blood pressure, temperature.

#### 2. Logs: The Story of What Happened
Logs are text-based records of events that occurred in your system. They tell the story of what happened, when it happened, and often why it happened.

#### 3. Traces: Following the Request Journey
Traces show the path of requests as they flow through your distributed system, helping you understand dependencies and identify bottlenecks.

## Why Prometheus and Grafana?

### Prometheus: The Metrics Powerhouse

Prometheus has become the de facto standard for metrics collection and storage. Here's why it's so powerful:

- **Pull-based Architecture**: Prometheus scrapes metrics from your applications, ensuring reliable data collection
- **Time-series Database**: Optimized for storing and querying time-series data efficiently
- **Powerful Query Language**: PromQL enables complex queries and aggregations
- **Built-in Alerting**: Comprehensive alerting capabilities with flexible rules
- **Service Discovery**: Automatically discovers and monitors new services

### Grafana: The Visualization Champion

Grafana transforms raw data into actionable insights through beautiful, interactive dashboards:

- **Rich Visualizations**: From simple graphs to complex heatmaps and histograms
- **Multiple Data Sources**: Supports Prometheus and many other data sources
- **Advanced Alerting**: Sophisticated alerting with multiple notification channels
- **Dashboard Templates**: Reusable components for consistent monitoring
- **User Management**: Role-based access control for team collaboration

## Setting Up Your Monitoring Stack

### Prometheus Configuration: The Foundation

Let's start by configuring Prometheus to collect metrics from your applications:

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'application'
    static_configs:
      - targets: ['app:8080']
    metrics_path: '/metrics'
    scrape_interval: 10s
\`\`\`

### Docker Compose: Complete Stack Setup

Here's a complete setup using Docker Compose that includes Prometheus, Grafana, and Node Exporter:

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning

  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager_data:/alertmanager

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

volumes:
  prometheus_data:
  grafana_data:
  alertmanager_data:
\`\`\`

## Instrumenting Your Applications

### Node.js Application Instrumentation

Let's instrument a Node.js application to expose metrics that Prometheus can scrape:

\`\`\`javascript
const express = require('express');
const prometheus = require('prom-client');

const app = express();

// Create a Registry to register metrics
const register = new prometheus.Registry();

// Add default metrics (CPU, memory, etc.)
prometheus.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

// Register metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Middleware to collect metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration / 1000);
    
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  
  next();
});

// Example routes
app.get('/api/users', (req, res) => {
  activeConnections.inc();
  // Simulate some work
  setTimeout(() => {
    res.json({ users: [] });
    activeConnections.dec();
  }, 100);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
\`\`\`

### Python Application Instrumentation

Here's how to instrument a Python Flask application:

\`\`\`python
from flask import Flask, request, jsonify
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
import time

app = Flask(__name__)

# Metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'HTTP request latency')
ACTIVE_CONNECTIONS = Gauge('active_connections', 'Number of active connections')

@app.route('/metrics')
def metrics():
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}

@app.route('/api/data')
def get_data():
    with REQUEST_LATENCY.time():
        ACTIVE_CONNECTIONS.inc()
        # Simulate processing time
        time.sleep(0.1)
        data = {'message': 'Hello from Flask!'}
        ACTIVE_CONNECTIONS.dec()
        return jsonify(data)

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

@app.before_request
def before_request():
    request.start_time = time.time()

@app.after_request
def after_request(response):
    duration = time.time() - request.start_time
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.endpoint,
        status=response.status_code
    ).inc()
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
\`\`\`

## Creating Meaningful Dashboards

### Basic Dashboard Setup

Creating effective dashboards is both an art and a science. Here's how to get started:

1. **Add Prometheus Data Source**
   - Navigate to Configuration > Data Sources
   - Add Prometheus with URL: http://prometheus:9090
   - Test the connection

2. **Create Your First Dashboard**
   - Click "Create" > "Dashboard"
   - Add a new panel
   - Choose "Time series" visualization

### Essential Queries for Application Monitoring

Here are some fundamental PromQL queries that every application should monitor:

\`\`\`promql
# Request rate by endpoint
rate(http_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Error rate (5xx responses)
rate(http_requests_total{status_code=~"5.."}[5m])

# CPU usage
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100

# Disk usage
(node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100

# Active connections
active_connections
\`\`\`

### Advanced Dashboard Features

#### 1. Variables for Dynamic Dashboards

Create dashboard variables to make your dashboards more flexible:

\`\`\`promql
# Variable: instance
label_values(node_cpu_seconds_total, instance)

# Variable: job
label_values(up, job)
\`\`\`

#### 2. Annotations for Context

Add annotations to mark deployments, incidents, or other important events:

\`\`\`yaml
# annotations.yml
annotations:
  - name: "Deployments"
    datasource: "Prometheus"
    expr: "changes(up[1m]) > 0"
    iconColor: "green"
\`\`\`

## Alerting: From Reactive to Proactive

### Prometheus Alert Rules

Set up intelligent alerting to catch issues before they impact users:

\`\`\`yaml
# alert_rules.yml
groups:
  - name: application_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value }} seconds"

      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} is down"

      - alert: HighCPUUsage
        expr: 100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is {{ $value }}%"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is {{ $value }}%"
\`\`\`

### Grafana Alerting

Grafana provides advanced alerting capabilities with multiple notification channels:

1. **Create Alert Rules**
   - Go to Alerting > Alert rules
   - Create new rule
   - Set query and conditions

2. **Configure Notification Channels**
   - Email notifications
   - Slack integration
   - PagerDuty for on-call
   - Webhook for custom integrations

## Best Practices for Production Monitoring

### 1. Metric Naming Conventions

Follow consistent naming conventions to make your metrics discoverable and understandable:

\`\`\`promql
# Good naming
http_requests_total
http_request_duration_seconds
node_cpu_seconds_total

# Avoid these
total_requests
request_time
cpu_usage
\`\`\`

### 2. Labeling Strategy

Use labels effectively to enable powerful queries:

\`\`\`promql
# Good labeling
http_requests_total{method="GET", endpoint="/api/users", status_code="200"}

# Avoid too many label values (high cardinality)
http_requests_total{user_id="12345", session_id="abc123"}
\`\`\`

### 3. Cardinality Management

Monitor cardinality to prevent performance issues:

\`\`\`promql
# Check cardinality
count by (__name__) ({__name__=~".+"})

# Monitor high cardinality metrics
topk(10, count by (__name__) ({__name__=~".+"}))
\`\`\`

### 4. Retention Strategy

Configure appropriate retention periods based on your needs:

- **High-resolution metrics**: 7-15 days
- **Low-resolution metrics**: 30-90 days
- **Long-term storage**: 1+ years (consider remote storage)

## Troubleshooting Your Monitoring Stack

### Common Prometheus Issues

#### High Memory Usage
\`\`\`bash
# Check memory usage
curl -s http://prometheus:9090/api/v1/status/memory

# Optimize by reducing scrape intervals or cardinality
\`\`\`

#### Slow Queries
\`\`\`bash
# Check query performance
curl -s "http://prometheus:9090/api/v1/query?query=up" | jq '.data.result'

# Use recording rules for complex queries
\`\`\`

### Grafana Troubleshooting

#### Dashboard Loading Issues
- Check data source connectivity
- Verify query syntax
- Review time range settings

#### Alert Notifications
- Test notification channels
- Check alert rule syntax
- Verify evaluation intervals

## Conclusion

Monitoring and observability with Prometheus and Grafana provide the foundation for understanding your systems deeply. By implementing comprehensive monitoring, you transform from reactive firefighting to proactive optimization.

The journey to excellent observability is ongoing. Start with basic metrics, gradually add more sophisticated monitoring, and always focus on actionable insights. Remember, the goal isn't just to collect data—it's to understand your systems well enough to make them better.

As you continue your observability journey, focus on metrics that matter to your business and users. The investment in proper monitoring will pay dividends in improved reliability, faster incident response, and better user experience.

Your systems are telling you stories every day. With Prometheus and Grafana, you now have the tools to listen, understand, and act on those stories.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-05",
      readTime: "10 min read",
      tags: ["Monitoring", "Prometheus", "Grafana", "Observability"],
      image: "/images/Grafana.png",
      slug: "monitoring-prometheus-grafana",
    },
    "docker-best-practices-production": {
      id: "5",
      title: "Docker Best Practices for Production Environments",
      excerpt:
        "Learn essential Docker best practices for production deployments. From security considerations to performance optimization, ensure your containers are production-ready.",
      content: `
# Docker Best Practices for Production Environments

Docker has revolutionized how we package, deploy, and run applications. What started as a simple containerization tool has evolved into a comprehensive platform that powers everything from development environments to mission-critical production systems. However, running containers in production requires more than just basic Docker knowledge—it demands a deep understanding of security, performance, and operational best practices.

## The Production Container Challenge

Imagine shipping a fragile package across the ocean. You wouldn't just throw it in a box and hope for the best. You'd use proper packaging, secure it against damage, and ensure it can withstand the journey. Production containers are no different. They need to be secure, efficient, and resilient enough to handle the demands of real-world deployment.

## Why Production Containers Are Different

Development containers and production containers serve different purposes and face different challenges:

### Development Containers
- **Purpose**: Rapid iteration and testing
- **Lifetime**: Short-lived, frequently rebuilt
- **Security**: Basic isolation is sufficient
- **Performance**: Adequate for development workflows

### Production Containers
- **Purpose**: Reliable, secure, and performant application delivery
- **Lifetime**: Long-running, stable deployments
- **Security**: Comprehensive security measures required
- **Performance**: Optimized for efficiency and scalability

## Security: Your First Line of Defense

### 1. Choose Minimal Base Images

The foundation of container security starts with your base image. Think of it as choosing the right foundation for a building—weak foundations lead to structural problems.

\`\`\`dockerfile
# Good - Alpine Linux (5MB)
FROM alpine:3.18

# Good - Distroless images (minimal attack surface)
FROM gcr.io/distroless/nodejs:18

# Avoid - Full Ubuntu/Debian (hundreds of MB)
FROM ubuntu:22.04
\`\`\`

**Why this matters**: Smaller images mean fewer attack vectors, faster deployments, and reduced storage costs.

### 2. Run as Non-Root User

Running containers as root is like giving every application administrator privileges. It's a security anti-pattern that can lead to serious vulnerabilities.

\`\`\`dockerfile
# Create non-root user
RUN addgroup -g 1001 -S appgroup && \\
    adduser -S appuser -u 1001 -G appgroup

# Switch to non-root user
USER appuser

# Copy application files with proper ownership
COPY --chown=appuser:appgroup app/ /app/

# Set proper permissions
RUN chmod 755 /app
\`\`\`

### 3. Regular Vulnerability Scanning

Security is not a one-time effort—it's an ongoing process. Regular scanning helps you identify and fix vulnerabilities before they can be exploited.

\`\`\`bash
# Using Trivy (recommended)
trivy image myapp:latest

# Using Docker Scout
docker scout cves myapp:latest

# Using Snyk
snyk container test myapp:latest

# Integrate into your CI/CD pipeline
\`\`\`

### 4. Multi-Stage Builds: Security Through Design

Multi-stage builds not only reduce image size but also minimize the attack surface by excluding build tools from the final image.

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY app/ ./app/
USER node
CMD ["node", "app/index.js"]
\`\`\`

## Performance Optimization: Doing More with Less

### 1. Optimize Layer Caching

Docker builds images layer by layer. Smart layer ordering can dramatically improve build times and efficiency.

\`\`\`dockerfile
# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm ci

# Copy source code last (changes more frequently)
COPY . .

# This way, if only source code changes, 
# npm ci won't run again
\`\`\`

### 2. Use .dockerignore Effectively

The .dockerignore file is your first line of defense against bloated images. Exclude everything that doesn't need to be in your container.

\`\`\`dockerignore
# Dependencies
node_modules
npm-debug.log

# Version control
.git
.gitignore

# Documentation
README.md
docs/

# Environment files
.env
.env.local
.env.production

# Test files
coverage/
.nyc_output
.coverage
.pytest_cache

# Build artifacts
dist/
build/
*.log
\`\`\`

### 3. Set Resource Limits

Unlimited resources can lead to resource contention and unpredictable performance. Always set appropriate limits.

\`\`\`yaml
# docker-compose.yml
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

### 4. Implement Health Checks

Health checks are your container's way of saying "I'm okay" or "I need help." They're essential for orchestration systems to make intelligent decisions.

\`\`\`dockerfile
# In Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/health || exit 1
\`\`\`

\`\`\`yaml
# In docker-compose.yml
services:
  app:
    image: myapp:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
\`\`\`

## Logging: The Window into Your Applications

### 1. Structured Logging

Structured logs are machine-readable and human-friendly. They enable better debugging, monitoring, and analysis.

\`\`\`javascript
// Node.js example with Winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Structured logging
logger.info('Request processed', {
  method: 'GET',
  path: '/api/users',
  duration: 150,
  statusCode: 200,
  userAgent: req.headers['user-agent'],
  ip: req.ip
});
\`\`\`

### 2. Configure Log Drivers

Docker's logging system is flexible and powerful. Choose the right driver for your use case.

\`\`\`yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "production_status"
        env: "os,customer"
\`\`\`

## Networking: Secure and Efficient Communication

### 1. Use Custom Networks

Default networks are convenient but not suitable for production. Custom networks provide better isolation and control.

\`\`\`yaml
# docker-compose.yml
version: '3.8'

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.21.0.0/16

services:
  nginx:
    networks:
      - frontend
      - backend
  
  app:
    networks:
      - backend
  
  database:
    networks:
      - backend
\`\`\`

### 2. Expose Minimal Ports

The principle of least privilege applies to networking as well. Only expose what's absolutely necessary.

\`\`\`dockerfile
# Only expose the application port
EXPOSE 8080
\`\`\`

\`\`\`yaml
# In docker-compose.yml
services:
  app:
    ports:
      - "127.0.0.1:8080:8080"  # Bind to localhost only
\`\`\`

## Environment Management: Configuration as Code

### 1. Use Environment Files

Environment variables should be managed systematically, not scattered across different systems.

\`\`\`bash
# .env.production
DB_HOST=production-db.example.com
DB_PORT=5432
DB_NAME=myapp
DB_USER=app_user
LOG_LEVEL=info
NODE_ENV=production
\`\`\`

\`\`\`yaml
# docker-compose.yml
services:
  app:
    env_file:
      - .env.production
    environment:
      - NODE_ENV=production
      - TZ=UTC
\`\`\`

### 2. Secrets Management

Sensitive data requires special handling. Use Docker secrets or external solutions for proper security.

\`\`\`yaml
# docker-compose.yml
services:
  app:
    secrets:
      - db_password
      - api_key
      - ssl_cert

secrets:
  db_password:
    external: true
  api_key:
    external: true
  ssl_cert:
    file: ./ssl/cert.pem
\`\`\`

## Monitoring and Observability

### 1. Comprehensive Health Checks

Health checks should verify not just that your application is running, but that it's functioning correctly.

\`\`\`javascript
// health.js
const express = require('express');
const app = express();

app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.ping();
    
    // Check external dependencies
    await checkExternalService();
    
    // Check internal state
    const memoryUsage = process.memoryUsage();
    if (memoryUsage.heapUsed > 500 * 1024 * 1024) { // 500MB
      throw new Error('High memory usage');
    }
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.APP_VERSION,
      memory: memoryUsage
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
\`\`\`

### 2. Container Metrics

Monitor your containers to understand their behavior and performance characteristics.

\`\`\`bash
# Real-time stats
docker stats

# Specific container
docker stats myapp

# Format output for monitoring
docker stats --format "table {{.Container}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}\\t{{.BlockIO}}"

# Export metrics for Prometheus
docker run -d \\
  --name=cadvisor \\
  --volume=/:/rootfs:ro \\
  --volume=/var/run:/var/run:ro \\
  --volume=/sys:/sys:ro \\
  --volume=/var/lib/docker/:/var/lib/docker:ro \\
  --publish=8080:8080 \\
  gcr.io/cadvisor/cadvisor
\`\`\`

## Backup and Recovery: Planning for the Worst

### 1. Volume Backups

Data is your most valuable asset. Regular backups are essential for disaster recovery.

\`\`\`bash
# Backup volume
docker run --rm \\
  -v myapp_data:/data \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/data_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .

# Restore volume
docker run --rm \\
  -v myapp_data:/data \\
  -v $(pwd):/backup \\
  alpine tar xzf /backup/data_backup_20240101_120000.tar.gz -C /data

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
VOLUME_NAME="myapp_data"
RETENTION_DAYS=30

# Create backup
docker run --rm \\
  -v \$VOLUME_NAME:/data \\
  -v \$BACKUP_DIR:/backup \\
  alpine tar czf /backup/\${VOLUME_NAME}_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .

# Clean old backups
find \$BACKUP_DIR -name "\${VOLUME_NAME}_*.tar.gz" -mtime +\$RETENTION_DAYS -delete
\`\`\`

### 2. Image Versioning Strategy

Proper image versioning enables rollbacks, auditing, and reproducible deployments.

\`\`\`bash
# Semantic versioning
docker build -t myapp:1.2.3 .

# Git commit-based tagging
docker build -t myapp:$(git rev-parse --short HEAD) .

# Environment-specific tags
docker build -t myapp:prod-1.2.3 .

# Latest tag (use with caution)
docker tag myapp:1.2.3 myapp:latest

# Push to registry
docker push myapp:1.2.3
docker push myapp:latest
\`\`\`

## Troubleshooting Production Issues

### Common Container Problems

#### High Memory Usage
\`\`\`bash
# Check memory usage
docker stats --no-stream

# Inspect container
docker inspect myapp | grep -i memory

# Check logs for memory leaks
docker logs myapp | grep -i memory
\`\`\`

#### Container Won't Start
\`\`\`bash
# Check container logs
docker logs myapp

# Inspect container state
docker inspect myapp

# Check resource limits
docker stats myapp
\`\`\`

#### Network Connectivity Issues
\`\`\`bash
# Test network connectivity
docker exec myapp ping google.com

# Check network configuration
docker network inspect bridge

# Test port connectivity
docker exec myapp curl -v http://localhost:8080
\`\`\`

## Conclusion

Docker in production is not just about running containers—it's about creating a robust, secure, and maintainable application delivery platform. The best practices outlined in this guide provide a foundation for building production-ready containerized applications.

Remember, production containers are living systems that require ongoing attention and care. Start with these fundamentals, gradually implement more advanced practices, and always prioritize security and reliability over convenience.

The investment in proper Docker practices will pay dividends in reduced deployment issues, improved security posture, and better operational efficiency. Your containers are the foundation of your application's success—build them well, and they will serve you reliably.

As you continue your Docker journey, focus on automation, monitoring, and continuous improvement. The container ecosystem is constantly evolving, and staying current with best practices will ensure your applications remain competitive and secure.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2024-01-01",
      readTime: "7 min read",
      tags: ["Docker", "Containers", "Production", "Security"],
      image: "/images/docker.jpg",
      slug: "docker-best-practices-production",
    },
    "gitops-argocd-deployment": {
      id: "6",
      title: "GitOps with ArgoCD: Declarative Deployment Strategies",
      excerpt:
        "Implement GitOps workflows using ArgoCD for Kubernetes deployments. Learn how to achieve continuous delivery with declarative, version-controlled deployments.",
      content: `
# GitOps with ArgoCD: Declarative Deployment Strategies

In the ever-evolving landscape of DevOps and cloud-native technologies, GitOps has emerged as a revolutionary approach to continuous delivery. It represents a paradigm shift from traditional deployment methods to a more declarative, version-controlled, and automated approach. At the heart of this revolution stands ArgoCD, a powerful GitOps continuous delivery tool that has become the gold standard for Kubernetes deployments.

## The GitOps Revolution

Imagine a world where every infrastructure change is tracked, every deployment is auditable, and every rollback is as simple as reverting a Git commit. This is the promise of GitOps—a methodology that uses Git as the single source of truth for declarative infrastructure and applications.

The traditional approach to deployments often involves manual steps, inconsistent environments, and a lack of transparency. GitOps flips this model on its head by making Git the authoritative source for both application code and infrastructure configuration.

## Understanding GitOps Principles

Before diving into ArgoCD implementation, let's understand the core principles that make GitOps so powerful:

### 1. Declarative: The Power of Intent
GitOps is declarative, meaning you describe the desired state of your system rather than the steps to achieve it. Think of it as writing a recipe that describes the final dish rather than a series of cooking instructions.

### 2. Versioned and Immutable: The Safety Net
Every change is versioned in Git, providing a complete audit trail. Immutable deployments ensure consistency and eliminate the "works on my machine" problem.

### 3. Pulled Automatically: The Self-Healing System
Software agents automatically pull changes from Git and apply them to your infrastructure, ensuring the deployed state always matches the desired state.

### 4. Continuously Reconciled: The Living System
The system continuously observes the actual state and compares it to the desired state, automatically correcting any drift.

## Why ArgoCD?

ArgoCD has become the de facto standard for GitOps implementations. Here's why it's the preferred choice:

### ArgoCD's Compelling Advantages
- **Declarative by Design**: Uses Git as the source of truth for all configurations
- **Automated Synchronization**: Automatically syncs applications when Git changes
- **Multi-Cluster Management**: Manages multiple Kubernetes clusters from a single control plane
- **Rich Web Interface**: Beautiful, intuitive UI for monitoring and management
- **Role-Based Access Control**: Comprehensive RBAC for team collaboration
- **Single Sign-On Integration**: Seamless integration with enterprise identity systems
- **Extensive Plugin Ecosystem**: Support for Helm, Kustomize, and custom plugins

## Setting Up Your GitOps Foundation

### Installing ArgoCD: Your First Step

Getting ArgoCD up and running is straightforward. Here are the most common installation methods:

#### Using Helm (Recommended)

Helm provides the most flexible and maintainable installation method:

\`\`\`bash
# Add ArgoCD Helm repository
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

# Install ArgoCD with production-ready configuration
helm install argocd argo/argo-cd \\
  --namespace argocd \\
  --create-namespace \\
  --set server.extraArgs="{--insecure}" \\
  --set server.ingress.enabled=true \\
  --set server.ingress.hosts[0]=argocd.yourdomain.com \\
  --set server.ingress.tls[0].secretName=argocd-tls \\
  --set server.ingress.tls[0].hosts[0]=argocd.yourdomain.com
\`\`\`

#### Using kubectl (Quick Start)

For development or testing environments:

\`\`\`bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port forward for local access
kubectl port-forward svc/argocd-server -n argocd 8080:443
\`\`\`

## Building Your First GitOps Application

### 1. Creating the Application Manifest

The application manifest is the heart of your GitOps workflow. It tells ArgoCD what to deploy and how to manage it:

\`\`\`yaml
# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
  labels:
    environment: production
    team: platform
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/myapp
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
  revisionHistoryLimit: 10
\`\`\`

This configuration tells ArgoCD to:
- Monitor the \`main\` branch of your repository
- Look for Kubernetes manifests in the \`k8s\` directory
- Deploy to the \`myapp\` namespace
- Automatically sync when changes are detected
- Clean up resources that are no longer in Git

### 2. Structuring Your Kubernetes Manifests

Store your Kubernetes manifests in Git following a clear structure:

\`\`\`yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp
  labels:
    app: myapp
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
\`\`\`

\`\`\`yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: myapp
  labels:
    app: myapp
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
\`\`\`

\`\`\`yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: myapp
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - myapp.yourdomain.com
    secretName: myapp-tls
  rules:
  - host: myapp.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
\`\`\`

## Advanced ArgoCD Features

### 1. Application Sets: Scaling Your GitOps

ApplicationSets allow you to manage multiple applications with a single configuration, perfect for microservices architectures:

\`\`\`yaml
# applicationset.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: microservices-set
  namespace: argocd
spec:
  generators:
  - list:
      elements:
      - cluster: in-cluster
        url: https://kubernetes.default.svc
        namespace: frontend
        environment: production
        service: frontend
      - cluster: in-cluster
        url: https://kubernetes.default.svc
        namespace: backend
        environment: production
        service: backend
      - cluster: in-cluster
        url: https://kubernetes.default.svc
        namespace: database
        environment: production
        service: database
  template:
    metadata:
      name: '{{service}}-{{environment}}'
      namespace: argocd
    spec:
      project: default
      source:
        repoURL: https://github.com/your-org/microservices
        targetRevision: HEAD
        path: k8s/{{service}}
      destination:
        server: '{{url}}'
        namespace: '{{namespace}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
\`\`\`

### 2. Helm Integration: Leveraging Existing Charts

ArgoCD seamlessly integrates with Helm, allowing you to use existing charts while maintaining GitOps principles:

\`\`\`yaml
# helm-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-helm
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/myapp
    targetRevision: HEAD
    path: helm
    helm:
      valueFiles:
      - values.yaml
      - values-production.yaml
      parameters:
      - name: image.tag
        value: "latest"
      - name: replicaCount
        value: "3"
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

### 3. Kustomize: Environment-Specific Configurations

Kustomize provides powerful templating capabilities for managing environment-specific configurations:

\`\`\`yaml
# kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml
- ingress.yaml

patches:
- path: patches/replicas.yaml
  target:
    kind: Deployment
    name: myapp

configMapGenerator:
- name: myapp-config
  literals:
  - ENVIRONMENT=production
  - LOG_LEVEL=info
  - API_TIMEOUT=30s

secretGenerator:
- name: myapp-secrets
  literals:
  - database-url=postgresql://user:pass@db:5432/myapp
  - api-key=your-secret-api-key

images:
- name: myapp
  newTag: v1.2.3
\`\`\`

## Security and Access Control

### 1. RBAC Configuration

Implement proper role-based access control to ensure security:

\`\`\`yaml
# rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argocd-application-controller
  namespace: argocd
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argocd-application-controller
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  - configmaps
  - secrets
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - deployments
  - statefulsets
  - daemonsets
  verbs:
  - get
  - list
  - watch
  - update
  - patch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd-application-controller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argocd-application-controller
subjects:
- kind: ServiceAccount
  name: argocd-application-controller
  namespace: argocd
\`\`\`

### 2. SSO Integration

Configure single sign-on for enterprise environments:

\`\`\`yaml
# argocd-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  url: https://argocd.yourdomain.com
  admin.enabled: "false"
  dex.config: |
    connectors:
    - type: oidc
      id: oidc
      name: OIDC
      config:
        issuer: https://accounts.google.com
        clientID: your-client-id
        clientSecret: your-client-secret
        requestedScopes:
        - openid
        - profile
        - email
        - groups
  oidc.config: |
    name: OIDC
    issuer: https://accounts.google.com
    clientID: your-client-id
    clientSecret: your-client-secret
    requestedScopes:
    - openid
    - profile
    - email
    - groups
\`\`\`

## Monitoring and Observability

### 1. ArgoCD Metrics

Enable Prometheus metrics for comprehensive monitoring:

\`\`\`yaml
# argocd-server-metrics.yaml
apiVersion: v1
kind: Service
metadata:
  name: argocd-server-metrics
  namespace: argocd
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8083"
    prometheus.io/path: "/metrics"
spec:
  ports:
  - name: metrics
    port: 8083
    protocol: TCP
    targetPort: 8083
  selector:
    app.kubernetes.io/name: argocd-server
---
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: argocd-server
  namespace: argocd
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: argocd-server
  endpoints:
  - port: metrics
    path: /metrics
\`\`\`

### 2. Application Health Monitoring

Implement comprehensive health checks for your applications:

\`\`\`yaml
# health-check.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
spec:
  # ... other specs
  syncPolicy:
    syncOptions:
      - PrunePropagationPolicy=foreground
      - PruneLast=true
  health:
    custom:
      - group: argoproj.io
        kind: Application
        name: myapp
        namespace: argocd
        health:
          status: Healthy
          message: Application is healthy
\`\`\`

## CI/CD Integration

### 1. GitHub Actions Integration

Automate deployments with GitHub Actions:

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to ArgoCD

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and push image
      run: |
        docker build -t myapp:\${{ github.sha }} .
        docker push myapp:\${{ github.sha }}
    
    - name: Update ArgoCD
      run: |
        kubectl patch application myapp -n argocd --type='merge' -p='{"spec":{"source":{"targetRevision":"\${{ github.sha }}}}'
    
    - name: Wait for sync
      run: |
        kubectl wait --for=condition=Synced application/myapp -n argocd --timeout=300s
\`\`\`

### 2. GitLab CI Integration

Use GitLab CI for deployment automation:

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t myapp:\$CI_COMMIT_SHA .
    - docker push myapp:\$CI_COMMIT_SHA

deploy:
  stage: deploy
  script:
    - kubectl patch application myapp -n argocd --type='merge' -p="{\\"spec\\":{\\"source\\":{\\"targetRevision\\":\\"\$CI_COMMIT_SHA\\"}}}"
    - kubectl wait --for=condition=Synced application/myapp -n argocd --timeout=300s
\`\`\`

## Troubleshooting Common Issues

### 1. Application Sync Problems

#### Application Out of Sync
\`\`\`bash
# Check application status
argocd app get myapp

# Sync application manually
argocd app sync myapp

# Check sync history
argocd app history myapp

# Force sync (use with caution)
argocd app sync myapp --force
\`\`\`

#### Authentication Issues
\`\`\`bash
# Reset admin password
kubectl -n argocd patch secret argocd-secret \\
  -p '{"stringData":{"admin.password":"$(openssl rand -base64 32)"}}'

# Check authentication configuration
kubectl get configmap argocd-cm -n argocd -o yaml
\`\`\`

### 2. Debugging Techniques

#### Enable Debug Logging
\`\`\`yaml
# argocd-server.yaml
spec:
  template:
    spec:
      containers:
      - name: argocd-server
        args:
        - --log-level
        - debug
        - --insecure
\`\`\`

#### Check Application Events
\`\`\`bash
# Get application events
kubectl get events --field-selector involvedObject.name=myapp -n argocd

# Check application logs
kubectl logs -l app.kubernetes.io/name=argocd-server -n argocd
\`\`\`

## Best Practices for Production

### 1. Repository Structure

Organize your Git repository for optimal GitOps workflow:

\`\`\`
myapp/
├── k8s/
│   ├── base/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── overlays/
│   │   ├── development/
│   │   ├── staging/
│   │   └── production/
│   └── charts/
│       └── myapp/
├── .github/
│   └── workflows/
└── README.md
\`\`\`

### 2. Security Considerations

- **Secrets Management**: Use external secret management solutions
- **Network Policies**: Implement proper network isolation
- **Pod Security Standards**: Follow Kubernetes security best practices
- **Regular Updates**: Keep ArgoCD and dependencies updated

### 3. Monitoring and Alerting

- **Application Health**: Monitor sync status and health
- **Resource Usage**: Track ArgoCD resource consumption
- **Security Events**: Alert on authentication failures
- **Deployment Metrics**: Track deployment frequency and success rates

## Conclusion

ArgoCD has transformed how we think about application deployment and management. By implementing GitOps principles with ArgoCD, you gain unprecedented control, visibility, and reliability in your deployment processes.

The journey to GitOps excellence is ongoing. Start with simple applications, gradually add complexity, and always prioritize security and reliability. Remember, GitOps isn't just about automation—it's about creating a culture of infrastructure excellence where every change is tracked, every deployment is auditable, and every rollback is as simple as a Git revert.

As you continue your GitOps journey with ArgoCD, focus on automation, monitoring, and continuous improvement. The GitOps ecosystem is rapidly evolving, and staying current with best practices will ensure your applications remain competitive and secure.

Your infrastructure is now living in Git, version-controlled, and automatically managed. Welcome to the future of deployment—welcome to GitOps.
      `,
      author: "Muhammad Gamal",
      publishedAt: "2023-12-28",
      readTime: "9 min read",
      tags: ["GitOps", "ArgoCD", "Kubernetes", "Deployment"],
      image: "/images/argocd.png",
      slug: "gitops-argocd-deployment",
    },
  }

  return posts[slug as keyof typeof posts] || null
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
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
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
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
                          <div key={`code-${i}`} className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-4">
                            <pre className="text-green-400 text-sm whitespace-pre-wrap">
                              {codeBlockContent.join('\n')}
                            </pre>
                          </div>
                        );
                        codeBlockContent = [];
                      }
                      continue;
                    }
                    
                    if (inCodeBlock) {
                      codeBlockContent.push(line);
                      continue;
                    }
                    
                    // Handle headers
                    if (line.startsWith('# ')) {
                      elements.push(
                        <h2 key={`h2-${i}`} className="text-2xl font-bold mt-6 mb-4">
                          {line.slice(2)}
                        </h2>
                      );
                      continue;
                    }
                    
                    if (line.startsWith('## ')) {
                      elements.push(
                        <h3 key={`h3-${i}`} className="text-xl font-semibold mt-5 mb-3">
                          {line.slice(3)}
                        </h3>
                      );
                      continue;
                    }
                    
                    if (line.startsWith('### ')) {
                      elements.push(
                        <h4 key={`h4-${i}`} className="text-lg font-semibold mt-4 mb-2">
                          {line.slice(4)}
                        </h4>
                      );
                      continue;
                    }
                    
                    // Handle lists
                    if (line.match(/^\d+\. /)) {
                      elements.push(
                        <li key={`ol-${i}`} className="list-decimal pl-6">
                          {line.replace(/^\d+\. /, '')}
                        </li>
                      );
                      continue;
                    }
                    
                    if (line.startsWith('- ')) {
                      elements.push(
                        <li key={`ul-${i}`} className="list-disc pl-6">
                          {line.slice(2)}
                        </li>
                      );
                      continue;
                    }
                    
                    // Handle paragraphs
                    if (line.trim() && !line.startsWith('`')) {
                      elements.push(
                        <p key={`p-${i}`} className="mb-4 leading-relaxed">
                          {line}
                        </p>
                      );
                    }
                  }
                  
                  // Group list items into proper lists
                  const processedElements = [];
                  let currentList = [];
                  let isOrderedList = false;
                  
                  for (const element of elements) {
                    if (element.type === 'li') {
                      if (element.props.className.includes('list-decimal')) {
                        if (!isOrderedList) {
                          if (currentList.length > 0) {
                            processedElements.push(
                              <ul key={`ul-group-${processedElements.length}`} className="list-disc pl-6 space-y-2 mb-4">
                                {currentList}
                              </ul>
                            );
                            currentList = [];
                          }
                          isOrderedList = true;
                        }
                        currentList.push(element);
                      } else {
                        if (isOrderedList) {
                          if (currentList.length > 0) {
                            processedElements.push(
                              <ol key={`ol-group-${processedElements.length}`} className="list-decimal pl-6 space-y-2 mb-4">
                                {currentList}
                              </ol>
                            );
                            currentList = [];
                          }
                          isOrderedList = false;
                        }
                        currentList.push(element);
                      }
                    } else {
                      if (currentList.length > 0) {
                        if (isOrderedList) {
                          processedElements.push(
                            <ol key={`ol-group-${processedElements.length}`} className="list-decimal pl-6 space-y-2 mb-4">
                              {currentList}
                            </ol>
                          );
                        } else {
                          processedElements.push(
                            <ul key={`ul-group-${processedElements.length}`} className="list-disc pl-6 space-y-2 mb-4">
                              {currentList}
                            </ul>
                          );
                        }
                        currentList = [];
                        isOrderedList = false;
                      }
                      processedElements.push(element);
                    }
                  }
                  
                  // Handle any remaining list items
                  if (currentList.length > 0) {
                    if (isOrderedList) {
                      processedElements.push(
                        <ol key={`ol-group-final`} className="list-decimal pl-6 space-y-2 mb-4">
                          {currentList}
                        </ol>
                      );
                    } else {
                      processedElements.push(
                        <ul key={`ul-group-final`} className="list-disc pl-6 space-y-2 mb-4">
                          {currentList}
                        </ul>
                      );
                    }
                  }
                  
                  return processedElements;
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
    </MobileOptimized>
  )
}
