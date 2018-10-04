#!/usr/bin/env bash
bundle exec ridgepole --config database.yml \
    --file Schemafile \
    -E development \
    --apply