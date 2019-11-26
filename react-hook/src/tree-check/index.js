import React from 'react';
import {Row, Col} from 'antd';
import Tree from './Tree';
import TreeOrigin from './TreeOrigin';


export default class TreeIndex extends React.Component {

    render() {
        return (
          <Row>
              <Col span={12}>
                  <Tree />
              </Col>
              <Col span={12}>
                  <TreeOrigin />
              </Col>
          </Row>
        )
    }
}
