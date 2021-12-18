FROM node:14.4.0-buster-slim
LABEL version=1.0.0

ENV USERNAME dev
RUN useradd -rm -d /home/dev -s /bin/bash -g root -G sudo -u 1005 ${USERNAME}

EXPOSE 3000

RUN apt update && apt install -y \
    git \
    procps

#used by react native builder to set the ip address, other wise 
#will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME="10.0.0.2"
ENV CHOKIDAR_USEPOLLING=true
COPY *.sh /
RUN chmod +x /entrypoint.sh \
    && chmod +x /get-source.sh

#https://github.com/nodejs/docker-node/issues/479#issuecomment-319446283
#should not install any global npm packages as root, a new user 
#is created and used here
USER $USERNAME

#set the npm global location for dev user
ENV NPM_CONFIG_PREFIX="/home/$USERNAME/.npm-global"

RUN mkdir -p ~/src \
    && mkdir ~/.npm-global \
    && npm install create-react-app --global

#append the .npm-global to path, other wise globally installed packages 
#will not be available in bash
ENV PATH="/home/$USERNAME/.npm-global:/home/$USERNAME/.npm-global/bin:${PATH}"

ENTRYPOINT ["/entrypoint.sh"]
CMD ["--gitRepo","NOTSET","--pat","NOTSET"]
