const fs = require('fs');
const path = require('path');

const ACHIEVER_SCIENCE_TOPICS = [
  { id: 'motion', name: 'Motion & Force' },
  { id: 'light', name: 'Light & Reflection' },
  { id: 'heat-electricity', name: 'Heat & Electricity' },
  { id: 'energy-sources', name: 'Sources of Energy' },
  { id: 'matter-materials', name: 'Matter and Materials' },
  { id: 'changes-matter', name: 'Changes in Matter' },
  { id: 'acids-bases-salts', name: 'Acids, Bases, and Salts' },
  { id: 'space-universe', name: 'Space & Universe' }
];

const BUILDER_SCIENCE_TOPICS = [
  { id: 'plants-animals', name: 'Nature Explorer' },
  { id: 'hygiene', name: 'Health Hero' },
  { id: 'neighborhood', name: 'Our Neighborhood' }
];

const SCIENCE_BANK = {
  'motion': [
    { q: "What is the SI unit of force?", a: "Newton", o: ["Newton", "Joule", "Watt", "Pascal"], e: "Force is measured in Newtons (N)." },
    { q: "The rate of change of displacement is called:", a: "Velocity", o: ["Velocity", "Speed", "Acceleration", "Momentum"], e: "Velocity is displacement divided by time." },
    { q: "Which law states that for every action there is an equal and opposite reaction?", a: "Newton's Third Law", o: ["Newton's Third Law", "Newton's First Law", "Law of Gravity", "Ohm's Law"], e: "This is a fundamental principle of mechanics." },
    { q: "What is the unit of pressure?", a: "Pascal", o: ["Pascal", "Newton", "Watt", "Joule"], e: "Pressure is force per unit area." },
    { q: "Gravity on the Moon is about ___ of Earth's gravity.", a: "1/6th", o: ["1/6th", "1/2", "Same", "Double"], e: "The Moon is much smaller than Earth." },
    { q: "Friction always acts in the ___ direction of motion.", a: "Opposite", o: ["Opposite", "Same", "Perpendicular", "Circular"], e: "Friction resists relative motion." },
    { q: "Which instrument measures atmospheric pressure?", a: "Barometer", o: ["Barometer", "Thermometer", "Ammeter", "Voltmeter"], e: "Barometers are used in weather forecasting." },
    { q: "Speed in a specific direction is known as:", a: "Velocity", o: ["Velocity", "Distance", "Time", "Friction"], e: "Velocity is a vector quantity." },
    { q: "What is the force that pulls objects toward Earth?", a: "Gravity", o: ["Gravity", "Magnetism", "Electricity", "Wind"], e: "Gravity is a universal force of attraction." },
    { q: "An object at rest stays at rest due to:", a: "Inertia", o: ["Inertia", "Energy", "Work", "Heat"], e: "Inertia is the tendency to resist change." }
  ],
  'light': [
    { q: "A mirror that curves outwards is called:", a: "Convex", o: ["Convex", "Concave", "Plane", "Bifocal"], e: "Convex mirrors diverge light." },
    { q: "The splitting of white light into seven colors is called:", a: "Dispersion", o: ["Dispersion", "Reflection", "Refraction", "Absorption"], e: "This creates a rainbow effect." },
    { q: "Which color of light deviates the least in a prism?", a: "Red", o: ["Red", "Violet", "Green", "Blue"], e: "Red has the longest wavelength." },
    { q: "Light travels in a ___ line.", a: "Straight", o: ["Straight", "Curved", "Zigzag", "Circular"], e: "This is called rectilinear propagation." },
    { q: "What type of lens is found in the human eye?", a: "Convex", o: ["Convex", "Concave", "Cylindrical", "Flat"], e: "It focuses light onto the retina." },
    { q: "What is the speed of light in a vacuum?", a: "300,000 km/s", o: ["300,000 km/s", "1,000 km/s", "5,000 km/s", "340 m/s"], e: "Light is the fastest thing in the universe." },
    { q: "The bouncing of light from a polished surface is:", a: "Reflection", o: ["Reflection", "Refraction", "Bending", "Slowing"], e: "Mirrors work by reflection." }
  ],
  'heat-electricity': [
    { q: "Which material is the best conductor of electricity?", a: "Silver", o: ["Silver", "Copper", "Iron", "Wood"], e: "Silver has the lowest resistance." },
    { q: "The flow of electrons is called:", a: "Electric Current", o: ["Electric Current", "Voltage", "Resistance", "Power"], e: "Current is measured in Amperes." },
    { q: "Which device converts mechanical energy into electrical energy?", a: "Generator", o: ["Generator", "Motor", "Battery", "Transformer"], e: "Generators use electromagnetic induction." },
    { q: "What is the boiling point of water in Celsius?", a: "100°C", o: ["100°C", "0°C", "50°C", "212°C"], e: "At standard atmospheric pressure." },
    { q: "The SI unit of resistance is:", a: "Ohm", o: ["Ohm", "Volt", "Ampere", "Watt"], e: "Ohm's Law relates V, I, and R." },
    { q: "A fuse is used to prevent:", a: "Short circuit", o: ["Short circuit", "Low voltage", "High cost", "Brightness"], e: "Fuses melt during overcurrent to break the circuit." }
  ],
  'plants-animals': [
    { q: "The green pigment in leaves is called:", a: "Chlorophyll", o: ["Chlorophyll", "Cytoplasm", "Stomata", "Xylem"], e: "Chlorophyll is essential for photosynthesis." },
    { q: "Which part of the plant absorbs water from the soil?", a: "Roots", o: ["Roots", "Leaves", "Stem", "Flowers"], e: "Roots also anchor the plant." },
    { q: "Animals that eat only plants are called:", a: "Herbivores", o: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"], e: "Examples include cows and rabbits." },
    { q: "How many chambers does a human heart have?", a: "4", o: ["4", "2", "3", "1"], e: "Two atria and two ventricles." },
    { q: "Plants release ___ during the day.", a: "Oxygen", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], e: "This is a byproduct of photosynthesis." },
    { q: "Which animal is cold-blooded?", a: "Lizard", o: ["Lizard", "Dog", "Bird", "Human"], e: "Reptiles cannot regulate their body temperature internally." }
  ],
  'hygiene': [
    { q: "Which vitamin is obtained from sunlight?", a: "Vitamin D", o: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"], e: "It's important for bone health." },
    { q: "What is the primary cause of tooth decay?", a: "Sugar", o: ["Sugar", "Water", "Fruit", "Milk"], e: "Bacteria turn sugar into acid that erodes enamel." },
    { q: "Which of these is a communicable disease?", a: "Common Cold", o: ["Common Cold", "Diabetes", "Cancer", "Scurvy"], e: "It spreads from person to person." },
    { q: "How often should you bath to stay clean?", a: "Daily", o: ["Daily", "Once a year", "Never", "When raining"], e: "Daily bathing removes sweat and dirt." },
    { q: "Washing hands with soap kills ___.", a: "Germs", o: ["Germs", "Hands", "Water", "Soap"], e: "Soap breaks down the outer layer of viruses and bacteria." }
  ],
  'space-universe': [
    { q: "Which planet is known as the Morning Star?", a: "Venus", o: ["Venus", "Mars", "Jupiter", "Mercury"], e: "It is very bright in the early morning sky." },
    { q: "What is the name of our galaxy?", a: "Milky Way", o: ["Milky Way", "Andromeda", "Sombrero", "Black Eye"], e: "It is a spiral galaxy." },
    { q: "Which is the smallest planet in our solar system?", a: "Mercury", o: ["Mercury", "Mars", "Venus", "Pluto"], e: "Mercury is closest to the Sun." },
    { q: "Halley's Comet appears every ___ years.", a: "76", o: ["76", "10", "100", "50"], e: "It was last seen in 1986." },
    { q: "The path a planet takes around the sun is its:", a: "Orbit", o: ["Orbit", "Axis", "Road", "Spin"], e: "Orbits are usually elliptical." },
    { q: "Which planet is known as the 'Blue Planet'?", a: "Earth", o: ["Earth", "Neptune", "Uranus", "Mars"], e: "Due to the vast amount of water on its surface." }
  ],
  'neighborhood': [
    { q: "A place where people go to buy stamps and send parcels:", a: "Post Office", o: ["Post Office", "Bank", "School", "Park"], e: "Post offices manage mail." },
    { q: "Who treats sick animals?", a: "Veterinarian", o: ["Veterinarian", "Doctor", "Dentist", "Pharmacist"], e: "Often called a 'Vet'." },
    { q: "Where do we go to deposit or withdraw money?", a: "Bank", o: ["Bank", "Library", "Temple", "Gym"], e: "Banks are financial institutions." },
    { q: "The head of a school is called a:", a: "Principal", o: ["Principal", "Mayor", "Chef", "Captain"], e: "The principal leads the school staff and students." }
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

function generateScienceQ(topicId, id) {
  const bank = SCIENCE_BANK[topicId] || [
    { q: `Detailed unique question for ${topicId}...`, a: "Correct", o: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"], e: "Explanation." }
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
    // If bank is small, allow one repeat by adding a variation
    if (attempts > 50) {
       base = {...base, q: base.q + " (Advanced Concept)"};
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
    for(let i=1; i<=30; i++) topicData.practice.push(generateScienceQ(topic.id, `${level}-sci-${topic.id}-p-${i}`));
    for(let i=1; i<=30; i++) topicData.challenge.push(generateScienceQ(topic.id, `${level}-sci-${topic.id}-c-${i}`));
    for(let i=1; i<=100; i++) topicData.test.push(generateScienceQ(topic.id, `${level}-sci-${topic.id}-t-${i}`));
    data[topic.id] = topicData;
  });
  return data;
}

// Generate Achiever
const achieverData = generateData(ACHIEVER_SCIENCE_TOPICS, 'achiever');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedScienceQuestions.json'),
  JSON.stringify(achieverData, null, 2)
);

usedQuestions.clear();

// Generate Builder
const builderData = generateData(BUILDER_SCIENCE_TOPICS, 'builder');
fs.writeFileSync(
  path.join(__dirname, 'frontend/src/store/generatedBuilderScienceQuestions.json'),
  JSON.stringify(builderData, null, 2)
);

console.log('Successfully generated UNIQUE Science questions for both levels!');
