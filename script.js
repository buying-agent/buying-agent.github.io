let PRODUCTS = [];
let currentProduct = null;
let currentColorFolder = "";

const TELEGRAM_CHAT_URL = "https://t.me/select_buying";
const KAKAO_CHAT_URL = "https://pf.kakao.com/_xmxfnwX/chat";

const EMBEDDED_PRODUCTS_CSV = "id,category,categoryName,subCategory,name,price,shortDesc,desc,folder,colors,options,status,위안화,원화,모델번호,원가,판매가위안화,sourceUrl,originalTitle,originalDesc,reviewStatus\nbag01,bag,가방,백팩,데님 미니 백팩,\"구매가 540,000원\",최고급 브랜드 고유의 하이엔드한 감성,\"유행을 타지 않는 감각적인 데님 컬러로 제작되어 봄, 여름, 가을, 겨울 사계절 내내 데일리하게 매치하기 좋은 에센셜 아이템입니다.특유의 빈티지하면서도 정교한 디테일이 고급스러운 실루엣을 완성해 주며, 캐주얼룩부터 페미닌룩까지 다양한 스타일에 포인트 주기 좋습니다. 18x18cm의 실용적인 규격으로, 아담한 크기 대비 수납력이 우수해 일상적인 소지품을 여유 있게 수납할 수 있습니다. 높은 활용도와 독보적인 무드를 자랑하는 제품으로 적극 추천해 드립니다.MODEL NO: 1293 SIZE: 18 x 18 cm\",bag01,,블루 데님 / 미니|상담 후 옵션 확인,show,300,\"540,000\",1293,0원,,,,,검수완료\nbag02,bag,가방,볼링백,데님 볼링백,\"구매가 576,000원\",최고급 브랜드 고유의 하이엔드한 감성,\"탄탄하고 내구성이 뛰어난 데님 소재로 제작되어 일상생활에서 스크래치 걱정 없이 편안하게 착용하실 수 있으며, 캐주얼한 출근룩부터 격식 있는 데이트룩까지 어떤 스타일이든 완성도 높게 연출해 줍니다. 사계절 내내 구애받지 않는 감각적인 컬러감으로, 착용하는 순간 룩 전체에 고급스러운 분위기를 더해줍니다.시즌 리스 아이템으로 활용도가 높아 빠르게 품절될 수 있으니, 망설이지 마시고 미리 소장하시는 것을 적극 추천해 드립니다.MODEL NO: 1272 SIZE: 31 x 16 cm\",bag02,,상담 후 옵션 확인,show,320,\"576,000\",1272,0원,,,,,검수완료\nbag03,bag,가방,숄더백,체인 숄더백,\"구매가 666,000원\",포인트 주기 좋은 체인 숄더백입니다.,체인 스트랩 포인트가 있는 숄더백 스타일입니다. 상세페이지에서 디테일 사진을 확인할 수 있습니다.,bag03,,상담 후 옵션 확인,show,370,\"666,000\",,0원,,,,,검수완료\nbag04,bag,가방,미니백,투컬러 미니백,\"구매가 576,000원\",블랙/베이지 색상 선택이 가능한 미니백입니다.,상세페이지에서 색상을 선택하면 해당 색상의 이미지가 자동으로 변경됩니다.,bag04,블랙:black|베이지:beige,상담 후 옵션 확인,show,320,\"576,000\",,0원,,,,,검수완료\nbag05,bag,가방,토트백,다양한컬러 미니백,\"구매가 684,000원\",낮과 밤을 가리지 않고 언제 어디서나 독보적인 존재감을 드러내는 아이템,\"자유롭게 조절 및 탈부착이 가능한 레더 스트랩이 포함되어 있어 숄더백, 크로스백, 토트백까지 그날의 무드에 맞게 3-WAY로 다채롭게 연출하실 수 있습니다. 벨트나 안전화 등 작업용 툴웨어의 탄탄한 느낌을 선호하시는 분들께도 일상 속 감각적인 메인 포인트 백으로 부드럽게 매치하기 좋습니다. SIZE: 24 x 13 x 8 cm (가로 x 세로 x 폭)\",bag05,화이트:white|브라운:brown|다크브라운:darkbrown,상담 후 옵션 확인,show,380,\"684,000\",,48000원,240,,,,검수완료\nbag06,bag,가방,미니백,다양한컬러 미니백,\"구매가 630,000원\",네가지 색상 선택이 가능한 백입니다.,상세페이지에서 색상을 선택하면 해당 색상의 이미지가 자동으로 변경됩니다.,bag06,주황:black|핑크:brown|블랙:darkbrown|블루:white,상담 후 옵션 확인,show,350,\"630,000\",,51000원,255,,,,검수완료\nbag07,bag,가방,기타가방,주얼리의 우아함을 담다,\"구매가 693,000원\",세가지 색상 선택이 가능한 백입니다.,\"이 백의 가장 큰 반전 매력! 플랩(덮개)을 밖으로 꺼내면 클래식하고 우아한 무드로, 안으로 쏙 넣으면 시크하고 모던한 무드로 전혀 다른 두 가지 스타일링이 가능합니다. 사이즈: 27 × 18 × 9\",bag07,베이지:beige|블랙:black|레드:red,상담 후 옵션 확인 |작은 제품 사이즈 21.0 x 14.0 x 8.0 문의,show,385,\"693,000\",,70000원,350,,,,검수완료\nbag08,bag,가방,기타가방,예술품 같은 자개(Shell) 체인,\"구매가 684,000원\",네가지 색상 선택이 가능한 백입니다.,\"소가죽을 사용하여, 스크래치에 강하면서도 부드러운 터치감을 자랑합니다. 무너짐 없이 정교하게 잡힌 컴팩트한 바디 라인이 시크함을 더해줍니다.\",bag08,화이트:beige|블랙:black|핑크:pink|,상담 후 옵션 확인 |작은 제품 사이즈 22×12×8cm 문의,show,380,\"684,000\",,0원,,,,,검수완료\nbag09,bag,가방,기타가방,비교 불가한 하이퀄리티 포인트,\"구매가 522,000원\",네가지 색상 선택이 가능한 백입니다.,취향 저격 '리본 네임택' 디테일 이 가방의 가장 사랑스러운 반전 매력 포인트! 탈부착 가능한 네임택에 귀여운 리본 디테일이 더해져 클래식한 캐리올 백에 영하고 유니크한 감성을 불어넣었습니다.사이즈: 33.5 × 20.0 × 10.0 cm (가로 × 세로 × 폭),bag09,블랙:black|브라운:brown|멀티:multi|화이트:whiite,상담 후 옵션 확인,show,290,\"522,000\",,0원,,,,,검수완료\nbag10,bag,가방,기타가방,드로스트링 더스트백,\"구매가 630,000원\",일곱가지 색상 선택이 가능한 백입니다.,\"클래식한 위빙 디자인에 드로스트링 디테일이 더해진 복조리백입니다. 입구 부분의 자연스러운 주름감과 부드럽고 매끄러운 소재감이 어우러져 여유롭고 세련된 분위기를 연출해줍니다. 가벼운 무게감에 수납력도 넉넉해 데일리백으로 활용하기 좋으며, 편안하면서도 고급스러운 스타일링에 잘 어울리는 아이템입니다. 사이즈는 30 × 10 × 23cm입니다.\",bag10,베이지:beige|블랙:black|브라운:brown|다크브라운:darkbrown|핑크:pink|레드:red|하늘:skyblue,상담 후 옵션 확인,show,350,\"630,000\",,70000원,350,,,,검수완료\nbag11,bag,가방,토트백,펀칭 라운드 토트백,\"구매가 585,000원\",,\"라운드 패턴의 펀칭 디테일이 돋보이는 토트백입니다. 입체감 있는 컷아웃 디자인으로 가볍고 산뜻한 분위기를 연출해주며, 고급스러운 소가죽 소재감이 더해져 탄탄하고 세련된 느낌을 줍니다. 손에 들기 좋은 토트백으로도, 스트랩을 활용한 크로스백으로도 연출할 수 있어 데일리룩과 포인트 코디에 다양하게 활용하기 좋습니다. 사이즈는 25 × 20 × 12cm입니다.\",bag11,블랙:black|화이트:whiite,상담 후 옵션 확인,show,325,\"585,000\",,65000원,325,,,,검수완료\nbag12,bag,가방,토트백,펀칭 라운드 토트백,\"구매가 504,000원\",네가지 색상 선택이 가능한 백입니다.,\"라운드 패턴의 펀칭 디테일이 돋보이는 토트백입니다. 입체감 있는 컷아웃 디자인으로 가볍고 산뜻한 분위기를 연출해주며, 고급스러운 소가죽 소재감이 더해져 탄탄하고 세련된 느낌을 줍니다. 손에 들기 좋은 토트백으로도, 스트랩을 활용한 크로스백으로도 연출할 수 있어 데일리룩과 포인트 코디에 다양하게 활용하기 좋습니다. 사이즈는 25 × 20 × 12cm입니다. 상품번호는 6686입니다.\",bag12,블랙:black|브라운:brown|핑크:pink|화이트:whiite,상담 후 옵션 확인,show,280,\"504,000\",,62000원,310,,,,검수완료\nbag13,bag,가방,토트백,라인업 토트 크로스백,\"구매가 756,000원\",,\"고급스러운 소재감과 깔끔한 실루엣이 돋보이는 토트 겸 크로스백입니다. 은은한 포인트 디테일이 더해져 세련된 분위기를 연출해주며, 23 × 22cm 사이즈로 데일리로 들기 부담 없는 크기감입니다. 손에 들기 좋은 토트백으로도, 스트랩을 활용한 크로스백으로도 연출할 수 있어 다양한 코디에 활용하기 좋은 아이템입니다.\",bag13,,상담 후 옵션 확인,show,420,\"756,000\",,84000원,420,,,,검수완료\nbag14,bag,가방,토트백,스몰 쇼핑 토트백,\"구매가 576,000원\",두가지 색상,\"업그레이드된 디자인으로 선보이는 스몰 사이즈 쇼핑 토트백입니다. 깔끔한 실루엣과 정교한 마감이 돋보이며, 29 × 25 × 14cm 사이즈로 데일리 소지품을 넣기 좋은 실용적인 크기감입니다. 손에 들기 좋은 쇼핑백 스타일로 가볍게 매치하기 좋고, 데일리룩에 자연스럽게 어울리는 아이템입니다.\",bag14,블랙:black|브라운:brown,상담 후 옵션 확인,show,320,\"576,000\",,64000원,320,,,,검수완료\nbag15,bag,가방,토트백,미니 보스턴 토트백,\"구매가 446,400원\",,\"미니 사이즈로 들기 좋은 보스턴 스타일 토트백입니다. 부드러운 소가죽 소재감과 탄탄한 실루엣이 돋보이며, 22cm 크기로 데일리 소지품을 가볍게 담기 좋은 아이템입니다. 손에 들기 좋은 디자인으로 캐주얼룩부터 여성스러운 코디까지 자연스럽게 매치하기 좋습니다. 한정 수량으로 진행되는 클리어런스 상품입니다.\",bag15,,상담 후 옵션 확인,show,248,\"446,400\",,49600원,248,,,,검수완료\nbag16,bag,가방,토트백,레더 미니 버킷백,\"구매가 612,000원\",,\"깔끔한 실루엣과 부드러운 소가죽 소재감이 돋보이는 미니 버킷백입니다. 20 × 18cm 사이즈로 작지만 수납력이 좋아 데일리 소지품을 담기 좋으며, 손에 들기 좋은 토트백으로도 스트랩을 활용한 크로스백으로도 연출할 수 있습니다. 매끄러운 가죽 질감과 섬세한 디테일이 더해져 데일리룩에 고급스러운 포인트를 주기 좋은 아이템입니다.\",bag16,,상담 후 옵션 확인,show,340,\"612,000\",,68000원,340,,,,검수완료\nbag17,bag,가방,미니백,소프트 레더 미니 버킷백,\"구매가 585,000원\",,\"부드럽고 유연한 양가죽 소재감이 돋보이는 미니 버킷백입니다. 드로스트링 입구 디자인으로 자연스러운 주름감이 연출되며, 자석 버튼 여밈으로 간편하게 사용할 수 있습니다. 26 × 18 × 12.5cm 사이즈로 데일리 소지품을 담기 좋은 실용적인 크기감이며, 가볍고 여성스러운 분위기로 다양한 코디에 매치하기 좋은 아이템입니다.\",bag17,,상담 후 옵션 확인,show,325,\"585,000\",,65000원,325,,,,검수완료\nbag18,bag,가방,토트백,모노그램 이스트 웨스트 토트백,\"구매가 630,000원\",,\"도시적인 출퇴근룩에 잘 어울리는 이스트 웨스트 스타일의 토트백입니다. 모노그램 패턴 캔버스와 가죽 트리밍 조합으로 고급스러운 분위기를 더했으며, 내부 포켓과 여유 있는 수납공간으로 휴대폰, 카드지갑 등 데일리 소지품 보관이 편리합니다. 포인트 잠금 장식으로 세련된 디테일을 완성했습니다. 모델번호 163c01 칩 내장 반스틸 하드웨어 사이즈 29 x 14 x 8cm\",bag18,,상담 후 옵션 확인,show,350,\"630,000\",,120000원,600,,,,검수완료\nbag19,bag,가방,기타가방,다미에 아주르 보스턴백 30,\"구매가 630,000원\",,다미에 아주르 보스턴백 30,bag19,,상담 후 옵션 확인,show,350,\"630,000\",,140000원,700,,,,검수완료\nbag20,bag,가방,기타가방,블룸 체인 월렛백,\"구매가 450,000원\",,\"세련되고 실용적인 구조가 돋보이는 체인 월렛백입니다. 부드러운 가죽 소재로 제작되어 고급스러운 분위기를 더했으며, 클래식한 모노그램 패턴에서 영감을 받은 장식 디테일이 포인트가 됩니다. 스마트폰과 데일리 소지품을 보관하기 좋은 수납공간을 갖췄고, 대비감 있는 메탈 장식으로 우아한 무드를 완성했습니다. 모델번호 M14564 블랙, M14547 블루, M14581 베이지, M14548 로즈 모델번호 163c01 칩 내장 반스틸 하드웨어 전체 가죽 사이즈 11.5 x 4 x 20cm\",bag20,베이지:beige|블랙:black|레드:red|화이트:white,상담 후 옵션 확인,show,250,\"450,000\",,84000원,420,,,,검수완료\nbag21,bag,가방,토트백,파라슈트 미니 토트백,\"구매가 666,000원\",,\"클래식한 위빙 패턴과 매듭 디테일이 돋보이는 파라슈트 스타일의 미니 토트백입니다. 탈부착 가능한 숄더 스트랩이 있어 크로스백, 토트백, 숄더백 등 다양한 방식으로 연출할 수 있으며, 컴팩트한 사이즈감으로 데일리룩에 가볍게 매치하기 좋습니다. 모델번호 S0211 사이즈 16.5 x 21 x 17cm\",bag21,,색상 상담 후 옵션 확인,show,370,\"666,000\",,74000원,370,,,,검수완료\nbag22,bag,가방,토트백,파라슈트 라지 토트백,\"구매가 720,000원\",,\"여유 있는 수납공간과 감각적인 실루엣이 돋보이는 파라슈트 스타일의 라지 토트백입니다. 내부에는 탈부착 가능한 지퍼 포켓이 구성되어 실용성을 높였으며, 작은 노트북이나 아이패드 등 데일리 소지품을 넉넉하게 보관하기 좋습니다. 넓은 공간감에도 착용 시 부해 보이지 않아 데일리백으로 활용하기 좋은 아이템입니다. 모델번호 S0211-1 사이즈 26 x 30 x 20cm\",bag22,,색상 상담 후 옵션 확인,show,400,\"720,000\",,86000원,430,,,,검수완료\nbag23,bag,가방,토트백,메탈 체인 안디아모 토트백,\"구매가 648,000원\",,클래식한 안디아모 스타일에 메탈 체인 디테일을 더한 토트백입니다. 고급스러운 위빙 패턴과 세련된 체인 포인트가 어우러져 데일리룩부터 포멀한 스타일링까지 다양하게 매치하기 좋습니다. 적당한 수납공간과 안정적인 쉐입으로 실용성과 분위기를 함께 갖춘 아이템입니다. 모델번호 S05022-1 사이즈 20 x 25 x 10cm,bag23,,색상 상담 후 옵션 확인,show,360,\"648,000\",,72000원,360,,,,검수완료\nbag24,bag,가방,백팩,캔버스 미니 백팩,\"구매가 450,000원\",,\"가볍고 부담 없이 착용하기 좋은 캔버스 소재의 백팩입니다. 컴팩트하면서도 실용적인 수납공간을 갖춰 데일리백으로 활용하기 좋으며, 둔탁하지 않은 깔끔한 실루엣으로 캐주얼룩에 자연스럽게 매치됩니다. 사이즈 대형 29.5 x 25 x 12.5cm, 소형 22 x 18 x 11.5cm\",bag24,작은가방:beige|큰가방:black,\"상담 후 옵션 확인 큰가방 594,000\",show,250,\"450,000\",,64000원,320,,,,검수완료\nbag25,bag,가방,토트백,마들렌 BB 모노그램 토트백,\"구매가 648,000원\",,\"클래식 모노그램 캔버스 소재로 제작되어 실용성과 우아한 분위기를 함께 담은 마들렌 BB 핸드백입니다. 플랩 디자인과 핸들, 키 파우치 디테일이 가죽 트리밍과 조화를 이루며, 포인트가 되는 S-lock 잠금 장식으로 클래식한 무드를 더했습니다. 상급 원단과 반강도 하드웨어, 내장 칩 적용 제품입니다. 사이즈: 24.5 x 16 x 8cm\",bag25,브라운:brown|다크브라운:darkbrown,상담 후 옵션 확인,show,360,\"648,000\",,130000원,650,,,,검수완료\nbag26,bag,가방,크로스백,미니그램 올 인 BB 버킷백,\"구매가 684,000원\",,\"미니그램 라인의 올 인 BB 백으로, 새로운 컬러감이 돋보이는 제품입니다. 부드럽고 매끄러운 소가죽 소재로 제작되었으며, 섬세한 시그니처 패턴이 고급스러운 분위기를 더해줍니다. 버킷백 형태의 실루엣에 사이드 주소 태그와 자물쇠 디테일을 더해 포인트를 주었고, 넉넉한 수납공간으로 데일리 소지품을 보관하기 좋습니다. 탈부착 가능한 숄더 스트랩으로 숄더백과 크로스백 등 다양한 방식으로 연출할 수 있습니다. 반강도 하드웨어와 칩 디테일 적용 제품입니다. 사이즈: 16 x 18 x 12cm\",bag26,베이지:beige|핑크:pink,상담 후 옵션 확인,show,380,\"684,000\",,138000원,690,,,,검수완료\nbag27,bag,가방,호보백,호보 블랙 나일론 방수 데일리백,\"구매가 540,000원\",,\"블랙 나일론 방수 원단으로 제작되어 가볍고 실용적인 데일리백입니다. 30×25cm 사이즈로 일상 소지품 수납에 좋으며, 숄더 스트랩과 손잡이 동일한 나일론 소재로 제작되었습니다. 누구에게나 잘 어울리는 깔끔한 호보백 디자인입니다.\",bag27,,상담 후 옵션 확인,show,300,\"540,000\",,46000원,230,,,,검수완료\nbag28,bag,가방,크로스백,빈티지 스웨이드 필로우백,\"구매가 648,000원\",,\"빈티지한 무드가 돋보이는 필로우백입니다. 전체 바디가 올가죽 소재로 제작되었으며, 부드러운 촉감의 스웨이드 가죽으로 고급스러운 느낌을 더했습니다. 28cm의 활용도 좋은 황금 사이즈로 데일리하게 들기 좋고, 숄더 스트랩이 있어 크로스백으로도 착용 가능합니다.\",bag28,브라운:brown|다크브라운:darkbrown,상담 후 옵션 확인,show,360,\"648,000\",,72000원,360,,,,검수완료\nbag29,bag,가방,크로스백,빈티지 스웨이드 필로우백,\"구매가 576,000원\",,\"빈티지한 무드가 돋보이는 필로우백입니다. 전체 바디가 올가죽 소재로 제작되었으며, 부드러운 촉감의 스웨이드 가죽으로 고급스러운 느낌을 더했습니다. 28cm의 활용도 좋은 황금 사이즈로 데일리하게 들기 좋고, 숄더 스트랩이 있어 크로스백으로도 착용 가능합니다.\",bag29,,상담 후 옵션 확인,show,320,\"576,000\",,64000원,320,,,,검수완료\nbag30,bag,가방,쇼핑백,클래식 빈티지 쇼핑백,\"구매가 594,000원\",,\"클래식 라인의 빈티지한 무드가 돋보이는 쇼핑백입니다. 감성적인 레트로 디자인에 여유로운 실루엣이 더해져 데일리하게 들기 좋으며, 고급스러운 첫층 소가죽 소재로 제작되어 퀄리티가 뛰어난 버전입니다. 숄더 스트랩은 길이 조절이 가능해 숄더백은 물론 크로스백으로도 착용 가능합니다. 사이즈는 32×34×15cm이며, 입구 너비는 42cm입니다.\",bag30,,상담 후 옵션 확인,show,330,\"594,000\",,64000원,320,,,,검수완료\nbag31,bag,가방,숄더백,체크 체인 미니 숄더백,\"구매가 648,000원\",,\"클래식한 체크 패턴에 골드 체인 디테일을 더한 미니 숄더백입니다. 작은 사이즈지만 포인트 아이템으로 활용하기 좋고, 데일리룩부터 여성스러운 코디까지 자연스럽게 매치됩니다. 체인 스트랩으로 고급스러운 분위기를 살렸으며 가볍게 들기 좋은 미니백 스타일입니다.\",bag31,,상담 후 옵션 확인,show,360,\"648,000\",,72000원,360,360,,,검수완료\nbag32,bag,가방,기타가방,포인트 나일론 슬링백,\"구매가 810,000원\",,\"깔끔한 블랙 컬러에 로고 밴드 포인트가 더해진 슬링백입니다. 가볍고 실용적인 나일론 소재감으로 데일리 착용에 좋으며, 허리백 또는 크로스백 스타일로 활용할 수 있습니다. 심플한 디자인에 포인트 스트랩 디테일이 더해져 캐주얼룩과 스트릿 코디에 자연스럽게 매치됩니다.\",bag32,,상담 후 옵션 확인,show,450,\"810,000\",,90000원,450,450,,,검수완료\nbag33,bag,가방,기타가방,포인트 나일론 슬링백,\"구매가 810,000원\",,\"깔끔한 블랙 컬러에 로고 밴드 포인트가 더해진 슬링백입니다. 가볍고 실용적인 나일론 소재감으로 데일리 착용에 좋으며, 허리백 또는 크로스백 스타일로 활용할 수 있습니다. 심플한 디자인에 포인트 스트랩 디테일이 더해져 캐주얼룩과 스트릿 코디에 자연스럽게 매치됩니다.\",bag33,,상담 후 옵션 확인,show,450,\"810,000\",,90000원,450,450,,,검수완료\nbag34,bag,가방,기타가방,클래식한 체크 패턴 슬링백,\"구매가 810,000원\",,\"클래식한 체크 패턴과 로고 밴드 포인트가 돋보이는 슬링백입니다. 넓은 스트랩으로 안정감 있게 착용할 수 있으며, 가볍게 들기 좋은 사이즈로 데일리 코디에 활용하기 좋습니다. 캐주얼룩이나 스트릿 무드의 스타일링에 포인트 아이템으로 매치하기 좋습니다.\",bag34,,상담 후 옵션 확인,show,450,\"810,000\",,90000원,450,650,,,검수완료\nbag35,bag,가방,크로스백,심플 레더 미니 크로스백,\"구매가 1,170,000원\",,\"깔끔한 블랙 컬러와 군더더기 없는 사각 쉐입이 돋보이는 미니 크로스백입니다. 전면 포켓 디테일로 실용성을 더했으며, 가벼운 사이즈감으로 데일리 착용에 좋습니다. 캐주얼룩부터 미니멀한 코디까지 자연스럽게 매치하기 좋은 아이템입니다.\",bag35,,상담 후 옵션 확인,show,650,\"1,170,000\",,130000원,650,,,,검수완료\nbag36,bag,가방,토트백,투주르 버티컬 양면 토트백 스몰,\"구매가 612,000원\",,\"부드러운 투톤 카프스킨 소재의 버티컬 스몰백으로, 블랙과 트렌치 베이지 양면 연출이 가능하며 탈부착 참 장식과 숄더 스트랩으로 다양한 스타일링이 가능합니다.사이즈18.5×18.5×12cm\",bag36,,상담 후 옵션 확인,show,340,\"612,000\",,68000원,340,,,,검수완료\nbag37,bag,가방,숄더백,가을/겨울 신상 소가죽 숄더백,\"구매가 594,000원\",,\"부드러운 1층 소가죽 소재에 조절 가능한 숄더 스트랩을 더한 33 × 20cm 사이즈의 가을/겨울 신상백으로, 회전식 메탈 버클 포인트가 돋보이는 아이템입니다.\",bag37,블랙:black|브라운:brown,상담 후 옵션 확인,show,330,\"594,000\",,66000원,330,,,,검수완료\nshoes01,shoes,신발,스니커즈,빈티지 스타 스니커즈,\"구매가 162,000원\",,\"빈티지한 무드의 워싱 디테일이 돋보이는 캐주얼 스니커즈입니다. 수작업 느낌의 자연스러운 사용감 표현과 탄탄한 마감으로 포인트 있는 스타일을 연출하기 좋습니다. 내부는 부드러운 착화감을 고려한 소재로 구성되었으며, 약 3.5cm 키높이 인솔은 탈부착이 가능해 취향에 따라 조절할 수 있습니다. 캐주얼룩, 데님룩, 데일리 코디에 잘 어울리는 활용도 높은 스니커즈입니다. 상품번호는 2533022입니다.\",shoes01,,상담 후 옵션 확인,show,90,\"162,000\",,36000원,180,,,,검수완료\nshoes02,shoes,신발,스니커즈,커스텀 로우 스니커즈,\"구매가 198,000원\",,\"데일리로 신기 좋은 로우탑 캐주얼 스니커즈입니다. 깔끔한 실루엣과 안정적인 착화감이 돋보이며, 디테일한 자수 포인트와 정돈된 마감으로 완성도를 높인 아이템입니다. 부담 없이 다양한 코디에 매치하기 좋고, 캐주얼룩이나 스트릿룩에 자연스럽게 어울리는 활용도 높은 스니커즈입니다. 상품번호는 JP1628 019 / 2538224입니다.\",shoes02,,상담 후 옵션 확인,show,110,\"198,000\",,40000원,200,,,,검수완료\nshoes03,shoes,신발,스니커즈,로우탑 트레이너 스니커즈,\"구매가 360,000원\",,\"데일리로 신기 좋은 로우탑 캐주얼 스니커즈입니다. 스포티하면서도 깔끔한 디자인으로 캐주얼룩, 스트릿룩, 데님 코디에 자연스럽게 어울리며 사계절 활용하기 좋은 아이템입니다. 안정적인 실루엣과 편안한 착화감으로 일상에서 부담 없이 착용하기 좋습니다. 사이즈는 36부터 46까지 선택 가능합니다. 상품번호는 HL581400618 / 06JXD778A18입니다.\",shoes03,,상담 후 옵션 확인,show,200,\"360,000\",,48000원,240,,,,검수완료\nshoes04,shoes,신발,스니커즈,로우탑 트레이너 스니커즈,\"구매가 360,000원\",,\"캐주얼한 디자인과 스포티한 분위기가 돋보이는 로우탑 트레이너 스니커즈입니다. 깔끔한 실루엣으로 데님, 조거팬츠, 캐주얼룩에 자연스럽게 매치하기 좋으며, 데일리로 부담 없이 착용하기 좋은 아이템입니다. 다양한 스타일에 활용하기 좋은 기본 스니커즈로 사계절 코디에 잘 어울립니다. 사이즈는 37부터 45까지 선택 가능합니다. 상품번호는 D49260615입니다.\",shoes04,,상담 후 옵션 확인,show,200,\"360,000\",,44000원,220,,,,검수완료\nshoes05,shoes,신발,스니커즈,빈티지 스타 스니커즈,\"구매가 162,000원\",,\"빈티지한 무드의 워싱 디테일이 돋보이는 캐주얼 스니커즈입니다. 수작업 느낌의 자연스러운 사용감 표현과 탄탄한 마감으로 포인트 있는 스타일을 연출하기 좋습니다. 내부는 부드러운 착화감을 고려한 소재로 구성되었으며, 약 3.5cm 키높이 인솔은 탈부착이 가능해 취향에 따라 조절할 수 있습니다. 캐주얼룩, 데님룩, 데일리 코디에 잘 어울리는 활용도 높은 스니커즈입니다. 상품번호는 2533022입니다.\",shoes05,,상담 후 옵션 확인,show,90,\"162,000\",,36000원,180,,,,검수완료\nshoes06,shoes,신발,스니커즈,메쉬 러닝 스니커즈,\"구매가 162,000원\",,\"통기성 좋은 메쉬 소재가 적용된 캐주얼 러닝 스니커즈입니다. 가볍고 편안한 착화감으로 데일리 슈즈로 활용하기 좋으며, 쿠션감 있는 미드솔이 더해져 장시간 착용에도 부담을 줄여줍니다. 심플하면서도 스포티한 디자인으로 캐주얼룩, 스트릿룩, 운동복 코디에 자연스럽게 어울리는 아이템입니다. 사이즈는 36부터 48까지 선택 가능합니다. 상품번호는 NI7433 / D19240611입니다.\",shoes06,,상담 후 옵션 확인,show,90,\"162,000\",,40000원,200,,,,검수완료\nshoes07,shoes,신발,슬리퍼,레더 플랫 슬리퍼,\"구매가 198,000원\",,\"봄 시즌 가볍게 착용하기 좋은 플랫 슬리퍼입니다. 부드러운 양가죽 소재가 사용되어 발에 닿는 착화감이 편안하며, 폭신한 질감과 깔끔한 실루엣이 돋보입니다. 앞부분의 포인트 장식과 자수 디테일이 더해져 세련된 분위기를 연출해주며, 데일리룩이나 여성스러운 코디에 자연스럽게 매치하기 좋은 아이템입니다. 미끄럼 방지와 내구성을 고려한 고무 밑창으로 실용성도 갖췄습니다.\",shoes07,베이지:beige|화이트:whiite,상담 후 옵션 확인,show,110,\"198,000\",,56000원,280,,,,검수완료\nshoes08,shoes,신발,슬리퍼,레더 플랫 슬리퍼,\"구매가 270,000원\",,\"봄 시즌 가볍게 착용하기 좋은 플랫 슬리퍼입니다. 부드러운 양가죽 소재와 폭신한 착화감이 돋보이며, 발에 닿는 느낌이 편안해 데일리로 신기 좋은 아이템입니다. 심플한 단색 디자인에 포인트 장식과 자수 디테일이 더해져 세련된 분위기를 연출해주며, 여성스럽고 고급스러운 코디에 자연스럽게 어울립니다. 미끄럼 방지와 내구성을 고려한 고무 밑창으로 실용성도 갖췄습니다.\",shoes08,블랙:black|브라운:brown,상담 후 옵션 확인,show,150,\"270,000\",,64000원,320,,,,검수완료\nshoes09,shoes,신발,슬리퍼,썸머 플립플랍 슬리퍼,\"구매가 252,000원\",,\"봄여름 시즌 가볍게 착용하기 좋은 플립플랍 스타일 슬리퍼입니다. 발등을 편하게 잡아주는 심플한 디자인으로 데일리룩, 휴양지룩, 캐주얼 코디에 자연스럽게 매치하기 좋습니다. 가볍고 편안한 착화감으로 부담 없이 신기 좋으며, 여름철 데일리 슈즈로 활용도 높은 아이템입니다.\",shoes09,,상담 후 옵션 확인,show,140,\"252,000\",,48000원,240,,,,검수완료\nshoes10,shoes,신발,샌들,구두와샌들,\"구매가 288,000원\",,다양한신발,shoes10,,상담 후 옵션 확인,show,160,\"288,000\",,0원,,,,,검수완료\nshoes11,shoes,신발,기타신발,크리스탈 장식 스트랩 힐,\"구매가 450,000원\",,\"은은한 광택감의 실크 소재와 섬세한 크리스탈 장식 버클이 돋보이는 스트랩 힐입니다. 슬림하고 우아한 라인으로 세련된 분위기를 연출해주며, 양가죽 인솔과 가죽 아웃솔 구성으로 착화감을 높였습니다. 특별한 날 포인트 슈즈로 활용하기 좋은 아이템입니다. 굽높이 10.5cm, 7.5cm 맞춤 가능 맞춤 제작 상품은 교환 및 반품 불가\",shoes11,블랙:black|핑크:pink|하늘색:skyblue|흰색:white|옐로우:yellow,상담 후 옵션 확인,show,250,\"450,000\",,98000원,490,,,,검수완료\nshoes12,shoes,신발,기타신발,크리스탈 장식 스트랩 힐,\"구매가 414,000원\",,\"은은한 광택감의 실크 소재와 섬세한 크리스탈 장식 버클이 돋보이는 스트랩 힐입니다. 슬림하고 우아한 라인으로 세련된 분위기를 연출해주며, 양가죽 인솔과 가죽 아웃솔 구성으로 착화감을 높였습니다. 특별한 날 포인트 슈즈로 활용하기 좋은 아이템입니다. 굽높이 7.5cm, 10.5cm 맞춤 가능 맞춤 제작 상품은 교환 및 반품 불가\",shoes12,블랙:black|핑크:pink|하늘색:skyblue|흰색:white|옐로우:yellow,상담 후 옵션 확인,show,230,\"414,000\",,94000원,470,,,,검수완료\nshoes13,shoes,신발,기타신발,로고 포인트 벨벳 슬링백 힐,\"구매가 360,000원\",,\"클래식한 로고 포인트가 돋보이는 슬링백 스타일의 힐입니다. 뒤꿈치를 눌러 뮬처럼 착용할 수 있어 한 가지 슈즈로 두 가지 연출이 가능하며, 팬츠와 스커트 모두 자연스럽게 매치하기 좋습니다. 벨벳 또는 패브릭 소재의 갑피와 은은한 실버 포인트, 슬림한 키튼힐 라인이 어우러져 우아하면서도 세련된 분위기를 완성합니다. 가죽 아웃솔 구성으로 고급스러운 착화감을 더했습니다. 굽높이 8.5cm\",shoes13,베이지:beige|블루:blue|브라운:brown|그린:green|레드:red,상담 후 옵션 확인,show,200,\"360,000\",,88000원,440,,,,검수완료\nshoes14,shoes,신발,기타신발,메쉬 포인트 미들힐,\"구매가 324,000원\",,\"섬세한 메쉬 소재와 고급스러운 메탈 버클 디테일이 돋보이는 미들힐입니다. 안정감 있는 4.5cm 굽으로 편안한 착화감을 주며, 데님 팬츠부터 자켓, 스커트까지 다양한 스타일에 자연스럽게 매치하기 좋습니다. 양가죽 안감과 가죽 아웃솔 구성으로 완성도를 높였습니다. 굽높이 4.5cm 맞춤 제작 사이즈는 교환 및 반품 불가\",shoes14,,색상 상담 후 옵션 확인,show,180,\"324,000\",,84000원,420,,,,검수완료\nshoes15,shoes,신발,기타신발,여성구두,\"구매가 360,000원\",,,shoes15,,색상 상담 후 옵션 확인,show,200,\"360,000\",,116000원,580,,,,검수완료\nshoes16,shoes,신발,샌들,여성샌들,\"구매가 324,000원\",,,shoes16,,색상 상담 후 옵션 확인,show,180,\"324,000\",,96000원,480,,,,검수완료\netc01,etc,잡화,기타잡화,리본 포인트 아이템,\"구매가 180,000원\",,\"귀여운 리본 실루엣이 돋보이는 디자인으로, 작지만 확실한 포인트를 줄 수 있는 상품입니다. 부드러운 양가죽 소재감과 섬세한 자수 디테일이 더해져 고급스러운 분위기를 연출해줍니다. 가방이나 소지품에 포인트로 매치하기 좋고, 선물용으로도 추천드리는 아이템입니다. 사이즈: 11.5 × 9 × 2cm\",etc01,핑크:pink|화이트:white,추가색상 상담 후 옵션 확인,show,100,\"180,000\",,31000원,155,,,,검수완료\netc02,etc,잡화,기타잡화,고급스러운 자수 포인트,\"구매가 216,000원\",,\"부드러운 양가죽 소재감과 섬세한 자수 디테일이 돋보이는 리본 포인트 아이템입니다. 사랑스러운 디자인에 고급스러운 분위기가 더해져 가방이나 소지품에 포인트로 매치하기 좋으며, 데일리용과 선물용 모두 추천드립니다. 사이즈는 19.5 × 10.5 × 3cm입니다.\",etc02,베이지:beige|레드:red,추가색상 상담 후 옵션 확인,show,120,\"216,000\",,33000원,165,,,,검수완료\netc03,etc,잡화,기타잡화,모노그램 캔버스 워시백,\"구매가 360,000원\",,\"클래식한 모노그램 캔버스 패턴이 돋보이는 워시백입니다. 조절 가능한 숄더 스트랩이 있어 파우치백처럼 연출할 수 있으며, 내부에는 카드 수납공간과 립스틱 포켓이 있어 작은 소지품을 깔끔하게 정리하기 좋습니다. 세척이 쉬운 안감 소재로 실용성을 더했으며, 핸드백 안에 넣기 좋은 사이즈감으로 데일리 파우치나 여행용 세면 파우치로 활용하기 좋은 아이템입니다.\",etc03,블랙:black|화이트:white,추가색상 상담 후 옵션 확인,show,200,\"360,000\",,31000원,155,,,,검수완료\netc04,etc,잡화,지갑,미니 동전지갑,\"구매가 216,000원\",,\"입체감 있는 캐비어 텍스처의 소가죽 소재가 돋보이는 미니 동전지갑입니다. 작고 가벼운 사이즈로 휴대성이 좋으며, 카드나 동전, 작은 소지품을 간편하게 보관하기 좋습니다. 블랙 컬러에 실버 포인트 장식이 더해져 깔끔하고 세련된 분위기를 연출해줍니다. 사이즈는 11.3 × 7.5 × 2.1cm입니다.\",etc04,블랙:black|엘로우:yellow,추가색상 상담 후 옵션 확인,show,120,\"216,000\",,28000원,140,,,,검수완료\netc05,etc,잡화,지갑,카드지갑,\"구매가 117,000원\",,\"심플하고 차분한 디자인에 클래식한 위빙 디테일이 더해진 카드지갑입니다. 부드럽고 섬세한 촉감이 느껴지는 소재감으로 손에 쥐었을 때 만족감이 좋으며, 얇은 두께감으로 가방이나 주머니 안에서도 부담 없이 휴대하기 좋습니다. 신분증, 카드, 명함 등 필요한 소지품을 간편하게 수납하기 좋은 실용적인 아이템입니다. 사이즈는 10.5 × 8 × 0.5cm입니다.\",etc05,블랙:black|브라운:brown,추가색상 상담 후 옵션 확인,show,65,\"117,000\",,20000원,100,,,,검수완료\netc06,etc,잡화,키링,마이야르 아이스크림 고양이 키링,\"구매가 108,000원\",,아이스크림을 든 고양이 디자인이 귀여운 포인트 키링입니다.,etc06,,상담 후 옵션 확인,show,60,\"108,000\",,16000원,80,,,,검수완료\netc07,etc,잡화,벨트,40mm벨트,\"구매가 288,000원\",,모델번호 66011896,etc07,블랙:black|실버:silver,색상 상담 후 옵션 확인,show,160,\"288,000\",,76000원,380,,,,검수완료\netc08,etc,잡화,벨트,여성용 벨트 18mm,\"구매가 288,000원\",,모델번호 242455,etc08,,상담 후 옵션 확인,show,160,\"288,000\",,72000원,360,,,,검수완료\netc09,etc,잡화,벨트,여성용 벨트 32mm,\"구매가 288,000원\",,모델번호 66011523,etc09,베이지:beige|블랙:black|브라운:brown,상담 후 옵션 확인,show,160,\"288,000\",,76000원,380,,,,검수완료\netc10,etc,잡화,기타잡화,클로버 포인트 5모티브 팔찌,\"구매가 298,800원\",,여성스러운 무드가 돋보이는 클로버 포인트 체인 팔찌입니다. 다섯 개의 플라워형 모티브가 손목을 따라 자연스럽게 이어져 단독 착용은 물론 다른 팔찌와 레이어드하기에도 좋습니다. 데일리룩부터 특별한 날 스타일링까지 은은하게 포인트 주기 좋은 아이템입니다.,etc10,,상담 후 옵션 확인,show,166,\"298,800\",,84000원,420,,,,검수완료\netc11,etc,잡화,선글라스,데일리 오버핏 선글라스,\"구매가 298,800원\",,\"트렌디한 감성과 세련된 실루엣이 돋보이는 데일리 선글라스입니다. 다양한 스타일에 부담 없이 매치하기 좋으며, 캐주얼룩부터 포멀한 코디까지 자연스럽게 어울립니다. 얼굴형을 부드럽게 커버해 주는 디자인으로 데일리 아이템은 물론 여행이나 휴양지에서도 포인트 아이템으로 활용하기 좋습니다.\",etc11,,상담 후 옵션 확인,show,166,\"298,800\",,,,,,,검수완료\netc12,etc,잡화,악세사리,레이어드 포인트 주얼리 세트,\"구매가 298,800원\",,\"감각적인 스타일링이 돋보이는 포인트 주얼리 아이템입니다. 은은한 체인과 컬러감 있는 모티브가 조화롭게 어우러져 손목에 세련된 분위기를 더해주며, 단독 착용은 물론 여러 개를 함께 레이어드해도 자연스럽게 연출됩니다. 데일리룩부터 특별한 날까지 가볍게 포인트 주기 좋은 액세서리입니다.\",etc12,,상담 후 옵션 확인,show,166,\"298,800\",,,,,,,검수완료\netc13,etc,잡화,스카프,데일리 포인트 실크 스카프,\"구매가 149,400원\",,\"복잡한 액세서리 없이도 스타일에 감각적인 포인트를 더해주는 미니 실크 스카프입니다. 목에 가볍게 두르거나 가방, 헤어 포인트로 연출하기 좋으며, 심플한 데일리룩에 세련된 분위기를 더해줍니다. 작지만 활용도 높은 아이템으로 다양한 코디에 부담 없이 매치하기 좋습니다.\",etc13,,상담 후 옵션 확인,show,83,\"149,400\",,,,,,,검수완료\netc14,etc,잡화,기타잡화,마음이 끌리는 감각적인 포인트,\"구매가 298,800원\",,마음이 끌리는 감각적인 포인트,etc14,블랙:black|브라운:brown|멀티:multi|화이트:white,상담 후 옵션 확인,show,166,\"298,800\",,,,,,,검수완료\n";

