# Terraform + Multi-Cloud Interview Questions

Use these as self-tests. Answer out loud before checking documentation.

## Terraform fundamentals

1. What problem does Terraform solve?
2. What is the difference between declarative and imperative infrastructure management?
3. What does `terraform init` actually do?
4. What information does Terraform use when creating a plan?
5. What is Terraform state and why is it necessary?
6. What is the difference between `terraform validate` and `terraform plan`?
7. What causes a resource to be replaced instead of updated in place?
8. What is drift?
9. Why should Terraform state usually not be committed to Git?
10. What is the difference between an input variable, local value, and output?

## Modules and language

11. What is a root module?
12. When should you create a child module?
13. When can modules become over-engineering?
14. Compare `count` and `for_each`.
15. How does Terraform infer dependencies?
16. When is `depends_on` appropriate?
17. Why are stable resource addresses important?

## State and team workflows

18. Why use a remote backend?
19. What is state locking trying to prevent?
20. How would you isolate dev, staging, and prod?
21. What would you do if an existing cloud resource needs to become Terraform-managed?
22. Why is manually editing state dangerous?
23. What is a plan file and why can it contain sensitive information?

## CI/CD

24. What should Terraform CI check on every pull request?
25. Why is automatically running `terraform apply` more dangerous than automatically running `terraform validate`?
26. What is the value of showing a Terraform plan during code review?
27. How would you prevent unreviewed infrastructure changes from reaching production?

## Troubleshooting

28. `terraform init` fails. What layers would you investigate?
29. `terraform validate` succeeds but `terraform plan` fails. What does that suggest?
30. A plan succeeds but apply fails with `403`. What is likely happening?
31. A resource was manually deleted in the cloud. What do you expect the next plan to show?
32. Terraform wants to recreate a resource you expected it to update. How would you investigate?
33. How would you distinguish authentication failure from authorization failure?

## AWS

34. What is the relationship among an AWS account, region, VPC, and subnet?
35. What is a security group?
36. What is IAM used for?
37. What is S3?
38. What is ECR?
39. At a high level, what infrastructure does EKS depend on?

## Google Cloud

40. How does a GCP project affect resource scope?
41. What is a VPC network in Google Cloud?
42. How do firewall rules differ conceptually from AWS security groups?
43. What is Artifact Registry?
44. What is GKE?

## Azure

45. What is the difference between an Azure tenant and subscription?
46. What purpose does a resource group serve?
47. What is a VNet?
48. What is an NSG?
49. What is ACR?
50. What is AKS?

## Multi-cloud architecture

51. Map these concepts across AWS, GCP, and Azure: network, subnet, object storage, VM, container registry, managed Kubernetes.
52. Which cloud concepts look equivalent but behave differently enough that you should avoid hiding them behind one giant generic module?
53. How would you design a reusable naming/tagging convention across all three clouds?
54. How would you keep provider credentials out of Terraform code and GitHub?
55. How would you prevent a learning lab from generating an unexpected cloud bill?

## Terraform + Kubernetes

56. What should Terraform provision around a Kubernetes cluster?
57. What should Kubernetes manifests or Helm generally manage instead?
58. Why can putting every Kubernetes workload into Terraform become awkward?
59. How do IAM, networking, and Kubernetes intersect in EKS/GKE/AKS?
60. When troubleshooting an unreachable application, how would you reason from cloud infrastructure down to the Kubernetes workload?

## Scenario questions

### Scenario 1

A developer changes a subnet CIDR in Terraform and the plan proposes several replacements. What do you inspect before approving?

### Scenario 2

Two engineers run `terraform apply` against the same environment simultaneously. What risk exists and what feature helps prevent it?

### Scenario 3

CI reports valid formatting and syntax, but the cloud deployment later fails because the identity lacks permission. Why did CI pass and what additional checks could help?

### Scenario 4

A company asks for one module that deploys an identical application stack to AWS, GCP, and Azure. What parts would you standardize and what parts would you deliberately keep provider-specific?

### Scenario 5

A Kubernetes Service exists and Pods are healthy, but the application is unreachable from the internet. Describe how you would troubleshoot from DNS/ingress/load balancer through cloud networking and finally into the cluster.

# Interview practice rule

A strong answer should include:

- the concept
- why it matters
- one practical example
- one failure mode or tradeoff

If you can answer the questions that way instead of reciting definitions, you are much closer to job-ready understanding.
