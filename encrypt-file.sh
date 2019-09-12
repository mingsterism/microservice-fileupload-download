#!/bin/bash

# sysinfo_page - A script that encrypts fils with google kms

while getopts p:c:k:r: option; do
    case "${option}" in

    p) PLAINTXT=${OPTARG} ;;
    c) CIPHERTXT=${OPTARG} ;;
    r) KEYRING=${OPTARG} ;;
    k) KEY=${OPTARG} ;;
    esac
done

echo $PLAINTXT
echo $CIPHERTXT
echo $KEYRING
echo $KEY

gcloud kms encrypt \
    --plaintext-file="$PLAINTXT" \
    --ciphertext-file="$CIPHERTXT" \
    --location=global \
    --keyring="$KEYRING" \
    --key="$KEY" \
    --impersonate-service-account=zoa-service-acct@zoa001.iam.gserviceaccount.com
