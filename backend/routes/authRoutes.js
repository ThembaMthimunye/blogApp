import { Login,createUser } from "../controllers/authController";

const router=express.router();

router.post("/user/login",Login)
router.post("/user/create-user",createUser)