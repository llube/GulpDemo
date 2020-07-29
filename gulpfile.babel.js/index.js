const { series } = require('gulp')

const create = require('./tasks/create')
const start = require('./tasks/start')
const end = require('./tasks/end')

exports.create = create;
exports.start = start;
exports.end = end;
exports.default = series(start, end);