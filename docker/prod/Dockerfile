# ---- Stage 1: Build Angular Application ----
FROM node:22-alpine AS build

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the entire project and build the application
COPY . ./
RUN ng build --configuration=kyma

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine AS runtime

# Copy compiled Angular app to Nginx
COPY --from=build /app/dist/dev-quest-kyma /usr/share/nginx/html

# Copy custom Nginx config
COPY docker/prod/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
