# Online Voting System - VUTA
The Online Voting System Web Application for university premises is a secure and efficient platform designed to facilitate the electoral process within academic institutions.

## Institute
 - Vidyasagar University, West Bengal, Medinipur

## Type
 - MCA final Year Project 2024
   
## Technologies
- [React](https://react.dev/) - frontend
- [Mysql](https://www.mysqltutorial.org/) with [Sequelize ORM](https://sequelize.org/docs/v6/getting-started/) - Database 
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - CSS framework.
- [nodejs](https://nodejs.org/docs/latest/api/) - backend
- [css]() - for custom styles

## Project Directory
Create **Root folder** as `OVS` & inside this folder add two **sub-folder** as `server` (for backend) and `ovs-app` (it's your React application).

- OVS               
  - server       
     - js files
  - ovs-app
    - React files

## Setup / Installation process 
### - tools
1. XAMPP Server - click here to install [XAMPP](https://www.apachefriends.org/).
    
### - windows
1. Ensure that your system has been already installed with `nodejs LTS` version &  `git`.
2. Select your directory where you wants to create your project : `open cmd`.
3. Choose directory and type this on `cmd` :` F:\>node -v` it show the latest version.
4. Next, ` F:\>mkdir OVS` & ` F:\>cd OVS` 
5. Next, ` F:\OVS>git clone https://github.com/ovs-vuta/ovs.git`
6. after doing this type : ` F:\OVS>dir` it show ```server & ovs-app``` two sub-directories.
7. Next, go to: ` F:\OVS>cd server` and type: ` F:\OVS\server>npm install`
8. Next, go to: ` F:\OVS>cd ovs-app` and type: ` F:\OVS\ovs-app>npm install`

### - Run
 1. First open `Xampp` > go to  `Xampp Control Panel` > start `apache` & `mysql` until `start` button color is green. 
 2. ` F:\OVS\server>nodemon` and Enter
 3. ` F:\OVS\ovs-app>npm run dev` and Enter
 
## Features & Application:

### 1. **Admin Section**: 
- **Login**: The presiding officer (admin) needs to log in securely 
to access the admin panel.
- **Register Users**: Admin can add users uploading a single .CSV file
- **Candidate Management**: Admins can add candidates who are 
running for the Executive Committee and Office Bearer 
positions. 
- **Result Viewing**: Admins can see the results of the voting in 
real-time as votes are counted. 
- **Voting Records Download**: Admins can download the election vopting records 
as an Excel file for record-keeping and further analysis. 
- **Candidate Management**:  Admins can add details of the candidates 
running for the Executive Committee and Office Bearer 
positions. This includes entering candidate names, positions, 
and other relevant information.
- **Office Bearer’s Candidate Submission**: Add Office Bearer’s Candidate Submission, update & delete.
-  **Executive Committee**: Add Executive Committee Candidate Submission, update & delete.

### 2. Voter Section: 
- **Login and Verification**: Voters log in with their credentials and 
receive a One-Time Password (OTP) sent to their registered 
email. They must enter this OTP to verify their identity. 
- **Voting**: Once verified, voters can see the list of candidates and 
vote for their preferred ones.
- **Office Bearers**: 
    1. President: Users can vote for one candidate. 
    2. Vice President: Users can vote for only one candidate. 
    3. Secretary: Users can vote for only one candidate. 
    4. Secretary-Organization: Users can vote for only one candidate. 
    5. Secretary-Coordinator: Users can vote for only one candidate.

-  **Executive Committee**: Users must vote for a minimum of eight 
candidates. 


## What's Next for Implementation
1. Data manipulation & security concern about voting records.
2. ML based model creation for predicting voting result.
3. Data intelligence etc.
4. User Real-time comments.


## Missing Features 
 Add on if missing
 
 
## Abnormal Actions Reports
 Add on if any application related issues raised.


















