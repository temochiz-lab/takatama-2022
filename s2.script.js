// 保存用のファイル名を生成
function yyyymmddhhmise() {
  // 日付時間秒を文字列で返す	
    const dt = new Date();
    var yyyy = dt.getFullYear();
    var mm = ('00' + (dt.getMonth()+1)).slice(-2);
    var dd = ('00' + dt.getDate()).slice(-2);
    var hh = ('00' + dt.getHours()).slice(-2);
    var mi = ('00' + dt.getMinutes()).slice(-2);
    var se = ('00' + dt.getSeconds()).slice(-2);
  
    var answer = yyyy + mm + dd + "-" + hh + mm + se ;
    return (answer);
  }
var filename = "takatama-s2-" + yyyymmddhhmise() + ".csv" ;
// 

var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', filename);
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 共有パーツ
// ------------------------------------------------------------------------
var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 54px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500,
};

var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 500,
};

// ------------------------------------------------------------------------
// 教示文
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-高玉-セッション2</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

var instruction_p1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=5>\
2セッション目では、覚えてもらった単語のうち、無作為に選ばれた20単語と、覚えてもらっていない20単語が一単語ずつ表示されますので、先程覚えた単語だと思ったら、キーボードの「J」を、先程出てこなかった単語だと思ったら「K」を押してください。<br><br>\
あまり時間をかけず、押して頂いて大丈夫です。<br><br>\
実験で得られた回答及び、年齢、性別に関しては、厳重な管理のもとで、直ちに記号化され、統計的に処理されるため、個人が特定されることはありませんので、安心してお答えください。<br><br>\
実験中、質問や画面に不都合が生じたり、体調がすぐれない場合は、隣室にいる実験者をお呼びください。<br><br>\
それではまず、練習に移ります。「次へ」を押すと練習が始まります。練習ですので、キーはどちらを押しても構いません。<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=5>\
練習はこれにて終了です。「次へ」を押すと本番に移ります。<br>\
準備ができましたら、「次へ」を押してください。<br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=5>\
これで実験は終了です。実験にご協力いただき、本当にありがとうございました。精油を嗅いだ人は、使用した精油への簡単な質問紙に答えていただきます。<br>\
実験者が質問紙をお渡しいたしますので、この画面が出ましたら、お呼びください。<br>\
精油を使用しなかった人も、この画面が出ましたらお呼びください。<br>\
',
choices: ['終了'],
} ;

// 被検者情報の入力
// 本番時は入力必須に
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '参加者ID（例　A1，B2）を入力してください。', columns: 10, required: false, name: 'id'},
    {prompt: '性別（1：男性，2：女性，3：回答しない）を入力してください。', columns: 10, required: false, name: 'sex'},
    {prompt: '年齢（半角数字のみ）を入力してください', columns: 10, required: false, name: 'age'},
  ],
  button_label: '実験の開始',
};

// 実験の終了
var bye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で，一つ目の実験は終了となります。<br>\
五分間の休憩の後，二つ目の実験を行います。<br>\
部屋から出ず，席に着いてお待ちください。<br>\
<br>\
二つ目の実験では筆記用具を使いますので，机上に準備をお願い致します。<br>\
筆記用具をお持ちでない方，何かご不明な点等がある方はお声掛けください。<br>\
<br>\
<br></font></div>\
',
choices: ['終了'],
};

// ------------------------------------------------------------------------
// 練習用問題の作成
// ------------------------------------------------------------------------
// group:'j' = 正解
// group:'k' = 間違え

var pre_examSession2 = [
  { label: '漢字'   , group:'j' },
  { label: '夏目'   , group:'k' },
  { label: '歌詞'   , group:'j' },
];

// 順番をランダマイズしたいので指定しておく
var pre_trials = {
  timeline: [],
  timeline_variables: pre_examSession2,
  randomize_order: true,
};

// 問題の本体
var pre_exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return "<p style='font-size: 60px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    choices: ["j","k"],
    data: {
      label: jsPsych.timelineVariable('label'),
    },
    on_finish: function (data) {
      data.amswer  = data.response ;
      data.correct = jsPsych.timelineVariable('group') ;
    },
};

