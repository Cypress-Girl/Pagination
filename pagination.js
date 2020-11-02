let currentPage;

selectPage();

function initPageContainer(container, value, callback) {
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
    if (value == currentPage) {
        page.style.color = "red";
    }
    page.addEventListener("click", callback);
    container.append(page);
}

function selectPage(value = null) {

    currentPage = value ? +value : +document.getElementById("currentPage").value;
    if (value)
        document.getElementById("currentPage").value = value;

    let maxPage = +document.getElementById("maxPage").value;
    let container = document.getElementById("pagination-container");
    let maxVisible = +document.getElementById("maxVisible").value;

    let child = container.firstElementChild;
    while (child) {
        child.remove();
        child = container.firstElementChild;
    }

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
        for(let i = -(dimention - 1); i <= 0; i++)
            arr.push(currentPage + i);

        //проверяем, можем ли мы потсавить currentPage в центр для симметрии
        for( let i=0; i<Math.floor(dimention/2); i++){
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