"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const varifyToken_1 = require("../libs/varifyToken");
const router = (0, express_1.Router)();
router.post('/signup', auth_controllers_1.signup);
router.get('/signin', auth_controllers_1.signin);
router.get('/profile', varifyToken_1.tokenValidator, auth_controllers_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map