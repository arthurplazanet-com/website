<template>
  <form class="book book--experience" aria-label="Experience" @submit.prevent>
    <div class="book__inner experience">
      <div class="book__head">
        <h2>Experience</h2>

      </div>

      <TagFilter scope="xf" target=".experience .y-timeline-item" :tags="tagCounts" />

      <YTimeline ordered class="experience__list">
        <YTimelineItem
          v-for="record in records"
          :key="record.key"
          :data-t="slugs(record.tags)"
          :tag="record.period"
          :title="`${record.role} — ${record.company}`"
          :description="record.description"
          :highlighted="record.current"
          :heading-level="3"
        />
      </YTimeline>

      <p class="book__foot shelf-label">
        Showing <span class="experience__n" /> of {{ records.length }} roles
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { YTimeline, YTimelineItem } from "@use-compose/ui";
import { computed } from "vue";
import TagFilter from "./TagFilter.vue";
import { sortExperiences, toExperienceRecord } from "./experiences";
import "./ExperienceBook.css";
import type { Experience } from "../../../types/index.ts";

const props = defineProps<{ experiences: Experience[] }>();

const records = computed(() =>
  sortExperiences(props.experiences).map(toExperienceRecord),
);

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const slugs = (tags: string[]) => tags.map(slug).join(" ");

const tagCounts = computed(() => {
  const counts = new Map<string, number>();
  for (const record of records.value)
    for (const tag of record.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);

  return [...counts]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 12);
});
</script>
