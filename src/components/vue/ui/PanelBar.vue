<template>
  <header class="panel-bar">
    <!--
      One bar for both states. It sits in the wrapper's first grid row rather
      than inside either panel, which is the only placement that survives the
      push: put it on the cover and it leaves with the cover, put it on the
      records and it is hidden until you open them, put it in each and it
      duplicates and jumps. Here it never moves — the panels move under it.
    -->
    <label class="panel-bar__home" for="panel-cover">
      <span class="panel-bar__mark">AP</span>
      <span class="panel-bar__name">Arthur Plazanet</span>
    </label>

    <p class="panel-bar__where">
      <span class="panel-bar__on-cover">Software Engineer</span>
    </p>

    <nav class="panel-bar__nav">
      <slot />
      <label class="panel-bar__open" for="panel-open">
        Projects
        <span aria-hidden="true">→</span>
      </label>
      <label class="panel-bar__close" for="panel-cover">
        <span aria-hidden="true">←</span>
        Back
      </label>
    </nav>
  </header>
</template>

<style>
.panel-bar {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  padding-inline: var(--space-md);
  border-block-end: 1px solid rgb(227 197 103 / 28%);
  background-color: var(--color-bg);
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-bar__home {
  display: flex;
  gap: var(--space-xs);
  align-items: baseline;
  cursor: pointer;
}

.panel-bar__mark {
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-primary);
}

.panel-bar__where {
  margin: 0;
  color: var(--muted);
}

.panel-bar__nav {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  margin-inline-start: auto;
  min-width: 0;
}

.panel-bar__link {
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
  }
}

/* The bar is a fixed 3.25rem row, so anything dropped into its slot has to
   agree to that height — compose's default button does not. */
.panel-bar__nav :is(button, .btn) {
  padding-block: 0.35em;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}

.panel-bar__open,
.panel-bar__close {
  cursor: pointer;
  color: var(--color-primary);
}

/* The bar reads the same radios panel.css does, so which half shows is a
   consequence of the state and never of a prop passed down from Vue. */
.panel-wrapper:has(#panel-open:checked) .panel-bar__on-cover,
.panel-wrapper:has(#panel-open:checked) .panel-bar__open,
.panel-wrapper:has(#panel-cover:checked) .panel-bar__on-open,
.panel-wrapper:has(#panel-cover:checked) .panel-bar__close {
  display: none;
}

.panel-bar__name {
  @media (width <= 40rem) {
    display: none;
  }
}
</style>
