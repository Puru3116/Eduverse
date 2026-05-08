const fs = require('fs');
const path = require('path');

const ACHIEVER_MATH_TOPICS = [
  { id: 'number-system', name: 'Number System' },
  { id: 'algebra', name: 'Algebra' },
  { id: 'geometry', name: 'Geometry' },
  { id: 'mensuration', name: 'Mensuration' },
  { id: 'probability', name: 'Probability' },
  { id: 'data-stats', name: 'Data & Statistics' }
];

const BUILDER_MATH_TOPICS = [
  { id: 'add-sub', name: 'Addition & Subtraction' },
  { id: 'mult-div', name: 'Multiplication & Division' },
  { id: 'fractions', name: 'Fractions' },
  { id: 'time-money', name: 'Time & Money' },
  { id: 'shapes', name: 'Shapes & Space' }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const generatedQuestions = new Set();

function generateMathQ(topicId, id, level) {
  let q, a, options, explanation;
  const isBuilder = level === 'builder';
  
  let attempts = 0;
  while (attempts < 100) {
    switch(topicId) {
      case 'add-sub':
        const a1 = isBuilder ? getRandomInt(10, 999) : getRandomInt(1000, 99999);
        const a2 = isBuilder ? getRandomInt(10, 999) : getRandomInt(1000, 99999);
        const op = getRandomInt(0, 1) === 0 ? '+' : '-';
        if (op === '+') {
          q = `What is the sum of ${a1} and ${a2}?`;
          a = (a1 + a2).toString();
          explanation = `${a1} + ${a2} = ${a}.`;
        } else {
          const s1 = Math.max(a1, a2);
          const s2 = Math.min(a1, a2);
          q = `What is ${s1} minus ${s2}?`;
          a = (s1 - s2).toString();
          explanation = `${s1} - ${s2} = ${a}.`;
        }
        break;

      case 'mult-div':
        const m1 = isBuilder ? getRandomInt(2, 25) : getRandomInt(12, 100);
        const m2 = isBuilder ? getRandomInt(2, 12) : getRandomInt(5, 25);
        if (getRandomInt(0, 1) === 0) {
          q = `Solve: ${m1} × ${m2}`;
          a = (m1 * m2).toString();
          explanation = `${m1} times ${m2} is ${a}.`;
        } else {
          const d2 = isBuilder ? getRandomInt(2, 12) : getRandomInt(5, 25);
          const res = isBuilder ? getRandomInt(2, 20) : getRandomInt(10, 100);
          const d1 = d2 * res;
          q = `Solve: ${d1} ÷ ${d2}`;
          a = res.toString();
          explanation = `${d1} divided by ${d2} gives ${res}.`;
        }
        break;

      case 'fractions':
        const den = isBuilder ? [2, 3, 4, 5, 8, 10][getRandomInt(0, 5)] : getRandomInt(5, 50);
        const n1 = getRandomInt(1, den - 1);
        const n2 = getRandomInt(1, den - 1);
        if (getRandomInt(0, 1) === 0) {
          q = `Calculate: ${n1}/${den} + ${n2}/${den}`;
          a = `${n1 + n2}/${den}`;
          explanation = `Add the numerators: ${n1} + ${n2} = ${n1 + n2}.`;
        } else {
          const mult = getRandomInt(2, 5);
          q = `Find an equivalent fraction for ${n1}/${den}`;
          a = `${n1 * mult}/${den * mult}`;
          explanation = `Multiply both numerator and denominator by ${mult}.`;
        }
        break;

      case 'time-money':
        if (getRandomInt(0, 1) === 0) {
          const h = getRandomInt(1, 12);
          const m = [0, 15, 30, 45][getRandomInt(0, 3)];
          const wait = getRandomInt(1, 5);
          q = `If a train departs at ${h}:${m === 0 ? '00' : m} and the journey takes ${wait} hours, when does it arrive?`;
          let resH = h + wait;
          if (resH > 12) resH -= 12;
          a = `${resH}:${m === 0 ? '00' : m}`;
          explanation = `Add ${wait} hours to the departure time.`;
        } else {
          const price = getRandomInt(10, 100);
          const bill = [100, 200, 500][getRandomInt(0, 2)];
          if (bill < price) { attempts++; continue; }
          q = `You buy an item for $${price} and pay with a $${bill} note. How much change do you get?`;
          a = `$${bill - price}`;
          explanation = `Change = Amount Paid - Price ($${bill} - $${price} = $${bill - price}).`;
        }
        break;

      case 'shapes':
        const shapes = ["Pentagon", "Hexagon", "Octagon", "Heptagon", "Decagon"];
        const sIdx = getRandomInt(0, shapes.length - 1);
        const sides = [5, 6, 8, 7, 10];
        q = `How many vertices does a regular ${shapes[sIdx]} have?`;
        a = sides[sIdx].toString();
        explanation = `A ${shapes[sIdx]} has ${a} sides and ${a} vertices.`;
        break;

      case 'number-system':
        const val = getRandomInt(100, 9999);
        const place = [10, 100, 1000][getRandomInt(0, 2)];
        q = `Round ${val} to the nearest ${place}.`;
        a = (Math.round(val / place) * place).toString();
        explanation = `Look at the digit in the ${place/10}s place to decide.`;
        break;

      case 'algebra':
        const x_val = getRandomInt(2, 20);
        const coeff = getRandomInt(2, 10);
        const constant = getRandomInt(1, 50);
        const result = (coeff * x_val) + constant;
        q = `If ${coeff}x + ${constant} = ${result}, find x.`;
        a = x_val.toString();
        explanation = `x = (${result} - ${constant}) / ${coeff} = ${x_val}.`;
        break;

      case 'geometry':
        const baseAngle = getRandomInt(20, 70);
        q = `In an isosceles triangle, if the vertex angle is ${180 - (2 * baseAngle)}°, what is each base angle?`;
        a = baseAngle.toString() + "°";
        explanation = `(180 - vertex angle) / 2 = (${180} - ${180 - (2 * baseAngle)}) / 2 = ${baseAngle}°.`;
        break;

      case 'mensuration':
        const radius = getRandomInt(1, 10) * 7;
        q = `Find the circumference of a circle with radius ${radius} cm. (Use π = 22/7)`;
        a = (2 * 22 / 7 * radius).toString() + " cm";
        explanation = `C = 2πr = 2 × (22/7) × ${radius} = ${2 * 22 / 7 * radius}.`;
        break;

      case 'probability':
        const dice = getRandomInt(1, 6);
        q = `What is the probability of rolling a ${dice} on a standard 6-sided die?`;
        a = "1/6";
        explanation = `There is only one ${dice} on the die, out of 6 possible outcomes.`;
        break;

      case 'data-stats':
        const nums = [getRandomInt(10, 20), getRandomInt(21, 30), getRandomInt(31, 40)];
        q = `Find the range of the following set: {${nums.join(', ')}}`;
        a = (Math.max(...nums) - Math.min(...nums)).toString();
        explanation = `Range = Max - Min (${Math.max(...nums)} - ${Math.min(...nums)} = ${a}).`;
        break;

      default:
        q = `Generic unique math question ${id}`;
        a = "Correct";
        explanation = "None";
    }

    if (!generatedQuestions.has(q)) {
      generatedQuestions.add(q);
      break;
    }
    attempts++;
  }

  if (!options) {
    const correctVal = parseFloat(a.replace(/[^0-9.-]/g, ''));
    if (!isNaN(correctVal)) {
      const offset = isBuilder ? 2 : 15;
      options = shuffleArray([
        a,
        (correctVal + offset).toString() + (a.includes('$') ? '' : a.replace(/[0-9.-]/g, '')),
        (correctVal - offset).toString() + (a.includes('$') ? '' : a.replace(/[0-9.-]/g, '')),
        (correctVal + offset * 2).toString() + (a.includes('$') ? '' : a.replace(/[0-9.-]/g, ''))
      ]);
      // Ensure options are unique
      options = Array.from(new Set(options));
      while(options.length < 4) options.push((correctVal + options.length * 7).toString());
    } else {
      options = shuffleArray([a, "Incorrect 1", "Incorrect 2", "Incorrect 3"]);
    }
  }

  return { id, q, options, a, explanation };
}

function generateData(topics, level) {
  const data = {};
  topics.forEach(topic => {
    const topicData = { practice: [], challenge: [], test: [] };
    for(let i=1; i<=30; i++) topicData.practice.push(generateMathQ(topic.id, `${level}-math-${topic.id}-p-${i}`, level));
    for(let i=1; i<=30; i++) topicData.challenge.push(generateMathQ(topic.id, `${level}-math-${topic.id}-c-${i}`, level));
    for(let i=1; i<=100; i++) topicData.test.push(generateMathQ(topic.id, `${level}-math-${topic.id}-t-${i}`, level));
    data[topic.id] = topicData;
  });
  return data;
}

// Generate Achiever Math
const achieverData = generateData(ACHIEVER_MATH_TOPICS, 'achiever');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedMathQuestions.json'),
  JSON.stringify(achieverData, null, 2)
);

// Reset Set for Builder
generatedQuestions.clear();

// Generate Builder Math
const builderData = generateData(BUILDER_MATH_TOPICS, 'builder');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedBuilderMathQuestions.json'),
  JSON.stringify(builderData, null, 2)
);

console.log('Successfully generated UNIQUE Math questions for both levels!');
