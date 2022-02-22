import express from 'express';
import ReactDOM from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate';
import axios from 'axios';

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
   res.send(
    indexTemplate(ReactDOM.renderToString(App())),
   );
});

app.get('/auth', (req, res) => {
   console.log('auth code', req.query.code);
   axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
         auth: { username: process.env.CLIENT_ID, password: process.env.CLIENT_PWD },
         headers: { 'Content-type': 'application/x-www-form-urlencoded'}
      }
   )
   .then(({data}) => {
      res.send(
         indexTemplate(ReactDOM.renderToString(App()), data['access_token']),
      )
   })
   .catch(console.log);
});


app.get('/posts', (req, res) => {
   var posts = [
      {
         "content":{
			"displayName": "Дмитрий Гришин",
			"postedTimeAgo": "4 часа назад",
			"title": "Следует отметить, что новая модель организационной деятельности Следует отметить, что новая модель организационной деятельности",
			"imgLink": "https://images.unsplash.com/profile-fb-1527368999-01bec71421e9.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
		 },
         "preview":{
			"imgSrc": "https://pfps.gg/assets/pfps/4023-cute-fox.png",
		 },
		 "controls":{
			"karmaValue": "234",
			"commentsNumber": "13",
		 }
      },
	  {
         "content":{
			"displayName": "Константин Кодов",
			"postedTimeAgo": "8 часов назад",
			"title": "Для современного мира дальнейшее развитие всех...",
			"imgLink": "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=",
		 },
         "preview":{
			"imgSrc": "https://images.unsplash.com/profile-fb-1546107881-cc9d64a24804.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
		 },
		 "controls":{
			"karmaValue": "34",
			"commentsNumber": "14",
		 }
      },
	  {
         "content":{
			"displayName": "Виктор Пылёв",
			"postedTimeAgo": "19 мая 2020",
			"title": "Противоположная точка зрения на данную проблему",
			"imgLink": "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		 },
         "preview":{
			"imgSrc": "https://styles.redditmedia.com/t5_2sbq3/styles/communityIcon_pf6xg83rv3981.png",
		 },
		 "controls":{
			"karmaValue": "4",
			"commentsNumber": "15",
		 }
      },
	  
	  {
         "content":{
			"displayName": "Иван Иванов",
			"postedTimeAgo": "18 мая 2020",
			"title": "Не следует, однако, забывать, что современная...",
			"imgLink": "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=",
		 },
         "preview":{
			"imgSrc": "https://www.aviationweather.gov/cgi-bin/tilecache/tc.php?product=sat_ir&date=202202210000&x=5&y=9&z=4",
		 },
		 "controls":{
			"karmaValue": "0",
			"commentsNumber": "16",
		 }
      }
   ];
   res.send(posts);
});

app.listen(3000, () => {
console.log('Server started on http://localhost:3000');
});


