## Note Taking App
### Description
This project is for taking notes and have the following functionalities:
- Create a note
- Archive/Unarchive a note
- List notes by state(archived/unarchived) 
- List all notes
- Delete a note
- Edit a note

## Run in local
You must have nodejs(v16.16.0), npm (8.18.0), docker (20.10.17) and docker-compose (2.9.0) installed then run: 
```bash script.sh```

This project was made in a Linux enviroment (Archlinux)

### Credentials for sign in
- name: sbenel
- password: 421091

### Technologies
- Back end
    - Nodejs: v16.16.0
    - npm: 8.18.0
	- Nestjs: ^9.0.0
		- class-validator: ^0.13.2
		- nestjs/common: ^9.0.0
		- nestjs/config: ^2.2.0
		- nestjs/core: ^9.0.0
		- nestjs/jwt: ^9.0.0
		- nestjs/passport: ^9.0.0
		- nestjs/platform-express: ^9.0.0
	- Prisma/client: ^4.2.1
	- Prisma: ^4.2.1 
	- Docker: 20.10.17
	- Docker-compose: 2.9.0
	- Postgresql:14
	- Argon2: ^0.29.1
	- passport: ^0.6.0
	- passport-jwt: ^4.0.0
- Front end
	- Vite: ^3.0.7
	- Reactjs: ^2.2.9
	- React-icons: ^4.4.0
	- React-router-dom: ^6.3.0
	- ChakraUI: ^2.2.9
		- emotion/react: ^11.10.0
		- emotion/styled: ^11.10.0
		- framer-motion: ^6.5.1
