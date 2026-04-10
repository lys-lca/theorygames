/* -------------------------------------------------------
   DATA-ECONOMICS.JS — LC Economics (Higher Level)
   Same schema as all other data files.
   isAcronym is false for most economics entries as they
   are concepts, not acronyms — set true only where the
   term is genuinely an acronym suitable for the match game.
------------------------------------------------------- */

const dataEconomics = [

    /* ── Strand 1 — What Is Economics About? ── */
    {
        acronym:   "Economics thinking",
        full:      "Using models & data to analyse behaviour",
        hint:      "Think models, data, and evaluating policies.",
        answer:    "HL economics requires using models, theories, and real data to analyse behaviour, distinguish positive and normative statements, and evaluate differing policy solutions based on evidence.",
        category:  "Strand 1 — What Is Economics About?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand1_1.png"
    },
    {
        acronym:   "Positive vs normative",
        full:      "Fact-based statements vs value-based opinions",
        hint:      "One is testable, the other is opinion.",
        answer:    "Positive statements are fact-based and testable, while normative statements express value-based opinions on what should happen. Distinguishing them is essential for economic analysis.",
        category:  "Strand 1 — What Is Economics About?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand1_2.png"
    },
    {
        acronym:   "Scarcity & choice",
        full:      "Limited resources force decisions with opportunity cost",
        hint:      "Always think opportunity cost.",
        answer:    "HL students evaluate how limited resources force choices, analyse opportunity cost, predict consequences of decisions, and assess how incentives influence individuals, firms and governments.",
        category:  "Strand 1 — What Is Economics About?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand1_3.png"
    },
    {
        acronym:   "Sustainability",
        full:      "Economic, social and environmental balance",
        hint:      "Three interconnected pillars.",
        answer:    "Students must evaluate how economic, social and environmental sustainability interact, interpret indicators like inequality and emissions, and analyse development trade-offs.",
        category:  "Strand 1 — What Is Economics About?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand1_4.png"
    },

    /* ── Strand 2 — How Are Economic Decisions Made? ── */
    {
        acronym:   "Demand & supply",
        full:      "Analyse equilibrium using graphs",
        hint:      "Draw, shift, explain.",
        answer:    "HL students construct and interpret graphs, analyse equilibrium changes, and evaluate real-world factors such as technology, taxation and income shifts that cause demand or supply to change.",
        category:  "Strand 2 — How Are Economic Decisions Made?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand2_1.png"
    },
    {
        acronym:   "PED",
        full:      "Price Elasticity of Demand",
        hint:      "How sensitive demand is to a price change.",
        answer:    "PED measures the responsiveness of quantity demanded to a change in price. A PED greater than 1 is elastic (demand changes significantly), less than 1 is inelastic. Used to predict revenue changes.",
        category:  "Strand 2 — How Are Economic Decisions Made?",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand2_2.png"
    },
    {
        acronym:   "YED",
        full:      "Income Elasticity of Demand",
        hint:      "How demand changes as income rises or falls.",
        answer:    "YED measures how demand for a good changes in response to a change in consumer income. Positive YED = normal good; negative YED = inferior good. Used to classify goods and predict spending patterns.",
        category:  "Strand 2 — How Are Economic Decisions Made?",
        subject:   "Economics",
        isAcronym: true,
        image:     ""
    },
    {
        acronym:   "MC = MR",
        full:      "Profit maximisation rule",
        hint:      "The point where the last unit adds equal cost and revenue.",
        answer:    "A firm maximises profit where Marginal Cost equals Marginal Revenue. HL requires applying this using diagrams, analysing short-run versus long-run decisions, and evaluating economies or diseconomies of scale.",
        category:  "Strand 2 — How Are Economic Decisions Made?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand2_3.png"
    },
    {
        acronym:   "Government intervention",
        full:      "Taxes, subsidies and regulation to correct failures",
        hint:      "Correcting market failures.",
        answer:    "Students evaluate the effectiveness of taxes, subsidies and regulation in correcting externalities, imperfect information and market power problems in markets.",
        category:  "Strand 2 — How Are Economic Decisions Made?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand2_4.png"
    },

    /* ── Strand 3 — What Can Markets Do? ── */
    {
        acronym:   "HHI",
        full:      "Herfindahl-Hirschman Index",
        hint:      "Measures market concentration.",
        answer:    "The HHI is calculated by summing the squares of the market share percentages of all firms in a market. A higher HHI indicates a more concentrated, less competitive market. Used by regulators to assess monopoly power.",
        category:  "Strand 3 — What Can Markets Do?",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand3_1.png"
    },
    {
        acronym:   "MRP",
        full:      "Marginal Revenue Product",
        hint:      "The extra revenue from hiring one more worker.",
        answer:    "MRP is the additional revenue generated by employing one more unit of labour. It equals Marginal Physical Product multiplied by the product's price. Firms hire workers up to the point where MRP equals the wage rate.",
        category:  "Strand 3 — What Can Markets Do?",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand3_2.png"
    },
    {
        acronym:   "Market failure",
        full:      "When markets allocate resources inefficiently",
        hint:      "Externalities, monopoly, information.",
        answer:    "Market failure occurs when the free market fails to allocate resources efficiently. Causes include negative externalities, monopoly power, public goods, and imperfect information. Corrective policies include taxes, subsidies and regulation.",
        category:  "Strand 3 — What Can Markets Do?",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand3_3.png"
    },

    /* ── Strand 4 — Policy and Economic Performance ── */
    {
        acronym:   "GDP",
        full:      "Gross Domestic Product",
        hint:      "Total value of goods produced within a country.",
        answer:    "GDP measures the total monetary value of all goods and services produced within a country's borders in a given period. It is the most widely used measure of national income and economic size.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand4_1.png"
    },
    {
        acronym:   "GNP",
        full:      "Gross National Product",
        hint:      "Includes income earned abroad by residents.",
        answer:    "GNP measures the total value of goods and services produced by a country's residents, regardless of location. Unlike GDP, it includes income earned abroad but excludes income earned domestically by foreign residents.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: true,
        image:     ""
    },
    {
        acronym:   "GNI",
        full:      "Gross National Income",
        hint:      "Similar to GNP but based on income flows.",
        answer:    "GNI is the total income received by a country's residents from both domestic and foreign sources. For Ireland, GNI is a more reliable indicator than GDP due to distortions caused by multinational corporation activity.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: true,
        image:     ""
    },
    {
        acronym:   "Fiscal policy",
        full:      "Government spending and taxation decisions",
        hint:      "Think multipliers and EU constraints.",
        answer:    "Fiscal policy involves government decisions on taxation and public spending to influence the economy. HL students analyse deficits, surpluses, the fiscal stance, and EU/Eurozone limits on government borrowing.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand4_2.png"
    },
    {
        acronym:   "ECB",
        full:      "European Central Bank",
        hint:      "Sets interest rates for the entire Eurozone.",
        answer:    "The ECB is the central bank for the Eurozone. It sets interest rates and controls monetary policy for all euro-area countries. Ireland, as a Eurozone member, cannot set its own interest rates independently.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand4_3.png"
    },
    {
        acronym:   "Credit creation",
        full:      "Banks expand money supply by lending",
        hint:      "Banks create money by lending.",
        answer:    "Commercial banks create credit by lending out a multiple of their deposits. When a bank makes a loan, it creates a new deposit, expanding the money supply. The credit multiplier determines how much money can be created from an initial deposit.",
        category:  "Strand 4 — Policy and Economic Performance",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand4_4.png"
    },

    /* ── Strand 5 — International Economics ── */
    {
        acronym:   "IHDI",
        full:      "Inequality-adjusted Human Development Index",
        hint:      "Adjusts HDI for inequality within a country.",
        answer:    "The IHDI adjusts the standard Human Development Index for inequality in health, education and income. A country with high inequality will score lower on the IHDI than on the HDI, revealing the true distribution of development.",
        category:  "Strand 5 — International Economics",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand5_1.png"
    },
    {
        acronym:   "FDI",
        full:      "Foreign Direct Investment",
        hint:      "When a foreign company invests in another country.",
        answer:    "FDI occurs when a company or individual in one country makes an investment in business interests in another country, such as establishing operations or acquiring business assets. Ireland attracts significant FDI from US multinationals.",
        category:  "Strand 5 — International Economics",
        subject:   "Economics",
        isAcronym: true,
        image:     "images/economics/strand5_2.png"
    },
    {
        acronym:   "Comparative advantage",
        full:      "Produce what you give up least to make",
        hint:      "Opportunity cost determines specialisation.",
        answer:    "Comparative advantage states that a country should specialise in producing goods where it has the lowest opportunity cost, even if another country is more efficient at producing everything. This forms the basis of free trade theory.",
        category:  "Strand 5 — International Economics",
        subject:   "Economics",
        isAcronym: false,
        image:     "images/economics/strand5_3.png"
    },

];
