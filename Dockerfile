# Use official Node.js LTS based on Debian Buster
FROM node:lts-buster

# Set non-interactive mode for APT
ENV DEBIAN_FRONTEND=noninteractive

# Fix Debian HTTP issues: switch to HTTPS, install dependencies, and clean up
RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|' /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y \
        ca-certificates \
        apt-transport-https \
        curl \
        ffmpeg \
        imagemagick \
        webp && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install project dependencies and global tools
RUN npm install && \
    npm install -g qrcode-terminal pm2

# Copy all remaining project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Default command to run the app
CMD ["npm", "start"]
