#!/bin/bash

java -cp libs -jar libs/kinki-land-*.jar & echo $! > ./pid.file &