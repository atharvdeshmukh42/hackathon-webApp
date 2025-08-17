import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore, storage

def initialize_firebase():
    load_dotenv()
    firebase_sdk_path = os.getenv('FIREBASE_CREDENTIALS_PATH', 'credentials.json')
    cred = credentials.Certificate(firebase_sdk_path)
    app = firebase_admin.initialize_app(cred, {
        'storageBucket': 'tech-pragyan-db.firebasestorage.app'
    })
    print("Firebase initialized successfully!")
    return app

def add_user_to_firestore(data_obj):
    firestore_client = firestore.client()
    user_data = data_obj
    firestore_client.collection("submissions").add(user_data)
    print("Submission successful")

def storeFile(file, file_name):
    bucket = storage.bucket()
    blob = bucket.blob(file_name)
    blob.upload_from_file(file)
    print(f"File {file_name} uploaded successfully to Firebase Storage.")

def get_file_from_storage(file_name):
    try:
        bucket = storage.bucket()
        blob = bucket.blob(file_name)
        
        # Get the download URL that expires in 3600 seconds (1 hour)
        url = blob.generate_signed_url(
            version="v4",
            expiration=3600,  # URL expires in 1 hour
            method="GET"
        )
        return url
    except Exception as e:
        print(f"Error getting file from storage: {e}")
        return None

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

