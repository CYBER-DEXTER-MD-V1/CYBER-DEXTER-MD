# Use Node with Alpine for a lightweight base
FROM node:18-alpine

# Install Git and any other essential build tools
RUN apk add --no-cache git python3 make g++

# Create app directory
WORKDIR /app

# Copy only the package files to install dependencies first (Docker cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full source code
COPY . .

# Expose port if your bot has a web dashboard or HTTP listener (optional)
EXPOSE 3000

# Start the bot using PM2
CMD ["pm2-runtime", "main.js", "--name", "CYBER-DEXTER-MD"]
