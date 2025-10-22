FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy your API code
COPY . .

# Expose app port (assuming your API listens on 3000)
EXPOSE 3000

CMD ["npm", "start"]
