'use strict';
/**
 * @author hsf
 *
 */
(function(module) {
  var defaultOpt = '<option value>请选择</option>';
  /**
   * 区域级联
   *
   * @param arr  列表数据
   * @param cur  当前元素
   * @param next 下级元素
   *
   */
  function areaCascade(arr, cur) {
    var opArr = [defaultOpt];
    var map = {};
    for (var i=0; i<arr.length; i++) {
      var item = arr[i];
      opArr.push('<option value=' + item.id + '>' + item.name + '</option>');
      map['' + item.id] = item;
    }
    cur.innerHTML = opArr.join('');
    cur.onchange = function(e) {
      e = e || window.event;
      // 选中的item
      var selectedItem = map['' + cur.value];
      if (!selectedItem || !cur.next) return;
      // 清空所有子级别
      var tempNext = cur.next;
      while(tempNext) {
        tempNext.innerHTML = defaultOpt;
        tempNext = tempNext.next;
      }
      areaCascade(selectedItem.subordinates, cur.next);
    }
  }
  /**
   *
   * @param opts {els: Array, areaList: Array}, els所有级联的元素,areaList地址信息
   *
   */
  function AreaSelect(opts) {
    // 元素
    var els = opts.els || [];
    if (els.length <= 0) return;
    this.top = els[0];
    // 处理成链表
    for(var i=0,len=els.length-1; i<len; i++) {
      els[i].next = els[i+1];
    }

    // 行政区域数据
    var areaList = opts.areaList || {};

    areaCascade(areaList, this.top);
  }

  /**
   *
   * 获取传入els的所有值
   *
   * @return Array
   */
  AreaSelect.prototype.getValueArray = function() {
    var result = [];
    var next = this.top;
    while(next) {
      result.push(next.value);
      next = next.next;
    }
    return result;
  }


  // 导出api
  module.AreaSelect = AreaSelect;
})(window || {});
