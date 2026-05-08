const mongoose = require('mongoose');
const Progress = require('./models/Progress');

async function checkProgress() {
  await mongoose.connect('mongodb://localhost:27017/eduverse');
  const records = await Progress.find({});
  console.log('Total Records:', records.length);
  records.forEach(r => {
    console.log(`Student: ${r.studentId}, Game: ${r.gameId}, Level: ${r.levelNumber}.${r.subLevel}`);
  });
  await mongoose.connection.close();
}

checkProgress().catch(console.error);
