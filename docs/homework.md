# Terraform Homework

The point of this homework is to build **working understanding**, not memorize syntax.

For every assignment:

1. Write down what you predict Terraform will do.
2. Run the command.
3. Compare the real result with your prediction.
4. Explain *why* Terraform behaved that way.
5. Commit your work with a meaningful Git message when the assignment changes code.

---

## Homework 1 — Read the Plan

**Goal:** Understand what a Terraform plan is telling you.

Tasks:

- Run `terraform init`.
- Run `terraform plan -var-file=environments/dev/terraform.tfvars`.
- Identify every resource Terraform wants to create.
- For each resource, write one sentence explaining why it exists.
- Find at least one value that is known before apply and one that is known only after apply.

Deliverable:

- A short note explaining the plan in your own words.

Pass condition:

- You can explain `+`, `~`, `-`, and `-/+` plan actions without looking them up.

---

## Homework 2 — Variables and Change Prediction

**Goal:** Learn how inputs affect infrastructure.

Tasks:

- Change the dev NGINX host port.
- Before running Terraform, predict whether the container will update in place or be replaced.
- Run `terraform plan`.
- Record whether your prediction was correct.
- Restore the original value when finished.

Bonus:

- Change `app_replicas` from 1 to 3 and predict the resulting resource addresses.

---

## Homework 3 — Terraform State Detective

**Goal:** Understand why Terraform needs state.

Tasks:

- Apply the local Docker lab.
- Run `terraform state list`.
- Pick one resource address.
- Find the matching resource in the Terraform configuration.
- Find the actual matching Docker object.
- Explain the relationship among configuration, state, provider, and real infrastructure.

Do **not** manually edit the state file.

Pass condition:

- You can explain state without saying only "Terraform saves stuff there."

---

## Homework 4 — Module Trace

**Goal:** Understand reusable modules.

Trace the existing `module "app"` call.

Write down:

- where the module is called
- where its source code lives
- every input passed into it
- resources it creates
- outputs returned from it

Challenge:

Add one harmless input to the module, such as a configurable container label, and expose it from the root module.

---

## Homework 5 — Break It on Purpose

**Goal:** Practice troubleshooting instead of only happy-path deployment.

Introduce **one** controlled error at a time:

- invalid variable type
- nonexistent module path
- malformed Terraform syntax
- duplicate Docker host port
- invalid provider configuration

For each error record:

1. command run
2. error message
3. likely layer of failure
4. root cause
5. fix
6. what would have prevented it

Restore the repository after each exercise.

---

## Homework 6 — CI Failure and Recovery

**Goal:** Understand Terraform CI.

On a temporary branch:

- intentionally misformat a `.tf` file
- push it
- observe GitHub Actions fail
- identify the failed CI step
- fix formatting with `terraform fmt`
- push again
- confirm CI passes

Explain:

- what CI caught
- what CI did **not** prove about the infrastructure
- why `terraform apply` should not casually run on every push

---

## Homework 7 — Environment Design

**Goal:** Understand environment separation.

Compare dev, staging, and prod `.tfvars` files.

Answer:

- Which values should differ by environment?
- Which values should remain shared?
- Why do `.tfvars` files alone not isolate Terraform state?
- What could happen if dev and prod accidentally share the same state?

Design, but do not necessarily implement yet, a safer state layout for all three environments.

---

## Homework 8 — Multi-Cloud Translation

**Goal:** Learn concepts instead of vendor vocabulary.

Complete this table from memory, then verify your answers:

| Concept | AWS | Google Cloud | Azure |
| --- | --- | --- | --- |
| Network | ? | ? | ? |
| Network segment | ? | ? | ? |
| Traffic control | ? | ? | ? |
| Object storage | ? | ? | ? |
| Virtual machine | ? | ? | ? |
| Container registry | ? | ? | ? |
| Managed Kubernetes | ? | ? | ? |
| Identity system | ? | ? | ? |

Then explain which concepts are truly equivalent and which are only roughly analogous.

---

## Homework 9 — First AWS Lab

**Goal:** Use Terraform with a real cloud provider safely.

Before apply:

- verify your AWS identity
- inspect every planned resource
- estimate whether any resource can generate cost
- confirm credentials are not stored in Git

Build one intentionally small lab such as:

- provider configuration plus identity/data source, or
- a small tagged S3 bucket exercise

Then destroy all temporary resources and verify destruction.

---

## Homework 10 — First Google Cloud Lab

Repeat the same discipline used for AWS:

- verify project/account context
- configure the Google provider
- plan first
- create one minimal resource
- verify it
- destroy it

Write down how project scoping differs from AWS account/region scoping.

---

## Homework 11 — First Azure Lab

Practice:

- verify subscription context
- configure `azurerm`
- create a small resource group
- output its name/location
- destroy it

Explain:

- tenant vs subscription
- what a resource group does
- how Azure's organization model differs from AWS and Google Cloud

---

## Homework 12 — Final Platform Challenge

**Goal:** Think like a platform engineer.

Requirement:

> A development team needs isolated networking, a deployable application, controlled inbound traffic, environment-specific configuration, repeatable infrastructure, CI validation, and documented teardown instructions.

Design a Terraform solution.

Your submission should include:

- architecture diagram
- module boundaries
- variables
- outputs
- environment strategy
- state strategy
- CI checks
- security considerations
- cost considerations
- troubleshooting checklist
- destroy/rollback procedure

Do the design once for one cloud. Then describe how you would translate it to the other two clouds.

---

# Homework scoring rubric

Score each assignment from 0–3:

| Score | Meaning |
| --- | --- |
| 0 | Not attempted |
| 1 | Completed by following steps but cannot explain why |
| 2 | Completed and can explain the important concepts |
| 3 | Completed, can explain it, and can troubleshoot a variation without instructions |

The goal is not a perfect score immediately. The goal is moving assignments from **1 → 2 → 3** over time.
