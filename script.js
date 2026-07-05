/* ============================================================
   بيانات ورسومات لوحة تحليل الفجوات المخزنية
   ============================================================ */

Chart.defaults.font.family = "'Tajawal','IBM Plex Mono', sans-serif";
Chart.defaults.color = "#706C93";
Chart.defaults.font.size = 12;

const COLORS = {
  ink:  "#14123B",
  ink2: "#34305F",
  gold: "#C9932E",
  teal: "#0E6E67",
  ember:"#B8503E",
  grid: "#E4DFCF"
};

function fmt(n){
  return new Intl.NumberFormat('en-US').format(n);
}

/* tooltip / grid shared options */
const baseGrid = { color: COLORS.grid, drawTicks:false };
const baseScaleLabel = { color:"#706C93", font:{ family:"'IBM Plex Mono', monospace", size:11 } };

/* ---------------- Overview: consumption cost by category ---------------- */
const total = 3368356.61586982;

const categoryValues = [
    290499.7,
    63024.5,
    1265782.3,
    0.0,
    48274.7,
    0.0,
    17.7,
    1562413.3,
    33175.7,
    7415.1,
    2627.4,
    72405.4,
    22720.9
];

const categoryLabels = [
    "البان",
    "بقالة",
    "تعبئة و تغليف",
    "توابل وبهارات",
    "حلويات",
    "صوصات و توابل",
    "كيماويات",
    "مشروبات اولي",
    "مشروبات و مياه",
    "مطبوعات وورقيات",
    "مواد للعملاء",
    "مواد للمطبخ",
    "مواد نظافة"
].map((label, index) => {
    const percentage = ((categoryValues[index] / total) * 100).toFixed(2);
    return `${label} (${percentage}%)`;
});
new Chart(document.getElementById('costByCategory'), {
  type:'bar',
  data:{
    labels:categoryLabels,
    datasets:[{
      data:categoryValues,
      backgroundColor: categoryValues.map(v => v === Math.max(...categoryValues) ? COLORS.gold : COLORS.ink),
      borderRadius:6,
      maxBarThickness:46
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{
        backgroundColor: COLORS.ink,
        titleFont:{ family:"'Tajawal'" },
        bodyFont:{ family:"'IBM Plex Mono'" },
        callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.y) }
      }
    },
    scales:{
      x:{ grid:{ display:false }, ticks:{ ...baseScaleLabel, font:{ family:"'Tajawal'", size:11 } } },
      y:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } }
    }
  }
});

/* ---------------- Details: top 10 items by value ---------------- */
const topLabels = ["غطاء كوب ورقي 12 اونص تيار","حليب نادك طويل الأجل","كوب ورقي 16 اونص تيار","بوكس قهوة 1 لتر تيار","كوب ورقي 12 اونص تيار","مناديل سوفت","بوكس قهوة شعار 2 لتر","بن برازيلي","بن حب اليوبي"];
const topValues = [99064,110273,144337,151910,182908,201926,213778,306177,933412];

new Chart(document.getElementById('topValueItems'), {
  type:'bar',
  data:{
    labels: topLabels,
    datasets:[{
      data: topValues,
      backgroundColor: topValues.map((v,i)=> i === topValues.length-1 ? COLORS.gold : COLORS.ink),
      borderRadius:5,
      maxBarThickness:20
    }]
  },
  options:{
    indexAxis:'y',
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.x) } }
    },
    scales:{
      x:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } },
      y:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:11 } } }
    }
  }
});

/* ---------------- Details: monthly purchase qty by category ---------------- */
const monthlyLabels = ["البان","بقالة","تعبئة و تغليف","توابل وبهارات","حلويات","صوصات و توابل","كيماويات","مشروبات اولي","مشروبات و مياه","مطبوعات وورقيات","مواد للعملاء","مواد للمطبخ","مواد نظافة"];
const monthlyValues = [47707.7, 49120.3, 6129390.5, 0.0, 1831.3, 2.6, 33185.7, 100207.9, 5067.3, 125446.2, 170857.1, 79965.4, 47707.7];

new Chart(document.getElementById('monthlyByCategory'), {
  type:'bar',
  data:{
    labels: monthlyLabels,
    datasets:[{
      data: monthlyValues,
      backgroundColor: COLORS.teal,
      borderRadius:5,
      maxBarThickness:22
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.y) } }
    },
    scales:{
      x:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:9 } } },
      y:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } }
    }
  }
});

/* ---------------- Details: items count by stock status ---------------- */
new Chart(document.getElementById('stockStatus'), {
  type:'bar',
  data:{
    labels:["مخزون حرج","مخزون منخفض","مخزون آمن","مخزون راكد","منخفض جداً"],
    datasets:[{
      data:[46,20,32,21,6],
      backgroundColor: [COLORS.ember, COLORS.ink, COLORS.gold, COLORS.teal, COLORS.ink2, COLORS.ember],
      borderRadius:6,
      maxBarThickness:34
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{ legend:{ display:false }, tooltip:{ backgroundColor: COLORS.ink } },
    scales:{
      x:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:10 } } },
      y:{ grid: baseGrid, ticks: baseScaleLabel }
    }
  }
});

/* ---------------- Details: coverage duration (doughnut) ---------------- */
new Chart(document.getElementById('coverageDonut'), {
  type:'doughnut',
  data:{
    labels:["٠ - ٧ أيام","٨ - ١٥ يوم","١٦ - ٣٠ يوم","٣١ - ٦٠ يوم","أكثر من ٦٠"],
    datasets:[{
      data:[60,20,18,20,22],
      backgroundColor:[COLORS.ink, COLORS.ember, "#9b97c2", COLORS.gold, COLORS.teal],
      borderWidth:3,
      borderColor:"#fff"
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    cutout:'62%',
    plugins:{
      legend:{ position:'bottom', labels:{ boxWidth:11, boxHeight:11, padding:10, font:{ family:"'Tajawal'", size:10.5 } } },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ` ${ctx.label}: ${ctx.parsed}` } }
    }
  }
});

