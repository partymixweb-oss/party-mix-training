/* =====================================================================
   PARTY MIX PERTH TRAINING ACADEMY - CONTENT
   Edit this file to change lessons, quizzes and skills.
   Each module: lessons (reading), videos (optional), skills (tick lists),
   quiz (multiple choice). Quiz item: {q, o:[options], a:correctIndex, w:"why"}
   To add a video, paste a YouTube / Google Drive / Connecteam link in `url`.
   ===================================================================== */
window.PM_CONTENT = {
  passMark: 0.8, // 4 out of 5
  modules: [

  /* ------------------------------------------------------------ 1 */
  {
    id: "service", icon: "🙋", title: "Customer Service",
    blurb: "How we greet, talk to and look after every customer.",
    lessons: [
      { title: "Say it the Party Mix way", body: `
        <p>The words we choose set the mood of the whole store. Great service isn't one-size-fits-all: <strong>read the customer's vibe and match it</strong>.</p>
        <h4>Swap these phrases</h4>
        <table>
          <tr><th>Instead of...</th><th>Say...</th></tr>
          <tr><td>"Yeah?" / "What do you want?"</td><td>"Hi there! How can I help you today?" or "What can I help you find?"</td></tr>
          <tr><td>"No worries" / "No problem"</td><td>"You're very welcome!" or "It's my pleasure!"</td></tr>
          <tr><td>"Hold on" / "Just wait"</td><td>"One moment please, let me check that for you." or "Thank you for your patience."</td></tr>
        </table>
        <h4>Match their vibe</h4>
        <ul>
          <li>🎉 <strong>The Party Planner (high energy):</strong> get excited about their theme and match their hype.</li>
          <li>👔 <strong>The Corporate / ABN client (professional):</strong> keep it polished, direct and professional.</li>
          <li>⏳ <strong>The Stressed Parent (quick and calm):</strong> short, clear and reassuring. Get them what they need fast.</li>
          <li>💬 <strong>The Casual Chitchatter:</strong> relaxed, friendly, have a laugh, but stay respectful.</li>
        </ul>
        <div class="warn"><strong>Avoid:</strong> casual slang like "bro", "dude" or "hey guys". Don't start a sentence with a blunt "No." Say "We're actually out of stock of that colour right now, but let me show you what we have!"</div>
        <div class="tip">Mirror, don't mimic. Match their pace and formality, not their exact slang.</div>` },
      { title: "Body language and floor vibe", body: `
        <p>Most of how we come across is body language, not words. Customers notice how you carry yourself the second they walk in.</p>
        <h4>Do</h4>
        <ul>
          <li>👀 Make eye contact and smile, even if you're busy with something else.</li>
          <li>🙌 Open posture: stand tall, hands out of pockets, no crossed arms.</li>
          <li>🧭 Face the customer with your shoulders and feet when you talk to them.</li>
          <li>👋 <strong>The busy acknowledgment:</strong> on the phone or counting stock? Give a nod, a smile and a raised finger for "I'll be right with you!"</li>
        </ul>
        <h4>Vibe killers</h4>
        <ul>
          <li>❌ Looking at your personal phone on the shop floor.</li>
          <li>❌ Slouching on the counters or register.</li>
          <li>❌ Eye-rolling or sighing, even on a frustrating day.</li>
          <li>❌ Huddling in a group of staff, which builds a wall customers are afraid to interrupt.</li>
        </ul>
        <div class="tip">The ideal Party Mix floor vibe: <strong>approachable, helpful and alert.</strong> Walk the floor with purpose and your head up.</div>
        <div class="warn">👀 Keep your eyes open for shoplifters: they often carry large bags or prams. Being visible and friendly with everyone is the best way to keep the shop safe. Never turn your back on a customer.</div>` },
      { title: "The 4-step service journey", body: `
        <ol>
          <li><strong>Serve and acknowledge.</strong> Give customers about <strong>10 seconds</strong> to settle in before you casually approach. Start with friendly chat in a slow, steady, warm tone.</li>
          <li><strong>Assist and ask questions.</strong> "Were you just having a browse today?" gives them space. "Is there a specific theme for the event?" lets you show matching products. If we don't have the exact item, suggest great alternatives.</li>
          <li><strong>Follow up and upsell.</strong> Check back in: "How did you go? Did you find everything you were after today?" If they couldn't find something we <em>do</em> stock, <strong>walk them to it</strong>. Ask "What's the occasion?" to find add-ons.</li>
          <li><strong>End the sale.</strong> Accuracy check: <strong>every item scanned</strong> before you quote the total. Offer a 30c paper bag, make sure they have all their items, and offer to help carry heavy items to the car. Finish warmly: <em>"Enjoy the party, see you next time!"</em> or <em>"Good luck with the cake, see you next time!"</em></li>
        </ol>` }
    ],
    skills: [
      "Waiting about 10 seconds, then greeting warmly",
      "Reading the customer's vibe and matching it",
      "Using the busy acknowledgment (nod, smile, finger up)",
      "Walking a customer to a product instead of pointing",
      "Finishing a sale: scan check, paper bag, warm goodbye"
    ],
    quiz: [
      { q: "How long should you wait before approaching a customer who has just walked in?", o: ["Straight away, before the door closes", "About 10 seconds", "About 2 minutes", "Until they speak to you"], a: 1, w: "The 10-second rule gives them time to settle in so you're noticed, not pounced on." },
      { q: "A customer says thank you. What's the Party Mix way to reply?", o: ["\"No worries\"", "\"No problem\"", "\"You're very welcome!\"", "\"Yep\""], a: 2, w: "We swap casual phrases like 'no worries' for warmer ones like 'You're very welcome' or 'It's my pleasure'." },
      { q: "A customer is very formal and talking about a corporate event. What do you do?", o: ["Use lots of slang to relax them", "Keep your language polished, direct and professional", "Talk as fast as you can", "Leave them alone"], a: 1, w: "Match their formality. Corporate / ABN clients want professional and direct." },
      { q: "Which of these is a 'vibe killer'?", o: ["Making eye contact", "Facing the customer", "Looking at your personal phone on the floor", "Smiling while on a call"], a: 2, w: "The phone stare makes the customer feel like an interruption." },
      { q: "A customer can't find something we DO stock. What should you do?", o: ["Point to the aisle", "Tell them to check online", "Walk them to the item", "Say we're out of stock"], a: 2, w: "Physically walking them there means they know where it is for next time." },
      { q: "At checkout, what comes BEFORE quoting the final price?", o: ["Offering a bag", "Double-checking that every item has been scanned", "Asking for a review", "Printing the receipt"], a: 1, w: "The accuracy check protects both the customer and the shop." }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: "upsell", icon: "🛍️", title: "Upselling (Helpful, Not Pushy)",
    blurb: "Help customers leave with everything they need for a great party.",
    lessons: [
      { title: "The golden rules", body: `
        <p>Every customer has already decided to spend money with us. Upselling isn't pushing extra stuff: it's making sure they don't get home and realise they forgot a balloon weight, cake board or candle. Done right it feels like <strong>helpful advice</strong>.</p>
        <ol>
          <li><strong>Always ask, never assume.</strong> A quick question costs nothing and often adds $10 to $50 to the sale.</li>
          <li><strong>Suggest what actually fits.</strong> Offer a balloon to someone buying a cake box, not someone buying flour.</li>
          <li><strong>Give a reason, not just a product.</strong> Weak: "Would you like a cake board?" Strong: "Do you need a board to sit that under? Most people find it makes carrying and serving so much easier."</li>
        </ol>
        <div class="tip">🎈 <strong>The always rule:</strong> offer a balloon weight and transport bag ($1) with every balloon sale. Every time.</div>
        <div class="tip">🌟 <strong>The golden line:</strong> "Have you sorted <em>[the other obvious thing]</em> yet?" Ask a balloon buyer about cake, a cake buyer about balloons, and anyone carrying a cake about a board. Ask like you're saving them a second trip, because you are.</div>` },
      { title: "Mindset, timing and psychology", body: `
        <h4>1. Offer the next level up</h4>
        <ul>
          <li>Latex balloon ➜ upgrade to a <strong>confetti balloon</strong>.</li>
          <li>Latex bouquet ➜ add a <strong>foil heart or star</strong> to make it pop.</li>
          <li>Baking mix ➜ <strong>cake toppers</strong> or <strong>professional piping bags</strong>.</li>
        </ul>
        <h4>2. The delayed checkout</h4>
        <p><strong>Don't hit pay until the balloons are fully arranged and inflated.</strong> While waiting, customers browse, spot items they missed and prefer adding to one transaction rather than a second receipt.</p>
        <h4>3. Confidence</h4>
        <p>Stay calm, speak slowly and clearly, be the expert: "Adding two silver stars right here will really balance out the colours."</p>
        <h4>4. Gentle urgency</h4>
        <p>"We only have a few of these foil numbers left for this weekend, so let's secure them for your order now." Remind them of prep times (like vinyl orders) so they decide today.</p>
        <h4>5. Read the floor</h4>
        <p>If someone lingers over an item and starts to walk away, step in: "Those neon weights just came in and look amazing with the black latex balloons!"</p>` },
      { title: "Upselling scenes and cheat sheet", body: `
        <h4>🎂 The cake customer</h4>
        <p>"Great choice! Quick question, do you already have a board to sit the cake on? We've got round and square boards from <strong>$1.95</strong> in black, white, silver, or pastel pink and blue." Boxing it up? "Cake boxes from <strong>$3.50</strong> up to tiered sizes make carrying heaps easier without damaging the icing." Kid's birthday? Ask how old they're turning and suggest lolly bag fillers, photobooth props and bunting.</p>
        <h4>🎈 The balloon customer</h4>
        <p>"Who's the birthday balloon for, and what age are they turning?" Milestone birthday (18th, 21st, 30th): the <strong>Sparkling Fizz Birthday Bouquet at $41.40</strong> (age and 'Happy Birthday' foils plus metallic balloons). Size upgrade: <strong>3-balloon arrangement $13.50 ➜ 5-balloon arrangement $20.50</strong>. Practical: weight, and a $1 transport bag so it doesn't tangle in the car.</p>
        <h4>🥳 The kids' party customer</h4>
        <p>"Is this for a specific theme? We can usually put together a full matching set: bunting, napkins, party bags and favours." Cross-sell a number balloon bouquet (from <strong>$78.90</strong>) and cake supplies.</p>
        <h4>🛒 At the register</h4>
        <p>"Before I finish that up, did you want to add a balloon weight, transport bag, or a matching cake board? People almost always wish they'd grabbed one on the way out."</p>
        <table>
          <tr><th>Customer buying...</th><th>Suggest</th></tr>
          <tr><td>Cake mix / icing / Colour Mill</td><td>Cake board, cake box, toppers, piping bags, theme decor</td></tr>
          <tr><td>Balloon arrangement</td><td>Bigger size, foil heart/star, confetti balloon, weight, transport bag, cake box</td></tr>
          <tr><td>Kids theme party pack</td><td>Matching number balloon bouquet, cake supplies, extra lootbag fillers</td></tr>
          <tr><td>Cupcakes</td><td>Cupcake boxes (2 / 4 / 6 / 24 hole), single cupcake gift box</td></tr>
          <tr><td>Milestone birthday</td><td>'Happy Birthday' foil bouquet upgrade, number balloon package</td></tr>
          <tr><td>Pinata</td><td>A pinata stick</td></tr>
          <tr><td>Banner</td><td>Centrepieces</td></tr>
          <tr><td>Buttercream</td><td>Food colour</td></tr>
        </table>` }
    ],
    skills: [
      "Always offering a balloon weight and transport bag",
      "Using the golden line: 'Have you sorted ___ yet?'",
      "Suggesting a size or foil upgrade with a reason",
      "Holding the checkout until balloons are done",
      "Reading the customer so it's helpful, not pushy"
    ],
    quiz: [
      { q: "What do you ALWAYS offer with a balloon sale?", o: ["A cake box", "A balloon weight and transport bag", "A loyalty card", "A candle"], a: 1, w: "The always rule: weight and bag with every balloon sale." },
      { q: "Which is the 'strong' way to offer a cake board?", o: ["\"Want a board?\"", "\"Do you need a board to sit that under? It makes carrying and serving so much easier.\"", "\"You have to buy a board.\"", "\"Boards are on aisle 3.\""], a: 1, w: "Give a reason, not just a product." },
      { q: "Why do we hold the checkout until the balloons are arranged and inflated?", o: ["The till is slow", "Customers browse while waiting and add to one transaction", "It's company policy to annoy people", "So the receipt prints better"], a: 1, w: "The delayed checkout lets customers spot items they missed, and they prefer a single receipt." },
      { q: "A customer is buying a 3-balloon arrangement ($13.50). What's a good upgrade?", o: ["A 5-balloon arrangement for $20.50", "A cake mix", "Nothing, they're not interested", "A pinata"], a: 0, w: "A small price jump makes a much bigger impact on the table." },
      { q: "A customer buys a pinata. What do you offer?", o: ["Centrepieces", "Food colour", "A pinata stick", "A cake box"], a: 2, w: "Suggest what actually fits the purchase." },
      { q: "A balloon buyer is paying. What's the best 'golden line' cross-sell?", o: ["\"Have you sorted a cake yet? Cake boards and boxes are right there.\"", "\"Is that everything? Hurry up please.\"", "\"You should buy more.\"", "\"We have flour.\""], a: 0, w: "'Have you sorted [the other obvious thing] yet?' saves them a second trip." }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: "balloons", icon: "🎈", title: "Balloon Types and Pricing",
    blurb: "What we stock, what it costs, and the FAQs customers ask.",
    lessons: [
      { title: "Our balloon range and the core price rule", body: `
        <div class="tip">🎈 <strong>Core rule:</strong> unless a sticker explicitly says otherwise, every price on a price tag <strong>includes the balloon, helium, string and Hi-Float</strong> (for latex).</div>
        <h4>Latex balloons</h4>
        <ul>
          <li>Helium-inflated in 4 sizes: <strong>30cm, 45cm, 60cm and 90cm</strong>.</li>
          <li>Uninflated in 12cm (air-fill / decoration only). All the sizes above are also available uninflated.</li>
        </ul>
        <h4>Foil balloons</h4>
        <p>A wide range of shapes and sizes: standard 18" round foils, <strong>Orbz</strong> (spheres) and <strong>Supershapes</strong> (large characters and numbers).</p>
        <h4>Prices to know (check the price list before quoting)</h4>
        <table>
          <tr><th>Balloon</th><th>Price</th></tr>
          <tr><td>Latex 30cm</td><td>$3.50</td></tr>
          <tr><td>Printed latex 30cm</td><td>$4.50</td></tr>
          <tr><td>Confetti 30cm</td><td>$5.00</td></tr>
          <tr><td>Standard foil</td><td>$13.95</td></tr>
          <tr><td>Hearts and stars foil</td><td>$12.95</td></tr>
          <tr><td>Number foil</td><td>$20.95</td></tr>
          <tr><td>Supershape foil</td><td>$26.95</td></tr>
        </table>
        <p class="muted">Prices change. The full inflation price list is in the store folder and on the Shopify POS.</p>` },
      { title: "Balloon FAQs and customer care", body: `
        <h4>How long do balloons last?</h4>
        <ul>
          <li>30cm standard latex: <strong>2 to 3 days</strong> (thanks to Hi-Float)</li>
          <li>Foil balloons: <strong>4 to 6 days</strong></li>
          <li>Confetti balloons: <strong>12 hours</strong></li>
        </ul>
        <p>Lifespans change with temperature. Advise customers to keep balloons away from direct sunlight and extreme heat.</p>
        <h4>What does Hi-Float do?</h4>
        <p>It's a gel-like substance coated inside latex balloons. It seals the pores of the rubber, trapping the helium so the balloon floats much longer.</p>
        <h4>Do we sell balloons uninflated?</h4>
        <p>Yes, with a separate price list. <strong>Pro-tip:</strong> if a customer buys uninflated now and brings it back later for inflation, charge full price and print a receipt for them to bring back.</p>
        <h4>Do we inflate customer-owned balloons?</h4>
        <ul>
          <li><strong>Foils: yes. Latex: no.</strong></li>
          <li>We can't guarantee the quality of outside balloons. If one pops during inflation or deflates quickly, <strong>no refund or replacement</strong>.</li>
        </ul>
        <h4>Can we top up balloons?</h4>
        <p>Yes, but <strong>only foils</strong>. Once a balloon has been inflated, we can't guarantee the self-sealing valve isn't damaged.</p>
        <h4>Should balloons stay in the transport bag?</h4>
        <p>No. Customers should take them out of the bag (or let them float out of the top) as soon as they get home. Heat gets trapped in the bag and can ruin the balloons.</p>` }
    ],
    skills: [
      "Knowing the main balloon prices by heart",
      "Explaining the core price rule (balloon, helium, string, Hi-Float)",
      "Answering 'how long will they last?' for latex, foil and confetti",
      "Explaining Hi-Float to a customer",
      "Explaining our policy on customer-owned balloons"
    ],
    quiz: [
      { q: "Unless a sticker says otherwise, what does a balloon price tag include?", o: ["Balloon only", "Balloon and string only", "Balloon, helium, string and Hi-Float (for latex)", "Balloon and a weight"], a: 2, w: "The core rule: the tag price covers it all." },
      { q: "How long does a 30cm standard latex balloon last (with Hi-Float)?", o: ["12 hours", "2 to 3 days", "4 to 6 days", "2 weeks"], a: 1, w: "Standard latex 2 to 3 days, foil 4 to 6 days, confetti about 12 hours." },
      { q: "How long do confetti balloons last?", o: ["12 hours", "2 to 3 days", "4 to 6 days", "A week"], a: 0, w: "Confetti balloons are the shortest-lived at around 12 hours." },
      { q: "What does Hi-Float do?", o: ["Makes balloons shiny", "Seals the rubber's pores so helium stays in longer", "Adds colour", "Stops balloons popping"], a: 1, w: "It's a gel coating that traps the helium inside." },
      { q: "A customer brings their own balloons. What can we inflate?", o: ["Latex only", "Foils only", "Both", "Neither"], a: 1, w: "Foils yes, latex no, because we can't guarantee outside latex quality." },
      { q: "Which balloons can be topped up?", o: ["Any balloon", "Only latex", "Only foils", "None"], a: 2, w: "After one inflation the self-sealing valve may be damaged, so top-ups are foils only." },
      { q: "What should customers do with balloons once they get home?", o: ["Leave them in the bag", "Take them out of the bag, as heat gets trapped", "Put them in the sun", "Deflate them"], a: 1, w: "Heat trapped inside the bag can ruin the balloons." }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: "inflating", icon: "💨", title: "Inflating Balloons and the Helium Machine",
    blurb: "Calibrating the machine, nozzles, foil vs latex and bouquets.",
    videos: [
      { title: "How to set the machine", url: "" },
      { title: "Inflating: foils vs latex", url: "assets/videos/foils-vs-latex.mp4" },
      { title: "How to change the helium tank", url: "assets/videos/change-helium-tank.mp4" },
      { title: "Blowing up an Orbz", url: "assets/videos/orbz.mp4" },
      { title: "Arranging balloon bouquets", url: "assets/videos/arranging.mp4" }
    ],
    lessons: [
      { title: "Calibrating the helium machine", body: `
        <div class="tip">The amount of helium the machine releases depends on the <strong>set pressure</strong> and <strong>how much gas is left in the tank</strong>. You may need to adjust through the day, especially after changing balloon size (like a 60cm).</div>
        <ol>
          <li><strong>Start the test inflate.</strong> Set the machine to <strong>0.5</strong> and inflate the balloon until it's roughly <strong>70%</strong> of the size you need.</li>
          <li><strong>Finish the inflation.</strong> Using the <strong>sizing template</strong>, adjust the setting up or down to inflate the rest of the way to full size.</li>
          <li><strong>Calculate the total.</strong> Add up the settings you used (for example 0.5 + 0.5 + 0.4 = <strong>1.4</strong>).</li>
          <li><strong>Program the machine.</strong> If tank pressure is set <strong>low</strong>, set the full amount (1.4). If tank pressure is set <strong>normal</strong>, set <strong>half</strong> the amount (0.7).</li>
        </ol>
        <p>Now the machine is calibrated and ready to go.</p>` },
      { title: "Foils vs latex: nozzles and rules", body: `
        <div class="warn">⚠️ Latex and foil balloons use <strong>completely different nozzles and methods</strong>.</div>
        <h4>Foil balloons</h4>
        <ul>
          <li>Use the <strong>upright nozzle</strong>.</li>
          <li>Line up the balloon's self-sealing valve with the nozzle and press down.</li>
          <li>Don't panic when it lifts off: the gas flow naturally slows as the foil fills, to prevent popping.</li>
        </ul>
        <h4>Latex balloons</h4>
        <ul>
          <li>Use the <strong>angled nozzle</strong>.</li>
          <li>Inflate and size using the calibration steps above.</li>
          <li><strong>Always add Hi-Float to latex</strong>, unless it's for a <strong>gender reveal</strong> (the wet gel can make the confetti stick to the inside).</li>
        </ul>
        <p>Watch the videos on this page for Orbz and for arranging balloon bouquets the Party Mix way. Your trainer will also show you our bouquet photos.</p>` },
      { title: "Helium safety and shutdown", body: `
        <ul>
          <li>At closing, turn the main valve on the helium tank <strong>completely off</strong>, then power down the balloon machine.</li>
          <li>⚠️ <strong>Crucial gas rule:</strong> once the tank is closed, <strong>do NOT purge</strong> or let the leftover gas out of the regulator or machine line. Leave the residual line pressure as it is.</li>
          <li>At close, wipe down and sanitise the balloon machine and clean and refill the Hi-Float bottle as needed.</li>
          <li>Deflate and dispose of damaged balloons when the shop is quiet.</li>
          <li>On a busy day tomorrow, you may <strong>pre-inflate foils only</strong> the night before. They hold gas much longer than latex.</li>
        </ul>` }
    ],
    skills: [
      "Calibrating the machine with the 0.5 test and sizing template",
      "Using the right nozzle for foils and for latex",
      "Adding Hi-Float to latex (and knowing the gender reveal exception)",
      "Inflating an Orbz",
      "Changing the helium tank",
      "Arranging a balloon bouquet in the Party Mix style",
      "Closing the helium tank safely (no purging)"
    ],
    quiz: [
      { q: "What setting do you start the test inflate on?", o: ["0.1", "0.5", "1.0", "2.0"], a: 1, w: "Start at 0.5 and inflate to about 70% of the size you need." },
      { q: "You needed 0.5 + 0.5 + 0.4 = 1.4 in total. Tank pressure is set to NORMAL. What do you program?", o: ["1.4", "0.7", "2.8", "0.5"], a: 1, w: "Normal pressure: half the total (0.7). Low pressure: the full amount (1.4)." },
      { q: "Which nozzle do foil balloons use?", o: ["The angled nozzle", "The upright nozzle", "Either", "Neither: use a hand pump"], a: 1, w: "Foils use the upright nozzle; latex uses the angled nozzle." },
      { q: "When should you NOT add Hi-Float to a latex balloon?", o: ["For a birthday", "For a gender reveal", "For 60cm balloons", "For red balloons"], a: 1, w: "The wet gel can make the confetti stick to the inside of a gender reveal balloon." },
      { q: "After closing the helium tank at night, what must you NOT do?", o: ["Turn the machine off", "Purge the gas from the regulator or line", "Close the valve", "Wipe the machine"], a: 1, w: "Leave residual line pressure as it is." },
      { q: "Which balloons can you pre-inflate the night before a busy day?", o: ["Latex only", "Foils only", "Confetti only", "All balloons"], a: 1, w: "Foils hold gas much longer than latex." }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: "orders", icon: "📝", title: "Balloon Orders and Order Forms",
    blurb: "Take a balloon order the same way, every time. Includes practice scenarios.",
    videos: [ { title: "How to fill out a balloon order form", url: "assets/videos/balloon-order-form.mp4" } ],
    lessons: [
      { title: "Five must-dos for every balloon order", body: `
        <p>A balloon order is a promise to someone's party, so we do it the same way every time using the Shopify POS:</p>
        <ol>
          <li>👤 <strong>Add the customer</strong> to the order.</li>
          <li>📅 <strong>Add pickup details</strong> in the order notes: the <strong>date, the day of the week and the time</strong>. Notes print on the receipt.</li>
          <li>🎈 <strong>Ask for a balloon weight and bag.</strong> Prompt every customer.</li>
          <li>📋 <strong>Complete the detailed order form</strong> clearly and accurately, every field filled in.</li>
          <li>🧾 <strong>Print 2 receipts:</strong> one for the customer, one attached to the order form.</li>
        </ol>
        <h4>Why the order note matters</h4>
        <ul>
          <li><strong>For the customer:</strong> they can double-check when to collect.</li>
          <li><strong>For the team:</strong> a reliable record if there are questions later.</li>
        </ul>
        <div class="warn">Inflated balloons can't be refunded and cancelled orders carry a <strong>10% non-refundable fee</strong>. Double-check the details with the customer and let them know.</div>` },
      { title: "Pickup times, timing and phone orders", body: `
        <h4>Opening and pickup hours</h4>
        <table>
          <tr><th></th><th>Doors open</th><th>Pickup window</th></tr>
          <tr><td>Mon to Sat</td><td>9:00 am to 5:30 pm</td><td>9:15 am to 5:15 pm</td></tr>
          <tr><td>Sunday</td><td>11:00 am to 3:00 pm</td><td>11:15 am to 2:45 pm</td></tr>
        </table>
        <p>We're closed for most public holidays. The earliest pickups are <strong>9:15 am on weekdays</strong> and <strong>9:00 am on Saturdays</strong>.</p>
        <div class="tip">⏱️ <strong>The 90-minute rule:</strong> start inflating a balloon order <strong>1.5 hours before its pickup time</strong>. Knock out early orders while the shop is quiet so you aren't stuck inflating while a queue forms.</div>
        <h4>Phone orders</h4>
        <ul>
          <li><strong>Balloons:</strong> we require <strong>full payment before we inflate</strong>. Fill out the order form exactly like a normal one.</li>
          <li><strong>Other products:</strong> we can hold them for a maximum of <strong>24 hours</strong> without payment.</li>
          <li>Take payment over the phone using the POS steps your trainer shows you, then <strong>text or email the receipt</strong> to the customer.</li>
        </ul>` }
    ],
    practice: [
      { brief: "Sarah Nguyen rings the shop on 0412 345 678. She wants a 'Happy Birthday' foil and six pink latex 30cm balloons for her daughter's party. She'll pick them up on Saturday 28 November at 10:00 am. She's happy to pay now over the phone and says she's fine to have a weight and bag.",
        name: /sarah/i, phone: "0412345678", date: /28/, day: /sat/i, time: /(\b10(:?00)?\s*(am)?\b)/i,
        dateShow: "28 November", dayShow: "Saturday", timeShow: "10:00 am", payment: "full" },
      { brief: "Mark Taylor (0400 111 222) wants a number '3' foil and five confetti balloons. He'd like to collect on Thursday 3 December at 4:00 pm. He'll pay when he picks up, and wants a weight and bag too.",
        name: /mark/i, phone: "0400111222", date: /\b3\b/, day: /thu/i, time: /(4(:?00)?\s*pm|16:?00)/i,
        dateShow: "3 December", dayShow: "Thursday", timeShow: "4:00 pm", payment: "pickup" },
      { brief: "Priya Singh (0433 987 654) is in the shop and wants two latex balloon bouquets for a baby shower. Pickup is Sunday 6 December at 12:00 pm. She'll pay in store today. She doesn't need a weight and bag, but you should still offer.",
        name: /priya/i, phone: "0433987654", date: /\b6\b/, day: /sun/i, time: /(12(:?00)?\s*(pm)?)/i,
        dateShow: "6 December", dayShow: "Sunday", timeShow: "12:00 pm", payment: "instore" }
    ],
    skills: [
      "Adding the customer and the pickup date, day and time to the order note",
      "Offering a weight and bag on every balloon order",
      "Filling in the detailed order form completely",
      "Printing 2 receipts and attaching one to the form",
      "Taking a phone order, with payment before inflating",
      "Practice run with an employee playing the customer"
    ],
    quiz: [
      { q: "Which THREE pickup details go in the POS order note?", o: ["Date, day of the week and time", "Name, phone and email", "Date only", "Time only"], a: 0, w: "Date, day and time, so the receipt and our records are clear." },
      { q: "How many receipts do you print for a balloon order?", o: ["1", "2", "3", "None"], a: 1, w: "One for the customer, one attached to the order form." },
      { q: "When should you start inflating an order due at 11:00 am?", o: ["9:30 am", "10:45 am", "10:55 am", "8:00 am the day before"], a: 0, w: "The 90-minute rule: start 1.5 hours before pickup." },
      { q: "A customer phones to order balloons. When do they pay?", o: ["On pickup", "In full before we inflate", "50% deposit", "Next week"], a: 1, w: "Balloons need full payment before inflation." },
      { q: "How long can we hold non-balloon items for a phone order without payment?", o: ["1 hour", "24 hours", "3 days", "A week"], a: 1, w: "A maximum of 24 hours." },
      { q: "What is the earliest weekday pickup time?", o: ["8:30 am", "9:00 am", "9:15 am", "10:00 am"], a: 2, w: "Weekdays 9:15 am; Saturdays 9:00 am; Sundays 11:15 am." },
      { q: "What fee applies when a balloon order is cancelled?", o: ["None", "10% non-refundable", "50%", "$5 flat"], a: 1, w: "Cancellations carry a 10% non-refundable fee." }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: "special", icon: "✨", title: "Special Orders: Vinyl, Garlands, Acrylic, Hire and Delivery",
    blurb: "The extra order types that need extra care.",
    videos: [
      { title: "Filling out a vinyl order form", url: "assets/videos/vinyl-order-form.mp4" },
      { title: "Applying vinyls", url: "" },
      { title: "Taking garland orders", url: "" },
      { title: "Refunding hire bonds", url: "assets/videos/refund-bond.mp4" }
    ],
    lessons: [
      { title: "Vinyl orders", body: `
        <p>Vinyl lettering personalises balloons. Because it's custom, follow these steps carefully.</p>
        <ul>
          <li>⏱️ <strong>24 hours' notice</strong> is usually needed. For a same-day request, check with the <strong>working manager</strong> first.</li>
          <li>❌ <strong>No vinyl on 30cm latex.</strong> ✅ Most foils and larger latex are fine.</li>
          <li>🎨 Always check which vinyl <strong>colours</strong> are in stock before finalising.</li>
          <li>💰 <strong>Name only: $15. Custom message: $20.</strong></li>
          <li>✍️ Show the <strong>font sheet</strong>. If they aren't picky, keep it simple and write a basic description (e.g. 'cursive').</li>
        </ul>
        <p>Fill out a <strong>Vinyl Order Form</strong> every time: customer's name, exact text, balloon type it's going on, quantity, vinyl colour and font style.</p>` },
      { title: "Garland orders", body: `
        <div class="warn">⏳ <strong>Always check the customer's required date with the manager before taking details</strong>, to make sure we have capacity.</div>
        <ol>
          <li><strong>Gather the details:</strong> length (<strong>2 metres is our standard</strong>), colours, style (<strong>blocked</strong> or <strong>mixed</strong>), and delivery or pickup. For delivery, check the diary that the <strong>van</strong> is free (we don't deliver Sundays). Extras: 12cm mini bunches, 46cm and 60cm individual balloons. Check stock for their colours.</li>
          <li><strong>The upsell:</strong> we <strong>hire arch and circle meshes</strong>, the ideal frames for tying garlands. Check the package sheet for combinations and pricing.</li>
          <li><strong>The order form:</strong> include length, add-ons, colours, style and delivery or pickup. Complete the rest like a normal balloon order, then pull a handful of each chosen colour and set them aside.</li>
        </ol>` },
      { title: "Acrylic orders", body: `
        <p>Take the customer to the display board near the acrylic machine to choose a colour and a font number.</p>
        <table>
          <tr><th>Product</th><th>Base price</th><th>What it is</th></tr>
          <tr><td>Cake topper</td><td>$19.95</td><td>Stands upright on the cake (includes a stick)</td></tr>
          <tr><td>Fropper</td><td>$15.95</td><td>Sticks to the front of the cake</td></tr>
          <tr><td>Charm</td><td>$15.95</td><td>Lies flat on top of the cake</td></tr>
        </table>
        <ul>
          <li><strong>Width:</strong> 4" or 5" standard; 6" standard; 7" +$2.00; 8" +$4.50.</li>
          <li><strong>Colour:</strong> standard solid colours; mirror colours (gold, rose gold, silver) +$5.00.</li>
          <li><strong>Words:</strong> 1 to 2 words included; 3 words +$5.00; 4 words +$10.00.</li>
          <li><strong>Stick length (toppers):</strong> 3" included; 4" +$2.00.</li>
          <li><strong>Add-ons:</strong> double layered (two colours) +$10.00; draft approval +$5.00; rush order +$5.00.</li>
          <li>Write the exact text, font number and notes. Add up the total and mark <strong>PAID or NOT PAID</strong> clearly. Anything custom: check with the supervisor.</li>
        </ul>` },
      { title: "Hire orders and bonds", body: `
        <ol>
          <li><strong>Check availability (the 5-day window).</strong> Open the hire diary and check the requested date, <strong>two days before and two days after</strong>.</li>
          <li><strong>Complete the order and payment.</strong> Fill out the form like a normal balloon order. The <strong>booking fee is paid upfront</strong> to secure the date. The <strong>$100 bond</strong> can be paid now or at pickup.</li>
          <li><strong>Hire agreement.</strong> Open the digital agreement on the store tablet. The customer reads and fills in their details, you fill in the admin spaces, then the customer <strong>signs</strong>.</li>
        </ol>
        <h4>Bonds</h4>
        <ul>
          <li>Every hire needs a <strong>$100 bond</strong> unless a manager explicitly exempts the customer.</li>
          <li>The bond can be paid by card or cash but must be <strong>refunded by the exact same method</strong>.</li>
          <li>On return: refund the bond, print <strong>two receipts</strong>, hand one to the customer, have them <strong>sign our copy</strong>, then staple it to the original hire form and file it in the binder.</li>
        </ul>` },
      { title: "Balloon delivery", body: `
        <ul>
          <li>We deliver <strong>balloon garlands</strong> and regular <strong>balloon orders over $40</strong>.</li>
          <li>Fees are based on the <strong>delivery postcode</strong> (check the postcode price list).</li>
          <li>📅 <strong>Monday to Friday:</strong> 1:00 pm to 5:30 pm. <strong>No exact time slots.</strong></li>
          <li>📅 <strong>Saturday:</strong> check availability with a manager first.</li>
          <li>❌ <strong>Sunday:</strong> no deliveries.</li>
          <li>📍 If the postcode isn't on the price list, <strong>we can't deliver</strong>.</li>
          <li>👤 Someone must be at the address to receive the balloons. If nobody's there, a re-delivery charge may apply.</li>
        </ul>` }
    ],
    skills: [
      "Taking a vinyl order (24 hours, no 30cm latex, form filled in)",
      "Taking a garland order (manager date check first)",
      "Offering hire meshes with a garland",
      "Taking an acrylic order and adding up the price",
      "Taking a hire order with the 5-day window check",
      "Using the digital hire agreement",
      "Refunding a hire bond and filing the paperwork",
      "Booking a delivery and checking the postcode"
    ],
    quiz: [
      { q: "What notice do vinyl orders usually need?", o: ["None", "2 hours", "24 hours", "1 week"], a: 2, w: "Usually 24 hours. For same-day, check with the working manager." },
      { q: "Which balloon CAN'T have vinyl applied?", o: ["Foil balloons", "Larger latex balloons", "Standard 30cm latex", "Supershape foils"], a: 2, w: "Vinyl can't go on standard 30cm latex." },
      { q: "A garland customer gives a date. What's the FIRST thing you do?", o: ["Take the deposit", "Check the date with the manager", "Start inflating", "Print receipts"], a: 1, w: "Always check the date with the manager before taking details, to confirm capacity." },
      { q: "What upsell goes perfectly with a garland order?", o: ["Pinata", "Hire arch or circle meshes", "Cake mix", "Candles"], a: 1, w: "Meshes are the ideal frames to tie garlands to." },
      { q: "How many days do you check in the hire diary?", o: ["Just the requested date", "The date plus 2 days before and 2 days after (5 days)", "A week before", "The month"], a: 1, w: "The 5-day window covers prep, pickup and returns for other customers." },
      { q: "A customer paid a $100 bond in cash. How is it refunded?", o: ["By card", "By cash, the same method", "By store credit", "By bank transfer"], a: 1, w: "Bonds are always refunded by the original payment method." },
      { q: "Which day do we NOT deliver?", o: ["Monday", "Friday", "Saturday", "Sunday"], a: 3, w: "No Sunday deliveries. Saturday needs a manager check." },
      { q: "A balloon order for delivery must be at least how much (apart from garlands)?", o: ["$10", "$20", "Over $40", "Over $100"], a: 2, w: "We deliver garlands and regular balloon orders over $40." }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: "pos", icon: "💻", title: "Shopify POS, Accounts and Payments",
    blurb: "Customer accounts, loyalty points, ABN customers, custom sales and payments.",
    videos: [
      { title: "Adding customer accounts to sales", url: "assets/videos/add-customer.mp4" },
      { title: "Checking / redeeming loyalty rewards", url: "assets/videos/loyalty-points.mp4" },
      { title: "Custom sales", url: "assets/videos/custom-sale.mp4" },
      { title: "Adding an order note (balloon pickup)", url: "assets/videos/order-note.mp4" },
      { title: "Card payments", url: "assets/videos/card-payment.mp4" },
      { title: "Cash payments", url: "assets/videos/cash-payment.mp4" },
      { title: "Split payments", url: "assets/videos/split-payment.mp4" },
      { title: "Taking payment over the phone (manual card entry)", url: "assets/videos/phone-card-payment.mp4" }
    ],
    lessons: [
      { title: "Customer accounts and loyalty", body: `
        <p>Always ask if the customer has an account <strong>before finalising a transaction</strong>. Look up an existing one or create one on the spot. Attaching accounts tracks reward points and makes sure ABN customers get the right discount.</p>
        <h4>New account details to collect</h4>
        <ul>
          <li>👤 Full name (first and last)</li>
          <li>📧 Email address</li>
          <li>📞 Phone number</li>
          <li>🎂 <strong>Birthday</strong> (crucial: customers get a <strong>$10 credit on their birthday</strong>)</li>
        </ul>
        <h4>How loyalty points work</h4>
        <ul>
          <li><strong>$1 spent = 1 point</strong></li>
          <li><strong>200 points = $10 discount</strong></li>
          <li><strong>500 points = $25 discount</strong></li>
        </ul>
        <h4>ABN customers</h4>
        <div class="warn">🛑 If a customer says they're an <strong>ABN customer</strong> (they own or operate a business), <strong>check with a manager</strong> before setting up or changing their account.</div>
        <ul>
          <li>❌ ABN accounts do <strong>not</strong> earn loyalty points.</li>
          <li>✅ Instead they get an upfront <strong>15% discount</strong>.</li>
        </ul>` },
      { title: "Order notes and custom sales", body: `
        <h4>Order notes</h4>
        <p>Anything you type in the Order Notes prints on the customer's receipt. For <strong>every balloon order</strong> type the pickup <strong>date, day of the week and time</strong>.</p>
        <h4>Items without a barcode</h4>
        <ol>
          <li><strong>Search the POS first</strong> by name or description. This keeps stock levels in sync.</li>
          <li>Only if it can't be found anywhere, use a <strong>Custom Sale</strong>.</li>
        </ol>
        <div class="warn">Always exhaust the POS search before using a custom sale. Too many custom sales throw off inventory tracking.</div>` },
      { title: "Payment types", body: `
        <h4>✅ We accept</h4>
        <ul>
          <li>💳 Visa and Mastercard</li>
          <li>💵 Cash</li>
          <li>🔄 Split payments (e.g. part cash, part card)</li>
          <li>📞 Payment over the phone</li>
        </ul>
        <h4>❌ We do NOT accept</h4>
        <ul><li>American Express (Amex)</li><li>Afterpay</li><li>Zip Pay</li></ul>` }
    ],
    skills: [
      "Asking every customer if they have an account",
      "Creating a new account with all four details",
      "Checking and redeeming loyalty rewards",
      "Handling an ABN customer (manager check, 15%)",
      "Adding order notes to a sale",
      "Searching the POS before using a custom sale",
      "Taking card, cash, split and phone payments"
    ],
    quiz: [
      { q: "Which detail gives the customer a $10 credit on the day?", o: ["Phone number", "Email", "Birthday", "Postcode"], a: 2, w: "We collect birthdays so customers get a $10 birthday credit." },
      { q: "How many points does a $200 spend earn, and what's 200 points worth?", o: ["200 points = $10", "200 points = $20", "20 points = $10", "200 points = $5"], a: 0, w: "$1 = 1 point; 200 points = $10; 500 points = $25." },
      { q: "A customer says they have an ABN. What do you do?", o: ["Give 20% off immediately", "Check with a manager before setting up or changing the account", "Tell them we don't do business accounts", "Give double points"], a: 1, w: "ABN accounts need a manager check. They get 15% off instead of points." },
      { q: "What do ABN accounts receive instead of loyalty points?", o: ["Free delivery", "An upfront 15% discount", "A $10 voucher", "Nothing"], a: 1, w: "ABN accounts don't earn points but get 15% off." },
      { q: "An item has no barcode. What's the FIRST thing to try?", o: ["Custom sale", "Search the POS by name or description", "Guess the price", "Skip it"], a: 1, w: "Custom sales hurt inventory accuracy, so search first." },
      { q: "Which payment type do we NOT accept?", o: ["Mastercard", "Cash", "Afterpay", "Split payments"], a: 2, w: "No Amex, Afterpay or Zip Pay." }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: "refunds", icon: "🔄", title: "Refunds, Exchanges and Store Policies",
    blurb: "Process refunds and exchanges correctly and explain the rules clearly.",
    videos: [
      { title: "Refunding an online order in Shopify", url: "" },
      { title: "Exchanging an online order in Shopify", url: "" }
    ],
    lessons: [
      { title: "In-store refunds", body: `
        <div class="tip">📌 The customer must have their <strong>receipt</strong>. They do <strong>not</strong> need their payment card.</div>
        <ol>
          <li><strong>Verify the items.</strong> Check the receipt to confirm the product is listed. <strong>Edible products: pause and check with the manager first.</strong></li>
          <li><strong>Process the refund.</strong> Scan the barcode at the bottom of the receipt and refund <strong>only the items brought back</strong>. The refund goes back to the <strong>original payment method</strong> (cash to cash, card to card).</li>
          <li><strong>Paperwork.</strong> Print two receipts. The customer signs the <strong>store copy</strong> (we keep it). Hand the customer their copy (<strong>mandatory for card refunds</strong>).</li>
        </ol>
        <p>Let the customer know card refunds can take <strong>up to a week</strong> to clear, and to call the store if there are any issues.</p>
        <h4>Edible products</h4>
        <p>Generally, if the seal is broken we don't accept the return. But <strong>always check with the working manager first</strong>: they have the final say.</p>` },
      { title: "Exchanges and online refunds", body: `
        <h4>Exchanges on the POS</h4>
        <ol>
          <li>Scan the customer's receipt like a normal refund.</li>
          <li>Instead of finalising the return, choose the option to <strong>add items</strong>.</li>
          <li>Return the item they brought back and add the new item. Print two receipts and have the customer sign ours.</li>
        </ol>
        <h4>Online order refunds</h4>
        <div class="warn">💻 <strong>All online orders are refunded online through Shopify.</strong> Never refund an online order through the in-store register.</div>
        <p><strong>Try to save the sale first</strong> (unless the customer asks for a refund right away):</p>
        <ol>
          <li>Call or email the customer and recommend similar products.</li>
          <li>If they want the original item but it's out of stock, check with a manager whether it can be ordered.</li>
          <li>Ask if they're willing to wait for it.</li>
          <li>If not, tell them you'll process the refund.</li>
        </ol>` },
      { title: "Key policies to know", body: `
        <table>
          <tr><th>Topic</th><th>What to know</th></tr>
          <tr><td>Returns</td><td>6 days from purchase, unused, in original packaging, with receipt.</td></tr>
          <tr><td>Can't be returned</td><td>Perishables (cake mixes, icings, fondant, buttercream, frozen products), gift cards, sale items and <strong>inflated balloons</strong>.</td></tr>
          <tr><td>Cancellations</td><td>10% non-refundable fee. Edible images and custom orders are non-refundable once placed.</td></tr>
          <tr><td>Helium balloons</td><td>A replacement needs the receipt and the damaged balloon brought back. Balloons that pop or puncture aren't replaced or refunded.</td></tr>
          <tr><td>Shipping</td><td>Parcel Post or Express Post. Free over $100 in metro areas. Orders before 8am AWST dispatch the same day if in stock. Helium balloons aren't posted.</td></tr>
          <tr><td>Hours</td><td>Mon to Sat 9:00 am to 5:30 pm; Sunday 11:00 am to 3:00 pm; closed most public holidays.</td></tr>
        </table>
        <p>Read the policy pages on the Party Mix website too. When unsure, say "Let me check that for you" and ask the working manager.</p>` }
    ],
    skills: [
      "Processing an in-store refund (scan receipt, original method, 2 receipts)",
      "Checking with the manager on edible refunds",
      "Processing an exchange on the POS",
      "Refunding an online order through Shopify",
      "Explaining the 6-day return policy and what can't be returned",
      "Explaining helium balloon replacement and cancellation fees"
    ],
    quiz: [
      { q: "What does a customer need for an in-store refund?", o: ["The payment card", "Their receipt", "ID", "A manager's note"], a: 1, w: "The receipt is required. The card isn't." },
      { q: "A customer paid by card. How is the refund paid?", o: ["Cash", "Store credit", "Back to the same card", "Bank transfer"], a: 2, w: "Refunds always go back to the original payment method." },
      { q: "An online order must be refunded...", o: ["At the in-store register", "Online through Shopify", "With cash", "By the owner only"], a: 1, w: "All online refunds go through Shopify, never the register." },
      { q: "A customer wants to return an opened tub of buttercream. What do you do?", o: ["Refuse straight away", "Refund immediately", "Check with the working manager first", "Offer store credit"], a: 2, w: "Broken seal generally means no return, but the manager has the final say." },
      { q: "How many days do customers have to return an unused item?", o: ["3", "6", "14", "30"], a: 1, w: "6 days from purchase, unused, in original packaging, with receipt." },
      { q: "Which can NEVER be returned?", o: ["Cake boards", "Inflated balloons", "Candles", "Piping bags"], a: 1, w: "Inflated balloons, perishables, gift cards and sale items can't be returned." },
      { q: "A customer asks for a refund on an out-of-stock online item. What's the best FIRST move?", o: ["Refund immediately, always", "Recommend alternatives, or check if it can be ordered and if they'll wait", "Ignore them", "Tell them to call back"], a: 1, w: "Try to save the sale, unless the customer asks for a refund from the start." }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: "cakebasics", icon: "🎂", title: "Cake Section: Boards, Boxes, Mixes and Stock",
    blurb: "Cake boards and boxes, matching sizes, cake mixes and how to stock the shelves.",
    lessons: [
      { title: "Cake boxes and boards", body: `
        <h4>Boxes</h4>
        <ul>
          <li>Standard cake boxes from <strong>6" up to 16"</strong> wide or long. The tallest we stock is <strong>12" high</strong>.</li>
          <li>Rectangle boxes in 2 sizes. Treat boxes: cookie boxes, catering trays and cupcake boxes (with matching inserts).</li>
        </ul>
        <h4>Boards</h4>
        <ul>
          <li><strong>Standard round:</strong> 6" to 16". <strong>Square:</strong> 6" to 12".</li>
          <li><strong>Drum boards (round, 8" to 14"):</strong> much thicker and sturdier. Best for <strong>taller, heavier cakes</strong>.</li>
          <li><strong>Compressed boards</strong> (round 4" to 14", square 4" to 12"): thinner, for <strong>structural support</strong>. Used between layers in tiered cakes and as the base for lighter cakes like sponge.</li>
          <li><strong>Perforated round compressed boards</strong> have a pre-cut centre hole so a central dowel passes easily through multiple tiers.</li>
        </ul>
        <div class="tip">📏 <strong>Matching a board to a box:</strong> follow the board's diameter. A 12" board fits a 12" box. No exact match? Choose the <strong>closest larger</strong> box (a 9" board goes in a 10" box).</div>
        <div class="tip">💰 We offer <strong>bulk pricing</strong> on most boxes and boards. If someone is buying several, remind them to check the bulk rates.</div>` },
      { title: "Cake mixes: how much does 1kg make?", body: `
        <p>We stock commercial cake mixes in bulk <strong>15kg bags</strong> and <strong>1kg bags</strong>. Always help customers plan how much cake or how many cupcakes a 1kg mix will yield.</p>
        <table>
          <tr><th>Mix</th><th>Cake</th><th>Cupcakes</th></tr>
          <tr><td>Buttacake and Pettina Chocolate</td><td>One 8" x 3" round</td><td>About 24 to 30</td></tr>
          <tr><td>All other mixes (White Mudcake, Red Velvet etc.)</td><td>One 8" x 4" round (taller)</td><td>About 24 to 28</td></tr>
        </table>
        <div class="tip">Always tell customers to check the front label of their mix. Water and egg ratios vary slightly between flavours. Cake mixes are perishable and can't be returned.</div>` },
      { title: "Stocking the cake shelves", body: `
        <h4>Where extra stock lives</h4>
        <ul>
          <li>🔙 <strong>The back of the shop:</strong> balloons, cake ball kits and toppers, balloon weights.</li>
          <li>⬆️ <strong>Up high at the front, above the shelves:</strong> cake boxes, cake boards, cake ball toppers.</li>
        </ul>
        <div class="warn">🚨 <strong>Cake boxes and boards go out one at a time.</strong> They come in sleeve packs of 5 and 10. Take every box or board out of the sleeve and put them on the shelf as <strong>single items at the single price</strong>. Never put a full sleeve on the shelf. We don't want anyone scanning a pack of 10 for the price of one.</div>
        <h4>While you're refilling</h4>
        <ul>
          <li>Pull products forward so the shelves look full and neat.</li>
          <li>Labels face the front.</li>
          <li>Cake mixes: shortest best-before dates at the front, newer stock behind.</li>
        </ul>` }
    ],
    skills: [
      "Matching a board to a box (and choosing the closest larger box)",
      "Explaining drum boards vs standard vs compressed boards",
      "Telling a customer how much a 1kg mix makes",
      "Taking cake boxes and boards out of sleeve packs before shelving",
      "Rotating cake mixes by best-before date",
      "Knowing where back stock and overhead stock is kept"
    ],
    quiz: [
      { q: "You're matching a 9\" board and there's no 9\" box. What do you choose?", o: ["An 8\" box", "A 10\" box (closest larger)", "A 16\" box", "No box"], a: 1, w: "Pick the closest larger box." },
      { q: "Which board is best for taller, heavier cakes?", o: ["Standard round board", "Drum board", "Compressed board", "Square board"], a: 1, w: "Drum boards are much thicker and sturdier." },
      { q: "What is a perforated compressed board for?", o: ["Cutting cake", "Letting a central dowel pass through multiple tiers", "Serving drinks", "Weighing balloons"], a: 1, w: "The pre-cut centre hole lets a dowel pass through the tiers." },
      { q: "What does a 1kg Buttacake mix make?", o: ["One 8\" x 3\" round cake, about 24 to 30 cupcakes", "Four cakes", "One 12\" cake", "Ten cupcakes"], a: 0, w: "Buttacake and Pettina Chocolate: one 8\" x 3\" round. Other mixes make an 8\" x 4\" cake." },
      { q: "What must you do before putting cake boxes or boards on the shelf?", o: ["Nothing", "Take them out of the sleeve so they're sold individually", "Put prices on the sleeve", "Wrap them in plastic"], a: 1, w: "So nobody scans a pack of 10 for the price of one." },
      { q: "Where are extra cake boxes and boards kept?", o: ["Back of the shop", "Up high at the front, above the shelves", "In the freezer", "Under the till"], a: 1, w: "Boxes, boards and cake ball toppers are overhead at the front. Balloons and weights are at the back." }
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: "cakedeco", icon: "🧁", title: "Cake Decorating Products",
    blurb: "Fondant, colours, paints, flavours, icing and edible images.",
    lessons: [
      { title: "Fondant vs modelling paste", body: `
        <div class="warn">They look and feel almost identical on the shelf, especially <strong>Fondtastic</strong> where the packaging is nearly the same. <strong>Always double-check the label.</strong></div>
        <table>
          <tr><th></th><th>🍬 Fondant</th><th>🗿 Modelling paste (gum paste)</th></tr>
          <tr><td>Texture</td><td>Softer, more pliable</td><td>Sets quickly, dries much harder</td></tr>
          <tr><td>Best for</td><td>Draping over cakes and cookies, flat decorations and lettering</td><td>Standing 3D sculptures and figures that hold their own weight</td></tr>
          <tr><td>Taste</td><td>Pleasant, stays soft</td><td>Technically edible but not meant to be eaten. Gets unpleasantly hard</td></tr>
        </table>
        <div class="tip">💡 <strong>Budget alternative:</strong> if a customer needs both, suggest <strong>fondant + Tylose powder</strong>. Knead <strong>1 to 2 teaspoons of Tylose into every 500g of fondant</strong> to make gum paste.</div>
        <p>Pettinice (750g) and Fondtastic are our main fondants. Not sure how much to sell? Use the <strong>Fondant Guide</strong> on the website: about 510g covers an 8" round cake 3" high, so a 1kg tub covers most cakes. Fondant and icings are perishable and can't be returned.</p>` },
      { title: "Gel vs oil food colouring", body: `
        <p>The general rule: <strong>water and oil don't mix.</strong> The wrong colour can ruin buttercream or make chocolate <strong>seize</strong> (clump and harden).</p>
        <h4>💧 Gel colouring (Chefmaster and Loyal)</h4>
        <ul>
          <li>Water-based, highly concentrated. Deep colour without adding excess liquid.</li>
          <li>Best for <strong>fondant, macarons, royal icing, meringue and standard cake batter</strong>.</li>
          <li>Completely flavourless.</li>
          <li>⚠️ <strong>Avoid in chocolate</strong> or anything with high fat or oil: the water makes chocolate seize.</li>
        </ul>
        <h4>🛢️ Oil-based colouring (Colour Mill)</h4>
        <ul>
          <li>Formulated to bond with fats and oils. Richer, brighter colour using fewer drops.</li>
          <li>Best for <strong>buttercream, chocolate, ganache, fondant and butter-rich batters</strong>.</li>
          <li>Can carry a slight taste in massive quantities. For ultra-deep shades, suggest taste-testing.</li>
        </ul>
        <div class="tip"><strong>Golden rule:</strong> if the recipe contains fats or oils, reach for <strong>Colour Mill</strong>. If a customer's buttercream looks speckled or won't hold colour, they're probably using a water-based gel. Suggest Colour Mill.</div>
        <p>Colour Mill has no gums, so colours can settle: give the bottle a good shake. Colours deepen over time, so colour the mixture and leave it overnight for the richest result.</p>` },
      { title: "Edible paints, flavourings and icing", body: `
        <h4>🎨 Edible paint solutions</h4>
        <p><strong>Bakers Bond</strong> is edible <em>glue</em> for sticking things together. The others are for <strong>painting</strong> dusts, glitters and powders.</p>
        <ul>
          <li><strong>Rose Spirit (SPRINKS)</strong> and <strong>Paint Solution (Over The Top)</strong>: high-proof alcohol that evaporates instantly. Dry, matte finish without making fondant sticky.</li>
          <li><strong>Colour Mill Bakers Booze:</strong> pure alcohol-style, quick-dry, smudge-free in minutes.</li>
          <li><strong>Colour Mill Bakers Base:</strong> a thicker paint activator with more working time. It's our closest match to the Sweet Sticks Activator we used to stock.</li>
          <li><strong>Colour Mill Bakers Binder:</strong> locks pigment down so it doesn't rub or flake. For airbrushing, stencilling or heavy coverage.</li>
        </ul>
        <h4>🧪 Flavouring</h4>
        <ul>
          <li><strong>Roberts Essence</strong> and <strong>SPRINKS flavouring:</strong> standard strength, water or alcohol based. Great for cakes, icings, buttercream, macarons. ⚠️ Avoid in real chocolate.</li>
          <li><strong>LorAnn Oils:</strong> super strength, <strong>3 to 4 times stronger</strong>. Use <em>drops</em> not teaspoons. Great for chocolates, ganache, candy. Check the bottle for chocolate suitability.</li>
          <li><strong>LorAnn Emulsions:</strong> bakery strength, water-based, <strong>don't bake out</strong> in the oven. Best for cakes, cookies, sweet breads. ⚠️ Avoid in chocolate.</li>
        </ul>
        <h4>🧁 'Icing' vs buttercream</h4>
        <p>'Icing' can mean anything sweet that covers a cake. Clarify: <em>"Are you looking for a creamy icing to spread and pipe (buttercream), or the dough-like icing you roll out and drape (fondant)?"</em></p>
        <h4>🍪 Embossers vs debossers</h4>
        <ul>
          <li><strong>Embosser</strong> (e.g. text stamps): presses <em>in</em>, leaving a <strong>sunken</strong> design. Great because you can paint the indents.</li>
          <li><strong>Debosser</strong> (e.g. Cooki Co cuts): you press fondant onto the plate, giving a <strong>raised</strong> 3D design.</li>
        </ul>` },
      { title: "Custom edible images", body: `
        <p>If a customer wants a topper that's out of stock or doesn't exist, offer a <strong>custom edible image</strong>.</p>
        <ul>
          <li>We can print any photo or image onto an icing sheet, and pre-cut some cupcake sizes.</li>
          <li><strong>Same-day service</strong> is available. <strong>Pre-cut images need at least 24 hours' notice.</strong></li>
          <li>Customers can email the image, or you can help them find one online in store.</li>
          <li><strong>Standard cake size is 17.5cm diameter.</strong> If unsure, default to this. Use the in-store baking tins to show them the size.</li>
          <li><strong>Cupcake pricing:</strong> the same image repeated (e.g. 24 identical logos) is the standard price. <strong>Different images</strong> on one sheet cost more because of the extra setup.</li>
          <li>Edible images are non-refundable once placed. Give out the aftercare flyer.</li>
        </ul>` }
    ],
    skills: [
      "Telling fondant and modelling paste apart (and checking the label)",
      "Choosing gel vs oil colour for a customer's recipe",
      "Explaining the Tylose + fondant trick",
      "Recommending the right paint: Rose Spirit, Bakers Booze, Base or Binder",
      "Explaining oils vs emulsions vs essences",
      "Explaining embossers vs debossers",
      "Taking a custom edible image order"
    ],
    quiz: [
      { q: "Which is best for building 3D figures that must stand up on their own?", o: ["Fondant", "Modelling paste (gum paste)", "Buttercream", "Royal icing"], a: 1, w: "Modelling paste dries much harder than fondant." },
      { q: "How much Tylose powder per 500g of fondant makes gum paste?", o: ["1 to 2 teaspoons", "1 cup", "A tablespoon per 100g", "None"], a: 0, w: "Knead 1 to 2 teaspoons of Tylose into every 500g of fondant." },
      { q: "A customer is colouring chocolate. Which colour should you recommend?", o: ["Chefmaster gel", "Loyal gel", "Colour Mill (oil-based)", "Any water-based colour"], a: 2, w: "Water-based gel makes chocolate seize. Oil-based Colour Mill bonds with fats." },
      { q: "A customer's buttercream looks speckled and won't hold colour. What's the likely cause?", o: ["Too much butter", "They're using a water-based gel", "Old icing sugar", "Cold weather"], a: 1, w: "Water-based gel doesn't bind to butter fat. Suggest Colour Mill." },
      { q: "A customer asks for the old 'Sweet Sticks Activator'. What do you point them to?", o: ["Bakers Binder", "Bakers Base", "Bakers Bond", "Rose Spirit"], a: 1, w: "Bakers Base is our closest equivalent." },
      { q: "Which flavouring is 3 to 4 times stronger than a standard essence?", o: ["Roberts Essence", "SPRINKS flavouring", "LorAnn Oils", "Vanilla extract"], a: 2, w: "LorAnn Oils are super strength: use drops, not teaspoons." },
      { q: "Which flavouring does NOT bake out in the oven?", o: ["Roberts Essence", "LorAnn Emulsions", "Rose Spirit", "Food spray"], a: 1, w: "Emulsions are bakery strength and stay robust after baking." },
      { q: "A customer wants the letters sunken into fondant. What do you show them?", o: ["Debosser", "Embosser (text stamps)", "Cutter", "Fondant mat"], a: 1, w: "Embossers press in (sunken). Debossers make a raised design." },
      { q: "What is our standard edible image cake size?", o: ["15cm", "17.5cm", "20cm", "25cm"], a: 1, w: "17.5cm is the default if the customer is unsure." }
    ]
  },

  /* ------------------------------------------------------------ 11 */
  {
    id: "party", icon: "🥳", title: "Party Supplies and Themes",
    blurb: "Selling a whole matching party: themes, cross-selling and where things go.",
    lessons: [
      { title: "Sell the whole party", body: `
        <p>Theme shoppers are planning a whole event. When you help them put together <strong>matching</strong> items across categories, it sounds helpful, not pushy.</p>
        <ul>
          <li>Ask <strong>"Is this for a specific theme or birthday?"</strong> and show items that match.</li>
          <li>We can usually put together a full coordinated set: <strong>bunting, napkins, party bags and favours</strong>.</li>
          <li>Kids' party products also pair with: <strong>lolly bag fillers, photobooth props, sleepover sets, banners and centrepieces</strong>.</li>
          <li>Pair a theme with <strong>balloons</strong> (a number balloon bouquet is a popular centrepiece) and <strong>cake supplies</strong>.</li>
          <li>If we don't have the exact item, think outside the box and suggest alternatives that match.</li>
        </ul>
        <div class="tip">🧠 <strong>Know your products.</strong> The more you know, the more you can help. Spend quiet time walking the party aisles and learning what is where. When you don't know an answer, say so and check, or ask the working manager.</div>` },
      { title: "Matching add-ons quick reference", body: `
        <table>
          <tr><th>If they pick...</th><th>Ask about...</th></tr>
          <tr><td>A character theme (e.g. Spiderman balloons)</td><td>The matching party supplies <em>and</em> cake supplies</td></tr>
          <tr><td>Banner</td><td>Centrepieces</td></tr>
          <tr><td>Pinata</td><td>A pinata stick (and lolly fillers)</td></tr>
          <tr><td>Party bags</td><td>Lolly bag fillers and favours</td></tr>
          <tr><td>Cake</td><td>Candles, toppers, board and box</td></tr>
          <tr><td>Balloons</td><td>Weights, transport bag, cake supplies</td></tr>
        </table>
        <p class="muted">Your trainer will walk you through the party aisles and our current best-selling themes during your first shifts.</p>` }
    ],
    skills: [
      "Finding a theme's matching party, balloon and cake products",
      "Walking the party aisles and knowing where things are",
      "Suggesting alternatives when we don't have the exact item",
      "Cross-selling across party, balloon and cake categories"
    ],
    quiz: [
      { q: "A customer is buying Spiderman balloons. What's a smart question?", o: ["\"Anything else?\"", "\"We have Spiderman party and cake supplies too. Are you doing a matching party?\"", "\"Balloons are $5.\"", "\"Do you want a receipt?\""], a: 1, w: "Theme shoppers plan whole events, so matching suggestions feel helpful." },
      { q: "What do you offer someone buying a banner?", o: ["Centrepieces", "Flour", "Cake mix", "Nothing"], a: 0, w: "Banner ➜ centrepieces." },
      { q: "If we don't have the exact item the customer wants, you should...", o: ["Say no and walk away", "Think outside the box and suggest matching alternatives", "Tell them to try another shop", "Hide the empty shelf"], a: 1, w: "Alternatives keep the sale and help the customer." },
      { q: "What should you say if you don't know the answer to a product question?", o: ["Make something up", "Say you'll check, or ask the working manager", "Change the subject", "Say we don't sell it"], a: 1, w: "A quick check beats a wrong answer." },
      { q: "A number balloon bouquet is a popular what?", o: ["Cake topper", "Party centrepiece", "Hire item only", "Return item"], a: 1, w: "Number balloon bouquets make popular centrepieces." }
    ]
  },

  /* ------------------------------------------------------------ 12 */
  {
    id: "day", icon: "☀️", title: "A Day in the Shop",
    blurb: "Morning prep, quiet-time jobs, afternoon routines and closing.",
    lessons: [
      { title: "Morning set-up", body: `
        <h4>The morning floor walk</h4>
        <ul>
          <li>👀 Check shelves: stock tidy, front-faced and in the right place.</li>
          <li>📦 Review online orders: check the back shelf where store-pickup orders are kept.</li>
          <li>🪧 Put out the signs.</li>
          <li>🎈 Refresh balloon displays and redo any that look deflated or outdated.</li>
          <li>🎂 Cake mixes: pull forward and check best-before dates.</li>
        </ul>
        <h4>Master the morning balloon orders</h4>
        <ul>
          <li>Review the balloon order schedule first thing and note all pickup times.</li>
          <li>Inflate and prepare as many orders as you can while the shop is quiet.</li>
          <li>⏱️ <strong>90-minute rule:</strong> start inflating 1.5 hours before pickup.</li>
          <li>Earliest pickups: <strong>9:15 am weekdays, 9:00 am Saturdays.</strong></li>
        </ul>` },
      { title: "Online orders during quiet times", body: `
        <h4>Store pickup orders</h4>
        <ol>
          <li>Open Shopify when the store is quiet. <strong>Store Pickup orders come first.</strong></li>
          <li>Print the order sheet, gather the products and scan them using the packing app to check accuracy.</li>
          <li>Place packed items on the <strong>back shelf</strong>.</li>
        </ol>
        <div class="warn">Update the status carefully: <strong>Balloon orders</strong> ➜ click <em>Mark as Picked Up / Fulfilled</em> and <strong>NOT</strong> 'Mark as Ready to Pick Up'. <strong>Non-balloon orders</strong> ➜ click <em>Mark as Ready to Pick Up</em>. When the customer collects, mark it as Picked Up.</div>
        <h4>Shipping orders</h4>
        <ul>
          <li>Print the packing list, gather products, and stage them at the back for the Online Orders Assistant to ship the next day.</li>
          <li><strong>Do NOT mark shipping orders as fulfilled.</strong></li>
          <li>If an item is <strong>out of stock</strong>, gather what you can and <strong>highlight the missing item</strong> on the packing list so the Online Orders Assistant can contact the customer.</li>
        </ul>
        <h4>When there are no customers</h4>
        <ul>
          <li>👟 Walk around, pull forward and neaten the shop.</li>
          <li>🖥️ Update Shopify: check stock levels and inventory.</li>
          <li>🎈 Deflate and dispose of damaged balloons.</li>
          <li>🏷️ Scan and price new stock, label and prepare it for shelving.</li>
        </ul>` },
      { title: "Afternoon and closing routine", body: `
        <h4>Afternoon</h4>
        <ul>
          <li>Finish today's orders; line up and prep tomorrow's.</li>
          <li>Refill cake boards and boxes (individually, out of the sleeve) and fix gaps on shelves.</li>
          <li>🎀 Tidy the ribbon drawer, 🍬 reorganise the sprinkles area, ❄️ reorganise the whip-and-ice fridge, 🏷️ labels face the front.</li>
        </ul>
        <h4>Next-day orders</h4>
        <ul>
          <li>Pull and <strong>clip tomorrow's order sheets onto the staging hooks in pickup-time order</strong> (earliest at the front) with the uninflated balloons.</li>
          <li>On busy days you can <strong>pre-inflate foils only</strong>.</li>
          <li>Set aside hire items in the back staff area, clearly marked with their order form.</li>
        </ul>
        <h4>Cleaning</h4>
        <ul>
          <li>Sweep the front party section, the cake section and the back staff area. Spot-clean spills with spray and mop; full mop with hot water and floor solution when needed.</li>
          <li>Spray and wipe the main POS counter, balloon counter and cake counter. Wipe iPad screens with the glass cleaner.</li>
        </ul>
        <h4>Closing sequence</h4>
        <ul>
          <li>⚠️ Close the helium tank valve completely and turn off the machine. <strong>Don't purge the line.</strong></li>
          <li>Take out bins and flatten and cut down cardboard boxes. 🗓️ <strong>Tuesday night:</strong> wheel the big bins out to the curb.</li>
          <li>Bring in the sign. Turn off the air conditioners, main lights, freezer light and neon 'Open' sign.</li>
          <li>The shift supervisor counts and closes the till. Escalate any till difference to the manager or owner.</li>
          <li>Plug in both iPads and both barcode scanners to charge. Turn off the cake section desktop and the card reader screens. Close all open app tabs on the iPads.</li>
        </ul>` }
    ],
    skills: [
      "Morning floor walk and refreshing balloon displays",
      "Reviewing and starting balloon orders using the 90-minute rule",
      "Picking and packing a store-pickup online order",
      "Staging a shipping order (and highlighting out-of-stock items)",
      "Quiet-time jobs: neaten, Shopify stock check, damaged balloons, scan and price",
      "Staging next-day balloon and hire orders in pickup-time order",
      "Cleaning and closing the shop (helium, bins, lights, devices)"
    ],
    quiz: [
      { q: "A balloon order is due at 12:00 pm. When should you start inflating?", o: ["10:30 am", "11:30 am", "11:55 am", "9:00 am"], a: 0, w: "Start 90 minutes before pickup." },
      { q: "For a BALLOON store-pickup order on the back shelf, which Shopify status do you NOT click?", o: ["Mark as Picked Up / Fulfilled", "Mark as Ready to Pick Up", "Either is fine", "Print order"], a: 1, w: "Balloon orders: Picked Up/Fulfilled, and NOT Ready to Pick Up. Non-balloon orders use Ready to Pick Up." },
      { q: "You're staging a shipping order and one item is out of stock. What do you do?", o: ["Mark it fulfilled", "Highlight the out-of-stock item on the packing list and stage the rest", "Cancel the order", "Throw the list away"], a: 1, w: "This alerts the Online Orders Assistant so they can contact the customer." },
      { q: "In what order do you arrange next-day balloon orders on the staging hooks?", o: ["Alphabetical", "By price", "Earliest pickup time at the front", "Latest pickup at the front"], a: 2, w: "Check the pickup time on each form and put the earliest at the front." },
      { q: "What must you NOT do after closing the helium tank?", o: ["Turn off the machine", "Purge the remaining gas", "Close the valve", "Sweep"], a: 1, w: "Leave the residual line pressure as it is." },
      { q: "Which night do the big bins get wheeled out to the curb?", o: ["Monday", "Tuesday", "Thursday", "Saturday"], a: 1, w: "Tuesday night, ready for morning collection." },
      { q: "Which balloons can be pre-inflated the night before a busy day?", o: ["Latex", "Confetti", "Foils only", "All"], a: 2, w: "Foils hold gas much longer than latex." }
    ]
  },

  /* ------------------------------------------------------------ 13 */
  {
    id: "difficult", icon: "💬", title: "Difficult Customers and Tricky Situations",
    blurb: "Stay calm, stay positive, know when to get the manager.",
    lessons: [
      { title: "Your toolkit", body: `
        <p>Almost every tricky situation gets easier if you use the Party Mix service basics.</p>
        <ol>
          <li><strong>Stay calm and slow down.</strong> Speak slowly and clearly. Keep open body language: no sighing, no eye-rolling, no crossed arms.</li>
          <li><strong>Listen first.</strong> Let them finish. Say "Thanks for letting me know" or "I'm sorry that's happened, let me see what I can do."</li>
          <li><strong>Lead with what you CAN do.</strong> Avoid a blunt "No." Instead of "No, we don't have that" say "We're actually out of that colour right now, but I can show you what we have."</li>
          <li><strong>Use the policy, not an opinion.</strong> "Our policy is returns within 6 days with a receipt." Be kind, be clear, don't argue.</li>
          <li><strong>Get the working manager</strong> when it involves exceptions, money or something you aren't sure about.</li>
        </ol>
        <div class="tip">Remember: it's never personal. Most upset customers are stressed about an event that matters to them.</div>` },
      { title: "Common situations", body: `
        <h4>"I want a refund on my inflated balloons."</h4>
        <p>Be empathetic, then explain our policy: inflated balloons can't be refunded. If a <em>helium balloon is damaged</em>, a replacement needs the <strong>receipt and the damaged balloon</strong> brought back in. Balloons that pop or puncture aren't replaced. If they push back, bring in the working manager.</p>
        <h4>"I've opened this icing/cake mix and want to return it."</h4>
        <p>Generally, broken seal = no return. But <strong>always check with the working manager first</strong>, because they have the final say.</p>
        <h4>"I'm out of time, I need it now!" (stressed parent)</h4>
        <p>Stay calm and quick. Get their order started, tell them honestly how long it'll take (using the 90-minute rule), and confirm the pickup time.</p>
        <h4>"Why can't I pay with Afterpay?"</h4>
        <p>"I'm sorry, we don't accept Afterpay or Zip, but we take Visa, Mastercard, cash and split payments." Offer the options you do have.</p>
        <h4>"The balloons I picked up yesterday have gone down."</h4>
        <p>Ask when they bought them and how they were stored (sun, heat, kept in the bag). Lifespans vary: standard latex 2 to 3 days, foil 4 to 6, confetti about 12 hours. Check the receipt, and ask the manager about a replacement.</p>
        <h4>Someone is rude or you feel unsafe</h4>
        <p>Stay calm, stay polite, get the working manager. You never have to put up with abuse, and you never have to handle it alone.</p>` }
    ],
    skills: [
      "Staying calm and using open body language with an upset customer",
      "Replacing a blunt 'No' with what we CAN do",
      "Explaining a policy kindly (returns, balloons, payments)",
      "Knowing when to get the working manager"
    ],
    quiz: [
      { q: "A customer is upset. What's your first move?", o: ["Explain the policy immediately", "Listen first, then say sorry it happened and see what you can do", "Walk away", "Ask them to leave"], a: 1, w: "Listening first calms the situation." },
      { q: "Which is better than \"No, we don't have that\"?", o: ["\"Nope.\"", "\"We're out of that right now, but I can show you what we have.\"", "\"Not my problem.\"", "\"Check online.\""], a: 1, w: "Lead with what you CAN do." },
      { q: "A customer wants a refund on an opened tub of buttercream. What do you do?", o: ["Refund immediately", "Refuse and walk off", "Check with the working manager, who has the final say", "Offer a discount on balloons"], a: 2, w: "Edible refund requests always go to the manager." },
      { q: "A customer wants an Afterpay purchase. What do you say?", o: ["\"Sure.\"", "\"We don't accept Afterpay or Zip, but we take Visa, Mastercard, cash and split payments.\"", "\"Go away.\"", "\"Use Amex.\""], a: 1, w: "State what we don't take, then list what we do." },
      { q: "When should you bring in the working manager?", o: ["Never", "For exceptions, money matters, unsure situations or if a customer is abusive", "Only at close", "Only for refunds over $1000"], a: 1, w: "You're never on an island. Escalate when needed." }
    ]
  }

  ]
};

/* ---------------------------------------------------------------
   ADDITIONS FROM THE TRAINING VIDEOS (Nov 2026)
   --------------------------------------------------------------- */
(function () {
  function M(id) { return window.PM_CONTENT.modules.filter(function (m) { return m.id === id; })[0]; }

  var inf = M("inflating");
  inf.lessons.push({ title: "Video recap: tying, orbs, arranging and changing the tank", body: `
    <h4>Foils vs latex (video)</h4>
    <ul>
      <li>Foil: use the foil nozzle. If the helium doesn't want to go in, press on the valve and pull it up.</li>
      <li><strong>Tie a foil balloon three times.</strong></li>
      <li>Latex: <strong>Hi-Float</strong> them. Pull the balloon all the way over the nozzle, down to the line.</li>
    </ul>
    <h4>Blowing up an Orbz</h4>
    <ul>
      <li>Start it on the machine, then once it reaches the point shown in the video, <strong>finish it with a hand pump</strong>.</li>
      <li>Stop when it gets to the size shown in the video.</li>
    </ul>
    <h4>Arranging a bouquet</h4>
    <ul>
      <li>Start with your first balloon. Under a <strong>foil</strong> balloon leave <strong>4 to 5 hand spaces</strong>, depending on how big the next balloon is.</li>
      <li>Between <strong>latex</strong> balloons leave about <strong>3 hand spaces</strong>.</li>
      <li>Space them out. Not too cramped together.</li>
    </ul>
    <h4>Changing the helium tank</h4>
    <ol>
      <li><strong>Close the valve</strong> on the empty tank.</li>
      <li>Let the remaining gas out of the regulator <strong>before</strong> unscrewing it.</li>
      <li>Unscrew the pressure regulator.</li>
      <li>Check the new tank for <strong>moisture</strong>. If it's wet, dry it with paper.</li>
      <li>Screw the regulator onto the new tank. It should go on without force. <strong>Never force it.</strong></li>
    </ol>
    <div class="tip">Letting the gas out is only for a tank change. At closing time, leave the line pressurised as in the shutdown lesson.</div>` });
  inf.skills.push("Tie a foil balloon (three ties)", "Inflate an Orbz with the hand pump", "Arrange a bouquet with correct hand spaces", "Change a helium tank safely");
  inf.quiz.push(
    { q: "How many times do you tie a foil balloon?", o: ["Once", "Twice", "Three times", "Four times"], a: 2, w: "Foils are tied three times so they stay sealed." },
    { q: "How many hand spaces go under a foil balloon in a bouquet?", o: ["1 to 2", "3", "4 to 5", "8"], a: 2, w: "Allow 4 to 5 hand spaces under a foil, depending on the size of the next balloon. Latex gets about 3." },
    { q: "When changing a helium tank, what do you do before unscrewing the regulator?", o: ["Nothing", "Close the valve and let the remaining gas out", "Turn the machine to 2.0", "Open the new tank"], a: 1, w: "Close the valve, then release the remaining gas before unscrewing the regulator." },
    { q: "You're screwing the regulator onto the new tank and it won't go on easily. What do you do?", o: ["Force it", "Use a wrench", "Stop. It shouldn't need force, check it and ask a manager", "Skip the regulator"], a: 2, w: "A regulator should screw on without force. Forcing it can damage the thread." }
  );

  var ord = M("orders");
  ord.lessons.push({ title: "Writing the paper order form (video walkthrough)", body: `
    <ol>
      <li><strong>Draw the balloons.</strong> Draw the number first, then a line for its string, then a circle for each balloon (for example three circles for three balloons). If they want a weight, draw a triangle at the bottom.</li>
      <li><strong>Write the colours</strong> they want next to each balloon.</li>
      <li>Ask for their <strong>preferred pickup date and time</strong> and write it in the boxes.</li>
      <li>Get their <strong>name and phone number</strong>.</li>
      <li><strong>Always ask if they want a bag.</strong> If yes, put a 1.</li>
      <li>If they're collecting other items as well, tick that box. If it's balloons only, tick <strong>Balloons only</strong>.</li>
      <li>Ask <strong>how tall</strong> they want the balloons, and whether it's for the <strong>floor or the table</strong>.</li>
      <li>Once everything is put through the POS, <strong>tick the box</strong> on the form.</li>
      <li>Print the receipt, <strong>attach it to the back of the form and staple it</strong>.</li>
    </ol>` });
  ord.quiz.push(
    { q: "On the paper order form, what do you draw for a weight on the bottom?", o: ["A square", "A triangle", "A star", "Nothing"], a: 1, w: "A triangle at the bottom means a weight." },
    { q: "Where does the printed receipt go once the order is through the POS?", o: ["In the bin", "Attached to the back of the form and stapled", "Given only to the customer", "Under the till"], a: 1, w: "Attach it to the back of the form and staple it." }
  );

  var sp = M("special");
  sp.lessons.push({ title: "Video recap: vinyl form and refunding a bond", body: `
    <h4>Vinyl order form</h4>
    <ul>
      <li>Vinyls usually need <strong>24 hours' notice</strong>. If it's needed the same day, <strong>check with the manager</strong> first.</li>
      <li>Fill out a normal balloon order form first, then the vinyl order form.</li>
      <li>Write the <strong>name</strong> and the <strong>date they want it for</strong>.</li>
      <li>Ask what the vinyl should <strong>say</strong>.</li>
      <li>Get the customer to pick a <strong>font from the sheet</strong>.</li>
      <li>Ask the <strong>vinyl colour</strong> and check we have it in the drawer.</li>
      <li>Ask what <strong>type of balloon</strong> it will go on.</li>
      <li>Keep the form aside <strong>next to the cake computer</strong>.</li>
    </ul>
    <h4>Refunding a bond</h4>
    <ol>
      <li><strong>Scan the receipt.</strong></li>
      <li>Press <strong>Return or exchange</strong> and select the bond.</li>
      <li>Refund via the <strong>original payment type</strong> (cash back for cash, card for card).</li>
      <li><strong>Print a receipt</strong> and have the customer <strong>sign it</strong>.</li>
      <li><strong>Staple this receipt with the order form</strong> (if there is one) and file it in the binder.</li>
    </ol>` });
  sp.quiz.push(
    { q: "How much notice do vinyls usually need?", o: ["None", "2 hours", "24 hours", "One week"], a: 2, w: "Vinyls usually need 24 hours' notice. For same-day, check with the manager." },
    { q: "Where does the completed vinyl order form go?", o: ["In the bin", "Next to the cake computer", "In the front window", "In the customer's bag"], a: 1, w: "Keep it aside next to the cake computer." }
  );

  var pos = M("pos");
  pos.lessons.push({ title: "POS how-to: step by step from the videos", body: `
    <h4>Add a customer to a sale</h4>
    <ol>
      <li>Tap <strong>Add customer</strong>. There are 2 ways to get there.</li>
      <li>Search by name or number and tap the customer. They show on the cart.</li>
      <li><strong>New customer?</strong> Tap Add customer, then <strong>Add new customer</strong>, enter their details and press Add customer.</li>
      <li>You can add their <strong>birth date</strong> (we give birthday credit).</li>
      <li>If they are an <strong>ABN customer</strong>, we collect more details. Then <strong>get a supervisor or manager</strong> to add the tags for the ABN discount.</li>
    </ol>
    <h4>Loyalty points</h4>
    <ol>
      <li>First add the customer account to the sale.</li>
      <li>Tap <strong>Loyalty POS</strong> and choose the reward to redeem.</li>
      <li>Points are deducted straight away and a loyalty discount goes on the cart. <strong>If the cart is cleared or the discount removed, points are NOT refunded automatically.</strong> A manager has to cancel the reward in admin.</li>
    </ol>
    <h4>Custom sales</h4>
    <ul>
      <li>We have <strong>preset custom sale prices</strong>. Use those first.</li>
      <li>If there isn't a preset, tap <strong>Add custom sale</strong>, enter the price and title, and press Save.</li>
      <li>This needs <strong>manager approval</strong>: a manager enters their PIN.</li>
    </ul>
    <h4>Order note for balloon pickups</h4>
    <ul><li>Tap <strong>Add note</strong> and type the <strong>pickup date, pickup day and pickup time</strong>. It prints on the customer's receipt.</li></ul>
    <h4>Taking payment</h4>
    <ul>
      <li><strong>Card:</strong> just press Checkout. It starts the eftpos machine automatically. Tap, insert or swipe.</li>
      <li><strong>Cash:</strong> enter the amount the customer hands you (or press a preset), give change, then print or send the receipt.</li>
      <li><strong>Split payment:</strong> enter the amount they want to pay first, take it, give any change, then repeat for the second payment type.</li>
      <li><strong>Over the phone:</strong> choose <strong>Manual card entry</strong> and type the card number, expiry and CVV. A <strong>card fee</strong> is added for these.</li>
    </ul>` });
  pos.skills.push("Add a new customer with details", "Redeem loyalty points", "Add a custom sale (with manager PIN)", "Take a split payment", "Take a phone payment with manual card entry");
  pos.quiz.push(
    { q: "A customer removes a loyalty discount from the cart after redeeming. What happens to their points?", o: ["Refunded automatically", "NOT refunded automatically; a manager cancels the reward in admin", "Doubled", "Nothing, they never lose points"], a: 1, w: "Points come off immediately and aren't automatically refunded. A manager cancels the reward." },
    { q: "What does a custom sale need that normal items don't?", o: ["A receipt", "Manager approval (PIN)", "A birthday", "A loyalty card"], a: 1, w: "Custom sales require manager approval." },
    { q: "How do you take a split payment?", o: ["Take it all on card", "Enter the first amount, take it, then repeat for the second payment type", "Ask a manager to do it", "Not possible"], a: 1, w: "Enter the amount for the first payment type, complete it, then do the second." },
    { q: "A customer wants to pay by card over the phone. Which option do you use?", o: ["Cash", "Gift card", "Manual card entry", "Split payment"], a: 2, w: "Use manual card entry and enter the card details. A card fee applies." },
    { q: "Who adds the ABN discount tags to an ABN customer?", o: ["The customer", "Any casual", "A supervisor or manager", "Nobody"], a: 2, w: "Get a supervisor or manager to add the ABN tags." }
  );
})();

/* ---- Role-play scenes (animated, shown in the module's Learn tab) ---- */
(function () {
  var mod = window.PM_CONTENT.modules.filter(function (m) { return m.id === "service"; })[0];
  if (!mod) return;
  mod.scenes = [{
    title: "Greeting a customer: wrong way vs Party Mix way",
    blurb: "A busy mum, a Saturday morning, and two very different welcomes.",
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { note: "Saturday morning. A stressed mum rushes in. Her daughter's party is this afternoon!" },
        { who: "cust", face: "stressed", fx: "😰", say: "Hi! I need balloons for my daughter's party today!" },
        { who: "staff", face: "bored", other: "stressed", say: "Yeah? What do you want?" },
        { who: "cust", face: "surprised", say: "Umm… a helium bunch? Do you have any left?" },
        { who: "staff", face: "bored", other: "upset", say: "Hold on." },
        { who: "cust", face: "upset", fx: "😞", say: "Okay… thanks." },
        { who: "staff", face: "bored", say: "No worries." },
        { note: "😕 She feels unwelcome. She leaves unsure, and she might not come back." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same mum. Same busy morning. Let's try that again." },
        { who: "staff", face: "smile", fx: "✨", say: "Hi there! How can I help you today?" },
        { who: "cust", face: "stressed", other: "smile", say: "I need balloons for my daughter's party this afternoon!" },
        { who: "staff", face: "bigsmile", fx: "🎉", other: "stressed", say: "Ooh, how exciting! What's the theme? I'll get you sorted nice and quick." },
        { who: "cust", face: "relieved", say: "Unicorns! And pickup at 2pm." },
        { who: "staff", face: "smile", say: "One moment please, let me check that for you. Thank you for your patience!" },
        { who: "cust", face: "bigsmile", fx: "💖", say: "Thank you so much, you're a lifesaver!" },
        { who: "staff", face: "bigsmile", say: "You're very welcome! It's my pleasure!" },
        { note: "😍 She feels looked after, and she'll be back. That's the Party Mix way." }
      ] }
    ],
    tips: [
      "Greet warmly: \"Hi there! How can I help you today?\"",
      "Match their vibe. A stressed parent wants quick, calm and clear.",
      "Swap \"No worries\" for \"You're very welcome!\" and \"Hold on\" for \"One moment please.\""
    ]
  }];
})();

/* ---- Serve Rush customers + Inflate Challenge rounds (games) ---- */
(function () {
  function M(id) { return window.PM_CONTENT.modules.filter(function (m) { return m.id === id; })[0]; }
  function S(id, list) { var m = M(id); if (m) m.serve = list; }
  S("service", [
    { cust: "Customer", face: "neutral", line: "*walks in and starts browsing*", opts: ["Rush over straight away and ask what they want", "Wait about 10 seconds, then greet them warmly", "Keep stocking shelves and ignore them"], a: 1, w: "The 10-second rule gives them time to settle in so you're noticed, not pounced on." },
    { face: "bigsmile", line: "Thank you so much for your help!", opts: ["“No worries!”", "“You're very welcome!”", "“Yep.”"], a: 1, w: "We swap casual phrases like “no worries” for warmer ones like “You're very welcome” or “It's my pleasure”." },
    { face: "stressed", line: "I can't find the cake boards anywhere!", opts: ["Point and say “They're down the back”", "Walk them over to the item", "Say “Ask someone else”"], a: 1, w: "Walking them to the item means they know where it is for next time." },
    { face: "neutral", line: "Good morning. I'm organising a corporate event and need some information.", opts: ["“Hey! What can I get ya?”", "“Good morning! I'd be happy to help. What do you need?”", "“Yeah, hold on.”"], a: 1, w: "Match their formality. Corporate / ABN clients want polished, direct and professional." },
    { face: "smile", line: "Okay, I think that's everything!", opts: ["Quote the total straight away", "Double-check every item has been scanned, then quote", "Ask the customer to count their items"], a: 1, w: "The accuracy check comes BEFORE quoting the final price. It protects the customer and the shop." }
  ]);
  S("upsell", [
    { face: "smile", line: "I'll take these 3 helium balloons please.", opts: ["Offer a balloon weight and transport bag", "Just take payment", "Ask if they want a cake board"], a: 0, w: "The always rule: a balloon weight and transport bag with every balloon sale." },
    { face: "neutral", line: "I'm just getting the cake and nothing else.", opts: ["“Want a board?”", "“Do you need a board to sit that under? It makes carrying and serving so much easier.”", "“You have to buy a board.”"], a: 1, w: "Give a reason, not just a product. That's the strong way to offer a cake board." },
    { face: "smile", line: "I'll have the 3-balloon arrangement ($13.50).", opts: ["Suggest the 5-balloon arrangement for $20.50", "Say nothing and take payment", "Tell them 3 balloons look small"], a: 0, w: "A small price jump makes a much bigger impact on the table." },
    { face: "bigsmile", line: "I'll take this pinata for my son's party.", opts: ["Offer a pinata stick", "Offer a cake board", "Nothing, they didn't ask"], a: 0, w: "Suggest what actually fits the purchase: a pinata needs a stick." },
    { face: "smile", line: "That's all my balloons. Can I pay?", opts: ["“Have you sorted a cake yet? Cake boards and boxes are right there.”", "“Anything else?” (flat voice)", "“Buy more stuff!”"], a: 0, w: "The golden line: “Have you sorted [the other obvious thing] yet?” saves them a second trip." }
  ]);
  S("balloons", [
    { face: "neutral", line: "Does this price include the helium?", opts: ["“Helium is extra.”", "“The tag price includes the balloon, helium, string and Hi-Float.”", "“Hi-Float is $2 extra.”"], a: 1, w: "Core rule: unless a sticker says otherwise, the price tag covers it all." },
    { face: "neutral", line: "How long will a standard latex balloon last?", opts: ["About 2 to 3 days with Hi-Float", "About 2 weeks", "About 12 hours"], a: 0, w: "Standard latex 2 to 3 days, foil 4 to 6 days, confetti about 12 hours." },
    { face: "smile", line: "I bought my own latex balloons. Can you inflate them?", opts: ["Sure, any balloon!", "Foils only. We can't guarantee the quality of outside latex", "No outside balloons at all, ever"], a: 1, w: "Foils yes, latex no, because we can't guarantee outside latex quality." },
    { face: "neutral", line: "I'm taking these home. Anything I should know?", opts: ["Keep them in the bag until the party", "Take them out of the bag once home, heat gets trapped inside", "Leave them in the hot car"], a: 1, w: "Heat trapped in the bag can ruin the balloons." },
    { face: "stressed", line: "Can you top up my latex balloon from yesterday?", opts: ["Yes, any balloon", "Only foils can be topped up", "No top-ups on anything"], a: 1, w: "After one inflation the self-sealing valve may be damaged, so top-ups are foils only." }
  ]);
  S("orders", [
    { face: "neutral", line: "Can I pick up my balloons at 8:30 on Wednesday?", opts: ["“Sure, no problem!”", "“Our earliest weekday pickup is 9:15 am. Would that work?”", "“We don't do weekday pickups.”"], a: 1, w: "Earliest pickups: weekdays 9:15 am, Saturdays 9:00 am, Sundays 11:15 am." },
    { face: "stressed", line: "I'm ordering balloons over the phone. When do I pay?", opts: ["In full before we inflate", "When you pick up", "Half now, half later"], a: 0, w: "Balloons need full payment before inflation." },
    { face: "upset", line: "I need to cancel my balloon order.", opts: ["No fee, we refund everything", "A 10% non-refundable fee applies", "A 50% fee applies"], a: 1, w: "Cancellations carry a 10% non-refundable fee." },
    { face: "neutral", line: "Can you hold these cake supplies until tomorrow? I'll pay then.", opts: ["Yes, for up to 24 hours", "Yes, for a whole week", "No, never"], a: 0, w: "Non-balloon items can be held for a maximum of 24 hours on a phone order." },
    { face: "smile", line: "What's the earliest I can collect on Sunday?", opts: ["9:00 am", "9:15 am", "11:15 am"], a: 2, w: "Sundays 11:15 am. Weekdays 9:15 am, Saturdays 9:00 am." }
  ]);
  S("special", [
    { face: "smile", line: "Can I get a vinyl put on a standard 30cm latex balloon?", opts: ["Yes, any balloon", "No, vinyl can't go on standard 30cm latex", "Only on Sundays"], a: 1, w: "Vinyl can't be applied to standard 30cm latex." },
    { face: "stressed", line: "I need vinyls for this afternoon!", opts: ["“Sure, ready in an hour!”", "“Vinyls usually need 24 hours' notice. Let me check same-day with the working manager.”", "“Impossible. Ever.”"], a: 1, w: "Usually 24 hours. For same-day, check with the working manager." },
    { face: "smile", line: "I'd love a garland for 20 December.", opts: ["Check the date with the manager before taking details", "Take all the details first", "Promise “yes” straight away"], a: 0, w: "Always check the date with the manager first to confirm capacity." },
    { face: "neutral", line: "I'm returning my arch hire. I paid the $100 bond in cash.", opts: ["Refund the bond by cash, the same method", "Refund the bond to a card", "Keep the bond"], a: 0, w: "Bonds are always refunded by the original payment method." },
    { face: "neutral", line: "Do you deliver on Sundays?", opts: ["Yes, any time", "No, we don't deliver on Sundays", "Only orders under $40"], a: 1, w: "No Sunday deliveries. Saturday needs a manager check, and delivery orders must be over $40 (apart from garlands)." }
  ]);
  S("pos", [
    { face: "smile", line: "It's my birthday this month. Any perks?", opts: ["We collect birthdays so you get a $10 credit on the day", "A free balloon", "No perks, sorry"], a: 0, w: "We collect birthdays so customers get a $10 birthday credit on the day." },
    { face: "neutral", line: "I spent $200 today. How many points is that?", opts: ["20 points", "200 points, worth $10", "200 points, worth $100"], a: 1, w: "$1 = 1 point. 200 points = $10, 500 points = $25." },
    { face: "neutral", line: "I have an ABN. Can I get a business discount?", opts: ["Set it up yourself straight away", "Check with a manager before setting up the account", "Say no"], a: 1, w: "ABN accounts need a manager check. They get 15% off instead of points." },
    { face: "stressed", line: "I want to pay half in cash and half on my card.", opts: ["Enter the first amount, take it, then do the second payment type", "Say split payments aren't possible", "Put it all on the card"], a: 0, w: "Split payment: enter the amount for the first type, complete it, then repeat." },
    { face: "neutral", line: "I'd like to pay by card over the phone.", opts: ["Manual card entry (a card fee applies)", "Refuse phone payments", "Use a custom sale"], a: 0, w: "Use manual card entry and enter the card details. A card fee applies." },
    { face: "stressed", line: "The barcode's gone from this item.", opts: ["Search the POS by name or description first", "Make a custom sale", "Give it to them free"], a: 0, w: "Custom sales hurt inventory accuracy, so search first." }
  ]);
  S("refunds", [
    { face: "neutral", line: "I have my receipt, but not the card I paid with.", opts: ["“No card, no refund.”", "“That's fine, the receipt is what we need.”", "“Come back tomorrow.”"], a: 1, w: "The receipt is required. The card isn't." },
    { face: "neutral", line: "I paid by card. How do I get my refund?", opts: ["Cash from the till", "Back to the same card", "Store credit only"], a: 1, w: "Refunds always go back to the original payment method." },
    { face: "stressed", line: "I bought this online. Can you refund it at the register?", opts: ["Yes, at the register", "Online refunds go through Shopify, never the register", "No refunds on online orders"], a: 1, w: "All online refunds go through Shopify." },
    { face: "stressed", line: "I want to return these inflated balloons.", opts: ["Sure, here's your refund", "Inflated balloons can never be returned", "Only if they're foils"], a: 1, w: "Inflated balloons, perishables, gift cards and sale items can't be returned." },
    { face: "upset", line: "I opened this tub of buttercream but I don't want it.", opts: ["Refund it, no problem", "Check with the working manager first", "Tell them no, end of story"], a: 1, w: "A broken seal generally means no return, but the manager has the final say." },
    { face: "neutral", line: "It's been 8 days since I bought this. Can I return it?", opts: ["Our window is 6 days, so let me check with the working manager", "Yes, we take anything back for 30 days", "No, goodbye"], a: 0, w: "6 days from purchase, unused, in original packaging, with receipt. The manager has the final say on exceptions." }
  ]);
  S("cakebasics", [
    { face: "neutral", line: "I've got a 9\" board but you have no 9\" box. Which box?", opts: ["An 8\" box", "A 10\" box, the closest larger", "A 12\" box, whatever"], a: 1, w: "Pick the closest larger box." },
    { face: "stressed", line: "I'm making a tall, heavy cake. What board?", opts: ["A thin cake card", "A drum board", "Just a paper plate"], a: 1, w: "Drum boards are much thicker and sturdier." },
    { face: "neutral", line: "What's a perforated compressed board for?", opts: ["Letting a central dowel pass through multiple tiers", "Cutting cakes on", "Holding cupcakes"], a: 0, w: "The pre-cut centre hole lets a dowel pass through the tiers." },
    { face: "smile", line: "How many cupcakes does 1kg of Buttacake mix make?", opts: ["About 6", "About 24 to 30", "About 100"], a: 1, w: "One 1kg Buttacake mix makes one 8\" x 3\" round, or about 24 to 30 cupcakes." },
    { face: "neutral", line: "Can I buy a whole pack of 10 boards for the price of one?", opts: ["Yes, scan it once", "No, boards are taken out of the sleeve and sold individually", "Only on Tuesdays"], a: 1, w: "So nobody scans a pack of 10 for the price of one." }
  ]);
  S("cakedeco", [
    { face: "neutral", line: "I'm colouring white chocolate. What should I use?", opts: ["A water-based gel", "Colour Mill (oil-based)", "Water"], a: 1, w: "Water-based gel makes chocolate seize. Oil-based Colour Mill bonds with fats." },
    { face: "upset", line: "My buttercream looks speckled and won't hold colour.", opts: ["They're probably using a water-based gel. Try Colour Mill", "Add more water", "Whip it for an hour"], a: 0, w: "Water-based gel doesn't bind to butter fat. Suggest Colour Mill." },
    { face: "smile", line: "I'm making a 3D figure that has to stand up on its own.", opts: ["Fondant", "Modelling paste (gum paste)", "Buttercream"], a: 1, w: "Modelling paste dries much harder than fondant." },
    { face: "neutral", line: "Do you still stock Sweet Sticks Activator?", opts: ["Point them to Bakers Base", "Say it never existed", "Send them to another shop"], a: 0, w: "Bakers Base is our closest equivalent." },
    { face: "neutral", line: "I want the letters pressed into my fondant, not raised.", opts: ["A debosser", "An embosser (text stamps)", "A rolling pin"], a: 1, w: "Embossers press in (sunken). Debossers make a raised design." },
    { face: "neutral", line: "I'm not sure what size edible image to get.", opts: ["17.5cm, our standard size", "5cm", "Any size at all"], a: 0, w: "17.5cm is the default if the customer is unsure." }
  ]);
  S("party", [
    { face: "bigsmile", line: "I'm buying these Spiderman balloons.", opts: ["“We have Spiderman party and cake supplies too. Are you doing a matching party?”", "“That's $12.”", "“Anything else?” (flat)"], a: 0, w: "Theme shoppers plan whole events, so matching suggestions feel helpful." },
    { face: "neutral", line: "I'll take this party banner.", opts: ["Offer centrepieces", "Offer a cake board", "Offer nothing"], a: 0, w: "Banner ➜ centrepieces." },
    { face: "stressed", line: "Do you have this exact character plate? It's not on the shelf.", opts: ["“No, sorry.”", "Think outside the box and suggest matching alternatives", "“Try another shop.”"], a: 1, w: "Alternatives keep the sale and help the customer." },
    { face: "neutral", line: "Is this one suitable for a vegan cake?", opts: ["“Yes, definitely!” (not sure)", "Say you'll check, or ask the working manager", "“I have no idea.”"], a: 1, w: "A quick check beats a wrong answer." },
    { face: "smile", line: "I need a centrepiece for the table.", opts: ["A number balloon bouquet, a popular party centrepiece", "A cake board", "A pinata stick"], a: 0, w: "Number balloon bouquets make popular centrepieces." }
  ]);
  S("difficult", [
    { face: "angry", line: "This is ridiculous! My order is wrong!", opts: ["“Calm down.”", "Listen first, say sorry it happened, then see what you can do", "“That's not my problem.”"], a: 1, w: "Listening first calms the situation. Then apologise that it happened and look for a fix." },
    { face: "upset", line: "What do you mean you don't have the Frozen plates?", opts: ["“No, we don't have that.”", "“We're out of that right now, but I can show you what we have.”", "“Not my fault.”"], a: 1, w: "Lead with what you CAN do." },
    { face: "stressed", line: "I'll pay with Afterpay.", opts: ["“We don't accept Afterpay or Zip, but we take Visa, Mastercard, cash and split payments.”", "“No.”", "“Why would you want that?”"], a: 0, w: "State what we don't take, then list what we do." },
    { face: "upset", line: "I want my money back for this opened buttercream!", opts: ["Refund immediately", "Check with the working manager, who has the final say", "Refuse flatly"], a: 1, w: "Edible refund requests always go to the manager." },
    { face: "angry", line: "You're useless! Get me someone else!", opts: ["Argue back", "Stay calm and bring in the working manager", "Walk away"], a: 1, w: "You're never on an island. Escalate for exceptions, money matters, unsure situations or if a customer is abusive." }
  ]);
  var inf = M("inflating");
  if (inf) inf.inflate = [
    { type: "hold", label: "Test inflate: set to 0.5 and stop at about 70% of full size", secs: 3.2, lo: 0.6, hi: 0.8, showTest: true, w: "Start the test inflate at 0.5 and inflate to roughly 70% of the size you need." },
    { type: "hold", label: "Now finish it to full size using the sizing template", secs: 2.6, lo: 0.92, hi: 1.08, w: "Using the sizing template, adjust up or down to inflate the rest of the way to full size." },
    { type: "pick", q: "Your settings added up to 0.5 + 0.5 + 0.4 = 1.4. Tank pressure is NORMAL. What do you program?", o: ["0.7", "1.4", "2.8"], a: 0, w: "Normal pressure: half the total (0.7). Low pressure: the full amount (1.4)." },
    { type: "pick", q: "Which nozzle do you use for a FOIL balloon?", o: ["The upright nozzle", "The angled nozzle"], a: 0, w: "Foils use the upright nozzle; latex uses the angled nozzle." },
    { type: "pick", q: "A gender reveal latex balloon with confetti inside. Hi-Float?", o: ["No, the wet gel can make the confetti stick", "Yes, always add Hi-Float"], a: 0, w: "Always add Hi-Float to latex, except for gender reveals." },
    { type: "hold", label: "The tank is nearly empty and it's moving fast! Fill to full size", secs: 2.0, lo: 0.92, hi: 1.08, w: "Gas flow depends on pressure and what's left in the tank, so adjust through the day." },
    { type: "pick", q: "How many times do you tie a foil balloon?", o: ["Once", "Twice", "Three times"], a: 2, w: "Foils are tied three times so they stay sealed." },
    { type: "pick", q: "It's closing time and the tank is off. What about the gas in the line?", o: ["Leave the residual line pressure as it is", "Purge it all out to be safe"], a: 0, w: "Once the tank is closed, do NOT purge the leftover gas. Letting gas out is only for a tank change." }
  ];
})();

/* ---- Role-play scenes for every other module ---- */
(function () {
  function M(id) { return window.PM_CONTENT.modules.filter(function (m) { return m.id === id; })[0]; }
  function add(id, sc) { var m = M(id); if (!m) return; (m.scenes = m.scenes || []).push(sc); }
  var MGR = { name: "Manager", skin: "#d9a577", hair: "#2b2b2b", shirt: "#0f766e" };
  var BIZ = { name: "Corporate client", skin: "#d9a577", hair: "#1c1c1c", shirt: "#475569" };
  var DAD = { name: "Birthday dad", skin: "#f1c8a0", hair: "#7a4a21", shirt: "#10b981" };
  var BAKER = { name: "Home baker", skin: "#c68642", hair: "#1a1109", shirt: "#8b5cf6" };
  var ANGRY = { name: "Upset customer", skin: "#e9b68c", hair: "#2d1b12", shirt: "#c23b3b" };

  add("upsell", { title: "Helpful, not pushy: the balloon sale", blurb: "Weight, bag, cake board and an upgrade, the Party Mix way.", cust: DAD,
    parts: [
      { label: "The missed opportunity", mood: "bad", beats: [
        { note: "A dad is buying balloons for his son's party." },
        { who: "cust", face: "smile", say: "Just these 3 balloons thanks!" },
        { who: "staff", face: "bored", say: "$13.50." },
        { who: "cust", face: "neutral", say: "Here you go." },
        { note: "😕 No weight, no transport bag, no cake board. The balloons float off at the car and he has to come back." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same dad. Same 3 balloons. Helpful, not pushy." },
        { who: "staff", face: "smile", say: "Lovely! I'll grab you a balloon weight and a transport bag so they get home safely." },
        { who: "cust", face: "relieved", say: "Oh, good thinking!" },
        { who: "staff", face: "smile", fx: "💡", say: "Most people go for the 5-balloon arrangement at $20.50. It makes a much bigger impact on the table." },
        { who: "cust", face: "bigsmile", say: "Go on then, let's do that!" },
        { who: "staff", face: "bigsmile", say: "Have you sorted a cake yet? Cake boards and boxes are right there." },
        { who: "cust", face: "bigsmile", fx: "🎂", say: "Ha! I do need a board. Thanks!" },
        { note: "😍 A bigger sale, a happy dad, and no second trip. That's helpful, not pushy." }
      ] }
    ],
    tips: ["ALWAYS offer a balloon weight and transport bag with a balloon sale.", "Give a reason: “It makes carrying and serving so much easier.”", "Use the golden line: “Have you sorted [the other obvious thing] yet?”"] });

  add("balloons", { title: "Customer brings their own balloons", blurb: "What we can inflate, what's included, and how long balloons last.", cust: { name: "Customer", skin: "#f3d2b3", hair: "#d8d8d8", shirt: "#f59e0b" },
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { note: "A customer arrives with a bag of her own latex balloons." },
        { who: "cust", face: "smile", say: "Can you blow these up for me? I bought them online." },
        { who: "staff", face: "bored", say: "Sure, no worries." },
        { who: "cust", face: "surprised", say: "Oh! One just burst. And the others look floppy already." },
        { note: "😬 We can't guarantee outside latex. Now she's blaming the shop." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same customer, same bag of balloons." },
        { who: "staff", face: "smile", say: "Thanks for bringing them in! We can only inflate foils, as we can't guarantee the quality of outside latex." },
        { who: "cust", face: "neutral", say: "Oh, okay. What if I buy yours?" },
        { who: "staff", face: "bigsmile", say: "The price on the tag includes the balloon, helium, string and Hi-Float." },
        { who: "cust", face: "smile", say: "How long will they last?" },
        { who: "staff", face: "smile", say: "Standard latex lasts 2 to 3 days, foils 4 to 6, and confetti balloons about 12 hours. Take them out of the bag at home, as heat gets trapped." },
        { who: "cust", face: "bigsmile", fx: "🎈", say: "That's so helpful, thank you!" },
        { note: "😍 Clear, friendly and confident. She bought ours." }
      ] }
    ],
    tips: ["Foils only for outside balloons. We can't guarantee outside latex.", "The tag price includes the balloon, helium, string and Hi-Float (latex).", "Balloons come out of the bag at home. Heat gets trapped."] });

  add("inflating", { title: "Changing the helium tank", blurb: "Safe steps, and when to stop and ask your manager.", cust: MGR,
    parts: [
      { label: "The unsafe way", mood: "bad", beats: [
        { note: "The helium tank is empty. A manager is watching." },
        { who: "cust", face: "neutral", say: "Time to change the tank. Remember the steps?" },
        { who: "staff", face: "bigsmile", say: "Yep! I'll just unscrew the regulator." },
        { who: "cust", face: "surprised", fx: "⚠️", say: "Hang on! Valve first, then let the gas out!" },
        { who: "staff", face: "bored", say: "Now it won't screw onto the new tank. I'll just push harder." },
        { who: "cust", face: "angry", fx: "💢", say: "Never force it! You'll damage the thread." },
        { note: "⚠️ Skipped steps and forced threads are how tanks and regulators get damaged." }
      ] },
      { label: "The safe way", mood: "good", beats: [
        { note: "Same tank change, done properly." },
        { who: "staff", face: "smile", say: "First I close the valve on the empty tank, then let the remaining gas out of the regulator." },
        { who: "cust", face: "smile", say: "Good. And then?" },
        { who: "staff", face: "smile", say: "I unscrew the regulator and check the new tank for moisture. If it's wet, I dry it with paper." },
        { who: "staff", face: "neutral", other: "smile", say: "It won't go on easily, so I'm stopping. It shouldn't need force. Can you check it with me?" },
        { who: "cust", face: "bigsmile", fx: "👍", say: "Perfect call. That's exactly what to do." },
        { note: "✅ Letting gas out is only for a tank change. At closing, leave the line pressurised." }
      ] }
    ],
    tips: ["Close the valve, then let the remaining gas out before unscrewing the regulator.", "The regulator should screw on WITHOUT force. Stop and ask a manager.", "Letting gas out is only for a tank change, never at closing time."] });

  add("orders", { title: "Taking a phone order for balloons", blurb: "Payment, POS note, receipts and the 90-minute rule.", cust: { name: "Phone customer", skin: "#e9b68c", hair: "#2d1b12", shirt: "#ff6f91" },
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { note: "A customer rings to order balloons for Wednesday." },
        { who: "cust", face: "smile", say: "I'd like 10 balloons picked up Wednesday at 11am, please." },
        { who: "staff", face: "bored", say: "Sure. You can pay when you pick up." },
        { note: "😬 No full payment, no date, day and time in the POS note, one receipt only. On Wednesday nobody knows when to start inflating." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same call, done properly." },
        { who: "cust", face: "smile", say: "I'd like 10 balloons picked up Wednesday at 11am, please." },
        { who: "staff", face: "smile", say: "Lovely! Balloons need full payment before we inflate. Can I take your card details?" },
        { who: "cust", face: "neutral", say: "Of course." },
        { who: "staff", face: "smile", fx: "📝", say: "I'll put the date, day and time in the POS note, and print 2 receipts: one for you, one stapled to the back of the order form." },
        { who: "staff", face: "bigsmile", say: "We'll start inflating at 9:30 for your 11:00 pickup." },
        { who: "cust", face: "bigsmile", say: "Brilliant, thank you!" },
        { note: "✅ Paid in full, clearly noted, and ready on time." }
      ] }
    ],
    tips: ["Balloon orders are paid in FULL before we inflate.", "POS note: date, day of the week AND time. Print 2 receipts.", "Start inflating 90 minutes before pickup (11:00 pickup = 9:30 start)."] });

  add("special", { title: "Returning a hire bond", blurb: "Refund the bond the same way it was paid.", cust: BIZ,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { note: "A customer returns the arch hire. She paid the $100 bond in cash." },
        { who: "cust", face: "smile", say: "All returned and in good condition!" },
        { who: "staff", face: "bored", say: "Great, I'll refund your bond to a card." },
        { who: "cust", face: "surprised", say: "But I paid cash? I don't have the card here." },
        { note: "😕 Bonds must go back the same way they were paid. Now it's messy." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same return." },
        { who: "staff", face: "smile", say: "Thanks for bringing it back! Let me check it over." },
        { who: "staff", face: "smile", say: "All good! You paid your $100 bond in cash, so I'll refund it in cash, the same method." },
        { who: "cust", face: "bigsmile", fx: "💵", say: "Perfect, thank you!" },
        { note: "✅ Bonds are ALWAYS refunded by the original payment method." }
      ] }
    ],
    tips: ["Refund the bond by the SAME method it was paid.", "Check the item over before refunding.", "Hire diary: check the date plus 2 days before and 2 days after."] });
  add("special", { title: "Garland order: check the date first", blurb: "The first thing to do with any garland request.", cust: { name: "Party planner", skin: "#f1c8a0", hair: "#7a4a21", shirt: "#ff6f91" },
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "bigsmile", say: "I'd love a garland for 20 December!" },
        { who: "staff", face: "bigsmile", say: "Yes! Let me take all your details." },
        { who: "staff", face: "stressed", other: "smile", say: "Oh no... the manager says we're already full that day." },
        { who: "cust", face: "upset", say: "But you said yes!" },
        { note: "😞 Details were taken before the date was checked, and now we have to cancel." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "bigsmile", say: "I'd love a garland for 20 December!" },
        { who: "staff", face: "smile", fx: "📅", say: "Love it! Let me just check the date with the manager first to confirm we have capacity." },
        { who: "staff", face: "bigsmile", say: "Great news, we can do it! Would you like a hire arch or circle mesh to go with it?" },
        { who: "cust", face: "bigsmile", say: "Ooh yes please!" },
        { note: "✅ Date checked first, then a helpful upsell: meshes are the ideal frames to tie garlands to." }
      ] }
    ],
    tips: ["FIRST check the date with the manager, before taking any details.", "Suggest hire arch or circle meshes with garlands.", "No Sunday delivery. Saturday needs a manager check."] });

  add("pos", { title: "A customer with an ABN", blurb: "Check with a manager first. ABN means 15% off, not points.", cust: BIZ,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "neutral", say: "I have an ABN. Can I get a business discount?" },
        { who: "staff", face: "bigsmile", say: "Sure! I'll set up your account right now." },
        { note: "😬 Setting up or changing an ABN account without a manager check, with no tags added. The discount won't apply properly." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "neutral", say: "I have an ABN. Can I get a business discount?" },
        { who: "staff", face: "smile", fx: "🧾", say: "Absolutely! I'll check with a manager first to set up your ABN account." },
        { who: "cust", face: "neutral", say: "Do I earn loyalty points too?" },
        { who: "staff", face: "smile", say: "ABN accounts get an upfront 15% off instead of points. A supervisor or manager adds the ABN tags." },
        { who: "cust", face: "smile", say: "Great, thanks." },
        { note: "✅ Manager check first, and the customer knows exactly what they get." }
      ] }
    ],
    tips: ["Check with a manager BEFORE setting up or changing an ABN account.", "ABN = 15% off upfront. No loyalty points.", "A supervisor or manager adds the ABN tags."] });

  add("refunds", { title: "The opened tub of buttercream", blurb: "Edible refunds always go to the working manager.", cust: ANGRY,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "neutral", say: "I opened this buttercream but I don't want it. Refund please." },
        { who: "staff", face: "bored", say: "Yep, sure." },
        { who: "staff", face: "stressed", say: "Oh... a broken seal usually means no return. I should have asked." },
        { note: "😬 Edible items with a broken seal need the working manager's decision. You gave away a yes you couldn't give." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "neutral", say: "I opened this buttercream but I don't want it. Refund please." },
        { who: "staff", face: "smile", say: "Thanks for coming in. A broken seal can be tricky, so let me check with the working manager for you." },
        { who: "cust", face: "relieved", say: "Okay, thank you." },
        { who: "staff", face: "smile", fx: "🙋", say: "The manager has the final say. If they approve it, the refund goes back to the same card you paid with." },
        { note: "✅ Calm, honest and no promises you can't keep." }
      ] }
    ],
    tips: ["Opened edibles: check with the working manager. They have the final say.", "Refunds go back to the ORIGINAL payment method.", "Never returnable: inflated balloons, perishables, gift cards and sale items."] });

  add("cakebasics", { title: "Picking the right board and box", blurb: "Drum boards, dowels and the closest larger box.", cust: BAKER,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "stressed", say: "I'm making a tall, heavy 3-tier cake. I've got a 9\" board." },
        { who: "staff", face: "bored", say: "Any thin cake card will do." },
        { who: "cust", face: "surprised", say: "And a box? You don't have a 9\"." },
        { who: "staff", face: "bored", say: "Just grab a small one." },
        { note: "😬 A thin card will bend under a heavy cake, and a small box won't fit." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "stressed", say: "I'm making a tall, heavy 3-tier cake. I've got a 9\" board." },
        { who: "staff", face: "smile", say: "For a tall, heavy cake use a drum board. They're much thicker and sturdier." },
        { who: "staff", face: "smile", fx: "💡", say: "For the tiers, a perforated compressed board lets a central dowel pass through." },
        { who: "cust", face: "neutral", say: "And a box? You don't have a 9\"." },
        { who: "staff", face: "bigsmile", say: "No problem. Take the closest larger one, a 10\" box." },
        { who: "cust", face: "bigsmile", say: "Brilliant, you've saved my cake!" },
        { note: "✅ Right board, right box, happy baker." }
      ] }
    ],
    tips: ["Tall or heavy cake? Drum board.", "Perforated compressed board: a central dowel passes through multiple tiers.", "No matching box? Choose the closest LARGER size."] });

  add("cakedeco", { title: "The speckled buttercream", blurb: "Gel vs oil colouring, and what to recommend.", cust: BAKER,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "upset", say: "My buttercream looks speckled and won't hold the colour!" },
        { who: "staff", face: "bored", say: "Just add more colour." },
        { who: "cust", face: "angry", say: "I added loads. It's worse!" },
        { note: "😞 Water-based gel doesn't bind to butter fat. More colour won't fix it." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "upset", say: "My buttercream looks speckled and won't hold the colour!" },
        { who: "staff", face: "smile", fx: "🔍", say: "Are you using a water-based gel? That doesn't bind to butter fat." },
        { who: "cust", face: "surprised", say: "I think I am!" },
        { who: "staff", face: "bigsmile", say: "Try Colour Mill. It's oil-based, so it bonds with fats. It's great for chocolate too." },
        { who: "cust", face: "bigsmile", fx: "🎨", say: "That makes sense. I'll take it!" },
        { note: "✅ Diagnosed the cause and recommended the right product." }
      ] }
    ],
    tips: ["Buttercream or chocolate: oil-based Colour Mill. Water-based gel makes chocolate seize.", "3D figures: modelling paste (gum paste), not fondant.", "Letters pressed IN = embosser. Raised = debosser."] });

  add("party", { title: "Sell the whole party", blurb: "Matching add-ons, centrepieces and what to do when you're out.", cust: DAD,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { who: "cust", face: "bigsmile", say: "I'm getting these Spiderman balloons for my son!" },
        { who: "staff", face: "bored", say: "That's $12." },
        { who: "cust", face: "neutral", say: "Do you have the matching plates?" },
        { who: "staff", face: "bored", say: "No." },
        { note: "😕 A theme shopper walks out with only balloons, and goes elsewhere for the rest." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "bigsmile", say: "I'm getting these Spiderman balloons for my son!" },
        { who: "staff", face: "bigsmile", fx: "🕷️", say: "How fun! We have Spiderman party and cake supplies too. Are you doing a matching party?" },
        { who: "cust", face: "smile", say: "Yes! Do you have a banner?" },
        { who: "staff", face: "smile", say: "Yes! And centrepieces go perfectly with a banner. A number balloon bouquet is a popular one." },
        { who: "cust", face: "neutral", say: "Do you have these exact plates?" },
        { who: "staff", face: "smile", say: "Not that exact one, but let me show you some matching alternatives." },
        { note: "✅ Whole party sold, and an alternative offered instead of a flat “no”." }
      ] }
    ],
    tips: ["Theme shoppers plan whole events. Ask about a matching party.", "Banner ➜ centrepieces. Number balloon bouquets are popular.", "Don't know? Say you'll check, or ask the working manager."] });

  add("day", { title: "Closing the shop safely", blurb: "The helium tank, the machine and the next-day plan.", cust: MGR,
    parts: [
      { label: "The unsafe way", mood: "bad", beats: [
        { note: "Closing time. The manager is checking in." },
        { who: "cust", face: "neutral", say: "Tank off? What about the gas in the line?" },
        { who: "staff", face: "bigsmile", say: "Yep, and I let the leftover gas out of the line to be safe." },
        { who: "cust", face: "angry", fx: "💢", say: "No! Once the tank is closed, never purge the line!" },
        { note: "⚠️ Letting gas out is only for a tank change. At close, leave the residual line pressure as it is." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { who: "cust", face: "neutral", say: "Walk me through closing." },
        { who: "staff", face: "smile", say: "Main valve on the helium tank completely off, then power down the balloon machine. I leave the line pressure alone." },
        { who: "staff", face: "smile", say: "Then I wipe down and sanitise the machine, and clean and refill the Hi-Float bottle." },
        { who: "cust", face: "smile", say: "Busy day tomorrow?" },
        { who: "staff", face: "bigsmile", fx: "✨", say: "Yes! I'll pre-inflate foils only tonight, since they hold gas much longer than latex." },
        { who: "cust", face: "bigsmile", say: "Spot on. And it's Tuesday, so the big bins go to the curb." },
        { note: "✅ Safe, clean and ready for tomorrow." }
      ] }
    ],
    tips: ["Close the tank, power down the machine, and NEVER purge the line at closing.", "Pre-inflate FOILS only the night before.", "Balloon order due at 12:00? Start inflating at 10:30 (90 minutes before)."] });

  add("difficult", { title: "The upset customer", blurb: "Listen, say sorry it happened, and lead with what you CAN do.", cust: ANGRY,
    parts: [
      { label: "The wrong way", mood: "bad", beats: [
        { note: "A customer storms in. The Frozen plates she wanted are sold out." },
        { who: "cust", face: "angry", fx: "💢", say: "This is ridiculous! You told me you'd have the Frozen plates!" },
        { who: "staff", face: "bored", say: "No, we don't have that." },
        { who: "cust", face: "angry", say: "That's it?! Useless!" },
        { who: "staff", face: "angry", say: "It's not my fault." },
        { note: "😡 It escalates. She leaves furious and tells her friends." }
      ] },
      { label: "The Party Mix way", mood: "good", beats: [
        { note: "Same customer. Same out-of-stock plates." },
        { who: "cust", face: "angry", fx: "💢", say: "This is ridiculous! You told me you'd have the Frozen plates!" },
        { who: "staff", face: "smile", fx: "👂", say: "I'm really sorry about that. Let me hear what happened." },
        { who: "cust", face: "upset", say: "I came all this way for them!" },
        { who: "staff", face: "smile", say: "We're out of those right now, but I can show you what we have. There are some great matching options." },
        { who: "cust", face: "relieved", say: "Okay... show me." },
        { who: "staff", face: "bigsmile", say: "And if you'd like, I can check whether we can order them in." },
        { note: "✅ Listen, apologise, lead with what you CAN do. And if she became abusive, you'd bring in the working manager." }
      ] }
    ],
    tips: ["Listen first. Then say sorry it happened and see what you can do.", "Replace “No, we don't have that” with “We're out of that right now, but I can show you what we have.”", "Bring in the working manager for exceptions, money matters, unsure situations or abuse."] });
})();
