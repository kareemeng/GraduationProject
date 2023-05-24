// Copyright 2023 oa147
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { body, check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware';



export const createdeepfakeValidator = [
    body('video')
        .exists()
        .withMessage('video is required')
        .isString()
        .withMessage('video must be a string')
        .trim()
        .escape(),
    validatorMiddleware,
];


// export default BrandValidator;