const OPEN_CATEGORIES = ["bag", "shoes", "clothes", "etc"];
const CATEGORY_NAMES = {
  bag: "가방",
  shoes: "신발",
  clothes: "의류",
  etc: "잡화"
};

// 상품이 아직 적거나 특정 세부분류 상품이 없어도
// 홈페이지에 세부 탭이 먼저 보이도록 고정 목록을 둡니다.
const SUBCATEGORY_MAP = {
  bag: ["전체", "토트백", "숄더백", "호보백", "크로스백", "백팩", "미니백", "쇼핑백", "볼링백", "기타가방"],
  shoes: ["전체", "스니커즈", "슬리퍼", "샌들", "로퍼", "부츠", "기타신발"],
  clothes: ["전체", "반팔", "긴팔", "셔츠", "니트", "후드", "맨투맨", "자켓", "패딩", "팬츠", "원피스", "스커트", "기타의류"],
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

/* 카테고리 값 정규화 */
function normalizeCategoryValue(value) {
  const text = (value || "").toString().trim();
  if (!text) return "";

  const lower = text.toLowerCase();
  if (["bag", "가방", "bags", "bagpack"].includes(lower)) return "bag";
  if (["shoes", "신발", "shoe"].includes(lower)) return "shoes";
  if (["clothes", "cloth", "clothing", "wear", "apparel", "의류", "옷", "상의", "하의"].includes(lower)) return "clothes";
  if (["etc", "잡화", "accessory", "accessories", "기타"].includes(lower)) return "etc";

  return lower;
}

/* 색상 읽기
   CSV colors 칸에 아래처럼 넣으면 됩니다.
   - 블랙:a
   - 블랙:a|화이트:b
   실제 이미지 폴더는 상품 폴더 안에 만들어 주세요.
   예: assets/bag04/a/main.jpg, assets/bag04/a/detail01.jpg
*/
function parseColors(text) {
  if (!text) return [];

  return text
    .split(/[|,;]/)
    .map(item => (item || "").trim())
    .filter(Boolean)
    .map(item => {
      const match = item.match(/^(.+?)\s*[:=：]\s*(.+)$/);
      let label = "";
      let folder = "";

      if (match) {
        label = (match[1] || "").trim();
        folder = (match[2] || "").trim();
      } else {
        label = item.trim();
        folder = item.trim();
      }

      label = label.replace(/^['"]|['"]$/g, "").trim();
      folder = folder.replace(/^['"]|['"]$/g, "").trim();

      if (!folder) folder = label;

      return {
        label,
        folder
      };
    })
    .filter(item => item.label && item.folder);
}

/* options 칸에 실수로 블랙:a처럼 넣어도 색상으로 인식하게 보조 처리 */
function looksLikeColorFolderOption(text) {
  return !!(text || "").toString().match(/^.+?\s*[:=：]\s*[^\s|,;]+$/);
}

/* 상품 데이터 정리 */
function normalizeProduct(row) {
  const category = normalizeCategoryValue(
    row.category || row.categoryName || row.Category || row.카테고리 || row.카테고리명 || row.분류
  );

  const rawOptions = row.options
    ? row.options.split("|").map(value => value.trim()).filter(Boolean)
    : [];

  let colors = parseColors(row.colors || row.색상 || row.color || row.colorsOption);

  // colors 칸을 비워두고 options 칸에 블랙:a|화이트:b처럼 넣어도
  // 자동으로 색상 선택 박스로 인식합니다.
  const optionLooksLikeColors = rawOptions.length && rawOptions.every(looksLikeColorFolderOption);
  if (!colors.length && optionLooksLikeColors) {
    colors = parseColors(rawOptions.join("|"));
  }

  const displayOptions = optionLooksLikeColors
    ? ["상담 후 옵션 확인"]
    : (rawOptions.length ? rawOptions : ["상담 후 옵션 확인"]);

  const folder = (row.folder || "").replace(/^assets\//, "").trim();

  return {
    id: row.id,
    category,
    categoryName: row.categoryName || row.카테고리명 || row.Category || CATEGORY_NAMES[category] || "기타",
    subCategory: row.subCategory || row.서브카테고리 || "기타",
    name: row.name,
    price: row.price,
    shortDesc: row.shortDesc,
    desc: row.desc,
    folder: `assets/${folder}`,
    colors,
    options: displayOptions,
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
      카테고리별 CSV와 기존 products.csv를 모두 읽어 합칩니다.
      - data/products_bag.csv
      - data/products_shoes.csv
      - data/products_clothes.csv
      - data/products_etc.csv
      - products.csv
      같은 id가 있으면 카테고리별 CSV 우선으로 사용합니다.
    */
    const categoryFiles = [
      "data/products_bag.csv",
      "data/products_shoes.csv",
      "data/products_clothes.csv",
      "data/products_etc.csv"
    ];

    const texts = [];

    try {
      const categoryTexts = await Promise.all(categoryFiles.map(fetchCSVIfExists));
      texts.push(...categoryTexts);
    } catch (splitError) {
      console.warn("카테고리별 CSV 로드 실패, products.csv만 사용합니다.", splitError);
    }

    try {
      texts.push(await fetchCSVIfExists("products.csv"));
    } catch (fallbackError) {
      console.warn("products.csv 로드 실패", fallbackError);
    }

    // index.html을 더블클릭(file://)으로 열면 브라우저가 CSV fetch를 막는 경우가 있어
    // products.csv 내용을 스크립트 안에 백업으로 넣어 둡니다.
    if (!texts.length && typeof EMBEDDED_PRODUCTS_CSV === "string" && EMBEDDED_PRODUCTS_CSV.trim()) {
      texts.push(EMBEDDED_PRODUCTS_CSV);
    }

    const rows = texts.flatMap(text => parseCSV(text));
    const seenIds = new Set();

    PRODUCTS = rows
      .filter(row => {
        if (!row.id || seenIds.has(row.id)) return false;
        seenIds.add(row.id);
        return true;
      })
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
  const folder = (product.folder || "").replace(/^assets\//, "");
  const root = `assets/${folder}`;
  const base = colorFolder
    ? `${root}/${colorFolder}`
    : root;

  const candidates = [
    `${base}/main.jpg`,
    `${root}/main.jpg`
  ];

  for (let i = 1; i <= 12; i++) {
    candidates.push(`${base}/detail${String(i).padStart(2, "0")}.jpg`);
    candidates.push(`${root}/detail${String(i).padStart(2, "0")}.jpg`);
  }

  return candidates.filter((src, index) => candidates.indexOf(src) === index);
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
            onerror="this.onerror=null; this.src='${product.folder}/main.jpg'"
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

  const usableImages = images.filter(src => src && !src.includes("undefined"));

  thumbList.innerHTML = usableImages.map((src, index) => `
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

/* 문의 메시지 만들기 */
function makeInquiryMessage() {
  if (!currentProduct) return "";

  const colorText = document.querySelector("#detailColor")?.selectedOptions?.[0]?.textContent || "";
  const optionText = document.querySelector("#detailOption")?.value || "";

  return [
    "상품 문의",
    `상품명: ${currentProduct.name}`,
    colorText ? `색상: ${colorText}` : "",
    optionText ? `옵션: ${optionText}` : ""
  ].filter(Boolean).join("\n");
}

async function copyInquiryMessage(message) {
  try {
    if (navigator.clipboard && message) {
      await navigator.clipboard.writeText(message);
    }
  } catch (error) {
    console.warn("문의 내용 복사 실패", error);
  }
}

/* 텔레그램 문의 */
document.querySelector("#applyTelegramProduct")?.addEventListener("click", () => {
  if (!currentProduct) return;
  const message = makeInquiryMessage();
  window.open(`${TELEGRAM_CHAT_URL}?text=${encodeURIComponent(message)}`, "_blank");
  modal.classList.remove("show");
});

/* 카카오톡 문의 */
document.querySelector("#applyKakaoProduct")?.addEventListener("click", async () => {
  if (!currentProduct) return;
  const message = makeInquiryMessage();
  await copyInquiryMessage(message);
  window.open(KAKAO_CHAT_URL, "_blank");
  modal.classList.remove("show");
});

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
