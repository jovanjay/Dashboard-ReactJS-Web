#!/bin/bash
# Deploy - Verson 1.0

#get params
#Help : "-h"

#Note : run the line of code to force to use node version and extend node option for max_old_space_size 
# nvm use 12.8 && export NODE_OPTIONS=--max_old_space_size=1024 

#help
if [ "$1" == "-h" ]; then 

  echo "help yourself..."

elif [ "$1" == "-site" ] && [ "$2" == "reactjs" ]; then
  rootDir=${PWD##*/}
  if [ "$3" == "-clean" ]; then  
    echo "Update APP branch"
    cd src/app/
    git fetch --all --prune && git checkout . && git pull
    cd ../../
    rootDir = ${PWD##*/}
  fi  
  
  if [ "$rootDir" == "reactjs" ]; then
    echo "Build file"
    npm run build

    echo "Navigate to public site"
    cd ../reactjs.jovanjay.com && pwd

    #delete all files
    cdir=${PWD##*/}
    if [ "$cdir" == "reactjs.jovanjay.com" ]; then
      
      #use -I for prompting user
      rm -RI *

      cp -R ../reactjs/build/* .
      vim index.html
    fi
  fi
fi
