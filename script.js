let PRODUCTS = [];
let currentProduct = null;
let currentColorFolder = "";

const OPEN_CATEGORIES = ["bag", "shoes", "etc"];
const CATEGORY_NAMES = {
  bag: "가방",
  shoes: "신발",
  etc: "잡화"
};

// 상품이 아직 적거나 특정 세부분류 상품이 없어도
// 홈페이지에 세부 탭이 먼저 보이도록 고정 목록을 둡니다.
const SUBCATEGORY_MAP = {
  bag: ["전체", "토트백", "숄더백", "호보백", "크로스백", "백팩", "미니백", "쇼핑백", "볼링백", "기타가방"],
  shoes: ["전체", "스니커즈", "슬리퍼", "샌들", "로퍼", "부츠", "기타신발"],
  etc: ["전체", "지갑", "벨트", "모자", "선글라스", "스카프", "키링", "악세사리", "기타잡화"]
};

let currentCategory = "bag";
let currentSubCategory = "전체";

const bagArea = document.querySelector("#bagArea");
const readyArea = document.querySelector("#readyArea");
const readyTitle = document.querySelector("#readyTitle");
const tabs = document.querySelectorAll(".tabs button");
const subTabs = document.querySelector("#subTabs");
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

  const header = rows.shift().map(item =>
    item.trim().replace(/^\uFEFF/, "")
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
    subCategory: row.subCategory || "기타",
    name: row.name,
    price: row.price,
    shortDesc: row.shortDesc,
    desc: row.desc,
    folder: `assets/${row.folder}`,
    colors: parseColors(row.colors),
    options: row.options
      ? row.options.split("|").map(value => value.trim()).filter(Boolean)
      : ["상담 후 옵션 확인"],
    status: row.status || "show",
    reviewStatus: row.reviewStatus || "검수완료",
    sourceUrl: row.sourceUrl || ""
  };
}

/* 상품 불러오기 */
async function fetchCSVIfExists(path) {
  const response = await fetch(path + "?time=" + Date.now());
  if (!response.ok) {
    throw new Error(path + " 로드 실패");
  }
  return await response.text();
}

async function loadProducts() {
  try {
    /*
      v5부터 카테고리별 CSV를 우선 사용합니다.
      - data/products_bag.csv
      - data/products_shoes.csv
      - data/products_etc.csv
      예전 방식이 필요하면 products.csv로 자동 fallback 됩니다.
    */
    const categoryFiles = [
      "data/products_bag.csv",
      "data/products_shoes.csv",
      "data/products_etc.csv"
    ];

    let texts = [];

    try {
      texts = await Promise.all(categoryFiles.map(fetchCSVIfExists));
    } catch (splitError) {
      console.warn("카테고리별 CSV 로드 실패, products.csv로 fallback", splitError);
      texts = [await fetchCSVIfExists("products.csv")];
    }

    PRODUCTS = texts
      .flatMap(text => parseCSV(text))
      .map(normalizeProduct)
      .filter(product =>
        product.status !== "hide" &&
        product.reviewStatus !== "보류" &&
        product.reviewStatus !== "숨김" &&
        OPEN_CATEGORIES.includes(product.category) &&
        product.name &&
        product.folder
      );

    loading.classList.add("hidden");
    setCategory("bag", false);
  } catch (error) {
    loading.textContent =
      "상품 CSV를 불러오지 못했습니다. data 폴더의 카테고리별 CSV 또는 products.csv가 있는지 확인해주세요.";
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

/* 카테고리 열기 */
function setCategory(category, shouldScroll = true) {
  currentCategory = category;
  currentSubCategory = "전체";

  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.cat === category);
  });

  if (OPEN_CATEGORIES.includes(category)) {
    bagArea.classList.remove("hidden");
    readyArea.classList.add("hidden");
    renderSubCategories(category);
    renderProducts(category);
  } else {
    bagArea.classList.add("hidden");
    readyArea.classList.remove("hidden");
    readyTitle.textContent = `${CATEGORY_NAMES[category] || "상품"} 상품 준비중`;
  }

  if (shouldScroll) {
    document.querySelector("#shop")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* 세부 카테고리 버튼 출력 */
function renderSubCategories(category) {
  if (!subTabs) return;

  const preset = SUBCATEGORY_MAP[category] || ["전체"];
  const fromProducts = PRODUCTS
    .filter(product => product.category === category)
    .map(product => product.subCategory || "기타")
    .filter(Boolean);

  // 고정 세부 탭 + CSV에 새로 들어온 세부분류를 함께 표시합니다.
  const unique = Array.from(new Set([...preset, ...fromProducts]));

  subTabs.classList.remove("hidden");
  subTabs.innerHTML = `
    <div class="sub-tabs-label">세부카테고리</div>
    <div class="sub-tabs-buttons">
      ${unique.map(name => `
        <button class="${name === currentSubCategory ? "active" : ""}" data-sub="${name}">${name}</button>
      `).join("")}
    </div>
  `;

  subTabs.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      currentSubCategory = button.dataset.sub;
      subTabs.querySelectorAll("button").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      renderProducts(currentCategory);
    });
  });
}

