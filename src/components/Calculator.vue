<script setup>
import { ref, computed } from 'vue';
import { numberToVietnameseWords, formatVietnameseCurrency } from '../utils/format.js';

const amount = ref(1600000000); // 1.6 Billion
const rate = ref(7.5);
const duration = ref(45);
const durationUnit = ref('days'); // 'days' or 'months'

const interest = computed(() => {
  const annualRate = rate.value / 100;
  let timeInYears;
  if (durationUnit.value === 'days') {
    timeInYears = duration.value / 365;
  } else {
    timeInYears = duration.value / 12;
  }
  return Math.round(amount.value * annualRate * timeInYears);
});

const total = computed(() => Number(amount.value) + Number(interest.value));

const formattedAmount = computed(() => formatVietnameseCurrency(amount.value));
const amountWords = computed(() => numberToVietnameseWords(amount.value));

const formattedInterest = computed(() => formatVietnameseCurrency(interest.value));
const interestWords = computed(() => numberToVietnameseWords(interest.value));

const formattedTotal = computed(() => formatVietnameseCurrency(total.value));
const totalWords = computed(() => numberToVietnameseWords(total.value));

const cases = [
  { label: '1.6 Tỷ, 7.5%, 45 ngày', amount: 1600000000, rate: 7.5, duration: 45, unit: 'days' },
  { label: '500 Triệu, 6%, 12 tháng', amount: 500000000, rate: 6, duration: 12, unit: 'months' }
];

const applyCase = (c) => {
  amount.value = c.amount;
  rate.value = c.rate;
  duration.value = c.duration;
  durationUnit.value = c.unit;
};
</script>

