# Terraform Infrastructure Lesson Plan

This plan is designed to build real understanding, not just command memorization.

## How to use this plan

For each lesson:

1. Read the concept.
2. Predict what Terraform will do.
3. Run the command.
4. Compare the result with your prediction.
5. Explain the result in your own words.
6. Break something on purpose and troubleshoot it.
7. Destroy temporary infrastructure when finished.

---

## Phase 1 — Terraform Fundamentals

### Lesson 1: What Terraform actually does

Learn:

- Infrastructure as Code
- declarative vs imperative configuration
- providers
- resources
- configuration vs real infrastructure
- Terraform state

Practice:

```bash
terraform version
terraform init
terraform fmt -recursive
terraform validate
terraform plan -var-file=environments/dev/terraform.tfvars
```

Be able to explain:

> Terraform compares configuration, state, and provider-reported infrastructure to determine the actions required to reach the desired state.

### Lesson 2: Providers and resources

Use the Docker provider in this repository.

Understand:

- provider plugins
- resource addresses
- arguments vs exported attributes
- dependencies
- implicit references

Lab:

- find the Docker network resource
- find the NGINX container resource
- identify which values are inputs
- identify which values come from another resource

### Lesson 3: Variables, locals, and outputs

Learn:

- `variable`
- types
- defaults
- validation
- `.tfvars`
- `locals`
- `output`

Lab:

Change the dev NGINX port, run `terraform plan`, and explain exactly why Terraform proposes the resulting change.

---

## Phase 2 — State and the Terraform Lifecycle

### Lesson 4: State

Learn:

- why Terraform needs state
- resource addresses
- local state
- state drift
- why state may contain sensitive values
- why state files should not be committed to Git

Commands to recognize:

```bash
terraform state list
terraform show
terraform output
```

Lab:

Apply the Docker lab and compare:

- configuration
- `terraform.tfstate`
- actual Docker resources

Do not edit state manually.

### Lesson 5: Plan, apply, change, destroy

Practice the full lifecycle:

```bash
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -var-file=environments/dev/terraform.tfvars
terraform plan -var-file=environments/dev/terraform.tfvars
terraform destroy -var-file=environments/dev/terraform.tfvars
```

Understand why the second plan should normally report no changes.

---

## Phase 3 — Reusable Infrastructure

### Lesson 6: Modules

Learn:

- root module
- child modules
- module inputs
- module outputs
- reusable infrastructure patterns

Lab:

Trace the existing `module "app"` call from the root configuration into `modules/app/`.

Be able to answer:

- What values enter the module?
- What resources does the module create?
- What values come back out?

### Lesson 7: `for_each` and repeatable resources

Learn:

- `count`
- `for_each`
- maps
- stable resource addresses

Lab:

Increase `app_replicas` in the staging environment and predict the resulting resource addresses before running the plan.

---

## Phase 4 — Environments and Team Workflows

### Lesson 8: Dev, staging, and prod

Learn why environments need clear separation.

Compare:

- `environments/dev/terraform.tfvars`
- `environments/staging/terraform.tfvars`
- `environments/prod/terraform.tfvars`

Understand that `.tfvars` files alone do **not** provide state isolation. Production systems normally combine environment inputs with separate state/workspaces/directories or another deliberate isolation model.

### Lesson 9: CI for Terraform

The repository's GitHub Actions workflow should automatically check Terraform changes.

Understand:

```text
Push / Pull Request
        ↓
terraform fmt -check
        ↓
terraform init -backend=false
        ↓
terraform validate
        ↓
Pass / Fail
```

Know the difference between:

- Continuous Integration (CI)
- Continuous Delivery/Deployment (CD)

For infrastructure, automatically **applying** changes deserves substantially more protection than automatically validating them.

---

## Phase 5 — Quality and Security

### Lesson 10: Infrastructure quality gates

Next tools to learn:

- TFLint
- Checkov or another IaC security scanner
- provider lock files
- pre-commit hooks
- pull-request plan review

Questions to answer:

- Is the Terraform syntactically valid?
- Is it formatted consistently?
- Is the provider configuration sensible?
- Are there obvious security problems?
- What exactly will the plan change?

---

## Phase 6 — AWS

Follow [AWS Learning Track](./aws/README.md).

Start by mapping Terraform concepts to:

- VPC
- subnets
- route tables
- internet gateways
- security groups
- IAM
- S3
- compute/container services

Do not jump immediately to EKS. Networking, IAM, and state management make EKS much easier to understand later.

---

## Phase 7 — Google Cloud

Follow [Google Cloud Learning Track](./gcp/README.md).

Map the same ideas to:

- projects
- VPC networks
- subnets
- firewall rules
- IAM
- Cloud Storage
- Compute Engine
- Artifact Registry
- GKE

The goal is to recognize infrastructure concepts across providers rather than memorizing provider-specific resource names.

---

## Phase 8 — Kubernetes + Terraform

After Terraform, AWS, and Google Cloud fundamentals are comfortable, connect Terraform to Kubernetes.

Understand the boundary:

```text
Terraform
   ↓
creates infrastructure / cluster
   ↓
Kubernetes API
   ↓
Deployments, Services, ConfigMaps, Secrets, etc.
```

A useful rule of thumb:

- Terraform manages infrastructure lifecycle well.
- Kubernetes manifests/Helm manage workloads inside Kubernetes well.

Avoid forcing Terraform to own everything simply because it can.

---

# Suggested 8-Week Schedule

| Week | Focus | Deliverable |
| --- | --- | --- |
| 1 | Terraform basics | Explain init/plan/apply/state |
| 2 | Variables + outputs | Modify dev configuration safely |
| 3 | Modules + for_each | Extend the Docker app module |
| 4 | State + CI + security | CI passing and quality tools understood |
| 5 | AWS fundamentals | First small AWS Terraform lab |
| 6 | AWS networking/IAM | Reusable AWS module exercise |
| 7 | Google Cloud fundamentals | First small GCP Terraform lab |
| 8 | Kubernetes connection | Explain Terraform-to-cluster architecture |

# Graduation checklist

You should eventually be able to answer these without guessing:

- What does `terraform init` initialize?
- What information does Terraform use to create a plan?
- Why is state needed?
- What causes resource replacement instead of an in-place update?
- Why use a module?
- What is the difference between a variable and an output?
- What is the difference between `count` and `for_each`?
- Why should state usually be remote for a team?
- Why should state locking matter?
- Why should cloud credentials never be committed?
- What does CI protect us from?
- How would you troubleshoot a failed Terraform plan?
- How do AWS and Google Cloud express the same networking concepts differently?
- Where should Terraform stop and Kubernetes/Helm begin?

If you can explain those clearly and demonstrate them in this repo, you are building practical Terraform understanding rather than tutorial-only familiarity.
