#!/bin/bash
# Verson 1.0

nvm use 12.8 && export NODE_OPTIONS=--max_old_space_size=1024 && npm run build