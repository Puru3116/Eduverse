import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft, Clock, Zap, ShieldAlert, Award, ArrowRight, History, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const SCENARIOS = {
  1: { // Beginner: Home & Personal Safety
    1: [ // Mission 1.1: Fire Safety
      { text: "Play with matches", safe: false, reason: "Matches can start uncontrollable fires." },
      { text: "Crawl low under smoke", safe: true, reason: "Smoke rises, so crawling keeps you breathing clean air." },
      { text: "Throw water on an oil fire", safe: false, reason: "Water spreads oil fires violently." },
      { text: "Call 101 in a fire emergency", safe: true, reason: "Emergency services can help put out fires." },
      { text: "Hide under the bed during fire", safe: false, reason: "Firefighters won't be able to find you easily." },
      { text: "Test door handles for heat", safe: true, reason: "A hot handle means fire is behind the door." },
      { text: "Use elevator during fire", safe: false, reason: "Elevators can get stuck and fill with smoke." },
      { text: "Stay calm and exit quickly", safe: true, reason: "Panic leads to mistakes; clear exits are safer." },
      { text: "Stop, Drop, and Roll if clothes catch fire", safe: true, reason: "This smothers the flames." },
      { text: "Go back inside for toys", safe: false, reason: "Life is more important than belongings." }
    ],
    2: [ // Mission 1.2: Electrical & Sharp Objects
      { text: "Put a fork in a toaster", safe: false, reason: "Metal conducts electricity and causes shocks." },
      { text: "Dry hands before touching switches", safe: true, reason: "Water conducts electricity." },
      { text: "Play with electrical wires", safe: false, reason: "Exposed wires can cause fatal shocks." },
      { text: "Use scissors with adult supervision", safe: true, reason: "Scissors are sharp and can cause deep cuts." },
      { text: "Run with a knife", safe: false, reason: "Falling with a knife is very dangerous." },
      { text: "Climb on high furniture", safe: false, reason: "Furniture can tip over and crush you." },
      { text: "Keep floors clear of toys", safe: true, reason: "prevents tripping and falling." },
      { text: "Drink unknown liquids in bottles", safe: false, reason: "Could be poisonous chemicals." },
      { text: "Wear shoes when walking on glass", safe: true, reason: "Protects feet from sharp cuts." },
      { text: "Pull plugs by the cord", safe: false, reason: "Can damage the wire and cause a fire." }
    ],
    3: [ // Mission 1.3: Personal Hygiene & Food
      { text: "Wash hands after using toilet", safe: true, reason: "Prevents the spread of germs." },
      { text: "Eat food that fell on the floor", safe: false, reason: "Germs stick to food instantly." },
      { text: "Brush teeth twice a day", safe: true, reason: "Prevents cavities and tooth decay." },
      { text: "Share toothbrushes with friends", safe: false, reason: "Transfers germs and bacteria." },
      { text: "Wash fruits before eating", safe: true, reason: "Removes dirt and pesticides." },
      { text: "Eat rotten vegetables", safe: false, reason: "Causes food poisoning." },
      { text: "Cover mouth when sneezing", safe: true, reason: "Prevents germs from flying into the air." },
      { text: "Bite your fingernails", safe: false, reason: "Germs under nails get into your mouth." },
      { text: "Drink boiled or filtered water", safe: true, reason: "Kills harmful water-borne germs." },
      { text: "Sleep 8 hours every night", safe: true, reason: "Helps your body grow and stay healthy." }
    ]
  },
  2: { // Intermediate: Outdoor & Community
    1: [ // Mission 2.1: Road Safety
      { text: "Look both ways before crossing", safe: true, reason: "Helps you see coming vehicles." },
      { text: "Play football on the road", safe: false, reason: "Drivers may not see you in time." },
      { text: "Cross at a zebra crossing", safe: true, reason: "Drivers are expected to stop there." },
      { text: "Run across moving traffic", safe: false, reason: "Vehicles cannot stop instantly." },
      { text: "Walk facing traffic on roads", safe: true, reason: "You can see vehicles coming toward you." },
      { text: "Lean out of a moving bus", safe: false, reason: "You could strike an object or fall out." },
      { text: "Wear a helmet while cycling", safe: true, reason: "Protects your head in case of a fall." },
      { text: "Cycle at night without lights", safe: false, reason: "Drivers cannot see you in the dark." },
      { text: "Hold onto a moving vehicle", safe: false, reason: "Extremely dangerous and can cause fatal falls." },
      { text: "Follow traffic signals", safe: true, reason: "Signals keep everyone on the road safe." }
    ],
    2: [ // Mission 2.2: Water Safety
      { text: "Swim alone in the river", safe: false, reason: "Currents can pull you away suddenly." },
      { text: "Wear a life jacket on a boat", safe: true, reason: "Keeps you afloat if you fall in." },
      { text: "Jump into unknown deep water", safe: false, reason: "There could be hidden rocks or logs." },
      { text: "Swim during a thunderstorm", safe: false, reason: "Water conducts lightning strikes." },
      { text: "Wait 30 mins after eating to swim", safe: true, reason: "Prevents stomach cramps while swimming." },
      { text: "Push friends into the pool", safe: false, reason: "Can cause accidental drowning or injury." },
      { text: "Follow the lifeguard's rules", safe: true, reason: "They are trained to keep you safe." },
      { text: "Drink directly from a pond", safe: false, reason: "Pond water contains harmful parasites." },
      { text: "Stay away from fast currents", safe: true, reason: "Strong water can overpower even good swimmers." },
      { text: "Call for help if you see someone drowning", safe: true, reason: "Professional help is needed immediately." }
    ],
    3: [ // Mission 2.3: Weather & Environment
      { text: "Stay under a tree in a storm", safe: false, reason: "Trees attract lightning strikes." },
      { text: "Carry an umbrella with metal tip in storm", safe: false, reason: "Metal attracts lightning." },
      { text: "Stay indoors during heavy rain", safe: true, reason: "Protects from floods and falling branches." },
      { text: "Play in stagnant puddles", safe: false, reason: "Mosquitoes breed there and spread diseases." },
      { text: "Wear light clothes in summer", safe: true, reason: "Helps keep your body cool." },
      { text: "Walk on thin ice over a lake", safe: false, reason: "Ice can break and you can fall in." },
      { text: "Wear a sweater in winter", safe: true, reason: "Prevents your body from losing heat." },
      { text: "Stay out in the sun too long", safe: false, reason: "Causes heatstroke and sunburn." },
      { text: "Drink plenty of water in summer", safe: true, reason: "Prevents dehydration." },
      { text: "Touch fallen power lines", safe: false, reason: "Lines are still live and very dangerous." }
    ]
  },
  3: { // Master: Nature & Wildlife
    1: [ // Mission 3.1: Animal Encounters
      { text: "Poke a sleeping snake", safe: false, reason: "Startled snakes will strike back." },
      { text: "Walk loudly in tall grass", safe: true, reason: "Noise scares away hidden animals." },
      { text: "Try to pet a stray dog", safe: false, reason: "Stray animals can bite and carry rabies." },
      { text: "Feed wild monkeys", safe: false, reason: "Monkeys can become aggressive for food." },
      { text: "Give space to a mother animal", safe: true, reason: "Mothers are very protective of their young." },
      { text: "Pick up a scorpion", safe: false, reason: "Scorpions have a painful and toxic sting." },
      { text: "Keep distance from bee hives", safe: true, reason: "Disturbing them leads to painful stings." },
      { text: "Tease a tied-up bull", safe: false, reason: "The animal can break loose and attack." },
      { text: "Wash a dog bite with soap and water", safe: true, reason: "First step to prevent infection." },
      { text: "Go near wild elephants", safe: false, reason: "They are huge and can be very dangerous." }
    ],
    2: [ // Mission 3.2: Plants & Woods
      { text: "Eat unknown wild berries", safe: false, reason: "Many wild berries are poisonous." },
      { text: "Touch colorful mushrooms", safe: false, reason: "Bright colors often mean they are toxic." },
      { text: "Use a map in the forest", safe: true, reason: "Helps you avoid getting lost." },
      { text: "Light a campfire near dry leaves", safe: false, reason: "Can start a dangerous forest fire." },
      { text: "Identify poison ivy before touching", safe: true, reason: "Prevents painful skin rashes." },
      { text: "Throw trash in the forest", safe: false, reason: "Harms animals and the environment." },
      { text: "Stay on the marked path", safe: true, reason: "Marked paths are safer and clearer." },
      { text: "Go into a cave alone", safe: false, reason: "Caves can collapse or have wild animals." },
      { text: "Carry a whistle while hiking", safe: true, reason: "Useful for signaling for help if lost." },
      { text: "Shake a tree with a beehive", safe: false, reason: "Causes bees to attack everyone nearby." }
    ],
    3: [ // Mission 3.3: First Aid Basics
      { text: "Apply ice to a burn", safe: false, reason: "Ice can damage the skin tissue further." },
      { text: "Clean a wound with antiseptic", safe: true, reason: "Kills germs and prevents infection." },
      { text: "Squeeze a bee sting out", safe: false, reason: "Pushes more venom into your body." },
      { text: "Keep a first aid kit ready", safe: true, reason: "Essential for quick help in injuries." },
      { text: "Tilt head back for nosebleed", safe: false, reason: "Blood can go down into your throat." },
      { text: "Pinch nose for nosebleed", safe: true, reason: "Helps the blood to clot and stop." },
      { text: "Move someone with a back injury", safe: false, reason: "Can cause permanent damage." },
      { text: "Cover a cut with a clean bandage", safe: true, reason: "Protects the wound from dirt." },
      { text: "Ignore a deep rusty nail cut", safe: false, reason: "Can lead to dangerous tetanus infection." },
      { text: "Call an adult for any injury", safe: true, reason: "Adults can provide proper care and help." }
    ]
  },
  4: { // Legend: Emergency Response
    1: [ // Mission 4.1: Earthquake & Natural Disaster
      { text: "Stay under a sturdy table", safe: true, reason: "Protects you from falling objects." },
      { text: "Run outside during shaking", safe: false, reason: "Buildings can crumble onto the street." },
      { text: "Stay away from windows", safe: true, reason: "Glass can shatter and cause injury." },
      { text: "Use stairs during earthquake", safe: true, reason: "Much safer than using elevators." },
      { text: "Light a match if you smell gas", safe: false, reason: "Gas leaks can cause explosions." },
      { text: "Go to high ground during a tsunami", safe: true, reason: "Keeps you safe from massive waves." },
      { text: "Stay in your car during a flood", safe: false, reason: "Cars can be swept away easily." },
      { text: "Keep an emergency bag ready", safe: true, reason: "Essential for survival during disasters." },
      { text: "Follow official instructions", safe: true, reason: "Authorities know the safest path." },
      { text: "Panic and scream loudly", safe: false, reason: "Wastes energy and scares others." }
    ],
    2: [ // Mission 4.2: First Response
      { text: "Check if the area is safe first", safe: true, reason: "You shouldn't become a second victim." },
      { text: "Try to move an unconscious person", safe: false, reason: "Could worsen unknown injuries." },
      { text: "Check for breathing", safe: true, reason: "First step in checking someone's health." },
      { text: "Give water to an unconscious person", safe: false, reason: "They could choke on the water." },
      { text: "Know your emergency numbers", safe: true, reason: "Crucial for getting help quickly." },
      { text: "Stay with the victim until help arrives", safe: true, reason: "Provides comfort and monitoring." },
      { text: "Hide an accident from parents", safe: false, reason: "Delays necessary medical help." },
      { text: "Keep your house address memorized", safe: true, reason: "Helps you tell emergency services where to go." },
      { text: "Use a phone during a fire", safe: true, reason: "Necessary to call for professional help." },
      { text: "Perform CPR without training", safe: false, reason: "Can cause more harm than good." }
    ],
    3: [ // Mission 4.3: Ultimate Survival
      { text: "Stay calm in any emergency", safe: true, reason: "Clear thinking saves lives." },
      { text: "Follow the 'Check-Call-Care' rule", safe: true, reason: "Standard procedure for first aid." },
      { text: "Use your school safety drills", safe: true, reason: "They are practiced for real situations." },
      { text: "Ignore a smoke alarm", safe: false, reason: "Alarms warn you before fire spreads." },
      { text: "Know the exits in a building", safe: true, reason: "Helps you escape quickly if needed." },
      { text: "Stay in a group during evacuation", safe: true, reason: "Harder to get lost or left behind." },
      { text: "Take photos of a disaster for social media", safe: false, reason: "Wastes time and puts you in danger." },
      { text: "Listen to the radio for news", safe: true, reason: "Source of official safety information." },
      { text: "Help others if it is safe for you", safe: true, reason: "Community help saves more lives." },
      { text: "Always have a family safety plan", safe: true, reason: "Everyone knows what to do." }
    ]
  }
};

