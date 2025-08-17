from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from handleMail import EmailSender
import handleDB as db
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 15 * 1024 * 1024))

db.initialize_firebase()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello():
    return "Hello World, Hello TechPragyan 2025"


@app.route('/submit', methods=['POST'])
def submit():
    try:
        print("\n=== REQUEST DEBUG INFO ===")
        print("Content-Type:", request.content_type)
        print("Files:", request.files)
        print("Form Data:", request.form)
        print("JSON Data:", request.get_json(silent=True))
        print("Content Length:", request.content_length)

        if 'data' in request.form:
            print("Processing Form Data with JSON string")
            import json
            data = json.loads(request.form['data'])
        else:
            print("ERROR: No data field in form")
            return jsonify({'error': 'No data received'}), 400
            
        print("Processed Data:", data)
            
        required_fields = ['teamName', 'collegeName', 'state', 'teamLeader']
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            print(f"ERROR: Missing fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
            
        if 'presentation' not in request.files:
            print("ERROR: No presentation file in request")
            return jsonify({'error': 'No presentation file provided'}), 400
        
        file = request.files['presentation']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400
            
        if request.content_length > MAX_FILE_SIZE:
            return jsonify({'error': 'File size exceeds maximum limit of 15MB'}), 400

        def create_unique_filename(original_filename):
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            team_name = data.get('teamName', '').replace(' ', '_')
            name, ext = os.path.splitext(original_filename)
            return f"{name}_{team_name}_{timestamp}{ext}"
            
        unique_filename = create_unique_filename(file.filename)
        secure_unique_filename = secure_filename(unique_filename)

        db.storeFile(file, secure_unique_filename)

        
        team_data = {
            'teamName': data.get('teamName'),
            'collegeName': data.get('collegeName'),
            'state': data.get('state'),
            'teamLeader': data.get('teamLeader'),
            'degree': data.get('degree'),
            'yearOfStudy': data.get('yearOfStudy'),
            'problemId': data.get('problemId'),
            'teamSize': data.get('teamSize'),
            'members': data.get('members'),
            'timestamp': datetime.now().strftime('%Y%m%d_%H%M%S'),
            'presentationPath': secure_unique_filename
        }
        
        
        print("Received team registration:", team_data)

        
        db.add_user_to_firestore(team_data)
        
        sender = EmailSender()
        sender.send_email(to_email=(team_data['teamLeader']['email']))


        return jsonify({
            'message': 'Registration successful',
            'data': team_data
        }), 200

    except Exception as e:
        print("Error processing registration:", str(e))
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', debug=debug, port=port)