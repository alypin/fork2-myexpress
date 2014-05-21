var request = require('supertest'),
	expect=require('chai').expect,
	http=require('http');

var express= require('../');

describe('Implement Error Handling', function(){
	var app;
	beforeEach(function(){
		app=new express();
	});

	it('should return 500 for unhandled error', function(done){
		var m1=function(req, res, next){
			next(new Error("boom!"));
		}
		app.use(m1);
		request(app).get("/").expect(500).end(done);
	});

	it("should return 500 for uncaught error", function(done){
		var m1 = function(req,res,next) {
  		throw new Error("boom!");
		};
		app.use(m1);
		request(app).get("/").expect(500).end(done);
	});

	it("should skip error handlers when next is called without an error" ,function(done){
		var m1 = function(req,res,next) {
		next();
		}

		var e1 = function(err,req,res,next) {
		// timeout
		}

		var m2 = function(req,res,next) {
		res.end("m2");
		}
		app.use(m1);
		app.use(e1); // should skip this. will timeout if called.
		app.use(m2);
		// => m2
		request(app).get("/").expect("m2").end(done);
	});

	it("should skip normal middlewares if next is called with an error", function(done){
		var m1 = function(req,res,next) {
		next(new Error("boom!"));
		}

		var m2 = function(req,res,next) {
		// timeout
		}

		var e1 = function(err,req,res,next) {
		res.end("e1");
		}

		app.use(m1);
		app.use(m2); // should skip this. will timeout if called.
		app.use(e1);

		request(app).get("/").expect("e1").end(done);
	});



});