// const express = require("express");
// const app = express();
var Keycloak = require("keycloak-connect");
const testRoutes = require("./routes/test-route");

let kcConfig = {
  clientId: "angular-la",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "LA",
  //realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqsE6+6pzqQ5Nxvdxkjv39OQ1MQNW+4TVFqZ5nYZYKt3bt2qMmlp2Mn0Hx8PvSTwwcCkgwbciUfhD3cGPbNB22aTUxK5o8/8AEPZw8oa+6fOO8Rvq7gMf6YHDooGJO90YmqcyPXhJNpVREm4iqzgqxQLDgoMkTKR1LjvNRaMafqrTDUGumTBZeTsV3Ij12GioC9JQFC5Bv6lWEVuUA7ElrNjXszPfGLTtNeY8e20iQ5vIQhpeFSU0+ICjDZt2HtNf7tyXsOl7RWqi/HOa2tlRTVWS8AsJJy4q/jJPLGzazVfNkpOie493ZUShR9oCKHRvejjt1HmYO9HAsnTHdXmb3wIDAQAB",
};

// let keycloak = new Keycloak({}, kcConfig);
// app.use(keycloak.middleware());

// app.use("/test", keycloak.protect("realm:admin_user"), testRoutes);

// app.listen(3100, function () {
//   console.log("server is running at 3100");
// });

const Express = require("express");
const path = require("path");
const hogan = require("hogan-express");
const cookieParser = require("cookie-parser");

const Permissions = require("./lib/permissions");
const KeyCloakService = require("./lib/keyCloakService");
const AdminClient = require("./lib/adminClient");
const jwt = require("jsonwebtoken");
const { builtinModules } = require("module");
const bodyParser = require("body-parser");
/**
 * URL patterns for permissions. URL patterns documentation https://github.com/snd/url-pattern.
 */
const PERMISSIONS = new Permissions([["/customers", "post", "res:customer", "scopes:create"]]).notProtect(
  "/favicon.ico", // just to not log requests
  "/login(*)",
  "/accessDenied",
  "/adminClient",

  /**
   * It is protected because of we need an access token. Better to move it to the protected area.
   */
  "/permissions",
  "/test/getSampleMessage",
  "/checkPermission"
);
let keyCloak = new KeyCloakService(PERMISSIONS);
const keycloak = new Keycloak({}, kcConfig);
let app = Express();
const router = Express.Router();
// hogan-express configuration to render html
app.set("view engine", "html");
app.engine("html", hogan);
app.use(keycloak.middleware());
app.use(bodyParser.json());
//app.use("/test", keycloak.protect("realm:admin_user"), isAuth, testRoutes);
app.use("/test", testRoutes);
// let adminClient = new AdminClient({
//   realm: "LA",
//   serverUrl: "http://localhost:8080",
//   resource: "angular-la",
//   adminLogin: "subbu",
//   adminPassword: "1234",
// });

//configureMiddleware();
//configureRoutes();

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("App listening at port %s", port);
});
const logoutUrl = "/logout";
app.use(keyCloak.middleware(logoutUrl));
// function configureMiddleware() {
//   app.use(Express.static(path.join(__dirname, "static")));

//   // for a Keycloak token
//   app.use(cookieParser());

//   // protection middleware is configured for all links
//   const logoutUrl = "/logout";
//   app.use(keyCloak.middleware(logoutUrl));
// }

// function configureRoutes() {
//   let router = Express.Router();
//   app.use("/", router);

//   // example urls to check protection
//   applicationRoutes();

//   app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/static/index.html")));
// }

// this routes are used by this application
// function applicationRoutes() {
//   app.get("/login", login);

//   app.get("/adminClient", (req, res) => renderAdminClient(res, "we will have result here"));

//   app.get("/adminApi", (req, res) => {
//     let render = renderAdminClient.bind(null, res);
//     adminClient[req.query.api]().then(render).catch(render);
//   });

//   //get all permissions
//   app.get("/permissions", (req, res) => {
//     keyCloak
//       .getAllPermissions(req)
//       .then((json) => res.json(json))
//       .catch((error) => res.end("error " + error));
//   });

//   // check a specified permission
//   app.get("/checkPermission", (req, res) => {
//     keyCloak
//       .checkPermission(req, "res:customer", "scopes:create")
//       .then(() => res.end("permission granted"))
//       .catch((error) => res.end("error " + error));
//   });
//}

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
module.exports = { kcConfig, keycloak };
