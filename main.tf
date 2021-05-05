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




resource "aws_s3_bucket" "site" {
  bucket = "vuejs_bucket"
  
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  
#   policy = <<EOF
# {
#   "Id": "site_bucket_policy",
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Sid": "site_bucket_policy_root",
#       "Action": ["s3:ListBucket"],
#       "Effect": "Allow",
#       "Resource": "arn:aws:s3:::${var.bucket_name}",
#       "Principal": {"AWS":"${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"}
#     },
#     {
#       "Sid": "site_bucket_policy_all",
#       "Action": ["s3:GetObject"],
#       "Effect": "Allow",
#       "Resource": "arn:aws:s3:::${var.bucket_name}/*",
#       "Principal": {"AWS":"${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"}
#     }
#   ]
# }
# EOF
}

# resource "aws_cloudfront_distribution" "site" {
#   enabled = true
#   is_ipv6_enabled = true
#   default_root_object = "index.html"
  
#   origin {
#     domain_name = "${aws_s3_bucket.site.bucket_domain_name}"
#     origin_id = "${var.bucket_name}"
    
#     s3_origin_config {
#       origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
#     }
#   }
  
#   viewer_certificate {
#     cloudfront_default_certificate = true
#   }
  
#   custom_error_response {
#     error_code = 403
#     response_code = 200
#     response_page_path = "/index.html"
#   }
  
#   custom_error_response {
#     error_code = 404
#     response_code = 200
#     response_page_path = "/index.html"
#   }
  
#   default_cache_behavior {
#     allowed_methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"]
#     cached_methods = ["GET", "HEAD"]
#     target_origin_id = "${var.bucket_name}"
    
#     forwarded_values {
#       query_string = true

#       cookies {
#         forward = "none"
#       }
#     }
    
#     viewer_protocol_policy = "redirect-to-https"
#     min_ttl = 0
#     default_ttl = 3600
#     max_ttl = 86400
#   }
  
#   restrictions {
#     geo_restriction {
#       restriction_type = "none"
#     }
#   }
  
#   price_class = "PriceClass_100"
# }

# resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
#   comment = "Origin Access Identity for S3"
# }

# output "cloudfront"{
#   value = "${aws_cloudfront_distribution.site.domain_name}"
# }