<template>
  <div class="loading-wrap">
    <div class="dots-bars-6" :style="{ '--randomColor': randomColor() }"></div>
    <div class="loading-overlay"></div>
  </div>
</template>

<script lang="ts" setup>
import randomColor from "randomcolor";
</script>

<style lang="scss" scoped>
.loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 201;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 201;
  background-color: #000;
  opacity: 0.5;
}

.dots-bars-6 {
  width: 40px;
  height: 20px;
  --c: radial-gradient(
    farthest-side,
    var(--randomColor) 93%,
    var(--randomColor)
  );
  background: var(--c) 0 0, var(--c) 50% 0;
  background-size: 8px 8px;
  background-repeat: no-repeat;
  position: relative;
  clip-path: inset(-200% -100% 0 0);
  animation: db6-0 1.5s linear infinite;
  z-index: 202;
  transform: scale(2.5);
}
.dots-bars-6:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 12px;
  background: var(--randomColor);
  left: -16px;
  top: 0;
  animation: db6-1 1.5s linear infinite,
    db6-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
}
.dots-bars-6:after {
  content: "";
  position: absolute;
  inset: 0 0 auto auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--randomColor);
  animation: db6-3 1.5s linear infinite;
}

@keyframes db6-0 {
  0%,
  30% {
    background-position: 0 0, 50% 0;
  }
  33% {
    background-position: 0 100%, 50% 0;
  }
  41%,
  63% {
    background-position: 0 0, 50% 0;
  }
  66% {
    background-position: 0 0, 50% 100%;
  }
  74%,
  100% {
    background-position: 0 0, 50% 0;
  }
}

@keyframes db6-1 {
  90% {
    transform: translateY(0);
  }
  95% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(15px);
    left: calc(100% - 8px);
  }
}

@keyframes db6-2 {
  100% {
    top: -0.1px;
  }
}

@keyframes db6-3 {
  0%,
  80%,
  100% {
    transform: translate(0);
  }
  90% {
    transform: translate(26px);
  }
}
</style>
