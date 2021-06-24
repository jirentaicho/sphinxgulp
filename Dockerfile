FROM node
# python,sphinxなどのインストール
RUN apt-get update
RUN apt-get install python3
RUN apt-get install python3-pip -y
RUN pip3 install --upgrade pip
RUN pip3 install -U sphinx

# 作業場所(ディレクトリ)の指定
WORKDIR /usr/src/app
# gulpなどをインストール
RUN npm i -g gulp
RUN npm i browser-sync
RUN npm link gulp

