const multi_word_replace = {
  "pick up": "pick_up",
  "put down": "put_down"
};

const single_word_replace = {
  h: "help",
  north: "n",
  south: "s",
  east: "e",
  west: "w",
  i: "inventory",
  inv: "inventory",
  l: "look",
  g: "get",
  d: "drop",
  u: "use",
  examine: "look",
  inspect: "look",
  take: "get",
  leave: "drop",
  pick_up: "get",
  put_down: "drop",
  fight: "attack",
  battle: "attack",
  hit: "attack",
  kill: "attack",
  walk: "go",
  travel: "go",
  speak: "say"
};

const ignore_words = ["the", "a", "an", "and"];

const actions = [
  "help",
  "inventory",
  "get",
  "drop",
  "look",
  "use",
  "attack",
  "give"
];

const prepositions = [
  "with",
  "using",
  "at",
  "toward",
  "to",
  "about",
  "beneath",
  "underneath",
  "under",
  "below",
  "above",
  "atop",
  "over",
  "on",
  "onto",
  "upon",
  "by",
  "in",
  "inside",
  "into",
  "up_to",
  "against",
  "from",
  "out_of"
];

const movement_adverbs = [
  "n",
  "s",
  "e",
  "w"
  // "up",
  // "down",
  // "in",
  // "out"
];

// Function to help interpret player commands
export default function parseCommand(command) {
  
  const error = (text = "generic error") => ({
    act: "",
    adv: "",
    dirObj: "",
    prep: "",
    indObj: "",
    error: text
  });

  // Edge case
  if (!command.length) return error("no input");

  // Check for speech actions
  let firstSplit = command.split(" ")
  firstSplit[0] = firstSplit[0].toLowerCase()
  if (["say", "shout"].includes(firstSplit[0])) {
    if (firstSplit.length === 1) return error();
    return {
      act: firstSplit[0],
      adv: "",
      dirObj: firstSplit.slice(1).join(" "),
      prep: "",
      indObj: "",
      error: ""
    };
  }

  if ("whisper" === firstSplit[0]) {
    if (firstSplit.length <= 3 || firstSplit[1].toLowerCase() !== "to") return error();
    return {
      act: firstSplit[0],
      adv: "",
      dirObj: firstSplit.slice(3).join(" "),
      prep: "to",
      indObj: firstSplit[2],
      error: ""
    };
  }

  command = command.toLowerCase()

  // Check input for any phrases to be simplified
  for (let key in multi_word_replace) {
    if (command.includes(key)) {
      command = command.replace(key, multi_word_replace[key]);
    }
  }

  // Split input into words
  command = command.split(" ");
  

  // Remove unnecessary words
  command = command.filter(el => !ignore_words.includes(el));

  // Check input for any words to replace with recognized commands
  command = command.map(el => {
    if (single_word_replace[el]) {
      el = single_word_replace[el];
    }
    return el;
  });

  // Declare return object
  const result = {
    act: "",
    adv: "",
    dirObj: "",
    prep: "",
    indObj: "",
    error: ""
  };

  // Check for movement shortcuts
  if (movement_adverbs.includes(command[0])) {
    if (command.length === 1) {
      return {
        act: "go",
        adv: command[0],
        dirObj: "",
        prep: "",
        indObj: "",
        error: ""
      };
    } else {
      return error();
    }
  }

  // Check for command "go" and synonyms
  if (["go", "walk", "travel"].includes(command[0])) {
    if (command.length === 2 && movement_adverbs.includes(command[1])) {
      return {
        act: command[0],
        adv: command[1],
        dirObj: "",
        prep: "",
        indObj: "",
        error: ""
      };
    }
  }

  // Check for action, set it and filter it out of the command
  if (actions.includes(command[0])) {
    result.act = command.shift();
  } else {
    return error("action not recognized");
  }

  // Check for preposition, define indirect object if one is found
  let prep, indObj;
  command.forEach((el, i) => {
    if (prepositions.includes(el)) {
      if (prep) {
        return error("too many prepositions");
      }
      prep = el;
      if (!command[i + 1]) {
        return error("dangling preposition (no indirect object)");
      } else {
        indObj = command[i + 1];
      }
    }
  });

  // Filter out preposition, indirect object
  if (prep) {
    command = command.filter(el => el !== prep);
    command = command.filter(el => el !== indObj);
  }

  // if anything is left, it's the direct object
  if (command.length > 1) {
    return error("too many words");
  }

  // Set items in result and return
  if (command[0]) {
    result.dirObj = command[0];
  }
  if (prep) {
    result.prep = prep;
  }
  if (indObj) {
    result.indObj = indObj;
  }

  return result;
}
