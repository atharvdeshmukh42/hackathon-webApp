from flask import Flask, request, jsonify, send_file, abort
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from handleMail import EmailSender
import handleDB as db
from datetime import datetime
from dotenv import load_dotenv
from handleDB import download_file

load_dotenv()

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 15 * 1024 * 1024))

db.initialize_firebase()

def download(filename):
    file_path = download_file(filename)
    if file_path and os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return abort(404, description="File not found")

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', debug=debug, port=port)