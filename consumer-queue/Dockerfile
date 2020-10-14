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

COPY . .

RUN cp .env.example .env

###############################################################################
# Step 2 : Run image
#
FROM node:alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
RUN npm i -g pm2 && npm cache clean --force

# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app .

# Start the app
CMD ["pm2-runtime", "processes.json"]
