<div align="center"><img width="150" src="frontend/public/logo.png" /></div>
<h1 align="center">Threadunni</h1>
<p align="center">Open source web app and twitter bot that lets you read threads more easily and document them</p>
<div align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/mdb571/threadunni?style=flat-square">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fmdb571%2Fthreadunni&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
</div>
<h3 align="center">Made by <a href="https://github.com/mdb571">@mdb571⚡</a> & <a href="https://github.com/bmnidhin">@bmnidhin:rocket:</a></h3>

## Features
- Pull tagged threads from twitter using [twitter](https://developer.twitter.com/en/docs/twitter-api) API
- Read and Save threads as a blog post
- Download threads as a PDF
- Social Login Using Twitter

## Setup
### Frontend
- Install the required npm packages with `npm install`
- Start development server `yarn start` or `react-scripts start`
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Build with `yarn build`
  Builds the app for production to the `build` folder 
### Backend 
- Install the required python libraries `pip install -r requirements.txt`
- Run the bot with `python manage.py bot`
- run the server with `python manage.py runserver`
- Now you can start sending requests from the frontend to the backend API

[live demo](https://savethreads.vercel.app) 
## Screenshots
Homepage
<div>
  <img width="600" src="screenshots/home.png" alt="home" />
</div>
<br/>
Profile

<div>
  <img width="600" src="screenshots/login.png" alt="login" />
</div>
<br/>
Thread

<div>
  <img width="600" src="screenshots/thread.png" alt="thread" />
</div>
<br/>

Document (PDF)

<div>
  <img width="600" src="screenshots/pdf.png" alt="document" />
</div>
<br/>

Bot in action !

<div>
  <img width="600" src="screenshots/bot.png" alt="bot" />
</div>

## Contributing and Support

Feel free to open a pull request if you can help in improving this project.

## Credits

- [threadreaderapp](https://threadreaderapp.com)
- Nikhil Verma for his [article](https://lih-verma.medium.com/mining-really-long-twitter-messages-threads-569d42bc0e1c)
- tinkerhub [BFH](https://tinkerhub.org/bfh)

## Show your support

Give a ⭐️ if this project helped you!❤️

## Licence

Code released under the [GPL](LICENSE).
