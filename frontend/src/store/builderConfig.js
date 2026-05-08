export const BUILDER_CURRICULUM = {
  math: {
    title: 'Mathematics',
    icon: '🔢',
    colors: 'from-blue-500 to-indigo-600',
    topics: [
      {
        id: 'add-sub',
        title: 'Addition & Subtraction',
        desc: 'Mastering multi-digit calculations',
        content: {
          learn: {
            concept: [
              { title: "Addition Foundations", text: "Addition is the process of calculating the total of two or more numbers or amounts.", points: ["Result is called the 'Sum'.", "The '+' symbol represents addition.", "Example: 45 + 23 = 68.", "Commutative Property: a + b = b + a.", "Identity Property: adding zero doesn't change the value."] },
              { title: "Place Value Mastery", text: "Understanding the position of digits (Ones, Tens, Hundreds) is crucial for large additions.", points: ["Always start adding from the Ones column.", "Align numbers correctly by their place value.", "Example: In 156, '1' is 100, '5' is 50, '6' is 6.", "A digit's value is determined by its position.", "Moving left increases the value by 10x."] },
              { title: "The Power of Regrouping", text: "When the sum in any column is 10 or more, we 'carry over' the ten to the next column.", points: ["Used in multi-digit addition.", "Helps maintain the base-10 structure.", "Example: 18 + 14 = 32 (8+4=12, carry 1).", "Regrouping is like making a group of ten.", "Always add the carried digit to the next column."] },
              { title: "Subtraction Basics", text: "Subtraction is taking one number away from another to find the difference.", points: ["Result is called the 'Difference'.", "The '-' symbol represents subtraction.", "Example: 85 - 32 = 53.", "Subtraction is the inverse of addition.", "Order MATTERS in subtraction: 5-3 is not 3-5."] },
              { title: "Regrouping (Borrowing)", text: "If the top digit is smaller than the bottom digit, we 'borrow' 10 from the next column.", points: ["Essential for subtracting numbers like 52 - 18.", "Start from the Ones place.", "Example: 30 - 15 = 15.", "Borrowing reduces the next column by one.", "The '1' you borrow is actually a 10."] },
              { title: "Mental Math: Addition", text: "Solving addition problems in your head quickly using shortcuts.", points: ["Add tens then add ones.", "Break 45 + 23 into (40+20) + (5+3).", "Use 'compensation': 48 + 25 is 50 + 23.", "Practice makes you faster.", "Visualize the number line."] },
              { title: "Mental Math: Subtraction", text: "Quick subtraction techniques for daily life.", points: ["Subtract in chunks.", "Subtract tens first, then ones.", "Example: 85 - 23 -> 85 - 20 = 65, 65 - 3 = 62.", "Count up from the smaller number.", "Compensation: 92 - 38 is 92 - 40 + 2."] },
              { title: "Word Problem Strategies", text: "Translating words into math equations.", points: ["Look for keywords like 'altogether', 'total', 'sum' for addition.", "Look for 'left', 'remaining', 'difference' for subtraction.", "Draw a diagram or use bar models.", "Estimate before solving.", "Check if the final answer makes sense."] },
              { title: "Estimation & Checks", text: "Rounding numbers helps us estimate the result and check if our answer makes sense.", points: ["Round to the nearest 10 or 100.", "Helpful for quick mental calculations.", "Example: 48 + 51 is about 50 + 50 = 100.", "Verify by using the inverse operation.", "If (sum - one number = other number), it's correct!"] }
            ]
          }
        }
      },
      {
        id: 'mult-div',
        title: 'Multiplication & Division',
        desc: 'Groups, sharing and tables',
        content: {
          learn: {
            concept: [
              { title: "Multiplication as Groups", text: "Multiplication is repeated addition of the same number in equal groups.", points: ["3 x 4 means 3 groups of 4 (4+4+4).", "Result is called the 'Product'.", "Order doesn't matter: 3x4 = 4x3.", "Symbol used is 'x' or '*'.", "Any number x 1 is the number itself."] },
              { title: "Mastering Times Tables", text: "Learning multiplication facts (1-10) is the foundation for all higher math.", points: ["Even numbers always end in 0, 2, 4, 6, 8.", "Multiplying by 5 always ends in 0 or 5.", "Multiplying by 10 adds a zero at the end.", "Patterns like 9s: digits add up to 9.", "Multiplication by 0 is always 0."] },
              { title: "Multiplication Properties", text: "Rules that make multiplication easier to solve.", points: ["Commutative: 6x2 = 2x6.", "Associative: (2x3)x4 = 2x(3x4).", "Distributive: 3x(10+2) = 3x10 + 3x2.", "Identity: 15 x 1 = 15.", "Zero: 100 x 0 = 0."] },
              { title: "Area Models", text: "Using rectangles to visualize multiplication of larger numbers.", points: ["Break 12 x 5 into a 10x5 and 2x5 rectangle.", "Add the smaller areas: 50 + 10 = 60.", "Helps understand multi-digit multiplication.", "Great for visual learners.", "Foundation for algebra."] },
              { title: "Division: Fair Sharing", text: "Division is splitting a large group into equal smaller groups.", points: ["Result is called the 'Quotient'.", "The '÷' symbol represents division.", "Example: 12 ÷ 3 = 4.", "Dividend is the total, Divisor is the number of groups.", "Division by zero is undefined."] },
              { title: "The Inverse Relationship", text: "Multiplication and Division are opposites; they undo each other.", points: ["If 5 x 4 = 20, then 20 ÷ 4 = 5.", "Fact families: 3, 5, 15 (3x5=15, 15÷3=5).", "Helps in checking division answers.", "Think: 'How many times does x go into y?'.", "Related facts share the same three numbers."] },
              { title: "Arrays and Patterns", text: "Visualizing multiplication using rows and columns helps understand area.", points: ["A grid of 2 rows and 5 columns is 10.", "Useful for mental visualization.", "Patterns like 9x1=9, 9x2=18 (1+8=9).", "Rows go across, Columns go down.", "Total items = Rows * Columns."] },
              { title: "Understanding Remainders", text: "Sometimes, numbers don't divide perfectly into equal groups.", points: ["The leftover amount is called the Remainder.", "Example: 7 ÷ 3 = 2 with 1 leftover.", "Common in real-world sharing.", "The remainder must be smaller than the divisor.", "Notation: 7 ÷ 3 = 2 R1."] },
              { title: "Division Strategies", text: "Ways to solve division problems mentally or on paper.", points: ["Repeated subtraction: 15 - 5 - 5 - 5 = 0.", "Skip counting: 5, 10, 15 (counted 3 times).", "Halving: 48 ÷ 2 = 24.", "Using multiplication facts.", "Breaking the dividend: 45 ÷ 3 = (30÷3) + (15÷3)."] }
            ]
          }
        }
      },
      {
        id: 'fractions',
        title: 'Fractions',
        desc: 'Parts of a whole',
        content: {
          learn: {
            concept: [
              { title: "What is a Fraction?", text: "A fraction represents a part of a whole object or a set.", points: ["Numerator (Top): How many parts we have.", "Denominator (Bottom): Total equal parts.", "Example: 1/4 is one-fourth.", "Fractions are values between integers.", "A fraction bar means division."] },
              { title: "Visualizing Fractions", text: "Common shapes like pizzas or chocolate bars help see fractions clearly.", points: ["A half (1/2) is bigger than a third (1/3).", "Whole is equal to 1 (e.g., 4/4 = 1).", "Colors and shapes represent parts.", "Number lines show the position of fractions.", "Equal size parts are mandatory."] },
              { title: "Equivalent Fractions", text: "Different fractions can represent the same amount or size.", points: ["1/2 is the same as 2/4 or 4/8.", "Multiply top and bottom by same number.", "Simplifying: 5/10 becomes 1/2.", "Cross-multiplication checks equivalence.", "Scaling up or down preserves value."] },
              { title: "Comparing Fractions", text: "Determining which fraction is larger or smaller.", points: ["If denominators are same, bigger numerator is larger.", "If numerators are same, smaller denominator is larger (bigger slices).", "Use 1/2 as a benchmark.", "Convert to same denominator to compare.", "Visualizing on a number line helps."] },
              { title: "Proper & Improper", text: "Fractions can be less than, equal to, or greater than one.", points: ["Proper: Top is smaller (1/2).", "Improper: Top is bigger (5/4).", "Mixed Numbers: Whole + Fraction (1 1/2).", "Convert Mixed to Improper: (W*D + N)/D.", "Convert Improper to Mixed: Divide N by D."] },
              { title: "Fractions in Daily Life", text: "Where we use fractions every day.", points: ["Cooking (1/2 cup of milk).", "Telling time (Quarter past).", "Sharing a pizza with friends.", "Measuring height or length.", "Sales and discounts (Half price)."] },
              { title: "Adding Like Fractions", text: "If denominators are the same, just add the numerators.", points: ["1/5 + 2/5 = 3/5.", "Denominator stays the same.", "Think of it as counting parts.", "Always simplify the result if possible.", "1/4 + 1/4 = 2/4 = 1/2."] }
            ]
          }
        }
      },
      {
        id: 'time-money',
        title: 'Time & Money',
        desc: 'Clocks and calculations',
        content: {
          learn: {
            concept: [
              { title: "Telling Time (Analog)", text: "Reading clocks with hands involves hours, minutes, and seconds.", points: ["Short Hand: Hours (1-12).", "Long Hand: Minutes (0-60).", "60 minutes = 1 Hour.", "Each number on clock = 5 minutes.", "Quarter past = 15 mins, Half past = 30 mins."] },
              { title: "AM vs PM", text: "The day is divided into two 12-hour periods.", points: ["AM: Midnight to Noon (Morning).", "PM: Noon to Midnight (Afternoon/Night).", "12:00 PM is Lunch Time!", "12:00 AM is Midnight.", "Duration calculation requires noting AM/PM."] },
              { title: "The 24-Hour Clock", text: "Used in military, railways, and global schedules.", points: ["00:00 to 23:59.", "1:00 PM becomes 13:00.", "No AM/PM needed.", "Subtract 12 from hours > 12 to get PM time.", "Used to avoid confusion between morning and night."] },
              { title: "Currency Recognition", text: "Understanding the value of different coins and notes.", points: ["Major units: Dollars, Euros, Rupees.", "100 cents/paisa = 1 whole unit.", "Symbols: $, \u20ac, \u20b9.", "Decimal point separates major and minor units.", "Example: $5.25 is 5 dollars and 25 cents."] },
              { title: "Calculating Change", text: "Subtraction is used to find the money returned after a purchase.", points: ["Change = Paid - Price.", "Useful for shopping skills.", "Example: Pay $10 for $7 item, get $3 back.", "Counting up from price is a quick method.", "Double check by adding Price + Change = Paid."] },
              { title: "Unit Pricing", text: "Comparing prices to find the best deal.", points: ["Price per item or per kg.", "Helps save money while shopping.", "Calculate: Total Price / Quantity.", "Example: $4 for 2 apples vs $5 for 3 apples.", "Bigger packs aren't always cheaper!"] },
              { title: "Budgeting Basics", text: "Learning to save and spend money wisely.", points: ["Needs: Food, Water, School.", "Wants: Toys, Games, Candy.", "Saving helps buy bigger things later.", "A budget is a plan for your money.", "Prioritize needs over wants."] }
            ]
          }
        }
      },
      {
        id: 'shapes',
        title: 'Shapes & Space',
        desc: 'Geometry properties',
        content: {
          learn: {
            concept: [
              { title: "2D Shape Properties", text: "Flat shapes are defined by their sides and corners (vertices).", points: ["Triangle: 3 sides, 3 corners.", "Quadrilateral: 4 sides (Square, Rectangle).", "Circle: 0 sides, infinite symmetry.", "Polygon: Closed shape with straight sides.", "Pentagon: 5 sides, Hexagon: 6 sides."] },
              { title: "Types of Triangles", text: "Triangles can be classified by their sides and angles.", points: ["Equilateral: All sides equal.", "Isosceles: Two sides equal.", "Scalene: No sides equal.", "Right-angled: One 90 degree angle.", "Sum of angles is always 180 degrees."] },
              { title: "3D Solid Shapes", text: "Objects that have depth and occupy space.", points: ["Cube: 6 square faces.", "Sphere: No flat faces or edges.", "Cylinder: 2 circles and 1 curved face.", "Cone: 1 circle base and 1 vertex.", "Pyramid: 1 base and triangular faces."] },
              { title: "Symmetry & Patterns", text: "Shapes can be identical on both sides of a line.", points: ["Line of Symmetry: Mirror line.", "Repeating patterns in nature (Leaves).", "Tessellation: Tiling without gaps.", "Rotational symmetry: Looks same when turned.", "Asymmetry: No lines of symmetry."] },
              { title: "Transformation Basics", text: "Moving shapes in space without changing their size.", points: ["Translation: Sliding the shape.", "Reflection: Flipping over a line (Mirror).", "Rotation: Turning around a point.", "Scaling: Resizing (Bigger or Smaller).", "Shapes remain 'Congruent' if only slid or flipped."] },
              { title: "Perimeter Basics", text: "The total distance around the outside of a shape.", points: ["Add up all side lengths.", "Example: Square with side 5 has perimeter 20.", "Useful for fencing or borders.", "Rectangle Perimeter = 2 * (L + W).", "Measured in linear units (cm, m)."] },
              { title: "Area: Surface Space", text: "The amount of space inside a 2D shape.", points: ["Measured in square units.", "Rectangle Area = Length x Width.", "Example: 4x3 room has 12 units of space.", "Square Area = Side * Side.", "Area is the 'paint' needed for a wall."] }
            ]
          }
        }
      }
    ]
  },
  english: {
    title: 'English Language',
    icon: '📖',
    colors: 'from-amber-500 to-orange-600',
    topics: [
      {
        id: 'vocab',
        title: 'Vocabulary',
        desc: 'Building your word bank',
        content: {
          learn: {
            concept: [
              { title: "Synonym Power", text: "Synonyms are different words that have the same or similar meanings.", points: ["Happy / Joyful / Cheerful.", "Big / Large / Enormous.", "Helps make writing more interesting.", "Use a thesaurus to find synonyms.", "Context determines the best synonym."] },
              { title: "Antonym Opposites", text: "Antonyms are words that have completely opposite meanings.", points: ["Hot / Cold.", "Fast / Slow.", "Crucial for describing differences.", "Prefixes like 'un-' or 'dis-' often form antonyms.", "Example: Appear / Disappear."] },
              { title: "Idioms & Phrases", text: "Groups of words with a special meaning that is different from the individual words.", points: ["'Piece of cake' = Very easy.", "'Under the weather' = Feeling sick.", "'Break a leg' = Good luck.", "Idioms add color to your language.", "Don't take them literally!"] },
              { title: "Homophones & Homonyms", text: "Words that sound the same but have different meanings or spellings.", points: ["Their / There / They're.", "Sea / See.", "Night / Knight.", "Always check the spelling in context.", "Examples: 'The bear was bare' or 'I lead the lead pipe'."] },
              { title: "Prefixes & Suffixes", text: "Small parts added to words to change their meaning.", points: ["Prefix (Start): 'Un-' means not (Unhappy).", "Suffix (End): '-ful' means full of (Joyful).", "Helps unlock thousands of new words.", "Root word is the core part.", "Changing the suffix can change the part of speech."] },
              { title: "Compound Words", text: "Two smaller words joined together to make a new word.", points: ["Rain + Bow = Rainbow.", "Sun + Flower = Sunflower.", "Often easy to define if you split them.", "Closed compound: Notebook.", "Hyphenated compound: Mother-in-law."] },
              { title: "Context Clues", text: "Using surrounding words to guess the meaning of a new word.", points: ["Look for definitions in the sentence.", "Look for examples nearby.", "Read before and after the tricky word.", "Look for comparison or contrast clues.", "Substitution: Put a familiar word in its place."] }
            ]
          }
        }
      },
      {
        id: 'grammar',
        title: 'Grammar Guardian',
        desc: 'Parts of Speech & Tenses',
        content: {
          learn: {
            concept: [
              { title: "Noun Categories", text: "Nouns name people, places, things, or ideas.", points: ["Proper Nouns: Specific names (Paris, John).", "Common Nouns: General items (city, boy).", "Abstract Nouns: Feelings (Love, Bravery).", "Collective Nouns: Groups (Flock, Team).", "Countable vs Uncountable nouns."] },
              { title: "Verb Actions", text: "Verbs describe actions or states of being.", points: ["Action Verbs: Run, Jump, Think.", "Helping Verbs: Is, Am, Are, Was.", "Every sentence must have a verb.", "Transitive verbs need an object.", "Intransitive verbs do not need an object."] },
              { title: "Adjective Descriptions", text: "Adjectives add detail by describing nouns.", points: ["Tells 'Which one' or 'What kind'.", "Colors, Sizes, Feelings.", "Example: The *giant* *blue* balloon.", "Degrees of comparison: Big, Bigger, Biggest.", "Adjectives usually come before nouns."] },
              { title: "Adverbs: Modifying Actions", text: "Words that describe how, when, or where an action happens.", points: ["Usually end in -ly (Quickly, Happily).", "Describes a verb, adjective, or another adverb.", "Example: 'She sang *beautifully*'.", "Tells 'how' something is done.", "Can also tell 'when' (Yesterday, Soon)."] },
              { title: "Past, Present, Future", text: "Tenses tell us *when* an action happened.", points: ["Past: Already happened (-ed).", "Present: Happening now.", "Future: Will happen later (will).", "Perfect tenses show completed actions.", "Continuous tenses show ongoing actions."] },
              { title: "Pronouns: Word Replacers", text: "Short words used to replace nouns to avoid repetition.", points: ["He, She, It, They, We.", "Me, You, Him, Her, Us.", "Possessive: My, Your, His, Their.", "Always make sure the pronoun matches the noun.", "Example: 'The dog barked because *it* was hungry'."] },
              { title: "Subject-Verb Agreement", text: "The subject and verb must match in number.", points: ["He *runs* (Singular).", "They *run* (Plural).", "Correct: 'She is happy', not 'She are happy'.", "Ignore phrases between subject and verb.", "Compound subjects joined by 'and' are plural."] }
            ]
          }
        }
      },
      {
        id: 'sentences',
        title: 'Sentence Builder',
        desc: 'Writing better phrases',
        content: {
          learn: {
            concept: [
              { title: "Sentence Essentials", text: "Every complete sentence needs a Subject and a Predicate.", points: ["Subject: Who/What the sentence is about.", "Predicate: What they are doing.", "Must start with a capital letter.", "Complete thought is required.", "Ends with punctuation."] },
              { title: "Punctuation Rules", text: "Marks that help us know where to stop or pause.", points: ["Full Stop (.): End of statement.", "Question Mark (?): Asking something.", "Exclamation (!): Strong feeling!", "Comma (,): Short pause or list separator.", "Apostrophe ('): Possession or contraction."] },
              { title: "Quotation Marks", text: "Used to show exactly what someone said.", points: ["Put around the spoken words.", "Punctuation usually goes inside the marks.", "Example: 'I'm hungry,' said Max.", "Use a comma to separate the speaker.", "Essential for writing dialogue in stories."] },
              { title: "Simple vs Compound", text: "Sentences can be short or joined together.", points: ["Simple: One main idea.", "Compound: Two ideas joined by 'and', 'but', 'or'.", "Example: I like tea and he likes coffee.", "FANBOYS are coordinating conjunctions.", "Complex sentences use subordinating conjunctions."] },
              { title: "Types of Sentences", text: "Sentences can serve different purposes.", points: ["Declarative: Making a statement.", "Interrogative: Asking a question.", "Imperative: Giving a command or request.", "Exclamatory: Showing strong emotion.", "Variety in sentence types makes writing engaging."] },
              { title: "Transition Words", text: "Words that help ideas flow smoothly together.", points: ["First, Then, Finally.", "However, Therefore, Because.", "Makes your stories easier to follow.", "Shows cause and effect.", "Links paragraphs together."] },
              { title: "Descriptive Writing", text: "Using 'show, don't tell' to make writing come alive.", points: ["Instead of 'He was sad', use 'He cried'.", "Use all five senses in descriptions.", "Adverbs help describe verbs (Slowly).", "Vivid verbs replace weak ones.", "Similes and Metaphors add depth."] }
            ]
          }
        }
      }
    ]
  },
  evs: {
    title: 'EVS (Environment)',
    icon: '🌍',
    colors: 'from-emerald-500 to-green-600',
    topics: [
      {
        id: 'plants-animals',
        title: 'Nature Explorer',
        desc: 'Understanding life around us',
        content: {
          learn: {
            concept: [
              { title: "Photosynthesis", text: "How plants make their own food using sunlight.", points: ["Needs: Sun, Water, Carbon Dioxide.", "Gives off: Oxygen (for us to breathe!).", "Chlorophyll makes leaves green.", "Happens in the chloroplasts.", "Stomata are tiny holes for gas exchange."] },
              { title: "Plant Life Cycle", text: "How a plant grows from a seed to an adult.", points: ["Seed -> Germination -> Seedling -> Adult Plant.", "Flowers produce seeds for next generation.", "Pollination by bees or wind.", "Dispersal: Seeds travel by wind, water, or animals.", "Dormancy: Seeds waiting for the right conditions."] },
              { title: "Animal Habitats", text: "The natural home or environment of an animal.", points: ["Desert: Hot/Dry (Camels).", "Polar: Ice/Cold (Polar Bears).", "Rainforest: Wet/Green (Monkeys).", "Aquatic: Water (Fish, Whales).", "Adaptation: Physical traits for survival."] },
              { title: "Animal Classification", text: "Grouping animals by their characteristics.", points: ["Mammals: Hair/Fur, Milk for young.", "Birds: Feathers, Eggs, Wings.", "Reptiles: Scales, Cold-blooded.", "Amphibians: Land and Water.", "Insects: 6 legs, 3 body parts."] },
              { title: "The Food Chain", text: "The flow of energy from one living thing to another.", points: ["Producers (Plants).", "Consumers (Animals).", "Decomposers (Fungi/Bacteria).", "Apex Predator is at the top.", "Energy is lost at each level."] },
              { title: "Water Cycle", text: "The continuous movement of water on Earth.", points: ["Evaporation: Sun turns water to vapor.", "Condensation: Clouds form.", "Precipitation: Rain or snow falls.", "Collection: Water gathers in oceans.", "Transpiration: Plants release water vapor."] },
              { title: "Conservation", text: "Protecting our planet and its natural resources.", points: ["The 3 Rs: Reduce, Reuse, Recycle.", "Saving water and electricity.", "Planting trees for better air.", "Protecting endangered species.", "Sustainable living reduces waste."] }
            ]
          }
        }
      },
      {
        id: 'hygiene',
        title: 'Health Hero',
        desc: 'Staying clean and healthy',
        content: {
          learn: {
            concept: [
              { title: "Personal Hygiene", text: "Habits that keep your body clean and free from germs.", points: ["Wash hands before meals.", "Brush teeth twice a day.", "Bathing daily prevents skin issues.", "Trimming nails stops germ buildup.", "Wearing clean clothes."] },
              { title: "Germs and Sickness", text: "Tiny organisms that can make us feel unwell.", points: ["Bacteria, Viruses, and Fungi.", "Spread through air, touch, or water.", "Immune system fights off germs.", "Vaccines help prevent diseases.", "Keep your surroundings clean!"] },
              { title: "Nutrition: Balanced Diet", text: "Eating different types of food to stay strong.", points: ["Proteins for growth.", "Vitamins for fighting illness.", "Carbohydrates for energy.", "Roughage (fiber) for digestion.", "Drinking plenty of water."] },
              { title: "The 5 Food Groups", text: "Categories of food that provide different nutrients.", points: ["Grains (Rice, Bread).", "Fruits and Vegetables.", "Dairy (Milk, Cheese).", "Protein (Meat, Beans).", "Healthy Fats (Nuts, Oils)."] },
              { title: "Exercise & Rest", text: "Moving your body and giving it time to recover.", points: ["60 mins of play daily.", "8-10 hours of sleep for kids.", "Helps brain and heart stay healthy.", "Stretching prevents injuries.", "Rest allows cells to repair."] },
              { title: "Food Safety", text: "How to handle and store food to prevent sickness.", points: ["Wash fruits before eating.", "Check expiry dates.", "Keep food covered from flies.", "Cook food thoroughly.", "Store perishable items in fridge."] },
              { title: "Mental Well-being", text: "Taking care of your thoughts and feelings.", points: ["Talk about your emotions.", "Be kind to yourself and others.", "Relaxing activities like reading.", "Mindfulness and deep breathing.", "Getting help when feeling overwhelmed."] }
            ]
          }
        }
      },
      {
        id: 'neighborhood',
        title: 'Our Neighborhood',
        desc: 'People who help us',
        content: {
          learn: {
            concept: [
              { title: "Community Helpers", text: "Professionals who provide essential services to us.", points: ["Doctors & Nurses: Health.", "Firefighters: Safety.", "Teachers: Education.", "Police: Law and Order.", "Farmers: Food production."] },
              { title: "Public Places", text: "Buildings and areas shared by everyone in a community.", points: ["Parks: Play and relaxation.", "Libraries: Knowledge.", "Hospitals: Emergencies.", "Post Office: Communication.", "Markets: Trade and shopping."] },
              { title: "Local Government", text: "People who manage our neighborhood's needs.", points: ["Keeping roads clean.", "Providing clean water.", "Managing street lights.", "Building schools and clinics.", "Elected by the community."] },
              { title: "Civic Sense", text: "Responsibility towards your community and environment.", points: ["Don't litter in public.", "Follow traffic rules.", "Respect public property.", "Help the elderly.", "Save water in community taps."] },
              { title: "Transport Systems", text: "How people and goods move from place to place.", points: ["Land: Cars, Buses, Trains.", "Air: Planes, Helicopters.", "Water: Ships, Boats.", "Public transport reduces pollution.", "Fuel types: Petrol, Diesel, CNG, Electric."] },
              { title: "Communication Tools", text: "How we stay connected with others.", points: ["Old: Letters, Telegrams.", "New: Emails, Video Calls, Apps.", "Radio and TV for mass communication.", "Satellites help in global connectivity.", "Always use the internet safely."] },
              { title: "Cultural Diversity", text: "Celebrating different festivals, languages, and food.", points: ["Everyone is unique.", "Respect all cultures.", "Learning from each other.", "Unity in Diversity.", "Traditions passed through generations."] }
            ]
          }
        }
      }
    ]
  }
};