/* 상품 목록 출력 */
function renderProducts(category) {
  const products = PRODUCTS
    .filter(product => product.category === category)
    .filter(product => currentSubCategory === "전체" || product.subCategory === currentSubCategory)
    .reverse();

  if (!products.length) {
    const categoryName = CATEGORY_NAMES[category] || "상품";

    bagArea.innerHTML = `
      <div class="ready">
        <h3>${categoryName} 상품 준비중</h3>
        <p>data 폴더의 카테고리별 CSV에 상품을 추가해주세요.</p>
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
          <p>${product.shortDesc}</p>
          <strong class="card-inquiry">상품 상세보기 ›</strong>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => openDetail(card.dataset.id));
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
    button.addEventListener("click", () => {
      thumbList.querySelectorAll(".thumb").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      bigImage.src = button.dataset.src;
    });
  });
}

/* 상세창 열기 */
function openDetail(id) {
  currentProduct = PRODUCTS.find(product => product.id === id);
  if (!currentProduct) return;

  document.querySelector("#detailCategory").textContent = currentProduct.categoryName;
  document.querySelector("#detailName").textContent = currentProduct.name;
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

/* 카테고리 탭 클릭 */
tabs.forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.cat, false);
  });
});

/* 메인 대문 카테고리 버튼 클릭 */
document.querySelectorAll(".hero-cat").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.targetCat, true);
  });
});

/* 모달 닫기 */
document.querySelector("#closeModal").onclick = () => {
  modal.classList.remove("show");
};

document.querySelector("#modalBg").onclick = () => {
  modal.classList.remove("show");
};

/* 구매대행 문의 */
document.querySelector("#applyProduct").onclick = () => {
  if (!currentProduct) return;

  const colorText = document.querySelector("#detailColor")?.selectedOptions?.[0]?.textContent || "";
  const optionText = document.querySelector("#detailOption")?.value || "";
  const message = [
    "구매대행 문의",
    `상품명: ${currentProduct.name}`,
    colorText ? `색상: ${colorText}` : "",
    optionText ? `옵션: ${optionText}` : ""
  ].filter(Boolean).join("%0A");

  window.open(`https://t.me/select_buying?text=${message}`, "_blank");

  modal.classList.remove("show");
};

/* 우클릭 / 드래그 / 선택 / 모바일 길게누르기 방지 */
document.addEventListener("contextmenu", event => {
  event.preventDefault();
});

document.addEventListener("dragstart", event => {
  event.preventDefault();
});

document.addEventListener("selectstart", event => {
  event.preventDefault();
});

document.addEventListener("touchstart", event => {
  if (event.target.tagName === "IMG") {
    event.target.style.webkitTouchCallout = "none";
  }
});

loadProducts();
