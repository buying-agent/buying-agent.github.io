let PRODUCTS = [];
let currentProduct = null;
let currentColorFolder = "";

const bagArea = document.querySelector("#bagArea");
const readyArea = document.querySelector("#readyArea");
const readyTitle = document.querySelector("#readyTitle");
const tabs = document.querySelectorAll(".tabs button");
const modal = document.querySelector("#modal");
const loading = document.querySelector("#loading");

/* CSV 읽기 */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quote && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      quote = !quote;
    } else if (char === "," && !quote) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quote) {
      if (value || row.length) {
        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      }

      if (char === "\r" && next === "\n") i++;
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const header = rows.shift().map(x =>
    x.trim().replace(/^\uFEFF/, "")
  );

  return rows.map(row => {
    const obj = {};
    header.forEach((key, index) => {
      obj[key] = (row[index] || "").trim();
    });
    return obj;
  });
}

/* 색상 읽기 */
function parseColors(text) {
  if (!text) return [];

  return text
    .split("|")
    .map(item => {
      const [label, folder] = item.split(":");

      return {
        label: (label || "").trim(),
        folder: (folder || "").trim()
      };
    })
    .filter(item => item.label && item.folder);
}

/* 상품 데이터 정리 */
function normalizeProduct(row) {
  return {
    id: row.id,
    category: row.category,
    categoryName: row.categoryName,
    name: row.name,
    price: row.price,
    shortDesc: row.shortDesc,
    desc: row.desc,
    folder: `assets/${row.folder}`,
    colors: parseColors(row.colors),
    options: row.options
      ? row.options.split("|").map(v => v.trim())
      : ["상담 후 옵션 확인"],
    status: row.status || "show"
  };
}

/* 상품 불러오기 */
async function loadProducts() {
  try {
    const response = await fetch("products.csv?time=" + Date.now());
    const text = await response.text();

    PRODUCTS = parseCSV(text)
      .map(normalizeProduct)
      .filter(product =>
        product.status !== "hide" &&
        product.name &&
        product.folder
      );

    loading.classList.add("hidden");

    // 처음에는 가방부터 노출
    renderProducts("bag");
  } catch (error) {
    loading.textContent =
      "products.csv를 불러오지 못했습니다. Live Server로 실행했는지 확인해주세요.";
    console.error(error);
  }
}

/* 이미지 경로 만들기 */
function productImages(product, colorFolder = "") {
  const base = colorFolder
    ? `${product.folder}/${colorFolder}`
    : product.folder;

  const images = [`${base}/main.jpg`];

  for (let i = 1; i <= 9; i++) {
    images.push(`${base}/detail${String(i).padStart(2, "0")}.jpg`);
  }

  return images;
}

