'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
    realid: {
        type: String,
        required: true
    },
    altids: [{
        type: Schema.Types.ObjectId,
        ref: 'Altid'
    }]
});

module.exports = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map