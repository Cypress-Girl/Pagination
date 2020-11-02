let currentPage;
let maxPage;
let maxVisible;

selectPage();

function initPageContainer(container, value, callback = null, id = null) {
    let page = document.createElement("input");
    page.style.padding = "10px";
    page.style.border = "1px solid black";
    page.style.marginRight = "10px";
    page.style.width = "50px";
    page.style.boxSizing = "border-box";
    page.style.textAlign = "center";
    page.style.fontWeight = "bold";
    page.style.backgroundColor = "bisque";
    page.value = value;
    page.style.cursor = "pointer"
    if (value == currentPage)
        page.style.color = "red";

    if (id)
        page.id = id;

    page.addEventListener("click", callback);
    container.append(page);
}

function selectPage(value = null) {
    currentPage = value ? +value : +document.getElementById("currentPage").value;
    if (value)
        document.getElementById("currentPage").value = value;
    maxVisible = +document.getElementById("maxVisible").value;
    maxPage = +document.getElementById("maxPage").value;

    selectPage1(value);
    selectPage2(value);
}

function removeChildren(container) {
    let child = container.firstElementChild;
    while (child) {
        child.remove();
        child = container.firstElementChild;
    }
}

function selectPage1(value = null) {

    container = document.getElementById("pagination-container1");
    removeChildren(container);

    let dimention = maxVisible - 2;

    if (currentPage <= maxVisible) {

        let count = maxPage <= maxVisible ? maxPage : maxVisible;

        for (let i = 1; i <= count; i++) {
            initPageContainer(container, i, () => selectPage(i));
        }

        if (maxPage > maxVisible) {
            initPageContainer(container, "...", null);

            initPageContainer(container, maxPage, () => selectPage(maxPage));

            initPageContainer(container, ">", () => selectPage(Number(currentPage) + 1));

        }
    } else {

        initPageContainer(container, "<", () => selectPage(Number(currentPage) - 1));

        initPageContainer(container, 1, () => selectPage(1));

        initPageContainer(container, "...", null);

        let arr = new Array();
        for (let i = -(dimention - 1); i <= 0; i++)
            arr.push(currentPage + i);

        //проверяем, можем ли мы потсавить currentPage в центр для симметрии
        for (let i = 0; i < Math.floor(dimention / 2); i++) {
            if ((currentPage + i) < maxPage) {
                arr.shift();
                arr.push((currentPage + i) + 1);
            } else
                break;
        }

        arr.forEach((item) => {
            initPageContainer(container, item, () => selectPage(item));
        })

        //проверяем, дошли ли мы до максисмума страниц
        if (arr[arr.length - 1] < maxPage) { //не дошли!
            initPageContainer(container, "...", null);

            initPageContainer(container, maxPage, () => selectPage(maxPage));

            initPageContainer(container, ">", () => selectPage(Number(currentPage) + 1));

        }
    }
}

function viewPage(container) {
    let arr = new Array();

    // if (currentPage == 1)
    //     debugger
    if (currentPage <= maxVisible) {

        let count = maxPage <= maxVisible ? maxPage : maxVisible;

        for (let i = 1; i <= count; i++)
            arr.push(i);
        console.log(arr)

        if (arr.indexOf(currentPage) > (Math.floor(+maxVisible / 2) + 1)) {
            //проверяем, можем ли мы потсавить currentPage в центр для симметрии
            while (arr.indexOf(currentPage) >= (Math.floor(+maxVisible / 2) + 1)) {
                if (arr[arr.length - 1] < maxPage) {
                    arr.shift();
                    arr.push(arr[arr.length - 1] + 1);
                } else
                    break;
            }
        }
        arr.forEach((item) => {
            initPageContainer(container, item, () => selectPage(item));
        })

    } else {
        for (let i = -(maxVisible - 1); i <= 0; i++)
            arr.push(currentPage + i);

        //проверяем, можем ли мы потсавить currentPage в центр для симметрии
        for (let i = 0; i < Math.floor(maxVisible / 2); i++) {
            if ((currentPage + i) < maxPage) {
                arr.shift();
                arr.push((currentPage + i) + 1);
            } else
                break;
        }
        arr.forEach((item) => {
            initPageContainer(container, item, () => selectPage(item));
        })
    }
}

function selectPage2(value = null) {

    let container = document.getElementById("pagination-container2");
    removeChildren(container);

    initPageContainer(container, "|<", () => selectPage(1), "firstButton2");
    initPageContainer(container, "<", () => selectPage(Number(currentPage) - 1), "prevButton2");

    viewPage(container);

    initPageContainer(container, ">", () => selectPage(Number(currentPage) + 1), "nextButton2");
    initPageContainer(container, ">|", () => selectPage(maxPage), "lastButton2");

    // if (currentPage <= maxVisible) {
    //     document.getElementById("firstButton2").setAttribute('disabled', 'disabled');
    // }
    //
    if (currentPage == 1) {
        document.getElementById("prevButton2").setAttribute('disabled', 'disabled');
    }

    if (currentPage == maxPage) {
        document.getElementById("lastButton2").setAttribute('disabled', 'disabled');
        document.getElementById("nextButton2").setAttribute('disabled', 'disabled');
    }
    //
    // if (maxPage <= maxVisible) {
    //     document.getElementById("lastButton2").setAttribute('disabled', 'disabled');
    //     document.getElementById("nextButton2").setAttribute('disabled', 'disabled');
    // }
}