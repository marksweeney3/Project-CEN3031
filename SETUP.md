## Backend

#### 1. Install dependencies in 'backend' folder
```bash
cd backend
npm install
```

#### 2. Create file .env in 'backend' folder with the following contents
```
PORT=5000
DB_HOST=gss.cjsm2euui8ne.us-east-2.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=cen3031_gss_group08
DB_NAME=gss
```

#### 3. Run the backend
```bash
npm run dev
```

#### 4. On browser, go to http://localhost:5000/

## Frontend

#### 1. Install dependencies in 'frontend' folder
```bash
cd frontend
npm install
```

#### 2. Run the frontend
```bash
npm run dev
```

#### 3. On browser, go to http://localhost:5173/

## Database

#### 1. Check that .env file is located in backend with proper credentials