export default function QuickDecision() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [currentIdx, setCurrentIdx] = useState(0); 
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50); 
  const [mistakes, setMistakes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_quick-decision_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ currentIdx, score, mistakes, timeLeft, startTime, questions }));
    }
  }, [currentIdx, score, mistakes, timeLeft, gameState, saveKey, startTime, questions]);

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
      const gameProgress = res.data.filter(p => p.gameId === 'quick-decision');
      
      console.log(`[QuickDec] Raw Progress:`, res.data);
      console.log(`[QuickDec] Filtered:`, gameProgress);

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
        
        console.log(`[QuickDec] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[QuickDec] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 100);
    } else if (timeLeft <= 0 && gameState === 'playing') {
      handleDecision(null); 
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_quick-decision_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    const qSet = SCENARIOS[mainLevel][sLvl];
    setQuestions([...qSet].sort(() => 0.5 - Math.random()));
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(50 - (mainLevel * 5)); // Higher levels give less time
    setMistakes([]);
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
      setTimeLeft(saved.timeLeft || 0);
      setStartTime(saved.startTime || Date.now());
      setGameState('playing');
    }
  };

  const handleDecision = (userDecisionSafe) => {
    if (gameState !== 'playing') return;
    const q = questions[currentIdx];
    
    if (userDecisionSafe !== null && q.safe === userDecisionSafe) {
      setScore(s => s + 50 + timeLeft);
    } else {
      let mistakeText = userDecisionSafe === null 
        ? `Too slow on "${q.text}".` 
        : `Wrong choice for "${q.text}".`;
      setMistakes(prev => [...prev, `${mistakeText} ${q.reason}`]);
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setTimeLeft(50 - (mainLevel * 5));
    } else {
      finishLevel();
    }
  };

  const finishLevel = async () => {
    setGameState('round_over');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (student && api) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Rural Quest',
          gameId: 'quick-decision',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: score * 10,
          attempts: 1,
          timeSpent
        });
        if (saveKey) localStorage.removeItem(saveKey);
        fetchProgress();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => (gameState === 'playing' || gameState === 'round_over' || gameState === 'sub_selection') ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-6">
             <span className="font-black text-amber-500 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
             <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
                <Zap size={20} className="text-amber-500 fill-amber-500" />
                <span className="font-black text-xl text-slate-700 dark:text-slate-200">{score}</span>
                <button 
                  onClick={() => startMission(subLevel, true)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-amber-500"
                  title="Reset Level"
                >
                  <RefreshCcw size={20} />
                </button>
             </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-amber-100 dark:border-slate-800 m-auto z-10"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-32 h-32 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Zap size={64} className="text-amber-500 dark:text-amber-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Survival Deck</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Fast decisions save lives! Choose a scenario to begin.</p>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, name: 'Beginner', desc: 'Home & Personal Safety', color: 'from-emerald-500 to-green-600' },
                 { id: 2, name: 'Intermediate', desc: 'Outdoor & Community', color: 'from-blue-500 to-indigo-600' },
                 { id: 3, name: 'Master', desc: 'Nature & Wildlife', color: 'from-amber-500 to-orange-600' },
                 { id: 4, name: 'Legend', desc: 'Emergency Response', color: 'from-rose-500 to-red-600' }
               ].map(l => {
                const locked = l.id > unlockedProgress.main;
                return (
                   <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} p-6 rounded-3xl flex items-center justify-between group active:translate-y-2 active:shadow-none transition-all shadow-md text-white relative overflow-hidden bg-gradient-to-r`}>
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-amber-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-amber-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-amber-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-amber-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-amber-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}



        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-amber-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-amber-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(180,83,9)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl w-full flex flex-col pt-16 z-10 m-auto text-center">
             <div className="mb-6 flex justify-between items-center px-4">
                <span className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-sm">Threat {currentIdx + 1} of {questions.length}</span>
                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border-2 border-amber-100 dark:border-slate-800">
                   <span className="font-black dark:text-white uppercase text-xs tracking-tighter">Level {mainLevel}</span>
                </div>
             </div>

             <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded-full mb-12 shadow-inner p-1.5 overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full ${timeLeft < 15 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / (50 - (mainLevel * 5))) * 100}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={currentIdx}
                 initial={{ x: 100, opacity: 0, rotate: 5 }} animate={{ x: 0, opacity: 1, rotate: 0 }} exit={{ x: -100, opacity: 0, rotate: -5 }}
                 className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl border-b-[20px] border-slate-100 dark:border-slate-800 min-h-[350px] flex items-center justify-center mb-16 relative overflow-hidden"
               >
                 <div className="absolute top-0 left-0 w-full h-2 bg-amber-500/20" />
                 <h2 className="text-4xl font-black text-slate-800 dark:text-white leading-snug drop-shadow-sm">
                   {questions[currentIdx]?.text}
                 </h2>
               </motion.div>
             </AnimatePresence>

            <div className="flex space-x-6 w-full px-4">
              <button onClick={() => handleDecision(false)} className="flex-1 py-12 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-[3rem] shadow-[0_12px_0_rgb(190,18,60)] text-4xl active:shadow-none active:translate-y-3 active:border-b-0 transition-all uppercase tracking-widest">UNSAFE</button>
              <button onClick={() => handleDecision(true)}  className="flex-1 py-12 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[3rem] shadow-[0_12px_0_rgb(5,150,105)] text-4xl active:shadow-none active:translate-y-3 active:border-b-0 transition-all uppercase tracking-widest">SAFE</button>
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-amber-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-amber-500 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">Round Over!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">Scenario Complete</p>
              
              <div className="mb-10 font-black text-7xl text-amber-500 drop-shadow-md bg-amber-50 dark:bg-amber-900/20 py-8 rounded-[2.5rem] border-4 border-amber-100 dark:border-amber-900/30">
                {score} <span className="text-2xl text-amber-300 tracking-widest uppercase">XP</span>
              </div>

              {mistakes.length > 0 && (
                <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30 max-h-[300px] overflow-y-auto shadow-inner">
                  <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Safety Briefing</h4>
                  <ul className="space-y-3">
                    {mistakes.map((m, i) => (
                      <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(180,83,9)] active:shadow-none active:translate-y-2 transition-all text-xl">New Scenario ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
