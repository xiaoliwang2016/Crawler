var Sequelize = require('sequelize')

const Image = global.sequelize.define('image', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
		autoIncrement: true
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [2, 255],
				msg: '长度必须在2-255位'
			}
		}
	},
	local_url: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [2, 255],
				msg: '长度必须在2-255位'
			}
		}
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

module.exports = Image