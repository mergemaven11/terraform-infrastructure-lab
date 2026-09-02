output "environment" {
  description = "Selected environment."
  value       = var.environment
}

output "nginx_url" {
  description = "URL for the NGINX container."
  value       = "http://localhost:${var.nginx_port}"
}

output "app_urls" {
  description = "URLs for the whoami application containers."
  value       = module.app.app_urls
}

output "docker_network" {
  description = "Docker network created by Terraform."
  value       = docker_network.app.name
}
