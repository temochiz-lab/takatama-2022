var jsPsych = initJsPsych({
  on_finish: function() {
//    jsPsych.data.get().localSave('csv', 'data.csv');
    jsPsych.data.displayData();
  }
});


// ------------------------------------------------------------------------
// 固定の実験パーツ
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-1-セッション1</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから実験を始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 10, required: true, name: 'age'},
  ],
  button_label: '次へ',
};

var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験のセッション1を始めます。<br> \
1500 msec の凝視点の後に表示される言葉を音読してください。<br>\
2500msec 表示後に、2000 msec 待った後に次の刺激に切り替わります。<br><br>\
何かキーを押すと始まります。',
};

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500,
};

var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
};


// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これでセッション1は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// 画像問題の作成
// ------------------------------------------------------------------------

// 刺激
var examSession1 = [
  { label: 'あおいろしんこく'   , group:'j' },
  { label: 'かんりくみあい'     , group:'j' },
  { label: 'けんげんきょうか'   , group:'j' },
  { label: 'こじんしょとく'     , group:'j' },
  { label: 'しゃかいほしょう'   , group:'j' },
  { label: 'せいめいほけん'     , group:'j' },
  { label: 'たんしんふにん'     , group:'j' },
  { label: 'にっしんせんそう'   , group:'j' },
  { label: 'ふくごうそざい'     , group:'j' },
  { label: 'めいじけんぽう'     , group:'j' },
  { label: '印鑑証明'           , group:'j' },
  { label: '規制緩和'           , group:'j' },
  { label: '健康食品'           , group:'j' },
  { label: '古典学派'           , group:'j' },
  { label: '少数激戦'           , group:'j' },
  { label: '太陽電池'           , group:'j' },
  { label: '内需拡大'           , group:'j' },
  { label: '表示価格'           , group:'j' },
  { label: '補正予算'           , group:'j' },
  { label: '落語協会'           , group:'j' },
];

// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examSession1,
  randomize_order: true,
};

// 画像問題の本体
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 48px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    trial_duration: 2500,
    choices: "NO_KEYS",
};

trials.timeline.push(eyepoint) ;
trials.timeline.push(exam) ;
trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([enter_fullscreen,par_id,hello,trials,bye,exit_fullscreen]);
