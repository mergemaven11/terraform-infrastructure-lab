# Learning Progress Checklist

Use this as a living skills checklist. Check an item only when you can **demonstrate and explain it without copying a tutorial**.

## Terraform fundamentals

- [ ] Explain Infrastructure as Code
- [ ] Explain declarative configuration
- [ ] Explain provider vs resource
- [ ] Run `terraform init`
- [ ] Run `terraform fmt`
- [ ] Run `terraform validate`
- [ ] Read a `terraform plan`
- [ ] Apply a plan intentionally
- [ ] Destroy lab infrastructure safely
- [ ] Explain Terraform state
- [ ] Use `terraform state list`
- [ ] Explain configuration vs state vs real infrastructure

## Terraform language

- [ ] Variables
- [ ] Type constraints
- [ ] Validation blocks
- [ ] Locals
- [ ] Outputs
- [ ] Resource references
- [ ] Implicit dependencies
- [ ] Explicit `depends_on`
- [ ] `count`
- [ ] `for_each`
- [ ] Conditional expressions
- [ ] `for` expressions

## Modules

- [ ] Explain root vs child module
- [ ] Pass inputs to a module
- [ ] Return module outputs
- [ ] Design a reusable module
- [ ] Know when *not* to create a module

## State and collaboration

- [ ] Explain local state
- [ ] Explain remote state
- [ ] Explain state locking
- [ ] Explain state drift
- [ ] Explain why state may contain secrets
- [ ] Explain imports
- [ ] Explain why dev/prod state should be isolated

## CI and quality

- [ ] Explain CI vs CD
- [ ] Read a failed GitHub Actions run
- [ ] Fix a `terraform fmt` CI failure
- [ ] Explain `terraform validate`
- [ ] Use TFLint
- [ ] Use an IaC security scanner
- [ ] Explain PR plan review
- [ ] Explain why auto-apply needs stronger controls

## AWS

- [ ] Verify AWS identity safely
- [ ] Configure the AWS provider
- [ ] Explain account and region scope
- [ ] Explain IAM basics
- [ ] Explain VPC
- [ ] Explain subnets
- [ ] Explain security groups
- [ ] Explain S3
- [ ] Explain EC2
- [ ] Explain ECR
- [ ] Explain EKS at a high level
- [ ] Build and destroy a small AWS Terraform lab

## Google Cloud

- [ ] Verify GCP project/account safely
- [ ] Configure the Google provider
- [ ] Explain project scope
- [ ] Explain Cloud IAM basics
- [ ] Explain VPC networks
- [ ] Explain subnetworks
- [ ] Explain firewall rules
- [ ] Explain Cloud Storage
- [ ] Explain Compute Engine
- [ ] Explain Artifact Registry
- [ ] Explain GKE at a high level
- [ ] Build and destroy a small GCP Terraform lab

## Azure

- [ ] Verify Azure subscription context safely
- [ ] Configure `azurerm`
- [ ] Explain tenant vs subscription
- [ ] Explain resource groups
- [ ] Explain VNets
- [ ] Explain subnets
- [ ] Explain NSGs
- [ ] Explain Blob Storage
- [ ] Explain Virtual Machines
- [ ] Explain ACR
- [ ] Explain AKS at a high level
- [ ] Build and destroy a small Azure Terraform lab

## Multi-cloud

- [ ] Translate a network requirement across AWS/GCP/Azure
- [ ] Translate object storage across providers
- [ ] Translate IAM concepts across providers
- [ ] Translate container registry concepts
- [ ] Compare EKS, GKE, and AKS conceptually
- [ ] Explain where provider abstractions stop being equivalent

## Kubernetes connection

- [ ] Explain Terraform's role in provisioning a Kubernetes cluster
- [ ] Explain Kubernetes' role after cluster creation
- [ ] Explain Terraform vs Helm vs Kubernetes manifests
- [ ] Explain node pools and managed Kubernetes at a high level
- [ ] Explain the relationship among cloud networking, IAM, and Kubernetes

## Troubleshooting

- [ ] Diagnose syntax failure
- [ ] Diagnose `terraform init` failure
- [ ] Diagnose validation failure
- [ ] Diagnose provider authentication failure
- [ ] Diagnose authorization/permission failure
- [ ] Diagnose apply/runtime failure
- [ ] Detect drift
- [ ] Explain an incident using symptom → evidence → cause → fix

## Portfolio-ready

- [ ] README explains the project clearly
- [ ] Architecture diagram exists
- [ ] CI is passing
- [ ] Security checks are present
- [ ] Labs have cost warnings
- [ ] Every cloud lab has teardown instructions
- [ ] No secrets or state are committed
- [ ] At least one troubleshooting write-up exists
- [ ] At least one reusable module is documented
- [ ] Final platform challenge completed
