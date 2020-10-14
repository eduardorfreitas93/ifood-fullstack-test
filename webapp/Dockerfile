###############################################################################
# Step 1 : Builder image
#
FROM node:alpine AS builder

# Define working directory and copy source
WORKDIR /home/node/app

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .

RUN npm run build

###############################################################################
# Step 2 : Run image
#
FROM node:alpine
WORKDIR /home/node/app

# Install deps for production only
RUN npm i -g pm2 && npm cache clean --force

# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000

# Start the app
CMD ["pm2-runtime", "processes.json"]
