#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Manual Production Deployment..."

# --- BACKEND SETUP ---
echo "🐍 Setting up Backend..."
cd backend

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Start Backend using PM2 (or restart if exists)
# We use Gunicorn with Uvicorn workers for production performance
if pm2 list | grep -q "fastapi-backend"; then
    pm2 restart fastapi-backend
else
    pm2 start "gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000" --name fastapi-backend
fi

cd ..

# --- FRONTEND SETUP ---
echo "⚛️ Setting up Frontend..."
cd frontend

# Install dependencies and build
npm install
npm run build

# Serve Frontend using 'serve' and PM2
npm install -g serve

if pm2 list | grep -q "react-frontend"; then
    pm2 restart react-frontend
else
    # Serve the 'dist' folder on port 3000
    pm2 start "serve -s dist -l 3000" --name react-frontend
fi

# Save PM2 list so it restarts on reboot
pm2 save

echo "✅ Deployment complete!"
echo "   Frontend running on Port 3000"
echo "   Backend running on Port 8000"