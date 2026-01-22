chmod +x start-docker.sh
./start-docker.sh



  backend:
    build: ./backend
    container_name: translator-backend
    ports:
      - "8000:8000"
    volumes:
      # FIX: Mount the models from VPS disk to Container
      # Format: "./local_path : /container_path"
      - ./backend/models:/app/models
    depends_on:
      - db
    restart: always
