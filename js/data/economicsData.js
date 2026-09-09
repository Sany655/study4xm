/* ==========================================================================
   ECONOMICSDATA.JS - Complete 10 Topics of Economics Syllabus from 'tisha study.pdf'
   Enriched with 5-Level Learning System, Bangla explanations, formulas,
   diagram notes, exam answers (2, 5, 10 marks), MCQs, and flashcards.
   ========================================================================== */

window.ECONOMICS_SYLLABUS = [
  {
    topicId: 1,
    title: "Topic 1: Fundamentals of Economics",
    priority: 5,
    description: "Definition, scarcity of resources, positive vs normative economics, problems of choice, efficiency and equity, informal economics.",
    concepts: [
      {
        id: "econ-t1-c1",
        title: "Scarcity, Problem of Choice & Scope of Economics",
        priority: 5,
        simpleIdea: "Human wants are limitless like the open sky, but resources (money, time, land) are strictly limited. Economics is the art of choosing the best path.",
        simplerVersion: "আমাদের চাহিদা বা ইচ্ছা অসীম, কিন্তু সেই তুলনায় সম্পদ (টাকা, সময়) সীমিত। এই সীমিত সম্পদ দিয়ে কীভাবে সর্বোচ্চ অভাব পূরণ করা যায়—সেটাই হলো অর্থনীতির মূল কথা।",
        banglaExplanation: "লর্ড রবিন্সের মতে, অর্থনীতি হলো এমন বিজ্ঞান যা মানুষের অসীম অভাব এবং বিকল্প ব্যবহারযোগ্য সীমিত সম্পদের মধ্যকার সম্পর্ক নিয়ে আলোচনা করে। সম্পদের দুষ্প্রাপ্যতা (Scarcity) থেকেই নির্বাচনের সমস্যা (Problem of Choice) তৈরি হয়।",
        keywords: [
          { term: "Scarcity", def: "The fundamental economic problem of having unlimited human wants in a world of limited resources." },
          { term: "Opportunity Cost", def: "The value of the next best alternative forgone when a choice is made." },
          { term: "Positive Economics", def: "Objective analysis based on verifiable facts and cause-and-effect ('what is')." },
          { term: "Normative Economics", def: "Subjective analysis based on value judgments and moral opinions ('what ought to be')." }
        ],
        technicalExplanation: "Economics analyzes resource allocation under scarcity. The Production Possibility Curve (PPC) formally illustrates trade-offs and opportunity costs. Economic efficiency consists of productive efficiency (producing at minimum average cost on the PPC) and allocative efficiency (producing the basket of goods society values most, where P = MC).",
        realLifeExample: "A student having $10 and 2 hours: choosing to buy an economics revision guide and study instead of watching a movie at the cinema.",
        examAnswers: {
          twoMark: "Scarcity refers to the basic economic situation where human wants are virtually unlimited, while the productive resources required to satisfy them are finite.",
          fiveMark: "Positive vs Normative Economics:\n1. Basis: Positive is based on objective scientific facts; Normative is based on subjective ethical judgments.\n2. Verification: Positive statements can be tested and verified with empirical data; Normative statements cannot be proven true or false.\n3. Focus: Positive examines 'What is / was / will be'; Normative examines 'What ought to be / what should be'.\n4. Examples: 'Increasing taxes reduces consumption' (Positive) vs 'The government ought to lower taxes to help the poor' (Normative).",
          tenMark: "Comprehensive Examination of the Fundamental Economic Problem:\n\n1. The Trinity of Scarcity, Choice, and Opportunity Cost:\n   - Finite factors of production (Land, Labour, Capital, Enterprise).\n   - Infinite human desires driven by biological and social expectations.\n   - Opportunity cost measurement via the marginal rate of transformation (MRT).\n2. Central Economic Questions: What to produce? How to produce? For whom to produce?\n3. Efficiency vs Equity Trade-off: Productive and allocative efficiency versus equitable distribution of national income, including the informal sector."
        },
        commonMistakes: "Confusing positive statements with good statements, and normative statements with negative statements.",
        mcqs: [
          {
            question: "Which of the following is a normative economic statement?",
            options: [
              "The inflation rate in Bangladesh was 9.5% last year",
              "Higher cigarette taxes reduce youth smoking rates",
              "The government ought to provide free healthcare for low-income citizens",
              "When consumer income increases, demand for normal goods rises"
            ],
            correct: 2,
            difficulty: "Medium",
            explanation: "The statement contains a value judgment ('ought to provide') rather than an empirically verifiable fact."
          }
        ],
        flashcards: [
          { front: "State Lionel Robbins' definition of Economics.", back: "Economics is the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses." }
        ],
        recallQuestion: "Define Opportunity Cost and differentiate Positive Economics from Normative Economics."
      }
    ]
  },
  {
    topicId: 2,
    title: "Topic 2: Supply and Demand",
    priority: 5,
    description: "Demand & quantity demanded, determinants, demand schedule/curve, supply curve, shifts vs movements, market equilibrium, elasticity & cross elasticity.",
    concepts: [
      {
        id: "econ-t2-c1",
        title: "Law of Demand & Supply, Equilibrium Price & Elasticity",
        priority: 5,
        simpleIdea: "When things get cheaper, buyers want more (Demand). When prices rise, sellers rush to sell more (Supply). Market equilibrium is where both agree on the exact price.",
        simplerVersion: "অন্যান্য বিষয় অপরিবর্তিত থাকলে দাম বাড়লে চাহিদা কমে, আর দাম কমলে চাহিদা বাড়ে। যে দামে ক্রেতার চাহিদা ও বিক্রেতার যোগান সমান হয়, সেটাই হলো ভারসাম্য দাম (Equilibrium Price)।",
        banglaExplanation: "চাহিদা বিধি (Law of Demand) অনুযায়ী দাম ও চাহিদার পরিমাণের মধ্যে বিপরীতমুখী সম্পর্ক বিদ্যমান। যোগান বিধি অনুযায়ী দাম ও যোগানের পরিমাণের মধ্যে সমমুখী সম্পর্ক থাকে। যে বিন্দুতে চাহিদা রেখা ও যোগান রেখা ছেদ করে (Qd = Qs), সেখানে ভারসাম্য নির্ধারিত হয়।",
        keywords: [
          { term: "Law of Demand", def: "Ceteris paribus, as price rises, quantity demanded falls; as price falls, quantity demanded rises." },
          { term: "Market Equilibrium", def: "The state where quantity demanded equals quantity supplied (Qd = Qs), leaving no surplus or shortage." },
          { term: "Price Elasticity of Demand (Ped)", def: "The percentage change in quantity demanded divided by the percentage change in price (%ΔQd / %ΔP)." },
          { term: "Cross Elasticity of Demand (XED)", def: "Measures responsiveness of demand for good X to a change in price of good Y (%ΔQdx / %ΔPy)." }
        ],
        technicalExplanation: "Movement along the curve occurs strictly due to a change in the product's own price. A shift of the curve occurs due to non-price determinants (consumer income, tastes, prices of substitutes/complements, expectations, number of buyers/sellers). Elasticity coefficient |Ed| > 1 denotes elastic demand, |Ed| < 1 is inelastic, and |Ed| = 1 is unitary elastic.",
        realLifeExample: "If the price of tea rises by 20%, people drink more coffee (Cross Elasticity positive for substitutes), shifting the coffee demand curve rightward.",
        examAnswers: {
          twoMark: "The Law of Demand states that, other things remaining constant (ceteris paribus), an inverse relationship exists between the price of a good and the quantity demanded.",
          fiveMark: "Movement Along vs Shift of Demand Curve:\n1. Movement Along: Triggered solely by a change in the good's own price; moves along the existing curve (Expansion/Contraction).\n2. Shift of Curve: Caused by non-price factors (Income, Tastes, Price of related goods); shifts entire curve left or right.\n3. Equilibrium Impact: Rightward shift in demand raises both equilibrium price and quantity.",
          tenMark: "In-Depth Study of Market Mechanics, Equilibrium, and Elasticity:\n\n1. Mathematical Formulation: Qd = a - bP and Qs = -c + dP; Solving for equilibrium P* and Q*.\n2. Disequilibrium Dynamics: Excess supply (surplus) creating downward price pressure; Excess demand (shortage) driving price escalation.\n3. Types and Measurement of Elasticity:\n   - Price Elasticity of Demand formula: (%ΔQ / %ΔP) using midpoint method.\n   - Income Elasticity (Normal goods > 0, Inferior goods < 0).\n   - Cross Elasticity (Substitutes > 0, Complements < 0)."
        },
        commonMistakes: "Confusing 'change in quantity demanded' (movement along curve) with 'change in demand' (shift of whole curve).",
        mcqs: [
          {
            question: "What happens to the equilibrium price and quantity when consumer demand increases while supply remains constant?",
            options: [
              "Equilibrium price falls, quantity falls",
              "Equilibrium price rises, quantity rises",
              "Equilibrium price rises, quantity falls",
              "Equilibrium price falls, quantity rises"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "An increase in demand shifts the demand curve to the right, causing both market equilibrium price and quantity to increase."
          }
        ],
        flashcards: [
          { front: "What is the formula for Price Elasticity of Demand (PED)?", back: "PED = (% Change in Quantity Demanded) / (% Change in Price) = (ΔQ / ΔP) × (P / Q)." }
        ],
        recallQuestion: "Distinguish between a movement along a demand curve and a shift of the demand curve with diagrams and examples."
      }
    ]
  },
  {
    topicId: 3,
    title: "Topic 3: Theory of Consumer Behavior",
    priority: 4,
    description: "Cardinal & ordinal utility, Total and Marginal Utility, Law of Diminishing Marginal Utility, Equi-Marginal Utility, Consumer Surplus.",
    concepts: [
      {
        id: "econ-t3-c1",
        title: "Cardinal vs. Ordinal Utility, Diminishing Marginal Utility & Consumer Surplus",
        priority: 4,
        simpleIdea: "The first slice of pizza tastes heavenly, the second is good, but by the fifth slice you are stuffed and get almost zero extra satisfaction. That is Diminishing Marginal Utility!",
        simplerVersion: "উপযোগ (Utility) হলো কোনো দ্রব্যের মানুষের অভাব মেটানোর ক্ষমতা। প্রথম এক গ্লাস পানি খেলে যে আনন্দ মেলে, পর পর আরও কয়েক গ্লাস খেলে সেই অতিরিক্ত আনন্দ (Marginal Utility) কমতে থাকে।",
        banglaExplanation: "কার্ডিনাল তত্ত্বে উপযোগকে সংখ্যার (১, ২, ৩ ইউটিল) সাহায্যে পরিমাপ করা যায় (আলফ্রেড মার্শাল)। অর্ডিনাল তত্ত্বে উপযোগকে পছন্দ ও ক্রম অনুসারে সাজানো হয় (হিক্স ও অ্যালেন)। ক্রমহ্রাসমান প্রান্তিক উপযোগ বিধি অনুসারে কোনো নির্দিষ্ট সময়ে একটি দ্রব্যের ভোগ বাড়লে প্রান্তিক উপযোগ ক্রমশ কমতে থাকে।",
        keywords: [
          { term: "Total Utility (TU)", def: "The aggregate sum of satisfaction derived from consuming a given number of units of a commodity." },
          { term: "Marginal Utility (MU)", def: "The addition to total utility resulting from the consumption of one additional unit of a good (MU = ΔTU / ΔQ)." },
          { term: "Consumer Surplus", def: "The difference between the total amount that consumers are willing and able to pay and the total amount that they actually do pay (WTP - Market Price)." }
        ],
        technicalExplanation: "Consumer equilibrium in cardinal analysis is reached when the marginal utility per unit of currency spent is equalized across all goods: MUx / Px = MUy / Py = MUm. At the point where MU = 0, Total Utility (TU) reaches its absolute maximum.",
        realLifeExample: "Drinking cold water when walking under scorching sun: Glass 1 gives 20 utils, Glass 2 gives 12 utils, Glass 3 gives 4 utils, Glass 4 gives 0 utils (Total Utility max).",
        examAnswers: {
          twoMark: "The Law of Diminishing Marginal Utility states that as a consumer consumes more and more units of a specific commodity, the additional utility (satisfaction) derived from each successive unit decreases.",
          fiveMark: "Relationship between Total Utility (TU) and Marginal Utility (MU):\n1. When MU is positive and decreasing, TU increases at a diminishing rate.\n2. When MU reaches zero, TU attains its maximum point (point of satiety).\n3. When MU becomes negative, TU begins to decline.\n4. Formula: TU = ΣMU, or MU = TUn - TUn-1.",
          tenMark: "Comprehensive Analysis of Cardinal vs. Ordinal Utility Approaches to Consumer Equilibrium:\n\n1. Cardinal Utility (Marshall): Util quantification, Law of Equi-Marginal Utility (MUx/Px = MUy/Py), Consumer Surplus derivation (area below demand curve above price line).\n2. Ordinal Utility (Hicks & Allen): Indifference Curves (properties: downward sloping, convex to origin, never intersect), Marginal Rate of Substitution (MRSxy = Px/Py).\n3. Budget Constraint & Tangency Condition for Consumer Equilibrium."
        },
        commonMistakes: "Thinking Total Utility becomes zero when Marginal Utility becomes zero; in reality, TU is at its maximum.",
        mcqs: [
          {
            question: "What happens to Total Utility (TU) when Marginal Utility (MU) reaches zero?",
            options: [
              "Total Utility becomes zero",
              "Total Utility is at its maximum point",
              "Total Utility begins to increase exponentially",
              "Total Utility becomes negative"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "When marginal utility is zero, total utility reaches its maximum (point of saturation)."
          }
        ],
        flashcards: [
          { front: "What is Consumer Surplus?", back: "Consumer Surplus is the monetary difference between the maximum price a consumer is willing to pay and the actual price paid (WTP - Price)." }
        ],
        recallQuestion: "Describe the relationship between Total Utility and Marginal Utility with a schedule and curve."
      }
    ]
  },
  {
    topicId: 4,
    title: "Topic 4: Production and Cost",
    priority: 5,
    description: "Production function, 1 & 2 variable inputs, Returns to Scale, Short-run costs vs Long-run costs, LAC, SAC, LMC, SMC.",
    concepts: [
      {
        id: "econ-t4-c1",
        title: "Production Function, Law of Variable Proportions & Cost Curves",
        priority: 5,
        simpleIdea: "In a kitchen of fixed size (Short run), adding 1 or 2 chefs speeds up cooking. Adding 15 chefs creates chaos and fewer meals get finished! That is diminishing marginal returns.",
        simplerVersion: "স্বল্পকালে জমি বা কারখানার আকার অপরিবর্তিত রেখে কেবল শ্রমিক (Variable Input) বাড়াতে থাকলে শুরুতে উৎপাদন বাড়লেও এক পর্যায়ে শ্রমিকের প্রান্তিক উৎপাদন কমতে থাকে।",
        banglaExplanation: "উৎপাদন অপেক্ষক Q = f(L, K)। স্বল্পকালে অন্তত একটি উপাদান স্থির (Fixed) থাকে এবং ব্যয়কে TFC ও TVC-তে ভাগ করা হয়। দীর্ঘকালে সব উপাদান পরিবর্তনশীল (Variable), যার ফলে স্কেল অনুযায়ী প্রতিদান (Returns to Scale) কার্যকর হয়।",
        keywords: [
          { term: "Production Function", def: "The technical relationship between physical inputs of factors and the maximum attainable physical output of goods." },
          { term: "Short Run vs Long Run", def: "Short run has at least one fixed factor of production; in the long run, all factors of production are variable." },
          { term: "Average Cost (AC)", def: "Total cost divided by quantity produced (AC = TC / Q = AFC + AVC)." },
          { term: "Marginal Cost (MC)", def: "The addition to total cost generated by producing one additional unit of output (MC = ΔTC / ΔQ)." }
        ],
        technicalExplanation: "The Marginal Cost (MC) curve is U-shaped due to the Law of Diminishing Returns in the short run. MC cuts Average Variable Cost (AVC) and Average Total Cost (ATC) at their minimum lowest points from below. The Long-run Average Cost (LAC) curve is the envelope curve of multiple SAC curves.",
        realLifeExample: "A garment factory operating with 20 sewing machines (Fixed): hiring up to 25 workers boosts efficiency, but hiring 80 workers clogs the factory floor, causing marginal product to collapse.",
        examAnswers: {
          twoMark: "Marginal Cost (MC) is the change in total production cost that arises when the quantity produced is incremented by one additional unit (MC = ΔTC / ΔQ).",
          fiveMark: "Why the Short-run Average Cost (SAC) Curve is U-shaped:\n1. Initial Stage: As output increases, Average Fixed Cost (AFC) drops sharply and increasing returns to variable factors cause SAC to fall.\n2. Minimum Point: Optimal factor proportion is reached at minimum SAC.\n3. Rising Stage: Law of Diminishing Marginal Returns sets in; rising Average Variable Cost (AVC) pulls SAC upward, creating the characteristic U-shape.",
          tenMark: "Comprehensive Analysis of Cost Structures & Relationships in Economic Theory:\n\n1. Mathematical Decomposition: TC = TFC + TVC; dividing by Q yields ATC = AFC + AVC.\n2. Geometric Relationships: Why MC intersects AVC and ATC at their respective minimum points.\n3. Long-run Production: Constant, Increasing, and Decreasing Returns to Scale; Economies and Diseconomies of Scale generating the Envelope LAC curve."
        },
        commonMistakes: "Drawing the Marginal Cost curve cutting Average Cost somewhere other than at its minimum point.",
        mcqs: [
          {
            question: "At what point does the Marginal Cost (MC) curve intersect the Average Total Cost (ATC) curve?",
            options: [
              "At the maximum point of ATC",
              "At the minimum (lowest) point of ATC",
              "At the origin (0,0)",
              "It never intersects ATC"
            ],
            correct: 1,
            difficulty: "Hard",
            explanation: "Mathematically, the MC curve always cuts both AVC and ATC curves from below at their exact minimum points."
          }
        ],
        flashcards: [
          { front: "State the mathematical formula for Total Cost (TC) in the short run.", back: "TC = TFC + TVC (Total Fixed Cost + Total Variable Cost)." }
        ],
        recallQuestion: "Explain why the Short-run Marginal Cost curve cuts the Short-run Average Cost curve at its minimum point."
      }
    ]
  },
  {
    topicId: 5,
    title: "Topic 5: Market Analysis",
    priority: 5,
    description: "Perfect competition vs Monopoly: characteristics, AR & MR curves, short-run and long-run equilibrium positions, supply curve.",
    concepts: [
      {
        id: "econ-t5-c1",
        title: "Perfect Competition vs. Monopoly Markets & Firm Equilibrium",
        priority: 5,
        simpleIdea: "Perfect Competition is like a roadside rice market where 500 sellers sell identical rice and cannot change the price. Monopoly is like the only railway in town—one company decides the fare.",
        simplerVersion: "পূর্ণ প্রতিযোগিতামূলক বাজারে অসংখ্য ক্রেতা-বিক্রেতা থাকে এবং সমজাতীয় পণ্য বিক্রি হয়, তাই কোনো একক ফার্ম দাম নিয়ন্ত্রণ করতে পারে না (Price Taker)। কিন্তু একচেটিয়া বাজারে একজন মাত্র বিক্রেতা থাকে (Price Maker)।",
        banglaExplanation: "পূর্ণ প্রতিযোগিতায় ফার্মের দাম স্থির থাকায় P = AR = MR হয় (একটি অনুভূমিক সমান্তরাল সরলরেখা)। একচেটিয়া বাজারে বেশি বিক্রির জন্য দাম কমাতে হয়, তাই AR ও MR রেখা নিম্নগামী হয় এবং MR রেখা AR রেখার নিচে অবস্থান করে। উভয় বাজারে ফার্মের ভারসাম্যের শর্ত: ১) MR = MC এবং ২) MC রেখা MR রেখাকে নিচ থেকে ছেদ করবে।",
        keywords: [
          { term: "Perfect Competition", def: "A market structure with numerous buyers and sellers, homogeneous products, free entry/exit, and firms as price takers." },
          { term: "Monopoly", def: "A market with a single producer/seller possessing high barriers to entry and strong control over market price (price maker)." },
          { term: "Equilibrium Conditions", def: "Condition 1 (Necessary): MC = MR; Condition 2 (Sufficient): MC curve must cut MR curve from below." }
        ],
        technicalExplanation: "In perfect competition, economic profit in the long run is driven to zero (normal profit where P = minimum LAC) due to free entry and exit. In monopoly, persistent supernormal profits can exist in the long run due to high barriers to entry, causing allocative inefficiency and deadweight loss where P > MC.",
        realLifeExample: "Agricultural commodities (e.g., standard raw wheat grains) represent near-perfect competition, while national power grids (e.g., BPDB) operate as natural monopolies.",
        examAnswers: {
          twoMark: "A firm achieves short-run equilibrium where Marginal Cost equals Marginal Revenue (MC = MR) and the MC curve cuts the MR curve from below.",
          fiveMark: "Key Differences: Perfect Competition vs Monopoly:\n1. Sellers: Infinite small price-taking sellers vs Single price-setting firm.\n2. Product Nature: Homogeneous identical goods vs Unique product with no close substitutes.\n3. Demand Curve: Horizontal perfectly elastic (P = AR = MR) vs Downward-sloping inelastic demand (AR > MR).\n4. Long-run Profits: Normal profit only (P = LAC) vs Potential supernormal profits protected by high barriers to entry.",
          tenMark: "Comprehensive Analysis of Firm Equilibrium in Perfect Competition vs Monopoly:\n\n1. Mathematical & Graphical Equilibrium Proof: MR = MC condition and second-order derivative criteria.\n2. Short-run Profit Scenarios: Supernormal profit (TR > TC), Normal profit (TR = TC), and Loss/Shutdown Point (P < AVC).\n3. Social Welfare & Deadweight Loss: Efficiency comparison between P = MC (allocatively efficient perfect competition) vs P > MC (allocatively inefficient monopoly restriction of output)."
        },
        commonMistakes: "Drawing the AR and MR curves identical in a monopoly, or forgetting the second condition of firm equilibrium.",
        mcqs: [
          {
            question: "Under which market structure is the firm a 'Price Taker' with a horizontal demand curve where P = AR = MR?",
            options: [
              "Monopoly",
              "Oligopoly",
              "Monopolistic Competition",
              "Perfect Competition"
            ],
            correct: 3,
            difficulty: "Medium",
            explanation: "In perfect competition, individual firms have no market power over price; they accept the market equilibrium price, so P = AR = MR."
          }
        ],
        flashcards: [
          { front: "What are the two conditions for firm equilibrium in any market?", back: "1. MC = MR (Necessary condition); 2. MC curve must intersect MR curve from below (Sufficient condition)." }
        ],
        recallQuestion: "Compare the demand and revenue curves (AR and MR) of a firm under Perfect Competition and Monopoly."
      }
    ]
  },
  {
    topicId: 6,
    title: "Topic 6: Overview of Macroeconomics",
    priority: 5,
    description: "National income accounting methods, GDP, Double Counting Problem, NDP, GNP, GDP to Disposable Income, Net Economic Welfare.",
    concepts: [
      {
        id: "econ-t6-c1",
        title: "National Income Aggregates: GDP, GNP, NDP & Double Counting",
        priority: 5,
        simpleIdea: "GDP is the total market price tag of everything made inside the nation's borders in a year. Double counting is accidentally adding the cost of flour twice when making bread.",
        simplerVersion: "GDP হলো একটি দেশের ভৌগোলিক সীমানার ভেতরে এক বছরে উৎপাদিত সব চূড়ান্ত পণ্য ও সেবার মোট আর্থিক মূল্য। দ্বৈত গণনা (Double counting) পরিহার করতে কেবল চূড়ান্ত দ্রব্যের মূল্য অথবা Value Added যোগ করতে হয়।",
        banglaExplanation: "জাতীয় আয় পরিমাপের তিনটি পদ্ধতি রয়েছে: উৎপাদন পদ্ধতি, আয় পদ্ধতি এবং ব্যয় পদ্ধতি। GDP (Gross Domestic Product) দেশের ভেতরে উৎপাদন মাপে, আর GNP (Gross National Product) দেশের নাগরিকদের বিশ্বব্যাপী অর্জিত মোট আয় মাপে (GNP = GDP + Net Factor Income from Abroad)।",
        keywords: [
          { term: "Gross Domestic Product (GDP)", def: "The total market value of all final goods and services produced within the geographic borders of a country in a year." },
          { term: "Gross National Product (GNP)", def: "Total market value of final goods/services produced by the permanent residents/citizens of a nation, including net factor income from abroad." },
          { term: "Double Counting Problem", def: "The error of calculating the value of intermediate goods multiple times at each stage of production." },
          { term: "Disposable Income (DI)", def: "Personal income remaining after paying personal direct taxes, available for consumption spending or saving." }
        ],
        technicalExplanation: "National Income Identity: GDP = C + I + G + (X - M). Net Domestic Product (NDP) = GDP - Depreciation (Capital Consumption Allowance). Double counting is systematically resolved using either the Final Goods Method or the Value Added Method (Value of Output - Intermediate Consumption).",
        realLifeExample: "Farmer sells wheat for $10 -> Miller makes flour sold for $18 (Value Added = $8) -> Baker bakes bread sold for $25 (Value Added = $7). Total GDP counted = $25, not 10 + 18 + 25 = $53.",
        examAnswers: {
          twoMark: "GDP measures the market value of final goods produced within a country's domestic borders, while GNP measures output generated by a country's citizens globally, adding Net Factor Income from Abroad (NFIA).",
          fiveMark: "The Double Counting Problem & Its Solution:\n1. The Problem: If intermediate goods (e.g., cotton and yarn) are added alongside final goods (shirts), the true national income is artificially inflated.\n2. Solution 1 - Final Output Method: Count only the retail market price of final goods purchased by the end-consumer.\n3. Solution 2 - Value Added Method: Sum only the net value added (Output - Intermediate consumption) at each consecutive stage of manufacturing.",
          tenMark: "Comprehensive Framework of National Income Accounting & Welfare Measurement:\n\n1. Measurement Methodologies: Product Method (Value Added), Income Method (Wages + Rent + Interest + Profit), Expenditure Method (C + I + G + NX).\n2. Sequence from GDP to Disposable Income: GDP -> NDP (subtract depreciation) -> NNI at factor cost -> Personal Income -> Disposable Personal Income (DPI = PI - Personal Taxes).\n3. Limitations of GDP as a Measure of Well-being & Net Economic Welfare (NEW): Exclusion of non-market transactions, environmental degradation, income inequality, and underground economies."
        },
        commonMistakes: "Adding raw materials and intermediate goods into the national income calculation alongside final products.",
        mcqs: [
          {
            question: "How is GNP calculated from GDP?",
            options: [
              "GNP = GDP - Depreciation",
              "GNP = GDP + Net Factor Income from Abroad (NFIA)",
              "GNP = GDP + Indirect Business Taxes",
              "GNP = GDP - Total Imports"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "GNP equals GDP plus Net Factor Income from Abroad (income earned by domestic citizens overseas minus income earned by foreigners domestically)."
          }
        ],
        flashcards: [
          { front: "What is the formula for calculating GDP via the expenditure approach?", back: "GDP = C + I + G + (X - M) [Consumption + Investment + Government Spending + Net Exports]." }
        ],
        recallQuestion: "Explain the Double Counting problem in national income measurement and state how the Value Added method solves it."
      }
    ]
  },
  {
    topicId: 7,
    title: "Topic 7: International Trade",
    priority: 4,
    description: "Domestic vs international trade, Balance of Trade vs Balance of Payments, Free trade vs Protectionism, Absolute vs Comparative advantage.",
    concepts: [
      {
        id: "econ-t7-c1",
        title: "Trade Theories, Balance of Trade vs. Balance of Payments & Protectionism",
        priority: 4,
        simpleIdea: "If Bangladesh can produce jute cheaper than anyone, and Germany can produce sports cars cheaper, both countries win by trading what they make best.",
        simplerVersion: "দেশের অভ্যন্তরে কেনাবেচা হলো অভ্যন্তরীণ বাণিজ্য, আর দুই বা ততোধিক দেশের মধ্যে বাণিজ্য হলো আন্তর্জাতিক বাণিজ্য। অ্যাডাম স্মিথ পরম ব্যয় সুবিধা (Absolute Advantage) এবং রিকার্ডো তুলনামূলক ব্যয় সুবিধা (Comparative Advantage) তত্ত্ব দেন।",
        banglaExplanation: "Balance of Trade (বাণিজ্য ভারসাম্য) শুধুমাত্র দৃশ্যমান পণ্যের আমদানি ও রপ্তানির আর্থিক পার্থক্য। কিন্তু Balance of Payments (লেনদেন ভারসাম্য) একটি দেশের দৃশ্যমান, অদৃশ্যমান (সেবা) এবং মূলধনী লেনদেনের সামগ্রিক হিসাব।",
        keywords: [
          { term: "Balance of Trade (BOT)", def: "The difference in monetary value between a nation's visible exports and visible imports of physical merchandise." },
          { term: "Balance of Payments (BOP)", def: "A comprehensive accounting record of all economic transactions between residents of a country and the rest of the world (Current + Capital + Financial Accounts)." },
          { term: "Comparative Advantage", def: "The ability of an economy to produce a good at a lower opportunity cost than another country (David Ricardo)." }
        ],
        technicalExplanation: "Even if country A possesses absolute efficiency superiority in all manufactured goods over country B, beneficial trade occurs if each country specializes according to lowest opportunity cost ratios. Protectionism instruments include ad valorem tariffs, quotas, and export subsidies.",
        realLifeExample: "Bangladesh specializes in ready-made garments (RMG) due to lower opportunity cost in labor-intensive sewing, trading for high-tech microprocessors from Japan.",
        examAnswers: {
          twoMark: "Balance of Trade (BOT) covers only visible trade in merchandise goods, while Balance of Payments (BOP) is a complete record of all economic transactions (visible goods, services, and capital transfers).",
          fiveMark: "Absolute Advantage vs Comparative Advantage:\n1. Originator: Adam Smith (Absolute Advantage, 1776) vs David Ricardo (Comparative Advantage, 1817).\n2. Absolute Advantage: Ability to produce more units of a good using the exact same quantity of physical resources.\n3. Comparative Advantage: Ability to produce a good at a lower opportunity cost compared to trading partners.\n4. Implication: Ricardo proved that mutually beneficial trade occurs even if one nation has no absolute advantage anywhere.",
          tenMark: "In-Depth Study of International Trade Dynamics, Balance of Payments, and Protectionism:\n\n1. Structure of the Balance of Payments: Current Account (Goods, Services, Primary & Secondary income transfers), Capital Account, and Financial Account.\n2. Theories of International Specialization: Classical Ricardian model, Heckscher-Ohlin Factor Endowment theorem.\n3. Free Trade vs Protectionism Arguments: Infant industry protection, prevention of dumping, national security vs consumer deadweight loss and retaliation risks."
        },
        commonMistakes: "Using Balance of Trade and Balance of Payments as identical terms.",
        mcqs: [
          {
            question: "Who formulated the Theory of Comparative Advantage based on opportunity costs?",
            options: ["Adam Smith", "David Ricardo", "John Maynard Keynes", "Alfred Marshall"],
            correct: 1,
            difficulty: "Easy",
            explanation: "David Ricardo developed the Theory of Comparative Advantage in 1817."
          }
        ],
        flashcards: [
          { front: "Differentiate Balance of Trade (BOT) from Balance of Payments (BOP).", back: "BOT = Visible Merchandise Exports minus Imports only. BOP = Total record of visible, invisible services, capital, and financial flows." }
        ],
        recallQuestion: "State the principle of Comparative Advantage and explain why Balance of Payments always balances in accounting terms."
      }
    ]
  },
  {
    topicId: 8,
    title: "Topic 8: Growth and Development",
    priority: 4,
    description: "Economic Growth vs Economic Development, measurement metrics (GDP vs HDI), obstacles to development in developing economies.",
    concepts: [
      {
        id: "econ-t8-c1",
        title: "Economic Growth vs. Development & Human Development Index (HDI)",
        priority: 4,
        simpleIdea: "Growth is getting taller and earning more money. Development is becoming healthier, smarter, happier, and living in a fair society.",
        simplerVersion: "Economic Growth হলো কেবল দেশের মোট উৎপাদন বা আয় (GDP) বৃদ্ধি পাওয়া। আর Economic Development হলো মানুষের সার্বিক জীবনযাত্রার মান, শিক্ষা ও স্বাস্থ্যের প্রকৃত উন্নতি হওয়া।",
        banglaExplanation: "অর্থনৈতিক প্রবৃদ্ধি (Growth) হলো সংখ্যাগত বা পরিমাণগত পরিবর্তন (Real GDP বৃদ্ধি)। অপরদিকে অর্থনৈতিক উন্নয়ন (Development) হলো গুণগত পরিবর্তন যা দারিদ্র্য হ্রাস, স্বাস্থ্যসেবা ও শিক্ষার প্রসার এবং আয় বৈষম্য নিরসন নিশ্চিত করে।",
        keywords: [
          { term: "Economic Growth", def: "A quantitative increase in a nation's real gross domestic product (Real GDP) or per capita output over time." },
          { term: "Economic Development", def: "A qualitative and multidimensional process involving structural transformation, poverty eradication, education, and health improvements." },
          { term: "Human Development Index (HDI)", def: "A composite UN metric measuring three dimensions: Long and healthy life, Knowledge (education), and a Decent standard of living (GNI per capita)." }
        ],
        technicalExplanation: "Economic growth without development is 'growth without equity' or 'jobless growth'. Measurement entails real per capita GDP adjustments alongside composite indexes like HDI, Multidimensional Poverty Index (MPI), and Gender Inequality Index (GII).",
        realLifeExample: "A country discovering oil might see GDP soar by 20% (Growth), but if citizens remain illiterate without schools or hospitals, Development has failed.",
        examAnswers: {
          twoMark: "Economic Growth is a quantitative increase in a nation's real GDP, whereas Economic Development is a qualitative improvement in human welfare, institutions, and living standards.",
          fiveMark: "Differences between Economic Growth and Economic Development:\n1. Nature: Growth is quantitative (increase in numbers/output); Development is qualitative and structural.\n2. Scope: Growth is a narrower concept; Development is multidimensional and comprehensive.\n3. Indicators: Growth uses Real GDP and Per Capita Income; Development uses HDI, literacy rates, and life expectancy.\n4. Prerequisite: Growth can occur without development, but sustained development requires growth.",
          tenMark: "Comprehensive Analysis of Economic Development, Structural Bottlenecks & Modern Metrics:\n\n1. Core Indicators: Limitations of per capita income, Construction of HDI (Life expectancy index, Education index, GNI index geometric mean).\n2. Vicious Circle of Poverty (Ragnar Nurkse): Low income -> Low savings -> Low capital accumulation -> Low productivity -> Low income.\n3. Contemporary Development Paradigms: Sustainable Development Goals (SDGs), institutional reforms, human capital formation, and environmental sustainability."
        },
        commonMistakes: "Stating that Economic Growth and Economic Development are the same thing.",
        mcqs: [
          {
            question: "Which of the following composite indices measures Life Expectancy, Education, and GNI Per Capita?",
            options: [
              "Gross Domestic Product (GDP)",
              "Consumer Price Index (CPI)",
              "Human Development Index (HDI)",
              "Balance of Payments (BOP)"
            ],
            correct: 2,
            difficulty: "Easy",
            explanation: "The UN Human Development Index (HDI) combines health (life expectancy), knowledge (schooling), and standard of living (GNI per capita)."
          }
        ],
        flashcards: [
          { front: "What are the 3 core dimensions included in the Human Development Index (HDI)?", back: "1. Long and healthy life (Life expectancy); 2. Knowledge (Years of schooling); 3. Decent standard of living (GNI per capita PPP)." }
        ],
        recallQuestion: "Distinguish between Economic Growth and Economic Development with 4 clear points of contrast."
      }
    ]
  },
  {
    topicId: 9,
    title: "Topic 9: Money, Value of Money and Inflation",
    priority: 5,
    description: "Definition & functions of money, money supply measures (M1, M2, M3), Value of Money, Inflation and Deflation concepts, causes and remedies.",
    concepts: [
      {
        id: "econ-t9-c1",
        title: "Functions of Money, Money Supply (M1/M2/M3) & Inflation Dynamics",
        priority: 5,
        simpleIdea: "Inflation is when your money loses its buying power: last year 100 taka bought 5 eggs, this year 100 taka buys only 3 eggs.",
        simplerVersion: "মুদ্রাস্ফীতি (Inflation) হলো যখন কোনো দেশে পণ্যের দাম সাধারণ ও ক্রমাগতভাবে বৃদ্ধি পায় এবং টাকার ক্রয়ক্ষমতা বা মান কমে যায়।",
        banglaExplanation: "অর্থের প্রধান কাজ চারটি: বিনিময়ের মাধ্যম, মূল্যের পরিমাপক, স্থগিত দেনা-পাওনার মান, এবং মূল্যের সঞ্চয়। মুদ্রাস্ফীতি দুই প্রকার: Demand-Pull (অতিরিক্ত চাহিদাজনিত) এবং Cost-Push (উৎপাদন খরচ বৃদ্ধিজাত)।",
        keywords: [
          { term: "Functions of Money", def: "Medium of exchange, Unit of account, Store of value, and Standard of deferred payment." },
          { term: "Money Supply (M1, M2)", def: "M1 = Currency in circulation + demand deposits; M2 = M1 + savings deposits and small time deposits." },
          { term: "Demand-Pull Inflation", def: "Inflation initiated by aggregate demand exceeding aggregate supply ('too much money chasing too few goods')." },
          { term: "Cost-Push Inflation", def: "Inflation driven by rising costs of production inputs (wages, raw materials, fuel) shifting aggregate supply leftward." }
        ],
        technicalExplanation: "Fisher's Quantity Theory of Money equation of exchange: MV = PT (Money supply × Velocity = Price level × Transaction volume). Holding V and T constant, a proportional increase in M leads to an identical percentage rise in P. Value of money Vm = 1/P.",
        realLifeExample: "When global oil prices skyrocket, transportation and factory electricity costs escalate, leading to Cost-Push Inflation in grocery prices.",
        examAnswers: {
          twoMark: "Inflation is a sustained and generalized increase in the overall price level of goods and services over time, which reduces the purchasing power of money.",
          fiveMark: "Demand-Pull vs Cost-Push Inflation:\n1. Trigger: Demand-Pull is triggered by excess aggregate demand (C+I+G+NX); Cost-Push is triggered by supply shocks and higher production costs.\n2. Curve Shifts: Demand-Pull shifts AD curve rightward; Cost-Push shifts AS curve leftward.\n3. Output Effect: Demand-Pull initially expands output; Cost-Push decreases output, potentially inducing stagflation.\n4. Remedies: Demand-Pull requires contractionary monetary/fiscal policy; Cost-Push requires supply-side incentives and subsidy interventions.",
          tenMark: "Comprehensive Examination of Monetary Economics & Inflation Theory:\n\n1. Hierarchy of Money Supply: M1 (narrow money / currency + checkable deposits), M2 (M1 + near-money savings), M3 (broad money including long-term institutional deposits).\n2. Classical Quantity Theory of Money (Fisher's equation MV = PT, Cambridge cash-balance equation M = kPY).\n3. Socio-economic Impacts of Inflation: Debtors gain while creditors lose; fixed-income earners suffer decline in real wages; speculative hoarding vs productive investment incentives."
        },
        commonMistakes: "Calling a single price jump in one item (like onions) inflation; inflation must be sustained and across general prices.",
        mcqs: [
          {
            question: "Which type of inflation occurs when the aggregate demand for goods outpaces aggregate productive supply?",
            options: [
              "Cost-Push Inflation",
              "Demand-Pull Inflation",
              "Hyperdeflation",
              "Built-in wage push"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "Demand-Pull inflation arises when high aggregate demand pulls price levels upwards ('too much money chasing too few goods')."
          }
        ],
        flashcards: [
          { front: "What is Fisher's Equation of Exchange in Monetary Economics?", back: "MV = PT (where M = Money supply, V = Velocity of money, P = General price level, T = Total transactions volume)." }
        ],
        recallQuestion: "State the 4 primary functions of money and explain the difference between Demand-Pull and Cost-Push inflation."
      }
    ]
  },
  {
    topicId: 10,
    title: "Topic 10: Government Revenue and Expenditure",
    priority: 5,
    description: "Public vs private finance, sources of government revenue, Direct vs Indirect taxation, Revenue & Development budgets, Surplus vs Deficit budgets.",
    concepts: [
      {
        id: "econ-t10-c1",
        title: "Public Finance, Direct vs. Indirect Taxes & Fiscal Budget Structures",
        priority: 5,
        simpleIdea: "Private finance is balancing your family piggy bank. Public finance is the national government collecting taxes from millions to build bridges, schools, and hospitals.",
        simplerVersion: "সরকারি অর্থব্যবস্থা হলো সরকারের আয় ও ব্যয়ের সামগ্রিক ব্যবস্থাপনা। প্রত্যক্ষ কর (Direct Tax) ব্যক্তির আয়ের ওপর সরাসরি ধরা হয়, আর পরোক্ষ কর (Indirect Tax/VAT) পণ্যের দামের সাথে যুক্ত থাকে।",
        banglaExplanation: "সরকারি অর্থব্যবস্থার প্রধান উদ্দেশ্য সমাজকল্যাণ। সরকারের আয়ের প্রধান উৎস কর (Tax) এবং কর-বহির্ভূত উৎস (Non-tax revenue)। বাজেট মূলত দুই ভাগে বিভক্ত: রাজস্ব বাজেট (দৈনন্দিন পরিচালনা ব্যয়) এবং উন্নয়ন বাজেট (বার্ষিক উন্নয়ন কর্মসূচি বা ADP)।",
        keywords: [
          { term: "Public Finance", def: "The study of government revenue collection, public expenditure, sovereign debt, and fiscal policy management." },
          { term: "Direct Tax", def: "A tax levied directly on the income or wealth of a taxpayer whose burden cannot be shifted to others (e.g., Income Tax)." },
          { term: "Indirect Tax", def: "A tax levied on goods and services where the incidence can be shifted onto the final consumer (e.g., Value Added Tax - VAT)." },
          { term: "Deficit Budget", def: "A fiscal budget where total projected government expenditure exceeds total expected revenue receipts." }
        ],
        technicalExplanation: "Principles of Taxation (Adam Smith's Canons: Equity, Certainty, Convenience, Economy). Progressive tax systems impose higher marginal rates on affluent brackets, whereas indirect consumption taxes tend to be regressive unless luxury items are specifically targeted. Deficit financing is covered by domestic borrowing, treasury bonds, or foreign loans.",
        realLifeExample: "Paying individual personal Income Tax (Direct Tax) based on your annual salary, and paying 15% VAT (Indirect Tax) when purchasing a laptop.",
        examAnswers: {
          twoMark: "A Direct Tax is paid directly to the government by the individual on whom it is imposed and cannot be shifted (e.g., Income Tax), while an Indirect Tax is collected by an intermediary and passed on to consumers (e.g., VAT).",
          fiveMark: "Revenue Budget vs Development Budget:\n1. Revenue Budget: Deals with routine recurring operational expenses of the government (civil service salaries, defense, interest on debt) funded by normal tax yields.\n2. Development Budget: Dedicated to capital formation, infrastructure creation, and long-term socio-economic assets (roads, power plants, bridges) through the Annual Development Programme (ADP).\n3. Timeline: Revenue maintains ongoing governance; Development builds future production capacity.",
          tenMark: "Comprehensive Analysis of Public Revenue Architecture, Fiscal Policy & Budgetary Deficits:\n\n1. Sources of Public Revenue: Tax revenues (Direct: Income tax, Corporate tax; Indirect: VAT, Customs duties, Excise) and Non-tax revenues (Fees, Fines, State-owned Enterprise dividends).\n2. Budget Categories: Balanced Budget (Revenue = Expenditure), Surplus Budget (Revenue > Expenditure, used during inflationary booms), Deficit Budget (Expenditure > Revenue, standard in developing nations to stimulate growth).\n3. Deficit Financing Methods: Printing new central bank currency, commercial bank borrowing, issuing Treasury bonds, and external sovereign loans with macroeconomic debt sustainability implications."
        },
        commonMistakes: "Thinking VAT is a direct tax, or assuming a deficit budget is always harmful for a developing country.",
        mcqs: [
          {
            question: "Which of the following is an example of a Direct Tax?",
            options: [
              "Value Added Tax (VAT)",
              "Customs Import Duty",
              "Personal Income Tax",
              "Excise Duty on fuel"
            ],
            correct: 2,
            difficulty: "Easy",
            explanation: "Personal Income Tax is levied directly on an individual's earnings and cannot be shifted to another party."
          }
        ],
        flashcards: [
          { front: "What are Adam Smith's Four Canons of Taxation?", back: "1. Canon of Equity (fairness); 2. Canon of Certainty; 3. Canon of Convenience; 4. Canon of Economy." }
        ],
        recallQuestion: "Distinguish between Direct and Indirect Taxes, giving two clear examples of each."
      }
    ]
  }
];
