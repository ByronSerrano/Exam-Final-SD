# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the project files to the container
COPY . .

# Install project dependencies
RUN npm install


# Expose the port that the Next.js application uses
EXPOSE 8000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
