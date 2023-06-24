const topBar = document.querySelector(".top-bar");
topBar.addEventListener("click", function (ev) {
    if (ev.target.tagName === 'IMG') {
        location.href = "/confectionery/index.html";
    }
});

// 导航栏切换，冒泡
const bar = document.querySelector(".menu-bar");
bar.addEventListener("click", function (ev) {
    if (ev.target.tagName === 'A') {
        const id = ev.target.dataset.id;
        // 将之前选中的撤销
        const element = document.querySelector(".menu-bar .nav-checked");
        element.classList.remove("nav-checked");

        // 选中当前
        const now = document.querySelector(`.menu-bar li:nth-child(${id})`);
        now.classList.add("nav-checked");

        // 更换内容区
        const oldDiv = document.querySelector(".main.main-checked");
        oldDiv.classList.remove("main-checked");
        // const div = document.querySelector(`body>.main:nth-child(${+id + 1})`);
        const div = document.querySelector(`body>.main:nth-of-type(${id})`);
        div.classList.add("main-checked");
    }
});

// 轮播图
const imgFather = document.querySelector('.sideshow-img');
let imgArr = imgFather.children

const paginationFather = document.querySelector('.pagination');
let paginationArr = paginationFather.children;

// const imgArr1 = document.querySelectorAll('.sideshow .sideshow-img>img');
// const paginationArr = document.querySelectorAll('.pagination>div');
let i = 0;
// 切换函数
function change () {
    i++;
    i = i >= imgArr.length ? 0 : i;

    for (const k of paginationArr) {
        k.style.background = '#fff';
    }
    for (const k of imgArr) {
        k.style.opacity = '0';
    }
    imgArr[i].style.opacity = '1';
    paginationArr[i].style.background = '#99cbff';
}

let timeId = setInterval(change, 3000);
// 鼠标进入停止播放
imgFather.addEventListener('mouseenter',function () {
   clearInterval(timeId);
});
// 鼠标离开继续播放
imgFather.addEventListener('mouseleave',function () {
    timeId = setInterval(change,3000);
})

const btnRight = document.querySelector('.sideshow .btn-right');
btnRight.addEventListener('click',change);

const btnLeft = document.querySelector('.sideshow .btn-left');
btnLeft.addEventListener('click',function () {
    i--;
    i = i < 0 ? imgArr.length-1 : i;

    for (const k of paginationArr) {
        k.style.background = '#fff';
    }
    for (const k of imgArr) {
        k.style.opacity = '0';
    }
    imgArr[i].style.opacity = '1';
    paginationArr[i].style.background = '#99cbff';
})

// 电梯导航显示
const elevator = document.querySelector('.cake-type .elevator-nav');
window.addEventListener('scroll',function () {
    // 1、展现
    const n = document.documentElement.scrollTop;
    // 2、滚动显示对应区域
    // 2.1 消除选中的导航栏
    const active = document.querySelector(`.cake-type>.elevator-nav .active`);
    if (active)
        active.classList.remove('active');
    // 2.1 获取每个区域的offSet
    const cream = document.querySelector('.cake-type>.cake-type-cream');
    const mousse = document.querySelector('.cake-type>.cake-type-mousse');
    const cartoon = document.querySelector('.cake-type>.cake-type-cartoon');
    // 2.3 激活导航栏
    if (n >= cartoon.offsetTop) {
        document.querySelector('.elevator-nav .cartoon').classList.add('active');
    } else if (n >= mousse.offsetTop) {
        document.querySelector('.elevator-nav .mousse').classList.add('active');
    } else if (n >= cream.offsetTop) {
        document.querySelector('.elevator-nav .cream') .classList.add('active');
        elevator.style.display = 'flex';
    } else {
        elevator.style.display = 'none';
    }
})

// 电梯导航点击事件，冒泡
elevator.addEventListener('click',function (ev) {
    const ele = ev.target;
    const name = ele.className;
    // 1、 如果是back-top，回到顶部
    if (name === 'back-top') {
        const active = document.querySelector(`.cake-type>.elevator-nav .active`);
        if (active)
            active.classList.remove('active');
        document.documentElement.scrollTop = 0;
    }
    if (ele.tagName === 'BUTTON' && name !== 'back-top') {
        const active = document.querySelector(`.cake-type>.elevator-nav .active`);

        if (active) {
            active.classList.remove('active');
        }
        ele.classList.add('active');
        document.documentElement.scrollTop = document.querySelector(`.cake-type-${name}`).offsetTop;
    }

})