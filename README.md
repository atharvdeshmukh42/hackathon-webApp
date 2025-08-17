## Live Demo

This website is live at [tech-pragyan-server-computer.web.app](https://tech-pragyan-server-computer.web.app)

# Tech Pragyan 2025 Hackathon Web App

This is a full-stack web application for the "Tech Pragyan 2025" hackathon, a 12-hour event organized by the Department of Computer Engineering at Amrutvahini College of Engineering, Sangamner. The event is scheduled for March 27, 2025.

## About The Project

This web application serves as the main portal for all information and activities related to the Tech Pragyan 2025 hackathon. It provides features for participants to register, view problem statements, and confirm their participation. The application also displays results and provides important information about the event.

### Features

* **User Registration:** A comprehensive registration form for teams to sign up for the hackathon.
* **View Problem Statements:** A dedicated page to display all the problem statements for the hackathon.
* **Team Confirmation:** A page for selected teams to confirm their participation and handle payments.
* **View Results:** A page to display the results of the hackathon.
* **Event Information:** Sections for rules and information, about us, and important dates.
* **Downloadables:** Functionality to download templates and brochures.

### Built With

* **Frontend:** React.js
* **Backend:** Flask (Python)
* **Database:** Firebase Firestore
* **Hosting:** Google App Engine

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Node.js and npm
* Python and pip
* Firebase account and credentials

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/atharvdeshmukh42/hackathon-webapp.git](https://github.com/atharvdeshmukh42/hackathon-webapp.git)
    ```
2.  **Client Setup**
    ```sh
    cd client
    npm install
    npm run dev
    ```
3.  **Server Setup**
    ```sh
    cd server
    pip install -r requirements.txt
    # Add your Firebase credentials to credentials.json
    # Add your email credentials to handleMail.py
    flask run
    ```

## Usage

The application provides a seamless experience for hackathon participants. Upon visiting the website, users are greeted with a loading screen and then redirected to the homepage. The homepage contains all the essential information about the event, including an "About Us" section, important dates, prize details, and a countdown timer to the event.

Users can navigate to different sections using the navbar. The "Problem Statements" page lists all the challenges for the hackathon, and the "Register" page provides a form for teams to register. After the selection process, teams can visit the "Confirmation" page to confirm their participation. The "Results" page is updated with the winning teams after the event.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Atharv Deshmukh - [atharvdeshmukh42](https://github.com/atharvdeshmukh42)

Project Link: [https://github.com/atharvdeshmukh42/hackathon-webapp](https://github.com/atharvdeshmukh42/hackathon-webapp)
