var connection = require("../config/connection.js");


//SQL Syntax helper
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (Object.hasOwnProperty.call(ob, key)) {
			arr.push(key + "=" + ob[key]);
		}
	}
	return arr.toString();
}

var orm = {
	selectAll: function (tableName, callBack) {
		var queryString = "SELECT * FROM " + tableName;
		connection.query(queryString, function (err, res) {
			if (err) {
				throw err;
			}
			callBack(res);
		});
	},
	insertOne: function (tableName, col, vals, callBack) {
		var queryString = "INSERT INTO " + tableName + "(" + col + ") VALUES (?)";
		console.log(queryString);

		connection.query(queryString, vals, function (err, results) {
			if (err) {
				throw err;
			}
			callBack(results);
		});
	},
	updateOne: function (tableName, objColVals, condition, callBack) {
		var queryString = "UPDATE " + tableName;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}

			callBack(result);
		});
	}

}


module.exports = orm;
