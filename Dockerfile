# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

# Install dependencies
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
# Setup Repo and Install dependencies
WORKDIR /repo
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --silent

# Copy src to repo
COPY . /repo

# Install Playwright and its dependencies
RUN yarn add playwright
RUN npx playwright install --with-deps

# Run Playwright tests
CMD ["npx", "playwright", "test"]
