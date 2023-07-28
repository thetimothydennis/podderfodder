/**
 * install crypto
 * 
 * MODEL
 *      userSchema.methods.generatePasswordResetHash = () => {
 *          // create a hash object, then create a sha512 hash of the current password, return hash
 *          const resetHash = crypto.createHash('sha512).update(this.password).digest('hex);
 *          return resetHash;
 *      }
 * 
 *      userSchema.methods.verifyPasswordResetHash = (resetHash = undefined) => {
 *          // regenerate hash and check if they are equal
 *          return this.passwordResetHash() === resetHash;
 *      }
 * 
 * RESET PAGE
 *      make a form with an input for email address, button to submit, post to /api/reset
 * 
 * NEW PASS PAGE
 *      make a form for entering new password and match, post to /api/reset-pass
 * 
 * ROUTES
 *      post('/api/reset', async (req, res) => {
    *          const user = await User.findOne({email: req.body.email});
    *          if (user) {
    *              const hash = new User(user).generatePasswordResetHash();
    *              const resetLink = `http://localhost:5000/reset?email=${user.email}&hash=${hash}`;
    *              return res.status(200).json({
    *                  resetLink
    *              })
    *          } else {
    *              return res.status(400).json({
    *                  message: "Email address is invalid"
    *              })
    *          }
 *      })
 * 
 *   get('/api/reset', async (req, res) => {
 *          if (req.query && req.query.email && req.query.hash) {
 *              const user = await User.findOne({email: req.body.email});
    *          if (user) {
    *               if (new User(user).verifyPasswordResetHash(req.query.hash)) {
    *                   req.session.email = req.query.email;
    *                   return res.sendFile(__dirname + '/client/dist/views.html')
    *               } else {
    *                   return res.status(400).json({
    *                       message: "You have provided an invalid reset link"
    *                   })
    *               }
    *              })
    *          } else {
    *              return res.status(400).json({
    *                  message: "You have provided an invalid reset link"
    *              })
    *          }
 *          } else {
 *              return res.sendFile(__dirname + "./client/dist/index.html")
 *          }
 *      })
 * 
 */