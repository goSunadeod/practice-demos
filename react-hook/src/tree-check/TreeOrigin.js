import { Tree, Button } from 'antd';
import React from 'react';
import {convertDataToEntities} from './utils'
import {conductCheck} from './conductUtil'

const { TreeNode } = Tree;

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                        children: [
                            {
                                title: 1,
                                key: '1',
                            },
                            {
                                title: 2,
                                key: '2',
                            },
                            {
                                title: 3,
                                key: '3',
                            },
                        ]
                    },
                    {
                        title: '0-0-0-3',
                        key: '0-0-0-3',
                        children: [
                            {
                                title: 4,
                                key: '4',
                            },
                            {
                                title: 5,
                                key: '5',
                            },
                            {
                                title: 6,
                                key: '6',
                            },
                        ]
                    },
                    { title: '0-0-0-1', key: '0-0-0-1', },
                    { title: '0-0-0-2', key: '0-0-0-2', },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0', },
                    { title: '0-0-1-1', key: '0-0-1-1', },
                    { title: '0-0-1-2', key: '0-0-1-2', },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0',},
            { title: '0-1-0-1', key: '0-1-0-1',},
            { title: '0-1-0-2', key: '0-1-0-2',},
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];
const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;
const MotionNode = {
    key: MOTION_KEY,
};

export const MotionEntity = {
    key: MOTION_KEY,
    level: 0,
    index: 0,
    pos: '0',
    node: MotionNode,
};
class Demo extends React.Component {
    state = {
        checkedKeys: [],
        originalCheckedKeys: ['0-0-0-0', '0-0-0-1', '0-0-0-2', '0-0-0-3'],
        halfCheckedKeys: [],
        keyEntities: {}
    };

    static getDerivedStateFromProps(props, prevState) {
        const newState = {
            prevProps: props,
        };
        const entitiesMap = convertDataToEntities(treeData);
        newState.keyEntities = {
            [MOTION_KEY]: MotionEntity,
            ...entitiesMap.keyEntities,
        };
        const keyEntities = newState.keyEntities || prevState.keyEntities;
        let checkedKeyEntity = {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys,
        };
        if (checkedKeyEntity) {
            let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity;

            const conductKeys = conductCheck(checkedKeys, true, keyEntities);
            ({ checkedKeys, halfCheckedKeys } = conductKeys);

            newState.checkedKeys = checkedKeys;
            newState.halfCheckedKeys = halfCheckedKeys;
            console.log(checkedKeys, halfCheckedKeys)
        }
        return newState
    }

    /**
     * Only update the value which is not in props
     */
    setUncontrolledState = state => {
        let needSync = false;
        const newState = {};

        Object.keys(state).forEach(name => {
            if (name in this.props) return;

            needSync = true;
            newState[name] = state[name];
        });

        if (needSync) {
            this.setState(newState);
        }
    };

    onNodeCheck = (e, treeNode, checked) => {
        console.time('time span');
        const {
            checkedKeys: oriCheckedKeys
        } = this.state;
        let keyEntities = this.state.keyEntities;
        const { key } = treeNode;

        // Prepare trigger arguments
        let checkedObj;
        const eventObj = {
            event: 'check',
            node: treeNode,
            checked,
            // nativeEvent: e.nativeEvent,
        };

        // Always fill first
        let { checkedKeys, halfCheckedKeys } = conductCheck(
          [...oriCheckedKeys, key],
          true,
          keyEntities,
        );

        // If remove, we do it again to correction
        if (!checked) {
            const keySet = new Set(checkedKeys);
            keySet.delete(key);
            ({ checkedKeys, halfCheckedKeys } = conductCheck(
              Array.from(keySet),
              { checked: false, halfCheckedKeys },
              keyEntities,
            ));
        }

        checkedObj = checkedKeys;

        // [Legacy] This is used for `rc-tree-select`
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = halfCheckedKeys;

        checkedKeys.forEach(checkedKey => {
            const entity = keyEntities[checkedKey];
            if (!entity) return;

            const { node, pos } = entity;

            eventObj.checkedNodes.push(node);
            eventObj.checkedNodesPositions.push({ node, pos });
        });

        console.timeEnd('time span');
        this.setUncontrolledState({
            checkedKeys,
            halfCheckedKeys,
        });

        // if (this.props.onCheck) {
        //     this.props.onCheck(checkedObj, eventObj);
        // }
    };

    handleClick = (e) => {
        this.isSelected = !this.isSelected
        this.onNodeCheck(e, {key: '0-0-0-0'}, this.isSelected)
    }

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    renderTreeNodes = data =>
      data.map(item => {
          if (item.children) {
              return (
                <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
              );
          }
          return <TreeNode key={item.key} title={item.title}/>;
      });

    render() {
        return (
          <>
              <Button onClick={this.handleClick}>0-0-0-0</Button>
              <Tree
                checkable
                defaultExpandAll
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
