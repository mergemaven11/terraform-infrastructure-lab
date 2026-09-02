# Infrastructure Learning Hub

This directory turns `terraform-infrastructure-lab` into a guided hands-on learning project rather than a collection of Terraform files.

## Learning path

1. [Terraform Lesson Plan](./lesson-plan.md)
2. [Terraform Homework](./homework.md)
3. [Troubleshooting Labs](./troubleshooting-labs.md)
4. [Learning Progress Checklist](./progress-checklist.md)
5. [Terraform + Multi-Cloud Interview Questions](./interview-questions.md)
6. [Multi-Cloud Roadmap](./cloud-roadmap.md)
7. [AWS Learning Track](./aws/README.md)
8. [Google Cloud Learning Track](./gcp/README.md)
9. [Azure Learning Track](./azure/README.md)

## Core goal

Build enough understanding to explain not only **what** a Terraform configuration does, but also:

- why a resource exists
- how Terraform decides what must change
- where state fits into the workflow
- how modules improve reuse
- how environments should be separated
- how CI checks infrastructure changes
- how Terraform maps the same infrastructure concepts across Docker, AWS, Google Cloud, Azure, and Kubernetes
- how to diagnose failures without blindly changing code

## Study loop

For each topic, use this loop:

```text
Learn concept
    ↓
Predict behavior
    ↓
Build / change lab
    ↓
Read Terraform plan
    ↓
Break something intentionally
    ↓
Troubleshoot it
    ↓
Explain it in your own words
    ↓
Check skill off only when repeatable
```

The homework scoring rubric intentionally distinguishes between **following instructions**, **understanding**, and **independent troubleshooting**.

## Ground rules

- Learn locally first when possible.
- Read every `terraform plan` before applying it.
- Never commit secrets, credentials, service-account keys, client secrets, or Terraform state containing sensitive values.
- Prefer small labs that can be destroyed immediately after use.
- Treat `terraform destroy` as part of every cloud lab.
- Keep provider-specific code isolated so the repository remains understandable.
- Predict before running commands whenever practical.
- Break labs only in controlled environments that are safe to destroy.

## Suggested repository direction

```text
terraform-infrastructure-lab/
├── docs/
│   ├── lesson-plan.md
│   ├── homework.md
│   ├── troubleshooting-labs.md
│   ├── progress-checklist.md
│   ├── interview-questions.md
│   ├── cloud-roadmap.md
│   ├── aws/
│   ├── gcp/
│   └── azure/
├── modules/
│   └── app/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── labs/
│   ├── docker/
│   ├── aws/
│   ├── gcp/
│   └── azure/
└── .github/workflows/
```

The existing Docker lab remains the safest place to learn Terraform mechanics before introducing cloud accounts, IAM/identity, billing, networking, and managed services.
