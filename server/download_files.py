import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, storage

def initialize_firebase():
    load_dotenv()
    firebase_sdk_path = os.getenv('FIREBASE_CREDENTIALS_PATH', 'credentials.json')
    cred = credentials.Certificate(firebase_sdk_path)
    app = firebase_admin.initialize_app(cred, {
        'storageBucket': 'tech-pragyan-db.firebasestorage.app'
    })
    print("Firebase initialized successfully!")
    return app

def list_all_files():
    try:
        bucket = storage.bucket()
        files = bucket.list_blobs()
        return [file.name for file in files]
    except Exception as e:
        print(f"Error listing files: {e}")
        return []

def download_file(file_name):
    try:
        # Create downloads directory if it doesn't exist
        downloads_dir = os.path.join(os.getcwd(), 'downloads')
        os.makedirs(downloads_dir, exist_ok=True)
        
        # Set the destination path
        destination_path = os.path.join(downloads_dir, file_name)
        
        bucket = storage.bucket()
        blob = bucket.blob(file_name)
        blob.download_to_filename(destination_path)
        print(f"File {file_name} downloaded successfully to {destination_path}")
        return destination_path
    except Exception as e:
        print(f"Error downloading file: {e}")
        return None

def main():
    # Initialize Firebase
    initialize_firebase()
    
    # List all available files
    print("\nAvailable files:")
    files = list_all_files()
    for i, file in enumerate(files, 1):
        print(f"{i}. {file}")
    
    # Ask user which file to download
    if files:
        try:
            choice = int(input("\nEnter the number of the file you want to download (0 to exit): "))
            if 0 < choice <= len(files):
                file_name = files[choice-1]
                downloaded_path = download_file(file_name)
                if downloaded_path:
                    print(f"\nFile downloaded successfully to: {downloaded_path}")
            elif choice == 0:
                print("Exiting...")
            else:
                print("Invalid choice!")
        except ValueError:
            print("Please enter a valid number!")
    else:
        print("No files found in storage!")

if __name__ == "__main__":
    main() 