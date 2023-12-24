#!/bin/bash

# 构建 Docker 镜像
docker build -t gemini_express_api .

# 标记镜像
docker tag gemini_express_api idcims/gemini_express_api:latest

# 推送镜像到 Docker 仓库
docker push idcims/gemini_express_api:latest
