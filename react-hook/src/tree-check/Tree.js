import {Button, Tree} from 'antd';
import React from 'react';

const { TreeNode } = Tree;

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        parentKey: [],
        level: 1,
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                parentKey: ['0-0'],
                level: 2,
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0', level: 3,
                        parentKey: ['0-0-0', '0-0'],
                        children: [
                            {
                                title: 1,
                                key: '1',
                                parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                                level: 4,
                            },
                            {
                                title: 2,
                                key: '2',
                                parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                                level: 4,
                            },
                            {
                                title: 3,
                                key: '3',
                                parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                                level: 4,
                            },
                        ]
                    },
                    {
                        title: '0-0-0-3',
                        key: '0-0-0-3', level: 3,
                        parentKey: ['0-0-0', '0-0'],
                        children: [
                            {
                                title: 4,
                                key: '4',
                                parentKey: ['0-0-0', '0-0', '0-0-0-3'],
                                level: 4,
                            },
                            {
                                title: 5,
                                key: '5',
                                parentKey: ['0-0-0', '0-0', '0-0-0-3'],
                                level: 4,
                            },
                            {
                                title: 6,
                                key: '6',
                                parentKey: ['0-0-0', '0-0', '0-0-0-3'],
                                level: 4,
                            },
                        ]
                    },
                    { title: '0-0-0-1', key: '0-0-0-1', level: 3, parentKey: ['0-0-0', '0-0'] },
                    { title: '0-0-0-2', key: '0-0-0-2', level: 3, parentKey: ['0-0-0', '0-0'] },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                parentKey: ['0-0'],
                level: 2,
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0', level: 3, parentKey: ['0-0-1', '0-0'] },
                    { title: '0-0-1-1', key: '0-0-1-1', level: 3, parentKey: ['0-0-1', '0-0'] },
                    { title: '0-0-1-2', key: '0-0-1-2', level: 3, parentKey: ['0-0-1', '0-0'] },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                parentKey: ['0-0'],
                level: 2,
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        level: 1,
        parentKey: [],
        children: [
            { title: '0-1-0-0', key: '0-1-0-0', level: 3, parentKey: ['0-1'] },
            { title: '0-1-0-1', key: '0-1-0-1', level: 3, parentKey: ['0-1'] },
            { title: '0-1-0-2', key: '0-1-0-2', level: 3, parentKey: ['0-1'] },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        level: 1,
        parentKey: [],
    },
];

class Demo extends React.Component {
    state = {
        autoExpandParent: true,
        checkedKeys: [],
    };

    onClick = () => {
        console.time('time span');
        const tempList = {}; // 用于记录没有一个子节点被选中的父节点
        let checkedKeys = [];
        this.isSelected = !this.isSelected;
        const selectNode = {
            title: '0-0-0-0',
            key: '0-0-0-0', level: 3,
            parentKey: ['0-0-0', '0-0'],
            children: [
                {
                    title: 1,
                    key: '1',
                    parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                    level: 4,
                },
                {
                    title: 2,
                    key: '2',
                    parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                    level: 4,
                },
                {
                    title: 3,
                    key: '3',
                    parentKey: ['0-0-0', '0-0', '0-0-0-0'],
                    level: 4,
                },
            ]
        };
        const recursive = (nodes, parent, func = () => {}) => {
            if (!nodes || !nodes.length) return;
            nodes.forEach((node) => {
                recursive(node.children, node, func);
                func(node, parent);
            });
        }
        recursive(treeData, null, (node, parent) => {
            // 当前的选中的节点 selectNode 不需要处理

            // 如果是子节点，将子节点选中或删除
            const isTargetChildren = node.level > selectNode.level && node.parentKey.includes(selectNode.key);
            if (isTargetChildren) {
                if (this.isSelected) {
                    checkedKeys.push(node.key);
                } else {
                    checkedKeys = checkedKeys.filter(item => item !== node.key);
                }
            }
            // 表示是被选中的节点的父节点
            const isTargetParents = node.level < selectNode.level && selectNode.parentKey.includes(node.key);
            if (isTargetParents) {
                // 如果是父节点，没有被选中，则先选中
                if (!checkedKeys.includes(node.key)) {
                    checkedKeys.push(node.key);
                }
                let hasNoCheckedChild = true;
                const hasChildren = node.children && node.children.length;
                if (hasChildren) {
                    // 判断该父节点的所有子级是否被选中
                    for (let i = 0; i < node.children.length; i++) {
                        const child = node.children[i];
                        if (checkedKeys.includes(child.key) && !tempList[child.key]) {
                            hasNoCheckedChild = false;
                            break;
                        }
                    }
                }
                if (hasNoCheckedChild) {
                    tempList[node.key] = true;
                }
            }
        });
        if (this.isSelected) {
            checkedKeys.push(selectNode.key);
        } else {
            checkedKeys = checkedKeys.filter(item => item !== selectNode.key);
        }
        // 在选中的节点中，将没有子节点被选中的父节点过滤掉
        checkedKeys = checkedKeys.filter(item => !tempList[item]);
        console.timeEnd('time span');
        this.setState({ checkedKeys });
    }

    onCheck = (checkedKeys, e) => {
        const { node: { props: { data: selectNode } }, checked: isSelected} = e;
        const tempList = {}; // 用于记录没有一个子节点被选中的父节点
        const recursive = (nodes, parent, func = () => {}) => {
            if (!nodes || !nodes.length) return;
            nodes.forEach((node) => {
                recursive(node.children, node, func);
                func(node, parent);
            });
        }
        recursive(treeData, null, (node, parent) => {
            // 当前的选中的节点 selectNode 不需要处理

            // 如果是子节点，将子节点选中或删除
            const isTargetChildren = node.level > selectNode.level && node.parentKey.includes(selectNode.key);
            if (isTargetChildren) {
                if (isSelected) {
                    checkedKeys.checked.push(node.key);
                } else {
                    checkedKeys.checked = checkedKeys.checked.filter(item => item !== node.key);
                }
            }
            // 表示是被选中的节点的父节点
            const isTargetParents = node.level < selectNode.level && selectNode.parentKey.includes(node.key);
            if (isTargetParents) {
                // 如果是父节点，没有被选中，则先选中
                if (!checkedKeys.checked.includes(node.key)) {
                    checkedKeys.checked.push(node.key);
                }
                let hasNoCheckedChild = true;
                const hasChildren = node.children && node.children.length;
                if (hasChildren) {
                    // 判断该父节点的所有子级是否被选中
                    for (let i = 0; i < node.children.length; i++) {
                        const child = node.children[i];
                        if (checkedKeys.checked.includes(child.key) && !tempList[child.key]) {
                            hasNoCheckedChild = false;
                            break;
                        }
                    }
                }
                if (hasNoCheckedChild) {
                    tempList[node.key] = true;
                }
            }
        });
        // 在选中的节点中，将没有子节点被选中的父节点过滤掉
        checkedKeys.checked = checkedKeys.checked.filter(item => !tempList[item]);
        this.setState({ checkedKeys });
    };

    renderTreeNodes = data =>
      data.map(item => {
          if (item.children) {
              return (
                <TreeNode title={item.title} key={item.key} data={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
              );
          }
          return <TreeNode key={item.key} title={item.title} data={item} />;
      });

    render() {
        return (
          <>
              <Button onClick={this.onClick}>0-0-0-0</Button>
              <Tree
                checkable
                defaultExpandAll
                autoExpandParent={this.state.autoExpandParent}
                checkStrictly={true}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
              >
                  {this.renderTreeNodes(treeData)}
              </Tree>
          </>
        );
    }
}

export default Demo;
