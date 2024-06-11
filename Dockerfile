FROM ubuntu:22.04

WORKDIR /install

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install -y sudo curl

ENV DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    apt install --quiet --yes --no-install-recommends tzdata && \
    dpkg-reconfigure --frontend noninteractive tzdata

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN nvm install node

WORKDIR /app

EXPOSE "3000"