#!/bin/bash

#SFTP配置信息
#用户名
USER=root
#密码
PASSWORD=zhenghui940910@
#待上传文件根目录
SRCDIR=/Users/zhenghui/Desktop/Bcoin/Bcoin/dist
#上传服务器的目录
DESDIR=/home/WebContent/app
#IP
IP=118.24.194.85
#端口
PORT=22
#文件名
FILE=zhenghui.tar.gz
#获取文件
cd ${SRCDIR} ;
 
#删除上次打包的tar包
rm -rf zhenghui.tar.gz
#压缩dist下的所有文件
tar czvf zhenghui.tar.gz *

#上传项目
lftp -u ${USER},${PASSWORD} sftp://${IP}:${PORT} <<EOF
cd ${DESDIR}/
lcd ${SRCDIR}
put ${FILE}
by
EOF

#部署项目
ssh root@118.24.194.85 << remotessh   

cd /home/WebContent/app

rm -rf ./static ./index.html

tar zxvf zhenghui.tar.gz

echo "finished!"

exit 
remotessh 