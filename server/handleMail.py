import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailSender:
    def __init__(self):
        self.email_address = ""#Enter mail is Here
        self.password = ""#Enter password here
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587

    def send_email(self, to_email):
        msg = MIMEMultipart()
        msg['From'] = self.email_address
        msg['To'] = to_email
        msg['Subject'] = "Registration successful for Tech Pragyan Hackathon 2025"

        with open("messageMail.html", 'r', encoding='utf-8') as file:
            message = file.read()

        msg.attach(MIMEText(message, 'html'))

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            
            server.login(self.email_address, self.password)
            
            server.send_message(msg)
            print("Email sent successfully!")
            
        except Exception as e:
            print(f"An error occurred: {e}")
            
        finally:
            server.quit()