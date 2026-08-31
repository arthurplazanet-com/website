<template>
  <svg
    class="kepla-icon"
    viewBox="0 0 3200 3200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="21"
      y="21"
      width="3158"
      height="3158"
      fill="black"
      stroke="#FEFEFE"
      stroke-width="42"
    />
    <path
      d="M1600.5 527C2060.54 527 2433 893.043 2433 1344C2433 1794.96 2060.54 2161 1600.5 2161C1140.46 2161 768 1794.96 768 1344C768 893.043 1140.46 527 1600.5 527Z"
      fill="black"
      stroke="#FEFEFE"
      stroke-width="30"
    />
    <line
      x1="2159.18"
      y1="1960.27"
      x2="3181.18"
      y2="3174.27"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      y1="-12"
      x2="1586.91"
      y2="-12"
      transform="matrix(-0.644019 0.765009 0.765009 0.644019 1059 1968)"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      x1="1612"
      y1="2176"
      x2="1612"
      y2="3182"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      x1="2448"
      y1="1332"
      x2="3172"
      y2="1332"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      x1="753"
      y1="1356"
      x2="37"
      y2="1356"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      x1="3191.34"
      y1="27.6301"
      x2="2305.34"
      y2="883.63"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <line
      y1="-12"
      x2="1231.96"
      y2="-12"
      transform="matrix(0.719178 0.694826 0.694826 -0.719178 29 10)"
      stroke="#FEFEFE"
      stroke-width="24"
      class="visible-on-hover"
    />
    <rect
      x="828.394"
      y="1676.12"
      width="66"
      height="66"
      transform="rotate(62 828.394 1676.12)"
      fill="black"
      stroke="#FEFEFE"
      stroke-width="24"
    />
    <rect
      x="1326"
      y="1254"
      width="548"
      height="181"
      fill="black"
      stroke="#FEFEFE"
      stroke-width="36"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<style>
.kepla-icon {
  position: absolute;
  top: 17%;
  right: 9%;

  transition:
    rotate 0.5s ease-in-out,
    scale 0.6s ease-in-out;

  .visible-on-hover {
    opacity: 0;
  }

  &:hover {
    .visible-on-hover {
      opacity: 1;
    }
  }

  &:active {
    rotate: 45deg;
    scale: 1.2;
  }
}
</style>