/* ---------------- Details: branch quantities (line) ---------------- */
new Chart(document.getElementById('branchLine'), {
  type:'line',
  data:{
    labels:["شيرا","النسيم","معمل النسيم","عكاظ"],
    datasets:[{
      data:[44570,123439,58163,3155484],
      borderColor: COLORS.gold,
      backgroundColor:"rgba(201,147,46,0.12)",
      pointBackgroundColor: COLORS.ink,
      pointBorderColor: COLORS.gold,
      pointRadius:5,
      pointHoverRadius:7,
      borderWidth:3,
      tension:0.35,
      fill:true
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.y) } }
    },
    scales:{
      x:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:11 } } },
      y:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } }
    }
  }
});

/* ---------------- Details: total consumption by purchase status ---------------- */
new Chart(document.getElementById('purchaseStatus'), {
  type:'bar',
  data:{
    labels:["إعادة الشراء","إيقاف الشراء"],
    datasets:[{
      data:[9848665,136582],
      backgroundColor:[COLORS.ink, COLORS.ember],
      borderRadius:6,
      maxBarThickness:38
    }]
  },
  options:{
    indexAxis:'y',
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.x) } }
    },
    scales:{
      x:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } },
      y:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:12, weight:600 } } }
    }
  }
});

/* ================================================================
   صفحة ٠٣ — تفاصيل استهلاك الشهر الماضي
   ================================================================ */

/* قيمة الاستهلاك حسب فئة الأصناف — إجمالي الفترة = 5,544,239.69 */
const lmValueLabels = ["البان","بقالة","تعبئة و تغليف","توابل وبهارات","حلويات","صوصات و توابل","كيماويات","مشروبات اولي","مشروبات و مياه","مطبوعات وورقيات","مواد للعملاء","مواد للمطبخ","مواد نظافة"];
const lmValueValues = [472955.6, 97835.1, 1614005.3, 76.7, 254983.7, 0.9, 2404.6, 2914020.5, 33175.7, 13941.6, 20672.8, 79284.4, 40883.0];

new Chart(document.getElementById('lmValueByCategory'), {
  type:'bar',
  data:{
    labels: lmValueLabels,
    datasets:[{
      data: lmValueValues,
      backgroundColor: lmValueValues.map(v => v === Math.max(...lmValueValues) ? COLORS.gold : COLORS.ink),
      borderRadius:6,
      maxBarThickness:46
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.y) } }
    },
    scales:{
      x:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:11 } } },
      y:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } }
    }
  }
});

/* متوسط تكلفة القطعة لكل فئة (ترتيب تصاعدي كالأصل) */
const lmAvgLabels = ["مواد نظافة","مواد للمطبخ","مشروبات و مياه","توابل وبهارات","مطبوعات وورقيات","صوصات و توابل","تعبئة و تغليف","مواد للعملاء","بقالة","كيماويات","البان","حلويات","مشروبات اولي"];
const lmAvgValues = [0.0, 0.3, 0.3, 1.2, 2.5, 2.7, 3.4, 16.7, 16.8, 17.5, 20.4, 23.3, 44.4];

new Chart(document.getElementById('lmAvgCost'), {
  type:'bar',
  data:{
    labels: lmAvgLabels,
    datasets:[{
      data: lmAvgValues,
      backgroundColor: lmAvgValues.map((v,i)=> i === lmAvgValues.length-1 ? COLORS.gold : COLORS.teal),
      borderRadius:5,
      maxBarThickness:18
    }]
  },
  options:{
    indexAxis:'y',
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + ctx.parsed.x } }
    },
    scales:{
      x:{ grid: baseGrid, ticks: baseScaleLabel },
      y:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:10.5 } } }
    }
  }
});

/* كمية الاستهلاك حسب فئة الأصناف */
const lmQtyLabels = ["البان","بقالة","تعبئة و تغليف","توابل وبهارات","حلويات","صوصات و توابل","كيماويات","مشروبات اولي","مشروبات و مياه","مطبوعات وورقيات","مواد للعملاء","مواد للمطبخ","مواد نظافة"];
const lmQtyValues = [79604.6, 61293.6, 8271996.2, 64.9, 9218.6, 0.3, 115.0, 52682.6, 100207.9, 10900.5, 982714.2, 210040.1, 206128.5];

new Chart(document.getElementById('lmQtyByCategory'), {
  type:'bar',
  data:{
    labels: lmQtyLabels,
    datasets:[{
      data: lmQtyValues,
      backgroundColor: lmQtyValues.map(v => v === Math.max(...lmQtyValues) ? COLORS.gold : COLORS.ink2),
      borderRadius:5,
      maxBarThickness:26
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ backgroundColor: COLORS.ink, callbacks:{ label: ctx => ' ' + fmt(ctx.parsed.y) } }
    },
    scales:{
      x:{ grid:{ display:false }, ticks:{ font:{ family:"'Tajawal'", size:9 } } },
      y:{ grid: baseGrid, ticks:{ ...baseScaleLabel, callback:v=>fmt(v) } }
    }
  }
});

/* ---------------- Step navigation ---------------- */
const steps = document.querySelectorAll('.step');
const views = document.querySelectorAll('.view');

steps.forEach(step=>{
  step.addEventListener('click', ()=>{
    const target = step.dataset.view;
    steps.forEach(s=>s.classList.remove('active'));
    views.forEach(v=>v.classList.remove('active'));
    step.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
