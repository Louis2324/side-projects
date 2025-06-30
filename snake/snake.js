const blockSize = 20;
const rows = 20;
const cols = 20;
let board, context;
let scoreScreen = document.getElementById("scoreScreen");
let score = 0;

const memes = [
    // Memes
    "I don’t chase love, I attract success. 💼💰",
    "Who needs a Valentine when you have pizza? 🍕💖",
    "No Valentine? No problem—just you, yourself, and snacks. 🍪🥤",
    "You're not single, you're in a committed relationship with freedom and food. 🕺🍟",
    "Roses are red, chocolates are sweet, my love for snacks can't be beat! 🍫❤️",
    "Valentine’s Day? More like ‘National Buy Yourself Chocolate’ Day. 🍩🙌",
    "Love is temporary, but WiFi and good food? That’s forever. 📶🍕",
    "Being single on Valentine’s Day means no awkward moments... just you and your comfy blanket. 🛋️💤",
    "You’re not single, you're in a relationship with freedom and snacks. 🍪🥤",
    "Who needs Cupid when you have chocolate? 🍫💘",
    "Valentine's Day is overrated... but snacks are not. 🍩🙌",
    // Single Memes
    "I don’t chase love, I attract success. 💼💰",
    "Single? More like self-partnered with snacks. 🥳🍕",
    "I put my heart in a `<form>`, but it returned a 404: Valentine Not Found. 😢💘",
    "I’m just here for the half-off candy. 🍬💖",
    "Your Valentine’s Day plans? Mine is calling Domino’s for pizza. 🍕😜",
    "Who needs a Valentine when you’ve got your couch and Netflix? 📺❤️",
    "Roses are red, violets are blue, I’m single and fabulous, how about you? 🌹💁‍♂️",
    "Valentine’s Day? More like National Treat Yourself Day! 🎉",
    "No Valentine, no problem—just you and your snacks! 🍫🍿",
    "You're not single, you're in a relationship with freedom and snacks. 🕺🍪",
    "Being single on Valentine's Day means no awkward moments... just you and your comfy blanket. 🛋️💤",

    // Valentine's Memes
    "I don’t chase love, I attract success. 💼💰",
    "I’m in a committed relationship with my bed. 🛏️💖",
    "Who needs love when you have fries? 🍟💘",
    "My Valentine? My bed. 🛏️💘",
    "Love is overrated; pizza never lets me down. 🍕😎",
    "Who needs love when you have WiFi? 📶💘",
    "Roses are red, chocolates are sweet, my love for snacks can't be beat! 🍬❤️",
    "I’m single because I don’t want to share my fries. 🍟💀",
    "Just me, myself, and my pizza tonight. 🍕💖",
    "My Valentine’s is a glass of wine and a pizza. 🍕🍷",
    "When they say ‘couples goals’ but you’re just chilling with your snacks. 🍫🍪",

    // Spicy Memes
    "I don’t need a Valentine. I'm too cool for that nonsense. 🦸‍♂️😎",
    "My Valentine’s is my own success. 💼💪",
    "Who needs love when you’ve got ambition and silence? 😏🚶‍♂️",
    "My life: Independent, strong, and single. 💪🔒",
    "I don't need a Valentine, I need a quiet room and a good book. 📚😌",
    "Being single on Valentine’s Day? We  don’t follow traditions. 🦸‍♂️⚡",
    "I don’t chase love, I attract success. 💼💰",
    "Love? Nah, I’ve got goals. 🏆🚀",
    "My only relationship is with my goals. 🏅🎯",
    "Sigma males don’t need a Valentine, they’ve already mastered self-love. 💪💙"
];
const theBibleverses= [
    "For God so loved the world, that He gave His only Son, that whoever believes in Him should not perish but have eternal life. – John 3:16 ✝️❤️",
    "We love because He first loved us. – 1 John 4:19 ✝️💖",
    "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in His love He will no longer rebuke you, but will rejoice over you with singing. – Zephaniah 3:17 ✝️🎶",
    "But God demonstrates His own love for us in this: While we were still sinners, Christ died for us. – Romans 5:8 ✝️💕",
    "The Lord is compassionate and gracious, slow to anger, abounding in love. – Psalm 103:8 ✝️🙏",
    "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord. – Romans 8:38-39 ✝️💫",
    "Give thanks to the Lord, for He is good; His love endures forever. – 1 Chronicles 16:34 ✝️🙌",
    "The steadfast love of the Lord never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness. – Lamentations 3:22-23 ✝️🌅",
    "And we have come to know and to believe the love that God has for us. God is love, and he who abides in love abides in God, and God in him. – 1 John 4:16 ✝️💞",
    "For Your love is better than life; my lips will glorify You. – Psalm 63:3 ✝️🙏",
    "As the Father has loved Me, so have I loved you. Now remain in My love. – John 15:9 ✝️💖",
    "For the mountains may depart and the hills be removed, but My steadfast love shall not depart from you, and My covenant of peace shall not be removed,” says the Lord, who has compassion on you. – Isaiah 54:10 ✝️🏔️",
    "Know therefore that the Lord your God is God, the faithful God who keeps covenant and steadfast love with those who love Him and keep His commandments, to a thousand generations. – Deuteronomy 7:9 ✝️📜",
    "I have loved you with an everlasting love; therefore I have continued my faithfulness to you. – Jeremiah 31:3 ✝️💫",
    "But the Lord is faithful, and He will strengthen and protect you from the evil one. – 2 Thessalonians 3:3 ✝️🛡️",
    "The Lord appeared to us in the past, saying: ‘I have loved you with an everlasting love; I have drawn you with unfailing kindness.’ – Jeremiah 31:3 ✝️💖",
    "You are my hiding place; You will protect me from trouble and surround me with songs of deliverance. – Psalm 32:7 ✝️🎶",
    "Whoever does not know love does not know God, because God is love. – 1 John 4:8 ✝️💞",
    "The Lord is near to all who call on Him, to all who call on Him in truth. – Psalm 145:18 ✝️🙏",
    "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. – Jeremiah 29:11 ✝️🌟",
    "My flesh and my heart may fail, but God is the strength of my heart and my portion forever. – Psalm 73:26 ✝️💪",
    "The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all. – 2 Corinthians 13:14 ✝️🙌",
    "But the Lord God is with us, and we are His people. He will never leave us nor forsake us. – Deuteronomy 31:6 ✝️🛡️",
    "Jesus Christ is the same yesterday and today and forever. – Hebrews 13:8 ✝️⏳",
    "For God is not unjust to forget your work and the love which you have shown toward His name. – Hebrews 6:10 ✝️💖",
    "I will love you, O Lord, my strength. – Psalm 18:1 ✝️💪",
    "I will bless the Lord who guides me; even at night my heart instructs me. – Psalm 16:7 ✝️🌙",
    "The Lord will fight for you; you need only to be still. – Exodus 14:14 ✝️🛡️",
    "I am with you always, to the end of the age. – Matthew 28:20 ✝️🌍",
    "Love the Lord your God with all your heart and with all your soul and with all your mind. – Matthew 22:37 ✝️💞",
    "And now these three remain: faith, hope, and love. But the greatest of these is love. – 1 Corinthians 13:13 ✝️💖",
    "But God, being rich in mercy, because of the great love with which He loved us, even when we were dead in our trespasses, made us alive together with Christ—by grace you have been saved. – Ephesians 2:4-5 ✝️🙏",
    "And He said to him, ‘You shall love the Lord your God with all your heart and with all your soul and with all your mind.’ – Matthew 22:37 ✝️💖",
    "For God is love. – 1 John 4:16 ✝️💞",
    "Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God. – 1 John 4:7 ✝️💖",
    "Above all, keep loving one another earnestly, since love covers a multitude of sins. – 1 Peter 4:8 ✝️💕",
    "Let all that you do be done in love. – 1 Corinthians 16:14 ✝️💖",
    "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another. – John 13:34 ✝️💞",
    "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful; it does not rejoice at wrongdoing, but rejoices with the truth. – 1 Corinthians 13:4-6 ✝️💖",
    "Greater love has no one than this, that someone lay down his life for his friends. – John 15:13 ✝️💕",
    "I don’t chase love, I attract success. 💼💰",
    "For God so loved the world, that He gave His only Son, that whoever believes in Him should not perish but have eternal life. – John 3:16 ✝️❤️",
    "We love because He first loved us. – 1 John 4:19 ✝️💖",
    "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in His love He will no longer rebuke you, but will rejoice over you with singing. – Zephaniah 3:17 ✝️🎶",
    "But God demonstrates His own love for us in this: While we were still sinners, Christ died for us. – Romans 5:8 ✝️💕",
    "The Lord is compassionate and gracious, slow to anger, abounding in love. – Psalm 103:8 ✝️🙏",
    "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord. – Romans 8:38-39 ✝️💫",
    "Give thanks to the Lord, for He is good; His love endures forever. – 1 Chronicles 16:34 ✝️🙌",
    "The steadfast love of the Lord never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness. – Lamentations 3:22-23 ✝️🌅",
    "And we have come to know and to believe the love that God has for us. God is love, and he who abides in love abides in God, and God in him. – 1 John 4:16 ✝️💞",
    "For Your love is better than life; my lips will glorify You. – Psalm 63:3 ✝️🙏"
];