pre_trials.timeline.push(eyepoint) ;
pre_trials.timeline.push(pre_exam) ;
pre_trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 本番用問題の作成
// ------------------------------------------------------------------------
var examSession1 = [ // session1で出てきた単語
  { label: 'イフク'   , group:'j' },
  { label: 'ハクイ'   , group:'j' },
  { label: 'ワフク'   , group:'j' },
  { label: 'タイツ'   , group:'j' },
  { label: 'エホン'   , group:'j' },
  { label: 'キンコ'   , group:'j' },
  { label: 'ウチワ'   , group:'j' },
  { label: 'カイロ'   , group:'j' },
  { label: 'ノレン'   , group:'j' },
  { label: 'クサリ'   , group:'j' },
  { label: 'カキネ'   , group:'j' },
  { label: 'ワシツ'   , group:'j' },
  { label: 'ウツワ'   , group:'j' },
  { label: 'カタナ'   , group:'j' },
  { label: 'エレキ'   , group:'j' },
  { label: 'ナマリ'   , group:'j' },
  { label: 'ミリン'   , group:'j' },
  { label: 'アンコ'   , group:'j' },
  { label: 'チクワ'   , group:'j' },
  { label: 'ツマミ'   , group:'j' },
  { label: 'セロリ'   , group:'j' },
  { label: 'スミレ'   , group:'j' },
  { label: 'ウエキ'   , group:'j' },
  { label: 'ハヤシ'   , group:'j' },
  { label: 'アヒル'   , group:'j' },
  { label: 'ヒヨコ'   , group:'j' },
  { label: 'アサリ'   , group:'j' },
  { label: 'ヒラメ'   , group:'j' },
  { label: 'ホタル'   , group:'j' },
  { label: 'イルカ'   , group:'j' },
  { label: 'キリン'   , group:'j' },
  { label: 'マムシ'   , group:'j' },
  { label: 'ユソウ'   , group:'j' },
  { label: 'シヘイ'   , group:'j' },
  { label: 'フクヤ'   , group:'j' },
  { label: 'タウエ'   , group:'j' },
  { label: 'シマイ'   , group:'j' },
  { label: 'ヒタイ'   , group:'j' },
  { label: 'ユウヒ'   , group:'j' },
  { label: 'カラテ'   , group:'j' },
];

var examSession2 = [ // session1では出てこなかった単語
  { label: 'カツラ'   , group:'k' },
  { label: 'コロモ'   , group:'k' },
  { label: 'ユカタ'   , group:'k' },
  { label: 'カルタ'   , group:'k' },
  { label: 'コケシ'   , group:'k' },
  { label: 'ミシン'   , group:'k' },
  { label: 'オタマ'   , group:'k' },
  { label: 'コヨミ'   , group:'k' },
  { label: 'コンロ'   , group:'k' },
  { label: 'ハカリ'   , group:'k' },
  { label: 'インキ'   , group:'k' },
  { label: 'シオリ'   , group:'k' },
  { label: 'アキチ'   , group:'k' },
  { label: 'カシヤ'   , group:'k' },
  { label: 'タイル'   , group:'k' },
  { label: 'スマイ'   , group:'k' },
  { label: 'ロウヤ'   , group:'k' },
  { label: 'ヨウキ'   , group:'k' },
  { label: 'タイコ'   , group:'k' },
  { label: 'シロミ'   , group:'k' },
];

// session1で出た単語の順番をランダマイズしてsequence[]に
var sequence = [] ;
for (let i = 0; i< examSession1.length; i++) {
  sequence[i] = i ;
}
for (let i = 0; i< examSession1.length; i++) {
  target           =  Math.floor(Math.random() * examSession1.length) ;
  tmpseq           = sequence[i] ;
  sequence[i]      = sequence[target] ;
  sequence[target] = tmpseq
}

// session2の単語セットにsession1の単語セット20を追加
for (let i = 0; i< 20; i++) {
  examSession2.push(examSession1[sequence[i]]) ;
}

// session2の順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examSession2,
  randomize_order: true,
};

// 回答をチェックして文字列で返す
function checkresponse(response,correct)
{
  if (response == correct) return "正解" ; else return "不正解" ;
}

// 問題の本体
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return "<p style='font-size: 60px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    choices: ["j","k"],
    data: {
      label: jsPsych.timelineVariable('label'),
    },
    on_finish: function (data) {
      data.amswer  = data.response ;
      data.correct = jsPsych.timelineVariable('group') ;
      data.culc    = checkresponse(data.response ,jsPsych.timelineVariable('group')) ;
    },
};

trials.timeline.push(eyepoint) ;
trials.timeline.push(exam) ;
trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([enter_fullscreen,instruction_p1,pre_trials, instruction_p2,par_id,trials,instruction_p3,exit_fullscreen]);
