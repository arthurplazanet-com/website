<template>
  <div class="tag-filter">
    <!--
      The chip is a real YChip; the state is a native checkbox. That keeps the
      component's look and puts filtering back in CSS, which restores the
      counter and lets a plain form reset clear everything.
    -->
    <input
      v-for="tag in tags"
      :id="`${scope}-${slug(tag.label)}`"
      :key="tag.label"
      class="tag-filter__input"
      type="checkbox"
    />

    <YRow type="cluster" class="tag-filter__row">
      <span class="tag-filter__label shelf-label">
        <DeckIcon name="filter" />{{ title }}
      </span>

      <label
        v-for="tag in tags"
        :key="tag.label"
        class="tag-filter__chip"
        :for="`${scope}-${slug(tag.label)}`"
      >
        <YChip size="small"
          >{{ tag.label }} <b>{{ tag.count }}</b></YChip
        >
      </label>

      <button class="tag-filter__clear" type="reset">
        <DeckIcon name="close" />Clear
      </button>
    </YRow>

    <!--
      CSS cannot compare two attributes, so filtering needs one rule per tag.
      The tag set is known here, so they are emitted once rather than authored.
    -->
    <component :is="'style'">{{ rules }}</component>
  </div>
</template>

<script setup lang="ts">
import { YChip, YRow } from "@use-compose/ui";
import { computed, onMounted, ref } from "vue";
import DeckIcon from "./icons/DeckIcon.vue";
import "./TagFilter.css";

const props = withDefaults(
  defineProps<{
    /** Unique per book, so two filters on one page never share an input id. */
    scope: string;
    tags: Array<{ label: string; count: number }>;
    /** The class on each filterable record; it must carry `data-t`. */
    target: string;
    title?: string;
  }>(),
  { title: "Filter" },
);

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function defineRules() {
  const book = `.book:has(.tag-filter__input:checked)`;
  const restore = props.tags
    .map(
      (tag) =>
        `.book:has(#${props.scope}-${slug(tag.label)}:checked) ${props.target}[data-t~="${slug(tag.label)}"]`,
    )
    .join(",");

  return [
    `${book} ${props.target}{display:none}`,
    restore ? `${restore}{display:flex}` : "",
    props.tags
      .map(
        (tag) =>
          `.book:has(#${props.scope}-${slug(tag.label)}:checked) .tag-filter__chip[for="${props.scope}-${slug(tag.label)}"] .y-chip` +
          `{color:var(--primary);border-color:var(--primary);box-shadow:inset 0 -2px 0 var(--primary)}`,
      )
      .join(""),
  ].join("");
}

const rules = ref("");
onMounted(() => {
  rules.value = defineRules();
});
</script>
