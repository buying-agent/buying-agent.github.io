ONE FOLDER SHOP WORKFLOW

1) Put saved HTML and the matching *_files folder into INPUT_HERE.
   Example:
   INPUT_HERE/product.html
   INPUT_HERE/product_files/big.jpg

2) Run 1_CLICK_JPG_TO_REVIEW.bat
   It copies JPG/JPEG only into review_images/folder01/image01.jpg ...

3) In review_images, delete images you do not use.
   Rename each product folder to match products.csv folder value.
   Example: bag01, bag02, shoes01, etc01

4) Run 2_CLICK_REVIEW_TO_SHOP_ASSETS.bat
   It creates:
   assets/bag01/main.jpg
   assets/bag01/detail01.jpg
   assets/bag01/detail02.jpg
   and also copies the same structure to uploads.

5) Open index.html to preview the shop.

IMPORTANT:
- The shop code reads images from assets/{folder}/main.jpg and detail01.jpg.
- The folder name must match the folder column in products.csv.
- Running step 1 resets review_images.
- Running step 2 resets assets and uploads.

[색상 폴더 입력 방법]
CSV의 colors 칸에 색상명:폴더명 형식으로 넣으면 해당 폴더 이미지로 자동 연결됩니다.
예: 블랙:a
예: 블랙:a|화이트:b|베이지:c
폴더 위치 예시: assets/bag04/a/main.jpg, assets/bag04/a/detail01.jpg
실수로 options 칸에 블랙:a 형식으로 넣어도 색상 선택으로 인식되게 수정했습니다.
