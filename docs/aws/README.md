# AWS Terraform Learning Track

The AWS track should build from small, understandable resources toward platform-level architecture.

## Prerequisites

Before applying AWS Terraform:

- understand providers, variables, outputs, state, and modules
- have an AWS account with billing awareness
- configure credentials locally rather than committing them
- understand that even small labs can incur charges

## Lab sequence

### 1. Provider and identity

Learn:

- AWS provider configuration
- regions
- account identity
- provider authentication

Goal:

Run a Terraform plan that can successfully communicate with AWS without creating infrastructure.

### 2. Networking

Learn:

- VPC
- CIDR blocks
- public/private subnet concepts
- route tables
- internet gateways
- security groups

Goal:

Create a small VPC and explain how traffic reaches or does not reach the internet.

### 3. Storage

Learn:

- S3 buckets
- versioning
- encryption
- public access controls

Goal:

Create a private bucket with sensible protections and useful outputs.

### 4. Compute

Learn:

- EC2 concepts
- AMIs
- instance types
- security groups
- user data

Goal:

Understand the plan for a tiny compute workload before deciding whether to apply billable infrastructure.

### 5. Container infrastructure

Learn:

- ECR
- ECS concepts
- load balancing
- task/service boundaries

Goal:

Map a containerized application from the local Docker lab to AWS-managed services.

### 6. Remote Terraform state

Learn:

- why teams use remote state
- state isolation
- locking/concurrency concepts
- encryption and access control

Goal:

Be able to explain why local `terraform.tfstate` is not a good team workflow.

### 7. EKS — later

Only after networking, IAM, containers, and state make sense:

- EKS control plane
- worker nodes/node groups
- IAM roles
- VPC integration
- Kubernetes provider boundaries

Do not use EKS as the first AWS lab. Managed Kubernetes combines many concepts at once.

## AWS checkpoint

You should be able to explain:

- VPC vs subnet
- route table vs security group
- IAM user vs role conceptually
- S3 vs local storage
- ECR vs Docker Hub/local images
- EC2 vs ECS vs EKS at a high level
- what Terraform owns and what AWS owns
