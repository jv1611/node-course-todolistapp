const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');
// const {todos, populateTodos} = require('../seed.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
   it('Should create a new todo', (done) => {
      var text = 'Tekst todo testjes';

      request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
         expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
         if(err) {
            return done(err);
         }
         Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
         }).catch((e) => done(e));
      });
   });

   it('Should not create a bad todo', (done) => {
      // var text = "";
      request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
         if(err){
            return done(err);
         }
         Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
         }).catch((e) => done(e));
      });
   });
});

describe('GET /todos', () => {
   it('Should get all todos', (done) => {
      request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
         expect(res.body.todos.length).toBe(1);
      })
      .end(done);
   });
});

describe('GET /todos/:id', () => {
   it("Should return todo doc", (done) => {
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
         expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
   });

   it('Should return 400 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
   });

   it("Should return 404 for non-object ids", (done) => {
      request(app)
      .get('/todos/123abc')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
   });

   it("Should not return todo doc created by other user", (done) => {
      request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      // .expect((res) => { Aangezien we 404 krijgen heeft dit geen nut
      //    expect(res.body.todo.text).toBe(todos[0].text);
      // })
      .end(done);
   });
});

describe("DELETE / todos/:id", () => {
   it('Should remove a todo', (done) => {
      var hexId = todos[0]._id.toHexString();

      request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
         expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
         if(err) {
            return done(err);
         }
         Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
         }).catch((e) => done(e));
      });
   });

   it('Should not remove a todo from others', (done) => {
      var hexId = todos[0]._id.toHexString();
      // Deze it verwijst naar app.delete in server/server.js KIJK daarnaar
      request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      // NA 400/404 krijg je altijd .end(...)!!!!
      // Het gaat fout dus geen (res)
      // .expect((res) => {
      //    expect(res.body.todo._id).toBe(hexId);
      // })
      .end((err, res) => {
         if(err) {
            return done(err);
         }
         Todo.findById(hexId).then((todo) => {
            // expect(todo).toNotExist();
            expect(todo).toExist();
            done();
         }).catch((e) => done(e));
      });
   });

   it('Should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
   });

   it('Should return 400 if object id is invalid', (done) => {
      request(app)
      .delete('/todos/123abc')
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
   });
});


describe('PATCH /todos/:id', () => {
   it('Should update (patch) the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'Dit is de nieuwe tekst';
      request(app)
         .patch(`/todos/${hexId}`)
         .set('x-auth', users[0].tokens[0].token)
         .send({
            completed: true,
            text
         })
         .expect(200)
         .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
         })
         .end(done);
      //    .end((err, res) => {
      //       if(err) {
      //          console.log( 'Er ging iets fout voor het updaten');
      //          return done(err);
      //       }
      //       console.log('Geupdate naar completed');
      //       done();
      // }).catch((e) => done(e));
   });

   it('Should NOT update (patch) the todo from others', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'Dit is de nieuwe tekst';
      request(app)
         .patch(`/todos/${hexId}`)
         .set('x-auth', users[0].tokens[0].token)
         .send({
            completed: true,
            text
         })
         .expect(404)
         // Niets meer natuurlijk
         .end(done);
   });

   it('Should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'Alweer een andere tekst';

      request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
         completed: false,
         text
      })
      .expect(200)
      .expect((res) => {
         expect(res.body.todo.text).toBe(text);
         expect(res.body.todo.completed).toBe(false);
         expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
   });
});

describe('GET users/me', () => {
   it('should return user if authenticated', (done) => {
      request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
         expect(res.body._id).toBe(users[0]._id.toHexString());
         expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
   });
   it('should return 401 if not authenticated', (done) => {
      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
         expect(res.body).toEqual({});
      })
      .end(done);
   });
});

describe('POST /users', () => {
   it('Should create a user', (done) => {
      var email = 'example@mail.test';
      var password = 'test123';

      request(app)
         .post('/users')
         .send({email, password})
         .expect(200)
         .expect((res) => { // that the following function does NOT throw errors
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
         })
         .end((err) => {
            if(err) {
               return done(err);
            }
            User.findOne({email}).then((user) => {
               expect(user).toExist();
               expect(user.password).toNotBe(password);
               done();
            }).catch((e) => done(e));
         });
   });

   it('Should return validation errors if request invalid', (done) => {
      var email = 'examplemail.test';
      var password = 'tes3';
      request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      // .expect((res) => { // BLIJKBAAR niet nodig
      //    expect(res.body.email).toNotBe(email);
      //    expect(res.body.password).toNotBe(password);
      // })
      .end(done);
   });

   it('Should not create user if email in use', (done) => {
      request(app)
      .post('/users')
      .send({
         email: users[0].email,
         password: 'Password123!'
      })
      .expect(400)
      // .expect((res) => { Dit MOET je verwijderen, anders werkt het NIET
      //    expect(res.body.email).toExist();
      //    expect(res.body.password).toNotBe(password);
      // })
      .end(done);
   });
});


describe('POST /users/login', () => {
   it('Should login user and return auth token', (done) => {
      request(app)
      .post('/users/login')
      .send({
         email: users[1].email,
         password: users[1].password
      })
      .expect(200)
      .expect((res) => {
         expect(res.header['x-auth']).toExist();
      })
      .end((err, res) => {
         if (err) {
            return done(err);
         }
         User.findById(users[1]._id).then((user) => {
            expect(user.tokens[1]).toInclude({
               access: 'auth',
               token: res.header['x-auth']
            });
            done();
         }).catch((e) => done(e));
      });
   });

   it('Should reject invalid login', (done) => {
      request(app)
      .post('/users/login')
      .send({
         email: users[1].email,
         password: 1 // Dit is dus niet geldig
      })
      .expect(400)
      .expect((res) => {
         expect(res.header['x-auth']).toNotExist();
      })
      .end((err, res) => {
         if (err) {
            return done(err);
         }
         User.findById(users[1]._id).then((user) => {
            expect(user.tokens.length).toBe(1);
            done();
         }).catch((e) => done(e));
      });
   });
});

describe('DELETE /users/me/token', () => {
   it('Should remove auth token on logout', (done) => {
      request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      // .expect((res) => { // Dit is blijkbaar helemaal niet nodig
      //    expect(res.header['x-auth']).toExist();
      // })
      .end((err, res) => {
         if(err) {
            return done(err);
         }
         User.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
         }).catch((e) => done(e));
      });
   });
});
