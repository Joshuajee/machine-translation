#!/bin/bash

echo "🚀 Starting Docker Production Build..."

# 1. Stop existing containers
docker-compose -f docker-compose.prod.yml down

echo "🐳 Existing containers stopped."

# 2. Build and start containers in detached mode
docker-compose -f docker-compose.prod.yml up --build -d

echo "✅ Deployment complete!"
echo "   Frontend running on http://localhost:80"
echo "   Backend running on http://localhost:8000"
