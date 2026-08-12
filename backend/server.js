require('dotenv').config();

const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

const PORT = process.env.PORT || 3000;

console.log('MONGO_URI present:', !!process.env.MONGO_URI);
console.log('IMAGEKIT_PUBLIC_KEY present:', !!process.env.IMAGEKIT_PUBLIC_KEY);
console.log('IMAGEKIT_PRIVATE_KEY present:', !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log('IMAGEKIT_URL_ENDPOINT present:', !!process.env.IMAGEKIT_URL_ENDPOINT);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});