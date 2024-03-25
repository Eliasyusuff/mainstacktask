FROM node:16-alpine

# Set the working directory
WORKDIR /TESTTASK/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the compiled JavaScript files
COPY dist/ ./dist/

# Your app binds to port 3000 (adjust if different)
EXPOSE 3000

# Run the compiled app.js file
CMD ["node", "dist/app.js"]
