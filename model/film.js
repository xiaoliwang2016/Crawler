var Sequelize = require('sequelize')

const Film = global.sequelize.define('film', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [2, 255],
				msg: '长度必须在2-255位'
			}
		}
	},
	thumb: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	score: {
		type: Sequelize.INTEGER,
		allowNull: true		
	},
	launch_date: {
		type: Sequelize.DATE,
		allowNull: true
	},
	type: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [2, 50],
				msg: '长度必须在2-50位'
			}
		}
	},
	duration: {
		type: Sequelize.STRING,
		allowNull: true		
	},
	alias: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [2, 255],
				msg: '长度必须在2-255位'
			}
		}	
	},
	region: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [1, 100],
				msg: '长度必须在2-100位'
			}
		}	
	},
	language: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [1, 100],
				msg: '长度必须在2-100位'
			}
		}	
	},
	actor_id: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [1, 100],
				msg: '长度必须在2-100位'
			}
		}	
	},
	director_id: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: {
				args: [1, 20],
				msg: '长度必须在2-100位'
			}
		}			
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true
	}
},
{
	// 不添加时间戳属性 (updatedAt, createdAt)
	// timestamps: false,
	timeStamps: true,
	
	// 开启软删除，paranoid 只有在启用时间戳时才能工作
	paranoid: true,

  	// 我不想要 createdAt
  	createdAt: false,

	// updatedAt实际被命名为 update_time
	updatedAt: 'update_time',

	deletedAt: 'delete_time',

	// 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
	freezeTableName: true,
})

module.exports = Film