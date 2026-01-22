import gdown
import os
import zipfile

def download_model_from_drive():
    # 1. Setup paths
    output_folder = "./backend/models/en-urh-byt5-base-ep30-11"
    # 2. Your Google Drive ID (FILE ID or FOLDER ID)
    drive_id = "1qNT5vJUuUr9siyRHPiBk7yCtuE4vrXhY" 
    # 3. Download
    print("🚀 Downloading model from Google Drive...")
    url = f'https://drive.google.com/uc?id={drive_id}'
    gdown.download(url, output_folder + ".zip", quiet=False)
    print("✅ Download complete.")
    print("📂 Unzipping model...")
    with zipfile.ZipFile(output_folder + ".zip", 'r') as zip_ref:
        zip_ref.extractall("./backend/models/")
    # delete the zip file after extraction
    os.remove(output_folder + ".zip")
    print("✅ Unzipping complete.")


if __name__ == "__main__":
    download_model_from_drive()
    print("✅ Completed model setup.")
  
