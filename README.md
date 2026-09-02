# Terraform Docker Lab

A zero-cloud-cost Terraform project for practicing professional Terraform structure using your local Docker Engine.

## What it builds

- A dedicated Docker network
- An NGINX web container
- One or more `traefik/whoami` application containers
- Environment-specific values for dev, staging, and prod
- Reusable Terraform module structure

## Prerequisites

- Terraform >= 1.6
- Docker Desktop / Docker Engine running

Verify:

```bash
terraform version
docker version
```

## Project structure

```text
terraform-docker-lab/
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── versions.tf
├── backend.tf
├── modules/
│   └── app/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── versions.tf
└── environments/
    ├── dev/
    │   └── terraform.tfvars
    ├── staging/
    │   └── terraform.tfvars
    └── prod/
        └── terraform.tfvars
```

## Run the dev environment

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -var-file=environments/dev/terraform.tfvars
```

Then open:

- NGINX: http://localhost:8080
- App instance(s): ports shown by `terraform output`

## Try another environment

```bash
terraform plan -var-file=environments/staging/terraform.tfvars
```

## Destroy everything

```bash
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## Skills this project practices

- Providers
- Resources
- Variables
- Outputs
- Modules
- `for_each`
- Environment-specific `.tfvars`
- Terraform state
- `init`, `fmt`, `validate`, `plan`, `apply`, and `destroy`

## Next upgrade

A strong next step is an AWS version with:

- VPC
- public/private subnets
- security groups
- ECR
- ECS or EKS
- S3 remote state
- DynamoDB/S3 state locking strategy where appropriate
- CI validation with GitHub Actions
