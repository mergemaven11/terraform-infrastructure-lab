variable "environment" {
  description = "Environment name."
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging, or prod."
  }
}

variable "project_name" {
  description = "Base name used for Docker resources."
  type        = string
  default     = "terraform-docker-lab"
}

variable "nginx_port" {
  description = "Host port mapped to NGINX port 80."
  type        = number
  default     = 8080
}

variable "app_replicas" {
  description = "Number of whoami application containers."
  type        = number
  default     = 1

  validation {
    condition     = var.app_replicas >= 1 && var.app_replicas <= 5
    error_message = "app_replicas must be between 1 and 5."
  }
}

variable "app_start_port" {
  description = "First host port used for whoami containers."
  type        = number
  default     = 9000
}
