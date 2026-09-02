# Infrastructure Learning Hub

This directory turns `terraform-infrastructure-lab` into a guided hands-on learning project rather than a collection of Terraform files.

## Learning path

1. [Terraform Lesson Plan](./lesson-plan.md)
2. [Multi-Cloud Roadmap](./cloud-roadmap.md)
3. [AWS Learning Track](./aws/README.md)
4. [Google Cloud Learning Track](./gcp/README.md)

## Core goal

Build enough understanding to explain not only **what** a Terraform configuration does, but also:

- why a resource exists
- how Terraform decides what must change
- where state fits into the workflow
- how modules improve reuse
- how environments should be separated
- how CI checks infrastructure changes
- how Terraform maps the same infrastructure concepts across Docker, AWS, Google Cloud, and Kubernetes

## Ground rules

- Learn locally first when possible.
- Read every `terraform plan` before applying it.
- Never commit secrets, credentials, service-account keys, or Terraform state containing sensitive values.
- Prefer small labs that can be destroyed immediately after use.
- Treat `terraform destroy` as part of every cloud lab.
- Keep provider-specific code isolated so the repository remains understandable.

## Suggested repository direction

```text
terraform-infrastructure-lab/
├── docs/
│   ├── lesson-plan.md
│   ├── cloud-roadmap.md
│   ├── aws/
│   └── gcp/
├── modules/
│   └── app/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── labs/
│   ├── docker/
│   ├── aws/
│   └── gcp/
└── .github/workflows/
```

The existing Docker lab remains the safest place to learn Terraform mechanics before introducing cloud accounts, IAM, billing, networking, and managed services.
