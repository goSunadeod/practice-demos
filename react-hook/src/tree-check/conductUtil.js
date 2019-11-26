
function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
    const filteredKeys = new Set();
    halfCheckedKeys.forEach(key => {
        if (!checkedKeys.has(key)) {
            filteredKeys.add(key);
        }
    });
    return filteredKeys;
}

export function isCheckDisabled(node) {
    const { disabled, disableCheckbox, checkable } = (node || {});
    return !!(disabled || disableCheckbox) || checkable === false;
}

// Fill miss keys
function fillConductCheck(keys, levelEntities, maxLevel,) {
    const checkedKeys = new Set(keys);
    const halfCheckedKeys = new Set();

    // Add checked keys top to bottom
    for (let level = 0; level <= maxLevel; level += 1) {
        const entities = levelEntities.get(level) || new Set();
        entities.forEach(entity => {
            const { key, node, children = [] } = entity;

            if (checkedKeys.has(key) && !isCheckDisabled(node)) {
                children
                  .filter(childEntity => !isCheckDisabled(childEntity.node))
                  .forEach(childEntity => {
                      checkedKeys.add(childEntity.key);
                  });
            }
        });
    }

    // Add checked keys from bottom to top
    const visitedKeys = new Set();
    for (let level = maxLevel; level >= 0; level -= 1) {
        const entities = levelEntities.get(level) || new Set();
        entities.forEach(entity => {
            const { parent, node } = entity;

            // Skip if no need to check
            if (isCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
                return;
            }

            // Skip if parent is disabled
            if (isCheckDisabled(entity.parent.node)) {
                visitedKeys.add(parent.key);
                return;
            }

            let allChecked = true;
            let partialChecked = false;

            (parent.children || [])
              .filter(childEntity => !isCheckDisabled(childEntity.node))
              .forEach(({ key }) => {
                  const checked = checkedKeys.has(key);
                  if (allChecked && !checked) {
                      allChecked = false;
                  }
                  if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
                      partialChecked = true;
                  }
              });

            if (allChecked) {
                checkedKeys.add(parent.key);
            }
            if (partialChecked) {
                halfCheckedKeys.add(parent.key);
            }

            visitedKeys.add(parent.key);
        });
    }

    return {
        checkedKeys: Array.from(checkedKeys),
        halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys)),
    };
}

// Remove useless key
function cleanConductCheck(keys, halfKeys, levelEntities, maxLevel) {
    const checkedKeys = new Set(keys);
    const halfCheckedKeys = new Set(halfKeys);

    // Remove checked keys from top to bottom
    for (let level = 0; level <= maxLevel; level += 1) {
        const entities = levelEntities.get(level) || new Set();
        entities.forEach(entity => {
            const { key, node, children = [] } = entity;

            if (!checkedKeys.has(key) && !halfCheckedKeys.has(key) && !isCheckDisabled(node)) {
                children
                  .filter(childEntity => !isCheckDisabled(childEntity.node))
                  .forEach(childEntity => {
                      checkedKeys.delete(childEntity.key);
                  });
            }
        });
    }

    // Remove checked keys form bottom to top
    const visitedKeys = new Set();
    for (let level = maxLevel; level >= 0; level -= 1) {
        const entities = levelEntities.get(level) || new Set();

        entities.forEach(entity => {
            const { parent, node } = entity;

            // Skip if no need to check
            if (isCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
                return;
            }

            // Skip if parent is disabled
            if (isCheckDisabled(entity.parent.node)) {
                visitedKeys.add(parent.key);
                return;
            }

            let allChecked = true;
            let partialChecked = false;

            (parent.children || [])
              .filter(childEntity => !isCheckDisabled(childEntity.node))
              .forEach(({ key }) => {
                  const checked = checkedKeys.has(key);
                  if (allChecked && !checked) {
                      allChecked = false;
                  }
                  if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
                      partialChecked = true;
                  }
              });

            if (!allChecked) {
                checkedKeys.delete(parent.key);
            }
            if (partialChecked) {
                halfCheckedKeys.add(parent.key);
            }

            visitedKeys.add(parent.key);
        });
    }

    return {
        checkedKeys: Array.from(checkedKeys),
        halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys)),
    };
}

/**
 * Conduct with keys.
 * @param keyList current key list
 * @param keyEntities key - dataEntity map
 * @param mode `fill` to fill missing key, `clean` to remove useless key
 */
export function conductCheck(keyList, checked, keyEntities,) {
    const warningMissKeys = [];

    // We only handle exist keys
    const keys = new Set(
      keyList.filter(key => {
          const hasEntity = !!keyEntities[key];
          if (!hasEntity) {
              warningMissKeys.push(key);
          }

          return hasEntity;
      }),
    );
    const levelEntities = new Map();
    let maxLevel = 0;

    // Convert entities by level for calculation
    Object.keys(keyEntities).forEach(key => {
        const entity = keyEntities[key];
        const { level } = entity;

        let levelSet = levelEntities.get(level);
        if (!levelSet) {
            levelSet = new Set();
            levelEntities.set(level, levelSet);
        }

        levelSet.add(entity);

        maxLevel = Math.max(maxLevel, level);
    });

    let result;
    if (checked === true) {
        console.log('checked 为 true')
        result = fillConductCheck(keys, levelEntities, maxLevel);
    } else {
        console.log('checked 为 object')
        result = cleanConductCheck(keys, checked.halfCheckedKeys, levelEntities, maxLevel);
    }

    return result;
}
