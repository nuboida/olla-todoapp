# Todolist

**A Fullstack todo list app built using Angular for the frontend, ASP.NET Core for the backend and MongoDb for persistance. Also uses Nginx for reverse-proxy.**

# Terminal Commands
## - Frontend
1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Make sure you have ```AngularCli installed``` if not, you can install by running ```npm install -g @angular/cli``` on your terminal.
3. Open a terminal and CD into the todolist-frontend folder
4. Run ```npm install``` to install all dependencies.
5. Then Run: ```ng serve``` to start front-end server.
6. Navigate to [localhost:4200](localhost:4200) to view.

## - Backend
1. Make sure you have ASP.NET 7 installed.
2. Open a terminal and CD into backend/Todolist folder.
3. Run Dotnet Run Debug to serve backend.

## Fullstack
**At a terminal at the root folder of the application and Run Docker-compose up to create a containerized version of the full application. Application should be hosted on your [localhost](https://localhost) machine.**

The directory structure should be as follows:

```
.
├── 📁 backend
├── 📁 todolist-frontend
├── 📄 docker-compose.yaml
└── 📄 nginx.conf
└── 📄 README
```