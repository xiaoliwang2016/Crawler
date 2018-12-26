const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const Entities = require('html-entities').XmlEntities
entities = new Entities()

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
	logging: false,
})

const ActorModel = require('./model/actor.js')
const FilmModel = require('./model/film.js')
const ImageModel = require('./model/image.js')

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.')
}).catch(err => {
	console.error('Unable to connect to the database:', err);
})

const doubanApi = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0'

getListInfo()

//下载图片到本地 保存数据库
function downloadImage(url){
	return new Promise((resolve, reject) => {
		request(url).pipe(fs.createWriteStream(`./download/image/${url.slice(url.lastIndexOf('/') + 1)}`))
		var data = {
			url,
			local_url: `download/image/${url.slice(url.lastIndexOf('/') + 1)}`
		}
		ImageModel.create(data).then(result => {
			resolve(result.dataValues.id)
		})
	})
}

var curpage = 0
var pageTotal = 0

function getListInfo(){
	request(doubanApi,function(err, response, body){
		var list = JSON.parse(response.body)

	})
}

//分页获取
function getFilmByPage(filmArr){
	return new Promise((resolve, reject) => {
		Promise.all(getFilmInfo(filmArr)).then(ids => {
			resolve()
		})	
	})
}

//获取电影信息
function getFilmInfo(urls){
	var promiseArr = []
	urls.forEach(url => {
		promiseArr.push(new Promise((resolve, reject) => {
			request(url, function(err, response, body){
				if(!err && response.statusCode == 200){
					//影片数据
					parseFilmPage(response.body).then(data => {
						console.log(data);
						FilmModel.create(data).then(result => {
							console.log(`保存电影${result.dataValues.title}成功`);
							resolve(result.dataValues.id)
						})
					})
				}
			})			
		}))
	})
	return promiseArr
}

//解析电影页
function parseFilmPage(content){
	return new Promise((resolve, reject) => {
		const $ = cheerio.load(content)
		var actorUrl = []
		actorUrl.push('https://movie.douban.com' + $($("#info a[rel='v:directedBy']")[0]).attr('href'))
		for(let i = 0; i < $("#info a[rel='v:starring']").length; i++){
			actorUrl.push('https://movie.douban.com' + $($("#info a[rel='v:starring']")[i]).attr('href') )
		}
		Promise.all(getAcrotInfo(actorUrl)).then(actorIds => {
			var type = []
			for(let i = 0; i < $("#info span[property='v:genre']").length; i++) {
				type.push($($("#info span[property='v:genre']")[i]).html())
			}
			var obj = {
				title: entities.decode($($("#wrapper #content h1 span")[0]).html()),
				thumb: entities.decode($("#mainpic a img").attr('src')),
				score: entities.decode($($("#interest_sectl .rating_num")[0]).html()),
				launch_date: new Date($($("#info span[property='v:initialReleaseDate']")[0]).html().slice(0,10)),
				duration: entities.decode($($("#info span[property='v:runtime']")[0]).html()),
				type: entities.decode(type.join(' / ')),
				region: entities.decode($("#info").html()).match(/<span class="pl">制片国家\/地区:<\/span>(.*)<br>/)[1].trim(),
				alias: entities.decode($("#info").html()).match(/<span class="pl">又名:<\/span>(.*)<br>/)[1].trim(),
				language: entities.decode($("#info").html()).match(/<span class="pl">语言:<\/span>(.*)<br>/)[1].trim(),
				description: entities.decode($($("#link-report span[property='v:summary']")[0]).html().replace(/\s*/,'')),
				director_id: actorIds[0],
				actor_id: actorIds.slice(1).join(',')
			}

			downloadImage(obj.thumb).then(imgId => {
				obj.thumb = imgId
				resolve(obj)
			})	
		})
	})	
}

//获得评论信息
function getCommentary(url){
	return new Promise((resolve, reject) => {
		const $ = cheerio.load(content)
	})
}

//获取演员信息
function getAcrotInfo(urls){
	promiseArr = []
	urls.forEach(url => {
		promiseArr.push(new Promise((resolve, reject) => {
			request(url,function(err, response, body){
				if(!err && response.statusCode == 200){
					parseActorPage(response.body).then(data => {
						ActorModel.create(data).then(result => {
							resolve(result.dataValues.id)
						})
					})
				}
			})			
		}))
	})
	return promiseArr
}

//解析演员页
function parseActorPage(content){
	return new Promise((resolve, reject) => {
		const $ = cheerio.load(content)
		var obj = {
			name: $($("#wrapper #content h1")[0]).html(),
			gender: $($(".info ul li")[0]).text().trim().replace(/[\r\n]/g,'').match(/性别:\s*(.*)/),
			constellation: $($(".info ul li")[1]).text().trim().replace(/[\r\n]/g,'').match(/星座:\s*(.*)/),
			born_date: $($(".info ul li")[2]).text().trim().replace(/[\r\n]/g,'').match(/出生日期:\s*(.*)/),
			born_regoin: $($(".info ul li")[3]).text().trim().replace(/[\r\n]/g,'').match(/出生地:\s*(.*)/),
			career: $($(".info ul li")[4]).text().trim().replace(/[\r\n]/g,'').match(/职业:\s*(.*)/),
			alias: $($(".info ul li")[5]).text().trim().replace(/[\r\n]/g,'').match(/更多外文名:\s*(.*)/),
			resume: $("#intro .short").text().trim()
		}
		var info = {
			name: entities.decode(obj.name),
			gender: obj.gender ? entities.decode(obj.gender[1]) : '',
			constellation: obj.constellation ? entities.decode(obj.constellation[1]) : '',
			born_date: obj.born_date ? new Date(obj.born_date[1]) : null,
			born_regoin: obj.born_regoin ? entities.decode(obj.born_regoin[1]) : '',
			career: obj.career ? entities.decode(obj.career[1]) : '',
			alias: obj.alias ? entities.decode(obj.alias[1]) : '',
			resume: entities.decode(obj.resume)
		}


		var promiseArr = []
		var thumb = $($("#headline .nbg img")[0]).attr('src')
		promiseArr.push(downloadImage(thumb))
		var imgs = []
		for(let i = 0; i < $("#photos ul li").length; i++){
			imgs.push($($("#photos ul li")[i]).find('img').attr('src'))
		}
		imgs.forEach(img => {
			promiseArr.push(downloadImage(img))
		})
		Promise.all(promiseArr).then(imageIds => {
			info.thumb = imageIds[0]
			info.imgs = imageIds.slice(1).join(',')
			resolve(info)
		})
	})	
}