FROM oven/bun:1.2.3 as base

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN bun install --production

# Copy application code
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "server.js"]