const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./DbConfig");
const bcrypt = require("bcrypt")

function initialize(passport) {
    const authenticateUser = (userEmail, userPassword, done) => {
        pool.query(
            `SELECT * FROM users 
            WHERE email = $1`,
            [userEmail],
            (err, results) => {
                if (err) {
                    throw err
                }
                console.log(results.row)

                if (results.row.length > 0) {
                    const user = results.row[0];
                    bcrypt.compare(userPassword, user.password, (err, isMatch) => {
                        if (err) {
                            throw err
                        }
                        if (isMatch) {
                            return done(null, user)

                        }
                        else {
                            return done(null, false, { message: "Password is not correct" })


                        }



                    })

                } else {
                    return done(null, false, { message: "Email is not registered" })


                }




            }
        );
    }
    passport.use(
        new LocalStrategy({
            usernameFiled: "email",
            passwordFiled: "password",


        },
            authenticateUser
        )
    );

    passport.serializeuser((user, done) => (done(null, user.id)));
    passport.deserializeuser((id, done) => {
        pool.query(
            `SELECT * FROM users WHERE id=$1`, [id], (err, results) => {
                if (err) {
                    throw err
                }
                return done(null, results.rows[0])


            }



        )



    })




}

module.exports = initialize;


