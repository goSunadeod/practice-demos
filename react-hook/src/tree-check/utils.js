export function getPosition(level, index) {
    return `${level}-${index}`;
}

export function getKey(key, pos) {
    if (key !== null && key !== undefined) {
        return key;
    }
    return pos;
}

/**
 * Traverse all the data by `treeData`.
 * Please not use it out of the `rc-tree` since we may refactor this code.
 */
export function traverseDataNodes(dataNodes, callback) {
    function processNode(node, index, parent) {
        const children = node ? node.children : dataNodes;
        const pos = node ? getPosition(parent.pos, index) : '0';

        // Process node if is not root
        if (node) {
            const data = {
                node,
                index,
                pos,
                key: node.key !== null ? node.key : pos,
                parentPos: parent.node ? parent.pos : null,
                level: parent.level + 1,
            };

            callback(data);
        }

        // Process children node
        if (children) {
            children.forEach((subNode, subIndex) => {
                processNode(subNode, subIndex, { node, pos, level: parent ? parent.level + 1 : -1 });
            });
        }
    }

    processNode(null);
}


/**
 * Convert `treeData` into entity records.
 */
export function convertDataToEntities(dataNodes) {
    const posEntities = {};
    const keyEntities = {};
    let wrapper = {
        posEntities,
        keyEntities,
    };


    traverseDataNodes(dataNodes, item => {
        const { node, index, pos, key, parentPos, level } = item;
        const entity = { node, index, key, pos, level };

        const mergedKey = getKey(key, pos);

        posEntities[pos] = entity;
        keyEntities[mergedKey] = entity;

        // Fill children
        entity.parent = posEntities[parentPos];
        if (entity.parent) {
            entity.parent.children = entity.parent.children || [];
            entity.parent.children.push(entity);
        }

    });


    return wrapper;
}
