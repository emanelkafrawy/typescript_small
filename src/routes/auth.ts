import {Router} from 'express'

import {signin, signup, profile} from '../controllers/auth.controllers';
import {tokenValidator} from '../libs/varifyToken'

const router: Router = Router();

router.post('/signup',signup);
router.get('/signin',signin);
router.get('/profile', tokenValidator, profile);

export default router;