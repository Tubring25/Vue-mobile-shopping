var express = require('express');
var router = express.Router();
let conn = require('../db/db');
let util = require('../util/util');

/* GET users listing. */
router.get('/', function (req, res, next) {
	let sql = 'SELECT * FROM user';
	conn.query(sql, (err, result) => {
		if (err) {
			res.json({
				code: 1,
				msg: '查询用户失败'
			});
		} else {
			res.json({
				code: 0,
				data: result
			});
		}
	});
});

// 密码登录
router.post('/login', (req, res) => {
  let name = req.body.name;
  let password = req.body.password
	let sql = 'SELECT * from user WHERE name =? LIMIT 1 ;';
	conn.query(sql, [name], (err, result) => {
		if (err) {
			res.json({ code: 1, msg: err });
		} else {
			if (result[0]) {
				if (result[0].password === password) {
          res.cookie('user_id', result[0].id);
					let response = result[0]
					
          delete response.password
					res.json({
						code: 0,
						data: response
					});
				} else {
					res.json({
						code: 1,
						msg: '密码错误'
					});
				}
			} else {
        res.json({code: 2, msg: '用户不存在'})
			}
		}
	});
});

// 注册
router.post('/register', (req, res) => {
	let sql2 = 'SELECT * from user WHERE phone = ?';
	let phone = req.body.phone
	conn.query(sql2, [phone], (err, result) => {
		if (err){
			res.json({ code: 1, msg: err });
		}else {
			if(result.length == 0) {
				let sql = 'insert into user(name, phone, gender, email, password) values(?,?,?,?,?)';
				let addData = Object.values(req.body);
				for (let i in req.body) {
					if (util.trim(req.body[i]) == '' || req.body[i] == null || req.body == undefined) {
						res.json({ code: 1, msg: '缺少数据' });
					}
				}
				conn.query(sql, addData, (err, result) => {
					if (err) {
						res.json({ code: 1, msg: err });
					} else {
						res.json({ code: 0, data: '注册成功' });
					}
				});
			} else {
				res.json({code:2, msg: "该手机号已被注册"})
			}
		}
	})
})

module.exports = router;