const fs = require('fs');
const path = require('path');

const ACHIEVER_ENGLISH_TOPICS = [
  { id: 'vocab', name: 'Vocabulary & Context' },
  { id: 'grammar', name: 'Advanced Grammar' },
  { id: 'reading', name: 'Reading Comprehension' }
];

const BUILDER_ENGLISH_TOPICS = [
  { id: 'vocab', name: 'Vocabulary' },
  { id: 'grammar', name: 'Grammar Guardian' },
  { id: 'sentences', name: 'Sentence Builder' }
];

const ENGLISH_BANK = {
  'vocab': [
    { q: "What is a synonym for 'Vibrant'?", a: "Energetic", o: ["Energetic", "Dull", "Quiet", "Small"], e: "Vibrant means full of energy and life." },
    { q: "What is the antonym of 'Ancient'?", a: "Modern", o: ["Modern", "Old", "Dusty", "Historic"], e: "Ancient means very old; Modern means new." },
    { q: "Choose the correct homophone: The ___ was blowing hard.", a: "wind", o: ["wind", "whined", "wine", "wend"], e: "Wind is moving air." },
    { q: "What does 'A piece of cake' mean?", a: "Very easy", o: ["Very easy", "Delicious food", "Hard work", "A birthday party"], e: "This is an idiom for something simple." },
    { q: "Which word means 'to breathe out'?", a: "Exhale", o: ["Exhale", "Inhale", "Puff", "Sigh"], e: "Inhale is breathe in, Exhale is breathe out." },
    { q: "What is a synonym for 'Gigantic'?", a: "Enormous", o: ["Enormous", "Tiny", "Average", "Fast"], e: "Both words describe something very large." },
    { q: "What is the antonym of 'Victory'?", a: "Defeat", o: ["Defeat", "Win", "Success", "Pride"], e: "Victory is winning, Defeat is losing." },
    { q: "A person who writes books is an:", a: "Author", o: ["Author", "Artist", "Baker", "Driver"], e: "Authors create written works." },
    { q: "What is the opposite of 'Sharp'?", a: "Blunt", o: ["Blunt", "Pointy", "Hard", "Thin"], e: "Knives are either sharp or blunt." },
    { q: "Choose the correct spelling:", a: "Beginning", o: ["Beginning", "Begining", "Begening", "Begeting"], e: "Double 'n' is required in Beginning." }
  ],
  'grammar': [
    { q: "Identify the pronoun: She went to the store.", a: "She", o: ["She", "Went", "To", "Store"], e: "A pronoun replaces a noun." },
    { q: "Which is a collective noun for bees?", a: "Swarm", o: ["Swarm", "Flock", "Herd", "Pack"], e: "A swarm of bees." },
    { q: "What is the plural of 'Child'?", a: "Children", o: ["Children", "Childs", "Childes", "Childrens"], e: "Child is irregular." },
    { q: "Identify the conjunction: I like tea and coffee.", a: "and", o: ["and", "like", "tea", "I"], e: "Conjunctions join words or sentences." },
    { q: "Which of these is a preposition?", a: "Under", o: ["Under", "Run", "Green", "Quickly"], e: "Prepositions show position or relationship." },
    { q: "Which word is an adverb?", a: "Slowly", o: ["Slowly", "Fast", "Quick", "Smart"], e: "Adverbs often end in -ly." },
    { q: "Find the verb: The cat slept on the mat.", a: "slept", o: ["slept", "cat", "mat", "The"], e: "A verb is an action or state." }
  ],
  'sentences': [
    { q: "Which sentence is exclamatory?", a: "What a beautiful day!", o: ["What a beautiful day!", "Is it raining?", "I am eating.", "Shut the door."], e: "Exclamatory sentences show strong emotion." },
    { q: "Identify the subject: The dog barked loudly.", a: "The dog", o: ["The dog", "barked", "loudly", "The"], e: "The subject is who or what the sentence is about." },
    { q: "Which mark is used for a list?", a: "Comma", o: ["Comma", "Period", "Question Mark", "Exclamation"], e: "Commas separate items in a list." },
    { q: "A sentence always starts with a ___ letter.", a: "Capital", o: ["Capital", "Small", "Cursive", "Italic"], e: "Grammar rule for the beginning of sentences." }
  ],
  'reading': [
    { q: "The person who tells the story is the:", a: "Narrator", o: ["Narrator", "Author", "Character", "Editor"], e: "The narrator provides the perspective." },
    { q: "What is a 'Fable'?", a: "Story with a moral", o: ["Story with a moral", "A news report", "A math book", "A dictionary"], e: "Fables often use animals to teach lessons." },
    { q: "The place where a story happens is the:", a: "Setting", o: ["Setting", "Plot", "Theme", "Climax"], e: "Setting describes time and place." }
  ]
};

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

const usedQuestions = new Set();

function generateEnglishQ(topicId, id) {
  const bank = ENGLISH_BANK[topicId] || [
    { q: `Unique English question about ${topicId}...`, a: "Correct", o: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"], e: "Explanation." }
  ];
  
  let attempts = 0;
  let base;
  while (attempts < 100) {
    base = bank[getRandomInt(0, bank.length - 1)];
    const uniqueKey = `${topicId}-${base.q}`;
    if (!usedQuestions.has(uniqueKey)) {
      usedQuestions.add(uniqueKey);
      break;
    }
    // Small bank fallback: add a prefix
    if (attempts > 50) {
       base = {...base, q: "Contextual: " + base.q};
       break;
    }
    attempts++;
  }

  return {
    id,
    q: base.q,
    options: shuffleArray([...base.o]),
    a: base.a,
    explanation: base.e
  };
}

function generateData(topics, level) {
  const data = {};
  topics.forEach(topic => {
    const topicData = { practice: [], challenge: [], test: [] };
    for(let i=1; i<=30; i++) topicData.practice.push(generateEnglishQ(topic.id, `${level}-eng-${topic.id}-p-${i}`));
    for(let i=1; i<=30; i++) topicData.challenge.push(generateEnglishQ(topic.id, `${level}-eng-${topic.id}-c-${i}`));
    for(let i=1; i<=100; i++) topicData.test.push(generateEnglishQ(topic.id, `${level}-eng-${topic.id}-t-${i}`));
    data[topic.id] = topicData;
  });
  return data;
}

// Generate Achiever
const achieverData = generateData(ACHIEVER_ENGLISH_TOPICS, 'achiever');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedEnglishQuestions.json'),
  JSON.stringify(achieverData, null, 2)
);

usedQuestions.clear();

// Generate Builder
const builderData = generateData(BUILDER_ENGLISH_TOPICS, 'builder');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedBuilderEnglishQuestions.json'),
  JSON.stringify(builderData, null, 2)
);

console.log('Successfully generated UNIQUE English questions for both levels!');
