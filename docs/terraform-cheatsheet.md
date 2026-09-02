# Terraform Cheat Sheet

A compact reference for the commands and concepts used throughout this lab.

## Core workflow

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
terraform destroy
```

## With environment variables file

```bash
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -var-file=environments/dev/terraform.tfvars
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## State inspection

```bash
terraform state list
terraform state show <resource-address>
terraform show
terraform output
```

## Useful planning options

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform plan -refresh-only
```

Treat saved plan files as potentially sensitive and do not commit them.

## Formatting and validation

```bash
terraform fmt
terraform fmt -recursive
terraform fmt -check -recursive
terraform validate
```

## Initialization

```bash
terraform init
terraform init -upgrade
terraform init -reconfigure
terraform init -backend=false
```

## Important files

| File | Purpose |
| --- | --- |
| `main.tf` | Main resources/module calls |
| `variables.tf` | Input variables |
| `outputs.tf` | Exported values |
| `providers.tf` | Provider configuration |
| `versions.tf` | Terraform/provider version requirements |
| `backend.tf` | State backend configuration |
| `*.tfvars` | Variable values |
| `.terraform.lock.hcl` | Selected provider versions/checksums |
| `terraform.tfstate` | Terraform state — do not commit |

## Plan symbols

| Symbol | Meaning |
| --- | --- |
| `+` | Create |
| `~` | Update in place |
| `-` | Destroy |
| `-/+` | Replace: destroy then create |
| `+/-` | Replace: create then destroy when supported |

## Mental model

```text
Terraform configuration
        +
Terraform state
        +
Provider-reported real infrastructure
        ↓
     PLAN
        ↓
Desired changes
```

## Troubleshooting sequence

```text
terraform fmt
      ↓
terraform init
      ↓
terraform validate
      ↓
terraform plan
      ↓
terraform apply
      ↓
provider/cloud/runtime checks
      ↓
state/drift inspection
```

## Multi-cloud vocabulary

| Concept | AWS | Google Cloud | Azure |
| --- | --- | --- | --- |
| Network | VPC | VPC network | VNet |
| Segment | Subnet | Subnetwork | Subnet |
| Traffic control | Security Group | Firewall rules | NSG |
| Object storage | S3 | Cloud Storage | Blob Storage |
| VM | EC2 | Compute Engine | Azure VM |
| Registry | ECR | Artifact Registry | ACR |
| Kubernetes | EKS | GKE | AKS |
| Identity | IAM | Cloud IAM | Entra ID / Azure RBAC concepts |

These are conceptual mappings, not promises that the services behave identically.

## Safety reminders

- Never commit credentials.
- Never commit Terraform state.
- Read every plan before apply.
- Use separate state for important environments.
- Destroy temporary cloud labs.
- Verify destruction completed.
- Treat production auto-apply as a privileged operation.
