/**
 * json数据去重合并
 */
export const modifyJson = (json, oldJson) => {
  if (!json && !oldJson) {
    return;
  }
  if (typeof json !== "object") {
    json = JSON.parse(json);
  }
  if (typeof oldJson !== "object") {
    oldJson = JSON.parse(oldJson);
  }

  var jsonData = {};
  for (var i in oldJson) {
    jsonData[i] = oldJson[i];
  }
  for (var j in json) {
    jsonData[j] = json[j];
  }

  return jsonData;
}
/**
 * 消息提示
 */
var repeat = '';
export const prompt = function (text, time) {
  if (text === repeat) {
    return false;
  }
  repeat = text;
  time = time || 3000;
  var htm = document.createElement('div');
  htm.innerHTML = text;
  htm.setAttribute('class', "prompt");
  document.body.appendChild(htm);
  setTimeout(() => {
    deletes(htm);
    repeat = '';
  }, time);

  function deletes(htm) {
    htm.style.opacity = 0;
    htm.style.top = htm.offsetTop - 80 + 'px';
    setTimeout(() => {
      document.body.removeChild(htm);
    }, 600)
  }
}
/**
 * 确认框/询问框
 */
export const $alert = function (text = "", options = {}, callback) {
  //type = 1 确认框
  //type = 2 提示框
  //type = 3 输入框
  var type = options.type || 2;
  var title = options.title || "提示";
  var confirmText = options.confirmText || "确认";
  var cancelText = options.cancelText || "取消";
  var placeholder = options.placeholder || "请输入";
  var inputType = options.inputType || "text";
  var inputValue = options.inputValue || "";
  var html = '<div class="alertPopups">';
  html += '<div class="title">';
  html += '<p>' + title + '</p>';
  html += '<span class="alertCancel">';
  html += '<svg viewBox="0 0 1024 1024">';
  html += '<path d="M555.008 512l299.008-299.008c12.288-12.288 12.288-31.744 0-43.008-12.288-12.288-31.744-12.288-43.008 0L512 468.992 212.992 169.984c-12.288-12.288-31.744-12.288-43.008 0-12.288 12.288-12.288 31.744 0 43.008L468.992 512 169.984 811.008c-12.288 12.288-12.288 31.744 0 43.008 6.144 6.144 14.336 9.216 21.504 9.216s15.36-3.072 21.504-9.216L512 555.008l299.008 299.008c6.144 6.144 14.336 9.216 21.504 9.216s15.36-3.072 21.504-9.216c12.288-12.288 12.288-31.744 0-43.008L555.008 512z"></path>';
  html += '</svg>';
  html += '</span>';
  html += '</div>';
  if (type !== 3) {
    html += '<div class="alertContent">';
    html += '<svg viewBox="0 0 1024 1024">';
    html += '<path d="M512 0C229.254842 0 0.010628 229.244214 0.010628 511.989372c0 282.766414 229.244214 512.010628 511.989372 512.010628 282.766414 0 511.989372-229.244214 511.989372-512.010628C1024.010628 229.244214 794.78767 0 512 0zM580.146217 804.23589l-136.271178 0L443.875039 687.626362l136.271178 0L580.146217 804.23589zM580.146217 591.443695l-136.271178 0L443.875039 219.76411l136.271178 0L580.146217 591.443695z"></path>';
    html += '</svg>';
  } else {
    html += '<div class="alertContent inputType">';
  }
  html += '<p>' + text + '</p>';
  if (type === 3) {
    html += '<input type="' + inputType + '" id="alertInput" value="' + inputValue + '" placeholder="' + placeholder + '">';
  }
  html += '</div>';
  html += '<div class="alertBut">';
  if (type !== 2) {
    html += '<button class="alertCancel">' + cancelText + '</button>';
  }
  html += '<button id="alertConfirm">' + confirmText + '</button>';
  html += '</div>';
  html += '</div>';
  var createDiv = document.createElement('div');
  createDiv.setAttribute('class', "alertMask");
  createDiv.innerHTML = html;
  document.body.appendChild(createDiv);
  //确认事件
  document.getElementById("alertConfirm").onclick = function () {
    var data = {};
    if (type === 3) {
      data.value = document.getElementById("alertInput").value;
      data.confirm = true;
      data.remove = function () {
        if (createDiv) {
          document.body.removeChild(createDiv);
        }
      };
    } else {
      data.confirm = true;
      if (createDiv) {
        document.body.removeChild(createDiv);
      }
    }
    callback && callback(data);
  }
  //删除事件
  var alertCancel = document.querySelectorAll(".alertCancel");
  for (var i = 0; i < alertCancel.length; i++) {
    alertCancel[i].onclick = function () {
      if (createDiv) {
        document.body.removeChild(createDiv);
        if (callback) {
          callback({
            confirm: false
          })
        }
      }
    }
  }
}
/**
 * 时间转换为XX前
 */
export const clickDateDiff = function (value) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = parseInt(now) - parseInt(value);
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
};

/**
 * 时间戳转换为想要的时间格式
 */
//时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
export const formatTime = function (value, format = "yyyy-MM-dd hh:mm") {
  var timeObj;
  if (value) {
    timeObj = new Date(parseInt(value));
  } else {
    timeObj = new Date();
  }
  var date = {
    "M+": timeObj.getMonth() + 1,
    "d+": timeObj.getDate(),
    "h+": timeObj.getHours(),
    "m+": timeObj.getMinutes(),
    "s+": timeObj.getSeconds(),
    "q+": Math.floor((timeObj.getMonth() + 3) / 3),
    "S+": timeObj.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
/**
 * 获取url中的参数
 */
export const getRequest = function () {
  var strs;
  var url = window.location.href; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    url = url.substr(url.indexOf("?"));
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      var index = strs[i].indexOf("=");
      theRequest[strs[i].slice(0, index)] = unescape(strs[i].slice(index + 1, strs[i].length));
    }
  }
  return theRequest;
}