/* 상품 목록 출력 */
function renderProducts(category) {
  const products = PRODUCTS
    .filter(product => product.category === category)
    .reverse();

  if (!products.length) {
    const categoryName =
      category === "bag" ? "가방" :
      category === "etc" ? "잡화" :
      "상품";

    bagArea.innerHTML = `
      <div class="ready">
        <h3>${categoryName} 상품 준비중</h3>
        <p>products.csv에 상품을 추가해주세요.</p>
      </div>
    `;
    return;
  }

  bagArea.innerHTML = products.map(product => {
    const firstColorFolder = product.colors[0]?.folder || "";
    const mainImage = productImages(product, firstColorFolder)[0];

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-img">
          <img 
            src="${mainImage}" 
            alt="${product.name}"
            onerror="this.closest('.product-card').remove()"
          >
        </div>

        <div class="product-info">
          <p class="gold">${product.categoryName}</p>
          <h3>${product.name}</h3>
          <div class="product-price">${product.price}</div>
          <p>${product.shortDesc}</p>
          <strong>상세 확인하기 ›</strong>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".product-card").forEach(card => {
    card.onclick = () => openDetail(card.dataset.id);
  });
}

/* 상세 이미지 출력 */
function renderDetailImages(product, colorFolder = "") {
  const images = productImages(product, colorFolder);
  const bigImage = document.querySelector("#bigImage");
  const thumbList = document.querySelector("#thumbList");

  bigImage.src = images[0];

  thumbList.innerHTML = images.map((src, index) => `
    <button class="thumb ${index === 0 ? "active" : ""}" data-src="${src}">
      <img src="${src}" onerror="this.closest('button').remove()">
    </button>
  `).join("");

  thumbList.querySelectorAll(".thumb").forEach(button => {
    button.onclick = () => {
      thumbList.querySelectorAll(".thumb").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      bigImage.src = button.dataset.src;
    };
  });
}

/* 상세창 열기 */
function openDetail(id) {
  currentProduct = PRODUCTS.find(product => product.id === id);
  if (!currentProduct) return;

  document.querySelector("#detailCategory").textContent = currentProduct.categoryName;
  document.querySelector("#detailName").textContent = currentProduct.name;
  document.querySelector("#detailPrice").textContent = currentProduct.price;
  document.querySelector("#detailDesc").textContent = currentProduct.desc;

  document.querySelector("#detailOption").innerHTML =
    currentProduct.options.map(option => `
      <option>${option}</option>
    `).join("");

  const colorBox = document.querySelector("#colorBox");
  const colorSelect = document.querySelector("#detailColor");

  if (currentProduct.colors.length) {
    colorBox.classList.remove("hidden");

    colorSelect.innerHTML = currentProduct.colors.map(color => `
      <option value="${color.folder}">${color.label}</option>
    `).join("");

    currentColorFolder = currentProduct.colors[0].folder;
    colorSelect.value = currentColorFolder;

    colorSelect.onchange = () => {
      currentColorFolder = colorSelect.value;
      renderDetailImages(currentProduct, currentColorFolder);
    };
  } else {
    colorBox.classList.add("hidden");
    colorSelect.innerHTML = "";
    currentColorFolder = "";
  }

  renderDetailImages(currentProduct, currentColorFolder);
  modal.classList.add("show");
}

/* 카테고리 탭 */
tabs.forEach(button => {
  button.onclick = () => {
    tabs.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.cat;

    // 열어둘 카테고리
    if (category === "bag" || category === "etc") {
      bagArea.classList.remove("hidden");
      readyArea.classList.add("hidden");
      renderProducts(category);
    } else {
      bagArea.classList.add("hidden");
      readyArea.classList.remove("hidden");
      readyTitle.textContent = button.textContent + " 상품 준비중";
    }
  };
});

/* 모달 닫기 */
document.querySelector("#closeModal").onclick = () => {
  modal.classList.remove("show");
};

document.querySelector("#modalBg").onclick = () => {
  modal.classList.remove("show");
};

/* 구매대행 신청에 상품 넣기 */
document.querySelector("#applyProduct").onclick = () => {
  if (!currentProduct) return;

  const option = document.querySelector("#detailOption").value;
  const color = currentProduct.colors.length
    ? document.querySelector("#detailColor").selectedOptions[0].textContent
    : "기본";

  document.querySelector("#selectedProduct").value =
    `${currentProduct.name} / ${currentProduct.price} / 색상: ${color} / 옵션: ${option}`;

  modal.classList.remove("show");
  location.hash = "request";
};
/* 우클릭 방지 */
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

/* 드래그 방지 */
document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});

/* 텍스트 선택 시작 방지 */
document.addEventListener("selectstart", function (event) {
  event.preventDefault();
});
/* 우클릭 / 드래그 / 선택 / 모바일 길게누르기 방지 */
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});

document.addEventListener("selectstart", function (event) {
  event.preventDefault();
});

document.addEventListener("touchstart", function (event) {
  if (event.target.tagName === "IMG") {
    event.target.style.webkitTouchCallout = "none";
  }
});

loadProducts();
/* 이미지 드래그 / 우클릭 방지 */
document.addEventListener("dragstart", e => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

document.addEventListener("contextmenu", e => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});