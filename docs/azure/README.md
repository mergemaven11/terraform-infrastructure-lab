# Azure Terraform Learning Track

This track adds Microsoft Azure to the multi-cloud learning path without mixing provider-specific code together.

The goal is to learn how the same infrastructure ideas appear in Azure and how the `azurerm` provider represents them in Terraform.

## Learning order

### 1. Provider + identity

Learn:

- Azure subscriptions
- tenants
- resource groups
- Azure CLI authentication
- service principals and workload identity concepts
- the `azurerm` Terraform provider

Practice goals:

- authenticate without committing credentials
- configure the provider
- read the current subscription context
- create a small resource group
- destroy it cleanly

### 2. Networking

Learn:

- Virtual Networks (VNets)
- subnets
- Network Security Groups (NSGs)
- route tables
- public IPs
- private vs public connectivity

Compare directly with AWS VPCs and Google Cloud VPC networks.

### 3. Storage

Learn:

- storage accounts
- blob containers
- access tiers
- encryption concepts
- Terraform state in Azure Storage

### 4. Compute

Learn:

- Virtual Machines
- NICs
- managed disks
- VM sizes
- cloud-init / bootstrap concepts

Keep VM labs intentionally small and destroy them when finished.

### 5. Containers

Learn:

- Azure Container Registry (ACR)
- Azure Container Apps / container-oriented services
- when AKS is appropriate

Do not start with AKS. Understand identity, VNets, subnets, NSGs, registries, and Terraform state first.

### 6. Managed Kubernetes

Later, learn:

- Azure Kubernetes Service (AKS)
- node pools
- cluster identity
- VNet integration
- ACR integration
- Terraform's role vs Helm/Kubernetes manifests

## Suggested lab structure

```text
labs/azure/
├── 01-provider/
├── 02-networking/
├── 03-storage/
├── 04-compute/
├── 05-containers/
└── 06-aks/
```

Each lab should include:

- a focused learning objective
- variables and outputs
- a cost note
- `terraform plan`
- `terraform apply`
- a verification step
- `terraform destroy`

## Important credential rule

Never commit:

- client secrets
- subscription credentials
- service-principal secrets
- `.env` credential files
- Terraform state containing secrets

Prefer Azure CLI authentication for local learning and short-lived/workload identities for automated environments where practical.

## Concept map

| Terraform idea | Azure example |
| --- | --- |
| Provider | `azurerm` |
| Account boundary | Subscription / tenant |
| Organizational container | Resource group |
| Network | Virtual Network (VNet) |
| Network segment | Subnet |
| Traffic control | Network Security Group |
| Object storage | Blob Storage |
| VM compute | Azure Virtual Machines |
| Container registry | Azure Container Registry |
| Managed Kubernetes | AKS |

## Graduation goal

You should be able to explain how an Azure resource group, VNet, subnet, NSG, identity, storage account, VM, ACR registry, and AKS cluster fit together — and how Terraform tracks their lifecycle through state and plans.