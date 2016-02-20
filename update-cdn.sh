#!/bin/bash

gcloud components update
gsutil -m rsync -r -d public gs://static.q42.nl
