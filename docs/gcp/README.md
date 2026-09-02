# Google Cloud Terraform Learning Track

The Google Cloud track mirrors the AWS learning progression so you can compare infrastructure concepts instead of memorizing isolated services.

## Prerequisites

Before applying Google Cloud Terraform:

- understand providers, variables, outputs, state, and modules
- have a Google Cloud project with billing awareness
- configure authentication locally rather than committing credentials
- understand that cloud resources may incur charges

## Lab sequence

### 1. Provider, project, and identity

Learn:

- Google provider configuration
- projects
- regions and zones
- authentication

Goal:

Run a Terraform plan that can successfully communicate with Google Cloud without creating infrastructure.

### 2. Networking

Learn:

- VPC networks
- subnetworks
- CIDR ranges
- routes
- firewall rules

Goal:

Create a small custom VPC network and explain which traffic is permitted.

### 3. Storage

Learn:

- Cloud Storage buckets
- location choices
- versioning
- access controls
- encryption concepts

Goal:

Create a private bucket with sensible defaults and useful outputs.

### 4. Compute

Learn:

- Compute Engine
- machine types
- images
- zones
- metadata/startup scripts
- firewall relationships

Goal:

Understand the plan for a small VM workload before deciding whether to create billable infrastructure.

### 5. Container infrastructure

Learn:

- Artifact Registry
- Cloud Run concepts
- GKE concepts

Goal:

Map a containerized application from the local Docker lab to Google Cloud services.

### 6. Remote Terraform state

Learn:

- Cloud Storage as a remote-state backend concept
- state isolation
- permissions
- concurrency/locking considerations

Goal:

Explain how team state differs from a local `terraform.tfstate` workflow.

### 7. GKE — later

Only after networking, IAM, containers, and state are comfortable:

- GKE clusters
- node pools
- VPC integration
- identities/service accounts
- Kubernetes provider boundaries

Managed Kubernetes should come after the basic infrastructure concepts, not before them.

## Google Cloud checkpoint

You should be able to explain:

- project vs region vs zone
- VPC network vs subnetwork
- firewall rules vs AWS security-group concepts
- Cloud Storage vs S3 conceptually
- Compute Engine vs EC2 conceptually
- Artifact Registry vs ECR
- GKE vs EKS
- what Terraform owns and what Google Cloud owns
