let render = {
    draw: function (parent,code,newClassName) {
    parent.innerHTML = `${code}`;
    
    },
    animate: function(elem,newClassName) {
        elem.classList.add(newClassName);
    }
}