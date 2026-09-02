# Terraform Infrastructure Lab

[![Terraform CI](https://github.com/mergemaven11/terraform-infrastructure-lab/actions/workflows/terraform-ci.yml/badge.svg)](https://github.com/mergemaven11/terraform-infrastructure-lab/actions/workflows/terraform-ci.yml)

A hands-on infrastructure learning lab for practicing professional Terraform patterns locally first, then extending the same concepts into AWS, Google Cloud, Azure, and Kubernetes.

## Learning docs

Start here if you want to understand the project instead of only running it:

- [Infrastructure Learning Hub](docs/README.md)
- [Terraform Lesson Plan](docs/lesson-plan.md)
- [Multi-Cloud Roadmap](docs/cloud-roadmap.md)
- [AWS Terraform Learning Track](docs/aws/README.md)
- [Google Cloud Terraform Learning Track](docs/gcp/README.md)
- [Azure Terraform Learning Track](docs/azure/README.md)

The lesson plan covers Terraform fundamentals, state, lifecycle, variables, modules, environments, CI, security, AWS, Google Cloud, Azure, multi-cloud comparison, and the Terraform/Kubernetes boundary.

## What the current lab builds

The first implementation is intentionally local and zero-cloud-cost:

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
terraform-infrastructure-lab/
├── .github/
│   └── workflows/
│       └── terraform-ci.yml
├── docs/
│   ├── README.md
│   ├── lesson-plan.md
│   ├── cloud-roadmap.md
│   ├── aws/
│   │   └── README.md
│   ├── gcp/
│   │   └── README.md
│   └── azure/
│       └── README.md
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   └── app/
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── versions.tf
└── backend.tf
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

## CI

GitHub Actions automatically checks Terraform changes on pushes and pull requests to `main` by running:

- `terraform fmt -check -recursive`
- `terraform init -backend=false -input=false`
- `terraform validate -no-color`

The workflow can also be started manually with `workflow_dispatch`.

## Skills this project practices

- Providers and resources
- Variables, locals, and outputs
- Modules and `for_each`
- Terraform state and lifecycle
- Environment-specific `.tfvars`
- `init`, `fmt`, `validate`, `plan`, `apply`, and `destroy`
- GitHub Actions Terraform CI
- Multi-cloud infrastructure concepts
- AWS, Google Cloud, and Azure provider learning
- Terraform-to-Kubernetes architecture

## Roadmap

The repo will grow in deliberate layers:

1. Local Docker Terraform fundamentals
2. TFLint and IaC security scanning
3. Pull-request plan review
4. Small AWS labs: identity, VPC, storage, compute, containers
5. Small Google Cloud labs: projects, VPC, storage, compute, containers
6. Small Azure labs: resource groups, identity, VNets, storage, compute, containers
7. Multi-cloud comparison exercises
8. Remote-state/team patterns
9. Kubernetes infrastructure with EKS/GKE/AKS only after the underlying networking and identity concepts are understood
