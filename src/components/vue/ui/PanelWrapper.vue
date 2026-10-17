<template>
  <div class="panel-wrapper">
    <!--
      The whole state, and it is native. Two radios plus :has() in panel.css
      mean the cover pushes before this island hydrates and keeps working with
      every <script> on the page deleted. Anything that opens or closes the
      stack is a <label for>, not a click handler.
    -->
    <input id="panel-cover" class="panel-state" type="radio" name="panel" checked />
    <input id="panel-open" class="panel-state" type="radio" name="panel" />

    <slot name="bar" />

    <div class="panel-stage">
      <slot />
    </div>
  </div>
</template>
