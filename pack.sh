#!/bin/bash

cd dist

cd /Users/zhenghui/Desktop/Bcoin/bcoin_app/Bcoin

rm -rf ./static index.html

cd -

echo pwd

cp -rf ./static ./index.html /Users/zhenghui/Desktop/Bcoin/bcoin_app/Bcoin 

echo "finished!"