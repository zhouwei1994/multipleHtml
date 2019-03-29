/*******************css引入（引入之后变成全局css）*************************/
import './style/init.scss';
import './style/common.scss';
import './style/iconfont.scss';
/*******************js引入（引入之后变成全局css）*************************/
import {
  formatTime
} from '@/utils/utils.js';

var a = "465464";

function aaa() {
  var b = "啊哈哈";
  console.log(a + b);
}
$(".time").html(formatTime("", 'yyyy-MM-dd hh:mm:ss'));

export default aaa;
