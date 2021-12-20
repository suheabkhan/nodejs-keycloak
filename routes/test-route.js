const express = require("express");
const KeyCloakService = require("../lib/keyCloakService");
const router = express.Router();
const KeyCloak = new KeyCloakService();
const properties = require("../app");
const jwt = require("jsonwebtoken");
const KeycloakConnect = require("keycloak-connect");
const keycloak = new KeycloakConnect({}, properties.kcConfig);
router.get("/getSampleMessage", keycloak.protect("realm:admin_user"), (req, res) => {
  console.log("inside");
  const output = {
    name: "suheab",
    email: "khansuheab@gmail.com",
  };
  res.status(200).send(output);
});
router.post("/login", (req, res) => {
  console.log("Hai");
  console.log(req.body.login, req.body.password);
  KeyCloak.loginUser(req.body.login, req.body.password, req, res)
    .then((grant) => {
      //   res.render("loginSuccess", {
      //     userLogin: req.query.login,
      //   });
      //   console.log(grant.access_token.token);
      //   console.log(grant.access_token.content.sub);
      //   console.log(grant.access_token.content.name);

      const output = {
        accessToken: grant.access_token.token,
        refreshToken: grant.refresh_token.token,
        idToken: grant.id_token.token,
        id: grant.access_token.content.sub,
        name: grant.access_token.content.name,
        email: grant.access_token.content.email,
      };
      res.status(200).send(output);
    })
    .catch((error) => {
      // TODO put login failed code here (we can return 401 code)
      console.error(error);
      res.send("Login error: " + error);
    });
});
function isAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  // jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
  //   if (err) {
  //     return res.sendStatus(403);
  //   }
  //   req.user = decodedToken;
  //   next();
  // });
  console.log(jwt.decode(token).email);
  next();
}
module.exports = router;
