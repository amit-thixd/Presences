const presence = new Presence({
    clientId: "837754527217877003"
  }),
  timestamp = Math.floor(Date.now() / 1000);

function isArticle() {
  return window.location.pathname.includes("/news-articles/");
}

function isGame() {
  return window.location.pathname.includes("/game/");
}

function isProfile() {
  return window.location.pathname.includes("/people/");
}

let articleTitle: string,
  articleDate: string,
  gameTitle: string,
  profileTitle: string,
  profileStatus: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    showButtons: boolean = await presence.getSetting("buttons");

  switch (window.location.pathname) {
    case "/":
      presenceData.details = "Home";
      presenceData.startTimestamp = timestamp;
      break;
    case "/games":
      presenceData.details = "Games";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        { label: "View Games", url: "https://www.dice.se/games" }
      ];
      break;
    case "/life-at-dice":
      presenceData.details = "Life At Dice";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        { label: "Life At Dice", url: "https://www.dice.se/life-at-dice" }
      ];
      break;
    case "/our-values":
      presenceData.details = "Our Values";
      presenceData.startTimestamp = timestamp;
      break;
    case "/how-we-work-how-we-play":
      presenceData.details = "How We Work";
      presenceData.state = "How We Play";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "How We Work",
          url: "https://www.dice.se/how-we-work-how-we-play"
        },
        {
          label: "How We Play",
          url: "https://www.dice.se/how-we-work-how-we-play#how-we-play"
        }
      ];
      break;
    case "/our-crafts":
      presenceData.details = "Our Crafts";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        { label: "Our Crafts", url: "https://www.dice.se/our-crafts" }
      ];
      break;
    case "/careers":
      presenceData.details = "Careers";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        { label: "View Careers", url: "https://www.dice.se/careers" }
      ];
      break;
    case "/perks-benefits":
      presenceData.details = "Perks & Benefits";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "View Perks & Benefits",
          url: "https://www.dice.se/perks-benefits"
        }
      ];
      break;
    case "/living-in-sweden":
      presenceData.details = "Living In Sweden";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "Living In Sweden",
          url: "https://www.dice.se/living-in-sweden"
        }
      ];
      break;
    case "/latest":
      presenceData.details = "Latest News";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "Latest News",
          url: "https://www.dice.se/latest"
        }
      ];
      break;
    case "/news-article":
      presenceData.details = "News";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "News",
          url: "https://www.dice.se/news-articles"
        }
      ];
      break;
    case "/contact":
      presenceData.details = "Contacts";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "View Contacts",
          url: "https://www.dice.se/contact"
        }
      ];
      break;
    case "/students":
      presenceData.details = "Students";
      presenceData.startTimestamp = timestamp;
      presenceData.buttons = [
        {
          label: "Students",
          url: "https://www.dice.se/students"
        }
      ];
      break;
  }

  if (isArticle()) {
    articleTitle = document.querySelector(".BlogItem-title").textContent.trim();
    articleDate = document
      .querySelector(".BlogItem-meta > time")
      .textContent.trim();

    presenceData.details = articleTitle;
    presenceData.state = articleDate;

    delete presenceData.buttons;
    presenceData.buttons = [
      { label: "View Article", url: window.location.href }
    ];
  } else if (isGame()) {
    gameTitle = document.querySelector(".BlogItem-title").textContent.trim();

    presenceData.details = gameTitle;

    delete presenceData.buttons;
    presenceData.buttons = [
      { label: "View " + gameTitle, url: window.location.href }
    ];
  } else if (isProfile()) {
    profileTitle = document
      .querySelector(".BlogItem-title")
      ?.textContent.trim();
    profileStatus =
      document
        .querySelector(".sqs-row > div > div:nth-child(3) > div > p")
        .textContent.trim() ??
      document
        .querySelector(".sqs-row > div > div:nth-child(2) > div > p")
        .textContent.trim();

    presenceData.details = profileTitle;
    presenceData.state = profileStatus;

    delete presenceData.buttons;
    presenceData.buttons = [
      { label: "View " + profileTitle, url: window.location.href }
    ];
  }

  if (!showButtons && presenceData.buttons) {
    delete presenceData.buttons;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
