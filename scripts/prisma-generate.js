const { exec } = require('child_process');
const path = require('path');

const prismaGenerate = () => {
  return new Promise((resolve, reject) => {
    exec('prisma generate', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      }
    }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
};

prismaGenerate().catch(console.error); 