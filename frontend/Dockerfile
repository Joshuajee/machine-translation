# Stage 1: Build the React application
FROM node:22-alpine as build

WORKDIR /app

# 1. Enable Corepack (Standard way to use Yarn/PNPM in Node 16+)
RUN corepack enable

# 2. Copy BOTH package.json and yarn.lock
# It is critical to copy yarn.lock to ensure versions match your local machine
COPY package.json yarn.lock ./

# 3. Install dependencies
# --frozen-lockfile ensures it crashes if yarn.lock is invalid (good for CI/Prod)
RUN yarn install --frozen-lockfile

# 4. Copy the rest of the code
COPY . .

# 5. Build
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the build files
COPY --from=build /app/dist /usr/share/nginx/html

# --- NEW: Copy custom Nginx config ---
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]