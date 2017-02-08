/**
 * Created by gaojinbao on 2015/12/3.
 */

var timeFormat = function () {
    this.data = new Date();
}

timeFormat.prototype.format = function () {
    var year = this.data.getFullYear();
    var month = this.data.getMonth() + 1;
    return year + '-' + month;
}

module.exports = timeFormat;
