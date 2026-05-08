import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { 
  ArrowLeft, Type, History, Award, RefreshCcw, 
  ArrowRight, MousePointer2 
} from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const QUESTIONS = {
  1: { // Beginner
    1: [
      { q: "The ___ shines brightly in the sky.", ans: "Sun", options: ["Moon", "Sun", "Star", "Cloud"] },
      { q: "A ___ barks at strangers.", ans: "Dog", options: ["Cat", "Cow", "Dog", "Bird"] },
      { q: "Fish live in the ___.", ans: "Water", options: ["Tree", "Sky", "Water", "House"] },
      { q: "Birds fly in the ___.", ans: "Sky", options: ["Water", "Sky", "Ground", "Space"] },
      { q: "We read a ___ in the library.", ans: "Book", options: ["Game", "Book", "Toy", "Car"] },
      { q: "Apples grow on a ___.", ans: "Tree", options: ["Tree", "Bush", "Rock", "House"] },
      { q: "The ___ is green.", ans: "Leaf", options: ["Fire", "Leaf", "Snow", "Sky"] },
      { q: "I have two ___ to see.", ans: "Eyes", options: ["Ears", "Eyes", "Nose", "Hands"] },
      { q: "A ___ says Meow.", ans: "Cat", options: ["Dog", "Cat", "Lion", "Tiger"] },
      { q: "We sleep on a ___.", ans: "Bed", options: ["Table", "Bed", "Chair", "Desk"] }
    ],
    2: [
      { q: "I drink ___ when I am thirsty.", ans: "Milk", options: ["Milk", "Food", "Sand", "Air"] },
      { q: "The ___ is blue today.", ans: "Sky", options: ["Grass", "Sky", "Dirt", "Mud"] },
      { q: "My ___ is my best friend.", ans: "Sister", options: ["Toy", "Sister", "Pencil", "Box"] },
      { q: "I eat an ___ every day.", ans: "Apple", options: ["Stone", "Apple", "Pen", "Cup"] },
      { q: "A ___ has four legs.", ans: "Chair", options: ["Circle", "Chair", "Cloud", "Sun"] },
      { q: "We use a ___ to write.", ans: "Pen", options: ["Pen", "Eraser", "Bag", "Book"] },
      { q: "The ___ gives us wool.", ans: "Sheep", options: ["Cow", "Sheep", "Hen", "Cat"] },
      { q: "Rain falls from ___.", ans: "Clouds", options: ["Stars", "Clouds", "Sun", "Moon"] },
      { q: "A ___ is a very big animal.", ans: "Elephant", options: ["Mouse", "Ant", "Elephant", "Bee"] },
      { q: "I wear a ___ when it is cold.", ans: "Coat", options: ["Shirt", "Coat", "Hat", "Ring"] }
    ],
    3: [
      { q: "The ___ is the king of the jungle.", ans: "Lion", options: ["Deer", "Lion", "Rabbit", "Mouse"] },
      { q: "I go to ___ every morning.", ans: "School", options: ["Park", "School", "Market", "Cinema"] },
      { q: "A ___ makes honey.", ans: "Bee", options: ["Fly", "Bee", "Ant", "Worm"] },
      { q: "We smell with our ___.", ans: "Nose", options: ["Nose", "Eyes", "Mouth", "Hands"] },
      { q: "The ___ is round.", ans: "Ball", options: ["Ball", "Stick", "Box", "Paper"] },
      { q: "A ___ is a red fruit.", ans: "Cherry", options: ["Cherry", "Lemon", "Banana", "Orange"] },
      { q: "We sit on a ___.", ans: "Chair", options: ["Table", "Chair", "Door", "Window"] },
      { q: "The ___ goes Moo.", ans: "Cow", options: ["Cow", "Horse", "Pig", "Sheep"] },
      { q: "I like to ___ with my toys.", ans: "Play", options: ["Eat", "Play", "Sleep", "Cry"] },
      { q: "Stars shine at ___.", ans: "Night", options: ["Day", "Night", "Noon", "Morning"] }
    ]
  },
  2: { // Intermediate
    1: [
      { q: "I always ___ my hands before eating.", ans: "Wash", options: ["Hide", "Wash", "Eat", "Play"] },
      { q: "The fire is very ___.", ans: "Hot", options: ["Cold", "Hot", "Wet", "Soft"] },
      { q: "He was very ___ after running.", ans: "Tired", options: ["Happy", "Quiet", "Tired", "Fast"] },
      { q: "Please ___ the door when you leave.", ans: "Close", options: ["Break", "Close", "Paint", "Eat"] },
      { q: "The ice cream is very ___.", ans: "Cold", options: ["Hot", "Loud", "Cold", "Spicy"] },
      { q: "Elephants are very ___ animals.", ans: "Big", options: ["Small", "Big", "Tiny", "Fast"] },
      { q: "The ___ is rising in the East.", ans: "Sun", options: ["Moon", "Sun", "Star", "Rain"] },
      { q: "She ___ her homework in the evening.", ans: "Does", options: ["Plays", "Does", "Eats", "Sleeps"] },
      { q: "I can ___ with my ears.", ans: "Hear", options: ["See", "Hear", "Smell", "Taste"] },
      { q: "The grass is ___.", ans: "Green", options: ["Blue", "Green", "Red", "Yellow"] }
    ],
    2: [
      { q: "Birds build ___ in trees.", ans: "Nests", options: ["Houses", "Nests", "Caves", "Holes"] },
      { q: "A ___ is used to cut paper.", ans: "Scissor", options: ["Pencil", "Scissor", "Ruler", "Tape"] },
      { q: "The ___ is the largest planet.", ans: "Jupiter", options: ["Earth", "Mars", "Jupiter", "Venus"] },
      { q: "We brush our ___ every day.", ans: "Teeth", options: ["Hands", "Teeth", "Hair", "Feet"] },
      { q: "The ___ flows into the sea.", ans: "River", options: ["Lake", "River", "Pond", "Pool"] },
      { q: "A ___ can fly high.", ans: "Plane", options: ["Car", "Train", "Plane", "Boat"] },
      { q: "We cook food in the ___.", ans: "Kitchen", options: ["Bedroom", "Kitchen", "Bathroom", "Garden"] },
      { q: "The ___ is our national bird.", ans: "Peacock", options: ["Parrot", "Peacock", "Crow", "Eagle"] },
      { q: "I use a ___ to comb my hair.", ans: "Comb", options: ["Brush", "Comb", "Mirror", "Soap"] },
      { q: "The ___ is very deep.", ans: "Ocean", options: ["Puddle", "Ocean", "Glass", "Bucket"] }
    ],
    3: [
      { q: "A ___ tells us the time.", ans: "Watch", options: ["Phone", "Watch", "Book", "Lamp"] },
      { q: "We use a ___ to travel by water.", ans: "Ship", options: ["Bus", "Ship", "Bike", "Plane"] },
      { q: "The ___ gives us milk.", ans: "Goat", options: ["Tiger", "Goat", "Snake", "Lion"] },
      { q: "My ___ teaches me at school.", ans: "Teacher", options: ["Doctor", "Teacher", "Nurse", "Farmer"] },
      { q: "A ___ has seven colors.", ans: "Rainbow", options: ["Cloud", "Rainbow", "Sun", "Moon"] },
      { q: "We must ___ the traffic rules.", ans: "Follow", options: ["Break", "Follow", "Ignore", "Forget"] },
      { q: "The ___ is the fastest animal.", ans: "Cheetah", options: ["Lion", "Cheetah", "Elephant", "Horse"] },
      { q: "I wear ___ on my feet.", ans: "Shoes", options: ["Gloves", "Shoes", "Socks", "Hats"] },
      { q: "The ___ is sour.", ans: "Lemon", options: ["Sugar", "Lemon", "Honey", "Cake"] },
      { q: "We use a ___ to carry things.", ans: "Basket", options: ["Plate", "Basket", "Spoon", "Fork"] }
    ]
  },
  3: { // Master
    1: [
      { q: "Farmers grow crops in the ___.", ans: "Field", options: ["Kitchen", "Classroom", "City", "Field"] },
      { q: "The ___ helps doctor treat patients.", ans: "Nurse", options: ["Farmer", "Nurse", "Pilot", "Chef"] },
      { q: "A strong ___ blew the leaves away.", ans: "Wind", options: ["Water", "Wind", "Fire", "Earth"] },
      { q: "Always throw trash in the ___.", ans: "Dustbin", options: ["River", "Road", "Dustbin", "Forest"] },
      { q: "We use an ___ when it rains.", ans: "Umbrella", options: ["Apple", "Umbrella", "Engine", "Ostrich"] },
      { q: "Stars twinkle during the ___.", ans: "Night", options: ["Day", "Morning", "Night", "Afternoon"] },
      { q: "A ___ is a place for books.", ans: "Library", options: ["Cinema", "Library", "Stadium", "Mall"] },
      { q: "The ___ is the capital of India.", ans: "Delhi", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"] },
      { q: "We celebrate ___ with colors.", ans: "Holi", options: ["Diwali", "Holi", "Eid", "Christmas"] },
      { q: "A ___ treats sick animals.", ans: "Vet", options: ["Vet", "Doctor", "Dentist", "Nurse"] }
    ],
    2: [
      { q: "The ___ is the brain of computer.", ans: "CPU", options: ["RAM", "CPU", "Mouse", "Screen"] },
      { q: "Oxygen is vital for ___.", ans: "Life", options: ["Death", "Life", "Sleep", "Food"] },
      { q: "The ___ is the tallest animal.", ans: "Giraffe", options: ["Giraffe", "Elephant", "Camel", "Horse"] },
      { q: "We must ___ trees to save earth.", ans: "Plant", options: ["Cut", "Plant", "Burn", "Dry"] },
      { q: "Yoga helps keep us ___.", ans: "Fit", options: ["Fit", "Lazy", "Weak", "Tired"] },
      { q: "The ___ is the closest star to Earth.", ans: "Sun", options: ["Sirius", "Sun", "Polaris", "Mars"] },
      { q: "Honesty is the best ___.", ans: "Policy", options: ["Idea", "Policy", "Gift", "Work"] },
      { q: "The ___ changed the world.", ans: "Wheel", options: ["Box", "Wheel", "Glass", "Stone"] },
      { q: "We get energy from ___.", ans: "Food", options: ["Sleep", "Food", "Water", "Air"] },
      { q: "A ___ is a very dry place.", ans: "Desert", options: ["Forest", "Desert", "Ocean", "River"] }
    ],
    3: [
      { q: "The ___ of India is New Delhi.", ans: "Capital", options: ["Capital", "City", "State", "Village"] },
      { q: "Water boils at ___ degrees.", ans: "100", options: ["0", "50", "100", "200"] },
      { q: "A ___ is a group of stars.", ans: "Galaxy", options: ["Planet", "Galaxy", "Solar", "Orbit"] },
      { q: "Plastic is harmful for the ___.", ans: "Environment", options: ["People", "Environment", "Roads", "Cars"] },
      { q: "The ___ is the father of nation.", ans: "Gandhi", options: ["Nehru", "Gandhi", "Patel", "Azad"] },
      { q: "We should ___ water every day.", ans: "Save", options: ["Waste", "Save", "Throw", "Boil"] },
      { q: "The ___ of light is very high.", ans: "Speed", options: ["Weight", "Speed", "Color", "Size"] },
      { q: "India got independence in ___.", ans: "1947", options: ["1947", "1950", "1942", "1930"] },
      { q: "The ___ is the holy book of Hindus.", ans: "Gita", options: ["Gita", "Quran", "Bible", "Torah"] },
      { q: "A ___ has many pages.", ans: "Book", options: ["Pen", "Book", "Eraser", "Box"] }
    ]
  },
  4: { // Legend
    1: [
      { q: "The process of plants making food is ___.", ans: "Photosynthesis", options: ["Breathing", "Photosynthesis", "Melting", "Growing"] },
      { q: "The smallest unit of life is ___.", ans: "Cell", options: ["Atom", "Cell", "Tissue", "Organ"] },
      { q: "Diamond is the hardest ___.", ans: "Substance", options: ["Liquid", "Substance", "Gas", "Wood"] },
      { q: "The study of stars is ___.", ans: "Astronomy", options: ["Biology", "Astronomy", "Physics", "Chemistry"] },
      { q: "A triangle has ___ sides.", ans: "Three", options: ["Four", "Three", "Five", "Six"] },
      { q: "The currency of USA is ___.", ans: "Dollar", options: ["Rupee", "Dollar", "Euro", "Yen"] },
      { q: "Light travels in a ___ line.", ans: "Straight", options: ["Curvy", "Straight", "Zigzag", "Round"] },
      { q: "Mount Everest is in ___.", ans: "Nepal", options: ["India", "Nepal", "China", "Pakistan"] },
      { q: "The human heart has ___ chambers.", ans: "Four", options: ["Two", "Three", "Four", "Five"] },
      { q: "Sound cannot travel through ___.", ans: "Vacuum", options: ["Air", "Water", "Vacuum", "Steel"] }
    ],
    2: [
      { q: "The Statue of Liberty is in ___.", ans: "New York", options: ["Paris", "London", "New York", "Tokyo"] },
      { q: "The chemical symbol for water is ___.", ans: "H2O", options: ["CO2", "H2O", "O2", "N2"] },
      { q: "A leap year has ___ days.", ans: "366", options: ["365", "366", "360", "370"] },
      { q: "The largest ocean is the ___.", ans: "Pacific", options: ["Indian", "Atlantic", "Pacific", "Arctic"] },
      { q: "Bees carry ___ from flowers.", ans: "Pollen", options: ["Honey", "Pollen", "Water", "Dirt"] },
      { q: "The rainbow has ___ colors.", ans: "Seven", options: ["Five", "Six", "Seven", "Eight"] },
      { q: "Gravity pulls things ___.", ans: "Down", options: ["Up", "Down", "Left", "Right"] },
      { q: "The sun is a giant ball of ___.", ans: "Gas", options: ["Rock", "Gas", "Ice", "Water"] },
      { q: "Electric current is measured in ___.", ans: "Amperes", options: ["Volts", "Amperes", "Watts", "Ohms"] },
      { q: "The Nile is the longest ___.", ans: "River", options: ["Lake", "River", "Ocean", "Desert"] }
    ],
    3: [
      { q: "The Red Planet is ___.", ans: "Mars", options: ["Jupiter", "Mars", "Venus", "Mercury"] },
      { q: "The Amazon is a giant ___.", ans: "Rainforest", options: ["Desert", "Rainforest", "Mountain", "Island"] },
      { q: "Iron rusts due to ___.", ans: "Oxidation", options: ["Heating", "Oxidation", "Cooling", "Melting"] },
      { q: "The Earth revolves around the ___.", ans: "Sun", options: ["Moon", "Sun", "Mars", "Venus"] },
      { q: "Microscopes are used to see ___ things.", ans: "Tiny", options: ["Big", "Tiny", "Far", "Fast"] },
      { q: "The Great Wall is in ___.", ans: "China", options: ["Japan", "China", "Korea", "India"] },
      { q: "A thermometer measures ___.", ans: "Temperature", options: ["Weight", "Temperature", "Speed", "Height"] },
      { q: "The Taj Mahal is in ___.", ans: "Agra", options: ["Delhi", "Agra", "Jaipur", "Lucknow"] },
      { q: "Paper is made from ___.", ans: "Trees", options: ["Rocks", "Trees", "Plastic", "Metal"] },
      { q: "The Earth has one natural ___.", ans: "Moon", options: ["Sun", "Moon", "Star", "Cloud"] }
    ]
  }
};

export default function FillBlanks() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [mistakes, setMistakes] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_fill-blanks_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ currentIdx, score, mistakes, startTime, questions }));
    }
  }, [currentIdx, score, mistakes, gameState, saveKey, startTime, questions]);

  useEffect(() => {
    if (student) {
      fetchProgress();
    }
  }, [student, gameState]);

  const fetchProgress = async () => {
    if (!student) return;
    try {
      const studentId = student.id || student._id;
      const res = await api.get(`/progress/${studentId}`);
      const gameProgress = res.data.filter(p => p.gameId === 'fill-blanks');
      
      console.log(`[FillBlanks] Raw Progress:`, res.data);
      console.log(`[FillBlanks] Filtered:`, gameProgress);

      if (gameProgress.length > 0) {
        let maxMain = 1;
        let maxSub = 0;
        
        gameProgress.forEach(p => {
          const pMain = Number(p.levelNumber);
          const pSub = p.subLevel !== undefined ? Number(p.subLevel) : 1;
          if (!isNaN(pMain) && !isNaN(pSub)) {
            if (pMain > maxMain || (pMain === maxMain && pSub > maxSub)) {
              maxMain = pMain;
              maxSub = pSub;
            }
          }
        });

        let nextMain = maxMain;
        let nextSub = maxSub + 1;
        if (nextSub > 3) {
          nextMain++;
          nextSub = 1;
        }
        
        console.log(`[FillBlanks] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[FillBlanks] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_fill-blanks_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    const currentLevelQuestions = QUESTIONS[mainLevel][sLvl];
    const shuffled = [...currentLevelQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setMistakes([]);
    setFeedback(null);
    setStartTime(Date.now());
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setQuestions(saved.questions || []);
      setCurrentIdx(saved.currentIdx || 0);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setStartTime(saved.startTime || Date.now());
      setGameState('playing');
    }
  };

  const handleAnswer = (option) => {
    if (feedback || gameState !== 'playing') return;
    
    const isCorrect = option === questions[currentIdx].ans;
    setFeedback({ isCorrect, option });

    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setMistakes(prev => [...prev, `For "${questions[currentIdx].q}", you picked "${option}". Correct is "${questions[currentIdx].ans}".`]);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1);
      } else {
        endGame(score + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  const endGame = async (finalScore) => {
    setGameState('round_over');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (student) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Shabd Quest',
          gameId: 'fill-blanks',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: finalScore * 10,
          attempts: 1,
          timeSpent
        });
        if (saveKey) localStorage.removeItem(saveKey);
        fetchProgress();
      } catch (err) { console.error(err); }
    }
  };

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => gameState === 'playing' || gameState === 'round_over' ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-3">
             <span className="font-black text-slate-700 dark:text-slate-200 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
             <span className="font-black text-slate-700 dark:text-slate-200 uppercase text-xs">Score: {score * 10} XP</span>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-violet-500"
                title="Reset Level"
              >
                <RefreshCcw size={20} />
              </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-violet-100 dark:border-slate-800 m-auto z-10"
          >
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-32 h-32 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Type size={64} className="text-violet-500 dark:text-violet-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Fill the Blanks</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Pick the right word to finish the sentence!</p>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                { id: 1, name: 'Beginner', desc: 'Simple Everyday Words', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                { id: 2, name: 'Intermediate', desc: 'Verbs and Adjectives', color: 'bg-violet-500 shadow-[0_8px_0_rgb(139,92,246)]' },
                { id: 3, name: 'Master', desc: 'General Knowledge', color: 'bg-purple-500 shadow-[0_8px_0_rgb(168,85,247)]' },
                { id: 4, name: 'Legend', desc: 'Advanced Contexts', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
              ].map(l => {
                const locked = l.id > unlockedProgress.main;
                return (
                   <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} p-6 rounded-3xl flex items-center justify-between group active:translate-y-2 active:shadow-none transition-all shadow-md text-white relative overflow-hidden`}>
                      <div className="flex items-center space-x-6">
                         <div className={`w-16 h-16 ${locked ? 'bg-slate-200/50' : 'bg-white/20'} text-white rounded-2xl flex items-center justify-center font-black text-2xl`}>{l.id}</div>
                         <div className="text-left">
                            <h4 className="text-xl font-black">{l.name}</h4>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{l.desc}</p>
                         </div>
                      </div>
                      {!locked && (
                        <motion.div 
                          animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/30"
                        >
                          <MousePointer2 size={10} className="text-white" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">Click to Learn</span>
                        </motion.div>
                      )}
                      {locked ? <Award size={24} className="opacity-20" /> : <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
                      {locked && <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]"><Award size={48} className="text-white/20 rotate-12" /></div>}
                   </button>
                );
              })}
            </div>
          </motion.div>
        )}


        {gameState === 'sub_selection' && (
          <motion.div 
            key="sub_selection"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-violet-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-violet-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-violet-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-violet-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-violet-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-violet-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-violet-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(109,40,217)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl w-full flex flex-col pt-16 z-10 m-auto">
            <div className="text-center mb-8">
              <span className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-sm">
                Sentence {currentIdx + 1} of {questions.length}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-slate-100 dark:border-slate-800 mb-12 relative overflow-hidden text-center">
               <h3 className="text-4xl font-bold text-slate-800 dark:text-white leading-relaxed">
                  {questions[currentIdx]?.q.split('___').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`inline-block min-w-[150px] border-b-4 mx-3 px-4 font-black text-3xl transition-all
                          ${feedback ? (feedback.isCorrect ? 'text-emerald-500 border-emerald-500' : 'text-rose-500 border-rose-500') : 'text-violet-500 border-violet-200 dark:border-slate-700 border-dashed animate-pulse'}`}
                        >
                          {feedback ? feedback.option : '?'}
                        </span>
                      )}
                    </span>
                  ))}
               </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {questions[currentIdx]?.options.map((opt, i) => (
                <motion.button
                  whileHover={!feedback ? { scale: 1.05 } : {}} whileTap={!feedback ? { scale: 0.95 } : {}}
                  key={i} onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className={`py-8 rounded-[2.5rem] text-3xl font-black transition-all border-b-8 shadow-sm
                    ${feedback?.option === opt ? 
                      (feedback.isCorrect ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-500 text-white border-rose-700') 
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-violet-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-amber-400 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">Wonderful!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">Score: {score} / {questions.length}</p>
              
              <div className="mb-10 font-black text-6xl text-violet-500 drop-shadow-md bg-violet-50 dark:bg-violet-900/20 py-8 rounded-[2.5rem] border-4 border-violet-100 dark:border-violet-900/30">
                {score * 20} <span className="text-2xl text-violet-300 tracking-widest">XP</span>
              </div>

              {mistakes.length > 0 && (
                <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30">
                  <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Review Session</h4>
                  <ul className="space-y-3">
                    {mistakes.map((m, i) => (
                      <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(109,40,217)] active:shadow-none active:translate-y-2 transition-all text-xl">Play Again ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
