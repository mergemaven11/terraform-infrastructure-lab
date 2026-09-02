output "app_urls" {
  value = {
    for key, container in docker_container.whoami :
    key => "http://localhost:${container.ports[0].external}"
  }
}
