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
  profile = "terraform"
}

variable "vuejs_bucket" {
  description = "where the S3 website bucket should be created"
}

resource "aws_s3_bucket" "site" {
  bucket = "${var.vuejs_bucket}"
  
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  
  policy = <<EOF
{
  "Id": "site_bucket_policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "site_bucket_policy_root",
      "Action": ["s3:ListBucket"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.vuejs_bucket}",
      "Principal": {"AWS":"${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"}
    },
    {
      "Sid": "site_bucket_policy_all",
      "Action": ["s3:GetObject"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.vuejs_bucket}/*",
      "Principal": {"AWS":"${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"}
    }
  ]
}
EOF
}