<template>
  <div class="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
    <!-- Ambient Background Decor -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div class="absolute top-[30%] -right-[15%] w-[45%] h-[45%] bg-purple-600/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center max-w-7xl mx-auto">
      <!-- Header -->
      <header class="w-full max-w-2xl mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Máy Tính Lãi Suất
        </h1>
        <p class="text-slate-500 text-lg md:text-xl font-semibold tracking-wide">Đơn giản • Rõ ràng • Minh bạch</p>
      </header>

      <main class="w-full max-w-xl bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-500">
        
        <!-- Input Section -->
        <div class="space-y-10">
          <!-- Principal Input -->
          <div class="group">
            <div class="flex justify-between items-center mb-3 ml-1">
              <label class="text-[10px] font-black text-blue-400/80 uppercase tracking-[0.3em]">Số tiền vay/gửi (VNĐ)</label>
              <span class="text-[10px] font-bold text-slate-700 uppercase tracking-widest hidden sm:block">Đơn vị: Đồng</span>
            </div>
            <div class="relative group-focus-within:scale-[1.01] transition-transform duration-300">
              <input 
                v-model="amount" 
                type="number" 
                class="w-full bg-slate-900/40 border border-white/10 rounded-2xl py-6 px-8 text-3xl sm:text-4xl font-black text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 shadow-inner"
                placeholder="0"
              />
              <div class="absolute top-1/2 right-8 -translate-y-1/2 text-slate-700 font-black text-xl hidden sm:block">VNĐ</div>
            </div>
            <div class="mt-4 ml-1 text-slate-500 text-sm font-bold italic transition-colors group-focus-within:text-blue-400/80 leading-relaxed">
              {{ amountWords }}
            </div>
          </div>

          <!-- Rate & Duration Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="group">
              <label class="block text-[10px] font-black text-blue-400/80 uppercase tracking-[0.3em] mb-3 ml-1">Lãi suất (%/năm)</label>
              <div class="relative group-focus-within:scale-[1.02] transition-transform duration-300">
                <input 
                  v-model="rate" 
                  type="number" step="0.1"
                  class="w-full bg-slate-900/40 border border-white/10 rounded-2xl py-5 px-7 text-2xl font-black text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50"
                />
                <div class="absolute top-1/2 right-7 -translate-y-1/2 text-slate-700 font-black">%</div>
              </div>
            </div>

            <div class="group">
              <label class="block text-[10px] font-black text-blue-400/80 uppercase tracking-[0.3em] mb-3 ml-1">Thời gian</label>
              <div class="flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/50 focus-within:scale-[1.02] transition-all duration-300">
                <input 
                  v-model="duration" 
                  type="number" 
                  class="flex-1 bg-transparent py-5 px-7 text-2xl font-black text-white focus:outline-none min-w-0"
                />
                <div class="relative flex items-center bg-slate-950/60 border-l border-white/10">
                   <select 
                    v-model="durationUnit" 
                    class="h-full px-5 pr-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] focus:outline-none cursor-pointer hover:text-white transition-colors bg-transparent appearance-none"
                    style="appearance: none; -moz-appearance: none; -webkit-appearance: none;"
                  >
                    <option value="days">Ngày</option>
                    <option value="months">Tháng</option>
                  </select>
                  <div class="absolute right-4 pointer-events-none opacity-40">
                    <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Result Glass Card -->
        <div class="mt-14 group">
          <div class="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(37,99,235,0.5)] transition-all duration-500 hover:shadow-[0_35px_80px_-15px_rgba(37,99,235,0.6)] group-hover:-translate-y-1">
            <!-- Decorative circle -->
            <div class="absolute -top-10 -right-10 w-48 h-48 bg-white/5 blur-3xl rounded-full"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 blur-3xl rounded-full"></div>
            
            <div class="relative z-10 space-y-10">
              <div class="text-center">
                <p class="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Tiền lãi nhận được</p>
                <div class="text-4xl sm:text-6xl font-black text-white shrink-0 tabular-nums leading-none">
                  {{ formattedInterest }} <span class="text-xl sm:text-2xl opacity-40 font-bold ml-1">VNĐ</span>
                </div>
                <div class="mt-6 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 inline-block">
                  <p class="text-blue-100 text-sm sm:text-base font-bold italic leading-tight">
                    {{ interestWords }}
                  </p>
                </div>
              </div>

              <div class="h-px bg-white/10 w-2/3 mx-auto"></div>

              <div class="text-center">
                <p class="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Tổng cộng (Gốc + Lãi)</p>
                <div class="text-2xl sm:text-3xl font-black text-white/90 tabular-nums">
                  {{ formattedTotal }} <span class="text-lg opacity-30 font-bold ml-1">VNĐ</span>
                </div>
                <p class="mt-2 text-[10px] text-blue-200/40 font-bold italic">{{ totalWords }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Quick Examples Grid -->
      <section class="w-full max-w-xl mt-12 px-2">
        <div class="flex items-center gap-6 mb-6">
          <div class="h-px flex-1 bg-white/5"></div>
          <span class="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">Gợi ý nhanh</span>
          <div class="h-px flex-1 bg-white/5"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <button 
            v-for="c in cases" :key="c.label"
            @click="applyCase(c)"
            class="group relative text-left bg-slate-900/30 border border-white/5 rounded-[1.25rem] p-6 transition-all hover:bg-slate-800/80 hover:border-blue-500/40 hover:shadow-2xl active:scale-[0.98] overflow-hidden"
          >
            <!-- Progress-like border -->
            <div class="absolute bottom-0 left-0 h-1 bg-blue-500/40 w-0 group-hover:w-full transition-all duration-500"></div>
            
            <div class="flex items-center justify-between mb-2">
              <div class="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Trường hợp</div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div class="text-slate-300 font-black text-sm leading-tight group-hover:text-white transition-colors">{{ c.label }}</div>
          </button>
        </div>
      </section>

      <!-- Trust Footer -->
      <footer class="mt-24 text-slate-700 text-center animate-in fade-in duration-1000 delay-700 pb-12">
        <div class="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/5 mb-6">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-[10px] font-black uppercase tracking-[0.2em]">Secure & Private</span>
        </div>
        <p class="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">© 2026 Premium Calculator Suite</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Hidden arrows for number input */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: none;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-top {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-in {
  animation-fill-mode: both;
}

.fade-in { animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-in-from-top-4 { animation: slide-in-top 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.zoom-in-95 { animation: zoom-in 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
</style>
