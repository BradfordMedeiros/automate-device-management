#!/usr/bin/env bash

command="stork $*"
curl localhost:8000 -X POST -d "$command"
