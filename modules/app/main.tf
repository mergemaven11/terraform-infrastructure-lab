resource "docker_image" "whoami" {
  name         = "traefik/whoami:v1.10"
  keep_locally = true
}

resource "docker_container" "whoami" {
  for_each = {
    for index in range(var.replicas) :
    tostring(index + 1) => index
  }

  name  = "${var.project_name}-${var.environment}-app-${each.key}"
  image = docker_image.whoami.image_id

  networks_advanced {
    name = var.network_name
  }

  ports {
    internal = 80
    external = var.app_start_port + each.value
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
