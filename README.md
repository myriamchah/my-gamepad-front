# A RAWG.io copycat

Using [RAWG.io's API](https://api.rawg.io/docs), I am building an index of video games, for fun and practice, which is basically a copy of https://rawg.io.

**Built with**: React & NodeJS  
**Hosted on**: Netlify & Northflank &rarr; [Check it out!](https://my-gamepad-front.netlify.app/)

**What Features are available**

- Games' index with some filtering/sorting + infinite scroll
- Search
- Game show with info on the game, videos/screenshots, ratings...
- User management
- Index of games in user's collection

**What could be improved?**  
This project is for me to practice most on my front-end skills. Back-end features are therefore limited, also bc of limited data available through the API.

Feature-wise:

- saving and displaying reviews and comments
- enriching available options for filters
- adding actions behind all CTA
- allowing a user to create and manage several collections...

UX-wise:

- adding more and better quality instant feedback
- better errors handling
- better highlighting the logged in state on navbar
- fixing breadcrumb...

Performance-wise:

- some requests take too long (search, game show...)
