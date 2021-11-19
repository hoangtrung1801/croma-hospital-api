# croma-hospital-api
This is API for project Croma Hospital

## Getting Started
See these instructions for get you a copy of project and running on your local machine development

### Installing
Clone project and install required package
```
git clone https://github.com/hoangtrung1801/croma-hospital-api.git
cd croma-hospital
npm install
```

### Config
Add file <code>.env</code> to root folder and config that file with some key :
+ MONGODB_URL -> url to your mongodb server
+ PORT -> port for your server
+ TOKEN_SECRET -> token for generating jsonwebtoken

### Run server
```
npm start
```

### Build with
+ Express
+ Mongoose
