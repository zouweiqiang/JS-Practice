var that;
class Tab  {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    //init初始化操作，让相关的元素绑定事件
    init(){
        this.updateNode();
        this.add.onclick = this.addTab;
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //因为我们动态获取元素，所以我们需重新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    //1.切换功能
    toggleTab() {
        that.clearclass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除所有li和section类
    clearclass() {
        for(var i = 0;i < this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //2.添加功能
    addTab() {
        that.clearclass();
        //创建li元素和selection元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试'+ random +'</section>';
        //把两个元素追加到相应的父元素里
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section)
        that.init();
    }
    //3.删除功能
    removeTab(e) {
        e.stopPropagation();//阻止冒泡，防止触发li点击事件
        var index = this.parentNode.index;
        //删除对应的li和section 
        that.lis[index].remove();
        that.sections[index].remove();
        //如果要删除的元素是选中状态，直接返回，取消下面的执行
        if(document.querySelector('.liactive')) return;
        that.init();
        index--;
        that.lis[index] && that.lis[index].click();
    }
    //4.修改功能
    editTab() {
        //获取当前文字
        var str = this.innerHTML;
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
        this.innerHTML = '<input type = "text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();//让我们的文字处于选中状态
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        //回车也能把文字给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                this.blur();
            }
        }
    }
}
var tab = new Tab('#tab');