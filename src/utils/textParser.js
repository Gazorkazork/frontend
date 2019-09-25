const multi_word_replace = {
    "pick up": "pick_up",
    "put down": "put_down",
}

const single_word_replace = {
    "h": "help",
    "north": "n",
    "south": "s",
    "east": "e",
    "west": "w",
    "i": "inventory",
    "inv": "inventory",
    "l": "look",
    "g": "get",
    "d": "drop",
    "u": "use",
    "examine": "look",
    "inspect": "look",
    "take": "get",
    "leave": "drop",
    "pick_up": "get",
    "put_down": "drop",
    "fight": "attack",
    "battle": "attack",
    "hit": "attack",
    "kill": "attack",
    "walk": "go",
    "travel": "go",
    "speak": "say"
}

const ignore_words = [
    "the",
    "a",
    "an",
    "and"
]

const actions = [
    "help",
    "inventory",
    "get",
    "drop",
    "look",
    "use",
    "attack",
    "give",
    "say"
]

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
]

const movement_adverbs = [
    "north",
    "south",
    "east",
    "west",
    "up",
    "down",
    "in",
    "out",
]


// Function to help interpret player commands
export default function parse_command(command) {
    const error = (text="generic error") => (
        {
            "act": "",
            "adv": "",
            "dirObj": "",
            "prep": "",
            "indObj": "",
            "error": text
        }
    )
        
    // Edge case
    if (!command.length) return error("no input")

    // Check input for any phrases to be simplified
    multi_word_replace.forEach(el => {
        if (command.includes(el)) {
            command = command.replace(el, multi_word_replace.el)
        }
    })
        

    // Split input into words
    command = command.split(" ")

    // Remove unnecessary words
    command = command.filter(el => !ignore_words.includes(el))

    // Check input for any words to replace with recognized commands
    command = command.map(el => {
        if (single_word_replace.includes(el)){
            el = single_word_replace.el
        }
        return el
    })
        
   
    // Declare return object
    const result = {
        "act": "",
        "adv": "",
        "dirObj": "",
        "prep": "",
        "indObj": "",
        "error": ""
    }


    // Check for movement shortcuts
    if (command.length === 1 && movement_adverbs.includes(command[0])){
        return {
            "act": "go",
            "adv": command[0],
            "dirObj": "",
            "prep": "",
            "indObj": "",
            "error": ""
        }
    }

    // Check for command "go" and synonyms
    if (["go", "walk", "travel"].includes(command[0])) {
        if (command.length === 2 && movement_adverbs.includes(command[0])) {
            return {
                "act": command[0],
                "adv": command[1],
                "dirObj": "",
                "prep": "",
                "indObj": "",
                "error": ""
            }
        }
    }
        
    // Check for action, set it and filter it out of the command
    if (actions.includes(command[0])) {
        result["act"] = command.pop(0)
    } else {
        return error("action not recognized")
    }

    // Check for preposition, define indirect object if one is found
    let prep, indObj
    command.forEach((el, i) => {
        if (prepositions.includes(el)) {
            if (prep) {
                return error("too many prepositions")
            }
            prep = el
            if (!command[i + 1]) {
                return error("dangling preposition (no indirect object)")
            } else {
                indObj = command[i + 1]
            }
        }
    })
        
    // Filter out preposition, indirect object
    if (prep) {
        command = command.filter(el => el !== prep)
        command = command.filter(el => el !== indObj)
    }
        
    
    // if anything is left, it's the direct object
    if (command.length > 1) {
        return error("too many words")
    }
    
    // Set items in result and return
    if (result.dirObj) {
        result.dirObj = command[0]
    }
    if (prep) {
        result.prep = prep
    }
    if (indObj) {
        result.indObj = indObj
    }
    
    return result
}