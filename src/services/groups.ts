import type { State } from "../types/data";
import type { Group, Groups } from "../types/groups";

import { log } from "./log.js";

export function removeOldGroup(groups: Groups, id: string) {
  if (groups.has(id)) {
    const group = groups.get(id) as Group;
    const date = new Date();
    if (date.getTime() - group.updated.getTime() > 1000 * 60 * 60 * 24 * 3) {
      // Remove groups that are not active since 3 days
      groups.delete(id);
    }
  }
}

export function removeOldGroups(groups: Groups) {
  for (const id of groups.keys()) {
    removeOldGroup(groups, id);
  }
}

export function initGroup(groups: Groups, id: string, state?: State) {
  const date = new Date();
  const group = {
    created: date,
    state: state ?? {},
    updated: date,
  };
  log(`--- INIT GROUP "${id}" ---`);
  log(group);
  groups.set(id, group);
}

export function updateGroup(groups: Groups, id: string, group: Group) {
  group.updated = new Date();
  groups.set(id, group);
  log(`--- GROUP "${id}" DATA ---`);
  log(group);
}
