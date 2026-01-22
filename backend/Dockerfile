FROM python:3.12-slim

WORKDIR /app

# 1. Install system dependencies (Required for Postgres)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# --- VIRTUAL ENVIRONMENT SETUP ---

# 2. Create a virtual environment at /opt/venv
RUN python -m venv /venv

# 3. "Activate" the venv by adding its bin folder to the start of PATH.
#    Now, whenever we run 'pip' or 'python', it uses the venv versions.
ENV PATH="/venv/bin:$PATH"

# ---------------------------------

COPY requirements.txt .

# 4. Install dependencies
#    (This installs strictly into /opt/venv because of the PATH above)
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 5. Run the application
#    Docker finds 'uvicorn' inside /opt/venv/bin/ automatically
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]