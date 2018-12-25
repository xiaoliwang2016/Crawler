const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

var config = require('./db/config')
var Sequelize = require('sequelize')

global.sequelize = new Sequelize(config.database, config.username, config.password,{
	host: 'localhost',
	dialect: 'mysql',
	pool: {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000
	},
})

const ActorModel = require('./model/actor.js')
const FilmModel = require('./model/film.js')
const ImageModel = require('./model/image.js')

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.')
}).catch(err => {
	console.error('Unable to connect to the database:', err);
})

request('https://movie.douban.com/subject/26425063/?tag=%E7%83%AD%E9%97%A8&from=gaia_video', function(err, response, body){
	if(!err && response.statusCode == 200){
		//影片数据
		var film = parseFilmPage(response.body)
		console.log(film);
		return
		// 先解析图片途径，下载图片到本地
		var imgArr = []
		imgArr.push(film.thumb)
		Promise.all(downloadImage(imgArr)).then(result => {
			var ids = []
			result.forEach(item => {
				ids.push(item.dataValues.id)
			})
			film.thumb = ids.join(',')
		})
	}
})

//下载图片到本地 保存数据库
function downloadImage(urls){
	var promiseArr = []
	urls.forEach(url => {
		promiseArr.push(new Promise((resolve,reject) => {
			request(url).pipe(fs.createWriteStream(`./download/image/${url.slice(url.lastIndexOf('/') + 1)}`))
			var data = {
				url,
				local_url: `download/image/${url.slice(url.lastIndexOf('/') + 1)}`
			}
			ImageModel.create(data).then(result => {
				resolve(result)
			}).catch(err => {
				reject(err)
			})
		}))
	})
	return promiseArr
}

//解析电影页
function parseFilmPage(content){
	const $ = cheerio.load(content)

	var type = []
	for(let i = 0; i < $("#info span[property='v:genre']").length; i++) {
		type.push($($("#info span[property='v:genre']")[i]).html())
	}

	var obj = {
		title: $($("#wrapper #content h1 span")[0]).html(),
		thumb: $("#mainpic a img").attr('src'),
		score: $($("#interest_sectl .rating_num")[0]).html(),
		launch_date: $($("#info span[property='v:initialReleaseDate']")[0]).html().slice(0,10),
		type: type.join(',')
	}

	// return obj
}