const quotes = [
    {
      quote: "작은 습관이 인생을 바꾼다. 오늘부터 시작하라.",
      author: "김꾸준 🌱",
    },
    {
      quote: "성공은 하루아침에 이루어지지 않는다. 매일의 노력이 모여 이루어진다.",
      author: "이노력 💪",
    },
    {
      quote: "한 걸음 한 걸음이 멀리 가는 길을 만든다.",
      author: "박실천 🚶",
    },
    {
      quote: "꾸준함은 재능을 이긴다. 포기하지 않는 자가 승리한다.",
      author: "최꾸준 🏆",
    },
    {
      quote: "오늘의 작은 노력이 내일의 큰 성공을 만든다.",
      author: "정성공 🌟",
    },
    {
      quote: "1%의 개선을 매일 반복하면 1년 후에는 37배의 성장을 이룬다.",
      author: "김복리 📈",
    },
    {
      quote: "실패는 성공의 어머니, 포기는 실패의 아버지다.",
      author: "이성공 👩‍👦",
    },
    {
      quote: "목표를 이루려면 먼저 시작해야 한다. 시작이 반이다.",
      author: "박시작 🏁",
    },
    {
      quote: "어제보다 나은 오늘, 오늘보다 나은 내일을 위해 노력하라.",
      author: "최성장 🌄",
    },
    {
      quote: "성공은 준비와 기회가 만나는 지점에서 탄생한다.",
      author: "정준비 🎯",
    },
  ];
  
  const quoteContainer = document.querySelector("#quote");

  function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
   
    quote.innerText = `"${randomQuote.quote}"`;
    author.innerText = `- ${randomQuote.author}`;
  }

  displayRandomQuote();

  setInterval(displayRandomQuote, 10000);