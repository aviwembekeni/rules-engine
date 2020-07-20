FROM node:alpine
# PROJECT arg to be passed in from docker-compose and/or .env file
ARG PROJECT=unnamedProject

# Base Development Packages
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates wget && update-ca-certificates
RUN apk add --no-cache --update \
  git \
  curl \
  openssh \
  bash \
  python3 \
  groff \
  less \
  make \
  ncurses \
  vim \
  nano \
  rsync \
  xterm

#Update Python 3 PIP
RUN python3 -m ensurepip && \
  rm -r /usr/lib/python*/ensurepip && \
  pip3 install --upgrade pip setuptools && \
  if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
  if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi

ENV TERM xterm-256color

# AWS CLI
RUN pip install --upgrade pip
RUN pip install awscli

# Ceanup
RUN rm /var/cache/apk/*

# Working Folder
RUN mkdir -p /${PROJECT}/
COPY package.json yarn.lock /${PROJECT}/
WORKDIR /${PROJECT}

# NPM and Yarn Installs
# TODO: rationalise when we're using Yarn vs NPM. Right now, we're using NPM for globals and Yarn for locals.
RUN npm install -g try-thread-sleep
RUN npm install -g serverless --ignore-scripts spawn-sync
RUN yarn

# Slightly more boring Docker Prompt (doesn't need ncurses anymore, and multi-line seems to be fixed)
RUN printf 'export PS1="\[\e[30;48;5;68m\] [DOCKER] \[\e[0m\] \\t \[\e[40;38;5;28m\][\w]\[\e[0m\] \$ "' >> ~/.bashrc


