
// hangul.js
var __init__ = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ','ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
var __medial__ = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ','ㅣ'];
var __final__ = ['','ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];	

var Hangul = {
	seperate: function(str){
		var result = [];
		for(var i = 0; i < str.length; i++) {
			var _charCode = str.charCodeAt(i);

			if(_charCode < 0xAC00 || _charCode > 0xD7A3) {
				result.push(str.charAt(i));
				continue;
			}
			_charCode-=0xAC00;
			var init_code, medi_code, fin_code;
		    fin_code = _charCode % 28;
		    medi_code = ((_charCode - fin_code) / 28 ) % 21;
		    init_code = (((_charCode - fin_code) / 28 ) - medi_code ) / 21;
		    result.push(__init__[init_code]);
			result.push(__medial__[medi_code]);
			result.push(__final__[fin_code]);
		}
		return result;
	},
	seperateToObject: function(str) {
		var result = [];
		for(var i = 0; i < str.length; i++) {
			var _charCode = str.charCodeAt(i);

			if(_charCode < 0xAC00 || _charCode > 0xD7A3) {
				result.push({
					isHangul:false,
					char:str.charAt(i)
				});
				continue;
			}
			_charCode-=0xAC00;
			var init_code, medi_code, fin_code;
		    fin_code = _charCode % 28;
		    medi_code = ((_charCode - fin_code) / 28 ) % 21;
		    init_code = (((_charCode - fin_code) / 28 ) - medi_code ) / 21;
		    result.push({
		    	isHangul:true,
		    	initial:__init__[init_code],
		    	medial:__medial__[medi_code],
		    	final:__final__[fin_code],
		    	char:str.charAt(i)
		    });
		}
		return result;
	},
	combine: function(str) {
		var result = '',
			arr = str.split('');
		for(var i = 0; i < arr.length; i++) {
			var flag = true;
			if(__final__.indexOf(arr[i]) != -1) {
				if(result.length && result.charCodeAt(result.length-1) >= 0xAC00 && result.charCodeAt(result.length-1) <= 0xD7A3 && Hangul.seperateToObject(result[result.length-1])[0].final == ''){
					result = result.substr(0,result.length-1) + String.fromCharCode(result.charCodeAt(result.length-1) + __final__.indexOf(arr[i]));
					flag = false;
				}
			} else if(__medial__.indexOf(arr[i]) != -1) {
				if(result.length){
				 	if(__init__.indexOf(result[result.length-1]) != -1){
						result = result.substr(0,result.length-1) + String.fromCharCode(0xAC00 + (__init__.indexOf(result[result.length-1]) * 588) + (__medial__.indexOf(arr[i]) * 28));
						flag = false;
				 	}
					else if(result.charCodeAt(result.length-1) >= 0xAC00 && result.charCodeAt(result.length-1) <= 0xD7A3) {
						var fin = Hangul.seperateToObject(result[result.length-1])[0].final;
						if(__init__.indexOf(fin)){
							result = result.substr(0,result.length-1) + String.fromCharCode(result.charCodeAt(result.length-1)-__final__.indexOf(fin));
							result += String.fromCharCode(0xAC00 + (__init__.indexOf(fin) * 588) + (__medial__.indexOf(arr[i]) * 28));
							flag = false;
						}
					}
				}
			}
			if(flag) result += arr[i];
		}
		return result;
	}
}








// 변환시작부분
const conversionTable = {
    'あ': '아', 'い': '이', 'う': '우', 'え': '에', 'お': '오',
    'か': '카', 'き': '키', 'く': '쿠', 'け': '케', 'こ': '코',
    'さ': '사', 'し': '시', 'す': '스', 'せ': '세', 'そ': '소',
    'た': '타', 'ち': '치', 'つ': '츠', 'て': '테', 'と': '토',
    'な': '나', 'に': '니', 'ぬ': '누', 'ね': '네', 'の': '노',
    'は': '하', 'ひ': '히', 'ふ': '후', 'へ': '헤', 'ほ': '호',
    'ま': '마', 'み': '미', 'む': '무', 'め': '메', 'も': '모',
    'や': '야', 'ゆ': '유', 'よ': '요', 'っ': 'ㅅ',
    'ら': '라', 'り': '리', 'る': '루', 'れ': '레', 'ろ': '로',
    'わ': '와', 'を': '오', 'ん': 'ㄴ',
    'が': '가', 'ぎ': '기', 'ぐ': '구', 'げ': '게', 'ご': '고',
    'ざ': 'ᅀᅡ', 'じ': 'ᅀᅵ', 'ず': 'ᅀᅳ', 'ぜ': 'ᅀᅦ', 'ぞ': 'ᅀᅩ',
    'だ': '다', 'ぢ': '디', 'づ': '드', 'で': '데', 'ど': '도',
    'ば': '바', 'び': '비', 'ぶ': '부', 'べ': '베', 'ぼ': '보',
    'ぱ': '파', 'ぴ': '피', 'ぷ': '푸', 'ぺ': '페', 'ぽ': '포',
    'きゃ': '캬', 'きゅ': '큐', 'きょ': '쿄',
    'しゃ': '샤', 'しゅ': '슈', 'しょ': '쇼',
    'ちゃ': '챠', 'ちゅ': '츄', 'ちょ': '쵸',
    'にゃ': '냐', 'にゅ': '뉴', 'にょ': '뇨',
    'ひゃ': '햐', 'ひゅ': '휴', 'ひょ': '효',
    'みゃ': '먀', 'みゅ': '뮤', 'みょ': '묘',
    'りゃ': '랴', 'りゅ': '류', 'りょ': '료',
    'ぎゃ': '갸', 'ぎゅ': '규', 'ぎょ': '교',
    'じゃ': 'ᅀᅣ', 'じゅ': 'ᅀᅲ', 'じょ': 'ᅀᅭ',
    'びゃ': '뱌', 'びゅ': '뷰', 'びょ': '뵤',
    'ぴゃ': '퍄', 'ぴゅ': '퓨', 'ぴょ': '표',


	// 옛한글 완성형 왜 지원 안해줌? 존나 힘드네
    'ゔ': 'ᄫᅮ',
    'ゔぁ': 'ᄫᅡ', 'ゔぃ': 'ᄫᅵ', 'ゔぅ': 'ᄫᅮ', 'ゔぇ': 'ᄫᅦ', 'ゔぉ': 'ᄫᅩ',
    'ゔゃ': 'ᄫᅣ', 'ゔゅ': 'ᄫᅲ', 'ゔょ': 'ᄫᅭ',
    'ゔぁっ': 'ᄫᅡᆺ', 'ゔぃっ': 'ᄫᅵᆺ', 'ゔぅっ': 'ᄫᅮᆺ', 'ゔぇっ': 'ᄫᅦᆺ', 'ゔぉっ': 'ᄫᅩᆺ',
    'ゔゃっ': 'ᄫᅡᆺ', 'ゔょっ': 'ᄫᅭᆺ',
    'ざぁ': 'ᅀᅡ', 'ざぃ': 'ᅀᅵ', 'ざぅ': 'ᅀᅳ', 'ざぇ': 'ᅀᅦ', 'ざぉ': 'ᅀᅩ',
    'ざゃ': 'ᅀᅣ', 'ざゅ': 'ᅀᅲ', 'ざょ': 'ᅀᅭ',
    'ざぁっ': 'ᅀᅡᆺ', 'ざぃっ': 'ᅀᅵᆺ', 'ざぅっ': 'ᅀᅳᆺ', 'ざぇっ': 'ᅀᅦᆺ', 'ざぉっ': 'ᅀᅩᆺ',
    'ざゃっ': 'ᅀᅡᆺ', 'ざょっ': 'ᅀᅭᆺ',
    'じぁ': 'ᅀᅡ', 'じぃ': 'ᅀᅵ', 'じぅ': 'ᅀᅳ', 'じぇ': 'ᅀᅦ', 'じぉ': 'ᅀᅩ',
    'じぁっ': 'ᅀᅡᆺ', 'じぃっ': 'ᅀᅵᆺ', 'じぅっ': 'ᅀᅳᆺ', 'じぇっ': 'ᅀᅦᆺ', 'じぉっ': 'ᅀᅩᆺ',
    'じゃっ': 'ᅀᅡᆺ', 'じょっ': 'ᅀᅭᆺ',
    'ずぁ': 'ᅀᅡ', 'ずぃ': 'ᅀᅵ', 'ずぅ': 'ᅀᅳ', 'ずぇ': 'ᅀᅦ', 'ずぉ': 'ᅀᅩ',
    'ずぁっ': 'ᅀᅡᆺ', 'ずぃっ': 'ᅀᅵᆺ', 'ずぅっ': 'ᅀᅳᆺ', 'ずぇっ': 'ᅀᅦᆺ', 'ずぉっ': 'ᅀᅩᆺ',
    'ずゃっ': 'ᅀᅣᆺ', 'ずょっ': 'ᅀᅭᆺ',
    'ぜぁ': 'ᅀᅡ', 'ぜぃ': 'ᅀᅵ', 'ぜぅ': 'ᅀᅳ', 'ぜぇ': 'ᅀᅦ', 'ぜぉ': 'ᅀᅩ',
    'ぜゃ': 'ᅀᅣ', 'ぜゅ': 'ᅀᅲ', 'ぜょ': 'ᅀᅭ',
    'ぜぁっ': 'ᅀᅡᆺ', 'ぜぃっ': 'ᅀᅵᆺ', 'ぜぅっ': 'ᅀᅳᆺ', 'ぜぇっ': 'ᅀᅦᆺ', 'ぜぉっ': 'ᅀᅩᆺ',
    'ぜゃっ': 'ᅀᅣᆺ', 'ぜょっ': 'ᅀᅭᆺ',

	'ざっ': 'ᅀᅡᆺ', 'じっ': 'ᅀᅵᆺ', 'ずっ': 'ᅀᅳᆺ', 'ぜっ': 'ᅀᅦᆺ', 'ぞっ': 'ᅀᅩᆺ', 
};

const inputArea = document.getElementById('japaneseInput');
const outputArea = document.getElementById('koreanOutput');

inputArea.addEventListener('input', () => {
    let inputText = inputArea.value;

    //
	inputText = inputText.replace(/ー/g, '𰝁')
	inputText = inputText.replace(/ぢ/g, 'じ')
	inputText = inputText.replace(/づ/g, 'ず')
    inputText = wanakana.toHiragana(inputText);


    let convertedText = '';

    for (let i = 0; i < inputText.length; i++) {
        const currentChar = inputText[i];
        const nextChar = inputText[i + 1];
        const combinedChar = currentChar + nextChar;
        const threeChar = inputText[i] + inputText[i + 1] + inputText[i + 2];

        if (currentChar === 'ん') {
            if (nextChar) {
                if ('さしすせそざじずぜぞたちつてとだぢづでどなにぬねのらりるれろ'.includes(nextChar)) {
                    convertedText += 'ㄴ';
                } else if ('ばびぶべぼぱぴぷぺぽまみむめも'.includes(nextChar)) {
                    convertedText += 'ㅁ';
                } else if ('かきくけこがぎぐげご'.includes(nextChar)) {
                    convertedText += 'ㅇ';
                } else {
                    convertedText += 'ㄴ';
                }
            } else {
                convertedText += 'ㅇ';
            }
        } else if (conversionTable[threeChar]) {
            convertedText += conversionTable[threeChar];
            i += 2; // 
        } else if (conversionTable[combinedChar]) {
            convertedText += conversionTable[combinedChar];
            i += 1; // 
        } else if (conversionTable[currentChar]) {
            convertedText += conversionTable[currentChar];
        } else {
            convertedText += currentChar; 
        }
    }

	convertedText = convertedText.replace(/ᄫᅡㄴ/g, 'ᄫᅡᆫ')
	convertedText = convertedText.replace(/ᄫᅡㅁ/g, 'ᄫᅡᆷ')
	convertedText = convertedText.replace(/ᄫᅡㅇ/g, 'ᄫᅡᆼ')
	convertedText = convertedText.replace(/ᄫᅵㄴ/g, 'ᄫᅵᆫ')
	convertedText = convertedText.replace(/ᄫᅵㅁ/g, 'ᄫᅵᆷ')
	convertedText = convertedText.replace(/ᄫᅵㅇ/g, 'ᄫᅵᆼ')
	convertedText = convertedText.replace(/ᄫᅮㄴ/g, 'ᄫᅮᆫ')
	convertedText = convertedText.replace(/ᄫᅮㅁ/g, 'ᄫᅮᆷ')
	convertedText = convertedText.replace(/ᄫᅮㅇ/g, 'ᄫᅮᆼ')
	convertedText = convertedText.replace(/ᄫᅦㄴ/g, 'ᄫᅦᆫ')
	convertedText = convertedText.replace(/ᄫᅦㅁ/g, 'ᄫᅦᆷ')
	convertedText = convertedText.replace(/ᄫᅦㅇ/g, 'ᄫᅦᆼ')
	convertedText = convertedText.replace(/ᄫᅩㄴ/g, 'ᄫᅩᆫ')
	convertedText = convertedText.replace(/ᄫᅩㅁ/g, 'ᄫᅩᆷ')
	convertedText = convertedText.replace(/ᄫᅩㅇ/g, 'ᄫᅩᆼ')
	convertedText = convertedText.replace(/ᄫᅣㄴ/g, 'ᄫᅣᆫ')
	convertedText = convertedText.replace(/ᄫᅣㅁ/g, 'ᄫᅣᆷ')
	convertedText = convertedText.replace(/ᄫᅣㅇ/g, 'ᄫᅣᆼ')
	convertedText = convertedText.replace(/ᄫᅲㄴ/g, 'ᄫᅲᆫ')
	convertedText = convertedText.replace(/ᄫᅲㅁ/g, 'ᄫᅲᆷ')
	convertedText = convertedText.replace(/ᄫᅲㅇ/g, 'ᄫᅲᆼ')
	convertedText = convertedText.replace(/ᄫᅭㄴ/g, 'ᄫᅭᆫ')
	convertedText = convertedText.replace(/ᄫᅭㅁ/g, 'ᄫᅭᆷ')
	convertedText = convertedText.replace(/ᄫᅭㅇ/g, 'ᄫᅭᆼ')
	
	convertedText = convertedText.replace(/ᅀᅡㄴ/g, 'ᅀᅡᆫ')
	convertedText = convertedText.replace(/ᅀᅡㅁ/g, 'ᅀᅡᆷ')
	convertedText = convertedText.replace(/ᅀᅡㅇ/g, 'ᅀᅡᆼ')
	convertedText = convertedText.replace(/ᅀᅵㄴ/g, 'ᅀᅵᆫ')
	convertedText = convertedText.replace(/ᅀᅵㅁ/g, 'ᅀᅵᆷ')
	convertedText = convertedText.replace(/ᅀᅵㅇ/g, 'ᅀᅵᆼ')
	convertedText = convertedText.replace(/ᅀᅳㄴ/g, 'ᅀᅳᆫ')
	convertedText = convertedText.replace(/ᅀᅳㅁ/g, 'ᅀᅳᆷ')
	convertedText = convertedText.replace(/ᅀᅳㅇ/g, 'ᅀᅳᆼ')
	convertedText = convertedText.replace(/ᅀᅦㄴ/g, 'ᅀᅦᆫ')
	convertedText = convertedText.replace(/ᅀᅦㅁ/g, 'ᅀᅦᆷ')
	convertedText = convertedText.replace(/ᅀᅦㅇ/g, 'ᅀᅦᆼ')
	convertedText = convertedText.replace(/ᅀᅩㄴ/g, 'ᅀᅩᆫ')
	convertedText = convertedText.replace(/ᅀᅩㅁ/g, 'ᅀᅩᆷ')
	convertedText = convertedText.replace(/ᅀᅩㅇ/g, 'ᅀᅩᆼ')
	convertedText = convertedText.replace(/ᅀᅣㄴ/g, 'ᅀᅣᆫ')
	convertedText = convertedText.replace(/ᅀᅣㅁ/g, 'ᅀᅣᆷ')
	convertedText = convertedText.replace(/ᅀᅣㅇ/g, 'ᅀᅣᆼ')
	convertedText = convertedText.replace(/ᅀᅲㄴ/g, 'ᅀᅲᆫ')
	convertedText = convertedText.replace(/ᅀᅲㅁ/g, 'ᅀᅲᆷ')
	convertedText = convertedText.replace(/ᅀᅲㅇ/g, 'ᅀᅲᆼ')
	convertedText = convertedText.replace(/ᅀᅭㄴ/g, 'ᅀᅭᆫ')
	convertedText = convertedText.replace(/ᅀᅭㅁ/g, 'ᅀᅭᆷ')
	convertedText = convertedText.replace(/ᅀᅭㅇ/g, 'ᅀᅭᆼ')

	convertedText = convertedText.replace(/𰝁/g, 'ー')
	convertedText = convertedText.replace(/　/g, '\n')
	convertedText = convertedText.replace(/ /g, '\n')
	outputArea.textContent = Hangul.combine(convertedText);

	
});

