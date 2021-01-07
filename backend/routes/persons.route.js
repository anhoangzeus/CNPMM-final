// persons.route.js
const jwt = require('jsonwebtoken');
const express = require('express');
const personRoutes = express.Router();

// Require Business model in our routes module
let Person = require('../models/persons.model');

// Defined store route
personRoutes.route('/add').post(function (req, res) {
    let person = new Person(req.body);
    let token = req.body.token;
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET, function(err, decode){
        if(err){
            console.log("het han ??"+err);
            res.json({
                err
              });
        }
        else
        {
            
            person.save()
        .then(person => {
            res.status(200).json({'person': 'person in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
        }
       
    });
    
});

// Defined get data(index or listing) route
personRoutes.route('/').get(function (req, res) {
    Person.find(function(err, persons){
        if(err){
            console.log(err);
        }
        else {
            //return all persons
            res.json(persons);
        }
    });
});
//remove special character
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
//search API
personRoutes.route('/search').post(function (req, res) { 
    if(req.body.keyword)//if keyword != null
    {
        const regex = new RegExp(escapeRegex(req.body.keyword),"gi");//remove special
        Person.find({name: regex},function(err, persons){//find by name
            if(err)
                return res.json(err);
            else
                return res.json(persons)
        })
    }
    else{
        Person.find(function(err, persons){//get all person if keyword null
            if(err){
                console.log(err);
            }
            else {
                res.json(persons);
            }
        });
    }
});

// Defined edit route
personRoutes.route('/edit/:id').get(function (req, res) {

    const token = req.header("x-auth-token");//verify token
    console.log("token EDIT: "+token);
    const verified = jwt.verify(token, process.env.JWT_SECRET, function(err, decode){//verify token
        if(err){
            console.log("het han ??"+err);
            res.json(false);//return err
        }
        else
        {
            let id = req.params.id;
            Person.findById(id, function (err, business){//get user by id
            res.json(business);
        });
        }
    });
});

//  Defined update route
personRoutes.route('/update/:id').post(function (req, res) {

    let token = req.body.token;//verify token
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET, function(err, decode){//verify token
        if(err){
            console.log("het han ??"+err);
            res.json({
                err
              });
        }
        else
        {
            Person.findById(req.params.id, function(err, person) {//get person by id
                if (!person)//data null
                    res.status(404).send("data is not found");
                else {
                    console.log(person);//change info person
                    person.name = req.body.name;
                    person.company = req.body.company;
                    person.age = req.body.age;
        
                    person.save().then(business => {
                        res.json('Update complete');
                    })
                        .catch(err => {
                            res.status(400).send("unable to update the database");
                        });
                }
            });
        }     
    });
});

// Defined delete | remove | destroy route
personRoutes.route('/delete/:id').get(function (req, res) {
    const token = req.header("x-auth-token");
    console.log("token delete: "+token);
    const verified = jwt.verify(token, process.env.JWT_SECRET, function(err, decode){
        if(err){
            console.log("het han ??"+err);
            res.json(false);
        }
        else
        {
            Person.findByIdAndRemove({_id: req.params.id}, function(err, person){
                if(err) res.json(err);
                else res.json('Successfully removed');
            });
        }
       
    });
    
});

module.exports = personRoutes;