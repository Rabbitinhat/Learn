class Slider {
  constructor(node, style) {
    this.slider = this.createStructure(node, style);
  }

  createStructure(node, style) {
    let out = document.createElement("div");
    out.classList.add("outer");
    out.style.width = style.width + 'px';
    out.style.height = style.height + 'px';
    out.style.overflow = "hidden";
    out.style.position = "relative";
    console.log(out)
    let container = document.createElement("div");
    container.classList.add("container");
    container.style.width = style.width * style.imgs.length + "px";
    container.style.height = style.height + "px";
    container.style.marginLeft = '0px'
    for (let imgUrl of style.imgs) {
      console.log(imgUrl);
      let img = document.createElement("img");
      img.src = imgUrl;
      img.style.width = style.width + 'px';
      img.style.height = style.height + 'px';
      console.log(img.style.src);
      container.appendChild(img);
    }
    out.appendChild(container);
    if (style.buttons) {
      let buttons = this.createButton(out, style);
      for (let button of buttons) {
        out.appendChild(button);
      }
    }
    if (style.indicators) {
      out.appendChild(this.createIndi(container, style));
    }

    if (style.autoPlay) {
      this.autoPlay(out);
    }

    return out;
  }

  createButton(node, style) {
    let left = document.createElement("span");
    left.textContent = "<";
    let right = document.createElement("span");
    right.textContent = ">";
    node.addEventListener("click", e => {
      if (Array.from(node.children[0].classList).indexOf("container") > -1) {
        // FIXME 注意marginLeft值的转换
        let margin = parseInt(node.children[0].style.marginLeft);
        let max = (style.imgs.length - 1) * style.width * -1;
        console.log(margin, max)
        if (e.target.id === "left") {
          if (margin === 0) {
            node.children[0].style.marginLeft = max + "px";
          }else{
          node.children[0].style.marginLeft = margin + style.width + "px";
          }
        }
        if (e.target.id === "right") {
          if (margin === max) {
            node.children[0].style.marginLeft = "0px";
          }else{
          node.children[0].style.marginLeft = margin + style.width * -1 + "px";
          }
        }
      }
    });
    left.id = "left";
    right.id = "right";
    return [left, right];
  }

  createIndi(node, style) {
    let ul = document.createElement("ul");
    for (let i = 0; i < style.imgs.length; i++) {
      let li = document.createElement("li");
      li.addEventListener("click", e => {
        for (let child of e.target.parentElement.children) {
          child.id = "";
        }
        node.style.marginLeft = i * style[width] * -1 + "px";
        e.target.id = "active";
      });
      ul.appendChild(li);
    }
    return ul;
  }

  autoPlay(node) {
    var playAuto = null;
    function play(){
      document.getElementById('right').click()
    }
    node.addEventListener("click", e => {
      playAuto = node.addEventListener("mouseout", e => {
        setTimeout(play, 5000);
      });
      node.addEventListener("mousein", () => {
        clearTimeout(playAuto);
      });
    });
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

let show = document.getElementById("show");
let slider = new Slider(show, {
  width: 400,
  height: 300,
  imgs: [
    "https://i01.appmifile.com/webfile/globalimg/us/USBanner/lazerprojectnew.jpg",
    "https://i01.appmifile.com/webfile/globalimg/us/USBanner/spherecamera3.jpg",
    "https://i01.appmifile.com/webfile/globalimg/us/USBanner/Scooter-banner.jpg",
    "https://i01.appmifile.com/webfile/globalimg/us/USBanner/Mi-box-s-007.jpg",
    "https://i01.appmifile.com/webfile/globalimg/us/USBanner/truckbanner.jpg"
  ],
  buttons: true,
  indicators: true,
  autoPlay: true
});

show.appendChild(slider.slider);

