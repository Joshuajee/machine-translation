# Use an official lightweight Python image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy dependency definition to cache Docker layer
COPY requirements.txt .

# Install dependencies
RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Run the application (accessible externally)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]