let snakeY = blockSize * 5;
let snakeX = blockSize * 5;
let snakeBody = [];

let foodX, foodY;

let velocityX = 0;
let velocityY = 0;

let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    board.style.border = "4px solid #ff2343";
    board.style.backgroundColor = "#ffe4e1";

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100);
};
let messageShown = false;

function update() {
    if (gameOver ) {
        
        context.fillStyle = "#ff2343";
        context.font = "40px 'Pacifico', cursive";
        context.textAlign = "center";
        context.fillText("Game Over", board.width/2 , board.height/2 );
      
        if(!messageShown){
            setTimeout(()=>{
                valentines();
            },1500);
        }     
        return;
    }

    context.fillStyle = "#FFE4E1";
    context.fillRect(0, 0, board.width, board.height);

    drawHeart(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2);


    const distance = Math.sqrt(Math.pow(snakeX - foodX, 2) + Math.pow(snakeY - foodY, 2));
    if (distance < blockSize) {  
        snakeBody.push([foodX, foodY]);
        score += 1;
        scoreScreen.value = `${score} 💓`;
        placeFood();
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillStyle = "#32CD32";
    context.beginPath();
    context.arc(snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillStyle =  "#228B22" ;
        context.beginPath();
        context.arc(snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
        context.fill();
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * (cols-1)) * (blockSize);
    foodY = Math.floor(Math.random() * (rows-1)) * (blockSize);
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function drawHeart(x, y, size) {
    context.fillStyle = "#FF1493"; 
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x - size, y - size / 2, x - size * 2, y + size / 2, x, y + size * 2);
    context.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size / 2, x, y);
    context.fill();
}

const vcontainer = document.getElementById("vcontainer");
const vmessage = document.getElementById("vmessage");



function shuffleArrays(array1,array2){
    const combi = [...array1,...array2];
    for (let i = combinedArray.length -1; i>0 ; i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = combi [i];
        combi[i] = combi [j]
        combi[j] = temp;
    }
    return combi;
}

let valentineMessages = [...theBibleverses,...memes];
function valentines(){
    const head = document.querySelector(".head");
    const board = document.getElementById("board");
    head.classList.add("hidden");
    board.classList.add("hidden");
    vcontainer.classList.remove("hidden");
    vmessage.innerHTML = `<b>${valentineMessages[Math.floor(Math.random()*valentineMessages.length)]}</b>`;
    messageShown = true;
    
}

const restartBtn = document.querySelector("#vcontainer button");
    restartBtn.addEventListener("click",function(){
        window.location.reload(true);
    })