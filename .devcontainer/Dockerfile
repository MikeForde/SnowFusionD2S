FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Apply Debian security updates, including Brotli
RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*