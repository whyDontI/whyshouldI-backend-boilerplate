

// beforeEach((done) => {
//   User.deleteMany({
//     _id: {
//       $ne: mongoose.Types.ObjectId('5ef85be58d33ac4197566689')
//     }
//   }, (error) => {
//     if (error) {
//       console.error(error)
//     }
//     done()
//   })
// })
//
// it('should PATCH (Update) a user', () => {
//   chai.request(app)
//     .patch(`/user/${userId}`)
//     .set({ 'Content-Type': 'application/json' })
//     .send({
//       name : 'UPDATED TEST USER',
//     })
//     .end((error, res) => {
//       if (error) {
//         console.log(error)
//       }
//       res.should.have.status(200)
//       res.body.data.should.be.an('object')
//       res.body.data.nModified.to.equal(1)
//       done()
//     })
// })

// it('should GET one user with given id', (done) => {
//   chai.request(app)
//     .get(`/user/${userId}`)
//     .set({ authorization: `${jwt}` })
//     .end((error, res) => {
//       if (error) {
//         console.error(error)
//       }
//       res.should.have.status(200)
//       res.body.data.should.be.an('object')
//       done()
//     })
// })

// it('should GET all the users', (done) => {
//   chai.request(app)
//     .get('/user')
//     .set({ authorization: `${jwt}` })
//     .end((error, res) => {
//       if (error) {
//         console.log(error)
//       }
//       res.should.have.status(200)
//       res.body.data.should.be.a('array')
//       res.body.count.should.be.eql(2)
//       done()
//     })
// })
