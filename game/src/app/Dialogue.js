export const display = {
  level1: {
      audio_prefix: "/audio/dialogue/level1/",
      device_prefix: "/image/device/",
      instructions: [
        "You will work as a clerk in an Electronics Store.",
        "Your job is to give each client the device they are looking for.",
        "Use the hints they give you to guess the device.",
        "When you are sure of the correct device, drag it to the selection area.",
        "If the selection is correct you will get points!",
        "Collect the highest amount of points you can before the time runs out."
      ],
      dialogue: [
        {
          text: "I need something to call my parents.",
          answer: "phone",
          image: "phone.png",
          audio_female: ["level1_text1_female1.mp3", "level1_text1_female2.mp3"],
          audio_male: ["level1_text1_male1.mp3"]
        },
        {
          text: "I want a big screen to watch movies.",
          answer: "television",
          image: "television.png",
          audio_female: ["level1_text2_female1.mp3", "level1_text2_female2.mp3"],
          audio_male: ["level1_text2_male1.mp3"]
        },
        {
          text: "I need something to do my homework.",
          answer: "laptop",
          image: "laptop.png",
          audio_female: ["level1_text3_female1.mp3", "level1_text3_female2.mp3"],
          audio_male: ["level1_text3_male1.mp3"]
        },
        {
          text: "I want to listen to music.",
          answer: "headphones",
          image: "headphones.png",
          audio_female: ["level1_text4_female1.mp3", "level1_text4_female2.mp3"],
          audio_male: ["level1_text4_male1.mp3"]
        },
        {
          text: "I need a small device to take photos.",
          answer: "camera",
          image: "camera.png",
          audio_female: ["level1_text5_female1.mp3", "level1_text5_female2.mp3"],
          audio_male: ["level1_text5_male1.mp3"]
        },
        {
          text: "I want to play video games at home.",
          answer: "console",
          image: "console.png",
          audio_female: ["level1_text6_female1.mp3", "level1_text6_female2.mp3"],
          audio_male: ["level1_text6_male1.mp3"]
        },
        {
          text: "I need a big screen to read books.",
          answer: "tablet",
          image: "tablet.png",
          audio_female: ["level1_text7_female1.mp3", "level1_text7_female2.mp3"],
          audio_male: ["level1_text7_male1.mp3"]
        },
        {
          text: "I need something to write on my computer.",
          answer: "keyboard",
          image: "keyboard.png",
          audio_female: ["level1_text8_female1.mp3", "level1_text8_female2.mp3"],
          audio_male: ["level1_text8_male1.mp3"]
        },
        {
          text: "I want a computer I can take outside.",
          answer: "laptop",
          image: "laptop.png",
          audio_female: ["level1_text9_female1.mp3", "level1_text9_female2.mp3"],
          audio_male: ["level1_text9_male1.mp3"]
        },
        {
          text: "I need my friends to hear me online.",
          answer: "microphone",
          image: "microphone.png",
          audio_female: ["level1_text10_female1.mp3", "level1_text10_female2.mp3"],
          audio_male: ["level1_text10_male1.mp3"]
        },
      ]
  },
  level2: {
      audio_prefix: "/audio/dialogue/level2/",
      instructions: [
        "You will work as a clerk in an Electronics Store.",
        "Your job is to answer each client and help them with what they are looking for.",
        "There will be multiple answer options bouncing and moving throughout the screen.",
        "Use the hints they give you to select the correct answer by clicking it.",
        "If the selection is correct you will get points!",
        "Collect the highest amount of points you can before the time runs out."
      ],
      dialogue: [
        {
          text: "Hi, I need a yellow phone. I only want to call.",
          answer: "We only have green phones here.",
          answer_audio: ["level2_answer1_male.mp3","level2_answer1_female.mp3"],
          audio_female: ["level2_text1_female1.mp3", "level2_text1_female2.mp3"],
          audio_male: ["level2_text1_male1.mp3"]
        },
        {
          text: "Hello, I want a tablet for games. Not too expensive.",
          answer: "This one is good for only 50 dollars!",
          answer_audio: ["level2_answer2_male.mp3","level2_answer2_female.mp3"],
          audio_female: ["level2_text2_female1.mp3", "level2_text2_female2.mp3"],
          audio_male: ["level2_text2_male1.mp3"]
        },
        {
          text: "I need a laptop for school.",
          answer: "This one is fast and good for your studies.",
          answer_audio: ["level2_answer3_male.mp3","level2_answer3_female.mp3"],
          audio_female: ["level2_text3_female1.mp3", "level2_text3_female2.mp3"],
          audio_male: ["level2_text3_male1.mp3"]
        },
        {
          text: "Hi, I want headphones.",
          answer: "These are good for loud music.",
          answer_audio: ["level2_answer4_male.mp3","level2_answer4_female.mp3"],
          audio_female: ["level2_text4_female1.mp3", "level2_text4_female2.mp3"],
          audio_male: ["level2_text4_male1.mp3"]
        },
        {
          text: "I need a really expensive computer for games.",
          answer: "Yes, a million dollars please!",
          answer_audio: ["level2_answer5_male.mp3","level2_answer5_female.mp3"],
          audio_female: ["level2_text5_female1.mp3", "level2_text5_female2.mp3"],
          audio_male: ["level2_text5_male1.mp3"]
        },
      ]
  },
  level3: {
      instructions: [
        "You will work as a clerk in an Electronics Store, but this time virtually.",
        "Your job is to answer each client and help them with what they are looking for.",
        "This time, the clients will only communicate using emojis.",
        "Use the hints they give you to guess what they are talking about and respond correctly.",
        "You will need to select only the correct answer fragments in order to make your answer.",
        "Each client will need a question to verify their needs and an answer to help them.",
        "If both selections are correct you will get points!",
        "Collect the highest amount of points you can before the time runs out."
      ],
      dialogue: [
        {
            text: "😊📱💬❓",
            question: "Do you want a phone for messages?",
            answer: "This phone is good for messages."
        },
        {
            text: "😊🎮💻❓",
            question: "Do you like video games?",
            answer: "This computer is good for games."
        },
        {
            text: "😊📚📱🌙❓",
            question: "Do you want to read at night?",
            answer: "This tablet is good for reading."
        },
        {
            text: "😊🎧🎵🔊❓",
            question: "Do you like music?",
            answer: "These headphones are good for music."
        },
        {
            text: "😊📺🍿❓",
            question: "Do you like watching movies?",
            answer: "This TV is good for movies."
        }
      ]
  },
  level4: {
    audio_prefix: "/audio/dialogue/level4/",
    device_prefix: "/image/device/",
    instructions: [
      "You will work as a clerk in an Electronics Store.",
      "Your job is to explain to each client what the devices are for.",
      "The clients will show you an image of the device they are interested in.",
      "Answer them with the correct use of the device using the options that appear on the screen.",
      "Multiple options can be valid, drag them to the selection area if you think that's correct.",
      "If the selection is correct you will get points!",
      "If all the valid answers are selected then you will get even more points!",
      "Collect the highest amount of points you can before the time runs out."
    ],
    dialogue: [
      {
        device: "phone",
        image: "phone.png",
        options: [
          "You can call people",
          "You can send messages"
        ],
        answer_audio: ["level4_answer1-1_male.mp3","level4_answer1-1_female.mp3", "level4_answer1-2_male.mp3", "level5_answer1-2_female.mp3"],
      },
      {
        device: "laptop",
        image: "laptop.png",
        options: [
          "You can do homework",
          "You can use the internet"
        ],
        answer_audio: ["level4_answer2-1_male.mp3","level4_answer2-1_female.mp3", "level4_answer2-2_male.mp3", "level5_answer2-2_female.mp3"],
      },
      {
        device: "console",
        image: "console.png",
        options: [
          "You can play video games",
          "You can play with friends"
        ],
        answer_audio: ["level4_answer3-1_male.mp3","level4_answer3-1_female.mp3", "level4_answer3-2_male.mp3", "level5_answer3-2_female.mp3"],
      },
      {
        device: "headphones",
        image: "headphones.png",
        options: [
          "You can listen to music"
        ],
        answer_audio: ["level4_answer4-1_male.mp3","level4_answer4-1_female.mp3"],
      },
      {
        device: "tablet",
        image: "tablet.png",
        options: [
          "You can read books",
          "You can watch videos",
          "You can play games"
        ],
        answer_audio: ["level4_answer5-1_male.mp3","level4_answer5-1_female.mp3", "level4_answer5-2_male.mp3", "level5_answer5-2_female.mp3",
          "level4_answer5-3_male.mp3", "level5_answer5-3_female.mp3"
        ],
      }
    ]
  },
  all_levels: {
    customer_prefix: "/image/customers/",
    device_prefix: "/image/devices/",
    feedback_prefix: "/audio/dialogue/all_levels/feedback/",
    male_customers: ["man1.png", "man2.png", "man3.png"],
    female_customers: ["woman1.png", "woman2.png", "woman3.png"],
    devices: ["phone.png", "camera.png", "console.png", "headphones.png", "keyboard.png", "laptop.png", "microphone.png", "tablet.png", "television.png"],
    male_correct: ["correct_male1_variant1.mp3", "correct_male1_variant2.mp3"],
    male_incorrect: ["incorrect_male1_variant1.mp3", "incorrect_male1_variant2.mp3"],
    female1_correct: ["correct_female1_variant1.mp3", "correct_female1_variant2.mp3"],
    female1_incorrect: ["incorrect_female1_variant1.mp3", "incorrect_female1_variant2.mp3"],
    female2_correct: ["correct_female2_variant1.mp3", "correct_female2_variant2.mp3"],
    female2_incorrect: ["incorrect_female2_variant1.mp3", "incorrect_female2_variant2.mp3"],
    
  }
}