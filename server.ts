/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import AuthenticationController from "./controllers/auth-controller";
import BookmarkController from "./controllers/BookmarkController";
import mongoose from "mongoose";

var cors = require('cors')
const session = require("express-session");

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_PW + '@cluster0.bihkn.mongodb.net/tuiter?retryWrites=true&w=majority')

const app = express();
let sess = {
    secret: process.env.SECRET,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    },
    resave: true,
    saveUninitialized: true,
}
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(express.json());
app.use(cors({
    origin: !(!process.env.ENABLE_CORS),
    credentials: true
}));
app.use(session(sess))

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const authController = AuthenticationController(app);
const bookmarkController = new BookmarkController();
bookmarkController.listen(app)
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
