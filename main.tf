locals {
  name_prefix = "${var.project_name}-${var.environment}"
}

resource "docker_network" "app" {
  name = "${local.name_prefix}-network"
}

resource "docker_image" "nginx" {
  name         = "nginx:1.27-alpine"
  keep_locally = true
}

resource "docker_container" "nginx" {
  name  = "${local.name_prefix}-nginx"
  image = docker_image.nginx.image_id

  networks_advanced {
    name = docker_network.app.name
  }

  ports {
    internal = 80
    external = var.nginx_port
  }

  labels {
    label = "managed-by"
    value = "terraform"
  }

  labels {
    label = "environment"
    value = var.environment
  }
}

module "app" {
  source = "./modules/app"

  project_name   = var.project_name
  environment    = var.environment
  network_name   = docker_network.app.name
  replicas       = var.app_replicas
  app_start_port = var.app_start_port
}
