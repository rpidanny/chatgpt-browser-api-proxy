#
# Base image
#

FROM mcr.microsoft.com/playwright:v1.32.0-jammy as base

RUN apt update -y && apt upgrade -y && \
  apt install -y bash && \
  mkdir /opt/app

WORKDIR /opt/app

#
# Build image
#

FROM base as build

RUN apt update -y && apt upgrade -y && \
  apt install -y make gcc g++

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

#
# Runtime image
#

FROM base

ENV NODE_ENV production

COPY --from=build /opt/app .

CMD bash -c 'node dist/main'
