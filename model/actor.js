var Sequelize = require('sequelize')

const Actor = global.sequelize.define('actor', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	gender: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	constellation: {
		type: Sequelize.STRING,
		allowNull: true		
	},
	born_date: {
		type: Sequelize.DATE,
		allowNull: true
	},
	born_regoin: {
		type: Sequelize.STRING,
		allowNull: true
	},
	career: {
		type: Sequelize.STRING,
		allowNull: true
	},
	resume: {
		type: Sequelize.STRING,
		allowNull: true		
	},
	alias: {
		type: Sequelize.STRING,
		allowNull: true
	},
	thumb: {
		type: Sequelize.STRING,
		allowNull: true
	},
	imgs: {
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

module.exports = Actor