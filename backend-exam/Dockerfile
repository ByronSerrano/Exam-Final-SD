# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install the project dependencies
RUN npm install

# Expose the port used by the NestJS application
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
