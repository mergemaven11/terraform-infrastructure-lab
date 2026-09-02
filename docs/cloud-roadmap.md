# Multi-Cloud Terraform Roadmap

Adding AWS, Google Cloud, and Azure to this repository is a good fit for an infrastructure lab **if each provider stays isolated and intentional**.

The purpose is not to build the same giant platform four times. The purpose is to learn the infrastructure concepts that transfer between providers while understanding where each cloud differs.

## Concept mapping

| Concept | Local Docker | AWS | Google Cloud | Azure |
| --- | --- | --- | --- | --- |
| Provider boundary | Docker Engine | AWS account/region | GCP project/region | Subscription/tenant/region |
| Organizational container | Local project | Account/tag structure | Project | Resource group |
| Network | Docker network | VPC | VPC network | Virtual Network (VNet) |
| Network segment | — | Subnet | Subnetwork | Subnet |
| Traffic rules | Port mappings | Security groups/NACL concepts | Firewall rules | Network Security Groups |
| Object storage | Volume/file | S3 | Cloud Storage | Blob Storage |
| Identity | Local Docker access | IAM | Cloud IAM | Microsoft Entra ID / Azure RBAC |
| VM compute | Container host | EC2 | Compute Engine | Azure Virtual Machines |
| Container registry | Local image cache | ECR | Artifact Registry | Azure Container Registry |
| Managed Kubernetes | Local kind/minikube later | EKS | GKE | AKS |

## Recommended repository organization

```text
labs/
├── docker/
│   └── ...
├── aws/
│   ├── 01-provider/
│   ├── 02-networking/
│   ├── 03-storage/
│   ├── 04-compute/
│   └── 05-containers/
├── gcp/
│   ├── 01-provider/
│   ├── 02-networking/
│   ├── 03-storage/
│   ├── 04-compute/
│   └── 05-containers/
└── azure/
    ├── 01-provider/
    ├── 02-networking/
    ├── 03-storage/
    ├── 04-compute/
    └── 05-containers/
```

Each lab should have:

- a small goal
- required variables
- outputs
- README instructions
- cost warning when applicable
- `terraform plan`
- `terraform apply`
- verification step
- `terraform destroy`

## What should be shared?

Share concepts and module patterns carefully.

Good candidates:

- naming conventions
- tags/labels
- variable conventions
- validation patterns
- CI standards
- documentation structure

Avoid pretending AWS, GCP, and Azure resources are identical. Provider-specific infrastructure should remain provider-specific when abstraction makes the code harder to understand.

## Credential safety

Never commit:

- AWS access keys
- GCP service-account JSON keys
- Azure client secrets or service-principal credentials
- `.env` files containing secrets
- Terraform state
- generated plan files containing sensitive values

Prefer short-lived or locally configured credentials and least-privilege identities.

## Cost safety

Cloud labs can create billable resources.

For every lab:

1. Check what resources will be created.
2. Read the Terraform plan.
3. Keep the scope intentionally small.
4. Verify the resource after apply.
5. Destroy it as soon as the exercise is complete.
6. Confirm the destroy completed.

Do not make expensive services such as EKS, GKE, or AKS the first cloud exercise.

## Recommended learning order

1. Local Docker Terraform mechanics
2. AWS fundamentals
3. Google Cloud fundamentals
4. Azure fundamentals
5. Compare networking, identity, storage, compute, and container services across all three clouds
6. Learn remote state and team workflows
7. Move into EKS, GKE, and AKS only after networking and identity concepts are comfortable

## End goal

By the end of the multi-cloud track, you should be able to look at a requirement such as:

> Create an isolated network, allow controlled inbound traffic, deploy compute, expose useful outputs, and manage it safely through CI.

…and implement the idea in Docker, AWS, Google Cloud, or Azure while understanding the provider-specific differences.
