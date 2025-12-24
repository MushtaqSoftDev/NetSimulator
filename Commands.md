# Commands to run the project
First of all you have to sure that docker is installed in the system with the command =>
    docker compose version 
& you will see the version of docker installed on the system. Otherwise installed docker 1st according to your system Linux/Mac/Window.

## Run Project
Inside the project directory netSimulator you have to run the below command
    sudo docker compose up --build
this will run docker and finally in browser by default port number localhost:3000 you can see the simulator calculator.

### Remember:
If docker have permission as a root user or in another word docker are present in root so donot need sudo just run => docker compose up --build & check localhost:3000 for simulator & for database UI check localhost:8081

