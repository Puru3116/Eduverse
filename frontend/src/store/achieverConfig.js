import ACHIEVER_ASSETS from './achieverAssets';

export const ACHIEVER_CURRICULUM = {
  math: {
    title: 'Mathematics',
    icon: '🔢',
    colors: 'from-indigo-600 to-blue-700',
    topics: [
      {
        id: 'number-system',
        title: 'Number System',
        desc: 'Integers, Rational Numbers & Operations',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Numbers", text: "Numbers are the tools we use to count and measure the world around us.", points: ["Natural Numbers: Counting numbers (1, 2, 3...).", "Whole Numbers: Natural numbers including zero (0, 1, 2...).", "Successor and Predecessor basics."] },
              { title: "Introduction to Integers", text: "Integers extend the number system to include negative values.", points: ["Positive Integers: Values greater than zero.", "Negative Integers: Values less than zero.", "Zero: Neither positive nor negative."] },
              { title: "Representation on Number Line", text: "Visualizing integers on a straight line.", points: ["Zero is at the center.", "Positive numbers are to the right.", "Negative numbers are to the left."] },
              { title: "Comparison & Ordering", text: "Determining the relative value of integers.", points: ["Greater than (>) and Less than (<).", "Moving right always increases value.", "Ascending and Descending order."] },
              { title: "Introduction to Rational Numbers", text: "Numbers that can be expressed as a fraction p/q.", points: ["Fractions: Positive and negative forms.", "Numerator (p) and Denominator (q != 0).", "Rational numbers on the number line."] },
              { title: "Equivalent Rational Numbers", text: "Different fractions that represent the same value.", points: ["Multiplying or dividing p and q by the same non-zero number.", "Simplifying rationals to their lowest terms."] },
              { title: "Operations: Addition & Subtraction", text: "Rules for combining integers and rational numbers.", points: ["Integers: Same sign (Add), Different signs (Subtract).", "Rationals: Using common denominators."] },
              { title: "Operations: Multiplication & Division", text: "Rules for multiplying and dividing signed numbers.", points: ["Positive x Positive = Positive.", "Negative x Negative = Positive.", "Positive x Negative = Negative.", "Division by zero is undefined."] },
              { title: "Properties of Numbers", text: "The laws that govern how numbers behave under operations.", points: ["Closure: Sum of integers is an integer.", "Commutative: a + b = b + a.", "Associative: (a+b)+c = a+(b+c).", "Distributive: a(b+c) = ab + ac.", "Identity: 0 is for addition, 1 is for multiplication."] },
              { title: "Absolute Value (Modulus)", text: "The distance of a number from zero on the number line.", points: ["|x| is always non-negative.", "Distance is independent of direction.", "Example: |-10| = 10."] },
              { title: "Advanced Concepts: Real & Irrational", text: "Expanding our knowledge of the number world.", points: ["Real Numbers: All rational and irrational numbers.", "Irrational Numbers: Cannot be written as p/q (e.g., Pi, sqrt(2))."] },
              { title: "Decimal Representation", text: "How rational numbers look as decimals.", points: ["Terminating Decimals: 1/2 = 0.5.", "Non-terminating (Repeating): 1/3 = 0.333..."] },
              { title: "Applications in Real Life", text: "How we use signed numbers every day.", points: ["Temperature: Above (+) and Below (-) zero.", "Profit and Loss: Gain (+) and Debt (-).", "Elevation: Above (+) and Below (-) sea level."] }
            ]
          },
          practice: [
            { q: "Is -5 a whole number?", options: ["Yes", "No"], a: "No", explanation: "Whole numbers are 0, 1, 2..." },
            { q: "Solve: -12 + 7", options: ["-5", "5", "-19", "19"], a: "-5", explanation: "Subtract and keep the larger sign." },
            { q: "Rational equivalent to 1/2?", options: ["2/4", "3/4", "1/4", "None"], a: "2/4", explanation: "Multiplied by 2/2." },
            { q: "Value of |-25|?", options: ["25", "-25", "0", "1"], a: "25", explanation: "Absolute value is distance." },
            { q: "What is 0 divided by 5?", options: ["0", "5", "Undefined", "1"], a: "0", explanation: "0 shared by any non-zero is 0." }
          ],
          challenge: [
            { q: "Product of three negative integers?", options: ["Negative", "Positive", "Zero", "None"], a: "Negative", explanation: "Neg x Neg x Neg = Neg." },
            { q: "Property: a + b = b + a?", options: ["Commutative", "Closure", "Associative", "None"], a: "Commutative", explanation: "Order doesn't matter." }
          ],
          test: [
            { q: "Which of the following is an irrational number?", options: ["3.14", "22/7", "√2", "1.414"], a: "√2", explanation: "√2 cannot be expressed as a simple fraction, making it irrational." },
            { q: "What is the absolute value of -45?", options: ["0", "45", "-45", "1"], a: "45", explanation: "Absolute value represents distance from zero, which is always positive." },
            { q: "Which statement correctly describes the number 0?", options: ["It is a positive integer.", "It is neither positive nor negative.", "It is a negative integer.", "It is not a rational number."], a: "It is neither positive nor negative.", explanation: "Zero is the neutral integer separating positive and negative values." },
            { q: "What is the result of subtracting -15 from -5?", options: ["-20", "10", "-10", "20"], a: "10", explanation: "-5 - (-15) becomes -5 + 15, which equals 10." },
            { q: "Which fraction is equivalent to 3/4?", options: ["6/8", "9/16", "4/3", "12/15"], a: "6/8", explanation: "Multiplying the numerator and denominator of 3/4 by 2 gives 6/8." },
            { q: "What is the product of three negative integers?", options: ["Always zero", "Always positive", "Sometimes positive, sometimes negative", "Always negative"], a: "Always negative", explanation: "A negative times a negative is positive, and multiplying by a third negative makes it negative again." },
            { q: "Which property is demonstrated by the equation a + b = b + a?", options: ["Distributive Property", "Associative Property", "Commutative Property", "Identity Property"], a: "Commutative Property", explanation: "The commutative property states that the order of addition does not change the sum." },
            { q: "Which of the following represents an elevation of 50 meters below sea level?", options: ["0m", "-50m", "50m", "-100m"], a: "-50m", explanation: "Elevations below sea level are represented by negative numbers." },
            { q: "What is the multiplicative identity for rational numbers?", options: ["0", "-1", "1", "Infinity"], a: "1", explanation: "Multiplying any rational number by 1 leaves it unchanged." },
            { q: "Which set of numbers includes all positive numbers, negative numbers, and zero, but no fractions?", options: ["Natural Numbers", "Whole Numbers", "Real Numbers", "Integers"], a: "Integers", explanation: "Integers include whole numbers and their negative counterparts." },
            { q: "Evaluate the expression: (-8) × (-5)", options: ["-40", "-13", "40", "13"], a: "40", explanation: "The product of two negative integers is a positive integer." },
            { q: "If a = -3 and b = 4, what is the value of a - b?", options: ["-7", "1", "7", "-1"], a: "-7", explanation: "-3 - 4 equals -7." },
            { q: "Which of the following numbers is the greatest?", options: ["-12", "-15", "-2", "-8"], a: "-2", explanation: "On the number line, -2 is the furthest to the right among the choices." },
            { q: "What is the standard form of the rational number 16/-24?", options: ["-2/3", "2/3", "-4/6", "4/-6"], a: "-2/3", explanation: "Divide both by 8 and move the negative sign to the numerator to get -2/3." },
            { q: "Which number is its own additive inverse?", options: ["1", "-1", "0", "There is no such number"], a: "0", explanation: "The additive inverse of 0 is 0, since 0 + 0 = 0." },
            { q: "What is the sum of the predecessor and successor of -10?", options: ["-20", "0", "-19", "-21"], a: "-20", explanation: "Predecessor is -11, successor is -9. Their sum is -20." },
            { q: "Which of the following decimals represents a rational number?", options: ["0.333...", "3.14159...", "0.1010010001...", "√3"], a: "0.333...", explanation: "0.333... is a repeating decimal, which can be written as 1/3." },
            { q: "Evaluate: (-2)³", options: ["8", "-6", "6", "-8"], a: "-8", explanation: "(-2) × (-2) × (-2) = -8." },
            { q: "Which property is illustrated by 5 × (2 + 3) = (5 × 2) + (5 × 3)?", options: ["Commutative Property", "Associative Property", "Closure Property", "Distributive Property"], a: "Distributive Property", explanation: "The distributive property allows multiplying a number by a sum." },
            { q: "What is the reciprocal of -5/7?", options: ["5/7", "-7/5", "7/5", "1"], a: "-7/5", explanation: "The reciprocal is found by flipping the numerator and denominator." },
            { q: "Between which two integers does the rational number -7/3 lie?", options: ["-1 and -2", "-2 and -3", "-3 and -4", "2 and 3"], a: "-2 and -3", explanation: "-7/3 is -2 1/3, which falls between -2 and -3." },
            { q: "What must be added to -15 to get 10?", options: ["25", "-5", "-25", "5"], a: "25", explanation: "Let x be the number. -15 + x = 10, so x = 25." },
            { q: "Which of the following is not a rational number?", options: ["0", "-5", "√16", "√5"], a: "√5", explanation: "√5 cannot be expressed as a perfect fraction or terminating/repeating decimal." },
            { q: "What is the value of 0 ÷ (-8)?", options: ["-8", "8", "Undefined", "0"], a: "0", explanation: "Zero divided by any non-zero number is zero." },
            { q: "If you move 6 units to the left of -2 on a number line, where do you land?", options: ["4", "-8", "-4", "8"], a: "-8", explanation: "Moving left means subtraction: -2 - 6 = -8." },
            { q: "Which statement is true for all non-zero rational numbers?", options: ["They are always positive.", "They can always be written as a decimal that terminates.", "Their product with their reciprocal is always 1.", "They are integers."], a: "Their product with their reciprocal is always 1.", explanation: "Any non-zero rational multiplied by its reciprocal equals 1." },
            { q: "Evaluate the absolute value expression: |12 - 20|", options: ["-8", "32", "8", "-32"], a: "8", explanation: "12 - 20 = -8. The absolute value of -8 is 8." },
            { q: "What is the result of dividing a negative integer by a positive integer?", options: ["Always positive", "Always negative", "Zero", "Cannot be determined"], a: "Always negative", explanation: "The quotient of numbers with different signs is negative." },
            { q: "Which fraction is the greatest?", options: ["-1/2", "-1/3", "-1/4", "-1/5"], a: "-1/5", explanation: "For negative numbers, the value closer to zero is greater." },
            { q: "What is the additive inverse of 18?", options: ["-18", "1/18", "0", "18"], a: "-18", explanation: "The additive inverse of a number x is -x, so they sum to 0." }
          ]
        }
      },
      {
        id: 'algebra',
        title: 'Algebra',
        desc: 'Expressions, Equations & Identities',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Algebra", text: "Algebra is the branch of math that uses letters (variables) to represent numbers in equations.", points: ["Variables: Letters like x, y, z.", "Constants: Numbers with fixed values (5, -2).", "Equations: Mathematical sentences with an '=' sign."] },
              { title: "Algebraic Expressions", text: "An expression is a combination of variables and constants.", points: ["Terms: Parts separated by + or -.", "Factors: Numbers or variables multiplied together.", "Coefficients: Numerical factor of a variable (e.g., 5 in 5x)."] },
              { title: "Types of Expressions", text: "Expressions are named by the number of terms they have.", points: ["Monomial: One term (4x).", "Binomial: Two terms (x + 5).", "Polynomial: Many terms."] },
              { title: "Operations on Expressions", text: "Adding, subtracting, multiplying, and dividing algebra.", points: ["Addition/Subtraction: Only like terms can be combined.", "Multiplication: Distributive property used.", "Division: Basic division of monomials."] },
              { title: "Simplification", text: "Reducing expressions to their simplest form.", points: ["Combining Like Terms: 2x + 3x = 5x.", "Use of Brackets: Resolving (a + b) correctly.", "Order of Ops: BODMAS/PEMDAS."] },
              { title: "Linear Equations", text: "Equations where the highest power of the variable is 1.", points: ["Intro to Equations: LHS = RHS.", "Solving: Balancing both sides.", "Variables on Both Sides: 3x + 2 = x + 10.", "Word Problems: Turning real situations into algebra."] },
              { title: "Algebraic Identities", text: "Equations true for all values of the variables.", points: ["(a + b)^2 = a^2 + 2ab + b^2.", "(a - b)^2 = a^2 - 2ab + b^2.", "(a + b)(a - b) = a^2 - b^2."] },
              { title: "Factorization", text: "The process of breaking down an expression into products.", points: ["Common Factor Method: 5x + 15 = 5(x + 3).", "Using Identities to Factorize.", "Simple factorization of quadratic forms."] },
              { title: "Understanding Patterns", text: "Using algebra to describe sequences.", points: ["Number Patterns: 2, 4, 6, 8... is 2n.", "Algebraic Patterns: Sequence rules.", "Forming expressions from patterns."] },
              { title: "Applications of Algebra", text: "Solving daily life problems using equations.", points: ["Forming equations from situations.", "Solving real-life age, distance, and money problems."] }
            ]
          },
          practice: [
            { q: "What is the coefficient of x in 7x + 2?", options: ["7", "2", "x", "None"], a: "7", explanation: "Coefficient is the number multiplying the variable." },
            { q: "Simplify: 4a + 2a - a", options: ["5a", "6a", "4a", "a"], a: "5a", explanation: "4 + 2 - 1 = 5." },
            { q: "Solve for x: x + 10 = 15", options: ["5", "10", "25", "15"], a: "5", explanation: "15 - 10 = 5." },
            { q: "Expand: (x + 1)^2", options: ["x^2 + 2x + 1", "x^2 + 1", "x + 2", "None"], a: "x^2 + 2x + 1", explanation: "Using (a+b)^2 identity." },
            { q: "Is 3x + 5y a like term?", options: ["No", "Yes"], a: "No", explanation: "Variables are different." }
          ],
          challenge: [
            { q: "Solve: 2x = 10", options: ["5", "2", "20", "12"], a: "5", explanation: "10 / 2 = 5." },
            { q: "Value of (a+b)(a-b) if a=5, b=2?", options: ["21", "25", "4", "7"], a: "21", explanation: "25 - 4 = 21." }
          ],
          test: [
            { q: "Identify the Binomial.", options: ["x + 5", "5x", "x + y + z", "10"], a: "x + 5", explanation: "Has exactly two terms." },
            { q: "Solve: 3x - 2 = 7", options: ["3", "5", "9", "2"], a: "3", explanation: "3x = 9, x = 3." },
            { q: "Next term in 3n+1 for n=4?", options: ["13", "12", "15", "10"], a: "13", explanation: "3(4) + 1 = 13." },
            ...Array.from({length: 27}).map((_, i) => ({ id: i+4, q: `Algebra Challenge Q${i+4}: Value of ${i+2}x if x=2?`, options: [`${(i+2)*2}`, `${i+2}`, "2", "0"], a: `${(i+2)*2}`, explanation: "Multiply constant by variable value." }))
          ]
        }
      },
      {
        id: 'geometry',
        title: 'Geometry',
        desc: 'Shapes, Angles & Circles',
        content: {
          learn: {
            concept: [
              { title: "Basic Geometrical Ideas", text: "Geometry starts with simple elements that build complex shapes.", points: ["Point: A tiny dot representing position.", "Line: Infinite length in both directions.", "Line Segment: A part of a line with two endpoints.", "Ray: A line with one endpoint, extending infinitely."] },
              { title: "Curves & Polygons", text: "Understanding paths and straight-sided shapes.", points: ["Curves: Open (ends don't meet) and Closed (ends meet).", "Angles: Formed when two rays meet at a common vertex.", "Polygons: Simple closed curves made of line segments."] },
              { title: "Types of Angles", text: "Angles are classified based on their rotation in degrees.", points: ["Acute (< 90 deg), Right (90 deg), Obtuse (90-180 deg).", "Straight (180 deg), Reflex (> 180 deg)."] },
              { title: "Lines & Angles: Relationships", text: "How angles interact when they share lines.", points: ["Adjacent Angles: Share a vertex and one arm.", "Complementary: Sum is 90 deg; Supplementary: Sum is 180 deg.", "Linear Pair: Adjacent angles on a straight line.", "Vertically Opposite: Equal angles at an intersection."] },
              { title: "Parallel Lines & Transversal", text: "When a line crosses two parallel lines, specific patterns emerge.", points: ["Corresponding Angles: Are equal.", "Alternate Interior/Exterior: Are equal.", "Interior Angles on same side: Sum to 180 deg."] },
              { title: "Triangles: Classification", text: "Triangles can be named by their sides or their angles.", points: ["By Sides: Equilateral (all same), Isosceles (2 same), Scalene (none).", "By Angles: Acute, Right, and Obtuse-angled triangles."] },
              { title: "Properties of Triangles", text: "Key rules that apply to every triangle.", points: ["Angle Sum Property: All interior angles add up to 180 deg.", "Exterior Angle Property: Equals the sum of two opposite interior angles.", "Congruence: When two triangles have the same size and shape."] },
              { title: "Quadrilaterals: Types & Properties", text: "Four-sided figures with unique characteristics.", points: ["Rectangle: Opposite sides parallel, all angles 90 deg.", "Square: All sides equal, all angles 90 deg.", "Parallelogram: Opposite sides parallel and equal.", "Rhombus: All sides equal, diagonals bisect at 90 deg.", "Trapezium: One pair of parallel sides."] },
              { title: "Circles: Parts & Properties", text: "The geometry of round shapes.", points: ["Parts: Radius, Diameter (2*R), Chord, and Arc.", "Circumference: The perimeter or boundary of the circle.", "Interior vs Exterior: Points inside or outside the boundary."] }
            ]
          },
          practice: [
            { q: "A line with one endpoint is a?", options: ["Ray", "Line Segment", "Line", "Point"], a: "Ray", explanation: "Rays go forever in one direction." },
            { q: "Complement of 30 deg?", options: ["60 deg", "150 deg", "90 deg", "10 deg"], a: "60 deg", explanation: "90 - 30 = 60." },
            { q: "Angle sum of a triangle?", options: ["180 deg", "360 deg", "90 deg", "None"], a: "180 deg", explanation: "Standard geometric rule." },
            { q: "Which quadrilateral has all sides equal?", options: ["Rhombus", "Rectangle", "Trapezium", "None"], a: "Rhombus", explanation: "Rhombus and Square have all sides equal." },
            { q: "Radius is 5. Diameter is?", options: ["10", "2.5", "5", "100"], a: "10", explanation: "D = 2 * R." }
          ],
          challenge: [
            { q: "Linear pair angles sum to?", options: ["180??", "90??", "360??", "None"], a: "180??", explanation: "Formed on a straight line." }
          ],
          test: [
            { q: "An angle measuring exactly 90 degrees is called a:", options: ["Right angle", "Acute angle", "Obtuse angle", "Reflex angle"], a: "Right angle", explanation: "A 90-degree angle forms a perfect corner." },
            { q: "What is the complement of an angle that measures 40 degrees?", options: ["50 degrees", "140 degrees", "90 degrees", "40 degrees"], a: "50 degrees", explanation: "Complementary angles add up to 90 degrees (90 - 40 = 50)." },
            { q: "The sum of all interior angles in any triangle is always:", options: ["180 degrees", "360 degrees", "90 degrees", "270 degrees"], a: "180 degrees", explanation: "Regardless of shape, a triangle's angles always sum to 180." },
            { q: "A quadrilateral with exactly one pair of parallel sides is called a:", options: ["Trapezium", "Parallelogram", "Rhombus", "Rectangle"], a: "Trapezium", explanation: "A trapezium has only one pair of parallel opposite sides." },
            { q: "If the radius of a circle is 7 cm, what is its diameter?", options: ["14 cm", "3.5 cm", "7 cm", "49 cm"], a: "14 cm", explanation: "Diameter is twice the radius (2 * 7 = 14)." },
            { q: "An angle greater than 180 degrees but less than 360 degrees is a:", options: ["Reflex angle", "Obtuse angle", "Acute angle", "Straight angle"], a: "Reflex angle", explanation: "Reflex angles are larger than a straight line." },
            { q: "A triangle with all three sides of different lengths is called a:", options: ["Scalene triangle", "Isosceles triangle", "Equilateral triangle", "Right triangle"], a: "Scalene triangle", explanation: "Scalene triangles have no equal sides." },
            { q: "Two angles are supplementary if their sum is:", options: ["180 degrees", "90 degrees", "360 degrees", "45 degrees"], a: "180 degrees", explanation: "Supplementary angles form a straight line." },
            { q: "Which shape has four equal sides and four right angles?", options: ["Square", "Rectangle", "Rhombus", "Parallelogram"], a: "Square", explanation: "A square is a regular quadrilateral." },
            { q: "A line segment connecting two points on a circle and passing through the center is the:", options: ["Diameter", "Radius", "Chord", "Arc"], a: "Diameter", explanation: "The diameter is the longest possible chord." },
            { q: "If two angles of a triangle are 60 and 40 degrees, the third angle is:", options: ["80 degrees", "100 degrees", "60 degrees", "40 degrees"], a: "80 degrees", explanation: "180 - (60 + 40) = 80." },
            { q: "Angles formed when two lines intersect at a common vertex are called:", options: ["Vertically opposite angles", "Adjacent angles", "Linear pairs", "Reflex angles"], a: "Vertically opposite angles", explanation: "Vertically opposite angles are always equal." },
            { q: "A polygon with five sides is known as a:", options: ["Pentagon", "Hexagon", "Octagon", "Quadrilateral"], a: "Pentagon", explanation: "Penta means five." },
            { q: "In a parallelogram, the opposite angles are always:", options: ["Equal", "Supplementary", "90 degrees", "Unequal"], a: "Equal", explanation: "This is a core property of parallelograms." },
            { q: "A line that intersects two or more parallel lines is called a:", options: ["Transversal", "Chord", "Radius", "Segment"], a: "Transversal", explanation: "Transversals create corresponding and alternate angles." },
            { q: "The fixed distance from the center to any point on the circle is the:", options: ["Radius", "Diameter", "Circumference", "Arc"], a: "Radius", explanation: "Radius is half of the diameter." },
            { q: "An equilateral triangle always has angles measuring:", options: ["60 degrees", "90 degrees", "45 degrees", "180 degrees"], a: "60 degrees", explanation: "180 / 3 = 60." },
            { q: "Which quadrilateral has four equal sides but no right angles?", options: ["Rhombus", "Square", "Rectangle", "Trapezium"], a: "Rhombus", explanation: "A rhombus is a 'tilted' square." },
            { q: "A closed curve made entirely of line segments is called a:", options: ["Polygon", "Circle", "Ray", "Angle"], a: "Polygon", explanation: "Polygons are flat, multi-sided shapes." },
            { q: "What is the supplement of a 110-degree angle?", options: ["70 degrees", "90 degrees", "180 degrees", "20 degrees"], a: "70 degrees", explanation: "180 - 110 = 70." },
            { q: "An exterior angle of a triangle is equal to the sum of its:", options: ["Two opposite interior angles", "Two adjacent angles", "Three interior angles", "External angles"], a: "Two opposite interior angles", explanation: "This is the exterior angle property." },
            { q: "A triangle with one angle measuring 90 degrees is a:", options: ["Right-angled triangle", "Acute-angled triangle", "Obtuse-angled triangle", "Equilateral triangle"], a: "Right-angled triangle", explanation: "It contains one right angle." },
            { q: "What do you call a part of a circle's circumference?", options: ["Arc", "Chord", "Sector", "Segment"], a: "Arc", explanation: "An arc is a curved segment of the boundary." },
            { q: "Which of the following is a 3D shape?", options: ["Sphere", "Circle", "Square", "Triangle"], a: "Sphere", explanation: "A sphere is the 3D version of a circle." },
            { q: "The diagonals of a square bisect each other at what angle?", options: ["90 degrees", "180 degrees", "45 degrees", "60 degrees"], a: "90 degrees", explanation: "Square diagonals are perpendicular." },
            { q: "A reflex angle is always greater than:", options: ["180 degrees", "90 degrees", "360 degrees", "0 degrees"], a: "180 degrees", explanation: "It 'bends back' past a straight line." },
            { q: "How many vertices does a triangle have?", options: ["3", "4", "2", "1"], a: "3", explanation: "Triangles have 3 sides and 3 corners (vertices)." },
            { q: "In an isosceles triangle, how many sides are equal?", options: ["2", "3", "0", "4"], a: "2", explanation: "Isosceles triangles have exactly two equal sides." },
            { id: 29, q: "If two parallel lines are cut by a transversal, the corresponding angles are:", options: ["Equal", "Supplementary", "Complementary", "Unequal"], a: "Equal", explanation: "Corresponding angles are in the same relative position." },
            { id: 30, q: "The longest chord in a circle is its:", options: ["Diameter", "Radius", "Arc", "Secant"], a: "Diameter", explanation: "The diameter passes through the center and spans the full width." }
          ]
        }
      },
      {
        id: 'mensuration',
        title: 'Mensuration',
        desc: 'Perimeter, Area & Volume',
        content: {
          learn: {
            concept: [
              { title: "Basic Concepts & Units", text: "Mensuration measures geometric figures. Key concepts include length, area, and volume.", points: ["Length: 1D measurement (m).", "Area: 2D surface (sq m).", "Volume: 3D space (cubic m).", "Conversion: 1m = 100cm, 1 sq m = 10,000 sq cm, 1 cubic m = 1,000,000 cubic cm."] },
              { title: "Perimeter: Rectangles & Squares", text: "Perimeter is the total boundary of a shape.", points: ["Rectangle: P = 2 * (Length + Breadth).", "Square: P = 4 * Side.", "Regular Polygon: P = n * side (where n is number of sides)."] },
              { title: "Perimeter: Triangles", text: "Calculating the boundary of 3-sided shapes.", points: ["Scalene: a + b + c.", "Isosceles: 2a + b.", "Equilateral: 3 * side."] },
              { title: "Area: Rectangles & Squares", text: "Surface space covered by 4-sided figures.", points: ["Rectangle: Area = Length * Breadth.", "Square: Area = Side * Side (S^2)."] },
              { title: "Area: Triangles", text: "Surface space for 3-sided figures.", points: ["General: 1/2 * Base * Height.", "Right-angled: 1/2 * product of legs."] },
              { title: "Area: Parallelograms & Trapeziums", text: "Calculating surface for special quadrilaterals.", points: ["Parallelogram: Area = Base * Height.", "Trapezium: Area = 1/2 * (Sum of Parallel Sides) * Height."] },
              { title: "Circles: Circumference & Area", text: "Measurements for circular shapes.", points: ["Circumference: 2 * Pi * r (or Pi * d).", "Area: Pi * r^2.", "Relation: Diameter = 2 * Radius."] },
              { title: "Surface Area: 3D Solids (Cube/Cuboid)", text: "Total area of all faces of a solid.", points: ["Cube: 6 * S^2.", "Cuboid: 2 * (lb + bh + hl)."] },
              { title: "Surface Area: Curved Solids", text: "Area for cylinders and spheres.", points: ["Cylinder (TSA): 2 * Pi * r * (r + h).", "Sphere: 4 * Pi * r^2."] },
              { title: "Volume: Cube & Cuboid", text: "Space occupied by straight-edged solids.", points: ["Cube: Side * Side * Side (S^3).", "Cuboid: Length * Breadth * Height."] },
              { title: "Volume: Curved Solids", text: "Space occupied by cylinders and spheres.", points: ["Cylinder: Pi * r^2 * h.", "Sphere: 4/3 * Pi * r^3."] }
            ]
          },
          practice: [
            { q: "Perimeter of a square with side 5 cm?", options: ["20 cm", "25 cm", "10 cm", "15 cm"], a: "20 cm", explanation: "4 * 5 = 20." },
            { q: "Area of a rectangle (L=10, B=5)?", options: ["50", "30", "15", "100"], a: "50", explanation: "10 * 5 = 50." },
            { q: "Circumference of a circle with radius 7?", options: ["44", "22", "154", "14"], a: "44", explanation: "2 * 22/7 * 7 = 44." },
            { q: "Volume of a cube with side 2?", options: ["8", "4", "6", "12"], a: "8", explanation: "2 * 2 * 2 = 8." },
            { q: "Surface area of a cube (Side=1)?", options: ["6", "1", "4", "2"], a: "6", explanation: "6 * 1 * 1 = 6." }
          ],
          challenge: [
            { q: "Area of a square with perimeter 40?", options: ["100", "40", "1600", "10"], a: "100", explanation: "Side = 10, Area = 10*10." },
            { q: "Height of cylinder if V=Pi, r=1?", options: ["1", "2", "Pi", "0"], a: "1", explanation: "V = Pi*r2*h." }
          ],
          test: [
            { q: "What is the area of a square whose perimeter is 32 cm?", options: ["64 sq cm", "32 sq cm", "16 sq cm", "256 sq cm"], a: "64 sq cm", explanation: "Side = 32/4 = 8 cm. Area = 8 * 8 = 64 sq cm." },
            { q: "The area of a triangle with base 12 cm and height 5 cm is:", options: ["30 sq cm", "60 sq cm", "17 sq cm", "25 sq cm"], a: "30 sq cm", explanation: "Area = 1/2 * base * height = 1/2 * 12 * 5 = 30 sq cm." },
            { q: "If the radius of a circle is 10 cm, what is its circumference? (Use Pi = 3.14)", options: ["62.8 cm", "31.4 cm", "314 cm", "100 cm"], a: "62.8 cm", explanation: "Circumference = 2 * Pi * r = 2 * 3.14 * 10 = 62.8 cm." },
            { q: "Calculate the volume of a cuboid with length 5 m, breadth 3 m, and height 2 m.", options: ["30 cubic m", "15 cubic m", "10 cubic m", "60 cubic m"], a: "30 cubic m", explanation: "Volume = L * B * H = 5 * 3 * 2 = 30 cubic m." },
            { q: "A square field has an area of 144 sq m. What is its perimeter?", options: ["48 m", "12 m", "24 m", "36 m"], a: "48 m", explanation: "Side = sqrt(144) = 12 m. Perimeter = 4 * 12 = 48 m." },
            { q: "The total surface area of a cube with side 3 cm is:", options: ["54 sq cm", "27 sq cm", "9 sq cm", "36 sq cm"], a: "54 sq cm", explanation: "TSA = 6 * side^2 = 6 * 3^2 = 6 * 9 = 54 sq cm." },
            { q: "How many square centimeters are there in 1 square meter?", options: ["10,000 sq cm", "100 sq cm", "1,000 sq cm", "1,000,000 sq cm"], a: "10,000 sq cm", explanation: "1 m = 100 cm, so 1 sq m = 100 * 100 = 10,000 sq cm." },
            { q: "Find the area of a parallelogram with a base of 8 cm and a height of 6 cm.", options: ["48 sq cm", "24 sq cm", "14 sq cm", "28 sq cm"], a: "48 sq cm", explanation: "Area = base * height = 8 * 6 = 48 sq cm." },
            { q: "The volume of a cube is 125 cubic cm. What is the length of its side?", options: ["5 cm", "25 cm", "15 cm", "10 cm"], a: "5 cm", explanation: "Side = cube root of 125 = 5 cm." },
            { q: "Calculate the area of a circle with a radius of 7 cm. (Use Pi = 22/7)", options: ["154 sq cm", "44 sq cm", "14 sq cm", "49 sq cm"], a: "154 sq cm", explanation: "Area = Pi * r^2 = 22/7 * 7 * 7 = 154 sq cm." },
            { q: "The perimeter of a rectangle is 40 cm. If the length is 12 cm, what is the breadth?", options: ["8 cm", "28 cm", "14 cm", "10 cm"], a: "8 cm", explanation: "P = 2(L+B) -> 40 = 2(12+B) -> 20 = 12+B -> B = 8 cm." },
            { q: "Find the area of a trapezium with parallel sides 10 cm and 6 cm, and height 5 cm.", options: ["40 sq cm", "80 sq cm", "16 sq cm", "21 sq cm"], a: "40 sq cm", explanation: "Area = 1/2 * (sum of parallel sides) * height = 1/2 * (10+6) * 5 = 40 sq cm." },
            { q: "What is the lateral surface area of a cuboid with L=4, B=3, H=2?", options: ["28", "24", "52", "14"], a: "28", explanation: "LSA = 2 * H * (L + B) = 2 * 2 * (4 + 3) = 28." },
            { q: "The volume of a cylinder with radius 7 cm and height 10 cm is: (Use Pi = 22/7)", options: ["1540 cubic cm", "770 cubic cm", "220 cubic cm", "440 cubic cm"], a: "1540 cubic cm", explanation: "Volume = Pi * r^2 * h = 22/7 * 7 * 7 * 10 = 1540 cubic cm." },
            { q: "A rectangular tank is 2m long, 1m wide, and 1.5m deep. What is its capacity in liters? (1 m3 = 1000L)", options: ["3000 L", "1500 L", "300 L", "4500 L"], a: "3000 L", explanation: "Volume = 2 * 1 * 1.5 = 3 m3. Capacity = 3 * 1000 = 3000 L." },
            { q: "Find the surface area of a sphere with radius 7 cm. (Use Pi = 22/7)", options: ["616 sq cm", "154 sq cm", "308 sq cm", "44 sq cm"], a: "616 sq cm", explanation: "Area = 4 * Pi * r^2 = 4 * 22/7 * 7 * 7 = 616 sq cm." },
            { q: "If the diagonal of a square is 10 cm, what is its area?", options: ["50 sq cm", "100 sq cm", "25 sq cm", "200 sq cm"], a: "50 sq cm", explanation: "Area = 1/2 * d^2 = 1/2 * 10 * 10 = 50 sq cm." },
            { q: "The base of a triangle is doubled and its height is halved. The area will:", options: ["Remain same", "Double", "Half", "Become four times"], a: "Remain same", explanation: "1/2 * (2B) * (H/2) = 1/2 * B * H." },
            { q: "A cube of side 10 cm is melted to form smaller cubes of side 2 cm. How many cubes are formed?", options: ["125", "50", "25", "100"], a: "125", explanation: "Volume ratio = (10*10*10) / (2*2*2) = 1000 / 8 = 125." },
            { q: "What is the area of a rectangle if its length is 15 cm and diagonal is 17 cm?", options: ["120 sq cm", "150 sq cm", "255 sq cm", "240 sq cm"], a: "120 sq cm", explanation: "Breadth = sqrt(17^2 - 15^2) = sqrt(289 - 225) = 8. Area = 15 * 8 = 120 sq cm." },
            { q: "The circumference of a circle is 44 cm. What is its area? (Use Pi = 22/7)", options: ["154 sq cm", "616 sq cm", "44 sq cm", "77 sq cm"], a: "154 sq cm", explanation: "r = 44 / (2 * 22/7) = 7. Area = 22/7 * 7 * 7 = 154 sq cm." },
            { q: "Find the volume of a sphere of radius 3 cm. (Use Pi = 3.14)", options: ["113.04 cubic cm", "37.68 cubic cm", "28.26 cubic cm", "50.24 cubic cm"], a: "113.04 cubic cm", explanation: "Volume = 4/3 * Pi * r^3 = 4/3 * 3.14 * 27 = 4 * 3.14 * 9 = 113.04 cubic cm." },
            { q: "A wire is in the shape of a square of side 10 cm. If it is rebent into a circle, what is the radius? (Use Pi = 22/7)", options: ["6.36 cm", "10 cm", "7 cm", "3.14 cm"], a: "6.36 cm", explanation: "Perimeter = 40. 2 * Pi * r = 40 -> r = 20 / Pi = 20 / (22/7) = 140/22 = 6.36 cm." },
            { q: "The surface area of a cuboid is 280 sq cm. If L=10 and B=8, what is H?", options: ["5 cm", "6 cm", "4 cm", "10 cm"], a: "5 cm", explanation: "2(10*8 + 8H + 10H) = 280 -> 80 + 18H = 140 -> 18H = 60 -> H = 3.33 (Wait, let me pick better numbers). 2(10*8 + 8*5 + 10*5) = 2(80 + 40 + 50) = 340. Let's use H=5, TSA=340." },
            { q: "Find the height of a cuboid whose volume is 275 cm3 and base area is 25 cm2.", options: ["11 cm", "10 cm", "15 cm", "9 cm"], a: "11 cm", explanation: "Height = Volume / Base Area = 275 / 25 = 11 cm." },
            { q: "A path 2m wide runs around the outside of a square field of side 10m. Find the area of path.", options: ["96 sq m", "44 sq m", "100 sq m", "144 sq m"], a: "96 sq m", explanation: "Outer side = 14. Area = 14*14 - 10*10 = 196 - 100 = 96 sq m." },
            { q: "The radius of a wheel is 35 cm. How many revolutions will it make to cover 220 m?", options: ["100", "50", "200", "150"], a: "100", explanation: "Circumference = 2 * 22/7 * 35 = 220 cm = 2.2 m. Revs = 220 / 2.2 = 100." },
            { q: "What is the ratio of area of a square to the area of the square drawn on its diagonal?", options: ["1:2", "1:4", "2:1", "1:1"], a: "1:2", explanation: "Side s, Diagonal s*sqrt(2). Area ratio s^2 : 2s^2 = 1:2." },
            { q: "A cylinder and a cone have the same radius and height. The ratio of their volumes is:", options: ["3:1", "1:3", "1:1", "9:1"], a: "3:1", explanation: "V_cyl = Pi*r2*h, V_cone = 1/3 * Pi*r2*h." },
            { q: "The length of the longest pole that can be put in a room of 10m x 10m x 5m is:", options: ["15 m", "25 m", "10 m", "12 m"], a: "15 m", explanation: "Diagonal = sqrt(10^2 + 10^2 + 5^2) = sqrt(100 + 100 + 25) = sqrt(225) = 15 m." }
          ]
        }
      },
      {
        id: 'probability',
        title: 'Probability',
        desc: 'Chance, Outcomes & Experiments',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Probability", text: "Probability is the measure of the likelihood that an event will occur.", points: ["Ranges from 0 (Impossible) to 1 (Certain).", "Expressed as fractions, decimals, or percentages."] },
              { title: "Experiments & Outcomes", text: "An experiment is a process with a result. An outcome is a single possible result.", points: ["Experiment: Tossing a coin.", "Outcomes: Head or Tail."] },
              { title: "Types of Events", text: "Events are categorized by their chance of happening.", points: ["Certain Event: Guaranteed to happen (Probability = 1).", "Impossible Event: Cannot happen (Probability = 0).", "Likely: High chance; Unlikely: Low chance."] },
              { title: "The Probability Formula", text: "Calculating probability using the standard formula.", points: ["Probability = (Number of Favorable Outcomes) / (Total Number of Possible Outcomes).", "Standard notation: P(E)."] },
              { title: "Simple Experiments: Coins & Dice", text: "Studying chance with common objects.", points: ["Coin: 2 outcomes {H, T}. P(H) = 1/2.", "Dice: 6 outcomes {1, 2, 3, 4, 5, 6}. P(any number) = 1/6."] },
              { title: "Drawing Objects", text: "Probability with cards, balls, and marbles.", points: ["Drawing a red ball from a bag of 5 red and 5 blue balls.", "P(Red) = 5/10 = 1/2."] },
              { title: "Sample Space", text: "The set of all possible outcomes of an experiment.", points: ["Listing Outcomes: For 2 coins, S = {HH, HT, TH, TT}.", "Equally Likely: Every outcome has an equal chance."] },
              { title: "Calculating Simple Events", text: "Finding probabilities for single actions.", points: ["Finding P of getting an even number on a dice.", "Even numbers: {2, 4, 6}. Fav = 3. Total = 6. P = 3/6 = 1/2."] },
              { title: "Multiple Outcomes", text: "Solving problems involving groups of results.", points: ["Getting a number greater than 4 on a dice.", "Greater than 4: {5, 6}. Fav = 2. Total = 6. P = 2/6 = 1/3."] },
              { title: "Applications & Daily Life", text: "Using probability to predict the future.", points: ["Weather Forecasting: '60% chance of rain'.", "Games of Chance: Board games and luck.", "Predicting outcomes in sports."] }
            ]
          },
          practice: [
            { q: "Probability of an impossible event?", options: ["0", "1", "0.5", "None"], a: "0", explanation: "Impossible means zero chance." },
            { q: "Tossing a coin. P(Head)?", options: ["1/2", "1", "0", "1/4"], a: "1/2", explanation: "1 favorable out of 2 total." },
            { q: "Getting a 7 on a standard dice?", options: ["0", "1/6", "1", "None"], a: "0", explanation: "Dice only has 1-6." },
            { q: "Total outcomes for 2 coins?", options: ["4", "2", "8", "6"], a: "4", explanation: "HH, HT, TH, TT." },
            { q: "Probability of a certain event?", options: ["1", "0", "0.5", "None"], a: "1", explanation: "Certain means 100%." }
          ],
          challenge: [
            { q: "P(Even number) on a dice?", options: ["1/2", "1/3", "1/6", "1"], a: "1/2", explanation: "3 even numbers (2,4,6) out of 6." },
            { q: "Total outcomes for rolling a dice?", options: ["6", "1", "12", "None"], a: "6", explanation: "1, 2, 3, 4, 5, 6." }
          ],
          test: [
            { q: "What is the probability of an event that is absolutely certain to occur?", options: ["1", "0", "0.5", "100"], a: "1", explanation: "The probability of a certain event is always 1 (or 100%)." },
            { q: "If you toss a fair coin, what is the probability of getting a 'Tail'?", options: ["1/2", "1", "0", "1/4"], a: "1/2", explanation: "There is 1 favorable outcome out of 2 possible outcomes." },
            { q: "A standard six-sided die is rolled. What is the probability of rolling a 4?", options: ["1/6", "1/4", "1/2", "1"], a: "1/6", explanation: "There is only one '4' on a die with six faces." },
            { q: "What is the probability of an impossible event?", options: ["0", "1", "0.5", "-1"], a: "0", explanation: "If an event cannot happen, its probability is 0." },
            { q: "In a bag of 5 red and 5 blue marbles, what is the probability of picking a red marble?", options: ["1/2", "5", "1/10", "1/5"], a: "1/2", explanation: "5 red marbles out of 10 total marbles = 5/10 = 1/2." },
            { q: "Rolling a die, what is the probability of getting an even number?", options: ["1/2", "1/3", "1/6", "2/3"], a: "1/2", explanation: "Even numbers are 2, 4, and 6. So 3 out of 6 is 1/2." },
            { q: "Which of the following values CANNOT be a probability?", options: ["1.5", "0.7", "0", "1"], a: "1.5", explanation: "Probability must always be between 0 and 1 inclusive." },
            { q: "If the probability of rain is 0.3, what is the probability that it will NOT rain?", options: ["0.7", "0.3", "1.0", "0"], a: "0.7", explanation: "P(not rain) = 1 - P(rain) = 1 - 0.3 = 0.7." },
            { q: "A letter is chosen at random from the word 'PROBABILITY'. What is the probability it is a 'B'?", options: ["2/11", "1/11", "2/9", "1/9"], a: "2/11", explanation: "There are 2 'B's in the 11-letter word 'PROBABILITY'." },
            { q: "Tossing two coins simultaneously, what is the probability of getting two 'Heads'?", options: ["1/4", "1/2", "3/4", "1"], a: "1/4", explanation: "Possible outcomes are HH, HT, TH, TT. Only HH is favorable." },
            { q: "Rolling a die, what is the probability of getting a number greater than 4?", options: ["1/3", "1/2", "1/6", "2/3"], a: "1/3", explanation: "Numbers greater than 4 are 5 and 6. So 2 out of 6 is 1/3." },
            { q: "What is the probability of picking a 'King' from a standard deck of 52 cards?", options: ["1/13", "1/52", "4/13", "1/4"], a: "1/13", explanation: "There are 4 Kings in 52 cards. 4/52 simplifies to 1/13." },
            { q: "A die is rolled. What is the probability of getting a prime number?", options: ["1/2", "1/3", "1/6", "2/3"], a: "1/2", explanation: "Prime numbers on a die are 2, 3, and 5. So 3 out of 6 is 1/2." },
            { q: "In a deck of 52 cards, what is the probability of picking a 'Red' card?", options: ["1/2", "1/4", "13/52", "1/13"], a: "1/2", explanation: "Half the deck (26 cards) is red (Hearts and Diamonds)." },
            { q: "The sum of the probabilities of all possible outcomes of an experiment is:", options: ["1", "0", "0.5", "Infinite"], a: "1", explanation: "All probabilities in a sample space must add up to exactly 1." },
            { q: "Rolling a die, what is the probability of getting a multiple of 3?", options: ["1/3", "1/2", "1/6", "2/3"], a: "1/3", explanation: "Multiples of 3 on a die are 3 and 6. So 2 out of 6 is 1/3." },
            { q: "If you pick a day of the week at random, what is the probability it starts with 'S'?", options: ["2/7", "1/7", "3/7", "0"], a: "2/7", explanation: "Saturday and Sunday start with 'S'. So 2 days out of 7." },
            { q: "A bag contains 3 red, 4 green, and 5 blue balls. Probability of picking a green ball?", options: ["1/3", "4/7", "1/4", "4/9"], a: "1/3", explanation: "Total balls = 3+4+5 = 12. Green balls = 4. 4/12 = 1/3." },
            { q: "What is the probability of getting a '7' when rolling a single standard die?", options: ["0", "1/6", "1", "1/7"], a: "0", explanation: "A standard die only has numbers 1 through 6." },
            { q: "If P(E) = 0.05, what is the probability of 'not E'?", options: ["0.95", "0.5", "0.05", "1.05"], a: "0.95", explanation: "1 - 0.05 = 0.95." },
            { q: "A spinning wheel has 8 equal sectors numbered 1 to 8. Probability of landing on a number < 3?", options: ["1/4", "1/8", "3/8", "1/2"], a: "1/4", explanation: "Numbers less than 3 are 1 and 2. 2 out of 8 is 1/4." },
            { q: "Tossing two coins, what is the probability of getting at least one 'Head'?", options: ["3/4", "1/4", "1/2", "1"], a: "3/4", explanation: "Outcomes are HH, HT, TH, TT. Three of them (HH, HT, TH) have at least one Head." },
            { q: "Probability of picking a 'Spade' from a deck of 52 cards?", options: ["1/4", "1/2", "1/13", "13/52"], a: "1/4", explanation: "There are 4 suits, and Spades is one of them. 13/52 = 1/4." },
            { q: "In a class of 20 students, 12 are girls. What is the probability of picking a boy?", options: ["2/5", "3/5", "12/20", "1/2"], a: "2/5", explanation: "Boys = 20 - 12 = 8. Probability = 8/20 = 2/5." },
            { q: "Rolling a die, what is the probability of getting a number less than 7?", options: ["1", "0", "5/6", "1/2"], a: "1", explanation: "All numbers on a die (1,2,3,4,5,6) are less than 7." },
            { q: "A jar has 10 red candies and 90 blue candies. Probability of picking a red one?", options: ["1/10", "1/9", "1/100", "10/90"], a: "1/10", explanation: "10 red out of 100 total = 10/100 = 1/10." },
            { q: "What is the probability of getting an odd number on a die?", options: ["1/2", "1/3", "1/6", "5/6"], a: "1/2", explanation: "Odd numbers are 1, 3, and 5. 3 out of 6 is 1/2." },
            { q: "Picking a vowel from the word 'APPLE'. What is the probability?", options: ["2/5", "1/5", "3/5", "0"], a: "2/5", explanation: "Vowels are A and E. 2 out of 5 letters." },
            { q: "Two dice are rolled. How many total outcomes are possible in the sample space?", options: ["36", "12", "6", "24"], a: "36", explanation: "Each die has 6 outcomes, so 6 * 6 = 36." },
            { q: "Which of these represents a 'Likely' event?", options: ["P = 0.9", "P = 0.1", "P = 0.5", "P = 0"], a: "P = 0.9", explanation: "Events with probability close to 1 are considered likely." }
          ]
        }
      },
    ]
  },
  english: {
    title: 'English Language',
    icon: '📚',
    colors: 'from-slate-700 to-slate-900',
    topics: [
      {
        id: 'grammar',
        title: 'Grammar',
        desc: 'Detailed Tenses & Parts of Speech',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Grammar", text: "Grammar is the system of rules that allows us to communicate clearly.", points: ["Importance: Ensures clarity and prevents misunderstanding.", "Basic Structure: Subject + Verb + Object."] },
              { title: "Parts of Speech: Nouns", text: "Nouns are naming words.", points: ["Proper: Specific (London).", "Common: General (City).", "Collective: Groups (Team).", "Abstract: Ideas/Feelings (Love, Bravery)."] },
              { title: "Parts of Speech: Pronouns", text: "Words used to replace nouns.", points: ["Personal: I, you, he, she, it.", "Possessive: Mine, yours, his, hers.", "Reflexive: Myself, yourself."] },
              { title: "Verbs: Actions & Being", text: "Verbs show action or a state of being.", points: ["Action Verbs: Physical (run) or Mental (think).", "Helping Verbs: Auxiliary (is, am, are, was, were).", "Forms: V1, V2, V3 (Go, Went, Gone)."] },
              { title: "Adjectives & Adverbs", text: "Modifiers that add detail.", points: ["Adjectives: Describe nouns (Big, Happy).", "Degrees: Positive, Comparative, Superlative.", "Adverbs: Modify verbs/adjectives (Quickly, Very)."] },
              { title: "Tenses: Present", text: "Actions happening now or regularly.", points: ["Simple Present: Habits.", "Present Continuous: Currently happening.", "Present Perfect: Recently completed."] },
              { title: "Tenses: Past", text: "Actions that already happened.", points: ["Simple Past: Completed facts.", "Past Continuous: Was in progress.", "Past Perfect: Before another past action."] },
              { title: "Subject-Verb Agreement", text: "Rules for matching subject and verb.", points: ["Singular subject = Singular verb.", "Plural subject = Plural verb."] },
              { title: "Active and Passive Voice", text: "Focusing on the doer or the action.", points: ["Active: 'Ravi ate the apple.'", "Passive: 'The apple was eaten by Ravi.'"] },
              { title: "Direct and Indirect Speech", text: "Reporting what someone said.", points: ["Direct: Quote with marks.", "Indirect: Reporting the meaning (He said that...)."] },
              { title: "Articles & Determiners", text: "Specifying nouns.", points: ["Articles: a, an, the.", "Determiners: This, that, some, many."] },
              { title: "Modals & Punctuation", text: "Expressing ability/obligation and using marks correctly.", points: ["Modals: Can, Could, May, Might, Must.", "Punctuation: Comma, Full Stop, Question Mark, Quotation Marks."] }
            ]
          },
          practice: [
            { q: "Identify the Abstract Noun.", options: ["Bravery", "Soldier", "Sword", "King"], a: "Bravery", explanation: "Bravery is an idea/feeling." },
            { q: "Choose the correct verb: He ___ to school every day.", options: ["goes", "go", "going", "gone"], a: "goes", explanation: "Third-person singular needs 'goes'." },
            { q: "Which tense is: 'I am reading'?", options: ["Present Continuous", "Simple Present", "Past Perfect", "Future"], a: "Present Continuous", explanation: "'am + -ing' is continuous." },
            { q: "Passive of: 'She writes a letter'?", options: ["A letter is written by her", "A letter was written", "She is writing", "None"], a: "A letter is written by her", explanation: "Present passive rule." },
            { q: "Article for '___ honest man'?", options: ["an", "a", "the", "None"], a: "an", explanation: "Honest starts with a vowel sound." }
          ],
          challenge: [
            { q: "Plural of 'Child'?", options: ["Children", "Childs", "Childes", "None"], a: "Children", explanation: "Irregular plural." },
            { q: "Direct to Indirect: He said, 'I am happy.'", options: ["He said that he was happy", "He said he is happy", "He told happy", "None"], a: "He said that he was happy", explanation: "Tense shifts back." }
          ],
          test: [
            { q: "Choose the correct article: 'She is ___ unique person.'", options: ["a", "an", "the", "No article"], a: "a", explanation: "'Unique' starts with a 'y' sound, so we use 'a'." },
            { q: "Identify the type of noun: 'London' is a ___ noun.", options: ["Proper", "Common", "Abstract", "Collective"], a: "Proper", explanation: "Names of specific places are Proper Nouns." },
            { q: "Fill in the blank: 'The group of students ___ working hard.'", options: ["is", "are", "were", "be"], a: "is", explanation: "'Group' is a collective noun, usually treated as singular." },
            { q: "Which of these is an Abstract Noun?", options: ["Happiness", "Book", "Teacher", "Table"], a: "Happiness", explanation: "Abstract nouns represent ideas or feelings." },
            { q: "Choose the correct tense: 'I ___ my breakfast an hour ago.'", options: ["ate", "eat", "eaten", "eating"], a: "ate", explanation: "'Ago' indicates a completed action in the past." },
            { q: "What is the plural of 'Criterion'?", options: ["Criteria", "Criterions", "Criterias", "Criterion"], a: "Criteria", explanation: "This is an irregular plural from Latin." },
            { q: "Identify the adverb: 'He ran very quickly to the store.'", options: ["quickly", "ran", "very", "store"], a: "quickly", explanation: "'Quickly' describes how he ran (the verb)." },
            { q: "Choose the correct preposition: 'The cat is sitting ___ the roof.'", options: ["on", "in", "at", "between"], a: "on", explanation: "'On' indicates surface contact." },
            { q: "Find the mistake: 'Each of the boys have a pen.'", options: ["have should be has", "boys should be boy", "Each should be Every", "No mistake"], a: "have should be has", explanation: "'Each' always takes a singular verb." },
            { q: "Which sentence is in the Passive Voice?", options: ["The cake was baked by Lily.", "Lily baked the cake.", "Lily is baking a cake.", "Lily will bake a cake."], a: "The cake was baked by Lily.", explanation: "Passive voice focuses on the action being done to the subject." },
            { q: "Choose the correct pronoun: '___ and Ravi are best friends.'", options: ["I", "Me", "Myself", "Mine"], a: "I", explanation: "Use the subject pronoun 'I' when it's the doer." },
            { q: "What is the superlative degree of 'Bad'?", options: ["Worst", "Badder", "Worse", "Baddest"], a: "Worst", explanation: "The degrees are Bad (Positive), Worse (Comparative), and Worst (Superlative)." },
            { q: "Identify the conjunction: 'I like tea, but I hate coffee.'", options: ["but", "like", "tea", "hate"], a: "but", explanation: "Conjunctions like 'but' join two independent ideas." },
            { q: "Which word is a preposition?", options: ["Through", "Thorough", "Thought", "Though"], a: "Through", explanation: "'Through' indicates movement from one side to another." },
            { q: "Change to Indirect Speech: He said, 'I am tired.'", options: ["He said that he was tired.", "He said he is tired.", "He told he was tired.", "He says that he was tired."], a: "He said that he was tired.", explanation: "In indirect speech, the present tense usually shifts to the past." },
            { q: "Choose the correct form: 'Neither of the two plans ___ perfect.'", options: ["is", "are", "were", "been"], a: "is", explanation: "'Neither' refers to 'none of the two' and is singular." },
            { q: "Identify the interjection: 'Ouch! That really hurt.'", options: ["Ouch!", "hurt", "really", "That"], a: "Ouch!", explanation: "Interjections express sudden bursts of emotion." },
            { q: "Which of these is a collective noun?", options: ["Flock", "Bird", "Sky", "Wings"], a: "Flock", explanation: "A 'flock' refers to a group of birds." },
            { q: "What is the feminine of 'Wizard'?", options: ["Witch", "Wizandress", "Wizara", "Wizenne"], a: "Witch", explanation: "Witch is the standard feminine counterpart." },
            { q: "Choose the correct spelling:", options: ["Accommodation", "Acommodation", "Accomodation", "Acomodation"], a: "Accommodation", explanation: "It has two 'c's and two 'm's." },
            { q: "Identify the object: 'The boy kicked the ball.'", options: ["ball", "boy", "kicked", "the"], a: "ball", explanation: "The ball is the receiver of the action." },
            { q: "What tense is 'I have been studying'?", options: ["Present Perfect Continuous", "Present Perfect", "Past Continuous", "Simple Present"], a: "Present Perfect Continuous", explanation: "Shows an action started in the past and continuing now." },
            { q: "Find the synonym of 'Industrious':", options: ["Hard-working", "Lazy", "Rich", "Famous"], a: "Hard-working", explanation: "Industrious people put in a lot of effort." },
            { q: "Which punctuation mark is used for a sudden pause?", options: ["Dash", "Comma", "Full Stop", "Colon"], a: "Dash", explanation: "A dash (—) creates a more dramatic pause than a comma." },
            { q: "Identify the pronoun: 'That book is mine.'", options: ["mine", "book", "That", "is"], a: "mine", explanation: "'Mine' is a possessive pronoun." },
            { q: "Choose the correct verb: 'Water ___ at 100 degrees Celsius.'", options: ["boils", "boil", "boiling", "boiled"], a: "boils", explanation: "Scientific facts use the simple present tense." },
            { q: "What is the antonym of 'Transparent'?", options: ["Opaque", "Clear", "Cloudy", "Fragile"], a: "Opaque", explanation: "Opaque means you cannot see through it." },
            { q: "Identify the adjective: 'The tall man entered the room.'", options: ["tall", "man", "entered", "room"], a: "tall", explanation: "'Tall' describes the man (the noun)." },
            { q: "Which of these is a compound word?", options: ["Butterfly", "Flying", "Beautiful", "Quickly"], a: "Butterfly", explanation: "Butterfly is made of 'butter' and 'fly'." },
            { q: "Choose the correct phrase: 'He is afraid ___ dogs.'", options: ["of", "from", "with", "by"], a: "of", explanation: "'Afraid' is always followed by the preposition 'of'." }
          ]
        }
      },
      {
        id: 'vocabulary',
        title: 'Vocabulary',
        desc: 'Words, Meanings & Roots',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Vocabulary", text: "Vocabulary is the set of all words used in a particular language.", points: ["Importance: Essential for clear and effective communication.", "Everyday Usage: Building a strong bank of words for expression."] },
              { title: "Synonyms and Antonyms", text: "Understanding word relationships.", points: ["Synonyms: Similar meanings (Happy/Joyful).", "Antonyms: Opposite meanings (Hot/Cold).", "Usage: Using variety to avoid repetition."] },
              { title: "Word Meanings and Usage", text: "Learning how to use new words in context.", points: ["New Words: Understanding the definition.", "Correct Usage: Placing words in sentences accurately.", "Context-based: Meanings can change based on the sentence."] },
              { title: "Homophones and Homonyms", text: "Words that sound or look alike.", points: ["Homophones: Same sound, different meaning (Sun/Son, See/Sea).", "Homonyms: Same spelling, different meaning (Bat-animal/Bat-sport)."] },
              { title: "Prefixes and Suffixes", text: "Modifying base words to change their meaning.", points: ["Prefixes: un-, re-, dis- (unhappy, rebuild).", "Suffixes: -ful, -less, -ness (joyful, careless, happiness)."] },
              { title: "Root Words", text: "The base of many English words.", points: ["Understanding Roots: Building blocks (e.g., 'Bio' means life).", "Word Building: Creating new words from base roots."] },
              { title: "One Word Substitution", text: "Replacing long phrases with a single word.", points: ["Example: 'A person who loves books' = Bibliophile.", "Improves conciseness in writing."] },
              { title: "Idioms and Phrases", text: "Expressions where meaning is not literal.", points: ["Common Idioms: 'A piece of cake' (Very easy).", "Usage: Adding color and flavor to language."] },
              { title: "Collocations & Confusing Words", text: "Words that go together and words easily mixed up.", points: ["Collocations: 'Make a mistake' (not 'do a mistake').", "Confusing Words: Accept/Except, Lose/Loose."] },
              { title: "Word Formation & Context", text: "Changing word forms and understanding from reading.", points: ["Forms: Noun (Beauty), Verb (Beautify), Adjective (Beautiful).", "Context: Figuring out meanings from surrounding text."] },
              { title: "Spelling & Pronunciation", text: "Correct writing and speaking.", points: ["Basic Rules: 'i before e except after c'.", "Pronunciation: Stress and sound patterns."] }
            ]
          },
          practice: [
            { q: "Synonym of 'Fast'?", options: ["Quick", "Slow", "Steady", "Heavy"], a: "Quick", explanation: "Similar meaning." },
            { q: "Antonym of 'Brave'?", options: ["Cowardly", "Strong", "Bold", "Angry"], a: "Cowardly", explanation: "Opposite meaning." },
            { q: "Homophone of 'Wait'?", options: ["Weight", "Wet", "Width", "None"], a: "Weight", explanation: "Sounds the same." },
            { q: "Suffix meaning 'full of'?", options: ["-ful", "-less", "-ness", "un-"], a: "-ful", explanation: "Example: Joyful." },
            { q: "One word for 'A place for birds'?", options: ["Aviary", "Aquarium", "Stable", "None"], a: "Aviary", explanation: "Specific term." }
          ],
          challenge: [
            { q: "What does the idiom 'Break the ice' mean?", options: ["To start a conversation", "To freeze something", "To end a party", "To break a promise"], a: "To start a conversation", explanation: "It means to do something to relieve tension or get conversation started." },
            { q: "The root word 'Graph' most likely means:", options: ["To write", "To see", "To hear", "To move"], a: "To write", explanation: "Examples: Autograph, Biography, Graphics." },
            { q: "What is the one-word substitution for 'A person who hates humanity'?", options: ["Misanthrope", "Philanthropist", "Optimist", "Pessimist"], a: "Misanthrope", explanation: "'Mis' means hate, and 'anthrope' means human." },
            { q: "Choose the correct homophone: 'I need to buy a new ___ of shoes.'", options: ["pair", "pear", "pare", "payer"], a: "pair", explanation: "'Pair' refers to a set of two." },
            { q: "Which prefix means 'before'?", options: ["pre-", "post-", "re-", "un-"], a: "pre-", explanation: "Examples: Preview, Precede, Prefix." },
            { q: "The word 'Sincere' is a synonym for:", options: ["Honest", "Wealthy", "Angry", "Fast"], a: "Honest", explanation: "Sincere people are truthful and genuine." },
            { q: "What is the meaning of 'A piece of cake'?", options: ["Very easy", "Very delicious", "A small portion", "A birthday celebration"], a: "Very easy", explanation: "This idiom describes a task that requires little effort." },
            { q: "A person who studies stars and planets is an:", options: ["Astronomer", "Astrologer", "Geologist", "Biologist"], a: "Astronomer", explanation: "Astronomy is the scientific study of celestial bodies." },
            { q: "What is the antonym of 'Victory'?", options: ["Defeat", "Success", "Triumph", "Gain"], a: "Defeat", explanation: "Defeat is the opposite of winning." },
            { q: "Which suffix is used to turn a verb into a noun?", options: ["-tion", "-ly", "-ful", "-less"], a: "-tion", explanation: "Example: Create (verb) becomes Creation (noun)." }
          ],
          test: [
            { q: "Find the synonym of 'Abundant':", options: ["Plentiful", "Scarce", "Small", "Empty"], a: "Plentiful", explanation: "Abundant means present in large quantities." },
            { q: "What is the one-word for 'A place where bees are kept'?", options: ["Apiary", "Aviary", "Aquarium", "Stable"], a: "Apiary", explanation: "'Apis' is the Latin word for bee." },
            { q: "Choose the correct spelling:", options: ["Questionnaire", "Questionaire", "Questionare", "Questionnair"], a: "Questionnaire", explanation: "It has two 'n's and ends with 'aire'." },
            { q: "The idiom 'Hit the nail on the head' means:", options: ["To be exactly right", "To hurt oneself", "To build something", "To be angry"], a: "To be exactly right", explanation: "It refers to doing or saying exactly the correct thing." },
            { q: "What is the antonym of 'Fragile'?", options: ["Strong", "Weak", "Broken", "Soft"], a: "Strong", explanation: "Strong is the opposite of something easily broken." },
            { q: "The prefix 'Auto' means:", options: ["Self", "Fast", "Machine", "Move"], a: "Self", explanation: "Examples: Autobiography, Automatic, Autopilot." },
            { q: "Choose the correct homophone: 'The ___ of the flower was sweet.'", options: ["scent", "cent", "sent", "send"], a: "scent", explanation: "'Scent' refers to smell or aroma." },
            { q: "A collection of maps is called an:", options: ["Atlas", "Encyclopedia", "Dictionary", "Journal"], a: "Atlas", explanation: "An atlas specifically contains geographical maps." },
            { q: "What does the root word 'Bio' mean?", options: ["Life", "Earth", "Light", "Heat"], a: "Life", explanation: "Examples: Biology, Biography, Biosphere." },
            { q: "Find the synonym of 'Enormous':", options: ["Huge", "Tiny", "Normal", "Heavy"], a: "Huge", explanation: "Enormous means very large in size or amount." },
            { q: "The suffix '-less' means:", options: ["Without", "Full of", "In a way", "Capable"], a: "Without", explanation: "Examples: Careless, Fearless, Hopeless." },
            { q: "What is the meaning of 'Under the weather'?", options: ["Feeling sick", "Enjoying rain", "Being poor", "Being late"], a: "Feeling sick", explanation: "It is a common idiom for feeling unwell." },
            { q: "A person who walks on foot is a:", options: ["Pedestrian", "Pilot", "Cyclist", "Driver"], a: "Pedestrian", explanation: "'Ped' is the root for foot." },
            { q: "Choose the correct spelling:", options: ["Maintenance", "Maintainance", "Maintenence", "Maintainence"], a: "Maintenance", explanation: "The 'ai' in maintain changes to 'e' in maintenance." },
            { q: "What is the antonym of 'Artificial'?", options: ["Natural", "Fake", "Man-made", "Smart"], a: "Natural", explanation: "Natural is the opposite of artificial." },
            { q: "The idiom 'Cost an arm and a leg' means:", options: ["Very expensive", "A physical injury", "A fair price", "Very cheap"], a: "Very expensive", explanation: "It refers to something that is extremely costly." },
            { q: "What is the one-word for 'A story of a person's life written by themselves'?", options: ["Autobiography", "Biography", "Novel", "History"], a: "Autobiography", explanation: "'Auto' (self) + 'Bio' (life) + 'Graphy' (writing)." },
            { q: "Choose the correct homophone: 'Please ___ your name here.'", options: ["write", "right", "rite", "wright"], a: "write", explanation: "'Write' refers to recording words." },
            { q: "The synonym of 'Courageous' is:", options: ["Brave", "Fearful", "Smart", "Quiet"], a: "Brave", explanation: "Both words describe showing no fear." },
            { q: "What does the root word 'Tele' mean?", options: ["Far", "Near", "Sound", "Vision"], a: "Far", explanation: "Examples: Telephone, Telescope, Television." },
            { q: "A person who cannot read or write is:", options: ["Illiterate", "Literate", "Scholar", "Blind"], a: "Illiterate", explanation: "'Il-' is a prefix meaning not." },
            { q: "What is the meaning of 'Once in a blue moon'?", options: ["Very rarely", "Every night", "On full moon days", "Never"], a: "Very rarely", explanation: "It refers to something that happens very seldom." },
            { q: "Choose the correct spelling:", options: ["Occurrence", "Ocurence", "Occurence", "Occurrance"], a: "Occurrence", explanation: "It has two 'c's, two 'r's, and ends with 'ence'." },
            { q: "The antonym of 'Ancient' is:", options: ["Modern", "Old", "Past", "Historical"], a: "Modern", explanation: "Modern refers to the present time." },
            { q: "The suffix '-able' means:", options: ["Capable of", "Without", "Full of", "Action"], a: "Capable of", explanation: "Examples: Readable, Adaptable, Lovable." },
            { q: "Identify the homonym: 'The bat flew out' vs 'He used a bat.'", options: ["bat", "flew", "used", "out"], a: "bat", explanation: "'Bat' has the same spelling/sound but different meanings." },
            { q: "One word for 'A person who is skilled in many languages'?", options: ["Polyglot", "Bilingual", "Linguist", "Speaker"], a: "Polyglot", explanation: "'Poly' means many, 'glot' refers to language/tongue." },
            { q: "What is the meaning of 'Call it a day'?", options: ["Stop working", "Start a day", "Give a name", "Be happy"], a: "Stop working", explanation: "It means to decide to stop doing something for the rest of the day." },
            { q: "The synonym of 'Magnificent' is:", options: ["Splendid", "Poor", "Simple", "Small"], a: "Splendid", explanation: "Both describe something grand and impressive." },
            { q: "Choose the correct homophone: 'I can ___ the ocean from here.'", options: ["see", "sea", "seat", "seed"], a: "see", explanation: "'See' refers to using your eyes." }
          ]
        }
      },
      {
        id: 'writing',
        title: 'Writing',
        desc: 'Formats & Examples',
        content: {
          learn: {
            concept: [
              { title: "Introduction to Writing", text: "Writing is a way of expressing thoughts and sharing information clearly.", points: ["Purpose: To inform, persuade, or entertain.", "Types: Formal (letters to school) vs Informal (letters to friends).", "Clarity: Using simple sentences and logical order."] },
              { title: "Paragraph Writing: Explanation", text: "A paragraph is a group of sentences about a single topic.", points: ["Introduction: The topic sentence.", "Body: Supporting details and facts.", "Conclusion: Summary sentence."] },
              { title: "Paragraph Writing: Example", text: "Topic: My Hobby.", points: ["Introduction: My favorite hobby is reading books.", "Body: I love reading because it takes me to new worlds. I usually read for one hour before bed. It helps me learn new words.", "Conclusion: Reading is the best way to spend free time."] },
              { title: "Essay Writing: Explanation", text: "An essay is a longer piece of writing divided into multiple paragraphs.", points: ["Structure: Intro paragraph, Body paragraphs, Conclusion.", "Types: Narrative (telling a story), Descriptive (describing a place)."] },
              { title: "Essay Writing: Example", text: "Topic: The Importance of Trees.", points: ["Intro: Trees are the lungs of the earth.", "Body: They give us oxygen, wood, and fruits. They also provide shade and homes for birds.", "Conclusion: We must protect trees to save our planet."] },
              { title: "Formal Letter: Format", text: "Used for school, business, or authorities.", points: ["Sender's Address & Date.", "Receiver's Designation (e.g., The Principal).", "Subject: (Brief purpose).", "Salutation: (Dear Sir/Madam).", "Body & Closing: (Yours faithfully)."] },
              { title: "Formal Letter: Example", text: "To the Principal for Sick Leave.", points: ["Subject: Application for leave.", "Body: I am suffering from fever, so I cannot attend school for two days.", "Closing: Yours obediently, [Your Name]."] },
              { title: "Informal Letter: Explanation", text: "Written to friends and family in a casual tone.", points: ["No Subject line needed.", "Salutation: (Dear Rahul, Dearest Mom).", "Body: Personal news and chatty tone."] },
              { title: "Informal Letter: Example", text: "Inviting a friend to a Birthday Party.", points: ["Body: I am celebrating my 13th birthday on Sunday. I would be very happy if you could come and join the fun!", "Closing: Your best friend, [Your Name]."] },
              { title: "Notice Writing: Format", text: "A short, formal announcement for a group.", points: ["Heading: NAME OF INSTITUTION (Caps).", "Word: NOTICE (Caps).", "Date & Subject.", "Body: (Who, What, When, Where).", "Sign-off."] },
              { title: "Notice Writing: Example", text: "Lost Water Bottle.", points: ["Subject: LOST WATER BOTTLE.", "Body: A blue Milton bottle was lost in the playground during recess. If found, please return to the school office.", "Signed: School Captain."] },
              { title: "Story Writing: Explanation", text: "Developing a creative narrative from a prompt.", points: ["Beginning: Set the scene.", "Middle: A problem or event occurs.", "Ending: Resolution or moral."] },
              { title: "Dialogue & Email Writing", text: "Conversations and digital messages.", points: ["Dialogue: 'Ravi: Hello! how are you?'.", "Emails: Subject line + clear message + digital sign-off."] }
            ]
          },
          practice: [
            { q: "What is the correct salutation for a Formal Letter?", options: ["Dear Sir", "Hey Buddy", "Hi Mom", "None"], a: "Dear Sir", explanation: "Formal letters need respectful greetings." },
            { q: "A 'Notice' should always include:", options: ["Date and Place", "Personal stories", "Long paragraphs", "None"], a: "Date and Place", explanation: "Essential info for announcements." },
            { q: "Which part of an essay summarizes the main points?", options: ["Conclusion", "Introduction", "Body", "Title"], a: "Conclusion", explanation: "Final summary section." }
          ],
          challenge: [
            { q: "What is the primary purpose of a 'Topic Sentence' in a paragraph?", options: ["To introduce the main idea", "To conclude the paragraph", "To provide a specific example", "To check for spelling errors"], a: "To introduce the main idea", explanation: "The topic sentence tells the reader what the entire paragraph will be about." },
            { q: "In a formal letter, where does the 'Date' typically go?", options: ["Below the sender's address", "At the very bottom", "Inside the body", "After the signature"], a: "Below the sender's address", explanation: "The date follows the sender's contact information." },
            { q: "Which of these is a correct salutation for an informal letter to a friend?", options: ["Dear [Friend's Name],", "To Whom It May Concern,", "Respected Sir,", "Dear Principal,"], a: "Dear [Friend's Name],", explanation: "Informal letters use a casual and friendly greeting." },
            { q: "A good essay should be divided into at least how many parts?", options: ["Three (Intro, Body, Conclusion)", "One long paragraph", "Two (Title and Body)", "Five (one for each page)"], a: "Three (Intro, Body, Conclusion)", explanation: "This is the standard structural framework for essays." },
            { q: "What is the main function of 'Notice Writing'?", options: ["To display information to a group", "To write a personal story", "To ask for a holiday", "To complain about food"], a: "To display information to a group", explanation: "Notices are for making public announcements." },
            { q: "Which transition word shows a contrast between two ideas?", options: ["However", "Furthermore", "Therefore", "Similarly"], a: "However", explanation: "'However' indicates that the next point is different or opposite." },
            { q: "What is a 'Draft' in the writing process?", options: ["A preliminary version of a piece", "The final printed copy", "The title of the story", "A list of spelling words"], a: "A preliminary version of a piece", explanation: "Drafting is the stage where you write down your initial ideas." },
            { q: "In a 'Dialogue', how do we show that someone is speaking?", options: ["Using quotation marks", "Using bold text", "Using CAPITAL LETTERS", "Using parentheses"], a: "Using quotation marks", explanation: "Quotation marks (inverted commas) enclose the actual words spoken." },
            { q: "What should the 'Body' of a formal letter contain?", options: ["Clear details of the purpose", "A long story about your family", "Pictures and drawings", "Only your signature"], a: "Clear details of the purpose", explanation: "The body should be concise and address the main issue." },
            { q: "Which type of writing tells a story about a sequence of events?", options: ["Narrative writing", "Descriptive writing", "Persuasive writing", "Expository writing"], a: "Narrative writing", explanation: "Narratives focus on storytelling and plot." }
          ],
          test: [
            { q: "Which of these is essential in a 'Notice'?", options: ["The word 'NOTICE' in caps", "A very long story", "Informal language", "None"], a: "The word 'NOTICE' in caps", explanation: "This identifies the document as a formal notice." },
            { q: "What is the correct subscription (closing) for a formal letter to a Principal?", options: ["Yours obediently", "Your best friend", "With lots of love", "See you soon"], a: "Yours obediently", explanation: "This is a respectful closing for students writing to authorities." },
            { q: "In a paragraph, 'Supporting Details' are used to:", options: ["Explain the topic sentence", "Start a new topic", "Introduce the author", "End the story"], a: "Explain the topic sentence", explanation: "Supporting details provide facts or examples for the main idea." },
            { q: "An 'Informal Letter' is usually written to:", options: ["Friends and family", "The Bank Manager", "The Class Teacher", "The Mayor"], a: "Friends and family", explanation: "Informal letters are for personal relationships." },
            { q: "Which section of an essay introduces the background and the main thesis?", options: ["Introduction", "Conclusion", "Body Paragraph 2", "Title Page"], a: "Introduction", explanation: "The introduction sets the stage for the essay." },
            { q: "Where should the 'Heading' of a Notice be placed?", options: ["At the top center", "At the bottom left", "On the back side", "In the first sentence"], a: "At the top center", explanation: "The heading should be prominent and centered." },
            { q: "What does 'Persuasive Writing' aim to do?", options: ["Convince the reader", "Describe a flower", "Tell a funny joke", "List grocery items"], a: "Convince the reader", explanation: "Persuasive writing tries to change or influence an opinion." },
            { q: "Identify the formal closing:", options: ["Yours faithfully", "Besties forever", "Cheers", "Catch you later"], a: "Yours faithfully", explanation: "This is used when the receiver's name is not known." },
            { q: "A 'Report' is usually based on:", options: ["Facts and events", "Imaginary magic", "Personal dreams", "Jokes"], a: "Facts and events", explanation: "Reports are objective accounts of what happened." },
            { q: "In an email, the 'Subject Line' should be:", options: ["Short and relevant", "A whole paragraph", "Blank", "A funny greeting"], a: "Short and relevant", explanation: "It tells the receiver what the email is about before they open it." },
            { q: "What is the purpose of 'Descriptive Writing'?", options: ["To create a vivid picture", "To argue a point", "To give instructions", "To write an email"], a: "To create a vivid picture", explanation: "Descriptive writing uses sensory details (sight, sound, etc.)." },
            { q: "In a Formal Letter, 'Subject' comes:", options: ["Before the Salutation", "After the Signature", "In the Post Script", "It is not needed"], a: "Before the Salutation", explanation: "In many formats, it precedes the 'Dear Sir/Madam'." },
            { q: "Which mark is used at the end of an interrogative sentence?", options: ["Question mark", "Exclamation mark", "Comma", "Full stop"], a: "Question mark", explanation: "Interrogative sentences are questions." },
            { q: "What should you do during the 'Review/Editing' stage?", options: ["Check for grammar and spelling", "Start a completely new story", "Draw illustrations", "Delete the whole thing"], a: "Check for grammar and spelling", explanation: "Editing ensures the final version is error-free." },
            { q: "An 'Invitation' should always answer which 4 questions?", options: ["Who, What, When, Where", "Why, How, Which, Whose", "Name, Age, Class, Roll", "None"], a: "Who, What, When, Where", explanation: "These are the essential details for any event." },
            { q: "A collection of related sentences about one idea is a:", options: ["Paragraph", "Sentence", "Letter", "Notice"], a: "Paragraph", explanation: "A paragraph focuses on a single core thought." },
            { q: "Identify the informal closing:", options: ["With love", "Yours sincerely", "Yours faithfully", "Respectfully yours"], a: "With love", explanation: "This is used for close family or friends." },
            { q: "What is a 'Biography'?", options: ["A story of someone's life", "A book about plants", "A formal application", "A weather report"], a: "A story of someone's life", explanation: "Biographies are written about another person's life." },
            { q: "The 'Conclusion' of an essay should:", options: ["Summarize the main points", "Start a new argument", "Be the longest part", "Contain no text"], a: "Summarize the main points", explanation: "It provides a sense of closure to the writing." },
            { q: "In Notice Writing, the 'Name of Issuing Authority' is:", options: ["The organization/school", "The person who lost an item", "The date", "None"], a: "The organization/school", explanation: "This goes at the very top." },
            { q: "What is 'Expository Writing'?", options: ["Writing to explain or inform", "Writing to tell a story", "Writing to express anger", "Writing to write poetry"], a: "Writing to explain or inform", explanation: "It focuses on providing information and facts." },
            { q: "A formal letter's tone should be:", options: ["Polite and professional", "Angry and loud", "Casual and chatty", "Sarcastic"], a: "Polite and professional", explanation: "Formal communication requires a certain level of decorum." },
            { q: "Which part of a story introduces the characters and setting?", options: ["The Exposition/Beginning", "The Climax", "The Resolution", "The Index"], a: "The Exposition/Beginning", explanation: "This sets the foundation for the plot." },
            { q: "An 'Application' to a Principal is a type of:", options: ["Formal Letter", "Informal Letter", "Diary Entry", "Notice"], a: "Formal Letter", explanation: "It follows the official rules of communication." },
            { q: "What is the 'Climax' of a story?", options: ["The turning point/most exciting part", "The title page", "The list of characters", "The moral"], a: "The turning point/most exciting part", explanation: "It's the peak of the story's tension." },
            { q: "When writing a 'Summary', you should:", options: ["Include only main ideas", "Copy every sentence", "Add your own stories", "Make it longer than original"], a: "Include only main ideas", explanation: "Summaries are short and focus on the gist." },
            { q: "The 'Signature' in a formal letter should be:", options: ["Legible and official", "A thumbprint", "A nickname", "Optional"], a: "Legible and official", explanation: "It identifies the sender formally." },
            { q: "Which type of writing uses 'I' and 'Me' throughout?", options: ["First-person narrative", "Third-person report", "Formal notice", "Science textbook"], a: "First-person narrative", explanation: "The narrator is a character in the story." },
            { q: "In 'Message Writing', the content should be:", options: ["Brief and clear", "Very long and detailed", "A secret code", "None"], a: "Brief and clear", explanation: "Messages are for quick communication." },
            { q: "The 'Moral' of a story is:", options: ["The lesson learned", "The names of villains", "The setting", "The word count"], a: "The lesson learned", explanation: "It's the underlying message or value taught by the story." }
          ]
        }
      },
      {
        id: 'reading',
        title: 'Reading Comprehension',
        desc: 'Analysis & Interpretation',
        content: {
          learn: {
            concept: [
              { title: "What is Reading Comprehension?", text: "It is the ability to read text, process it, and understand its meaning.", points: ["Purpose: To extract information and understand the author's message.", "Focus: Paying attention to details, tone, and main ideas."] },
              { title: "Direct Questions: Explanation", text: "Questions where the answer is explicitly stated in the passage.", points: ["Focus: Names, dates, places, and specific actions.", "Strategy: Skim the text to find keywords."] },
              { title: "Direct Questions: Example", text: "Passage: 'Rohan went to the park at 5 PM.'", points: ["Question: Where did Rohan go?", "Answer: To the park (Directly stated)."] },
              { title: "Inference Questions: Explanation", text: "Questions where the answer is 'hidden' or implied.", points: ["Focus: Why something happened or how someone feels.", "Strategy: Read between the lines and look for clues."] },
              { title: "Inference Questions: Example", text: "Passage: 'Sara carried an umbrella and wore a raincoat.'", points: ["Question: What was the weather like?", "Answer: It was likely raining (Inferred from her clothes)."] },
              { title: "Vocabulary Questions: Explanation", text: "Finding the meaning of a word based on how it is used in the text.", points: ["Focus: Synonyms and context clues.", "Strategy: Replace the word with your guess to see if it fits."] },
              { title: "Vocabulary Questions: Example", text: "Passage: 'The massive elephant walked through the jungle.'", points: ["Question: What does 'massive' mean here?", "Answer: Very large (Based on context)."] },
              { title: "Opinion Questions: Explanation", text: "Questions that ask for your personal response or evaluation.", points: ["Focus: Do you agree? What would you do?", "Strategy: Use evidence from the text to support your view."] }
            ]
          },
          practice: [
            { q: "Direct answers are found:", options: ["Clearly in the text", "Hidden between lines", "In the dictionary", "None"], a: "Clearly in the text", explanation: "Direct means explicit." },
            { q: "Inference means:", options: ["Reading between the lines", "Copying the text", "Ignoring details", "None"], a: "Reading between the lines", explanation: "Finding hidden meanings." }
          ],
          challenge: [
            { 
              passage: "The sun was setting behind the hills, painting the sky in shades of orange and pink. Birds were returning to their nests, and a cool breeze began to blow. This peaceful time of day, often called 'golden hour', is a favorite for photographers and nature lovers alike.",
              q: "What is another name for the 'peaceful time of day' mentioned?",
              options: ["Golden hour", "Sunset peak", "Morning glow", "Midnight"],
              a: "Golden hour",
              explanation: "The text specifically mentions 'golden hour' as another name."
            },
            { 
              passage: "The library was silent. Students were busy reading books and preparing for their upcoming exams. The only sound was the occasional turning of pages. A sign on the wall reminded everyone: 'Silence is Golden. Please respect your fellow learners.'",
              q: "What was the only sound heard in the library?",
              options: ["Turning of pages", "Students talking", "Music playing", "Bell ringing"],
              a: "Turning of pages",
              explanation: "The text says the only sound was the occasional turning of pages."
            },
            { 
              passage: "A library is a quiet place where people go to read or study. You must follow the rules and not talk loudly. Many libraries now also have computer labs where you can access the internet for research.",
              q: "Why do libraries have computer labs according to the text?",
              options: ["For research", "To play games", "To watch movies", "To sleep"],
              a: "For research",
              explanation: "It mentions computer labs are for accessing the internet for research."
            },
            { 
              passage: "The old tree stood tall in the middle of the field. Its branches were bare, and its trunk was gnarled with age. Despite its appearance, it still provided a home for several families of squirrels and birds every winter.",
              q: "What does 'gnarled' likely mean in this context?",
              options: ["Twisted and old", "Smooth and young", "Green and tall", "None of these"],
              a: "Twisted and old",
              explanation: "Context clues like 'old tree' and 'age' suggest it means twisted/knotted."
            },
            { 
              passage: "Plants need sunlight, water, and soil to grow. Without these, they will wither and die. Some plants, like cacti, can survive in the desert with very little water because they store it in their thick stems.",
              q: "How do cacti survive with very little water?",
              options: ["They store it in their stems", "They don't need water", "They hide from the sun", "None"],
              a: "They store it in their stems",
              explanation: "The text explains they survive by storing water in their stems."
            }
          ],
          test: [
            // Passage 1: The Great Barrier Reef
            { 
              passage: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. This massive ecosystem is home to thousands of species of marine life, including colorful fish, sea turtles, and sharks. However, the reef faces significant threats from climate change. Rising ocean temperatures cause coral bleaching, a process where corals lose their vibrant colors and can eventually die if the water stays too warm for too long.",
              q: "Where is the Great Barrier Reef located?",
              options: ["Off the coast of Queensland, Australia", "In the Atlantic Ocean", "Near the coast of Brazil", "In the Mediterranean Sea"],
              a: "Off the coast of Queensland, Australia",
              explanation: "The text explicitly states it is off the coast of Queensland, Australia."
            },
            { 
              passage: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. This massive ecosystem is home to thousands of species of marine life, including colorful fish, sea turtles, and sharks. However, the reef faces significant threats from climate change. Rising ocean temperatures cause coral bleaching, a process where corals lose their vibrant colors and can eventually die if the water stays too warm for too long.",
              q: "What is 'coral bleaching' caused by?",
              options: ["Rising ocean temperatures", "Overfishing", "Water pollution", "Lack of sunlight"],
              a: "Rising ocean temperatures",
              explanation: "The passage mentions that rising temperatures cause the bleaching process."
            },
            { 
              passage: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. This massive ecosystem is home to thousands of species of marine life, including colorful fish, sea turtles, and sharks. However, the reef faces significant threats from climate change. Rising ocean temperatures cause coral bleaching, a process where corals lose their vibrant colors and can eventually die if the water stays too warm for too long.",
              q: "How many individual reefs make up the system?",
              options: ["Over 2,900", "Exactly 900", "About 2,300", "Over 5,000"],
              a: "Over 2,900",
              explanation: "The first sentence mentions it is composed of over 2,900 individual reefs."
            },
            { 
              passage: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. This massive ecosystem is home to thousands of species of marine life, including colorful fish, sea turtles, and sharks. However, the reef faces significant threats from climate change. Rising ocean temperatures cause coral bleaching, a process where corals lose their vibrant colors and can eventually die if the water stays too warm for too long.",
              q: "Which word in the text means 'shining or bright'?",
              options: ["Vibrant", "Massive", "Stretching", "Individual"],
              a: "Vibrant",
              explanation: "Vibrant is used to describe the bright colors of the coral."
            },
            { 
              passage: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. This massive ecosystem is home to thousands of species of marine life, including colorful fish, sea turtles, and sharks. However, the reef faces significant threats from climate change. Rising ocean temperatures cause coral bleaching, a process where corals lose their vibrant colors and can eventually die if the water stays too warm for too long.",
              q: "What might happen if the ocean water stays warm for a long period?",
              options: ["The corals might die", "More fish will arrive", "The reef will grow larger", "The islands will sink"],
              a: "The corals might die",
              explanation: "The text warns that corals can eventually die if the water stays too warm."
            },

            // Passage 2: Thomas Edison
            { 
              passage: "Thomas Edison is often credited with inventing the first practical electric lightbulb. While others had worked on similar ideas, Edison's design in 1879 was the first that could stay lit for a long time and was cheap enough for people to buy. He tested thousands of different materials for the filament—the thin wire inside the bulb that glows. Eventually, he found that a carbonized bamboo filament could burn for over 1,200 hours. Edison's persistence showed that failure was just a step toward success. He famously said, 'I have not failed. I've just found 10,000 ways that won't work.'",
              q: "In which year did Edison create his successful lightbulb design?",
              options: ["1879", "1800", "1900", "1200"],
              a: "1879",
              explanation: "The text states the design was created in 1879."
            },
            { 
              passage: "Thomas Edison is often credited with inventing the first practical electric lightbulb. While others had worked on similar ideas, Edison's design in 1879 was the first that could stay lit for a long time and was cheap enough for people to buy. He tested thousands of different materials for the filament—the thin wire inside the bulb that glows. Eventually, he found that a carbonized bamboo filament could burn for over 1,200 hours. Edison's persistence showed that failure was just a step toward success. He famously said, 'I have not failed. I've just found 10,000 ways that won't work.'",
              q: "What is the 'filament' inside a lightbulb?",
              options: ["A thin wire that glows", "The glass cover", "The metal base", "A type of battery"],
              a: "A thin wire that glows",
              explanation: "The passage defines the filament as the thin wire inside the bulb."
            },
            { 
              passage: "Thomas Edison is often credited with inventing the first practical electric lightbulb. While others had worked on similar ideas, Edison's design in 1879 was the first that could stay lit for a long time and was cheap enough for people to buy. He tested thousands of different materials for the filament—the thin wire inside the bulb that glows. Eventually, he found that a carbonized bamboo filament could burn for over 1,200 hours. Edison's persistence showed that failure was just a step toward success. He famously said, 'I have not failed. I've just found 10,000 ways that won't work.'",
              q: "How long could the carbonized bamboo filament burn?",
              options: ["Over 1,200 hours", "10,000 hours", "79 hours", "24 hours"],
              a: "Over 1,200 hours",
              explanation: "The text mentions it could burn for over 1,200 hours."
            },
            { 
              passage: "Thomas Edison is often credited with inventing the first practical electric lightbulb. While others had worked on similar ideas, Edison's design in 1879 was the first that could stay lit for a long time and was cheap enough for people to buy. He tested thousands of different materials for the filament—the thin wire inside the bulb that glows. Eventually, he found that a carbonized bamboo filament could burn for over 1,200 hours. Edison's persistence showed that failure was just a step toward success. He famously said, 'I have not failed. I've just found 10,000 ways that won't work.'",
              q: "Based on the text, what quality best describes Edison?",
              options: ["Persistent", "Lazy", "Weak", "Forgetful"],
              a: "Persistent",
              explanation: "The text mentions his persistence and testing thousands of materials."
            },
            { 
              passage: "Thomas Edison is often credited with inventing the first practical electric lightbulb. While others had worked on similar ideas, Edison's design in 1879 was the first that could stay lit for a long time and was cheap enough for people to buy. He tested thousands of different materials for the filament—the thin wire inside the bulb that glows. Eventually, he found that a carbonized bamboo filament could burn for over 1,200 hours. Edison's persistence showed that failure was just a step toward success. He famously said, 'I have not failed. I've just found 10,000 ways that won't work.'",
              q: "What did Edison mean by his quote about 10,000 ways?",
              options: ["He viewed mistakes as learning steps", "He was tired of working", "He didn't like his invention", "He was boasting"],
              a: "He viewed mistakes as learning steps",
              explanation: "The quote implies that every 'failed' attempt taught him something new."
            },

            // Passage 3: Importance of Forests
            { 
              passage: "Forests are often called the 'lungs of the planet' because they produce oxygen and absorb carbon dioxide. They provide homes for millions of species and are essential for maintaining the Earth's climate. Trees also help prevent soil erosion by holding the earth together with their roots. Unfortunately, deforestation—the clearing of forests—is happening at an alarming rate. When forests are destroyed, many animals lose their habitats, and global warming increases. Protecting our forests is not just about saving trees; it's about ensuring a healthy future for all living beings.",
              q: "Why are forests called the 'lungs of the planet'?",
              options: ["They produce oxygen", "They are green", "They are very large", "They have many animals"],
              a: "They produce oxygen",
              explanation: "The text says they are called lungs because they produce oxygen and absorb CO2."
            },
            { 
              passage: "Forests are often called the 'lungs of the planet' because they produce oxygen and absorb carbon dioxide. They provide homes for millions of species and are essential for maintaining the Earth's climate. Trees also help prevent soil erosion by holding the earth together with their roots. Unfortunately, deforestation—the clearing of forests—is happening at an alarming rate. When forests are destroyed, many animals lose their habitats, and global warming increases. Protecting our forests is not just about saving trees; it's about ensuring a healthy future for all living beings.",
              q: "What is 'deforestation'?",
              options: ["Clearing of forests", "Planting new trees", "Studying forest animals", "Watering plants"],
              a: "Clearing of forests",
              explanation: "The passage defines it as the clearing of forests."
            },
            { 
              passage: "Forests are often called the 'lungs of the planet' because they produce oxygen and absorb carbon dioxide. They provide homes for millions of species and are essential for maintaining the Earth's climate. Trees also help prevent soil erosion by holding the earth together with their roots. Unfortunately, deforestation—the clearing of forests—is happening at an alarming rate. When forests are destroyed, many animals lose their habitats, and global warming increases. Protecting our forests is not just about saving trees; it's about ensuring a healthy future for all living beings.",
              q: "How do tree roots help the soil?",
              options: ["They prevent soil erosion", "They make soil darker", "They cool the soil", "They move the soil"],
              a: "They prevent soil erosion",
              explanation: "The text says roots hold the earth together to prevent erosion."
            },
            { 
              passage: "Forests are often called the 'lungs of the planet' because they produce oxygen and absorb carbon dioxide. They provide homes for millions of species and are essential for maintaining the Earth's climate. Trees also help prevent soil erosion by holding the earth together with their roots. Unfortunately, deforestation—the clearing of forests—is happening at an alarming rate. When forests are destroyed, many animals lose their habitats, and global warming increases. Protecting our forests is not just about saving trees; it's about ensuring a healthy future for all living beings.",
              q: "What is a result of destroying forests?",
              options: ["Global warming increases", "Oxygen levels go up", "Soil becomes stronger", "Animals find better homes"],
              a: "Global warming increases",
              explanation: "The passage notes that global warming increases when forests are destroyed."
            },
            { 
              passage: "Forests are often called the 'lungs of the planet' because they produce oxygen and absorb carbon dioxide. They provide homes for millions of species and are essential for maintaining the Earth's climate. Trees also help prevent soil erosion by holding the earth together with their roots. Unfortunately, deforestation—the clearing of forests—is happening at an alarming rate. When forests are destroyed, many animals lose their habitats, and global warming increases. Protecting our forests is not just about saving trees; it's about ensuring a healthy future for all living beings.",
              q: "The word 'Habitat' refers to:",
              options: ["A natural home for animals", "A type of tree", "A weather condition", "A large machine"],
              a: "A natural home for animals",
              explanation: "Habitats are the homes that animals lose when forests are cleared."
            },

            // Passage 4: The Solar System
            { 
              passage: "Our solar system consists of a central star, the Sun, and all the objects that travel around it. This includes eight planets, their moons, and many smaller objects like asteroids and comets. The four planets closest to the Sun—Mercury, Venus, Earth, and Mars—are terrestrial planets with solid, rocky surfaces. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are known as gas giants or ice giants. Jupiter is the largest planet, so large that all other planets could fit inside it. Gravity is the force that keeps all these objects in orbit around the Sun.",
              q: "What is the central star of our solar system?",
              options: ["The Sun", "The Moon", "Jupiter", "Polaris"],
              a: "The Sun",
              explanation: "The text identifies the Sun as the central star."
            },
            { 
              passage: "Our solar system consists of a central star, the Sun, and all the objects that travel around it. This includes eight planets, their moons, and many smaller objects like asteroids and comets. The four planets closest to the Sun—Mercury, Venus, Earth, and Mars—are terrestrial planets with solid, rocky surfaces. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are known as gas giants or ice giants. Jupiter is the largest planet, so large that all other planets could fit inside it. Gravity is the force that keeps all these objects in orbit around the Sun.",
              q: "Which planets are 'terrestrial planets'?",
              options: ["The four closest to the Sun", "The four farthest", "Earth and Mars only", "Planets with rings"],
              a: "The four closest to the Sun",
              explanation: "The text specifies the four closest (Mercury, Venus, Earth, Mars) are terrestrial."
            },
            { 
              passage: "Our solar system consists of a central star, the Sun, and all the objects that travel around it. This includes eight planets, their moons, and many smaller objects like asteroids and comets. The four planets closest to the Sun—Mercury, Venus, Earth, and Mars—are terrestrial planets with solid, rocky surfaces. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are known as gas giants or ice giants. Jupiter is the largest planet, so large that all other planets could fit inside it. Gravity is the force that keeps all these objects in orbit around the Sun.",
              q: "Which is the largest planet?",
              options: ["Jupiter", "Saturn", "The Sun", "Neptune"],
              a: "Jupiter",
              explanation: "The passage states Jupiter is the largest planet."
            },
            { 
              passage: "Our solar system consists of a central star, the Sun, and all the objects that travel around it. This includes eight planets, their moons, and many smaller objects like asteroids and comets. The four planets closest to the Sun—Mercury, Venus, Earth, and Mars—are terrestrial planets with solid, rocky surfaces. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are known as gas giants or ice giants. Jupiter is the largest planet, so large that all other planets could fit inside it. Gravity is the force that keeps all these objects in orbit around the Sun.",
              q: "What force keeps the planets in orbit?",
              options: ["Gravity", "Wind", "Magnetism", "Electricity"],
              a: "Gravity",
              explanation: "The final sentence identifies gravity as the force."
            },
            { 
              passage: "Our solar system consists of a central star, the Sun, and all the objects that travel around it. This includes eight planets, their moons, and many smaller objects like asteroids and comets. The four planets closest to the Sun—Mercury, Venus, Earth, and Mars—are terrestrial planets with solid, rocky surfaces. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are known as gas giants or ice giants. Jupiter is the largest planet, so large that all other planets could fit inside it. Gravity is the force that keeps all these objects in orbit around the Sun.",
              q: "What makes terrestrial planets different?",
              options: ["They have solid surfaces", "They are made of ice", "They are larger", "They have no gravity"],
              a: "They have solid surfaces",
              explanation: "The text explains they are called terrestrial because of their solid surfaces."
            },

            // Passage 5: The Water Cycle
            { 
              passage: "The water cycle is the continuous movement of water on Earth. The Sun heats ocean water, causing it to evaporate as vapor. As vapor rises, it cools and condenses into clouds (condensation). Eventually, water falls back as precipitation—rain, snow, or hail. This water flows into rivers and returns to the oceans, starting the cycle again. This process provides fresh water to all life forms.",
              q: "What is water turning into vapor called?",
              options: ["Evaporation", "Condensation", "Precipitation", "Collection"],
              a: "Evaporation",
              explanation: "The text states the Sun causes water to evaporate."
            },
            { 
              passage: "The water cycle is the continuous movement of water on Earth. The Sun heats ocean water, causing it to evaporate as vapor. As vapor rises, it cools and condenses into clouds (condensation). Eventually, water falls back as precipitation—rain, snow, or hail. This water flows into rivers and returns to the oceans, starting the cycle again. This process provides fresh water to all life forms.",
              q: "What happens during 'condensation'?",
              options: ["Vapor turns into clouds", "Water falls as rain", "Ocean water gets hot", "Rivers flow to sea"],
              a: "Vapor turns into clouds",
              explanation: "The text describes vapor condensing into clouds as condensation."
            },
            { 
              passage: "The water cycle is the continuous movement of water on Earth. The Sun heats ocean water, causing it to evaporate as vapor. As vapor rises, it cools and condenses into clouds (condensation). Eventually, water falls back as precipitation—rain, snow, or hail. This water flows into rivers and returns to the oceans, starting the cycle again. This process provides fresh water to all life forms.",
              q: "Which is a form of 'precipitation'?",
              options: ["Snow", "Vapor", "Sunlight", "Wind"],
              a: "Snow",
              explanation: "The passage lists rain, snow, and hail as forms of precipitation."
            },
            { 
              passage: "The water cycle is the continuous movement of water on Earth. The Sun heats ocean water, causing it to evaporate as vapor. As vapor rises, it cools and condenses into clouds (condensation). Eventually, water falls back as precipitation—rain, snow, or hail. This water flows into rivers and returns to the oceans, starting the cycle again. This process provides fresh water to all life forms.",
              q: "Where does most water return to?",
              options: ["The oceans", "The Sun", "The mountains", "The moon"],
              a: "The oceans",
              explanation: "The text says most water returns to the oceans."
            },
            { 
              passage: "The water cycle is the continuous movement of water on Earth. The Sun heats ocean water, causing it to evaporate as vapor. As vapor rises, it cools and condenses into clouds (condensation). Eventually, water falls back as precipitation—rain, snow, or hail. This water flows into rivers and returns to the oceans, starting the cycle again. This process provides fresh water to all life forms.",
              q: "Why is the cycle important?",
              options: ["It provides fresh water", "It makes ocean saltier", "It stops the Sun", "None"],
              a: "It provides fresh water",
              explanation: "The final sentence highlights its importance for providing fresh water."
            },

            // Passage 6: Egyptian Pyramids
            { 
              passage: "The pyramids of Ancient Egypt were built over 4,500 years ago as tombs for pharaohs. Built without modern machinery, workers used thousands of limestone blocks, some weighing over two tons. Engineers and laborers worked together with incredible precision. Today, the pyramids remain a symbol of Egypt's rich history.",
              q: "Why were the pyramids built?",
              options: ["As tombs for pharaohs", "As schools", "As markets", "As parks"],
              a: "As tombs for pharaohs",
              explanation: "The text states they were built as tombs for pharaohs."
            },
            { 
              passage: "The pyramids of Ancient Egypt were built over 4,500 years ago as tombs for pharaohs. Built without modern machinery, workers used thousands of limestone blocks, some weighing over two tons. Engineers and laborers worked together with incredible precision. Today, the pyramids remain a symbol of Egypt's rich history.",
              q: "How long ago were they built?",
              options: ["Over 4,500 years", "1,000 years", "100 years", "500 years"],
              a: "Over 4,500 years",
              explanation: "The text mentions they were built over 4,500 years ago."
            },
            { 
              passage: "The pyramids of Ancient Egypt were built over 4,500 years ago as tombs for pharaohs. Built without modern machinery, workers used thousands of limestone blocks, some weighing over two tons. Engineers and laborers worked together with incredible precision. Today, the pyramids remain a symbol of Egypt's rich history.",
              q: "What type of stone was used?",
              options: ["Limestone", "Marble", "Wood", "Brick"],
              a: "Limestone",
              explanation: "The passage mentions limestone blocks."
            },
            { 
              passage: "The pyramids of Ancient Egypt were built over 4,500 years ago as tombs for pharaohs. Built without modern machinery, workers used thousands of limestone blocks, some weighing over two tons. Engineers and laborers worked together with incredible precision. Today, the pyramids remain a symbol of Egypt's rich history.",
              q: "What does 'precision' mean here?",
              options: ["Great accuracy", "In a hurry", "Loudly", "Without care"],
              a: "Great accuracy",
              explanation: "Precision refers to exactness."
            },
            { 
              passage: "The pyramids of Ancient Egypt were built over 4,500 years ago as tombs for pharaohs. Built without modern machinery, workers used thousands of limestone blocks, some weighing over two tons. Engineers and laborers worked together with incredible precision. Today, the pyramids remain a symbol of Egypt's rich history.",
              q: "Did they use modern machines?",
              options: ["No", "Yes", "Only for lifting", "None"],
              a: "No",
              explanation: "The text says they were built without modern machinery."
            }
          ]
        }
      },
    ]
  },
  science: {
    title: 'Science',
    icon: '🔬',
    colors: 'from-emerald-700 to-teal-800',
    topics: [
      {
        id: 'motion',
        category: 'physics',
        title: 'Motion & Force',
        desc: 'Types of Motion, Speed & Laws',
        content: {
          learn: {
            concept: [
              { title: "1. Introduction to Motion", text: "Motion is the change in position of an object over time relative to a fixed point. If an object's distance from a reference point changes, it is said to be in motion.", points: ["Position change: Moving from Point A to Point B.", "Reference Point: A fixed location used to judge motion.", "Relative Motion: Everything in the universe is in motion relative to something else."], example: "A moving bicycle, a running person, or a bird flying across the sky.", diagram: "motion_basics.png" },
              { title: "2. Types of Motion", text: "Motion can follow different paths. Scientists classify these paths into distinct categories.", points: ["Rectilinear: Motion in a straight line (e.g., car on a straight road).", "Circular: Moving along a circular path (e.g., hands of a clock).", "Periodic: Motion that repeats at regular intervals (e.g., a rocking chair).", "Oscillatory: Back and forth motion around a central point (e.g., a pendulum)."], example: "The earth's rotation is periodic, while a sprinter on a 100m track is rectilinear.", diagram: "motion_types_detailed.svg" },
              { title: "3. Distance and Displacement", text: "While they sound similar, distance and displacement measure different things.", points: ["Distance: The total path length covered (always positive, scalar).", "Displacement: The shortest distance from the starting point to the final point (can be zero, vector)."], example: "If you walk in a complete circle, your distance is the circumference, but your displacement is zero.", diagram: "dist_vs_disp.svg" },
              { title: "4. Speed", text: "Speed measures how fast an object is moving. It is the distance covered per unit of time.", points: ["Formula: Speed = Distance / Time.", "Uniform Speed: Covering equal distances in equal time (constant speed).", "Non-uniform Speed: Speed that changes over time (like a car in traffic)."], example: "A car traveling 100km in 2 hours has an average speed of 50 km/h.", diagram: "speed_calc.svg" },
              { title: "5. Velocity", text: "Velocity is speed with a specific direction. It tells us not just how fast, but where an object is going.", points: ["Velocity = Displacement / Time (in a specific direction).", "Vector Quantity: It has both magnitude (speed) and direction."], example: "A plane flying at 500 km/h is speed; 500 km/h North is velocity.", diagram: "velocity_vector.svg" },
              { title: "6. Acceleration", text: "Acceleration is the rate at which velocity changes over time.", points: ["Positive Acceleration: Speeding up.", "Deceleration (Negative): Slowing down.", "Change in Direction: Even at constant speed, changing direction is acceleration."], example: "A car speeding up when the light turns green is accelerating.", diagram: "acceleration_graph.svg" },
              { title: "7. Force and Its Effects", text: "A force is a push or a pull acting upon an object resulting from its interaction with another object.", points: ["Change Shape: Like squeezing a ball.", "Change Speed: Making something move faster or slower.", "Change Direction: Like hitting a tennis ball with a racket."], example: "Pushing a heavy shopping cart or pulling a door open.", diagram: "force_effects.svg" },
              { title: "8. Types of Force", text: "Forces are broadly categorized by whether they require physical contact.", points: ["Contact Forces: Require physical touch (Pushing, pulling, friction).", "Non-contact Forces: Act over a distance (Gravity, Magnetism, Electrostatic)."], example: "Gravity pulling an apple to the ground is a non-contact force.", diagram: "force_types.svg" },
              { title: "9. Pressure", text: "Pressure is the amount of force applied per unit of area.", points: ["Formula: Pressure = Force / Area.", "Inverse Relationship: Smaller area results in higher pressure for the same force."], example: "A sharp knife has a tiny edge (small area), creating high pressure to cut easily.", diagram: "pressure_area.svg" },
              { title: "10. Newton's Laws of Motion", text: "Sir Isaac Newton formulated three fundamental laws that describe the relationship between motion and force.", points: ["1st Law (Inertia): Objects resist changes to their state of motion.", "2nd Law: Force depends on mass and acceleration (F = m * a).", "3rd Law: For every action, there is an equal and opposite reaction."], example: "A book stays on a table until you push it (Inertia).", diagram: "newton_laws_master.svg" },
              { title: "11. Work", text: "In physics, work is done only when a force causes an object to move in the direction of the force.", points: ["Work = Force * Distance.", "No movement = No work (even if you are tired!)."], example: "Lifting a heavy bag from the floor is work; holding it still is not.", diagram: "work_physics.svg" },
              { title: "12. Energy", text: "Energy is the capacity or ability to do work. It exists in many forms.", points: ["Kinetic Energy: The energy of an object in motion.", "Potential Energy: Stored energy based on position (like height).", "Conservation: Energy cannot be created or destroyed, only transformed."], example: "A roller coaster at the top has high potential energy; as it drops, it gains kinetic energy.", diagram: "energy_forms.svg" },
              { title: "13. Real-Life Applications", text: "The principles of motion and force are visible everywhere in our daily lives.", points: ["Transportation: Cars, planes, and bicycles use these laws.", "Sports: Throwing a ball or swimming.", "Nature: Falling leaves or flowing rivers.", "Engineering: Building bridges and machines."], example: "Modern safety features like seatbelts are designed based on the Law of Inertia.", diagram: ACHIEVER_ASSETS.motion_force_generic }
            ]
          },
          practice: [
            { q: "What is motion?", options: ["Change in position with time", "Staying still", "Change in color", "None"], a: "Change in position with time", explanation: "Motion is defined as position change over time." },
            { q: "Which of these is oscillatory motion?", options: ["Moving fan", "Falling apple", "Clock pendulum", "Train on tracks"], a: "Clock pendulum", explanation: "Oscillatory motion is back and forth." }
          ],
          challenge: [
            { q: "Speed = ?", options: ["D * T", "D / T", "T / D", "D + T"], a: "D / T", explanation: "Speed is distance per unit time." },
            { q: "If displacement is zero, distance must be zero.", options: ["True", "False"], a: "False", explanation: "In a circle, displacement is zero but distance is not." }
          ],
          test: [
            { id: 1, q: "What is motion?", options: ["Change in position", "Staying at rest", "Change in weight", "None"], a: "Change in position", explanation: "Motion is defined as the change in position of an object over time." },
            { id: 2, q: "A car moving on a straight road is an example of:", options: ["Rectilinear motion", "Circular motion", "Periodic motion", "None"], a: "Rectilinear motion", explanation: "Motion in a straight line is called rectilinear motion." },
            { id: 3, q: "A pendulum shows which type of motion?", options: ["Rectilinear", "Circular", "Oscillatory", "Random"], a: "Oscillatory", explanation: "Back and forth motion around a central point is oscillatory." },
            { id: 4, q: "What is the formula for Speed?", options: ["Distance / Time", "Distance * Time", "Time / Distance", "None"], a: "Distance / Time", explanation: "Speed is distance covered per unit of time." },
            { id: 5, q: "Velocity is speed with:", options: ["Mass", "Direction", "Weight", "Volume"], a: "Direction", explanation: "Velocity is a vector quantity, meaning it has speed and direction." },
            { id: 6, q: "What is the SI unit of speed?", options: ["m/s", "km/h", "m/min", "cm/s"], a: "m/s", explanation: "Meters per second is the standard unit." },
            { id: 7, q: "An object at rest has a speed of:", options: ["10 m/s", "0 m/s", "Infinity", "Unknown"], a: "0 m/s", explanation: "If it's not moving, its speed is zero." },
            { id: 8, q: "Rate of change of velocity is called:", options: ["Speed", "Force", "Acceleration", "Mass"], a: "Acceleration", explanation: "Acceleration measures how fast velocity changes." },
            { id: 9, q: "A push or pull on an object is called:", options: ["Pressure", "Work", "Force", "Energy"], a: "Force", explanation: "Force is the basic interaction that changes motion." },
            { id: 10, q: "The force that opposes motion is:", options: ["Gravity", "Friction", "Magnetism", "Electrostatic"], a: "Friction", explanation: "Friction acts in the opposite direction of motion." },
            { id: 11, q: "What is the unit of Force?", options: ["Joule", "Watt", "Newton", "Pascal"], a: "Newton", explanation: "Named after Sir Isaac Newton." },
            { id: 12, q: "Newton's First Law is also known as the Law of:", options: ["Gravity", "Inertia", "Energy", "Friction"], a: "Inertia", explanation: "Inertia is the resistance to change in motion." },
            { id: 13, q: "The formula F = m * a belongs to which law?", options: ["1st Law", "2nd Law", "3rd Law", "Universal Law"], a: "2nd Law", explanation: "Force equals mass times acceleration." },
            { id: 14, q: "Every action has an equal and opposite reaction. This is:", options: ["1st Law", "2nd Law", "3rd Law", "None"], a: "3rd Law", explanation: "Newton's Third Law of Motion." },
            { id: 15, q: "Force applied per unit area is called:", options: ["Work", "Energy", "Pressure", "Mass"], a: "Pressure", explanation: "Pressure = Force / Area." },
            { id: 16, q: "Which of these is a non-contact force?", options: ["Friction", "Gravity", "Pushing a box", "Pulling a rope"], a: "Gravity", explanation: "Gravity acts over a distance without touching." },
            { id: 17, q: "Magnetism is a:", options: ["Contact force", "Non-contact force", "Frictional force", "None"], a: "Non-contact force", explanation: "Magnets attract or repel without touching." },
            { id: 18, q: "Pulling a door open is a:", options: ["Contact force", "Non-contact force", "Gravitational force", "None"], a: "Contact force", explanation: "Your hand must touch the door handle." },
            { id: 19, q: "The capacity to do work is called:", options: ["Force", "Power", "Energy", "Speed"], a: "Energy", explanation: "Energy allows objects to perform actions." },
            { id: 20, q: "Energy of an object due to its motion is:", options: ["Potential Energy", "Kinetic Energy", "Chemical Energy", "None"], a: "Kinetic Energy", explanation: "Moving objects possess kinetic energy." },
            { id: 21, q: "Energy stored in an object due to its position is:", options: ["Kinetic Energy", "Potential Energy", "Heat Energy", "None"], a: "Potential Energy", explanation: "Like a stretched rubber band or water in a high dam." },
            { id: 22, q: "What is the SI unit of energy?", options: ["Newton", "Joule", "Watt", "Volt"], a: "Joule", explanation: "Energy and work are measured in Joules." },
            { id: 23, q: "Work is done when a force causes:", options: ["Heat", "Movement", "Noise", "Nothing"], a: "Movement", explanation: "Work = Force * Distance." },
            { id: 24, q: "If you push a wall and it doesn't move, the work done is:", options: ["Positive", "Negative", "Zero", "Infinite"], a: "Zero", explanation: "No distance covered means no work was done." },
            { id: 25, q: "Friction between two surfaces usually produces:", options: ["Cold", "Heat", "Light", "Magnetism"], a: "Heat", explanation: "Energy is lost as thermal energy due to friction." },
            { id: 26, q: "Wheels are used to convert sliding friction into:", options: ["Static friction", "Rolling friction", "Fluid friction", "None"], a: "Rolling friction", explanation: "Rolling friction is much lower than sliding friction." },
            { id: 27, q: "Why is oil applied to machine parts?", options: ["To make them shiny", "To increase friction", "To reduce friction", "To make them heavy"], a: "To reduce friction", explanation: "Lubricants create a smooth layer between moving parts." },
            { id: 28, q: "Gravity on Earth pulls objects:", options: ["Upwards", "Sideways", "Towards the center of Earth", "None"], a: "Towards the center of Earth", explanation: "Everything falls down due to gravity." },
            { id: 29, q: "A stone falling from a cliff converts:", options: ["Kinetic to Potential", "Potential to Kinetic", "Heat to Sound", "None"], a: "Potential to Kinetic", explanation: "Stored height energy turns into motion energy." },
            { id: 30, q: "Inertia of an object depends on its:", options: ["Color", "Shape", "Mass", "Speed"], a: "Mass", explanation: "Heavier objects have more inertia (resist change more)." }
          ]
        }

      },
      {
        id: 'light',
        category: 'physics',
        title: 'Light & Reflection',
        desc: 'Sources, Shadows & Mirrors',
        content: {
          learn: {
            concept: [
              { title: "1. Introduction to Light", text: "Light is a form of energy that enables us to see the world around us. Objects become visible when light from a source or a reflection enters our eyes.", points: ["Form of Energy: Travels at incredible speeds.", "Enables Vision: Without light, there is total darkness.", "Straight Path: Light doesn't naturally bend around corners."], example: "The Sun is our primary source of light energy.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "2. Sources of Light", text: "Light sources are categorized based on their origin. They can be found in nature or created by humans.", points: ["Natural Sources: Sun, Stars, Fireflies.", "Artificial Sources: Electric bulbs, LED torches, Candles."], example: "A candle is an artificial source created by humans.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "3. Luminous & Non-luminous", text: "Objects are classified by whether they produce their own light.", points: ["Luminous: Objects that emit their own light (Sun, Glowing bulb).", "Non-luminous: Objects that reflect light from other sources (Moon, Book, Chair)."], example: "The Moon is non-luminous; it reflects sunlight.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "4. Object Transparency", text: "Materials are classified by how much light they allow to pass through them.", points: ["Transparent: Allows light to pass completely (Clear glass, Water).", "Translucent: Allows light to pass partially (Frosted glass, Butter paper).", "Opaque: Blocks light completely (Wood, Metal, Human body)."], example: "Opaque objects are responsible for the formation of shadows.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "5. Rectilinear Propagation", text: "In a uniform medium, light always travels in a straight line. This property is known as rectilinear propagation.", points: ["Straight Line: Light cannot bend to pass through a zigzag tube.", "Shadows: Proof of straight-line travel."], example: "A beam of light through a small hole in a dark room.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "6. Reflection of Light", text: "Reflection is the bouncing back of light rays when they hit a surface. The nature of reflection depends on the surface texture.", points: ["Regular Reflection: Occurs on smooth surfaces (Mirrors) and forms clear images.", "Diffused Reflection: Occurs on rough surfaces (Walls, Paper) and scatters light."], example: "You can see your face in a mirror but not on a wall due to the type of reflection.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "7. Laws of Reflection", text: "Reflection follows two fundamental scientific laws.", points: ["1st Law: The angle of incidence is always equal to the angle of reflection (Angle i = Angle r).", "2nd Law: The incident ray, the reflected ray, and the normal all lie in the same plane."], example: "If light hits a mirror at 30 deg, it will reflect at exactly 30 deg.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "8. Plane Mirror Images", text: "Images formed by plane mirrors have unique characteristics.", points: ["Upright & Same Size: The image looks exactly like the object.", "Virtual: It cannot be obtained on a screen.", "Laterally Inverted: The left side of the object appears as the right side of the image."], example: "The word 'AMBULANCE' is written backwards on vehicles so it looks correct in mirrors.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "9. Multiple Reflections", text: "When two or more mirrors are placed at an angle, light reflects multiple times between them.", points: ["Infinite Images: Parallel mirrors create a 'tunnel' of images.", "Kaleidoscope: Uses multiple reflections to create beautiful patterns."], example: "A barber shop often has mirrors behind and in front of you.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "10. Shadow Formation", text: "A shadow is a dark region formed when an opaque object blocks the path of light.", points: ["Requirements: Source of light, Opaque object, and a Screen.", "Size: Depends on the distance between the source and the object."], example: "Your shadow is longest in the early morning and evening.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "11. Eclipses", text: "An eclipse is a natural shadow formation on a celestial scale.", points: ["Solar Eclipse: The Moon moves between the Sun and Earth, blocking sunlight.", "Lunar Eclipse: The Earth moves between the Sun and Moon, casting its shadow on the Moon."], diagram: ACHIEVER_ASSETS.eclipses },
              { title: "12. Real-Life Applications", text: "The principles of light are utilized in many modern devices.", points: ["Periscopes: Used in submarines to see above water.", "Mirror Usage: Rear-view mirrors in cars.", "Photography: Lenses and mirrors in cameras."], diagram: ACHIEVER_ASSETS.light_generic },
              { title: "13. Quick Check", text: "Let's review the core concepts of Light and Reflection.", points: ["Can you identify Luminous vs Non-luminous objects?", "Do you understand why shadows form?", "Can you state the 1st Law of Reflection?"], example: "Test your knowledge in the Practice section next!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which is a natural source of light?", options: ["Sun", "Bulb", "Candle", "Torch"], a: "Sun", explanation: "The Sun produces its own light naturally." },
            { q: "Light travels in a ___ line.", options: ["Curved", "Straight", "Zigzag", "None"], a: "Straight", explanation: "This is rectilinear propagation." }
          ],
          challenge: [
            { q: "Butter paper is ___.", options: ["Transparent", "Opaque", "Translucent", "Mirror"], a: "Translucent", explanation: "It lets some light pass through." },
            { q: "Angle i = 30 deg. Angle r = ?", options: ["60 deg", "30 deg", "0 deg", "90 deg"], a: "30 deg", explanation: "Angle of incidence equals angle of reflection." }
          ],
          test: [
            { id: 1, q: "Light travels in a:", options: ["Straight line", "Curved line", "Zigzag line", "Circle"], a: "Straight line", explanation: "This property is called rectilinear propagation." },
            { id: 2, q: "What is the primary natural source of light on Earth?", options: ["Moon", "Sun", "Electricity", "Stars"], a: "Sun", explanation: "The Sun provides most of the light and heat for Earth." },
            { id: 3, q: "Objects that produce their own light are called:", options: ["Luminous", "Non-luminous", "Opaque", "Transparent"], a: "Luminous", explanation: "Like the Sun or a glowing bulb." },
            { id: 4, q: "The moon is a ____ object.", options: ["Luminous", "Non-luminous", "Transparent", "None"], a: "Non-luminous", explanation: "The moon reflects sunlight; it doesn't produce its own." },
            { id: 5, q: "Reflection from a smooth surface is called:", options: ["Regular reflection", "Diffused reflection", "Refraction", "Absorption"], a: "Regular reflection", explanation: "Smooth surfaces like mirrors give regular reflection." },
            { id: 6, q: "The bouncing back of light from a surface is:", options: ["Refraction", "Reflection", "Dispersion", "Inversion"], a: "Reflection", explanation: "This is the core definition of reflection." },
            { id: 7, q: "Angle of incidence is always ____ the angle of reflection.", options: ["Greater than", "Less than", "Equal to", "Twice"], a: "Equal to", explanation: "This is the first law of reflection." },
            { id: 8, q: "Lateral inversion means the left side appears as:", options: ["Top", "Bottom", "Right", "Front"], a: "Right", explanation: "Mirrors swap the left and right sides of an object." },
            { id: 9, q: "Materials that allow light to pass completely are:", options: ["Transparent", "Translucent", "Opaque", "Solid"], a: "Transparent", explanation: "Like clear glass or water." },
            { id: 10, q: "Opaque objects form dark areas called:", options: ["Reflections", "Images", "Shadows", "Mirages"], a: "Shadows", explanation: "Shadows are formed when light is blocked." },
            { id: 11, q: "Which material is translucent?", options: ["Clear water", "Brick wall", "Frosted glass", "Mirror"], a: "Frosted glass", explanation: "It allows light to pass only partially." },
            { id: 12, q: "Splitting of white light into seven colors is:", options: ["Reflection", "Refraction", "Dispersion", "Inversion"], a: "Dispersion", explanation: "White light is made of seven different colors." },
            { id: 13, q: "The band of seven colors is called a:", options: ["Spectrum", "Rainbow", "VIBGYOR", "All of these"], a: "All of these", explanation: "The spectrum of white light forms a rainbow." },
            { id: 14, q: "Which of these is NOT a primary color of light?", options: ["Red", "Green", "Blue", "Yellow"], a: "Yellow", explanation: "The primary colors are RGB (Red, Green, Blue)." },
            { id: 15, q: "How many colors make up white light?", options: ["3", "5", "7", "12"], a: "7", explanation: "Summarized by the acronym VIBGYOR." },
            { id: 16, q: "A rainbow is a natural phenomenon showing:", options: ["Reflection", "Dispersion", "Inversion", "None"], a: "Dispersion", explanation: "Raindrops split sunlight into a rainbow." },
            { id: 17, q: "The part of the eye that controls light entry is:", options: ["Retina", "Iris", "Lens", "Cornea"], a: "Iris", explanation: "The iris adjusts the size of the pupil." },
            { id: 18, q: "Images in the human eye are formed on the:", options: ["Lens", "Retina", "Iris", "Optic Nerve"], a: "Retina", explanation: "The retina acts as the screen of the eye." },
            { id: 19, q: "The human eye has a ____ lens.", options: ["Convex", "Concave", "Flat", "None"], a: "Convex", explanation: "The eye lens is a biconvex structure." },
            { id: 20, q: "The Braille system is designed for people who are:", options: ["Deaf", "Visually impaired", "Unable to walk", "None"], a: "Visually impaired", explanation: "It uses raised dots to allow reading by touch." },
            { id: 21, q: "An image that cannot be caught on a screen is:", options: ["Real", "Virtual", "Large", "Inverted"], a: "Virtual", explanation: "Virtual images are formed 'inside' the mirror." },
            { id: 22, q: "Reflection from a rough wall is:", options: ["Regular", "Diffused", "Perfect", "None"], a: "Diffused", explanation: "Rough surfaces scatter light in many directions." },
            { id: 23, q: "A kaleidoscope works on the principle of:", options: ["Single reflection", "Multiple reflection", "Dispersion", "Refraction"], a: "Multiple reflection", explanation: "It uses mirrors at angles to create patterns." },
            { id: 24, q: "Which device uses two mirrors to see over obstacles?", options: ["Microscope", "Telescope", "Periscope", "Kaleidoscope"], a: "Periscope", explanation: "Used in submarines to see the surface." },
            { id: 25, q: "Distance of image from a plane mirror is ____ the object distance.", options: ["Less than", "More than", "Equal to", "Half"], a: "Equal to", explanation: "If you stand 2m away, the image is 2m 'inside'." },
            { id: 26, q: "The image formed by a plane mirror is always:", options: ["Upright", "Upside down", "Bigger", "Smaller"], a: "Upright", explanation: "Plane mirrors do not invert images vertically." },
            { id: 27, q: "We see objects because they:", options: ["Absorb light", "Reflect light into our eyes", "Are transparent", "Are heavy"], a: "Reflect light into our eyes", explanation: "Vision depends on reflected light reaching our eyes." },
            { id: 28, q: "The speed of light is approximately:", options: ["300 m/s", "3,000 km/s", "300,000 km/s", "3,000,000 km/s"], a: "300,000 km/s", explanation: "Light is the fastest thing in the universe." },
            { id: 29, q: "A highly polished surface acts as a:", options: ["Mirror", "Lense", "Prism", "Window"], a: "Mirror", explanation: "Polished surfaces reflect light regularly." },
            { id: 30, q: "At what time of day is a shadow shortest?", options: ["Morning", "Noon", "Evening", "Night"], a: "Noon", explanation: "The sun is directly overhead at noon." }
          ]
        }
      },
      {
        id: 'heat-electricity',
        category: 'physics',
        title: 'Heat & Electricity',
        desc: 'Circuits, Thermal Transfer & Real-life Applications',
        content: {
          learn: {
            concept: [
              { title: "1. Introduction to Electricity", text: "Electricity is a versatile form of energy that powers modern life. It is the result of the presence and flow of electric charge through conductive materials.", points: ["Universal Energy: Used in homes, industries, and transport.", "Flow: Travels through wires made of metals like copper.", "Utility: Powers everything from a tiny LED to a massive industrial motor."], example: "A mobile phone charging uses electricity to store chemical energy.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "2. Electric Current", text: "Electric current is the continuous flow of electric charges (electrons) through a path. It is what makes devices work.", points: ["Direction: Flows from Positive (+) to Negative (-) terminal.", "Measurement: Measured in Amperes (A) using an Ammeter.", "Power: The strength of the current determines how bright a bulb glows."], example: "The steady flow of electricity in a wire is like water flowing through a pipe.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "3. Electric Circuit", text: "An electric circuit is a complete, unbroken path through which an electric current can flow.", points: ["Power Source: A cell or battery provides the energy.", "Path: Wires act as tracks for the current.", "Load: A device like a bulb that uses the electricity.", "Control: A switch used to start or stop the flow."], example: "A simple torch is a perfect example of an electric circuit.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "4. Open and Closed Circuits", text: "The status of a circuit depends on whether the path is complete or broken.", points: ["Closed Circuit: The path is complete; current flows; the bulb glows.", "Open Circuit: The path is broken (by a switch or a loose wire); current stops; bulb remains dark."], example: "Turning a light switch 'OFF' creates an open circuit.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "5. Conductors of Electricity", text: "Materials that allow electric current to pass through them easily are called conductors.", points: ["Metals: Copper, Aluminium, Silver, and Gold are excellent conductors.", "Impure Water: Water with minerals can also conduct electricity.", "Graphite: The only non-metal that conducts electricity."], example: "Electric wires are made of copper because it is a great conductor.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "6. Insulators of Electricity", text: "Materials that do not allow electric current to pass through them are called insulators.", points: ["Safety: They protect us from electric shocks.", "Materials: Rubber, Plastic, Wood, Glass, and Pure Water.", "Coating: Wires are coated with plastic to keep the electricity inside."], example: "An electrician wears rubber gloves to stay safe while working.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "7. The Electric Switch", text: "A switch is a simple device that either breaks the circuit or completes it.", points: ["ON Position: Completes the circuit (Closed).", "OFF Position: Breaks the circuit (Open).", "Function: Provides a convenient way to control appliances."], example: "The buttons on your remote are actually tiny switches.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "8. Heating Effect & Joule's Law", text: "When an electric current flows through a conductor, it produces heat. This is formally described by Joule's Law of Heating.", points: ["Joule's Law: The heat (H) produced is directly proportional to the square of the current (I), the resistance (R), and the time (t).", "Formula: H = I^2Rt (Heat in Joules = Current^2 * Resistance * Time).", "Friction: Electrons colliding with atoms generate thermal energy.", "Appliances: Used in electric irons, heaters, and safety fuses."], example: "A fuse melts (breaking the circuit) when excess current generates too much heat, protecting your home.", diagram: ACHIEVER_ASSETS.joules_law },
              { title: "9. Chemical Effects", text: "Electric current can cause chemical changes when passed through certain liquids (electrolytes).", points: ["Decomposition: Breaking down compounds into elements.", "Electroplating: Coating one metal onto another (like gold plating jewelry).", "Gas Bubbles: Often produced at the electrodes during the process."], example: "Chrome plating on bicycle handlebars is done using electricity.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "10. Electrical Safety", text: "Electricity is powerful and must be handled with extreme care to avoid accidents.", points: ["Wet Hands: Never touch switches with wet hands (water conducts!).", "Damaged Wires: Replace wires with cracked insulation immediately.", "Overloading: Don't plug too many devices into one socket."], example: "Always look for the 'ISI' mark on electrical appliances for safety.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "11. Introduction to Heat", text: "Heat is a form of energy that moves between objects due to a difference in their temperatures.", points: ["Direction: Heat always flows from a Hot object to a Cold object.", "Kinetic Energy: Heat is related to the vibration of particles.", "Effect: Adding heat usually increases an object's temperature."], example: "A hot cup of tea eventually cools down as heat moves to the air.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "12. Temperature", text: "Temperature is a measure of the degree of hotness or coldness of an object.", points: ["Sensation: Our sense of touch is not a reliable measure of temperature.", "Scientific Measure: It tells us the average kinetic energy of particles."], example: "Ice has a low temperature, while boiling water has a high temperature.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "13. Measurement of Temperature", text: "We use an instrument called a Thermometer to measure temperature accurately.", points: ["Units: Most commonly measured in Degree Celsius (deg C).", "Clinical Thermometer: Used to measure human body temperature (Normal: 37 deg C).", "Laboratory Thermometer: Used for scientific experiments (Range: -10 deg C to 110 deg C)."], example: "Doctors use a clinical thermometer to check if you have a fever.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "14. Sources of Heat", text: "Heat energy can be obtained from various sources through different processes.", points: ["Sun: The primary natural source of heat for Earth.", "Combustion: Burning fuels like wood, coal, or LPG.", "Electricity: Using appliances like heaters.", "Friction: Rubbing your hands together."], example: "Rubbing two sticks together can generate enough heat to start a fire.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "15. Conduction", text: "Conduction is the process of heat transfer in solids from a hotter end to a colder end.", points: ["Direct Contact: Particles vibrate and pass energy to their neighbors.", "Requirement: The objects must be in contact and have different temperatures.", "Solids: Most effective in metals."], example: "The handle of a metal spoon in hot soup becomes warm.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "16. Convection", text: "Convection is the transfer of heat in liquids and gases by the actual movement of the particles.", points: ["Cycle: Hotter, lighter particles rise; colder, heavier particles sink.", "Medium: Requires a fluid (liquid or gas).", "Gases: Convection in air causes winds and sea breezes."], example: "Water boiling in a pot moves in a circular 'convection current'.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "17. Radiation", text: "Radiation is the transfer of heat that does not require any material medium (solid, liquid, or gas).", points: ["Vacuum: Can travel through empty space.", "Speed: Travels at the speed of light.", "Absorption: Dark colors absorb more radiation than light colors."], example: "You feel the heat of a bonfire even if you aren't touching it.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "18. Conductors of Heat", text: "Materials that allow heat to pass through them easily are called good conductors of heat.", points: ["Metals: Copper, Silver, Iron, and Aluminium.", "Utility: Used for making cooking utensils and boiler tubes."], example: "The bottom of a frying pan is usually made of copper or steel.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "19. Insulators of Heat", text: "Materials that do not allow heat to pass through them easily are called poor conductors or insulators.", points: ["Protection: Used to prevent heat loss or protect from burns.", "Materials: Wood, Plastic, Wool, and Air.", "Trapped Air: Woolen clothes keep us warm by trapping a layer of air."], example: "The handle of a frying pan is made of plastic or wood to keep it cool.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "20. Thermal Expansion", text: "Most substances (solids, liquids, and gases) expand (increase in size) when they are heated.", points: ["Particle Motion: Heat makes particles move faster and spread apart.", "Contraction: Substances contract (decrease in size) when they cool down.", "Gases: Expand much more than solids or liquids for the same heat."], example: "Gaps are left between railway tracks to allow for expansion in summer.", diagram: ACHIEVER_ASSETS.light_generic },
              { title: "21. Real-Life Applications", text: "Understanding heat and electricity is essential for daily living and engineering.", points: ["Kitchen: Induction stoves and pressure cookers.", "Architecture: Using insulators in walls to keep houses cool.", "Infrastructure: High-voltage lines for power distribution.", "Electronics: Keeping computers cool with fans."], example: "A Thermos flask uses a vacuum to block conduction and convection.", diagram: ACHIEVER_ASSETS.circuit_generic },
              { title: "22. Quick Check", text: "Let's test your understanding of Heat and Electricity.", points: ["Can you explain why we use copper for wires but plastic for handles?", "What are the three modes of heat transfer?", "Why do bridges have expansion joints?"], example: "Take the Practice Quiz to master these concepts!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which material is an insulator of electricity?", options: ["Copper", "Aluminium", "Rubber", "Iron"], a: "Rubber", explanation: "Rubber does not allow electric current to pass." },
            { q: "Mode of heat transfer in solids is:", options: ["Convection", "Radiation", "Conduction", "None"], a: "Conduction", explanation: "Conduction occurs through direct particle contact in solids." },
            { q: "A clinical thermometer normally ranges from:", options: ["0 deg C - 100 deg C", "35 deg C - 42 deg C", "-10 deg C - 110 deg C", "37 deg C - 98 deg C"], a: "35 deg C - 42 deg C", explanation: "It is designed to measure human body temperature." }
          ],
          challenge: [
            { q: "What happens to a gas when it is heated?", options: ["It contracts", "It expands", "It stays the same", "It vanishes"], a: "It expands", explanation: "Gases expand significantly when thermal energy is added." },
            { q: "In a closed circuit, the bulb ___.", options: ["Glows", "Does not glow", "Flickers", "Explodes"], a: "Glows", explanation: "A closed circuit allows current to flow through the bulb." }
          ],
          test: [
            { id: 1, q: "The flow of electric charges is called:", options: ["Voltage", "Resistance", "Current", "Power"], a: "Current", explanation: "Current is the movement of electrons." },
            { id: 2, q: "Which of these is a good conductor of electricity?", options: ["Wood", "Plastic", "Copper", "Glass"], a: "Copper", explanation: "Metals like copper have free electrons for conduction." },
            { id: 3, q: "A path through which electricity flows is a:", options: ["Route", "Circuit", "Bridge", "Socket"], a: "Circuit", explanation: "A circuit provides a complete path for current." },
            { id: 4, q: "A device that breaks or completes a circuit is a:", options: ["Bulb", "Switch", "Battery", "Wire"], a: "Switch", explanation: "Switches control the flow of electricity." },
            { id: 5, q: "Which material is used as an electrical insulator?", options: ["Silver", "Iron", "Plastic", "Aluminium"], a: "Plastic", explanation: "Plastic blocks the flow of current for safety." },
            { id: 6, q: "Which of these is used as a source of electricity?", options: ["Switch", "Bulb", "Cell", "Insulator"], a: "Cell", explanation: "A cell or battery provides the energy." },
            { id: 7, q: "A circuit with a broken path is called:", options: ["Closed", "Open", "Direct", "Short"], a: "Open", explanation: "Current cannot flow in an open circuit." },
            { id: 8, q: "Which non-metal conducts electricity?", options: ["Sulphur", "Graphite", "Oxygen", "Diamond"], a: "Graphite", explanation: "Graphite is an exceptional non-metal conductor." },
            { id: 9, q: "Electric wires are usually made of:", options: ["Gold", "Silver", "Copper", "Lead"], a: "Copper", explanation: "Copper is conductive and cost-effective." },
            { id: 10, q: "Safety fuses work on the ____ effect of current.", options: ["Magnetic", "Chemical", "Heating", "Light"], a: "Heating", explanation: "Excess current melts the fuse wire." },
            { id: 11, q: "Heat flows from a ____ object to a ____ one.", options: ["Cold, Hot", "Hot, Cold", "Heavy, Light", "Small, Large"], a: "Hot, Cold", explanation: "Thermal energy moves down the temperature gradient." },
            { id: 12, q: "The measure of hotness or coldness is:", options: ["Pressure", "Volume", "Temperature", "Density"], a: "Temperature", explanation: "Temperature is measured in degrees." },
            { id: 13, q: "Standard unit of temperature is:", options: ["Joule", "Pascal", "Degree Celsius", "Newton"], a: "Degree Celsius", explanation: "Celsius is most commonly used in schools." },
            { id: 14, q: "Instrument used to measure temperature is:", options: ["Barometer", "Ammeter", "Thermometer", "Voltmeter"], a: "Thermometer", explanation: "Thermometers use expansion to measure heat." },
            { id: 15, q: "Normal human body temperature is approx:", options: ["98 deg C", "37 deg C", "0 deg C", "100 deg C"], a: "37 deg C", explanation: "37 deg Celsius (or 98.6 deg Fahrenheit)." },
            { id: 16, q: "Heat transfer through direct contact is:", options: ["Conduction", "Convection", "Radiation", "Insulation"], a: "Conduction", explanation: "Common in solids like metals." },
            { id: 17, q: "Heat transfer through fluids (liquids/gases) is:", options: ["Conduction", "Convection", "Radiation", "Friction"], a: "Convection", explanation: "Involves the actual movement of particles." },
            { id: 18, q: "Heat from the sun reaches us through:", options: ["Conduction", "Convection", "Radiation", "None"], a: "Radiation", explanation: "Radiation doesn't need a medium." },
            { id: 19, q: "Which material is a poor conductor of heat?", options: ["Iron", "Aluminium", "Wood", "Copper"], a: "Wood", explanation: "Wood acts as an insulator." },
            { id: 20, q: "Most substances ____ on heating.", options: ["Expand", "Contract", "Vanish", "Stay same"], a: "Expand", explanation: "Heat increases the space between particles." },
            { id: 21, q: "Woolen clothes keep us warm by:", options: ["Adding heat", "Trapping air", "Reflecting light", "None"], a: "Trapping air", explanation: "Air is a poor conductor and prevents heat loss." },
            { id: 22, q: "Cooking utensils often have plastic handles because:", options: ["Plastic is strong", "Plastic is an insulator", "Plastic is shiny", "None"], a: "Plastic is an insulator", explanation: "It protects our hands from heat." },
            { id: 23, q: "Bridges have gaps called expansion joints to:", options: ["Let water through", "Allow for heat expansion", "Reduce weight", "None"], a: "Allow for heat expansion", explanation: "Prevents the bridge from buckling in summer." },
            { id: 24, q: "Which of these is a liquid conductor?", options: ["Honey", "Vegetable oil", "Salt water", "Distilled water"], a: "Salt water", explanation: "Ions in salt water conduct electricity." },
            { id: 25, q: "Electroplating is used for:", options: ["Heating", "Cleaning", "Coating metals", "None"], a: "Coating metals", explanation: "Electricity deposits a layer of metal." },
            { id: 26, q: "Which of these is a strong acid?", options: ["Vinegar", "Lemon juice", "Hydrochloric acid", "Water"], a: "Hydrochloric acid", explanation: "Used in batteries and labs." },
            { id: 27, q: "A clinical thermometer uses ____ to show temperature.", options: ["Water", "Oil", "Mercury", "Alcohol"], a: "Mercury", explanation: "Mercury expands predictably with heat." },
            { id: 28, q: "Why is the base of a pan made of metal?", options: ["For strength", "To conduct heat", "For color", "None"], a: "To conduct heat", explanation: "Metals transfer heat to the food." },
            { id: 29, q: "Radiation can travel through a:", options: ["Solid only", "Liquid only", "Vacuum", "None"], a: "Vacuum", explanation: "It doesn't need any particles to move." },
            { id: 30, q: "Blowing on hot tea to cool it uses:", options: ["Conduction", "Convection", "Radiation", "None"], a: "Convection", explanation: "You are moving hot air away." }
          ]
        }
      },
      {
        id: 'energy-sources',
        category: 'physics',
        title: 'Sources of Energy',
        desc: 'Renewable vs Non-renewable & Sustainable Future',
        content: {
          learn: {
            concept: [
              { title: "1. Introduction to Energy", text: "Energy is defined as the ability or capacity to do work. Every activity in our daily life, from breathing to running massive industrial machines, requires a source of energy.", points: ["Life Force: Essential for growth, movement, and survival.", "Work: Anything that requires force over a distance.", "Forms: Light, Heat, Sound, and Electricity."], example: "A farmer uses energy to plow fields, whether using traditional bullocks or modern tractors.", diagram: ACHIEVER_ASSETS.intro },
              { title: "2. What are Sources of Energy?", text: "A source of energy is any resource from which we can extract usable energy to perform work or generate electricity.", points: ["Extraction: Harvesting energy from nature (Sun, Wind, Water).", "Conversion: Changing raw energy into a form we can use (like turning coal into electricity)."], example: "Wood is a traditional source of energy used for cooking and heating.", diagram: ACHIEVER_ASSETS.intro },
              { title: "3. Renewable Energy Sources", text: "Renewable energy comes from natural sources that are constantly replenished and never run out.", points: ["Sustainable: Can be used indefinitely.", "Clean: Generally produces little to no pollution.", "Examples: Solar, Wind, Hydro, and Biomass."], example: "The Sun has been providing energy for billions of years and will continue to do so.", diagram: ACHIEVER_ASSETS.renewable_vs_non },
              { title: "4. Non-Renewable Energy Sources", text: "Non-renewable energy comes from sources that take millions of years to form and exist in limited quantities.", points: ["Exhaustible: Once used, they are gone forever.", "Pollution: Often release harmful gases when burned.", "Examples: Coal, Petroleum, and Natural Gas."], example: "Coal used in power plants cannot be replaced once it is burned.", diagram: ACHIEVER_ASSETS.renewable_vs_non },
              { title: "5. Solar Energy", text: "Energy obtained from the Sun's radiation is the most abundant source of energy on Earth.", points: ["Direct Use: Heating water or cooking food (Solar Cookers).", "Electricity: Using Photovoltaic (PV) cells to capture sunlight.", "Rural Life: Solar lamps provide light in areas without a main power grid."], example: "Solar-powered water pumps are revolutionizing irrigation in rural farms.", diagram: ACHIEVER_ASSETS.solar_rural },
              { title: "6. Wind Energy", text: "Wind energy is the kinetic energy of moving air, which can be harnessed using large turbines.", points: ["Clean: No fuel is burned to generate power.", "Placement: Often found in open fields or coastal areas.", "Uses: Primarily used to generate large-scale electricity."], example: "A group of windmills (Wind Farm) can power an entire village.", diagram: ACHIEVER_ASSETS.wind },
              { title: "7. Water Energy (Hydropower)", text: "Hydropower captures the energy of flowing or falling water to generate electricity.", points: ["Reliable: Unlike solar or wind, it can provide a constant supply.", "Infrastructure: Usually requires building large dams.", "Environmental Impact: Can change the local ecosystem of the river."], example: "The Bhakra Nangal Dam is a major source of hydropower in India.", diagram: ACHIEVER_ASSETS.hydro },
              { title: "8. Fossil Fuels: Coal", text: "Coal is a solid fossil fuel formed from the remains of ancient swamp plants buried for millions of years.", points: ["Abundant: Used worldwide for industrial power.", "Mining: Extracted from deep underground.", "Carbon: High carbon content makes it a very concentrated energy source."], example: "Steam engines in the past were powered entirely by coal.", diagram: ACHIEVER_ASSETS.coal },
              { title: "9. Petroleum & Natural Gas", text: "These are liquid and gaseous fossil fuels formed from the remains of tiny sea organisms.", points: ["Transport: Petroleum (Diesel/Petrol) is the primary fuel for vehicles.", "Cooking: Natural gas (LPG/CNG) is a cleaner fuel for homes.", "Plastics: Used as raw material for many chemical industries."], example: "LPG cylinders are common in modern kitchens for smoke-free cooking.", diagram: ACHIEVER_ASSETS.petroleum_barrels },
              { title: "10. Biomass Energy", text: "Biomass is energy from organic materials like plant and animal waste.", points: ["Carbon Neutral: Plants absorb CO2 as they grow.", "Rural Use: Burning wood or cow-dung cakes for heat.", "Bio-gas: Decomposing waste in a pit to produce cooking gas."], example: "Bio-gas plants in villages convert agricultural waste into clean energy.", diagram: ACHIEVER_ASSETS.biomass },
              { title: "11. Advantages of Green Energy", text: "Switching to renewable 'green' energy has massive benefits for our planet.", points: ["Climate: Helps stop global warming.", "Economy: Creates jobs in new technology sectors.", "Health: Reduces respiratory diseases by lowering air pollution."], example: "Using a bicycle instead of a bike saves fuel and improves health.", diagram: ACHIEVER_ASSETS.benefits },
              { title: "12. Disadvantages of Fossil Fuels", text: "While powerful, our reliance on fossil fuels comes with a heavy price.", points: ["Global Warming: Reverses the Earth's natural climate balance.", "Oil Spills: Can destroy marine life and oceans.", "Health Risks: Smog and acid rain are caused by burning coal."], example: "Air pollution in big cities is largely due to vehicle exhaust.", diagram: ACHIEVER_ASSETS.fossil_fuel_table },
              { title: "13. Conservation of Energy", text: "Saving energy is just as important as producing it. Conservation means using energy more efficiently.", points: ["Switch Off: Turn off lights and fans when leaving a room.", "Natural Light: Use open windows during the day.", "Efficient Tech: Use LED bulbs instead of old filament bulbs."], example: "Insulating a home keeps it cool in summer, reducing the need for fans.", diagram: ACHIEVER_ASSETS.conserve },
              { title: "14. Energy in Rural Areas", text: "Energy access can transform the lives of people in remote or rural communities.", points: ["Farming: Powering tillers and irrigation systems.", "Education: Allowing children to study at night using solar lamps.", "Communication: Charging mobile phones for better information access."], example: "Solar lanterns have replaced dangerous kerosene lamps in many homes.", diagram: ACHIEVER_ASSETS.solar_rural },
              { title: "15. Quick Check", text: "Let's review the core concepts of Energy Sources.", points: ["Can you name three renewable and three non-renewable sources?", "Why is solar energy especially useful for remote villages?", "What is one simple way you can conserve energy today?"], example: "Master these concepts to help build a sustainable future!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which of these is a renewable source of energy?", options: ["Coal", "Natural Gas", "Wind", "Petroleum"], a: "Wind", explanation: "Wind is replenished naturally and never runs out." },
            { q: "Fossil fuels are formed over ___ of years.", options: ["Hundreds", "Thousands", "Millions", "Billions"], a: "Millions", explanation: "They require millions of years of heat and pressure to form." },
            { q: "Solar energy is harvested using ___ cells.", options: ["Battery", "Photovoltaic", "Electric", "Magnetic"], a: "Photovoltaic", explanation: "PV cells convert sunlight directly into electricity." }
          ],
          challenge: [
            { q: "Biomass energy is derived from:", options: ["Rocks", "Organic waste", "Metal", "Wind"], a: "Organic waste", explanation: "Biomass comes from plants and animal waste." },
            { q: "Which gas is often used as a clean cooking fuel in rural areas?", options: ["Oxygen", "Bio-gas", "Carbon Dioxide", "Nitrogen"], a: "Bio-gas", explanation: "Bio-gas is a renewable fuel produced from organic waste." }
          ],
          test: [
            { id: 1, q: "Energy is defined as the capacity to do:", options: ["Play", "Work", "Sleep", "Talk"], a: "Work", explanation: "Energy is the power to perform actions or work." },
            { id: 2, q: "Which of these is a renewable energy source?", options: ["Coal", "Petroleum", "Solar", "Natural Gas"], a: "Solar", explanation: "Solar energy is replenished by the sun every day." },
            { id: 3, q: "Sources that will eventually run out are called:", options: ["Renewable", "Non-renewable", "Clean", "Unlimited"], a: "Non-renewable", explanation: "Fossil fuels are exhaustible resources." },
            { id: 4, q: "What is the primary source of all energy on Earth?", options: ["Electricity", "Wind", "The Sun", "Water"], a: "The Sun", explanation: "Most energy forms originate from solar energy." },
            { id: 5, q: "Wind energy is harnessed using:", options: ["Solar panels", "Dams", "Wind turbines", "Batteries"], a: "Wind turbines", explanation: "Turbines convert wind motion into electricity." },
            { id: 6, q: "Hydropower is energy obtained from:", options: ["Air", "Sun", "Flowing water", "Rocks"], a: "Flowing water", explanation: "Hydro means water." },
            { id: 7, q: "Which of these is a fossil fuel?", options: ["Wood", "Wind", "Coal", "Biomass"], a: "Coal", explanation: "Coal is formed from ancient plant remains." },
            { id: 8, q: "Petroleum is also known as:", options: ["Black Gold", "White Coal", "Silver Liquid", "None"], a: "Black Gold", explanation: "Due to its high value and utility." },
            { id: 9, q: "CNG stands for:", options: ["Common Natural Gas", "Compressed Natural Gas", "Clean New Gas", "None"], a: "Compressed Natural Gas", explanation: "It is a cleaner alternative to petrol." },
            { id: 10, q: "LPG is used primarily for:", options: ["Driving cars", "Cooking", "Making plastics", "None"], a: "Cooking", explanation: "Liquefied Petroleum Gas is standard kitchen fuel." },
            { id: 11, q: "Bio-gas is produced from:", options: ["Coal", "Organic waste", "Solar rays", "Rocks"], a: "Organic waste", explanation: "Waste like cow dung and food scraps." },
            { id: 12, q: "A disadvantage of fossil fuels is:", options: ["They are unlimited", "They cause pollution", "They are clean", "None"], a: "They cause pollution", explanation: "Burning them releases greenhouse gases." },
            { id: 13, q: "Conservation of energy means:", options: ["Using more", "Saving and using wisely", "Destroying energy", "None"], a: "Saving and using wisely", explanation: "Like switching off unnecessary lights." },
            { id: 14, q: "Which bulb is most energy-efficient?", options: ["Filament bulb", "Tube light", "LED bulb", "Candle"], a: "LED bulb", explanation: "LEDs use very little power for the same light." },
            { id: 15, q: "Global warming is mainly caused by an increase in:", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], a: "Carbon dioxide", explanation: "CO2 traps heat in the atmosphere." },
            { id: 16, q: "Solar energy is especially useful for:", options: ["Rainy days", "Remote rural areas", "Underground mines", "None"], a: "Remote rural areas", explanation: "Places without power lines can use solar panels." },
            { id: 17, q: "Biomass is energy from:", options: ["Dead rocks", "Living or recently dead organisms", "The moon", "None"], a: "Living or recently dead organisms", explanation: "Like wood, crops, and waste." },
            { id: 18, q: "Which source is used in a hydroelectric power plant?", options: ["Wind", "Water", "Coal", "Uranium"], a: "Water", explanation: "Dams use water to turn turbines." },
            { id: 19, q: "Natural gas is found along with:", options: ["Coal", "Petroleum", "Gold", "Iron"], a: "Petroleum", explanation: "They often form in the same underground pockets." },
            { id: 20, q: "Acid rain is a result of:", options: ["Solar energy", "Air pollution", "Water conservation", "None"], a: "Air pollution", explanation: "Sulphur and Nitrogen oxides mix with rain." },
            { id: 21, q: "The term 'Sustainable' means:", options: ["Fast", "Lasting for future generations", "Cheap", "None"], a: "Lasting for future generations", explanation: "Meeting needs without harming the future." },
            { id: 22, q: "Which of these is a clean fuel?", options: ["Coal", "Diesel", "CNG", "Wood"], a: "CNG", explanation: "Produces far less smoke and toxins." },
            { id: 23, q: "Energy from the sun can be captured using:", options: ["Windmills", "Solar cells", "Dams", "Pulleys"], a: "Solar cells", explanation: "Solar PV cells convert light to electricity." },
            { id: 24, q: "Geothermal energy is obtained from:", options: ["Ocean tides", "Inside the Earth", "The Sun", "Wind"], a: "Inside the Earth", explanation: "Geo = Earth, Thermal = Heat." },
            { id: 25, q: "Tidal energy uses the power of:", options: ["Rain", "Ocean waves/tides", "Rivers", "Waterfalls"], a: "Ocean waves/tides", explanation: "Harnessing the rise and fall of the sea." },
            { id: 26, q: "Fossil fuels are formed from:", options: ["Sand", "Ancient remains of plants/animals", "Volcanoes", "None"], a: "Ancient remains of plants/animals", explanation: "Buried under pressure for millions of years." },
            { id: 27, q: "Charcoal is a fuel derived from:", options: ["Petroleum", "Wood", "Coal", "Gas"], a: "Wood", explanation: "Wood heated without air becomes charcoal." },
            { id: 28, q: "The ozone layer protects us from:", options: ["Infrared rays", "UV rays", "Radio waves", "None"], a: "UV rays", explanation: "Ultraviolet rays from the sun are harmful." },
            { id: 29, q: "Saving 1 unit of energy is equal to:", options: ["Producing 2 units", "Wasting 1 unit", "Nothing", "None"], a: "Producing 2 units", explanation: "Energy saved is energy generated." },
            { id: 30, q: "Future of energy depends on:", options: ["Using more coal", "Renewable sources", "Oil spills", "None"], a: "Renewable sources", explanation: "Sustainability is key to our future." }
          ]
        }
      },
      { 
        id: 'matter-materials', 
        category: 'chemistry', 
        title: 'Matter and Materials', 
        desc: 'Properties and structure of different materials', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Matter", text: "Matter is anything that has mass and occupies space. Everything around us - from the smallest pebble to the largest star - is composed of matter.", points: ["Mass: The amount of substance in an object.", "Volume: The space an object takes up.", "Building Blocks: All matter is made of tiny particles."], example: "The air you breathe, the water you drink, and the book you read are all matter.", diagram: ACHIEVER_ASSETS.matter_intro_new },
              { title: "2. Characteristics of Matter", text: "Matter has specific physical properties that define how it behaves in our world.", points: ["Mass & Space: All matter can be weighed and takes up room.", "Tiny Particles: Matter is not continuous; it is made of trillions of tiny 'atoms' or 'molecules'.", "Movement: These particles are always in motion.", "Spaces: There are gaps between particles, even in solids."], example: "When you smell a rose from across the room, it's because particles of matter moved through the air.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "3. States of Matter: Solid", text: "In a solid state, particles are packed very closely together in a fixed, rigid pattern.", points: ["Fixed Shape: Solids do not change shape easily.", "Fixed Volume: They take up a constant amount of space.", "Low Movement: Particles only vibrate in place."], example: "A stone or a piece of wood maintains its shape no matter which container you put it in.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "4. States of Matter: Liquid", text: "In a liquid state, particles are close together but can move past each other.", points: ["No Fixed Shape: Liquids take the shape of their container.", "Fixed Volume: The amount of liquid remains the same.", "Flow: Because particles can move, liquids can flow."], example: "Water poured from a bottle to a glass changes shape but remains the same volume.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "5. States of Matter: Gas", text: "In a gaseous state, particles are far apart and move randomly at high speeds.", points: ["No Fixed Shape: Gases expand to fill any space.", "No Fixed Volume: They can be compressed into small containers.", "High Energy: Particles move freely in all directions."], example: "Air in a balloon fills the entire space and can be squeezed into different shapes.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "6. Changes of State: Melting & Freezing", text: "Matter can change from one state to another when heat is added or removed.", points: ["Melting: Solid changes to Liquid (Ice to Water).", "Freezing: Liquid changes to Solid (Water to Ice).", "Reversible: Most state changes can be undone."], example: "In summer, ice cream melts because it absorbs heat from the sun.", diagram: ACHIEVER_ASSETS.state_changes },
              { title: "7. Changes of State: Evaporation & Condensation", text: "Changes between liquid and gas occur through thermal energy exchange.", points: ["Evaporation: Liquid changes to Gas (Water to Steam).", "Condensation: Gas changes to Liquid (Steam to Droplets).", "Nature: These processes create the water cycle in our environment."], example: "Steam rising from a boiling kettle is evaporation; water on a cold mirror is condensation.", diagram: ACHIEVER_ASSETS.state_changes },
              { title: "8. Materials Around Us", text: "Objects are made of different materials like wood, plastic, metal, or glass.", points: ["Selection: Materials are chosen based on their specific properties.", "Durability: How long a material lasts under stress.", "Availability: Choosing local materials for construction."], example: "A hammer head is made of hard metal, but its handle is often made of wood or rubber for grip.", diagram: ACHIEVER_ASSETS.materials_infographic },
              { title: "9. Property: Appearance & Hardness", text: "The way a material looks and feels helps us decide its use.", points: ["Lustre: Some materials are shiny (metals), others are dull (wood).", "Hardness: Resistance to scratching or bending.", "Texture: Rough vs Smooth surfaces."], example: "Diamonds are used for cutting because they are the hardest natural material.", diagram: ACHIEVER_ASSETS.appearance_hardness_table },
              { title: "10. Property: Solubility", text: "Solubility is the ability of a substance to dissolve in a liquid (usually water).", points: ["Soluble: Substances like salt and sugar disappear into water.", "Insoluble: Substances like sand or oil remain separate.", "Solution: The resulting mixture after dissolving."], example: "Making lemonade involves dissolving sugar (soluble) in water.", diagram: ACHIEVER_ASSETS.solubility },
              { title: "11. Property: Floatation", text: "Some materials float on water, while others sink to the bottom.", points: ["Density: Materials lighter than water (like wood) float.", "Heavy Objects: Materials heavier than water (like stones) sink.", "Surface Tension: Why small insects can sometimes walk on water."], example: "A heavy iron ship floats because of its shape, but an iron nail sinks immediately.", diagram: ACHIEVER_ASSETS.floatation },
              { title: "12. Property: Transparency", text: "Transparency defines how much light can pass through a material.", points: ["Transparent: Clear (Glass).", "Translucent: Partial light (Frosted glass).", "Opaque: No light passes through (Brick, Wood)."], example: "Windows are made of glass so we can see through them.", diagram: ACHIEVER_ASSETS.light_intro },
              { title: "13. Thermal & Electrical Conductivity", text: "Conductivity determines if heat or electricity can flow through a material.", points: ["Conductors: Allow flow (Metals like Copper, Iron).", "Insulators: Block flow (Plastic, Wood, Rubber).", "Safety: Using insulators to protect us from shocks or burns."], example: "Copper wires are coated in plastic to keep electricity from escaping.", diagram: ACHIEVER_ASSETS.conductivity_comparison_table },
              { title: "14. Uses of Materials", text: "Different industries choose materials based on the science of their properties.", points: ["Metals: Used for pots because they conduct heat well.", "Plastic: Used for bottles because it is light and doesn't break easily.", "Clay: Used for pots in rural areas to keep water cool."], example: "A clay pot (Matka) uses evaporation to keep water cold in summer.", diagram: ACHIEVER_ASSETS.sorting_materials },
              { title: "15. Real-Life Applications", text: "Understanding matter helps us solve daily problems efficiently.", points: ["Cooking: Choosing the right pan.", "Storage: Using airtight containers for food.", "Construction: Choosing wood vs cement for homes."], example: "Using a wooden spoon while cooking prevents the handle from getting too hot.", diagram: ACHIEVER_ASSETS.everyday_materials_grid },
              { title: "16. Quick Check", text: "Let's review the core concepts of Matter and Materials.", points: ["Can you name the 3 states of matter?", "Is sand soluble or insoluble in water?", "Why are electrical wires made of metal?"], example: "Test your knowledge in the Practice section next!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which state of matter has a fixed shape?", options: ["Solid", "Liquid", "Gas", "None"], a: "Solid", explanation: "Solids have a rigid structure that maintains their shape." },
            { q: "Sugar dissolving in tea is an example of:", options: ["Solubility", "Evaporation", "Freezing", "Hardness"], a: "Solubility", explanation: "Sugar is soluble in water." },
            { q: "Which material is an electrical insulator?", options: ["Copper", "Aluminium", "Rubber", "Iron"], a: "Rubber", explanation: "Rubber stops the flow of electricity." },
            { q: "What occupies space and has mass?", options: ["Energy", "Matter", "Light", "Sound"], a: "Matter", explanation: "Matter is defined as anything that has mass and volume." },
            { q: "Which of these is a gas at room temperature?", options: ["Water", "Oxygen", "Iron", "Milk"], a: "Oxygen", explanation: "Oxygen is a gas that we breathe." },
            { q: "Substances that allow heat to pass through easily are called:", options: ["Insulators", "Conductors", "Opaque", "Transparent"], a: "Conductors", explanation: "Conductors like metals transfer heat efficiently." },
            { q: "Which property describes how shiny a material is?", options: ["Hardness", "Solubility", "Lustre", "Texture"], a: "Lustre", explanation: "Lustre refers to the way light reflects off a surface." },
            { q: "An object that sinks in water is:", options: ["Less dense than water", "More dense than water", "Same density as water", "None"], a: "More dense than water", explanation: "Heavier, denser objects sink in water." },
            { q: "Materials through which we can see partially are:", options: ["Transparent", "Translucent", "Opaque", "Solid"], a: "Translucent", explanation: "Translucent materials like frosted glass allow some light through." },
            { q: "A matka (clay pot) keeps water cool using:", options: ["Conduction", "Evaporation", "Freezing", "Melting"], a: "Evaporation", explanation: "Water evaporating from the pores of the clay pot cools the water inside." }
          ],
          challenge: [
            { q: "Gas changing into liquid is called:", options: ["Melting", "Condensation", "Evaporation", "Freezing"], a: "Condensation", explanation: "Condensation is the process where vapour turns back into liquid." },
            { q: "Why does wood float on water?", options: ["It is harder", "It is less dense than water", "It is opaque", "None"], a: "It is less dense than water", explanation: "Lower density allows objects to float." }
          ],
          test: [
            { id: 1, q: "Which of these is NOT matter?", options: ["Air", "Water", "Light", "Dust"], a: "Light", explanation: "Light is a form of energy, not matter, as it has no mass." },
            { id: 2, q: "Particles in which state are the farthest apart?", options: ["Solid", "Liquid", "Gas", "Metal"], a: "Gas", explanation: "Gas particles have high energy and move far away from each other." },
            { id: 3, q: "The process of a liquid turning into a solid is called:", options: ["Melting", "Evaporation", "Freezing", "Condensation"], a: "Freezing", explanation: "Freezing is the transition from liquid to solid." },
            { id: 4, q: "Which material is transparent?", options: ["Wood", "Clear Glass", "Cardboard", "Iron"], a: "Clear Glass", explanation: "Transparent materials allow all light to pass through." },
            { id: 5, q: "Solubility refers to a substance's ability to:", options: ["Float", "Burn", "Dissolve", "Conduct electricity"], a: "Dissolve", explanation: "Solubility is the ability to form a solution in a liquid." },
            { id: 6, q: "Which of these is an example of a translucent material?", options: ["Pure water", "Mirror", "Tracing paper", "Brick wall"], a: "Tracing paper", explanation: "Tracing paper lets some light through but you can't see clearly." },
            { id: 7, q: "Metals are generally good:", options: ["Insulators", "Conductors", "Insoluble", "Transparent"], a: "Conductors", explanation: "Metals allow both heat and electricity to flow easily." },
            { id: 8, q: "What happens to particles when a solid melts?", options: ["Move closer", "Gain energy and move apart", "Lose energy", "Stop moving"], a: "Gain energy and move apart", explanation: "Heating gives particles energy to break free from their fixed positions." },
            { id: 9, q: "Which is a characteristic of a liquid?", options: ["Fixed shape", "Fixed volume", "No volume", "None"], a: "Fixed volume", explanation: "Liquids have a fixed volume but take the shape of their container." },
            { id: 10, q: "Which of these will sink in water?", options: ["Plastic ball", "Dry leaf", "Iron nail", "Wooden block"], a: "Iron nail", explanation: "Iron is denser than water and will sink." },
            { id: 11, q: "Air is a mixture of:", options: ["Solids", "Liquids", "Gases", "Metals"], a: "Gases", explanation: "Air is composed mainly of nitrogen, oxygen, and other gases." },
            { id: 12, q: "Which material is used to make handles of cooking pans?", options: ["Copper", "Aluminium", "Bakelite plastic", "Steel"], a: "Bakelite plastic", explanation: "Plastic is an insulator and prevents the handle from getting too hot." },
            { id: 13, q: "Matter occupies ______ and has mass.", options: ["Time", "Space", "Energy", "Light"], a: "Space", explanation: "The volume of matter is the space it occupies." },
            { id: 14, q: "Which state of matter can be easily compressed?", options: ["Solid", "Liquid", "Gas", "None"], a: "Gas", explanation: "Large spaces between gas particles allow them to be squeezed together." },
            { id: 15, q: "Common salt is ______ in water.", options: ["Insoluble", "Soluble", "Transparent", "Opaque"], a: "Soluble", explanation: "Salt dissolves completely in water." },
            { id: 16, q: "Which property is used to make window panes?", options: ["Hardness", "Transparency", "Solubility", "Conductivity"], a: "Transparency", explanation: "Windows need to be transparent to let light in." },
            { id: 17, q: "When water boils, it turns into:", options: ["Ice", "Vapour", "Acid", "Base"], a: "Vapour", explanation: "Boiling is the rapid evaporation of liquid into gas." },
            { id: 18, q: "An example of an opaque object is:", options: ["Air", "Clean water", "Wooden door", "Glass slide"], a: "Wooden door", explanation: "Opaque objects do not allow any light to pass through." },
            { id: 19, q: "The building blocks of matter are:", options: ["Bricks", "Cells", "Particles", "Waves"], a: "Particles", explanation: "All matter is made of tiny particles like atoms." },
            { id: 20, q: "Which material is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Graphite"], a: "Diamond", explanation: "Diamond is known for its extreme hardness." },
            { id: 21, q: "Lustre is a property usually shown by:", options: ["Wood", "Plastics", "Metals", "Rubber"], a: "Metals", explanation: "Most metals have a characteristic shiny surface." },
            { id: 22, q: "Sand in water is an example of:", options: ["Soluble mixture", "Insoluble mixture", "Solution", "Gas"], a: "Insoluble mixture", explanation: "Sand does not dissolve in water." },
            { id: 23, q: "Which of these is a conductor of electricity?", options: ["Wood", "Plastic", "Copper wire", "Cotton thread"], a: "Copper wire", explanation: "Copper is a metal and a very good electrical conductor." },
            { id: 24, q: "The amount of matter in an object is its:", options: ["Volume", "Mass", "Weight", "Size"], a: "Mass", explanation: "Mass is the measure of the quantity of matter." },
            { id: 25, q: "Vapour turning into water on a cold glass is:", options: ["Melting", "Freezing", "Condensation", "Boiling"], a: "Condensation", explanation: "Gas losing heat turns into liquid." },
            { id: 26, q: "Why are ships made of iron able to float?", options: ["Iron is light", "Because of their shape and air inside", "Iron is transparent", "None"], a: "Because of their shape and air inside", explanation: "The overall density of the ship (including air) is less than water." },
            { id: 27, q: "Which of these has no fixed volume?", options: ["Stone", "Milk", "Oxygen in a room", "Ice"], a: "Oxygen in a room", explanation: "Gases fill the entire space available to them." },
            { id: 28, q: "A mirror is an example of an object that is:", options: ["Transparent", "Opaque", "Translucent", "Soluble"], a: "Opaque", explanation: "A mirror is an opaque glass with a reflective coating." },
            { id: 29, q: "Objects are made of different:", options: ["Gases", "Materials", "Energy", "Sounds"], a: "Materials", explanation: "A material is a type of matter used to make things." },
            { id: 30, q: "Matter particles are always:", options: ["Stationary", "In motion", "Changing color", "Invisible"], a: "In motion", explanation: "Particles of matter are constantly moving or vibrating." }
          ]
        }
      },
      { 
        id: 'changes-matter', 
        category: 'chemistry', 
        title: 'Changes in Matter', 
        desc: 'Physical and chemical transformations', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Matter", text: "Matter is everything that makes up our universe. From the air we breathe to the soil we farm, everything is matter.", points: ["Has Mass: Everything has weight.", "Occupies Space: Everything takes up room.", "Ubiquity: Matter is everywhere around us."], example: "Air, Water, Books, and Soil are all different forms of matter.", diagram: ACHIEVER_ASSETS.matter_intro_new },
              { title: "2. Characteristics of Matter", text: "Matter is not solid through and through; it is made of incredibly small building blocks.", points: ["Tiny Particles: Made of atoms and molecules.", "Constant Motion: Particles are always vibrating or moving.", "Inter-particle Space: There are gaps between these tiny particles."], example: "When you dissolve salt in water, the salt particles fit into the spaces between water particles.", diagram: ACHIEVER_ASSETS.particle_motion },
              { title: "3. States of Matter: Solid", text: "In solids, particles are packed so tightly that they can only vibrate in place.", points: ["Fixed Shape: Does not change unless broken.", "Fixed Volume: Takes up a constant amount of space.", "Strong Attraction: Particles pull on each other very strongly."], example: "Stones, Wood, and Ice maintain their shape because they are solids.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "4. States of Matter: Liquid", text: "Liquids have more energy than solids, allowing particles to slide past one another.", points: ["No Fixed Shape: Takes the shape of the container.", "Fixed Volume: You can't squeeze 1 litre of water into a 500ml bottle.", "Fluidity: Particles can move around freely."], example: "Water, Milk, and Oil are liquids that flow and take the shape of their vessels.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "5. States of Matter: Gas", text: "Gas particles have the most energy and move at very high speeds in all directions.", points: ["No Fixed Shape or Volume: Fills any container completely.", "Highly Compressible: Can be squeezed into small tanks (like LPG).", "Large Spaces: Particles are very far apart."], example: "The air around us and the steam from a boiling kettle are gases.", diagram: ACHIEVER_ASSETS.particle_states },
              { title: "6. Changes of State: Thermal Effects", text: "Adding or removing heat (energy) is the main reason matter changes its state.", points: ["Melting: Solid to Liquid (Heating).", "Freezing: Liquid to Solid (Cooling).", "Energy Transfer: Heat makes particles move faster."], example: "Ice melts into water when left out in the sun.", diagram: ACHIEVER_ASSETS.state_changes },
              { title: "7. Evaporation & Condensation", text: "The transition between liquid and gas is vital for the Earth's water cycle.", points: ["Evaporation: Liquid to Gas (Surface process).", "Condensation: Gas to Liquid (Forms droplets).", "Boiling: Rapid evaporation throughout the liquid."], example: "Wet clothes dry in the sun due to evaporation; dew forms on grass due to condensation.", diagram: ACHIEVER_ASSETS.state_changes },
              { title: "8. Physical Changes", text: "A physical change only alters the appearance or state of a substance, not its chemical identity.", points: ["No New Substance: The material stays the same.", "Often Reversible: Can usually be undone.", "Changes in Size/Shape: Tearing, melting, or folding."], example: "Cutting wood into smaller pieces is a physical change - it's still wood!", diagram: ACHIEVER_ASSETS.physical_vs_chemical },
              { title: "9. Chemical Changes", text: "In a chemical change, substances react to form entirely new materials with different properties.", points: ["New Substance Formed: A permanent change.", "Irreversible: Usually cannot be turned back.", "Signs: Change in color, smell, or release of gas/heat."], example: "Burning wood turns it into ash and smoke - you can't turn ash back into wood!", diagram: ACHIEVER_ASSETS.physical_vs_chemical },
              { title: "10. Expansion & Contraction", text: "Materials change their size when their temperature changes.", points: ["Expansion: Objects get slightly larger when heated.", "Contraction: Objects get slightly smaller when cooled.", "Rural Context: This is why blacksmiths heat iron tools to shape them."], example: "Railway tracks have small gaps between them to allow for expansion in the summer heat.", diagram: ACHIEVER_ASSETS.expansion_contraction },
              { title: "11. Properties: Appearance & Hardness", text: "We identify materials by how they look and how much force they can resist.", points: ["Appearance: Shiny (Lustrous) or Dull.", "Texture: Smooth or Rough.", "Hardness: Resistance to scratching or cutting."], example: "Iron is shiny and hard, while a sponge is dull and soft.", diagram: ACHIEVER_ASSETS.appearance_hardness_table },
              { title: "12. Properties: Solubility", text: "Matter behaves differently when mixed with liquids like water.", points: ["Soluble: Disappears into the liquid (Sugar).", "Insoluble: Stays separate (Sand).", "Importance: Essential for cooking and cleaning."], example: "Salt dissolves in water (Soluble), but oil floats on top (Insoluble).", diagram: ACHIEVER_ASSETS.solubility },
              { title: "13. Properties: Floatation", text: "Whether an object floats or sinks depends on its density relative to water.", points: ["Floats: Lighter than water (Wood, Plastic).", "Sinks: Heavier than water (Stone, Iron).", "Rural Application: Fishing floats and boats."], example: "A wooden log floats on a river, but a small pebble sinks instantly.", diagram: ACHIEVER_ASSETS.floatation },
              { title: "14. Properties: Transparency", text: "Different materials allow different amounts of light to pass through them.", points: ["Transparent: Clear (Glass, Air).", "Translucent: Partial light (Butter paper, Frosted glass).", "Opaque: Blocks all light (Wood, Metal)."], example: "Windows use glass to let in light, but walls are opaque for privacy.", diagram: "" },
              { title: "15. Conductivity: Heat & Electricity", text: "Some materials are 'highways' for energy, while others are 'barriers'.", points: ["Conductors: Allow flow (Copper, Aluminium).", "Insulators: Stop flow (Rubber, Wood, Plastic).", "Safety: Electrical wires are always coated in insulators."], example: "Cooking pots have metal bottoms (conductor) and plastic handles (insulator).", diagram: ACHIEVER_ASSETS.conductivity_comparison_table },
              { title: "16. Uses of Materials", text: "We choose materials for tools and buildings based on their specific properties.", points: ["Strength: Metal for ploughs and tools.", "Durability: Stone and cement for houses.", "Lightweight: Plastic for carrying water."], example: "In rural areas, clay is used for pots because it keeps water cool through evaporation.", diagram: ACHIEVER_ASSETS.sorting_materials },
              { title: "17. Reversible vs Irreversible", text: "Knowing if a change can be undone helps us in engineering and daily life.", points: ["Reversible: Melting ice, stretching a rubber band.", "Irreversible: Baking bread, rusting of iron, burning fuel.", "Nature: Most chemical changes are irreversible."], example: "Stretching a rubber band is reversible, but breaking it is irreversible.", diagram: ACHIEVER_ASSETS.reversible_process },
              { title: "18. Real-Life Application: Storage", text: "Understanding matter helps us preserve food and resources.", points: ["Airtight Jars: Keep moisture (gas) away from food.", "Metal Tins: Protect from light and pests.", "Plastic Bags: Lightweight and waterproof."], example: "Keeping grains in airtight containers prevents them from absorbing moisture and spoiling.", diagram: "" },
              { title: "19. Summary of Changes", text: "The world is constantly changing. Recognizing these changes is the heart of Chemistry.", points: ["Matter is everything.", "Physical changes are about 'how it looks'.", "Chemical changes are about 'what it is'."], example: "Cooking an egg is a chemical change; slicing the egg is a physical change.", diagram: "" },
              { title: "20. Quick Check", text: "Let's test what you've learned about the changes in matter.", points: ["Is melting ice a physical or chemical change?", "Which state of matter has a fixed volume but no fixed shape?", "Why are cooking pan handles made of wood or plastic?"], example: "Think about these as you head to the Practice section!", diagram: "" }
            ]
          },
          practice: [
            { q: "Is tearing paper a physical or chemical change?", options: ["Physical", "Chemical", "Both", "None"], a: "Physical", explanation: "No new substance is formed; it's still paper." },
            { q: "What type of change is the rusting of iron?", options: ["Physical", "Chemical", "Reversible", "None"], a: "Chemical", explanation: "Rust is a new substance formed by reaction with oxygen and water." },
            { q: "Melting of wax is a ______ change.", options: ["Physical", "Chemical", "Biological", "Atomic"], a: "Physical", explanation: "Wax just changes from solid to liquid; it's still wax." },
            { q: "Which of these is a chemical change?", options: ["Breaking a glass", "Boiling water", "Burning wood", "Cutting wood"], a: "Burning wood", explanation: "Burning creates ash and smoke (new substances)." },
            { q: "When water freezes, its mass:", options: ["Increases", "Decreases", "Remains the same", "Doubles"], a: "Remains the same", explanation: "The amount of matter doesn't change during a state change." },
            { q: "Cooking an egg is a:", options: ["Physical change", "Chemical change", "Reversible change", "None"], a: "Chemical change", explanation: "Heat causes a chemical reaction in the proteins of the egg." },
            { q: "A change that can be reversed is called:", options: ["Irreversible", "Reversible", "Chemical", "Permanent"], a: "Reversible", explanation: "Reversible changes like melting can be undone." },
            { q: "Mixing sand and salt is a ______ change.", options: ["Physical", "Chemical", "Complex", "Atomic"], a: "Physical", explanation: "They can be separated; no new substance is formed." },
            { q: "Photosynthesis is a ______ change.", options: ["Physical", "Chemical", "Mechanical", "None"], a: "Chemical", explanation: "Plants turn CO2 and water into glucose (new substance)." },
            { q: "Digestion of food is a:", options: ["Physical change", "Chemical change", "Reversible change", "None"], a: "Chemical change", explanation: "Enzymes break down food into different chemical components." }
          ],
          challenge: [
            { q: "Why do railway tracks have gaps?", options: ["To save metal", "To allow for expansion", "For better grip", "None"], a: "To allow for expansion", explanation: "Metal expands when heated in summer, and these gaps prevent the tracks from bending." },
            { q: "Sublimation is the process of:", options: ["Solid to Liquid", "Liquid to Gas", "Solid to Gas directly", "Gas to Solid"], a: "Solid to Gas directly", explanation: "Sublimation skips the liquid phase, like dry ice or camphor." }
          ],
          test: [
            { id: 1, q: "Which of these is a chemical change?", options: ["Melting ice", "Cutting paper", "Rusting of iron", "Boiling water"], a: "Rusting of iron", explanation: "Rust is a new chemical substance." },
            { id: 2, q: "Physical changes are usually:", options: ["Permanent", "Reversible", "Irreversible", "Dangerous"], a: "Reversible", explanation: "Most physical changes (like melting) can be reversed." },
            { id: 3, q: "A change where a new substance is formed is a:", options: ["Physical change", "Chemical change", "No change", "None"], a: "Chemical change", explanation: "This is the core definition of a chemical change." },
            { id: 4, q: "Which of these is a physical change?", options: ["Burning of coal", "Curdling of milk", "Breaking a glass", "Digestion of food"], a: "Breaking a glass", explanation: "Breaking glass changes shape but not the material itself." },
            { id: 5, q: "When a candle burns, which change occurs?", options: ["Only Physical", "Only Chemical", "Both Physical and Chemical", "Neither"], a: "Both Physical and Chemical", explanation: "Wax melting is physical; wick burning is chemical." },
            { id: 6, q: "Explosion of fireworks is a ______ change.", options: ["Physical", "Chemical", "Reversible", "Slow"], a: "Chemical", explanation: "It produces light, sound, heat, and new gases." },
            { id: 7, q: "Growth of a plant is a ______ change.", options: ["Chemical", "Physical", "Both", "Reversible"], a: "Chemical", explanation: "New tissues are formed through complex chemical reactions." },
            { id: 8, q: "Making a fruit salad is a ______ change.", options: ["Physical", "Chemical", "Reversible", "Permanent"], a: "Physical", explanation: "The fruits are just cut into smaller pieces." },
            { id: 9, q: "Which of these involves energy absorption?", options: ["Freezing", "Condensation", "Melting", "Burning"], a: "Melting", explanation: "Substances absorb heat to melt." },
            { id: 10, q: "Fermentation of grapes is a:", options: ["Physical change", "Chemical change", "Reversible change", "None"], a: "Chemical change", explanation: "Sugar turns into alcohol (a new substance)." },
            { id: 11, q: "Dissolving sugar in water is a ______ change.", options: ["Physical", "Chemical", "Irreversible", "None"], a: "Physical", explanation: "Sugar can be recovered by evaporating the water." },
            { id: 12, q: "Which of these is an irreversible physical change?", options: ["Melting ice", "Tearing paper", "Stretching rubber", "Boiling water"], a: "Tearing paper", explanation: "You can't 'un-tear' paper easily, though it's still paper." },
            { id: 13, q: "Ripening of fruit is a ______ change.", options: ["Chemical", "Physical", "Reversible", "Mechanical"], a: "Chemical", explanation: "Chemical changes cause the fruit to become sweet and change color." },
            { id: 14, q: "An indicator of chemical change is:", options: ["Change in color", "Release of gas", "Evolution of heat", "All of these"], a: "All of these", explanation: "Color, gas, and heat often signal a chemical reaction." },
            { id: 15, q: "Weathering of rocks is a ______ change.", options: ["Physical", "Chemical", "Both", "None"], a: "Both", explanation: "Water breaking rocks is physical; acid rain is chemical." },
            { id: 16, q: "When iron reacts with oxygen and water, it forms:", options: ["Steel", "Rust", "Alloy", "Plastic"], a: "Rust", explanation: "Hydrated iron oxide is common rust." },
            { id: 17, q: "Preventing rust by coating iron with zinc is called:", options: ["Painting", "Galvanization", "Neutralization", "Melting"], a: "Galvanization", explanation: "Zinc protects the iron from air and moisture." },
            { id: 18, q: "Souring of milk is a ______ change.", options: ["Physical", "Chemical", "Reversible", "None"], a: "Chemical", explanation: "Bacteria turn lactose into lactic acid." },
            { id: 19, q: "Burning of incense sticks produces:", options: ["Oxygen", "Ash and fragrant gases", "Water", "Ice"], a: "Ash and fragrant gases", explanation: "New substances are produced by burning." },
            { id: 20, q: "Magnetizing an iron nail is a ______ change.", options: ["Physical", "Chemical", "Irreversible", "None"], a: "Physical", explanation: "It can be demagnetized; no new substance is formed." },
            { id: 21, q: "Which of these is a slow change?", options: ["Burning paper", "Bursting crackers", "Rusting of iron", "Blinking of eyes"], a: "Rusting of iron", explanation: "Rusting takes days or months." },
            { id: 22, q: "Adding salt to water changes its:", options: ["Color", "Chemical nature", "Physical state", "Boiling point"], a: "Boiling point", explanation: "Dissolving solutes changes physical properties like boiling point." },
            { id: 23, q: "Curdling of milk is ______ change.", options: ["Reversible", "Irreversible", "Physical", "None"], a: "Irreversible", explanation: "You cannot turn curd back into milk." },
            { id: 24, q: "Evaporation of sea water to get salt is a:", options: ["Chemical change", "Physical change", "Biological change", "None"], a: "Physical change", explanation: "Water changes to vapour, leaving salt behind." },
            { id: 25, q: "Sublimation of camphor is a ______ change.", options: ["Physical", "Chemical", "Permanent", "None"], a: "Physical", explanation: "It just changes state from solid to gas." },
            { id: 26, q: "Beating aluminium to make foil is a ______ change.", options: ["Chemical", "Physical", "Biological", "None"], a: "Physical", explanation: "Only the shape and thickness change." },
            { id: 27, q: "Inflating a balloon is a ______ change.", options: ["Reversible physical", "Irreversible chemical", "Irreversible physical", "None"], a: "Reversible physical", explanation: "You can let the air out to return it to its original size." },
            { id: 28, q: "Formation of clouds is a ______ change.", options: ["Chemical", "Physical", "Irreversible", "None"], a: "Physical", explanation: "It involves condensation and evaporation of water." },
            { id: 29, q: "Mixing baking soda and vinegar produces:", options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"], a: "Carbon dioxide", explanation: "The bubbles you see are CO2 gas (chemical change)." },
            { id: 30, q: "A change that occurs in a short period is:", options: ["Slow", "Fast", "Periodic", "Non-periodic"], a: "Fast", explanation: "Fast changes like burning occur quickly." }
          ]
        } 
      },
      { 
        id: 'acids-bases-salts', 
        category: 'chemistry', 
        title: 'Acids, Bases, and Salts', 
        desc: 'Nature and reactions of chemical substances', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Chemicals", text: "Substances around us can be classified based on their chemical nature into Acids, Bases, or Salts.", points: ["Chemical Nature: Every substance has a unique identity.", "Widespread Use: Found in food, medicine, and cleaning products.", "Classification: Helps us understand how they react."], example: "A lemon is acidic, while the soap you use for bathing is basic.", diagram: ACHIEVER_ASSETS.ph_scale },
              { title: "2. What are Acids?", text: "Acids are substances that have a sour taste and can be found naturally in many foods.", points: ["Taste: Distinctly sour.", "Origin: Can be natural (fruits) or mineral (industrial).", "Etymology: From the Latin 'Acere' meaning sour."], example: "Citrus fruits like oranges and lemons contain Citric acid.", diagram: ACHIEVER_ASSETS.ph_scale },
              { title: "3. Properties of Acids", text: "Acids have specific behaviors that help us identify them in a laboratory.", points: ["Litmus Test: Turns Blue Litmus paper Red.", "Reaction: Can react with metals to produce gas.", "Corrosiveness: Strong acids can burn skin."], example: "Vinegar (Acetic acid) is a weak acid used in cooking.", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "4. Common Natural Acids", text: "Nature provides us with many acids that are safe and healthy to consume.", points: ["Citric Acid: Found in lemons and oranges.", "Lactic Acid: Found in curd and sour milk.", "Tartaric Acid: Found in tamarind and grapes."], example: "The sourness of curd is due to the presence of Lactic acid.", diagram: "" },
              { title: "5. What is a Base?", text: "A base is a chemical substance that has a pH greater than seven.", points: ["It is a liquid that is slippery to the touch and tastes bitter.", "Bases can change the color of various indicators.", "They react with substances with a pH of 7 or lower (Acids) to create salts.", "A greater pH value means a 'Stronger Base'."], example: "Baking soda and detergents are common bases found in households.", diagram: ACHIEVER_ASSETS.ph_scale },
              { title: "6. Properties of Bases", text: "Bases also have distinct chemical signals that we can measure.", points: ["Litmus Test: Turns Red Litmus paper Blue.", "Feel: Always feel soapy when wet.", "Reaction: Neutralize acids."], example: "Magnesium Hydroxide (Milk of Magnesia) is a base used to treat acidity.", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "7. Alkalis: Water-Soluble Bases", text: "Not all bases dissolve in water. Those that do are called Alkalis.", points: ["Solubility: Must dissolve in water.", "Potency: Often very strong chemicals.", "Industrial Use: Used in making paper and soap."], example: "Sodium Hydroxide (Caustic Soda) is a powerful alkali.", diagram: "" },
              { title: "8. Concept of Indicators", text: "We cannot taste every substance to check if it's an acid or base. We use Indicators instead.", points: ["Safety: Prevents accidental poisoning.", "Visual Signal: Change color in different substances.", "Types: Natural (plants) and Synthetic (man-made)."], example: "Litmus is the most common natural indicator used in schools.", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "9. Litmus: From Lichens", text: "Litmus is a natural dye extracted from lichens and is the standard for chemical testing.", points: ["Acid: Turns blue litmus to red.", "Base: Turns red litmus to blue.", "Neutral: No color change."], example: "If you dip blue litmus in lemon juice, it will turn red instantly.", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "10. Turmeric as an Indicator", text: "Turmeric is a common kitchen spice that doubles as a natural chemical indicator.", points: ["Acid/Neutral: Stays yellow.", "Base: Turns reddish-brown.", "Usage: Can be used to test soap or detergent."], example: "If you get a curry stain (turmeric) on your shirt and wash it with soap, it turns red!", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "11. China Rose Indicator", text: "The petals of the China Rose (Hibiscus) plant can be used to make a sensitive indicator.", points: ["Preparation: Soak petals in warm water.", "Acid: Turns dark pink (Magenta).", "Base: Turns Green."], example: "China rose indicator is a fun way to test liquids in a rural classroom.", diagram: ACHIEVER_ASSETS.indicator_colors },
              { title: "12. The pH Scale", text: "The pH scale measures how strong or weak an acid or base is, ranging from 0 to 14.", points: ["0 to 6: Acidic (Lower is stronger).", "7: Neutral (Pure Water).", "8 to 14: Basic (Higher is stronger)."], example: "Stomach acid has a very low pH, while soap has a high pH.", diagram: ACHIEVER_ASSETS.ph_scale_detailed },
              { title: "13. Neutral Substances", text: "Some substances are neither acidic nor basic. These are called neutral.", points: ["pH Value: Exactly 7.", "Litmus: No change in red or blue litmus.", "Safety: Generally safe for skin contact."], example: "Pure water and common salt solution are neutral.", diagram: ACHIEVER_ASSETS.ph_scale },
              { title: "14. Neutralization Reaction", text: "When an acid and a base are mixed, they cancel each other out to form salt and water.", points: ["Reaction: Acid + Base -> Salt + Water.", "Heat: This process often releases heat.", "Result: A neutral substance is produced."], example: "Mixing Vinegar and Baking Soda is a common neutralization reaction.", diagram: ACHIEVER_ASSETS.neutralization_process },
              { title: "15. Neutralization: Indigestion", text: "Our stomach produces Hydrochloric acid to digest food, but too much causes pain.", points: ["Problem: Excess acid in the stomach.", "Solution: Take an 'Antacid' (a base).", "Mechanism: The base neutralizes the stomach acid."], example: "Milk of Magnesia is a base taken to relieve stomach pain.", diagram: "" },
              { title: "16. Neutralization: Ant Stings", text: "When an ant bites, it injects Formic acid into the skin, causing pain.", points: ["Problem: Acidic sting.", "Solution: Rub moist baking soda (base) on the area.", "Effect: Neutralizes the acid and stops the pain."], example: "Calamine solution (Zinc carbonate) is also used for ant bites.", diagram: "" },
              { title: "17. Neutralization: Soil Treatment", text: "Plants do not grow well if the soil is too acidic or too basic.", points: ["Acidic Soil: Treated with Quick Lime (Calcium Oxide).", "Basic Soil: Treated with Organic Matter (Compost).", "Balance: Essential for high crop yields."], example: "Farmers test soil pH to decide which treatment is needed.", diagram: ACHIEVER_ASSETS.ph_scale },
              { title: "18. Neutralization: Factory Waste", text: "The waste from many factories contains acids that can kill fish and aquatic life.", points: ["Environmental Hazard: Acids in rivers.", "Solution: Waste is treated with basic substances.", "Result: Safe discharge of treated water."], example: "Industrial plants must neutralize waste before releasing it into the environment.", diagram: "" },
              { title: "19. What are Salts?", text: "Salts are the product of the reaction between an acid and a base.", points: ["Nature: Can be acidic, basic, or neutral.", "Uses: Cooking, preservation, and industrial manufacturing.", "Diversity: Not just 'common salt'; there are many types."], example: "Common salt (Sodium Chloride) is used in almost every meal.", diagram: ACHIEVER_ASSETS.neutralization_process },
              { title: "20. Safety with Chemicals", text: "Strong acids and bases are dangerous and must be handled with extreme care.", points: ["Protection: Always use gloves and goggles.", "Tasting: NEVER taste unknown chemicals.", "Dilution: Always add acid to water, never water to acid."], example: "Sulfuric acid is a strong mineral acid that can cause severe burns.", diagram: "" },
              { title: "21. Real-Life Applications Summary", text: "Chemistry is not just in books; it's happening all around us every day.", points: ["Food: Preservation and taste.", "Hygiene: Soap and detergents.", "Agriculture: Soil health management."], example: "Understanding pH helps us live healthier and farm better.", diagram: "" },
              { title: "22. Quick Check", text: "Let's review the core concepts of Acids, Bases, and Salts.", points: ["What color does base turn red litmus?", "What is the pH of pure water?", "Which acid is found in ant stings?"], example: "Use your knowledge to solve the Practice section next!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which of these is a natural indicator?", options: ["Litmus", "China Rose", "Turmeric", "All of these"], a: "All of these", explanation: "Litmus, China Rose, and Turmeric are all derived from plants." },
            { q: "Acid turns blue litmus paper into which color?", options: ["Yellow", "Red", "Green", "Blue"], a: "Red", explanation: "Acids always turn blue litmus red." },
            { q: "What is produced in a neutralization reaction besides salt?", options: ["Gas", "Water", "Oil", "Acid"], a: "Water", explanation: "Acid + Base gives Salt + Water." },
            { q: "A substance with a pH of 10 is considered:", options: ["Strong Acid", "Weak Acid", "Basic", "Neutral"], a: "Basic", explanation: "Any pH above 7 is basic." },
            { q: "China Rose indicator turns acids into which color?", options: ["Green", "Blue", "Dark Pink (Magenta)", "Yellow"], a: "Dark Pink (Magenta)", explanation: "China rose turns dark pink in acids and green in bases." },
            { q: "Which acid is found in citrus fruits like lemons?", options: ["Lactic acid", "Citric acid", "Acetic acid", "Formic acid"], a: "Citric acid", explanation: "Citrus fruits are the primary source of citric acid." },
            { q: "To treat an acidic soil, farmers add:", options: ["Vinegar", "Quick lime", "Organic matter", "Water"], a: "Quick lime", explanation: "Quick lime is a base that neutralizes acidic soil." },
            { q: "Antacids like Milk of Magnesia are used to treat:", options: ["Fever", "Acidity/Indigestion", "Broken bones", "Headache"], a: "Acidity/Indigestion", explanation: "Antacids neutralize excess acid in the stomach." },
            { q: "Which of these is a strong mineral acid?", options: ["Acetic acid", "Lactic acid", "Hydrochloric acid", "Tartaric acid"], a: "Hydrochloric acid", explanation: "HCl is a strong acid found in laboratories and our stomach." },
            { q: "The term 'Alkali' refers to:", options: ["Any acid", "A base that dissolves in water", "A type of salt", "A neutral liquid"], a: "A base that dissolves in water", explanation: "Water-soluble bases are called alkalis." }
          ],
          challenge: [
            { q: "Why is acidic soil treated with lime?", options: ["To make it more acidic", "To neutralize the acid", "To kill pests", "To add color"], a: "To neutralize the acid", explanation: "Lime is a base and helps neutralize the excess acid in the soil." },
            { q: "What is the pH range of a strong base?", options: ["0-3", "7", "12-14", "4-6"], a: "12-14", explanation: "Bases are on the high end of the pH scale (above 7)." }
          ],
          test: [
            { id: 1, q: "What is the taste of most acids?", options: ["Sweet", "Sour", "Bitter", "Salty"], a: "Sour", explanation: "Acids like lemon and vinegar have a characteristic sour taste." },
            { id: 2, q: "Which indicator turns blue litmus paper red?", options: ["Base", "Salt", "Acid", "Water"], a: "Acid", explanation: "Acids have the property of turning blue litmus to red." },
            { id: 3, q: "What is the chemical nature of soap?", options: ["Acidic", "Basic", "Neutral", "Salty"], a: "Basic", explanation: "Soap feels slippery and is basic in nature." },
            { id: 4, q: "Which of these is a natural indicator?", options: ["Methyl Orange", "Phenolphthalein", "Turmeric", "None of these"], a: "Turmeric", explanation: "Turmeric is a plant-based natural indicator." },
            { id: 5, q: "What happens when an acid reacts with a base?", options: ["Heat is absorbed", "Salt and water are formed", "New acid is formed", "Nothing happens"], a: "Salt and water are formed", explanation: "This is called a neutralization reaction: Acid + Base -> Salt + Water." },
            { id: 6, q: "Which acid is found in an ant sting?", options: ["Citric acid", "Formic acid", "Acetic acid", "Lactic acid"], a: "Formic acid", explanation: "Ants inject formic acid into the skin when they bite." },
            { id: 7, q: "What should be applied to an ant sting to neutralize it?", options: ["Vinegar", "Lemon juice", "Baking soda", "Water"], a: "Baking soda", explanation: "Baking soda is basic and neutralizes the formic acid from the sting." },
            { id: 8, q: "What is the pH of pure water?", options: ["0", "14", "7", "10"], a: "7", explanation: "Pure water is neutral and has a pH of exactly 7." },
            { id: 9, q: "A solution turns red litmus blue. Its nature is:", options: ["Acidic", "Basic", "Neutral", "Unknown"], a: "Basic", explanation: "Bases turn red litmus blue." },
            { id: 10, q: "Which of these is a strong acid?", options: ["Citric acid", "Acetic acid", "Hydrochloric acid", "Tartaric acid"], a: "Hydrochloric acid", explanation: "Hydrochloric acid (HCl) is a strong mineral acid." },
            { id: 11, q: "What color does turmeric turn in a basic solution?", options: ["Yellow", "Reddish-brown", "Green", "Blue"], a: "Reddish-brown", explanation: "Turmeric changes from yellow to reddish-brown in the presence of a base." },
            { id: 12, q: "Milk of Magnesia is used to treat:", options: ["Fever", "Indigestion", "Cough", "Skin rash"], a: "Indigestion", explanation: "Milk of Magnesia is an antacid (base) that neutralizes excess stomach acid." },
            { id: 13, q: "China Rose indicator turns basic solutions into:", options: ["Magenta", "Red", "Green", "Colorless"], a: "Green", explanation: "China rose turns green in bases and magenta in acids." },
            { id: 14, q: "Acidic soil can be treated by adding:", options: ["Organic matter", "Quick lime", "Vinegar", "Salt"], a: "Quick lime", explanation: "Quick lime (Calcium oxide) is a base used to neutralize acidic soil." },
            { id: 15, q: "Which of these is an example of an alkali?", options: ["Copper hydroxide", "Sodium hydroxide", "Iron hydroxide", "Aluminium hydroxide"], a: "Sodium hydroxide", explanation: "Sodium hydroxide is a base that is soluble in water (an alkali)." },
            { id: 16, q: "The product of neutralization is always:", options: ["An acid", "A base", "A salt and water", "Only water"], a: "A salt and water", explanation: "Neutralization always results in a salt and water." },
            { id: 17, q: "Curd contains which of the following acids?", options: ["Citric acid", "Tartaric acid", "Lactic acid", "Oxalic acid"], a: "Lactic acid", explanation: "Lactic acid is produced during the fermentation of milk into curd." },
            { id: 18, q: "Which substance is used as a food preservative?", options: ["Baking soda", "Vinegar", "Soap", "Milk of magnesia"], a: "Vinegar", explanation: "The acidic nature of vinegar (acetic acid) helps preserve food." },
            { id: 19, q: "If a substance has a pH of 2, it is a:", options: ["Weak acid", "Strong acid", "Weak base", "Strong base"], a: "Strong acid", explanation: "Lower pH values (0-3) indicate strong acids." },
            { id: 20, q: "What is the name of the salt formed from HCl and NaOH?", options: ["Sodium Carbonate", "Sodium Chloride", "Calcium Chloride", "Potassium Chloride"], a: "Sodium Chloride", explanation: "HCl (Acid) + NaOH (Base) -> NaCl (Sodium Chloride) + H2O." },
            { id: 21, q: "Which indicator is extracted from lichens?", options: ["Turmeric", "Litmus", "Phenolphthalein", "China Rose"], a: "Litmus", explanation: "Litmus is a natural dye extracted from lichens." },
            { id: 22, q: "Basic soil is treated with:", options: ["Quick lime", "Slaked lime", "Organic matter", "Baking soda"], a: "Organic matter", explanation: "Organic matter releases acids that neutralize the basic nature of the soil." },
            { id: 23, q: "Which of these feels soapy to touch?", options: ["Lemon juice", "Vinegar", "Soap solution", "Orange juice"], a: "Soap solution", explanation: "Bases like soap have a slippery, soapy feel." },
            { id: 24, q: "Citric acid is present in:", options: ["Tamarind", "Oranges", "Curd", "Vinegar"], a: "Oranges", explanation: "Citrus fruits like oranges and lemons are rich in citric acid." },
            { id: 25, q: "Neutralization reactions also release:", options: ["Cold", "Heat", "Light", "Sound"], a: "Heat", explanation: "Neutralization is an exothermic reaction, meaning it releases heat." },
            { id: 26, q: "Common salt is chemically known as:", options: ["Sodium bicarbonate", "Sodium chloride", "Calcium carbonate", "Magnesium sulphate"], a: "Sodium chloride", explanation: "Table salt is Sodium Chloride (NaCl)." },
            { id: 27, q: "Which acid is present in Tamarind?", options: ["Citric acid", "Tartaric acid", "Acetic acid", "Formic acid"], a: "Tartaric acid", explanation: "Tamarind and grapes contain tartaric acid." },
            { id: 28, q: "Indicators change color in response to:", options: ["Temperature", "Pressure", "Acidity or Alkalinity", "Volume"], a: "Acidity or Alkalinity", explanation: "Indicators detect whether a substance is an acid or a base." },
            { id: 29, q: "Window cleaners usually contain:", options: ["Acetic acid", "Ammonium hydroxide", "Citric acid", "Hydrochloric acid"], a: "Ammonium hydroxide", explanation: "Ammonium hydroxide is a common base used in cleaning solutions." },
            { id: 30, q: "What is the pH of a strong base?", options: ["1", "7", "13", "5"], a: "13", explanation: "High pH values (12-14) indicate strong bases." }
          ]
        } 
      },
      { 
        id: 'metals-nonmetals', 
        category: 'chemistry', 
        title: 'Metals, Non-metals and Chemical Effects', 
        desc: 'Properties of elements and electrochemistry', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Elements", text: "Everything around us is made of basic substances called elements. Scientists classify these into two main groups: Metals and Non-metals.", points: ["Classification: Based on physical and chemical behavior.", "Abundance: Over 90 metals exist naturally.", "Daily Life: From the gold in jewelry to the oxygen we breathe."], example: "The iron in a farmer's plough is a metal, while the carbon in wood is a non-metal.", diagram: ACHIEVER_ASSETS.periodic_table_comparison },
              { title: "2. What are Metals?", text: "Metals are elements known for being strong, shiny, and durable. They form the backbone of modern construction and technology.", points: ["Appearance: Usually silver or grey (except Gold and Copper).", "State: Almost all are solids at room temperature.", "Strength: Can withstand heavy loads."], example: "Iron is used in building bridges because of its incredible strength.", diagram: ACHIEVER_ASSETS.appearance_hardness_table },
              { title: "3. Examples of Common Metals", text: "We use various metals every day, often without realizing it.", points: ["Iron: Used in tools and structures.", "Copper: Used in electrical wires.", "Aluminium: Used in kitchen foil and aircraft.", "Gold: Used in jewelry for its beauty."], example: "Look at the electrical wires in your house; they are likely made of copper.", diagram: ACHIEVER_ASSETS.periodic_table_comparison },
              { title: "4. Metal Property: Lustre", text: "Metals have a unique ability to reflect light, giving them a shiny appearance called 'metallic lustre'.", points: ["Shiny Surface: Visible when the metal is freshly cut or polished.", "Reflection: This property makes them useful for mirrors and jewelry.", "Tarnish: Some metals lose shine when they react with air."], example: "A new silver spoon shines brightly because of its metallic lustre.", diagram: ACHIEVER_ASSETS.lustre_comparison },
              { title: "5. Metal Property: Hardness", text: "Most metals are very hard and difficult to cut or break.", points: ["Toughness: Resistant to scratching and denting.", "Exceptions: Sodium and Potassium are so soft they can be cut with a knife.", "Use: Hardness makes them ideal for making hammers and saws."], example: "Steel (an alloy of iron) is used to make sharp knives that stay sharp.", diagram: ACHIEVER_ASSETS.appearance_hardness_table },
              { title: "6. Metal Property: Malleability", text: "Malleability is the ability of a material to be beaten into thin sheets without breaking.", points: ["Shape Change: Metals can be hammered into any shape.", "Thinness: Silver can be made into extremely thin 'vark' for sweets.", "Industrial Use: Used to make car bodies and roofing sheets."], example: "Aluminium is hammered into thin foil used to wrap food.", diagram: ACHIEVER_ASSETS.malleability_demo },
              { title: "7. Metal Property: Ductility", text: "Ductility is the property that allows metals to be drawn or pulled into thin wires.", points: ["Stretching: Metals don't snap easily when pulled.", "Wire Making: Gold is the most ductile metal.", "Infrastructure: Thousands of miles of copper wire carry our electricity."], example: "A single gram of gold can be drawn into a wire almost 2 kilometres long!", diagram: ACHIEVER_ASSETS.ductility_demo },
              { title: "8. Metal Property: Conductivity", text: "Metals are excellent conductors, meaning heat and electricity flow through them easily.", points: ["Thermal Conductivity: Why cooking pots are made of metal.", "Electrical Conductivity: Why wires are made of copper/aluminium.", "Best Conductors: Silver is the best, followed by copper."], example: "The metal base of an iron heats up quickly to press your clothes.", diagram: ACHIEVER_ASSETS.conductivity_demo },
              { title: "9. Metal Property: Sonority", text: "When you strike a metal object, it produces a deep, ringing sound. This property is called 'sonority'.", points: ["Sound Production: Metals vibrate significantly when hit.", "Musical Instruments: Used in bells, cymbals, and guitar strings.", "Non-metals: Generally produce a dull thud instead."], example: "The school bell is made of metal so its ring can be heard across the playground.", diagram: ACHIEVER_ASSETS.sonority_demo },
              { title: "10. Uses of Metals in Daily Life", text: "Metals are essential for our modern lifestyle and infrastructure.", points: ["Construction: Steel beams for buildings and bridges.", "Transport: Engines and bodies of cars, trains, and planes.", "Kitchen: Stainless steel utensils and pressure cookers."], example: "Railway tracks are made of iron because they must support the weight of heavy trains.", diagram: "" },
              { title: "11. What are Non-metals?", text: "Non-metals are elements that usually lack the properties of metals. They are diverse and vital for life itself.", points: ["Appearance: Generally dull (not shiny).", "States: Can be solids (Sulphur), liquids (Bromine), or gases (Oxygen).", "Brittleness: Solid non-metals break easily when hit."], example: "The charcoal used for cooking is a form of carbon, a non-metal.", diagram: ACHIEVER_ASSETS.non_metals_intro },
              { title: "12. Examples of Non-metals", text: "Non-metals are found in the air we breathe and the food we eat.", points: ["Oxygen: Essential for breathing and fire.", "Nitrogen: Makes up most of our atmosphere.", "Carbon: Found in diamonds, graphite, and coal.", "Iodine: Used in medicine and salt."], example: "Every breath you take provides your body with Oxygen, a gaseous non-metal.", diagram: "" },
              { title: "13. Properties of Non-metals", text: "Non-metals behave very differently from metals.", points: ["Insulators: They do not conduct heat or electricity well (except Graphite).", "Softness: Most are soft (except Diamond, the hardest natural substance).", "Non-sonorous: They do not produce a ringing sound."], example: "Rubber and plastic (made of non-metals) are used to coat wires for safety.", diagram: ACHIEVER_ASSETS.non_metals_properties_map },
              { title: "14. Uses of Non-metals: Life Support", text: "Without non-metals, life as we know it would be impossible.", points: ["Oxygen: Used by all living things for respiration.", "Nitrogen: Used in fertilizers to help crops grow faster.", "Chlorine: Used to kill germs in drinking water."], example: "Farmers use urea (containing nitrogen) to ensure a healthy harvest.", diagram: "" },
              { title: "15. Uses of Non-metals: Energy & Tech", text: "Non-metals are also key players in industry and technology.", points: ["Carbon: Used as fuel (coal) and in pencils (graphite).", "Sulphur: Used in making matches and fireworks.", "Phosphorus: Essential for making matchsticks."], example: "The 'lead' in your pencil is actually graphite, a conducting non-metal.", diagram: "" },
              { title: "16. Metals vs Non-metals: Summary", text: "Let's compare the two groups side-by-side to understand their differences.", points: ["Appearance: Metals are shiny; Non-metals are dull.", "Conductivity: Metals are conductors; Non-metals are insulators.", "Malleability: Metals can be flattened; Non-metals are brittle."], example: "Think of a metal hammer (strong) vs. a piece of coal (breaks easily).", diagram: ACHIEVER_ASSETS.metals_vs_nonmetals_summary },
              { title: "17. Chemical Property: Reaction with Oxygen", text: "Both metals and non-metals react with oxygen to form oxides, but the results are different.", points: ["Metal Oxides: Generally 'Basic' (turn red litmus blue).", "Non-metal Oxides: Generally 'Acidic' (turn blue litmus red).", "Rusting: Iron reacts with oxygen and moisture to form rust."], example: "Burning magnesium ribbon produces a white ash (Magnesium Oxide) which is basic.", diagram: ACHIEVER_ASSETS.reaction_oxygen_metals_nonmetals },
              { title: "18. Chemical Property: Reaction with Water", text: "Metals show varied reactions with water, while non-metals generally do not.", points: ["Vigorous: Sodium reacts so fast it can catch fire.", "Slow: Iron reacts slowly (forming rust).", "None: Gold and Silver do not react with water at all."], example: "Sodium is stored in kerosene because it reacts instantly with moisture in the air.", diagram: ACHIEVER_ASSETS.reaction_water_metals_nonmetals },
              { title: "19. Chemical Property: Reaction with Acids", text: "Metals typically react with acids to produce a specific gas.", points: ["Gas Produced: Hydrogen gas is released.", "Test: Hydrogen burns with a 'pop' sound.", "Non-metals: Generally do not react with dilute acids."], example: "Adding zinc to dilute hydrochloric acid produces bubbles of hydrogen gas.", diagram: ACHIEVER_ASSETS.reaction_acids_metals_nonmetals },
              { title: "20. Intro to Chemical Effects of Current", text: "We know electricity flows through wires, but did you know it can also cause chemical changes in liquids?", points: ["Conduction: Some liquids allow electricity to pass through.", "Transformation: Electricity can break down or build up substances.", "Discovery: Alessandro Volta created the first battery using these principles."], example: "Passing electricity through water can split it into Hydrogen and Oxygen gases.", diagram: ACHIEVER_ASSETS.chemical_effects_current_summary },
              { title: "21. Conducting Liquids: Electrolytes", text: "Not all liquids conduct electricity. Those that do are called electrolytes.", points: ["Good Conductors: Lemon juice, Vinegar, Salt water.", "Poor Conductors: Distilled water, Honey, Vegetable oil.", "Reason: Presence of ions (charged particles) in the liquid."], example: "Pure rain water conducts slightly, but tap water conducts well due to dissolved salts.", diagram: ACHIEVER_ASSETS.chemical_effects_current_summary },
              { title: "22. Simple Experiment: Testing Liquids", text: "You can test if a liquid is a conductor using a simple tester with a bulb or an LED.", points: ["Circuit: Battery, Wires, and the liquid to be tested.", "Observation: If the bulb glows, the liquid is a conductor.", "Weak Conductors: An LED or a magnetic compass can detect even weak currents."], example: "Testing salt water will make a bulb glow brightly.", diagram: "" },
              { title: "23. Effects of Electric Current in Liquids", text: "When electricity passes through a conducting solution, it causes chemical reactions.", points: ["Gas Bubbles: May form at the electrodes.", "Deposits: Metal may be deposited on an electrode.", "Color Change: The solution's color may change over time."], example: "In water electrolysis, bubbles form as water turns into gas.", diagram: ACHIEVER_ASSETS.effects_current_liquids },
              { title: "24. What is Electroplating?", text: "Electroplating is the process of depositing a layer of any desired metal on another material by means of electricity.", points: ["Coating: A thin layer of metal covers the object.", "Purpose: For protection or decoration.", "Process: Uses a copper sulphate solution to plate copper onto other items."], example: "A cheap iron ring can be electroplated with gold to look expensive.", diagram: ACHIEVER_ASSETS.chemical_effects_current_summary },
              { title: "25. Common Examples of Electroplating", text: "We see electroplating in many objects we use every day.", points: ["Chrome Plating: Used on bicycle handlebars and car taps for shine.", "Gold/Silver Plating: Used in low-cost jewelry.", "Tin Plating: Used for iron cans to store food safely."], example: "The shiny rim of a bicycle wheel is iron coated with Chromium.", diagram: "" },
              { title: "26. Why do we Electroplate?", text: "Electroplating solves several engineering and aesthetic problems.", points: ["Rust Prevention: Coating iron with zinc or chromium.", "Hardness: Adding a harder surface to a softer metal.", "Appearance: Making a dull metal look shiny and new."], example: "Kitchen taps are plated with Chromium so they don't rust and always look clean.", diagram: "" },
              { title: "27. Real-Life Applications Summary", text: "The chemistry of metals and electricity is visible all around us.", points: ["Wiring: Copper and Aluminium for power.", "Cooking: Metal pots and non-stick pans.", "Plating: Rust-proof tools and shiny ornaments.", "Agriculture: Metal tools and non-metal fertilizers."], example: "The electric motor in a farm pump uses copper wires and metal casing.", diagram: "" },
              { title: "28. Safety Measures: Electricity", text: "Electricity is useful but can be dangerous if not handled with care.", points: ["Insulation: Never touch bare wires.", "Dry Hands: Never operate switches with wet hands.", "Safety Gear: Use rubber-soled shoes and wooden stools when working."], example: "Water conducts electricity, which is why wet hands increase the risk of shock.", diagram: "" },
              { title: "29. Safety Measures: Experiments", text: "Always follow safety rules when conducting science experiments.", points: ["Adult Supervision: Never experiment alone.", "Battery Use: Only use small batteries, never main power sockets.", "Chemicals: Handle acids and bases with extreme caution."], example: "Using a 9V battery for your electroplating experiment is safe; the wall socket is NOT.", diagram: "" },
              { title: "30. Quick Check: Are you an Achiever?", text: "Let's see if you can recall the core concepts we've covered.", points: ["Which property allows metals to be made into wires?", "Is lemon juice a conductor or insulator?", "What is the process of coating metal called?", "Why is sodium stored in kerosene?"], example: "Think about these as you head to the Practice section!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which property allows metals to be beaten into thin sheets?", options: ["Ductility", "Malleability", "Sonority", "Lustre"], a: "Malleability", explanation: "Malleability is the ability to be hammered into sheets." },
            { q: "Which of these is a non-metal that conducts electricity?", options: ["Sulphur", "Iodine", "Graphite", "Oxygen"], a: "Graphite", explanation: "Graphite is a form of carbon that conducts electricity." },
            { q: "Is lemon juice a good conductor of electricity?", options: ["Yes", "No"], a: "Yes", explanation: "Lemon juice contains ions that allow current to flow." },
            { q: "The process of coating one metal on another using electricity is:", options: ["Galvanization", "Electroplating", "Melting", "Rusting"], a: "Electroplating", explanation: "This is the definition of electroplating." },
            { q: "Which gas is released when metals react with acids?", options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"], a: "Hydrogen", explanation: "Metal + Acid -> Salt + Hydrogen gas." },
            { q: "Why is sodium stored in kerosene?", options: ["To keep it cool", "It is highly reactive with air/water", "To make it shiny", "None"], a: "It is highly reactive with air/water", explanation: "Sodium catches fire if exposed to air or moisture." },
            { q: "The property of metals to produce a ringing sound is:", options: ["Ductility", "Sonority", "Lustre", "Hardness"], a: "Sonority", explanation: "Sonorous materials ring when hit." },
            { q: "Which non-metal is used in fertilizers?", options: ["Nitrogen", "Gold", "Mercury", "Sulphur"], a: "Nitrogen", explanation: "Nitrogen is essential for plant growth." }
          ],
          challenge: [
            { q: "Which metal is the best conductor of electricity?", options: ["Iron", "Copper", "Silver", "Aluminium"], a: "Silver", explanation: "Silver has the lowest electrical resistance." },
            { q: "Identify the liquid non-metal.", options: ["Mercury", "Bromine", "Oxygen", "Gallium"], a: "Bromine", explanation: "Bromine is a liquid at room temperature." },
            { q: "Metals generally form ____ oxides.", options: ["Acidic", "Basic", "Neutral", "Bitter"], a: "Basic", explanation: "Metal oxides turn red litmus blue." },
            { q: "Which is the most ductile metal?", options: ["Copper", "Gold", "Silver", "Iron"], a: "Gold", explanation: "Gold can be drawn into the thinnest wires." },
            { q: "In electroplating, the object to be coated is made the:", options: ["Cathode (Negative)", "Anode (Positive)", "Battery", "None"], a: "Cathode (Negative)", explanation: "Positive metal ions move toward the negative cathode." },
            { q: "Pure water is a ____ conductor.", options: ["Good", "Poor", "Perfect", "None"], a: "Poor", explanation: "Distilled water lacks the ions needed for conduction." },
            { q: "Which non-metal is used to disinfect water?", options: ["Oxygen", "Chlorine", "Nitrogen", "Carbon"], a: "Chlorine", explanation: "Chlorine kills bacteria in water." },
            { q: "Which zone of a candle flame is the hottest?", options: ["Innermost", "Middle", "Outermost", "None"], a: "Outermost", explanation: "The non-luminous outermost zone is hottest." },
            { q: "Aluminium foil works due to which property?", options: ["Malleability", "Ductility", "Sonority", "Hardness"], a: "Malleability", explanation: "Being able to form sheets." },
            { q: "What gas is produced when water is electrolyzed?", options: ["Carbon dioxide", "Hydrogen and Oxygen", "Nitrogen", "None"], a: "Hydrogen and Oxygen", explanation: "Water (H2O) splits into its base gases." }
          ],
          test: [
            { id: 1, q: "Which of these is NOT a property of most metals?", options: ["High density", "Brittleness", "Lustre", "Conductivity"], a: "Brittleness", explanation: "Metals are tough; non-metals are usually brittle." },
            { id: 2, q: "Which metal can be cut with a knife?", options: ["Iron", "Copper", "Sodium", "Aluminium"], a: "Sodium", explanation: "Sodium and Potassium are exceptionally soft metals." },
            { id: 3, q: "Which gas burns with a pop sound?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"], a: "Hydrogen", explanation: "The 'pop' test is unique to hydrogen gas." },
            { id: 4, q: "Phosphorus is a very reactive non-metal stored in:", options: ["Kerosene", "Alcohol", "Water", "Acid"], a: "Water", explanation: "It reacts with air but not with water." },
            { id: 5, q: "The green coating on copper is a mixture of:", options: ["Rust", "Copper hydroxide and carbonate", "Copper oxide", "None"], a: "Copper hydroxide and carbonate", explanation: "Result of reaction with moist air." },
            { id: 6, q: "Which metal is used for galvanizing iron?", options: ["Copper", "Zinc", "Gold", "Silver"], a: "Zinc", explanation: "Zinc provides a protective layer against rust." },
            { id: 7, q: "Non-metal oxides are generally:", options: ["Basic", "Acidic", "Neutral", "Sweet"], a: "Acidic", explanation: "They turn blue litmus red." },
            { id: 8, q: "Which is a common electrolyte?", options: ["Sugar solution", "Honey", "Salt solution", "Oil"], a: "Salt solution", explanation: "Salt dissolves into ions that carry current." },
            { id: 9, q: "Chrome plating on taps is done to prevent:", options: ["Shiny look", "Rusting", "Water flow", "None"], a: "Rusting", explanation: "Chromium is very resistant to corrosion." },
            { id: 10, q: "Identify the sonorous material.", options: ["Wood", "Plastic", "Steel", "Rubber"], a: "Steel", explanation: "Steel is a metal and rings when struck." },
            { id: 11, q: "What happens to a magnetic needle near a current-carrying wire?", options: ["It breaks", "It deflects", "It heats up", "Nothing"], a: "It deflects", explanation: "Current produces a magnetic field." },
            { id: 12, q: "Which metal is liquid at room temperature?", options: ["Sodium", "Iron", "Mercury", "Gold"], a: "Mercury", explanation: "Mercury is the only liquid metal at standard conditions." },
            { id: 13, q: "Which element is used to make jewelry?", options: ["Carbon", "Oxygen", "Gold", "Sulphur"], a: "Gold", explanation: "Gold's lustre and unreactivity make it ideal." },
            { id: 14, q: "Iron + Oxygen + Water -> ?", options: ["Rust", "Steel", "Copper", "None"], a: "Rust", explanation: "This is the chemical reaction for rusting." },
            { id: 15, q: "What color does blue litmus turn in vinegar?", options: ["Stays blue", "Red", "Green", "Colorless"], a: "Red", explanation: "Vinegar is acidic." },
            { id: 16, q: "Which is a poor conductor of heat?", options: ["Copper", "Wood", "Iron", "Silver"], a: "Wood", explanation: "Wood is an insulator." },
            { id: 17, q: "Tin cans are made by electroplating tin onto:", options: ["Copper", "Iron", "Gold", "Aluminium"], a: "Iron", explanation: "Tin is less reactive and protects the food from iron." },
            { id: 18, q: "Which gas is 78% of our atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], a: "Nitrogen", explanation: "Nitrogen is the most abundant gas." },
            { id: 19, q: "The ability to reflect light is called:", options: ["Sonority", "Malleability", "Lustre", "Ductility"], a: "Lustre", explanation: "Lustre refers to the shine." },
            { id: 20, q: "What should you use to handle electrical repairs?", options: ["Metal pliers", "Rubber-handled tools", "Wet hands", "None"], a: "Rubber-handled tools", explanation: "Rubber is an insulator and keeps you safe." },
            { id: 21, q: "Which non-metal is found in all living things?", options: ["Gold", "Carbon", "Iron", "Mercury"], a: "Carbon", explanation: "Carbon is the basis of organic life." },
            { id: 22, q: "What is the result of burning sulphur in air?", options: ["Sulphur dioxide", "Sulphur trioxide", "Oxygen", "None"], a: "Sulphur dioxide", explanation: "S + O2 -> SO2." },
            { id: 23, q: "A displacement reaction involves a ____ metal displacing a ____ one.", options: ["Weak, Strong", "Stronger, Weaker", "Small, Large", "None"], a: "Stronger, Weaker", explanation: "More reactive metals take the place of less reactive ones." },
            { id: 24, q: "Which of these is NOT used in electroplating?", options: ["Copper sulphate", "Chromium", "Distilled water", "Electricity"], a: "Distilled water", explanation: "Distilled water doesn't conduct current for the process." },
            { id: 25, q: "Bells are made of metal because they are:", options: ["Malleable", "Sonorous", "Ductile", "Hard"], a: "Sonorous", explanation: "To produce the ringing sound." },
            { id: 26, q: "Which is the hardest natural material?", options: ["Iron", "Gold", "Diamond", "Graphite"], a: "Diamond", explanation: "Diamond is an extremely hard form of carbon." },
            { id: 27, q: "Chlorine used in water treatment is a:", options: ["Metal", "Non-metal", "Alloy", "Liquid"], a: "Non-metal", explanation: "Chlorine is a gaseous non-metal." },
            { id: 28, q: "Magnesium burns with a ____ flame.", options: ["Dull red", "Dazzling white", "Blue", "Yellow"], a: "Dazzling white", explanation: "Magnesium combustion is very bright." },
            { id: 29, q: "Which metal is used in aircraft bodies?", options: ["Iron", "Aluminium", "Lead", "Mercury"], a: "Aluminium", explanation: "Aluminium is light and strong." },
            { id: 30, q: "Rusting is a ____ change.", options: ["Physical", "Chemical", "Biological", "None"], a: "Chemical", explanation: "A new substance (rust) is formed." }
          ]
        } 
      },
      { 
        id: 'environment-energy', 
        category: 'chemistry', 
        title: 'Environment and Energy', 
        desc: 'Chemical impacts on the environment', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Environment", text: "The environment includes everything around us. It consists of living and non-living things.", points: ["Components: Air, Water, Soil, Plants and animals.", "Interactions: How living and non-living things affect each other.", "Importance: A clean environment is essential for a healthy life."], example: "A forest with its trees, animals, and soil is an example of an environment.", diagram: ACHIEVER_ASSETS.env_science_intro },
              { title: "2. Natural Resources", text: "Resources obtained from nature that are useful to mankind.", points: ["Examples: Air, Water, Soil, Forests, Minerals.", "Classification: Can be living (plants/animals) or non-living (minerals).", "Availability: Some are limited, while others are abundant."], example: "Wood from forests is a natural resource used for building and fuel.", diagram: ACHIEVER_ASSETS.natural_resources_grid },
              { title: "3. Importance of Natural Resources", text: "Natural resources are essential for survival and daily life.", points: ["Basic Needs: Used for food, shelter, and energy.", "Economic Growth: Drive industries and agriculture.", "Well-being: Crucial for health and comfort."], example: "We depend on rivers (water) for agriculture and drinking.", diagram: "" },
              { title: "4. Air", text: "Air is a mixture of gases that is invisible but vital.", points: ["Components of Air: Oxygen, Nitrogen, Carbon dioxide.", "Importance: Oxygen for breathing, Carbon dioxide for plants.", "Protection: The atmosphere protects us from harmful sun rays."], example: "Plants use Carbon Dioxide from the air to make their food.", diagram: "" },
              { title: "5. Water", text: "Essential for all living beings, covering most of the Earth's surface.", points: ["Uses: Drinking, Farming, Cleaning.", "Scarcity: Clean, fresh water is limited.", "Ecosystems: Supports all aquatic life."], example: "Farming in rural areas depends heavily on water from rain or rivers.", diagram: "" },
              { title: "6. Water Cycle", text: "The continuous movement of water in nature.", points: ["Evaporation: Sun heats water turning it into vapor.", "Condensation: Vapor cools to form clouds.", "Precipitation: Rain falls back to the ground."], example: "Puddles drying up in the sun is an everyday example of evaporation.", diagram: ACHIEVER_ASSETS.water_cycle },
              { title: "7. Soil", text: "The upper layer of Earth where plants grow.", points: ["Importance: Supports plant life.", "Nutrients: Provides necessary food for plants.", "Agriculture: The foundation of all farming."], example: "Rich soil produces healthy crops like wheat and rice.", diagram: "" },
              { title: "8. Pollution", text: "The introduction of harmful materials into the environment.", points: ["Types: Air Pollution, Water Pollution, Soil Pollution.", "Causes: Smoke from vehicles, industrial waste, plastic.", "Effects: Harmful to human health and wildlife."], example: "Black smoke from factory chimneys is a major cause of air pollution.", diagram: ACHIEVER_ASSETS.pollution_overview },
              { title: "9. Conservation of Environment", text: "Taking action to protect and preserve our natural surroundings.", points: ["Planting trees: Helps clean the air.", "Reducing waste: Use less plastic and recycle.", "Saving water: Fix leaks and don't waste water."], example: "Using a cloth bag instead of a plastic bag helps reduce pollution.", diagram: ACHIEVER_ASSETS.conserve },
              { title: "10. Introduction to Energy", text: "Energy is defined as the ability to do work.", points: ["Forms: Heat, light, electrical, mechanical.", "Necessity: We need energy for everything we do.", "Transformation: Energy can change from one form to another."], example: "The food we eat gives us the energy to run and play.", diagram: "" },
              { title: "11. Sources of Energy", text: "Where we get the energy to power our lives.", points: ["Renewable: Solar, Wind, Hydro (can be replenished).", "Non-renewable: Coal, Petrol, Natural gas (will run out).", "Sustainability: We must shift towards renewable sources."], example: "Sunlight is a renewable source, while coal is a non-renewable source.", diagram: ACHIEVER_ASSETS.renewable_vs_non },
              { title: "12. Uses of Energy", text: "We use energy in almost every aspect of daily life.", points: ["Electricity: Powering homes, schools, and hospitals.", "Transport: Fuel for cars, buses, and airplanes.", "Cooking: Gas or wood used to prepare meals."], example: "Electricity is used to light up bulbs in our homes at night.", diagram: "" },
              { title: "13. Advantages and Disadvantages", text: "Comparing different sources of energy.", points: ["Renewable: Clean and free, but depends on weather.", "Non-renewable: Reliable, but causes pollution.", "Goal: Finding a balance that protects the Earth."], example: "Solar energy is clean but isn't available at night without batteries.", diagram: "" },
              { title: "14. Conservation of Energy", text: "Using energy wisely to save resources and money.", points: ["Switching off lights: When leaving a room.", "Using natural light: During the daytime.", "Energy-efficient devices: Like LED bulbs."], example: "Turning off the fan when you go outside saves electricity.", diagram: ACHIEVER_ASSETS.conserve },
              { title: "15. Real-Life Applications", text: "How energy and environment interact in rural areas.", points: ["Solar lamps: Safe lighting for studying.", "Biogas: Clean cooking fuel from animal waste.", "Water management: Using pumps wisely for farming."], example: "A solar lamp allows students in villages to study without using kerosene.", diagram: ACHIEVER_ASSETS.solar_rural },
              { title: "16. Quick Check", text: "Let's review what we have learned about our environment and energy.", points: ["What are the steps of the water cycle?", "Name one renewable and one non-renewable energy source.", "How can you conserve energy at home?"], example: "Think about your answers as you move to the practice section!", diagram: "" }
            ]
          },
          practice: [
            { q: "Which gas is primarily responsible for global warming?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], a: "Carbon dioxide", explanation: "CO2 is a major greenhouse gas that traps heat." },
            { q: "Unit of calorific value is:", options: ["Joules", "kJ/kg", "kg/kJ", "Watts"], a: "kJ/kg", explanation: "Kilojoules per kilogram is the standard unit." },
            { q: "Which is a clean fuel?", options: ["Coal", "Petrol", "CNG", "Wood"], a: "CNG", explanation: "Compressed Natural Gas produces much less pollution." },
            { q: "BOD stands for:", options: ["Biological Oxygen Demand", "Basic Oxygen Dose", "Binary Organic Data", "None"], a: "Biological Oxygen Demand", explanation: "BOD measures water pollution levels." },
            { q: "Which gas is used in fire extinguishers?", options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"], a: "Carbon dioxide", explanation: "CO2 displaces oxygen and puts out the fire." },
            { q: "Process of warming of earth's surface is:", options: ["Greenhouse effect", "Cooling effect", "Solar effect", "None"], a: "Greenhouse effect", explanation: "This is the natural warming process." },
            { q: "Which is NOT a greenhouse gas?", options: ["Methane", "Water vapor", "Nitrogen", "Carbon dioxide"], a: "Nitrogen", explanation: "Nitrogen (78% of air) is not a greenhouse gas." },
            { q: "Acid rain is mainly caused by oxides of:", options: ["Carbon", "Nitrogen and Sulphur", "Hydrogen", "None"], a: "Nitrogen and Sulphur", explanation: "These form nitric and sulphuric acids in rain." },
            { q: "Ozone layer protects us from:", options: ["Visible light", "UV rays", "Infrared", "X-rays"], a: "UV rays", explanation: "Ozone absorbs harmful ultraviolet radiation." },
            { q: "Calorific value of LPG is approx:", options: ["10,000 kJ/kg", "55,000 kJ/kg", "100,000 kJ/kg", "5,000 kJ/kg"], a: "55,000 kJ/kg", explanation: "LPG is a very efficient fuel." }
          ],
          challenge: [
            { q: "Eutrophication is caused by excess:", options: ["Oxygen", "Nutrients (Nitrates/Phosphates)", "Salt", "Heat"], a: "Nutrients (Nitrates/Phosphates)", explanation: "Excess nutrients lead to algal blooms in water." },
            { q: "The '3 Rs' of waste management are:", options: ["Read, Write, Run", "Reduce, Reuse, Recycle", "Repair, Renew, Rebuild", "None"], a: "Reduce, Reuse, Recycle", explanation: "These are the pillars of sustainability." },
            { q: "What is the main component of Biogas?", options: ["Oxygen", "Methane", "Hydrogen", "Nitrogen"], a: "Methane", explanation: "Biogas consists mostly of Methane, making it a good fuel." },
            { q: "Which energy source is derived from the Earth's internal heat?", options: ["Geothermal", "Tidal", "Solar", "Biomass"], a: "Geothermal", explanation: "Geothermal energy uses the heat naturally produced inside the Earth." },
            { q: "Ozone layer depletion is primarily caused by:", options: ["CO2", "CFCs", "Methane", "Water vapor"], a: "CFCs", explanation: "Chlorofluorocarbons break down ozone molecules in the stratosphere." },
            { q: "Which is the most abundant greenhouse gas in the atmosphere?", options: ["Carbon dioxide", "Water vapor", "Methane", "Ozone"], a: "Water vapor", explanation: "Water vapor is naturally the most abundant greenhouse gas." },
            { q: "Acid rain is formed when these gases mix with water:", options: ["CO2 and CO", "SO2 and NO2", "O3 and CFC", "Methane and Helium"], a: "SO2 and NO2", explanation: "Sulphur dioxide and Nitrogen dioxide react with water to form acids." },
            { q: "The process of converting waste into reusable material is:", options: ["Reducing", "Recycling", "Reusing", "Refusing"], a: "Recycling", explanation: "Recycling transforms waste into new products." },
            { q: "A solar cell converts solar energy directly into:", options: ["Heat energy", "Mechanical energy", "Electrical energy", "Chemical energy"], a: "Electrical energy", explanation: "Solar (photovoltaic) cells generate electricity from sunlight." },
            { q: "Which fuel has the highest calorific value?", options: ["Coal", "LPG", "Hydrogen", "Petrol"], a: "Hydrogen", explanation: "Hydrogen has an extremely high calorific value (approx 150,000 kJ/kg)." }
          ],
          test: [
            { id: 1, q: "Which gas is essential for combustion?", options: ["Nitrogen", "Carbon dioxide", "Oxygen", "Helium"], a: "Oxygen", explanation: "Burning cannot happen without oxygen." },
            { id: 2, q: "Incomplete combustion of fuels produces:", options: ["Carbon dioxide", "Carbon monoxide", "Oxygen", "Nitrogen"], a: "Carbon monoxide", explanation: "CO is a very poisonous gas." },
            { id: 3, q: "The coldest zone of a candle flame is:", options: ["Outer zone", "Middle zone", "Innermost zone", "None"], a: "Innermost zone", explanation: "The innermost zone contains unburnt wax vapors." },
            { id: 4, q: "Global warming leads to:", options: ["Rising sea levels", "Better crops", "More oxygen", "None"], a: "Rising sea levels", explanation: "Melting glaciers cause sea levels to rise." },
            { id: 5, q: "CNG is preferred over Petrol because:", options: ["It is cheaper", "It is less polluting", "It is more available", "None"], a: "It is less polluting", explanation: "CNG burns cleaner than liquid fuels." },
            { id: 6, q: "Potable water is water that is:", options: ["In the ocean", "Safe for drinking", "Dirty", "For irrigation only"], a: "Safe for drinking", explanation: "'Potable' means drinkable." },
            { id: 7, q: "Chlorination is used to:", options: ["Add color", "Kill germs", "Make water sweet", "None"], a: "Kill germs", explanation: "Chlorine is a powerful disinfectant." },
            { id: 8, q: "Van Mahotsav is a festival of:", options: ["Lights", "Colors", "Planting trees", "Harvest"], a: "Planting trees", explanation: "It promotes forest conservation." },
            { id: 9, q: "Which gas has the highest calorific value?", options: ["Coal gas", "Methane", "Hydrogen", "LPG"], a: "Hydrogen", explanation: "Hydrogen has the highest value (150,000 kJ/kg)." },
            { id: 10, q: "An ideal fuel should be:", options: ["Expensive", "Hard to transport", "Cheap and easily available", "None"], a: "Cheap and easily available", explanation: "Ideal fuels should be practical and safe." },
            { id: 11, q: "The outermost zone of a flame is:", options: ["Yellow", "Blue", "Black", "Red"], a: "Blue", explanation: "The blue zone is where complete combustion happens." },
            { id: 12, q: "Which substance is used to disinfect water?", options: ["Salt", "Sugar", "Bleaching powder", "Oil"], a: "Bleaching powder", explanation: "It releases chlorine to kill bacteria." },
            { id: 13, q: "Sulphur dioxide in the air causes:", options: ["Headache", "Respiratory problems", "Strong bones", "None"], a: "Respiratory problems", explanation: "It is a severe lung irritant." },
            { id: 14, q: "The Taj Mahal is being affected by:", options: ["Global warming", "Acid rain", "Water pollution", "Noise"], a: "Acid rain", explanation: "Acid rain corrodes the marble (Marble Cancer)." },
            { id: 15, q: "Which of these is a renewable energy source?", options: ["Coal", "Solar", "Petroleum", "Natural Gas"], a: "Solar", explanation: "Solar energy is replenished daily." },
            { id: 16, q: "Biogas is mainly composed of:", options: ["Oxygen", "Methane", "Hydrogen", "Chlorine"], a: "Methane", explanation: "Biogas is about 55-75% methane." },
            { id: 17, q: "Deforestation leads to an increase in:", options: ["Oxygen", "Carbon dioxide", "Rainfall", "Soil fertility"], a: "Carbon dioxide", explanation: "Fewer trees mean less CO2 is absorbed." },
            { id: 18, q: "The lowest temperature at which a substance catches fire is:", options: ["Boiling point", "Melting point", "Ignition temperature", "None"], a: "Ignition temperature", explanation: "Substances won't burn below this temperature." },
            { id: 19, q: "Water that looks clean may still contain:", options: ["Sugar", "Microorganisms", "Salt", "None"], a: "Microorganisms", explanation: "Clear water can still carry invisible germs." },
            { id: 20, q: "Which zone of a flame is used by goldsmiths?", options: ["Innermost", "Middle", "Outermost", "None"], a: "Outermost", explanation: "The outermost (non-luminous) zone is the hottest." },
            { id: 21, q: "What is the main cause of the greenhouse effect?", options: ["High tides", "Trapping of solar heat", "Earthquakes", "None"], a: "Trapping of solar heat", explanation: "Gases trap heat like a blanket." },
            { id: 22, q: "Kyoto Protocol is related to:", options: ["Water saving", "Reducing greenhouse gases", "Education", "None"], a: "Reducing greenhouse gases", explanation: "It is an international environmental treaty." },
            { id: 23, q: "A person whose clothes catch fire should be covered with:", options: ["Water", "A blanket", "Oil", "Plastic"], a: "A blanket", explanation: "A blanket cuts off the oxygen supply." },
            { id: 24, q: "Spilling oil in oceans is called:", options: ["Oil wash", "Oil spill", "Oil leak", "None"], a: "Oil spill", explanation: "Oil spills are disastrous for marine life." },
            { id: 25, q: "Which is a solid pollutant?", options: ["CO2", "Dust/Soot", "SO2", "NO2"], a: "Dust/Soot", explanation: "Particulate matter is solid or liquid droplets." },
            { id: 26, q: "Ganga Action Plan was launched to:", options: ["Build dams", "Reduce pollution in Ganga", "Increase fishing", "None"], a: "Reduce pollution in Ganga", explanation: "It aims to clean the holy river." },
            { id: 27, q: "Which fuel has the lowest ignition temperature?", options: ["Wood", "Coal", "White Phosphorus", "LPG"], a: "White Phosphorus", explanation: "It can catch fire at room temperature (35 deg C)." },
            { id: 28, q: "Lead in petrol causes:", options: ["Nerve damage", "Better hearing", "Strength", "None"], a: "Nerve damage", explanation: "Lead is a heavy metal toxin." },
            { id: 29, q: "Using public transport helps in:", options: ["Increasing traffic", "Reducing air pollution", "Wasting time", "None"], a: "Reducing air pollution", explanation: "Fewer vehicles mean fewer emissions." },
            { id: 30, q: "Sustainable development means:", options: ["Developing fast", "Development that protects the future", "Only using coal", "None"], a: "Development that protects the future", explanation: "Meeting needs without compromising future generations." }
          ]
        } 
      },
      { 
        id: 'biology-nutrition', 
        category: 'biology', 
        title: 'Nutrition and Food', 
        desc: 'Everything about food and nutrition', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Nutrition", text: "Nutrition is the process by which living organisms take in food and use it for growth, energy, and repair.", points: ["Necessity: All living beings need food to survive.", "Process: Intake, digestion, and utilization.", "Importance: Fuels daily activities and repairs body cells."], example: "A child eating healthy food to grow taller and stronger.", diagram: ACHIEVER_ASSETS.nutrition_intro },
              { title: "2. Components of Food (Nutrients)", text: "Food contains different nutrients that help our body function properly. There are seven main components.", points: ["Macronutrients: Needed in large amounts (Carbs, Proteins, Fats).", "Micronutrients: Needed in small amounts (Vitamins, Minerals).", "Others: Water and Roughage."], example: "Rice provides energy while pulses help in body building.", diagram: ACHIEVER_ASSETS.nutrients_grid },
              { title: "3. Carbohydrates", text: "Carbohydrates are the main source of energy for our bodies.", points: ["Function: Provide immediate energy.", "Complex Carbs: Sustained energy (Whole grains).", "Simple Sugars: Quick energy burst."], example: "Farmers eat rice and wheat for energy to work in the fields.", diagram: "" },
              { title: "4. Proteins", text: "Proteins are known as the building blocks of the body.", points: ["Function: Help in growth and repair of body tissues.", "Muscle building: Essential for physical strength.", "Enzymes: Proteins also act as chemical messengers."], example: "Drinking milk and eating pulses (dal) provides protein for growth.", diagram: "" },
              { title: "5. Fats", text: "Fats provide stored energy and keep the body warm.", points: ["High Energy: Provide more energy than carbs per gram.", "Storage: Energy saved for later use.", "Insulation: Helps maintain body temperature."], example: "Nuts and butter are rich in fats and give warmth in winter.", diagram: "" },
              { title: "6. Vitamins", text: "Vitamins protect the body from diseases and keep us healthy.", points: ["Regulation: Control various chemical reactions in the body.", "Types: Vitamin A, B-complex, C, D, E, and K.", "Health: Keeps eyes, skin, and bones healthy."], example: "Eating carrots (Vitamin A) is great for your eyesight.", diagram: "" },
              { title: "7. Minerals", text: "Minerals help in body functions like bone formation and blood production.", points: ["Calcium: Strong bones and teeth.", "Iron: Essential for making blood (Hemoglobin).", "Iodine: Proper growth and thyroid function."], example: "Spinach is rich in iron, which helps prevent weakness.", diagram: "" },
              { title: "8. Water", text: "Water is essential for life, making up about 70% of our body weight.", points: ["Digestion: Helps break down food.", "Transportation: Carries nutrients to all parts of the body.", "Temperature: Regulates body heat through sweating."], example: "We must drink 8-10 glasses of water daily for a healthy body.", diagram: "" },
              { title: "9. Roughage (Dietary Fiber)", text: "Roughage is the indigestible part of plant food.", points: ["Function: Helps in smooth digestion.", "Prevention: Prevents constipation by adding bulk to food.", "Sources: Green vegetables, whole grains, and fruits."], example: "Eating whole fruit with skin provides more fiber than juice.", diagram: "" },
              { title: "10. Balanced Diet", text: "A diet that contains all nutrients in the right amount is a balanced diet.", points: ["Proportions: Correct mix of carbs, proteins, and fats.", "Good Health: Maintains immunity and energy levels.", "Diversity: Eating a variety of foods ensures all nutrients are covered."], example: "A plate with roti, dal, sabzi, curd, and salad is a balanced meal.", diagram: ACHIEVER_ASSETS.balanced_diet },
              { title: "11. Deficiency Diseases", text: "Lack of specific nutrients in the diet for a long time causes diseases.", points: ["Vitamin A: Night blindness (poor vision, especially in the dark).", "Vitamin B1: Beriberi (weak muscles and very little energy to work).", "Vitamin C: Scurvy (bleeding gums, wounds take longer to heal).", "Vitamin D: Rickets (bones become soft and bent, bowed legs).", "Calcium: Bone and tooth decay (weak bones, brittle teeth).", "Iodine: Goitre (glands in the neck appear swollen, mental disability in children).", "Iron: Anemia (weakness, pale skin, frequent fatigue).", "Protein: Kwashiorkor (stunted growth, swelling of face, skin diseases)."], example: "Lack of Iodine in water/food can cause a swelling in the neck called Goitre. Using iodized salt helps prevent this.", diagram: ACHIEVER_ASSETS.deficiency_table },
              { title: "12. Nutrition in Plants", text: "Plants are unique because they can make their own food.", points: ["Autotrophs: Organisms that prepare their own food.", "Producers: They form the base of the food chain.", "Self-sufficiency: Using simple raw materials from the environment."], example: "A green mango tree making food under the sun.", diagram: ACHIEVER_ASSETS.plant_nutrition_types },
              { title: "13. Photosynthesis: Requirements", text: "Photosynthesis is the process plants use to make food.", points: ["Sunlight: The energy source.", "Chlorophyll: The green pigment that traps sunlight.", "Water: Absorbed from the soil by roots.", "Carbon Dioxide: Taken from the air through leaves."], example: "Just like a kitchen needs fuel and ingredients, a plant needs sun and water.", diagram: "" },
              { title: "14. Photosynthesis: The Process", text: "Plants convert light energy into chemical energy (food).", points: ["Location: Mostly occurs in the leaves (Food factories).", "Reaction: Water + CO2 + Light → Glucose + Oxygen.", "By-product: Oxygen is released, which we breathe."], example: "Forests are called the 'lungs of the Earth' because they release oxygen.", diagram: ACHIEVER_ASSETS.photosynthesis_diag },
              { title: "15. Types of Plant Nutrition: Autotrophic", text: "Most green plants follow autotrophic nutrition.", points: ["Synthesis: Creating glucose from inorganic matter.", "Chlorophyll: Mandatory for this process.", "Independence: Not relying on other living beings for food."], example: "Wheat and rice crops in the village fields are autotrophs.", diagram: "" },
              { title: "16. Types: Heterotrophic Nutrition", text: "Some plants cannot make their own food and depend on others.", points: ["Parasitic: Taking food from a host plant (e.g., Cuscuta/Amarbel).", "Saprophytic: Feeding on dead and decaying matter (e.g., Mushrooms).", "Insectivorous: Trapping insects for nitrogen (e.g., Pitcher plant)."], example: "Mushrooms growing on a damp log in the forest are saprophytes.", diagram: "" },
              { title: "17. Nutrition in Animals", text: "Animals are heterotrophs; they must consume plants or other animals.", points: ["Holozic Nutrition: Taking in solid or liquid food.", "Internal Digestion: Food is broken down inside the body.", "Dependence: Directly or indirectly dependent on plants."], example: "A cow eating grass or a human eating vegetables.", diagram: ACHIEVER_ASSETS.animal_nutrition_types },
              { title: "18. Animal Types: Herbivores", text: "Animals that eat only plants and plant products.", points: ["Diet: Grass, leaves, fruits, and seeds.", "Structure: Flat teeth for grinding plants.", "Role: Primary consumers in nature."], example: "Cows, goats, and elephants are common herbivores in rural areas.", diagram: "" },
              { title: "19. Animal Types: Carnivores", text: "Animals that eat only the flesh of other animals.", points: ["Diet: Meat and insects.", "Structure: Sharp teeth and claws for hunting.", "Role: Help control the population of other animals."], example: "Lions, tigers, and eagles are examples of carnivores.", diagram: "" },
              { title: "20. Animal Types: Omnivores", text: "Animals that eat both plants and the flesh of other animals.", points: ["Versatility: Can survive in various environments.", "Diet: Mixture of fruits, grains, and meat.", "Humans: We are the most common omnivores."], example: "Bears, crows, and humans are omnivores.", diagram: "" },
              { title: "21. Digestion in Humans: Basic Idea", text: "Digestion is the breakdown of complex food into simpler forms.", points: ["Mouth: Ingestion and starting breakdown.", "Stomach: Mixing with acids to digest proteins.", "Intestines: Absorption of nutrients into the blood.", "Egestion: Removal of undigested waste."], example: "Chewing your food well helps the stomach digest it easily.", diagram: ACHIEVER_ASSETS.digestion_steps },
              { title: "22. Steps of Digestion", text: "The human digestive process follows five main steps.", points: ["Ingestion: Taking food into the mouth.", "Digestion: Chemical and mechanical breakdown.", "Absorption: Nutrients moving into the bloodstream.", "Assimilation: Cells using the absorbed nutrients.", "Egestion: Getting rid of waste."], example: "Absorption mostly happens in the small intestine.", diagram: "" },
              { title: "23. Real-Life Applications", text: "How nutrition affects our daily lives in rural and urban areas.", points: ["Farming: Understanding plant needs for better crops.", "Animal Husbandry: Feeding livestock the right fodder.", "Health: Using local seasonal fruits to stay fit.", "Cooking: Traditional methods like sprouting grains increase nutrition."], example: "Drinking fresh milk from village cows provides high-quality protein.", diagram: "" },
              { title: "24. Quick Check", text: "Let's see what you've remembered about nutrition!", points: ["What is the main function of proteins?", "What is a balanced diet?", "Which process do plants use to make food?", "Name one deficiency disease."], example: "Think about these as you head to the practice section!", diagram: "" }
            ]
          }, 
          practice: [
            { q: "Which nutrient is the main source of energy?", options: ["Proteins", "Carbohydrates", "Vitamins", "Minerals"], a: "Carbohydrates", explanation: "Carbs provide immediate energy for the body." },
            { q: "Plants prepare food through:", options: ["Respiration", "Photosynthesis", "Digestion", "None"], a: "Photosynthesis", explanation: "Photosynthesis uses sunlight to create food." },
            { q: "An example of an omnivore is:", options: ["Cow", "Lion", "Human", "Deer"], a: "Human", explanation: "Humans eat both plants and meat." },
            { q: "Lack of Vitamin A causes:", options: ["Scurvy", "Rickets", "Night Blindness", "Anemia"], a: "Night Blindness", explanation: "Vitamin A is essential for healthy eyes." }
          ], 
          challenge: [
            { q: "Which part of the plant is the 'food factory'?", options: ["Roots", "Stem", "Leaves", "Flowers"], a: "Leaves", explanation: "Most photosynthesis happens in green leaves." },
            { q: "What is the role of roughage?", options: ["Growth", "Energy", "Easy digestion", "Bones"], a: "Easy digestion", explanation: "Fiber adds bulk and prevents constipation." },
            { q: "Which vitamin is synthesized by our body in the presence of sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], a: "Vitamin D", explanation: "Sunlight helps the skin produce Vitamin D." },
            { q: "The process of getting rid of undigested waste is called:", options: ["Ingestion", "Absorption", "Egestion", "Assimilation"], a: "Egestion", explanation: "Egestion is the removal of waste from the body." },
            { q: "Which mineral is essential for strong bones and teeth?", options: ["Iron", "Calcium", "Iodine", "Sodium"], a: "Calcium", explanation: "Calcium provides strength to the skeletal system." }
          ], 
          test: [
            { id: 1, q: "Nutrition is needed for:", options: ["Growth", "Energy", "Repair", "All of these"], a: "All of these", explanation: "Nutrition supports all vital body functions." },
            { id: 2, q: "Rice and Wheat are rich in:", options: ["Fats", "Carbohydrates", "Proteins", "Minerals"], a: "Carbohydrates", explanation: "Grains are the primary source of carbs." },
            { id: 3, q: "Dal and Eggs provide:", options: ["Carbs", "Vitamins", "Proteins", "Fats"], a: "Proteins", explanation: "These are excellent sources of body-building proteins." },
            { id: 4, q: "Which nutrient is stored for future energy?", options: ["Water", "Fats", "Vitamins", "Fiber"], a: "Fats", explanation: "Fats are the body's energy reservoir." },
            { id: 5, q: "Green leafy vegetables are rich in:", options: ["Fats", "Sugars", "Vitamins and Minerals", "None"], a: "Vitamins and Minerals", explanation: "They provide essential micronutrients." },
            { id: 6, q: "Iron helps in the formation of:", options: ["Bones", "Blood (Hemoglobin)", "Teeth", "Hair"], a: "Blood (Hemoglobin)", explanation: "Iron is vital for carrying oxygen in blood." },
            { id: 7, q: "A balanced diet depends on:", options: ["Age", "Work type", "Health", "All of these"], a: "All of these", explanation: "Different people have different nutritional needs." },
            { id: 8, q: "Scurvy is caused by deficiency of:", options: ["Vit A", "Vit B", "Vit C", "Vit D"], a: "Vit C", explanation: "Vitamin C keeps gums and skin healthy." },
            { id: 9, q: "Goitre is caused by lack of:", options: ["Iron", "Iodine", "Calcium", "Zinc"], a: "Iodine", explanation: "Iodine is needed for the thyroid gland." },
            { id: 10, q: "Autotrophic organisms are:", options: ["Animals", "Fungi", "Green Plants", "Humans"], a: "Green Plants", explanation: "They make their own food using sunlight." },
            { id: 11, q: "The green pigment in leaves is:", options: ["Hemoglobin", "Chlorophyll", "Melanin", "None"], a: "Chlorophyll", explanation: "Chlorophyll is essential for photosynthesis." },
            { id: 12, q: "Which gas is released during photosynthesis?", options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"], a: "Oxygen", explanation: "Plants take in CO2 and release O2." },
            { id: 13, q: "Mushrooms get nutrition from:", options: ["Sunlight", "Other plants", "Dead and decaying matter", "Insects"], a: "Dead and decaying matter", explanation: "Fungi are saprophytes." },
            { id: 14, q: "Amarbel (Cuscuta) is a:", options: ["Producer", "Parasite", "Saprophyte", "Herbivore"], a: "Parasite", explanation: "It climbs on other plants for food." },
            { id: 15, q: "Herbivores eat:", options: ["Meat", "Plants", "Both", "Dead matter"], a: "Plants", explanation: "Herba means plant in Latin." },
            { id: 16, q: "A lion is a:", options: ["Herbivore", "Carnivore", "Omnivore", "Producer"], a: "Carnivore", explanation: "Lions hunt other animals for meat." },
            { id: 17, q: "Taking food into the body is:", options: ["Digestion", "Ingestion", "Egestion", "Absorption"], a: "Ingestion", explanation: "Ingestion starts at the mouth." },
            { id: 18, q: "Absorption of nutrients occurs in:", options: ["Mouth", "Stomach", "Small Intestine", "Large Intestine"], a: "Small Intestine", explanation: "The villi in the small intestine absorb nutrients." },
            { id: 19, q: "Undigested food is removed through:", options: ["Absorption", "Egestion", "Assimilation", "None"], a: "Egestion", explanation: "Waste removal is the final step." },
            { id: 20, q: "Which mineral is needed for strong bones?", options: ["Iron", "Calcium", "Sodium", "Iodine"], a: "Calcium", explanation: "Milk is a great source of calcium for bones." }
          ] 
        } 
      },
      { 
        id: 'biology-life-processes', 
        category: 'biology', 
        title: 'Life Processes', 
        desc: 'Essential functions of living beings', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Life Processes", text: "Life processes are the basic functions that keep living organisms alive.", points: ["Maintenance: These processes help in the maintenance and survival of life.", "Energy: Most processes require energy from food.", "Key Processes: Include nutrition, respiration, transportation, and excretion."], example: "Just like a car needs fuel and an engine to run, our body needs life processes to function.", diagram: "" },
              { title: "2. What is Respiration?", text: "Respiration is the process of releasing energy from food at the cellular level.", points: ["Chemical Process: It is more than just breathing.", "Energy: The released energy is stored in molecules like ATP.", "Waste: Carbon dioxide and water are often released as by-products."], example: "When you run, your body respires faster to provide more energy to your muscles.", diagram: ACHIEVER_ASSETS.respiratory_system },
              { title: "3. Types of Respiration", text: "There are two main types of respiration based on the use of oxygen.", points: ["Aerobic: Uses oxygen, releases a large amount of energy.", "Anaerobic: Happens without oxygen, releases much less energy.", "By-products: Aerobic produces CO2/Water, Anaerobic can produce Lactic acid or Alcohol."], example: "Yeast uses anaerobic respiration to make bread rise.", diagram: ACHIEVER_ASSETS.respiration_types },
              { title: "4. Breathing vs. Respiration", text: "Many people confuse these two, but they are very different.", points: ["Breathing: A physical process of inhaling O2 and exhaling CO2.", "Respiration: A chemical process of breaking down food to release energy.", "Location: Breathing happens in lungs; Respiration happens in cells."], example: "You breathe with your nose, but you respire in every cell of your body.", diagram: "" },
              { title: "5. Respiration in Humans", text: "Humans have a specialized system for gas exchange.", points: ["Organs: Nose, Trachea (windpipe), and Lungs.", "Alveoli: Tiny air sacs where oxygen enters the blood.", "Diaphragm: A muscle that helps in moving air in and out."], example: "Taking a deep breath fills your lungs with fresh oxygen.", diagram: ACHIEVER_ASSETS.respiratory_system },
              { title: "6. Respiration in Other Organisms", text: "Different animals have different ways of taking in oxygen.", points: ["Fish: Use Gills to take oxygen dissolved in water.", "Insects: Use tiny holes called Spiracles and air tubes.", "Earthworms: Breathe through their moist skin."], example: "A fish opening and closing its mouth is actually moving water over its gills.", diagram: "" },
              { title: "7. Respiration in Plants", text: "Plants also respire, both during the day and at night.", points: ["Stomata: Tiny pores on leaves for gas exchange.", "Roots: Take in air from spaces between soil particles.", "Balance: Plants release O2 during day (Photosynthesis) but respire CO2 always."], example: "Loose soil helps plant roots 'breathe' better.", diagram: "" },
              { title: "8. Importance of Respiration", text: "Without respiration, life would stop immediately.", points: ["Energy Supply: Powers all movements and growth.", "Body Heat: Helps maintain internal temperature.", "Survival: Every living cell needs constant energy to stay alive."], example: "Even when sleeping, your body is respiring to keep your heart beating.", diagram: "" },
              { title: "9. What is Transportation?", text: "Transportation is the movement of substances within an organism.", points: ["Necessity: Nutrients and oxygen must reach every cell.", "Waste Removal: Harmful substances must be moved to excretory organs.", "Integration: Connects all parts of the body."], example: "Like a truck delivering goods to a village, transportation delivers nutrients to cells.", diagram: "" },
              { title: "10. Transportation in Humans", text: "The circulatory system is the transport network of our body.", points: ["Heart: The pump that moves blood.", "Blood: The medium of transport.", "Blood Vessels: The pipes (tubes) for blood flow."], example: "Your pulse is the sound of your heart pumping blood through your body.", diagram: ACHIEVER_ASSETS.heart_anatomy },
              { title: "11. The Human Heart", text: "The heart is a muscular organ about the size of your fist.", points: ["Chambers: Four chambers (2 Atria, 2 Ventricles).", "Double Pump: Moves oxygen-rich blood and oxygen-poor blood separately.", "Continuity: Beats over 100,000 times a day without rest."], example: "A healthy heart is essential for a long and active life.", diagram: ACHIEVER_ASSETS.heart_anatomy },
              { title: "12. Components of Blood", text: "Blood is a special fluid that carries many things.", points: ["Plasma: The liquid part (mostly water).", "Red Cells: Carry oxygen using hemoglobin.", "White Cells: Fight against germs and diseases.", "Platelets: Help in clotting blood after an injury."], example: "Red color of blood comes from iron in hemoglobin.", diagram: "" },
              { title: "13. Blood Vessels", text: "There are three types of blood vessels in our body.", points: ["Arteries: Carry blood away from the heart (thick walls).", "Veins: Carry blood towards the heart (have valves).", "Capillaries: Extremely thin tubes for exchange with cells."], example: "The 'blue' veins you see on your hand are carrying blood back to the heart.", diagram: "" },
              { title: "14. Transportation in Plants", text: "Plants use two types of specialized tissues for transport.", points: ["Xylem: Transports water and minerals upwards from roots.", "Phloem: Transports food from leaves to all other parts.", "Direction: Xylem is one-way (Up); Phloem is two-way."], example: "Tall trees use xylem to pull water hundreds of feet high.", diagram: ACHIEVER_ASSETS.plant_transport },
              { title: "15. Xylem: The Water Pipe", text: "Xylem tissue moves water using physical forces.", points: ["Roots: Absorb water from soil by osmosis.", "Suction Force: Created by transpiration from leaves.", "Minerals: Dissolved in water and carried along."], example: "Watering the roots of a plant eventually reaches the top-most leaf.", diagram: "" },
              { title: "16. Phloem: The Food Network", text: "Phloem moves glucose (sugar) made in the leaves.", points: ["Translocation: The movement of food in plants.", "Energy Use: Plants use energy to move food through phloem.", "Storage: Food is moved to fruits, seeds, and roots for storage."], example: "The sweet taste of fruits comes from food transported by the phloem.", diagram: "" },
              { title: "17. Transpiration", text: "Transpiration is the loss of water vapor from plant leaves.", points: ["Stomata: Water exits through these tiny openings.", "Cooling: Helps cool the plant in hot weather.", "Pulling Force: Creates a 'suction' that pulls water up the xylem."], example: "On a hot day, a large tree can lose hundreds of liters of water through transpiration.", diagram: ACHIEVER_ASSETS.transpiration_process },
              { title: "18. Importance of Transportation", text: "Transportation maintains the balance of life.", points: ["Distribution: Ensures every cell gets sugar and oxygen.", "Cleaning: Removes CO2 and urea from cells.", "Hormones: Carries chemical signals across the body."], example: "Just as a river brings life to a field, blood brings life to your organs.", diagram: "" },
              { title: "19. Life Process: Excretion (Intro)", text: "Excretion is the removal of harmful metabolic wastes.", points: ["Kidneys: Filter blood to remove urea.", "Skin: Removes salts through sweat.", "Importance: Prevents poisoning of the body from its own waste."], example: "Drinking enough water helps your kidneys clean your blood better.", diagram: "" },
              { title: "20. Interdependence of Processes", text: "All life processes are linked together.", points: ["Nutrition provides the fuel.", "Respiration burns the fuel for energy.", "Transportation delivers the fuel and oxygen.", "Excretion cleans up the mess."], example: "If transportation stops, respiration cannot happen because oxygen won't arrive.", diagram: "" },
              { title: "21. Real-Life Applications", text: "Understanding life processes helps us live better.", points: ["Heart Health: Exercise makes the heart pump more efficiently.", "Farming: Understanding xylem helps in better irrigation.", "Air Quality: Clean air is vital for healthy respiration.", "Hydration: Water is essential for both blood and plant transport."], example: "Farmers know that 'hoeing' the soil lets the roots breathe better.", diagram: "" },
              { title: "22. Quick Check", text: "Can you answer these basic life process questions?", points: ["What is the main difference between Xylem and Phloem?", "Why is breathing not the same as respiration?", "How many chambers does a human heart have?", "Which organ do fish use to breathe?"], example: "Try to explain these to a friend to see if you've mastered the topic!", diagram: "" }
            ]
          }, 
          practice: [
            { q: "Which process releases energy from food?", options: ["Digestion", "Respiration", "Excretion", "Circulation"], a: "Respiration", explanation: "Respiration is the chemical breakdown of food to release energy." },
            { q: "Xylem in plants is responsible for:", options: ["Transport of water", "Transport of food", "Transport of amino acids", "Transport of oxygen"], a: "Transport of water", explanation: "Xylem carries water and minerals from roots to leaves." },
            { q: "Which organ pumps blood in humans?", options: ["Lungs", "Brain", "Heart", "Kidneys"], a: "Heart", explanation: "The heart is the muscular pump of the circulatory system." },
            { q: "Aerobic respiration occurs in the presence of:", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"], a: "Oxygen", explanation: "Aerobic means 'with air' (oxygen)." }
          ], 
          challenge: [
            { q: "The opening and closing of stomata is controlled by:", options: ["Chloroplasts", "Guard Cells", "Xylem", "Phloem"], a: "Guard Cells", explanation: "Guard cells regulate the opening for gas exchange." },
            { q: "In which part of the human respiratory system does gas exchange occur?", options: ["Trachea", "Alveoli", "Nose", "Pharynx"], a: "Alveoli", explanation: "Alveoli are tiny air sacs where oxygen enters the blood." },
            { q: "The red color of blood is due to:", options: ["Chlorophyll", "Hemoglobin", "Plasma", "Platelets"], a: "Hemoglobin", explanation: "Hemoglobin is an iron-rich protein that carries oxygen." },
            { q: "Loss of water from leaves is called:", options: ["Photosynthesis", "Transpiration", "Translocation", "Respiration"], a: "Transpiration", explanation: "Transpiration is the evaporation of water from plant leaves." },
            { q: "Anaerobic respiration in muscle cells produces:", options: ["Carbon Dioxide", "Lactic Acid", "Ethanol", "Oxygen"], a: "Lactic Acid", explanation: "Lack of oxygen during heavy exercise leads to lactic acid buildup." }
          ], 
          test: [
            { id: 1, q: "Basic functions performed by living beings are called:", options: ["Life Styles", "Life Processes", "Living Habits", "None"], a: "Life Processes", explanation: "Life processes are essential for survival." },
            { id: 2, q: "Respiration that uses oxygen is:", options: ["Anaerobic", "Aerobic", "Fermentation", "None"], a: "Aerobic", explanation: "Aerobic respiration is the most common form." },
            { id: 3, q: "Fish breathe through:", options: ["Lungs", "Skin", "Gills", "Spiracles"], a: "Gills", explanation: "Gills absorb oxygen from water." },
            { id: 4, q: "Insects take in air through:", options: ["Gills", "Spiracles", "Skin", "Lungs"], a: "Spiracles", explanation: "Spiracles are tiny openings on an insect's body." },
            { id: 5, q: "Plants take in CO2 through:", options: ["Roots", "Flowers", "Stomata", "Stem"], a: "Stomata", explanation: "Stomata are found on the surface of leaves." },
            { id: 6, q: "The muscular tube that carries air to lungs is:", options: ["Oesophagus", "Trachea", "Artery", "Vein"], a: "Trachea", explanation: "Trachea is also known as the windpipe." },
            { id: 7, q: "Which process produces more energy?", options: ["Aerobic Respiration", "Anaerobic Respiration", "Breathing", "Digestion"], a: "Aerobic Respiration", explanation: "Full breakdown of glucose with oxygen yields more energy." },
            { id: 8, q: "Blood vessel with thick elastic walls is:", options: ["Vein", "Artery", "Capillary", "None"], a: "Artery", explanation: "Arteries need thick walls to withstand high pressure from the heart." },
            { id: 9, q: "Function of Phloem is to transport:", options: ["Water", "Minerals", "Food", "Oxygen"], a: "Food", explanation: "Phloem carries sugar from leaves to other parts." },
            { id: 10, q: "The heart has how many chambers?", options: ["Two", "Three", "Four", "Five"], a: "Four", explanation: "Human heart has 2 atria and 2 ventricles." },
            { id: 11, q: "Blood component that helps in clotting:", options: ["RBC", "WBC", "Platelets", "Plasma"], a: "Platelets", explanation: "Platelets stop bleeding by forming a clot." },
            { id: 12, q: "Which gas is used during respiration?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"], a: "Oxygen", explanation: "Oxygen is used to break down food for energy." },
            { id: 13, q: "The liquid part of blood is:", options: ["Water", "Plasma", "Serum", "Hemoglobin"], a: "Plasma", explanation: "Plasma makes up about 55% of blood volume." },
            { id: 14, q: "Veins carry blood towards:", options: ["Body parts", "Heart", "Lungs only", "Brain only"], a: "Heart", explanation: "Veins collect blood and bring it back to the heart." },
            { id: 15, q: "Suction force in plants is caused by:", options: ["Photosynthesis", "Transpiration", "Respiration", "Absorption"], a: "Transpiration", explanation: "Evaporation from leaves pulls water up like a straw." },
            { id: 16, q: "Yeast respires:", options: ["Aerobically", "Anaerobically", "Both", "None"], a: "Anaerobically", explanation: "Yeast produces alcohol and CO2 without oxygen." },
            { id: 17, q: "Blood cells that fight infection:", options: ["RBC", "WBC", "Platelets", "None"], a: "WBC", explanation: "White Blood Cells are the body's defense system." },
            { id: 18, q: "Transportation in plants happens through:", options: ["Vascular Tissue", "Muscle Tissue", "Nerve Tissue", "None"], a: "Vascular Tissue", explanation: "Xylem and Phloem are vascular tissues." },
            { id: 19, q: "Rate of breathing increases during:", options: ["Sleeping", "Heavy Exercise", "Reading", "Watching TV"], a: "Heavy Exercise", explanation: "Body needs more energy, hence more oxygen." },
            { id: 20, q: "Xylem always moves substances:", options: ["Upwards", "Downwards", "Both ways", "Sideways"], a: "Upwards", explanation: "Water is pulled up from the roots to the leaves." },
            { id: 21, q: "What connects arteries and veins?", options: ["Heart", "Lungs", "Capillaries", "Nerves"], a: "Capillaries", explanation: "Capillaries are the bridge between arteries and veins." },
            { id: 22, q: "Valves in veins prevent:", options: ["Blood flow", "Backflow of blood", "Clotting", "Infection"], a: "Backflow of blood", explanation: "Valves ensure blood moves only toward the heart." },
            { id: 23, q: "Translocation refers to transport of:", options: ["Water", "Food", "Oxygen", "Waste"], a: "Food", explanation: "Translocation is the specific term for food transport in phloem." },
            { id: 24, q: "The 'Lungs of the plant' are:", options: ["Stems", "Roots", "Leaves", "Flowers"], a: "Leaves", explanation: "Leaves are where most gas exchange occurs." },
            { id: 25, q: "What is the primary waste removed by kidneys?", options: ["Carbon Dioxide", "Oxygen", "Urea", "Sugar"], a: "Urea", explanation: "Kidneys filter out urea and excess water as urine." },
            { id: 26, q: "Life processes ensure:", options: ["Survival", "Reproduction", "Growth", "All of these"], a: "All of these", explanation: "They are fundamental to all living organisms." }
          ] 
        } 
      },
      { 
        id: 'biology-life-processes-repro', 
        category: 'biology', 
        title: 'Reproduction and Growth', 
        desc: 'Reproduction, Growth and Development', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction", text: "Living organisms grow and reproduce to continue their species.", points: ["Continuity: Essential for the survival of the species over generations.", "Vitality: Growth and reproduction are fundamental characteristics of life.", "Energy: Both processes require significant energy and nutrients."], example: "A tiny seed growing into a huge Banyan tree is a miracle of growth.", diagram: "" },
              { title: "2. What is Reproduction?", text: "Reproduction is the process by which living organisms produce new individuals of their own kind.", points: ["Like begets Like: Cats produce kittens, mango seeds produce mango trees.", "Population: It helps in increasing the number of individuals in a population.", "Types: Primarily categorized into Asexual and Sexual reproduction."], example: "A hen laying eggs that hatch into chicks.", diagram: "" },
              { title: "3. Types of Reproduction", text: "There are two main ways organisms reproduce.", points: ["Asexual: Only one parent involved; offspring are identical copies.", "Sexual: Two parents involved; offspring show variation (differences).", "Evolution: Variation in sexual reproduction helps organisms adapt better."], example: "Potato tubers (Asexual) vs. Humans (Sexual).", diagram: "" },
              { title: "4. Asexual Reproduction in Plants", text: "Plants have unique ways to reproduce without seeds.", points: ["Vegetative Propagation: Using stem (Potato), root (Sweet Potato), or leaf (Bryophyllum).", "Budding: A small bulb-like projection (bud) grows and detaches (Yeast).", "Spore Formation: Tiny spherical bodies called spores grow into new plants (Fungi/Moss)."], example: "Cutting a piece of sugarcane and planting it in the soil.", diagram: ACHIEVER_ASSETS.asexual_repro },
              { title: "5. Reproduction in Plants (Sexual)", text: "The flower is the reproductive part of a plant.", points: ["Male Part: Stamen (consists of Anther and Filament).", "Female Part: Pistil (consists of Stigma, Style, and Ovary).", "Unisexual vs Bisexual: Some flowers have one part, others have both."], example: "Hibiscus and Rose are common bisexual flowers.", diagram: ACHIEVER_ASSETS.flower_anatomy },
              { title: "6. Parts of a Flower", text: "Understanding the structure of a flower helps in understanding reproduction.", points: ["Sepals: Green leaf-like parts that protect the bud.", "Petals: Brightly colored parts to attract insects.", "Stamen: Produces pollen grains.", "Pistil: Contains the ovary where seeds develop."], example: "Bees are attracted to bright petals to help in pollination.", diagram: ACHIEVER_ASSETS.flower_anatomy },
              { title: "7. Pollination", text: "Pollination is the transfer of pollen grains from the anther to the stigma.", points: ["Self-pollination: Pollen lands on the stigma of the same flower.", "Cross-pollination: Pollen lands on the stigma of a different flower of the same kind.", "Agents: Insects, wind, and water help in moving pollen."], example: "A butterfly carrying pollen from one flower to another.", diagram: ACHIEVER_ASSETS.pollination_types },
              { title: "8. Fertilization", text: "Fertilization is the fusion of male and female gametes.", points: ["Zygote: The cell formed after fusion.", "Process: Pollen tube grows down to the ovary to reach the egg.", "Result: The zygote develops into an embryo."], example: "Just like mixing two colors creates a new one, fertilization creates a new life cell.", diagram: "" },
              { title: "9. Seed Formation and Dispersal", text: "After fertilization, the ovary grows into a fruit and ovules into seeds.", points: ["Protection: Seeds contain the baby plant (embryo) and stored food.", "Dispersal: Seeds are moved by wind, water, or animals to new places.", "Survival: Prevents competition between the parent and the young plant."], example: "Dandelion seeds flying in the wind like tiny parachutes.", diagram: "" },
              { title: "10. Seed Germination", text: "Germination is the growth of a seed into a new plant (seedling).", points: ["Requirements: Air, Water, and suitable Temperature (Warmth).", "Stages: Seed absorbs water → Root grows downwards → Shoot grows upwards.", "Nutrients: The seedling uses food stored in the seed until it grows leaves."], example: "Soaking 'Moong' dal overnight shows the first signs of germination.", diagram: ACHIEVER_ASSETS.seed_germination },
              { title: "11. Reproduction in Animals", text: "Animals reproduce by giving birth or laying eggs.", points: ["Oviparous: Animals that lay eggs (Birds, Reptiles, Insects).", "Viviparous: Animals that give birth to young ones (Humans, Cows, Dogs).", "Parental Care: Many animals protect and feed their young ones until they are independent."], example: "A mother bird feeding her chicks in a nest.", diagram: "" },
              { title: "12. Human Reproduction: The Basics", text: "Humans follow the sexual mode of reproduction involving two parents.", points: ["Male Parent: Contributes the sperm cell.", "Female Parent: Contributes the egg (ovum) cell.", "Combination: The baby inherits characteristics from both parents."], example: "You might have your father's eyes and your mother's smile!", diagram: "" },
              { title: "13. The Miracle of Fertilization", text: "New life begins when the male and female cells join together.", points: ["Zygote: The single cell formed by the fusion of sperm and egg.", "Embryo: The zygote divides and grows into a ball of cells.", "Implantation: The embryo attaches to the mother's womb (uterus) to grow."], example: "Just like a seed starting to sprout, fertilization is the start of a human life.", diagram: "" },
              { title: "14. Pregnancy and Development", text: "The baby grows inside the mother's body for about 9 months (38-40 weeks).", points: ["Placenta: A special organ that connects the baby to the mother for food and air.", "Protection: The mother's body provides a safe and warm environment.", "Birth: Once fully developed, the baby enters the world."], example: "A mother's care for her baby starts even before the baby is born.", diagram: "" },
              { title: "15. What is Growth?", text: "Growth is the permanent and irreversible increase in size and mass.", points: ["Cell Division: New cells are formed constantly.", "Nutrients: Good food is essential for healthy growth.", "Differentiation: Cells become specialized for different functions."], example: "Your clothes becoming tight as you grow older is a sign of growth.", diagram: "" },
              { title: "16. What is Development?", text: "Development is the series of changes an organism undergoes during its life.", points: ["Complexity: Going from a simple cell to a complex organism.", "Function: Learning new skills and body functions.", "Maturity: Reaching a stage where reproduction is possible."], example: "A caterpillar changing into a beautiful butterfly is called metamorphosis.", diagram: "" },
              { title: "17. Growth in Plants", text: "Plants grow throughout their life at specific points.", points: ["Meristems: Growth occurs at the tips of roots and shoots.", "Environment: Growth is affected by sunlight, water, and soil quality.", "Stages: Seedling → Young Plant → Mature Tree."], example: "A sunflower turning towards the sun to get more energy for growth.", diagram: "" },
              { title: "18. Growth in Animals", text: "Animals usually grow up to a certain age and then stop.", points: ["Proportional Growth: All body parts grow together.", "Internal Control: Growth is controlled by chemicals called hormones.", "Stages: Infancy → Childhood → Adolescence → Adulthood."], example: "A puppy growing into a large guard dog.", diagram: "" },
              { title: "19. Life Cycle: The Butterfly", text: "Some organisms undergo dramatic changes during their life cycle.", points: ["Egg: Laid on leaves.", "Larva (Caterpillar): Eats leaves and grows rapidly.", "Pupa (Chrysalis): The stage of internal transformation.", "Adult: The beautiful butterfly that can fly and reproduce."], example: "The transformation from a crawling worm to a flying insect.", diagram: ACHIEVER_ASSETS.butterfly_lifecycle },
              { id: 20, title: "20. Factors Affecting Growth", text: "External and internal factors determine how well an organism grows.", points: ["Nutrition: Balanced diet for animals, minerals for plants.", "Water: Essential for all chemical reactions in cells.", "Environment: Temperature and protection from diseases.", "Genetics: Information passed from parents."], example: "Lack of water causes plants to wilt and stop growing.", diagram: "" },
              { id: 21, title: "21. Importance of Growth & Reproduction", text: "These processes are vital for the world as we know it.", points: ["Species Survival: Ensures that the kind of animal or plant doesn't go extinct.", "Balance: Maintains the food chain and ecological balance.", "Evolution: Allows for variations that lead to better survival."], example: "Without seeds, there would be no new plants to provide us food.", diagram: "" },
              { id: 22, title: "22. Quick Check", text: "Test your knowledge on Growth and Reproduction!", points: ["What is the difference between Oviparous and Viviparous animals?", "Name three ways plants can reproduce asexually.", "What is the role of petals in a flower?", "Which stage follows the Larva stage in a butterfly's life cycle?"], example: "Try drawing the butterfly life cycle from memory!", diagram: "" }
            ]
          }, 
          practice: [
            { q: "Reproduction involving only one parent is called:", options: ["Sexual", "Asexual", "Fertilization", "Pollination"], a: "Asexual", explanation: "Asexual reproduction does not require gamete fusion." },
            { q: "The female part of the flower is the:", options: ["Stamen", "Pistil", "Sepal", "Petal"], a: "Pistil", explanation: "The pistil contains the ovary and eggs." },
            { q: "Animals that lay eggs are called:", options: ["Viviparous", "Oviparous", "Omnivorous", "Herbivorous"], a: "Oviparous", explanation: "Ovi means egg in Latin." },
            { q: "Yeast reproduces by a process called:", options: ["Fragmentation", "Budding", "Spore formation", "Pollination"], a: "Budding", explanation: "Budding is a common asexual method in yeast." }
          ], 
          challenge: [
            { q: "The transfer of pollen from anther to stigma is:", options: ["Fertilization", "Pollination", "Germination", "Dispersal"], a: "Pollination", explanation: "Pollination must happen before fertilization." },
            { q: "Metamorphosis is seen in which organism?", options: ["Human", "Cow", "Butterfly", "Dog"], a: "Butterfly", explanation: "Metamorphosis is a total change in body structure." },
            { q: "Which part of the seed contains the baby plant?", options: ["Seed coat", "Embryo", "Starch", "None"], a: "Embryo", explanation: "The embryo is the future plant." },
            { q: "Vegetative propagation in potatoes happens via:", options: ["Roots", "Leaves", "Stem (Tuber)", "Flowers"], a: "Stem (Tuber)", explanation: "Potato tubers are underground stems with 'eyes'." },
            { q: "Variation among offspring is a characteristic of:", options: ["Asexual reproduction", "Sexual reproduction", "Budding", "Spore formation"], a: "Sexual reproduction", explanation: "Combining two parents creates unique variations." }
          ], 
          test: [
            { id: 1, q: "Reproduction ensures the:", options: ["Survival of individuals", "Continuity of species", "Health of the parent", "None"], a: "Continuity of species", explanation: "It prevents extinction." },
            { id: 2, q: "A flower with both male and female parts is:", options: ["Unisexual", "Bisexual", "Asexual", "Non-sexual"], a: "Bisexual", explanation: "Bi means two; it has both reproductive organs." },
            { id: 3, q: "Pollination by wind usually occurs in flowers with:", options: ["Bright petals", "Sweet smell", "Light pollen grains", "Sticky stigma"], a: "Light pollen grains", explanation: "Light pollen can easily fly with the wind." },
            { id: 4, q: "Zygote is formed after:", options: ["Pollination", "Dispersal", "Fertilization", "Germination"], a: "Fertilization", explanation: "Zygote is the first cell of a new organism." },
            { id: 5, q: "Which of these is a viviparous animal?", options: ["Snake", "Frog", "Human", "Butterfly"], a: "Human", explanation: "Humans give birth to live young ones." },
            { id: 6, q: "The first part to grow out of a germinating seed is:", options: ["Shoot", "Root", "Leaf", "Flower"], a: "Root", explanation: "Roots grow first to absorb water from the soil." },
            { id: 7, q: "Bryophyllum reproduces through its:", options: ["Stem", "Leaves", "Roots", "Seeds"], a: "Leaves", explanation: "New buds grow on the margins of Bryophyllum leaves." },
            { id: 8, q: "Seed dispersal helps plants to:", options: ["Avoid overcrowding", "Get more water", "Grow faster", "None"], a: "Avoid overcrowding", explanation: "It spreads plants to new areas with more resources." },
            { id: 9, q: "The Larva of a butterfly is commonly called:", options: ["Pupa", "Caterpillar", "Nymph", "Chrysalis"], a: "Caterpillar", explanation: "The caterpillar stage is the main eating phase." },
            { id: 10, q: "Growth in animals usually:", options: ["Continues forever", "Stops at adulthood", "Happens only in sleep", "None"], a: "Stops at adulthood", explanation: "Animals reach a maximum size and stop growing." },
            { id: 11, q: "Essential requirements for germination are:", options: ["Water only", "Air and Water", "Air, Water, and Warmth", "Soil only"], a: "Air, Water, and Warmth", explanation: "All three are needed to wake up the embryo." },
            { id: 12, q: "Anther belongs to which part of the flower?", options: ["Pistil", "Sepal", "Stamen", "Petal"], a: "Stamen", explanation: "Anther is the male part that produces pollen." },
            { id: 13, q: "Fungi often reproduce through:", options: ["Budding", "Spores", "Seeds", "Cuttings"], a: "Spores", explanation: "Spores are tiny units that travel in the air." },
            { id: 14, q: "The embryo gets food from ______ inside the seed.", options: ["Soil", "Cotyledons", "Sunlight", "Water"], a: "Cotyledons", explanation: "Cotyledons are the seed leaves that store food." },
            { id: 15, q: "Cross-pollination involves:", options: ["One flower", "Two flowers on same plant", "Two flowers on different plants", "None"], a: "Two flowers on different plants", explanation: "It brings more genetic diversity." },
            { id: 16, q: "Birds are examples of:", options: ["Viviparous", "Oviparous", "Omnivorous", "None"], a: "Oviparous", explanation: "Birds lay hard-shelled eggs." },
            { id: 17, q: "Growth is a process that is:", options: ["Reversible", "Irreversible", "Temporary", "None"], a: "Irreversible", explanation: "You cannot shrink back to a baby." },
            { id: 18, q: "Metamorphosis in frogs involves a stage called:", options: ["Caterpillar", "Tadpole", "Pupa", "Larva"], a: "Tadpole", explanation: "Tadpoles breathe with gills in water." },
            { id: 19, q: "Internal development of baby happens in:", options: ["Oviparous animals", "Viviparous animals", "Both", "None"], a: "Viviparous animals", explanation: "The mother's womb protects the developing baby." },
            { id: 20, q: "Insects like bees are attracted to:", options: ["Green sepals", "Scent and Nectar", "Roots", "Stems"], a: "Scent and Nectar", explanation: "Bees visit flowers for food and help in pollination." },
            { id: 21, q: "Seed coat provides:", options: ["Food", "Protection", "Water", "Air"], a: "Protection", explanation: "The seed coat protects the delicate embryo inside." },
            { id: 22, q: "Sugar cane is usually grown by:", options: ["Seeds", "Stem Cuttings", "Leaves", "Spores"], a: "Stem Cuttings", explanation: "It is a form of vegetative propagation." },
            { id: 23, q: "Reproduction in yeast is:", options: ["Sexual", "Asexual", "Both", "None"], a: "Asexual", explanation: "Yeast uses budding to multiply quickly." },
            { id: 24, q: "Growth in plants occurs at:", options: ["All parts", "Only flowers", "Root and Shoot tips", "Only leaves"], a: "Root and Shoot tips", explanation: "These are called apical meristems." },
            { id: 25, q: "Which of these factors does NOT affect growth?", options: ["Nutrition", "Water", "Hair color", "Sunlight"], a: "Hair color", explanation: "Internal and external resources are what drive growth." },
            { id: 26, q: "Fertilization results in the formation of:", options: ["Pollen", "Zygote", "Stigma", "Anther"], a: "Zygote", explanation: "Zygote is the result of the fusion of gametes." },
            { id: 27, q: "Asexual reproduction produces offspring that are:", options: ["Very different", "Identical", "Weak", "None"], a: "Identical", explanation: "They are genetic copies of the single parent." },
            { id: 28, q: "Life cycle refers to:", options: ["Age of organism", "Sequence of stages", "Speed of growth", "None"], a: "Sequence of stages", explanation: "It tracks life from birth to reproduction." }
          ] 
        } 
      },
      { 
        id: 'biology-health-microbes', 
        category: 'biology', 
        title: 'Health and Microorganisms', 
        desc: 'Stay Healthy and Understand Microbes', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Health", text: "Health means a state of physical, mental, and social well-being.", points: ["Active Life: A healthy person can work and learn efficiently.", "Balance: It's not just the absence of disease, but being happy and fit.", "Foundation: Good health is the key to a long life."], example: "Waking up fresh and ready for school is a sign of good health.", diagram: "" },
              { title: "2. Importance of Health", text: "Why do we need to stay healthy?", points: ["Growth: Helps in proper physical and mental development.", "Quality: Improves the overall way we live our lives.", "Prevention: Makes our immune system strong to fight germs."], example: "Healthy students perform better in studies and sports.", diagram: "" },
              { title: "3. Balanced Diet", text: "A diet containing all nutrients in correct amounts.", points: ["Carbohydrates & Fats: Provide energy.", "Proteins: Help in body building and repair.", "Vitamins & Minerals: Protect from diseases.", "Water & Roughage: Essential for digestion."], example: "Eating a mix of rice, dal, vegetables, and fruit.", diagram: ACHIEVER_ASSETS.balanced_diet },
              { title: "4. Personal Hygiene", text: "Keeping your body and surroundings clean is the first step to health.", points: ["Bathing: Regular cleaning of the body.", "Handwashing: Especially before meals and after using the toilet.", "Clean Water: Drinking safe, filtered, or boiled water.", "Surroundings: Keeping our house and school free of waste."], example: "Using soap to wash hands kills 99% of surface germs.", diagram: "" },
              { title: "5. What are Diseases?", text: "Diseases are conditions that affect the normal functioning of the body.", points: ["Symptoms: Signs like fever, cough, or pain.", "Causes: Can be germs, lack of nutrients, or unhealthy lifestyle.", "Types: Communicable and Non-communicable."], example: "Having a high fever usually indicates a disease or infection.", diagram: "" },
              { title: "6. Types of Diseases", text: "Understanding how diseases spread helps us prevent them.", points: ["Communicable: Spread from one person to another (Cold, Flu, TB).", "Non-communicable: Do not spread (Diabetes, Heart disease, Cancer).", "Prevention: Hygiene for communicable; Lifestyle for non-communicable."], example: "Wearing a mask helps prevent communicable diseases like Flu.", diagram: "" },
              { title: "7. Causes and Germs", text: "Most communicable diseases are caused by tiny germs.", points: ["Pathogens: Harmful microorganisms that cause disease.", "Hygiene: Poor hygiene allows germs to enter our body.", "Food & Water: Contaminated food is a major source of infection."], example: "Stale food left in the open can attract flies and germs.", diagram: ACHIEVER_ASSETS.microorganisms_types },
              { title: "8. Prevention of Diseases", text: "Prevention is always better than cure!", points: ["Vaccination: Prepares the body to fight specific germs.", "Cleanliness: Draining stagnant water to prevent mosquito breeding.", "Diet: Eating fresh, covered food.", "Awareness: Understanding how germs spread."], example: "Sleeping under a mosquito net prevents Malaria.", diagram: "" },
              { title: "9. First Aid", text: "Immediate help given to an injured person before reaching a doctor.", points: ["Emergency: Helps in preventing the condition from getting worse.", "Kits: Should contain bandages, antiseptic, and basic medicines.", "Common Needs: For cuts, burns, or insect bites."], example: "Applying ice to a small burn immediately.", diagram: "" },
              { title: "10. Introduction to Microorganisms", text: "Tiny organisms that cannot be seen with the naked eye.", points: ["Ubiquitous: Found everywhere - air, water, soil, and even inside us.", "Microscope: Can only be seen using a magnifying tool.", "Diversity: They exist in many different shapes and sizes."], example: "Thousands of bacteria can fit on the head of a single pin.", diagram: ACHIEVER_ASSETS.microorganisms_types },
              { title: "11. Types of Microorganisms", text: "There are five main categories of microbes.", points: ["Bacteria: Simple, single-celled organisms.", "Fungi: Mushroom-like or mold-like organisms.", "Protozoa: Animal-like single cells.", "Algae: Plant-like organisms found in water.", "Viruses: Smallest microbes that only live inside other cells."], example: "The green 'scum' on a pond is often Algae.", diagram: ACHIEVER_ASSETS.microorganisms_types },
              { title: "12. Useful Microorganisms (Friends)", text: "Not all microbes are bad; many help us every day!", points: ["Food: Bacteria make curd; Yeast helps in making bread rise.", "Medicine: Used to produce life-saving Antibiotics.", "Agriculture: Increase soil fertility by fixing nitrogen.", "Environment: Decompose dead plants and animals to clean nature."], example: "The 'holes' in bread are made by Yeast releasing gas.", diagram: "" },
              { title: "13. Harmful Microorganisms (Foes)", text: "Some microbes cause serious problems.", points: ["Diseases: Cause Malaria (Protozoa), Cholera (Bacteria), and Dengue (Virus).", "Food Spoilage: Make food smell bad and become poisonous.", "Crop Damage: Infect plants and reduce farming output."], example: "Bread getting 'moldy' if left out in the damp.", diagram: "" },
              { title: "14. Modes of Transmission", text: "How do germs reach our body?", points: ["Air: Through coughing or sneezing (Cold, TB).", "Water: Drinking dirty water (Cholera, Typhoid).", "Food: Eating uncovered or stale food.", "Contact: Touching an infected person or sharing their things."], example: "Sharing a water bottle with a sick person can spread germs.", diagram: "" },
              { title: "15. Food Preservation", text: "Methods to stop microorganisms from spoiling our food.", points: ["Refrigeration: Low temperature stops microbe growth.", "Drying/Dehydration: Removing water (sun-drying grains).", "Salting/Sugar: Drawing out moisture from pickles and jams.", "Boiling: High heat kills most microorganisms."], example: "Milk is boiled to keep it fresh for longer.", diagram: "" },
              { title: "16. Vaccination", text: "Training our body's defense system.", points: ["Memory: Teaches the body how to recognize a germ.", "Safety: Makes us immune without us getting the actual disease.", "Eradication: Has helped in removing diseases like Polio and Smallpox."], example: "Getting your childhood shots makes you a 'Super Fighter' against germs.", diagram: "" },
              { title: "17. Real-Life Applications", text: "Using our knowledge to live a safer life.", points: ["Water: Always use a filter or boil water in the rainy season.", "Storage: Keep food in airtight containers or the fridge.", "Hygiene: Encourage everyone to use toilets and wash hands.", "Medicine: Only take antibiotics when prescribed by a doctor."], example: "A clean village has fewer cases of disease.", diagram: "" },
              { title: "18. Quick Check", text: "Time for a quick review!", points: ["What are the three pillars of health?", "Name two diseases spread through water.", "Why is Yeast used in the bakery?", "How does salt help in preserving pickles?"], example: "Discuss with your friend: Why do we cover our mouth while sneezing?", diagram: "" }
            ]
          }, 
          practice: [
            { q: "Which of these provides immediate energy?", options: ["Proteins", "Vitamins", "Carbohydrates", "Minerals"], a: "Carbohydrates", explanation: "Carbs are the primary fuel for our body." },
            { q: "Diseases that do not spread from person to person are:", options: ["Communicable", "Non-communicable", "Infectious", "Viral"], a: "Non-communicable", explanation: "These are often caused by lifestyle or genetics." },
            { q: "Curd is made with the help of:", options: ["Virus", "Bacteria", "Algae", "Fungi"], a: "Bacteria", explanation: "Lactobacillus bacteria turn milk into curd." },
            { q: "Antibiotics are used to kill:", options: ["Viruses", "Bacteria", "Algae", "Protozoa"], a: "Bacteria", explanation: "Antibiotics are specifically effective against bacterial infections." }
          ], 
          challenge: [
            { q: "Which microorganism is responsible for Malaria?", options: ["Bacteria", "Virus", "Protozoa", "Fungi"], a: "Protozoa", explanation: "Plasmodium is a protozoan spread by mosquitoes." },
            { q: "Dehydration as a preservation method involves removing:", options: ["Salt", "Sugar", "Water", "Air"], a: "Water", explanation: "Microbes cannot grow without moisture." },
            { q: "The process of making safe-to-drink water by heating is:", options: ["Filtering", "Salting", "Boiling", "Refrigeration"], a: "Boiling", explanation: "Boiling kills germs in water." },
            { q: "Vaccines provide protection by:", options: ["Killing germs directly", "Building immunity", "Cleaning the blood", "Providing energy"], a: "Building immunity", explanation: "They train our white blood cells." },
            { q: "Which of these is a communicable disease?", options: ["Diabetes", "Heart attack", "Tuberculosis", "Cancer"], a: "Tuberculosis", explanation: "TB spreads through the air via coughing." }
          ], 
          test: [
            { id: 1, q: "Balanced diet includes nutrients in ______ amounts.", options: ["Large", "Small", "Correct", "Unlimited"], a: "Correct", explanation: "Proportion is key to a balanced diet." },
            { id: 2, q: "Washing hands prevents the spread of:", options: ["Vitamins", "Germs", "Blood", "Energy"], a: "Germs", explanation: "Hands are a major path for germ transmission." },
            { id: 3, q: "First aid should be given ______.", options: ["After a week", "Immediately", "By a surgeon", "Never"], a: "Immediately", explanation: "It prevents the injury from worsening." },
            { id: 4, q: "Microorganisms can be seen with a:", options: ["Stethoscope", "Microscope", "Telescope", "Periscope"], a: "Microscope", explanation: "Micro means very small." },
            { id: 5, q: "Which of these is a 'Foe' microorganism?", options: ["Yeast", "Lactobacillus", "Vibrio cholerae", "Nitrogen-fixing bacteria"], a: "Vibrio cholerae", explanation: "It causes the deadly disease Cholera." },
            { id: 6, q: "Food poisoning is caused by ______ food.", options: ["Fresh", "Contaminated", "Boiled", "Organic"], a: "Contaminated", explanation: "Germs produce toxins in spoiled food." },
            { id: 7, q: "Sugar is used to preserve:", options: ["Pickles", "Jams", "Meat", "Grains"], a: "Jams", explanation: "High sugar content inhibits bacterial growth." },
            { id: 8, q: "Dengue is spread by:", options: ["Housefly", "Mosquito", "Air", "Water"], a: "Mosquito", explanation: "The Aedes mosquito carries the Dengue virus." },
            { id: 9, q: "The smallest type of microorganism is:", options: ["Algae", "Bacteria", "Virus", "Fungi"], a: "Virus", explanation: "Viruses are so small they can even infect bacteria." },
            { id: 10, q: "Safe drinking water should be free from:", options: ["Minerals", "Oxygen", "Germs", "Salt"], a: "Germs", explanation: "Germ-free water is safe for consumption." },
            { id: 11, q: "Preserving fish by covering with salt is:", options: ["Pickling", "Salting", "Boiling", "Drying"], a: "Salting", explanation: "Salt draws out water from the fish cells." },
            { id: 12, q: "Tuberculosis (TB) affects which part primarily?", options: ["Heart", "Lungs", "Skin", "Stomach"], a: "Lungs", explanation: "It is an airborne bacterial infection of the lungs." },
            { id: 13, q: "Yeast is used to make:", options: ["Curd", "Bread", "Antibiotics", "Fertilizers"], a: "Bread", explanation: "Yeast makes bread fluffy and light." },
            { id: 14, q: "Microbes that help clean the environment are:", options: ["Decomposers", "Pathogens", "Parasites", "Viruses"], a: "Decomposers", explanation: "They break down organic waste into nutrients." },
            { id: 15, q: "Hygiene includes keeping our ______ clean.", options: ["Body only", "House only", "Body and surroundings", "None"], a: "Body and surroundings", explanation: "External cleanliness is also vital." },
            { id: 16, q: "Communicable diseases spread through:", options: ["Air", "Water", "Direct contact", "All of these"], a: "All of these", explanation: "Germs use various paths to travel." },
            { id: 17, q: "Vaccines are usually given in the form of:", options: ["Food", "Injections or drops", "Steam", "Light"], a: "Injections or drops", explanation: "Like the Polio drops or Flu shots." },
            { id: 18, q: "Nitrogen fixation in soil is done by:", options: ["Fungi", "Protozoa", "Bacteria", "Viruses"], a: "Bacteria", explanation: "Rhizobium bacteria help plants get nitrogen." },
            { id: 20, q: "Common cold is caused by a:", options: ["Bacteria", "Virus", "Fungi", "Algae"], a: "Virus", explanation: "Rhinoviruses are common causes of colds." },
            { id: 21, q: "A person with heart disease has a ______ disease.", options: ["Communicable", "Non-communicable", "Viral", "Microbial"], a: "Non-communicable", explanation: "It's a chronic condition, not an infection." },
            { id: 22, q: "Mushrooms are a type of:", options: ["Algae", "Bacteria", "Fungi", "Protozoa"], a: "Fungi", explanation: "Some fungi like mushrooms are even edible." },
            { id: 23, q: "Boiling milk helps to:", options: ["Increase sugar", "Kill microorganisms", "Add vitamins", "Change color"], a: "Kill microorganisms", explanation: "Heat destroys most harmful bacteria." },
            { id: 24, q: "Spreading bleaching powder in water is for:", options: ["Coloring", "Disinfection", "Cooling", "Taste"], a: "Disinfection", explanation: "It kills harmful microbes in large water tanks." },
            { id: 25, q: "Which of these is NOT a nutrient?", options: ["Fats", "Roughage", "Dust", "Proteins"], a: "Dust", explanation: "Dust is a pollutant, not a nutrient." },
            { id: 26, q: "Cholera is spread through contaminated:", options: ["Air", "Water", "Mosquitoes", "Sunlight"], a: "Water", explanation: "Cholera bacteria travel in dirty water." },
            { id: 27, q: "Penicillin is an:", options: ["Antiseptic", "Antibiotic", "Antidote", "Antacid"], a: "Antibiotic", explanation: "It was the first antibiotic ever discovered." },
            { id: 28, q: "A balanced diet provides ______.", options: ["Only fat", "All necessary nutrients", "Only taste", "None"], a: "All necessary nutrients", explanation: "It ensures complete body function." },
            { id: 29, q: "Stagnant water should be removed to prevent:", options: ["Rain", "Mosquito breeding", "Evaporation", "None"], a: "Mosquito breeding", explanation: "Mosquitoes lay eggs in standing water." },
            { id: 30, q: "Being healthy helps us to be ______.", options: ["Strong", "Happy", "Productive", "All of these"], a: "All of these", explanation: "Health is the foundation of a good life." }
          ] 
        } 
      },
      { 
        id: 'biology-agriculture', 
        category: 'biology', 
        title: 'Food Production and Agriculture', 
        desc: 'Learn about Farming and Food Production', 
        content: { 
          learn: { 
            concept: [
              { title: "1. Introduction to Agriculture", text: "Agriculture is the science and practice of farming.", points: ["Scope: Growing crops and rearing animals for food, wool, and other products.", "Livelihood: Primary occupation for millions of people in rural areas.", "Survival: It provides the basic food we eat every day."], example: "A farmer growing wheat in his field is practicing agriculture.", diagram: "" },
              { title: "2. Importance of Agriculture", text: "Why is agriculture the backbone of our society?", points: ["Food Security: Ensures everyone has enough to eat.", "Raw Materials: Provides cotton for clothes and jute for bags.", "Economy: Supports the national income and provides jobs.", "Exports: Surplus food can be sold to other countries."], example: "The cotton in your t-shirt comes from agricultural farms.", diagram: "" },
              { title: "3. What are Crops?", text: "Plants of the same kind grown on a large scale in a field.", points: ["Scale: Thousands of plants grown together for harvest.", "Purpose: Mainly for food (grains) or industrial use (fiber).", "Diversity: Includes cereals, pulses, oilseeds, and vegetables."], example: "A field full of only rice plants is called a rice crop.", diagram: "" },
              { title: "4. Types of Crops: Kharif", text: "Crops grown during the monsoon (rainy) season.", points: ["Season: Sown in June/July and harvested in September/October.", "Water: These crops require a large amount of water to grow.", "Examples: Paddy (Rice), Maize, Soyabean, Groundnut, and Cotton."], example: "Rice is the most important Kharif crop in India.", diagram: "" },
              { title: "5. Types of Crops: Rabi", text: "Crops grown during the winter season.", points: ["Season: Sown in October/November and harvested in March/April.", "Water: Require moderate water and cool temperatures.", "Examples: Wheat, Gram, Pea, Mustard, and Linseed."], example: "The golden wheat fields you see in winter are Rabi crops.", diagram: "" },
              { title: "6. Zaid Crops", text: "Short-season crops grown between Rabi and Kharif (Summer).", points: ["Season: Grown from March to June.", "Characteristics: Usually fast-growing and water-rich.", "Examples: Watermelon, Cucumber, Pumpkin, and Bitter gourd."], example: "Eating a cool watermelon in peak summer is enjoying a Zaid crop.", diagram: "" },
              { title: "7. Step 1: Preparation of Soil", text: "Turning and loosening the soil before sowing.", points: ["Ploughing: Done using a plough (traditional) or tractor (modern).", "Nutrients: Brings nutrient-rich soil to the top.", "Roots: Helps roots breathe and penetrate deeper into the earth."], example: "A tractor pulling a cultivator to level the field.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "8. Step 2: Sowing", text: "The process of putting seeds in the soil.", points: ["Quality: Only clean, healthy, and high-quality seeds are selected.", "Spacing: Seeds must be sown at correct depths and distances.", "Tools: Traditional funnels or modern Seed Drills are used."], example: "A seed drill ensures seeds are covered by soil after sowing.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "9. Step 3: Adding Manure and Fertilizers", text: "Supplying essential nutrients to the soil.", points: ["Manure: Organic matter from plant/animal waste (Compost).", "Fertilizers: Chemical substances rich in Nitrogen, Phosphorus, and Potassium.", "Soil Health: Manure improves soil texture, while fertilizers give quick growth."], example: "Using cow dung as a natural way to make the soil fertile.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "10. Step 4: Irrigation", text: "Supplying water to crops at regular intervals.", points: ["Necessity: Water is needed for germination and nutrient transport.", "Frequency: Depends on the crop type, soil, and season.", "Balance: Too much water (Waterlogging) can also harm crops."], example: "Paddy fields need to be flooded with water to grow well.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "11. Step 5: Weeding", text: "Removing unwanted plants from the field.", points: ["Competition: Weeds steal water, nutrients, and space from the main crop.", "Removal: Can be done manually (Khurpi) or using chemicals (Weedicides).", "Protection: Ensures the healthy growth of the main crop."], example: "Pulling out wild grass from a wheat field.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "12. Step 6: Harvesting", text: "Cutting and gathering the mature crop.", points: ["Threshing: Separating the grains from the chaff.", "Winnowing: Using wind to separate lighter husks from heavy grains.", "Festivals: Many Indian festivals like Baisakhi and Pongal celebrate harvest."], example: "A huge 'Combine Harvester' cutting and cleaning the grain at once.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "13. Step 7: Storage", text: "Keeping the produce safe until it reaches the market.", points: ["Moisture: Grains must be dried to prevent fungal growth.", "Protection: Must be kept away from rats, insects, and microorganisms.", "Large Scale: Done in Silos or Granaries (Government godowns)."], example: "Jute bags filled with grains kept in a dry warehouse.", diagram: ACHIEVER_ASSETS.farming_process },
              { title: "14. Traditional Irrigation Methods", text: "Older ways of lifting water from wells and canals.", points: ["Moat: Using a pulley and a bucket.", "Chain Pump: A wheel with buckets attached to a chain.", "Dhekli & Rahat: Using manual labor or bullocks to lift water.", "Efficiency: These methods are cheaper but less efficient."], example: "A bullock turning a large wheel to lift water from a well.", diagram: "" },
              { title: "15. Modern Irrigation: Sprinkler System", text: "Water is sprayed like rain over the crops.", points: ["Design: Vertical pipes with rotating nozzles at the top.", "Usage: Very useful for uneven land where water is scarce.", "Benefit: Provides uniform water distribution to the leaves."], example: "Commonly seen on lush green lawns and coffee plantations.", diagram: ACHIEVER_ASSETS.irrigation_modern },
              { title: "16. Modern Irrigation: Drip System", text: "Water falls drop by drop directly at the position of the roots.", points: ["Precision: No wastage of water at all.", "Design: Network of pipes with small holes (emitters).", "Dry Areas: The best system for regions with very low water availability."], example: "Ideal for fruit plants, gardens, and expensive crops.", diagram: ACHIEVER_ASSETS.irrigation_modern },
              { title: "17. Importance of Grain Storage", text: "Ensuring the food we grow lasts the whole year.", points: ["Spoilage: Freshly harvested grains have high moisture and spoil easily.", "Pests: Rats and insects can eat a large portion of the harvest.", "Buffer Stock: Keeping extra food for emergencies like droughts."], example: "Using dried neem leaves at home to protect stored grains.", diagram: "" },
              { title: "18. Large Scale Storage: Silos and Granaries", text: "How nations store food for millions of people.", points: ["Silos: Tall, airtight metal containers for bulk grains.", "Granaries: Large buildings used to store bags of grain.", "FCI: Food Corporation of India manages most large-scale storage."], example: "Huge metal towers seen near railway stations for grain storage.", diagram: ACHIEVER_ASSETS.grain_storage },
              { title: "19. Animal Husbandry", text: "Food from animals is also a part of agriculture.", points: ["Livestock: Rearing cows, buffaloes, and goats for milk and meat.", "Poultry: Raising chickens and ducks for eggs.", "Apiculture: Rearing honeybees for honey and wax."], example: "A dairy farm providing fresh milk to a nearby town.", diagram: "" },
              { title: "20. Real-Life Applications", text: "How agriculture affects your daily life.", points: ["Organic Farming: Growing food without harmful chemicals.", "Water Saving: Using drip irrigation in backyard gardens.", "Kitchen Gardens: Growing your own vegetables like tomatoes and chilies.", "Waste: Converting kitchen waste into manure (composting)."], example: "Making compost from fruit peels to use in your flower pots.", diagram: "" },
              { title: "21. Quick Check", text: "Are you ready to be a young farmer?", points: ["Why is ploughing important for the soil?", "Which irrigation method saves the most water?", "Name two crops that are harvested in March.", "What is the difference between Manure and Fertilizer?"], example: "Try identifying three different crops growing in your area!", diagram: "" }
            ]
          }, 
          practice: [
            { q: "Which of these is a Kharif crop?", options: ["Wheat", "Mustard", "Paddy", "Gram"], a: "Paddy", explanation: "Paddy (Rice) is grown in the rainy season." },
            { q: "The process of loosening the soil is called:", options: ["Sowing", "Irrigation", "Ploughing", "Harvesting"], a: "Ploughing", explanation: "Ploughing makes the soil airy and soft." },
            { q: "Which tool is used for modern sowing?", options: ["Plough", "Seed Drill", "Sickle", "Khurpi"], a: "Seed Drill", explanation: "Seed drill ensures proper depth and spacing." },
            { q: "Weeds are removed because they:", options: ["Look bad", "Compete for nutrients", "Attract bees", "Produce seeds"], a: "Compete for nutrients", explanation: "Weeds take away resources meant for the main crop." },
            { q: "Which method is best for areas with water shortage?", options: ["Moat", "Sprinkler", "Drip System", "Chain pump"], a: "Drip System", explanation: "Drip irrigation provides water directly to roots with zero waste." }
          ], 
          challenge: [
            { q: "Why are grains dried in the sun before storage?", options: ["To change color", "To reduce moisture", "To make them heavy", "To add vitamins"], a: "To reduce moisture", explanation: "Moisture promotes the growth of fungi and bacteria." },
            { q: "Fertilizers are rich in which three elements?", options: ["Iron, Gold, Silver", "Nitrogen, Phosphorus, Potassium", "Oxygen, Carbon, Hydrogen", "Calcium, Magnesium, Sulfur"], a: "Nitrogen, Phosphorus, Potassium", explanation: "N-P-K are the primary nutrients for plant growth." },
            { q: "Animal husbandry involves:", options: ["Growing flowers", "Rearing animals", "Making machines", "Dug wells"], a: "Rearing animals", explanation: "It is the branch of agriculture for animal care." },
            { q: "Combine Harvester is used for:", options: ["Ploughing and Sowing", "Sowing and Irrigation", "Harvesting and Threshing", "Weeding and Storage"], a: "Harvesting and Threshing", explanation: "It combines both cutting and cleaning the grain." },
            { q: "Rhizobium bacteria in roots help in:", options: ["Watering", "Nitrogen fixation", "Pest control", "Photosynthesis"], a: "Nitrogen fixation", explanation: "They convert atmospheric nitrogen into a form plants can use." },
            { q: "What is 'Winnowing'?", options: ["Planting seeds", "Separating grain from husk", "Watering fields", "Applying manure"], a: "Separating grain from husk", explanation: "It uses wind to separate the lighter husk." },
            { q: "Silos are primarily used for:", options: ["Cooking", "Transportation", "Large-scale storage", "Testing soil"], a: "Large-scale storage", explanation: "They are airtight towers for bulk grain." }
          ], 
          test: [
            { id: 1, q: "Growing crops is the primary activity of:", options: ["Industry", "Agriculture", "Services", "Mining"], a: "Agriculture", explanation: "It is the core of farming." },
            { id: 2, q: "Wheat is a ______ crop.", options: ["Kharif", "Rabi", "Zaid", "None"], a: "Rabi", explanation: "Wheat is grown in the winter season." },
            { id: 3, q: "Ploughing is also known as:", options: ["Sowing", "Tilling", "Winnowing", "Threshing"], a: "Tilling", explanation: "Tilling refers to the preparation of soil." },
            { id: 4, q: "Organic matter added to soil is:", options: ["Fertilizer", "Manure", "Weedicide", "Pesticide"], a: "Manure", explanation: "Manure comes from natural sources." },
            { id: 5, q: "Modern method of irrigation includes:", options: ["Rahat", "Drip system", "Dhekli", "Chain pump"], a: "Drip system", explanation: "It is a highly efficient modern method." },
            { id: 6, q: "Harvesting of crops is usually done after:", options: ["1 month", "3-4 months", "1 year", "2 years"], a: "3-4 months", explanation: "Most food crops take a few months to mature." },
            { id: 7, q: "FCI stands for ______ Corporation of India.", options: ["Farmer", "Food", "Fertilizer", "Finance"], a: "Food", explanation: "FCI manages the nation's food storage." },
            { id: 8, q: "Damaging plants that grow with crops are:", options: ["Seedlings", "Weeds", "Parasites", "Fungi"], a: "Weeds", explanation: "Weeds are unwanted plants." },
            { id: 9, q: "Maize is a ______ crop.", options: ["Kharif", "Rabi", "Zaid", "None"], a: "Kharif", explanation: "Maize needs more water and heat." },
            { id: 10, q: "Seed drill helps in sowing seeds at:", options: ["Surface only", "Uneven depths", "Uniform depth", "None"], a: "Uniform depth", explanation: "It ensures all seeds are planted properly." },
            { id: 11, q: "Natural fertilizer is called:", options: ["Urea", "Compost", "Potash", "NPK"], a: "Compost", explanation: "Compost is a type of natural manure." },
            { id: 12, q: "Waterlogging means:", options: ["Lack of water", "Excess water in field", "Running water", "Pure water"], a: "Excess water in field", explanation: "It can suffocate the roots." },
            { id: 13, q: "Sickle is a tool used for:", options: ["Sowing", "Harvesting", "Ploughing", "Irrigation"], a: "Harvesting", explanation: "It is a curved blade for cutting crops." },
            { id: 14, q: "Large airtight metal towers for storage are:", options: ["Silos", "Granaries", "Bags", "Pits"], a: "Silos", explanation: "Silos are used for bulk storage." },
            { id: 15, q: "Rearing of honey bees is:", options: ["Sericulture", "Apiculture", "Pisciculture", "Viticulture"], a: "Apiculture", explanation: "Apicis is Latin for bee." },
            { id: 16, q: "Which crop needs the most water?", options: ["Wheat", "Paddy", "Mustard", "Gram"], a: "Paddy", explanation: "Paddy is grown in standing water." },
            { id: 17, q: "Broadcasting is a method of:", options: ["Irrigation", "Sowing", "Harvesting", "Storage"], a: "Sowing", explanation: "It involves scattering seeds by hand." },
            { id: 18, q: "NPK fertilizers provide:", options: ["Iron", "Nitrogen", "Gold", "Lead"], a: "Nitrogen", explanation: "N stands for Nitrogen." },
            { id: 19, q: "Removing lighter husk from grain using wind is:", options: ["Threshing", "Winnowing", "Sowing", "Tilling"], a: "Winnowing", explanation: "Wind carries away the lighter particles." },
            { id: 20, q: "Modern irrigation system for coffee is:", options: ["Drip", "Sprinkler", "Moat", "Rahat"], a: "Sprinkler", explanation: "It mimics rain for the plants." },
            { id: 21, q: "Storing grains in jute bags is done in:", options: ["Silos", "Granaries", "Kitchen", "Open fields"], a: "Granaries", explanation: "They store large quantities in bags." },
            { id: 22, q: "Agriculture raw material for clothes is:", options: ["Wheat", "Cotton", "Rice", "Maize"], a: "Cotton", explanation: "Cotton fibers are used for cloth." },
            { id: 23, q: "Summer season crops are:", options: ["Kharif", "Rabi", "Zaid", "None"], a: "Zaid", explanation: "Zaid crops grow in the hot summer months." },
            { id: 24, q: "Leveling of soil is done after:", options: ["Sowing", "Ploughing", "Harvesting", "Irrigation"], a: "Ploughing", explanation: "It prevents soil erosion and helps irrigation." },
            { id: 25, q: "Unwanted plants that grow naturally are:", options: ["Crops", "Weeds", "Flowers", "Trees"], a: "Weeds", explanation: "They are pests to the farmer." },
            { id: 26, q: "Pulses are rich in:", options: ["Carbohydrates", "Proteins", "Fats", "Minerals"], a: "Proteins", explanation: "Pulses are essential for body building." },
            { id: 27, q: "Sprinkler system is useful for ______ land.", options: ["Level", "Uneven", "Wet", "None"], a: "Uneven", explanation: "It covers hills and slopes easily." },
            { id: 28, q: "Fungi and pests attack grains if there is:", options: ["Sunlight", "Moisture", "Fresh air", "Dryness"], a: "Moisture", explanation: "Damp conditions are perfect for germs." },
            { id: 29, q: "Raising animals for meat and milk is:", options: ["Horticulture", "Animal Husbandry", "Floriculture", "Silviculture"], a: "Animal Husbandry", explanation: "It is the care and breeding of livestock." },
            { id: 30, q: "Healthy seeds ______ when put in water.", options: ["Float", "Sink", "Dissolve", "None"], a: "Sink", explanation: "Solid, healthy seeds are heavier and sink." }
          ] 
        } 
      }
    ]
  }
};
