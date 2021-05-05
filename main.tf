terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.26.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.0.1"
    }
  }
  required_version = "~> 0.14"

  backend "remote" {
    organization = "vuejs"

    workspaces {
      name = "vuejs-app"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

resource "aws_instance" "web" {
  ami           = "ami-lfjzkeghej"
  instance_type = "t3.micro"

  tags = {
    Name = "HelloWorld"
  }
}