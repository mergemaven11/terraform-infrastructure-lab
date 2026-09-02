# Terraform Troubleshooting Labs

These labs are intentionally broken. The goal is to diagnose the layer of failure before changing code.

## Troubleshooting order

Use this sequence:

1. **Syntax/configuration** — can Terraform parse the files?
2. **Initialization** — are providers/modules available?
3. **Validation** — is the configuration internally valid?
4. **Planning** — can Terraform resolve provider data and build a plan?
5. **Apply/runtime** — did the provider successfully create/change the resource?
6. **State** — does Terraform's state agree with reality?
7. **External system** — Docker/cloud/network/service behavior after creation.

Useful commands:

```bash
terraform fmt -check -recursive
terraform init
terraform validate
terraform plan
terraform state list
terraform show
```

## Lab 1 — Terraform will not parse

Create a controlled syntax error such as a missing brace.

Answer:

- Which command catches it first?
- Does Terraform contact the provider?
- What line does the error reference?

## Lab 2 — Provider initialization failure

Temporarily introduce an invalid provider source/version constraint.

Diagnose:

- why `terraform init` fails
- what the `.terraform` directory is for
- what the provider lock file contributes

Restore the correct provider configuration afterward.

## Lab 3 — Wrong variable type

Pass a string where a number is expected.

Identify whether the failure occurs during parsing, validation, planning, or apply and explain why.

## Lab 4 — Port collision

Run the Docker lab, then deliberately configure a second service to claim the same host port.

Determine:

- whether Terraform can build a plan
- where the actual failure happens
- whether the state changes
- what cleanup is needed

## Lab 5 — Drift

Apply the Docker lab, then manually change or remove a Terraform-managed Docker object outside Terraform.

Run `terraform plan` and observe how Terraform detects the difference.

Explain:

- configuration
- state
- observed remote/local infrastructure
- drift reconciliation

## Lab 6 — Missing module

Temporarily change a module source to a path that does not exist.

Determine why `terraform init` is relevant to modules and providers.

## Lab 7 — CI-only failure

Create a temporary branch with formatting that is valid Terraform but fails `terraform fmt -check`.

Compare:

- local `terraform validate`
- CI formatting gate

Explain why both checks exist.

## Lab 8 — Authentication failure

When you begin cloud labs, intentionally test what an expired/missing credential error looks like **without exposing credentials**.

Classify whether the error comes from Terraform itself or the cloud provider/API.

## Lab 9 — Permission denied

Using a deliberately limited lab identity later, attempt a harmless operation it cannot perform.

Explain:

- authentication vs authorization
- least privilege
- why Terraform cannot bypass cloud IAM

## Lab 10 — State mismatch thought exercise

Scenario:

> A resource exists in the cloud, but Terraform does not have it in the current state.

Answer:

- Will Terraform automatically manage it?
- What might happen if configuration also declares an object with the same external name?
- When would `terraform import` be relevant?
- Why should you inspect before importing?

## Incident report template

For every troubleshooting lab, write:

```text
Symptom:
Command:
Error:
Failure layer:
Hypothesis:
Evidence:
Root cause:
Fix:
Validation:
Prevention:
```

This is intentionally similar to real infrastructure/support incident thinking.
