#!/bin/bash

cd dist

cd /Users/zhenghui/Desktop/Bcoin/bcoin_app/Bcoin

rm -rf ./static index.html

cd -

cp -rf ./static ./index.html /Users/zhenghui/Desktop/Bcoin/bcoin_app/Bcoin 

echo "已更新Bcoin路径的的文件"