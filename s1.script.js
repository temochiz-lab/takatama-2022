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
  message: '<p>実験名: 2022-高玉-セッション1</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

var preload = {
  type: jsPsychPreload,
  auto_preload: true
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

// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// ここからこのプログラム用のデータ
// ------------------------------------------------------------------------

// 教示文最初ページ
var instruction_p1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=5>\
こんにちは。私は、人間科学部心理学科4年、渡辺ゼミナール所属、高玉翼です。<br><br>\
\
この度は私の実験にご協力いただき、誠にありがとうございます。<br>\
卒業研究を進めるにあたって、「ローズマリー精油が短期記憶の想起に及ぼす影響」のテーマで、実験を実施することになりました。<br>\
練習を行い、セクション１では40語を1単語ずつ表示するので見て、できるだけ覚えてください。<br>\
画面は自動的に切り替わります。途中で気分が悪くなったり、見ている画面に不具合が生じた場合、隣室にいる私をお呼びください。<br>\
まずはじめに、練習を行います。練習なので、覚えなくて大丈夫です。 <br>\
<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=5>\
このような速さで単語が表示されます。「次へ」を押すと本番が始まります。準備ができましたら「次へ」を押してください。\
<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

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

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験のセッション1を始めます。<br> \
1500 msec の凝視点の後に表示される言葉を音読してください。<br>\
2500msec 表示後に、2000 msec 待った後に次の刺激に切り替わります。<br><br>\
何かキーを押すと始まります。',
};


// ------------------------------------------------------------------------
// 刺激(練習用)
var pre_examSession1 = [
  { label: 'ワサビ'   , group:'j' },
  { label: 'レモン'   , group:'j' },
];

var pre_trials = {
  timeline: [],
  timeline_variables: examSession1,
  randomize_order: false,
};

for (let i = 0; i< pre_examSession1.length; i++) {
// 問題の作成
  var pre_exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 60px;'>" + pre_examSession1[i].label + "</p>"; },
    trial_duration: 2500,
    choices: "NO_KEYS",
  };

  pre_trials.timeline.push(eyepoint) ;
  pre_trials.timeline.push(pre_exam) ;
  pre_trials.timeline.push(blankscreen) ;
}

// ------------------------------------------------------------------------
// 刺激(本番用)
var examSession1 = [
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

// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examSession1,
  randomize_order: true,
};

// 問題の作成
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 60px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    trial_duration: 2500,
    choices: "NO_KEYS",
};
trials.timeline.push(eyepoint) ;
trials.timeline.push(exam) ;
trials.timeline.push(blankscreen) ;
// ------------------------------------------------------------------------


// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([enter_fullscreen,instruction_p1,pre_trials,instruction_p2,trials,bye,exit_fullscreen]);
