const fs = require('fs');
const path = require('path');

const subjects = {
  math: ['add-sub', 'mult-div', 'fractions', 'time-money', 'shapes'],
  english: ['vocab', 'grammar', 'sentences'],
  evs: ['plants-animals', 'hygiene', 'neighborhood']
};

function generateMathQuestion(topic, level) {
  let q, a, options, explanation;
  
  if (topic === 'add-sub') {
    const isWordProblem = Math.random() > 0.5;
    if (isWordProblem) {
      const names = ["Sam", "Alex", "Jordan", "Taylor", "Amit"];
      const items = ["apples", "books", "marbles", "stamps", "pencils", "stickers", "cards"];
      const n1 = Math.floor(Math.random() * 200) + 50;
      const n2 = Math.floor(Math.random() * 200) + 50;
      const name = names[Math.floor(Math.random() * names.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      const isAdd = Math.random() > 0.5;
      
      if (isAdd) {
        q = `${name} has ${n1} ${item}. A friend gave them ${n2} more. How many ${item} do they have in total?`;
        a = (n1 + n2).toString();
        explanation = `${n1} + ${n2} = ${a}.`;
      } else {
        const big = Math.max(n1, n2) + 100;
        const small = Math.min(n1, n2);
        q = `${name} had ${big} ${item}. They used ${small} of them. How many ${item} are remaining?`;
        a = (big - small).toString();
        explanation = `${big} - ${small} = ${a}.`;
      }
    } else {
      const n1 = Math.floor(Math.random() * 800) + 100;
      const n2 = Math.floor(Math.random() * 800) + 100;
      const isAdd = Math.random() > 0.5;
      if (isAdd) {
        q = `Find the sum of ${n1} and ${n2}.`;
        a = (n1 + n2).toString();
        explanation = `The sum of ${n1} and ${n2} is ${a}.`;
      } else {
        const big = Math.max(n1, n2);
        const small = Math.min(n1, n2);
        q = `What is the difference between ${big} and ${small}?`;
        a = (big - small).toString();
        explanation = `The difference is ${a}.`;
      }
    }
  } else if (topic === 'mult-div') {
    const isMult = Math.random() > 0.5;
    if (isMult) {
      const m1 = Math.floor(Math.random() * 11) + 2;
      const m2 = Math.floor(Math.random() * 11) + 2;
      q = `What is the product of ${m1} and ${m2}?`;
      a = (m1 * m2).toString();
      explanation = `${m1} times ${m2} equals ${a}.`;
    } else {
      const m2 = Math.floor(Math.random() * 10) + 2;
      const res = Math.floor(Math.random() * 10) + 2;
      const m1 = m2 * res;
      q = `If ${m1} chocolates are shared equally among ${m2} children, how many does each child get?`;
      a = res.toString();
      explanation = `${m1} divided by ${m2} is ${a}.`;
    }
  } else if (topic === 'fractions') {
    const denoms = [2, 3, 4, 5, 6, 8, 10];
    const d = denoms[Math.floor(Math.random() * denoms.length)];
    const n = Math.floor(Math.random() * (d - 1)) + 1;
    const type = Math.random();
    if (type < 0.33) {
      q = `In the fraction ${n}/${d}, which number represents the 'parts taken'?`;
      a = n.toString();
      explanation = `The numerator (${n}) represents the parts taken.`;
    } else if (type < 0.66) {
      q = `A pizza is cut into ${d} equal slices. If you eat ${n} slices, what fraction did you eat?`;
      a = `${n}/${d}`;
      explanation = `You ate ${n} out of ${d} slices, so ${n}/${d}.`;
    } else {
      const val = d * (Math.floor(Math.random() * 10) + 1);
      q = `Calculate 1/${d} of ${val}.`;
      a = (val / d).toString();
      explanation = `${val} ÷ ${d} = ${a}.`;
    }
  } else if (topic === 'time-money') {
    const type = Math.random();
    if (type < 0.5) {
      const h = Math.floor(Math.random() * 12) + 1;
      const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const add = [15, 30, 45, 60][Math.floor(Math.random() * 4)];
      q = `The clock shows ${h}:${m === 0 ? '00' : m}. What time will it show in ${add} minutes?`;
      let totalM = m + add;
      let resH = h;
      if (totalM >= 60) {
        resH = (h % 12) + 1;
        totalM -= 60;
      }
      a = `${resH}:${totalM === 0 ? '00' : totalM}`;
      explanation = `Adding ${add} minutes results in ${a}.`;
    } else {
      const price = (Math.floor(Math.random() * 18) + 2) * 5;
      const paid = price + (Math.floor(Math.random() * 10) + 1) * 5;
      q = `A book costs ₹${price}. If you pay with a ₹${paid} note, how much change is returned?`;
      a = (paid - price).toString();
      explanation = `₹${paid} minus ₹${price} is ₹${a}.`;
    }
  } else {
    const shapes = [
      { name: "Cube", f: "6", e: "12", v: "8" },
      { name: "Square Pyramid", f: "5", e: "8", v: "5" },
      { name: "Cylinder", f: "3", e: "2", v: "0" },
      { name: "Cone", f: "2", e: "1", v: "1" }
    ];
    const s = shapes[Math.floor(Math.random() * shapes.length)];
    const attr = ["faces", "edges", "vertices"][Math.floor(Math.random() * 3)];
    q = `How many ${attr} are there in a ${s.name}?`;
    a = attr === "faces" ? s.f : attr === "edges" ? s.e : s.v;
    explanation = `A ${s.name} has exactly ${a} ${attr}.`;
  }

  const opts = new Set();
  opts.add(a);
  const correctVal = parseFloat(a);
  while (opts.size < 4) {
    if (!isNaN(correctVal)) {
      const offset = (Math.floor(Math.random() * 30) - 15) || (opts.size * 7);
      const fake = (correctVal + offset).toString();
      if (fake !== a && parseFloat(fake) >= 0) opts.add(fake);
    } else if (a.includes('/')) {
      const [n, d] = a.split('/').map(Number);
      const fake = `${Math.abs(n + Math.floor(Math.random() * 4) - 2)}/${d}`;
      if (fake !== a) opts.add(fake);
    } else if (a.includes(':')) {
      const [h, m] = a.split(':').map(Number);
      const fake = `${(h % 12) + 1}:${(m + 15) % 60 || '00'}`;
      if (fake !== a) opts.add(fake);
    } else {
      opts.add("None of these");
    }
  }

  return { q, options: Array.from(opts).sort(() => Math.random() - 0.5), a, explanation };
}

function generateEnglishQuestion(topic) {
  const pools = {
    vocab: [
      { q: "Choose the synonym for 'Sturdy'.", a: "Strong", o: ["Weak", "Soft", "Bendy"] },
      { q: "What is the opposite of 'Entrance'?", a: "Exit", o: ["Gate", "Door", "Entry"] },
      { q: "Identify the correctly spelled word.", a: "Mountain", o: ["Mountin", "Mauntain", "Montain"] },
      { q: "A person who writes books is an?", a: "Author", o: ["Actor", "Artist", "Athlete"] },
      { q: "What does 'Ancient' mean?", a: "Very Old", o: ["Very New", "Shiny", "Fast"] },
      { q: "Select the odd one out.", a: "Blue", o: ["Apple", "Banana", "Mango"] },
      { q: "Which word means 'to jump'?", a: "Leap", o: ["Sleep", "Sweep", "Peep"] }
    ],
    grammar: [
      { q: "Identify the verb: 'Birds fly in the sky.'", a: "fly", o: ["Birds", "sky", "the"] },
      { q: "What is the plural of 'Mouse'?", a: "Mice", o: ["Mouses", "Micey", "Mouse"] },
      { q: "Fill in: 'She ____ her homework yesterday.'", a: "did", o: ["does", "doing", "do"] },
      { q: "Which is a common noun?", a: "City", o: ["London", "Paris", "Delhi"] },
      { q: "Identify the pronoun: 'We are going to the zoo.'", a: "We", o: ["going", "zoo", "the"] },
      { q: "What is the feminine of 'King'?", a: "Queen", o: ["Princess", "Lady", "Woman"] }
    ],
    sentences: [
      { q: "Which sentence uses capital letters correctly?", a: "I live in India.", o: ["i live in india.", "I live in india.", "i Live In India."] },
      { q: "Reorder: 'is / my / name / Amit'", a: "My name is Amit.", o: ["Amit name is my.", "Name is my Amit.", "Is my name Amit."] },
      { q: "Which is a question?", a: "Can you help me?", o: ["I can help you.", "You help me.", "Please help me."] },
      { q: "Identify the subject: 'The little boy is playing.'", a: "The little boy", o: ["is playing", "playing", "boy playing"] }
    ]
  };

  const pool = pools[topic];
  const base = pool[Math.floor(Math.random() * pool.length)];
  return { q: base.q, a: base.a, options: [base.a, ...base.o].sort(() => Math.random() - 0.5), explanation: `Correct: ${base.a}.` };
}

function generateScienceQuestion(topic) {
  const pools = {
    'plants-animals': [
      { q: "Which animal lives both on land and in water?", a: "Frog", o: ["Fish", "Tiger", "Rabbit"] },
      { q: "Which part of a plant grows into a new plant?", a: "Seed", o: ["Leaf", "Stem", "Flower"] },
      { q: "What do we call animals that eat only plants?", a: "Herbivores", o: ["Carnivores", "Omnivores", "Scavengers"] },
      { q: "Which is the tallest animal in the world?", a: "Giraffe", o: ["Elephant", "Horse", "Ostrich"] },
      { q: "Where does a lion live?", a: "Den", o: ["Nest", "Shed", "Stable"] }
    ],
    hygiene: [
      { q: "We should wash our hands ____ eating.", a: "before", o: ["only after", "never", "while"] },
      { q: "Drinking ____ water is good for health.", a: "clean", o: ["dirty", "salty", "muddy"] },
      { q: "Which of these is NOT a junk food?", a: "Fruits", o: ["Burger", "Pizza", "Chips"] },
      { q: "We should use a ____ while sneezing.", a: "Handkerchief", o: ["Shirt sleeve", "Paper", "Nothing"] }
    ],
    neighborhood: [
      { q: "Who delivers letters to our house?", a: "Postman", o: ["Baker", "Milkman", "Plumber"] },
      { q: "A place where we go to save our money is?", a: "Bank", o: ["Park", "Market", "Cinema"] },
      { q: "Who mends our broken shoes?", a: "Cobbler", o: ["Tailor", "Carpenter", "Barber"] },
      { q: "Which place provides us with basic groceries?", a: "Market", o: ["Hospital", "Police Station", "Cinema Hall"] }
    ]
  };

  const pool = pools[topic];
  const base = pool[Math.floor(Math.random() * pool.length)];
  return { q: base.q, a: base.a, options: [base.a, ...base.o].sort(() => Math.random() - 0.5), explanation: `Correct: ${base.a}.` };
}

function run() {
  const config = {
    math: { file: 'generatedBuilderMathQuestions.json', generator: generateMathQuestion },
    english: { file: 'generatedBuilderEnglishQuestions.json', generator: generateEnglishQuestion },
    evs: { file: 'generatedBuilderScienceQuestions.json', generator: generateScienceQuestion }
  };

  for (const [sub, meta] of Object.entries(config)) {
    const data = {};
    for (const topic of subjects[sub]) {
      data[topic] = {
        practice: Array.from({ length: 30 }, (_, i) => {
          const res = meta.generator(topic, 'practice');
          return { ...res, q: `(P${i+1}) ${res.q}` };
        }),
        challenge: Array.from({ length: 30 }, (_, i) => {
          const res = meta.generator(topic, 'challenge');
          return { ...res, q: `(C${i+1}) ${res.q}` };
        }),
        test: Array.from({ length: 100 }, (_, i) => {
          const res = meta.generator(topic, 'test');
          return { ...res, q: `(T${i+1}) ${res.q}` };
        })
      };
    }
    fs.writeFileSync(path.join(__dirname, '../frontend/src/store', meta.file), JSON.stringify(data, null, 2));
    console.log(`Generated ${meta.file}`);
  }
}

run();
